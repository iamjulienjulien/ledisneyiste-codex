import "server-only";

const compactPageIdPattern = /^[0-9a-f]{32}$/iu;
const pageIdInPathPattern = /[0-9a-f]{32}/giu;

export function extractNotionPageId(value: string): string | null {
    const normalized = value.replaceAll("-", "").toLocaleLowerCase("en");

    if (compactPageIdPattern.test(normalized)) {
        return normalized;
    }

    try {
        const url = new URL(value);
        const matches = url.pathname
            .replaceAll("-", "")
            .match(pageIdInPathPattern);

        return matches?.at(-1)?.toLocaleLowerCase("en") ?? null;
    } catch {
        const matches = normalized.match(pageIdInPathPattern);

        return matches?.at(-1)?.toLocaleLowerCase("en") ?? null;
    }
}

export type NormalizeNotionMarkdownOptions = Readonly<{
    pageTitlesById?: Readonly<Record<string, string>>;
}>;

export type NormalizedNotionMarkdown = Readonly<{
    markdown: string;
    warnings: readonly string[];
}>;

function dedentNotionBlock(value: string): string {
    const lines = value
        .replace(/^\s*\n/u, "")
        .replace(/\n\s*$/u, "")
        .split("\n")
        .map((line) =>
            line.replace(/^[\t ]+/u, (indent) =>
                indent.replaceAll("\t", "    "),
            ),
        );
    const nonEmptyIndents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^ */u)?.[0].length ?? 0);
    const commonIndent = Math.min(...nonEmptyIndents);

    return lines
        .map((line) => (line.trim().length > 0 ? line.slice(commonIndent) : ""))
        .join("\n");
}

function escapeTableCell(value: string): string {
    return value
        .replace(/<br\s*\/?\s*>/giu, " ")
        .replace(/<[^>]+>/gu, "")
        .replace(/\s+/gu, " ")
        .replaceAll("|", "\\|")
        .trim();
}

function normalizeTable(value: string): string {
    const rows = [...value.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/giu)].map(
        (row) =>
            [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/giu)].map(
                (cell) => escapeTableCell(cell[1]),
            ),
    );
    const columnCount = Math.max(0, ...rows.map((row) => row.length));

    if (columnCount === 0) {
        return "";
    }

    const normalizedRows = rows.map((row) => [
        ...row,
        ...Array.from({ length: columnCount - row.length }, () => ""),
    ]);
    const header = normalizedRows[0];
    const body = normalizedRows.slice(1);

    return [
        `| ${header.join(" | ")} |`,
        `| ${Array.from({ length: columnCount }, () => "---").join(" | ")} |`,
        ...body.map((row) => `| ${row.join(" | ")} |`),
    ].join("\n");
}

function normalizePageLink(
    url: string,
    label: string,
    pageTitlesById: Readonly<Record<string, string>>,
): string {
    const pageId = extractNotionPageId(url);
    const normalizedLabel = label
        .replace(/<[^>]+>/gu, "")
        .replace(/\s+/gu, " ")
        .trim();
    const resolvedLabel =
        normalizedLabel || (pageId ? pageTitlesById[pageId] : undefined);

    return `[${resolvedLabel || "Page Notion"}](${url})`;
}

export function normalizeNotionMarkdown(
    source: string,
    { pageTitlesById = {} }: NormalizeNotionMarkdownOptions = {},
): NormalizedNotionMarkdown {
    const warnings = new Set<string>();
    let markdown = source.replace(/\r\n?/gu, "\n");

    markdown = markdown.replace(
        /<table\b[^>]*>([\s\S]*?)<\/table>/giu,
        (_match, content: string) => {
            const table = normalizeTable(content);
            if (!table) {
                warnings.add("Tableau Notion vide ou non reconnu");
            }
            return `\n${table}\n`;
        },
    );

    markdown = markdown.replace(
        /<callout[^>]*>([\s\S]*?)<\/callout>/giu,
        (_match, content: string) => {
            const body = dedentNotionBlock(content);
            return `\n${body
                .split("\n")
                .map((line) => `> ${line}`)
                .join("\n")}\n`;
        },
    );

    markdown = markdown.replace(
        /<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/giu,
        (_match, summary: string, content: string) =>
            `\n**${escapeTableCell(summary)}**\n\n${dedentNotionBlock(content)}\n`,
    );

    markdown = markdown.replace(
        /<column\b[^>]*>([\s\S]*?)<\/column>/giu,
        (_match, content: string) => `\n${dedentNotionBlock(content)}\n`,
    );
    markdown = markdown.replace(/<\/?columns[^>]*>/giu, "\n");
    markdown = markdown.replace(/<table_of_contents\b[^>]*\/>/giu, "");

    markdown = markdown.replace(
        /<mention-page\s+[^>]*url="([^"]+)"[^>]*\/>/giu,
        (_match, url: string) => normalizePageLink(url, "", pageTitlesById),
    );
    markdown = markdown.replace(
        /<mention-page\s+[^>]*url="([^"]+)"[^>]*>([\s\S]*?)<\/mention-page>/giu,
        (_match, url: string, label: string) =>
            normalizePageLink(url, label, pageTitlesById),
    );
    markdown = markdown.replace(
        /<page\s+[^>]*url="([^"]+)"[^>]*\/>/giu,
        (_match, url: string) => normalizePageLink(url, "", pageTitlesById),
    );
    markdown = markdown.replace(
        /<page\s+[^>]*url="([^"]+)"[^>]*>([\s\S]*?)<\/page>/giu,
        (_match, url: string, label: string) =>
            normalizePageLink(url, label, pageTitlesById),
    );

    markdown = markdown.replace(
        /<(?:image|file|video|audio|pdf)\b[^>]*\/?>(?:[\s\S]*?<\/(?:image|file|video|audio|pdf)>)?/giu,
        () => {
            warnings.add("Média Notion non projeté");
            return "\n> Média Notion non projeté.\n";
        },
    );
    markdown = markdown.replace(/<unknown\b[^>]*\/?\s*>/giu, () => {
        warnings.add("Bloc Notion inconnu ou inaccessible");
        return "\n> Bloc Notion non disponible.\n";
    });

    if (/<(?!br\b)[a-z][^>]*>/iu.test(markdown)) {
        warnings.add(
            "Extension Notion conservée comme bloc non pris en charge",
        );
    }

    return {
        markdown: markdown.replace(/\n{3,}/gu, "\n\n").trim(),
        warnings: [...warnings],
    };
}
