import type {
    BlockContent,
    Code,
    Heading,
    List,
    ListItem,
    PhrasingContent,
    Root,
    RootContent,
    Table,
    TableCell,
} from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type {
    GuidebookBlock,
    GuidebookHeading,
    GuidebookInline,
    GuidebookLink,
    GuidebookListItem,
    GuidebookListBlock,
    GuidebookMarkdownAnalysis,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";

export type GuidebookLinkResolver = (
    currentSlug: string,
    label: string,
    rawHref: string,
) => GuidebookLink;

export type AnalyzeGuidebookMarkdownOptions = {
    slug: string;
    markdown: string;
    resolveLink: GuidebookLinkResolver;
};

type MdastLikeNode = {
    type: string;
    value?: unknown;
    alt?: unknown;
    children?: MdastLikeNode[];
};

type AnalysisContext = {
    slug: string;
    resolveLink: GuidebookLinkResolver;
    blockIndex: number;
    listItemIndex: number;
    headings: GuidebookHeading[];
    headingIds: Map<Heading, string>;
    headingOccurrences: Map<string, number>;
    links: GuidebookLink[];
    warnings: Set<string>;
};

const boxDrawingPattern = /[┌┐└┘├┤┬┴┼│─╔╗╚╝╠╣╦╩╬║═]/gu;
const frameStartPattern = /^\s*[┌└╔╚]/u;
const treeBranchPattern = /^\s*[│├└](?:──|─)/u;

function nextBlockId(context: AnalysisContext, kind: string): string {
    context.blockIndex += 1;
    return `${kind}-${String(context.blockIndex).padStart(4, "0")}`;
}

function nextListItemId(context: AnalysisContext): string {
    context.listItemIndex += 1;
    return `list-item-${String(context.listItemIndex).padStart(4, "0")}`;
}

function addWarning(context: AnalysisContext, warning: string) {
    context.warnings.add(warning);
}

function plainText(node: MdastLikeNode): string {
    if (typeof node.value === "string") {
        return node.value;
    }

    if (typeof node.alt === "string") {
        return node.alt;
    }

    if (!node.children) {
        return "";
    }

    return node.children.map(plainText).join("");
}

function isBreakHtml(value: string): boolean {
    return /^<br\s*\/?\s*>$/iu.test(value.trim());
}

function hasUnsupportedInline(nodes: readonly PhrasingContent[]): boolean {
    return nodes.some((node) => {
        if (node.type === "html") {
            return !isBreakHtml(node.value);
        }

        if (
            node.type === "image" ||
            node.type === "imageReference" ||
            node.type === "linkReference" ||
            node.type === "footnoteReference"
        ) {
            return true;
        }

        if ("children" in node && Array.isArray(node.children)) {
            return hasUnsupportedInline(node.children as PhrasingContent[]);
        }

        return false;
    });
}

function convertInlineNodes(
    nodes: readonly PhrasingContent[],
    context: AnalysisContext,
): GuidebookInline[] {
    return nodes.flatMap((node): GuidebookInline[] => {
        switch (node.type) {
            case "text":
                return [{ kind: "text", value: node.value }];
            case "inlineCode":
                return [{ kind: "inline-code", value: node.value }];
            case "break":
                return [{ kind: "break" }];
            case "html":
                return isBreakHtml(node.value) ? [{ kind: "break" }] : [];
            case "emphasis":
            case "strong":
            case "delete":
                return [
                    {
                        kind: node.type,
                        children: convertInlineNodes(node.children, context),
                    },
                ];
            case "link": {
                const children = convertInlineNodes(node.children, context);
                const label = plainText(node as MdastLikeNode) || node.url;
                const link = context.resolveLink(context.slug, label, node.url);
                context.links.push(link);

                if (link.state === "restricted") {
                    addWarning(context, `Lien restreint : ${node.url}`);
                } else if (link.state === "invalid") {
                    addWarning(context, `Lien invalide : ${node.url}`);
                }

                return [{ kind: "link", link, children }];
            }
            default:
                return [];
        }
    });
}

export function createGuidebookHeadingId(value: string): string {
    const normalized = value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/gu, "")
        .toLocaleLowerCase("fr")
        .replace(/[’']/gu, "")
        .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
        .trim()
        .replace(/\s+/gu, "-")
        .replace(/-+/gu, "-");

    return normalized || "section";
}

function resolveHeadingId(node: Heading, context: AnalysisContext): string {
    const existingId = context.headingIds.get(node);

    if (existingId) {
        return existingId;
    }

    const baseId = createGuidebookHeadingId(plainText(node as MdastLikeNode));
    const occurrence = (context.headingOccurrences.get(baseId) ?? 0) + 1;
    const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;

    context.headingOccurrences.set(baseId, occurrence);
    context.headingIds.set(node, id);

    return id;
}

function convertHeading(
    node: Heading,
    context: AnalysisContext,
): GuidebookBlock {
    const heading = {
        id: resolveHeadingId(node, context),
        depth: node.depth,
        text: plainText(node as MdastLikeNode),
    } satisfies GuidebookHeading;

    context.headings.push(heading);

    return {
        id: nextBlockId(context, "heading"),
        kind: "heading",
        heading,
    };
}

function createUnsupportedBlock(
    node: MdastLikeNode,
    context: AnalysisContext,
    sourceType = node.type,
): GuidebookBlock {
    addWarning(context, `Bloc non pris en charge : ${sourceType}`);

    return {
        id: nextBlockId(context, "unsupported"),
        kind: "unsupported",
        sourceType,
        plainText: plainText(node),
    };
}

export function isGuidebookAsciiComposition(
    code: string,
    language?: string,
): boolean {
    const normalizedLanguage = language?.trim().toLocaleLowerCase("en");

    if (normalizedLanguage === "ascii") {
        return true;
    }

    if (
        normalizedLanguage &&
        !["text", "txt", "plain", "plaintext"].includes(normalizedLanguage)
    ) {
        return false;
    }

    const lines = code.split("\n");

    if (lines.length < 2) {
        return false;
    }

    const boxLines = lines.filter(
        (line) => (line.match(boxDrawingPattern) ?? []).length >= 2,
    ).length;
    const frameLines = lines.filter((line) =>
        frameStartPattern.test(line),
    ).length;
    const treeLines = lines.filter((line) =>
        treeBranchPattern.test(line),
    ).length;

    return (
        (boxLines >= 2 && frameLines >= 2) || (boxLines >= 3 && treeLines >= 2)
    );
}

function convertCode(node: Code, context: AnalysisContext): GuidebookBlock {
    const language = node.lang?.trim() || undefined;

    return {
        id: nextBlockId(context, "code"),
        kind: "code",
        code: node.value,
        ...(language ? { language } : {}),
        presentation: isGuidebookAsciiComposition(node.value, language)
            ? "ascii"
            : "code",
    };
}

function convertTableCell(
    cell: TableCell,
    context: AnalysisContext,
): GuidebookInline[] {
    if (hasUnsupportedInline(cell.children)) {
        addWarning(context, "Cellule de tableau partiellement prise en charge");
        return [{ kind: "text", value: plainText(cell as MdastLikeNode) }];
    }

    return convertInlineNodes(cell.children, context);
}

function convertTable(node: Table, context: AnalysisContext): GuidebookBlock {
    return {
        id: nextBlockId(context, "table"),
        kind: "table",
        alignments: [...(node.align ?? [])],
        rows: node.children.map((row) =>
            row.children.map((cell) => convertTableCell(cell, context)),
        ),
    };
}

function convertListItem(
    item: ListItem,
    context: AnalysisContext,
): GuidebookListItem {
    const blocks: GuidebookBlock[] = [];
    const children: GuidebookListBlock[] = [];

    for (const child of item.children) {
        if (child.type === "list") {
            children.push(convertList(child, context));
            continue;
        }

        const block = convertBlock(child, context);
        if (block) {
            blocks.push(block);
        }
    }

    return {
        id: nextListItemId(context),
        ...(typeof item.checked === "boolean" ? { checked: item.checked } : {}),
        blocks,
        children,
    };
}

function convertList(node: List, context: AnalysisContext): GuidebookListBlock {
    return {
        id: nextBlockId(context, "list"),
        kind: "list",
        ordered: node.ordered === true,
        ...(typeof node.start === "number" ? { start: node.start } : {}),
        items: node.children.map((item) => convertListItem(item, context)),
    };
}

function convertBlock(
    node: RootContent | BlockContent,
    context: AnalysisContext,
): GuidebookBlock | null {
    switch (node.type) {
        case "heading":
            return convertHeading(node, context);
        case "paragraph":
            if (hasUnsupportedInline(node.children)) {
                return createUnsupportedBlock(
                    node as MdastLikeNode,
                    context,
                    "paragraph-with-unsupported-inline",
                );
            }

            return {
                id: nextBlockId(context, "paragraph"),
                kind: "paragraph",
                content: convertInlineNodes(node.children, context),
            };
        case "blockquote":
            return {
                id: nextBlockId(context, "blockquote"),
                kind: "blockquote",
                blocks: node.children.flatMap((child) => {
                    const block = convertBlock(child, context);
                    return block ? [block] : [];
                }),
            };
        case "list":
            return convertList(node, context);
        case "code":
            return convertCode(node, context);
        case "table":
            return convertTable(node, context);
        case "thematicBreak":
            return {
                id: nextBlockId(context, "thematic-break"),
                kind: "thematic-break",
            };
        case "definition":
            return null;
        default:
            return createUnsupportedBlock(node as MdastLikeNode, context);
    }
}

function buildTableOfContents(
    headings: GuidebookHeading[],
): GuidebookTableOfContentsItem[] {
    const root: GuidebookTableOfContentsItem[] = [];
    const stack: Array<{
        depth: number;
        children: GuidebookTableOfContentsItem[];
    }> = [{ depth: 0, children: root }];

    for (const heading of headings) {
        while (
            stack.length > 1 &&
            stack[stack.length - 1].depth >= heading.depth
        ) {
            stack.pop();
        }

        const item: GuidebookTableOfContentsItem = {
            ...heading,
            children: [],
        };

        stack[stack.length - 1].children.push(item);
        stack.push({ depth: heading.depth, children: item.children });
    }

    return root;
}

function validateAnchorLinks(context: AnalysisContext) {
    const headingIds = new Set(context.headings.map((heading) => heading.id));

    for (const link of context.links) {
        if (link.state !== "anchor" || !link.href) {
            continue;
        }

        let target = link.href.slice(1);
        try {
            target = decodeURIComponent(target);
        } catch {
            // Une séquence invalide restera introuvable et sera neutralisée.
        }

        if (!target || !headingIds.has(target)) {
            addWarning(context, `Ancre introuvable : ${link.href}`);
            link.href = null;
            link.state = "invalid";
        }
    }
}

export function analyzeGuidebookMarkdown({
    slug,
    markdown,
    resolveLink,
}: AnalyzeGuidebookMarkdownOptions): GuidebookMarkdownAnalysis {
    const tree = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(markdown) as Root;
    const context: AnalysisContext = {
        slug,
        resolveLink,
        blockIndex: 0,
        listItemIndex: 0,
        headings: [],
        headingIds: new Map(),
        headingOccurrences: new Map(),
        links: [],
        warnings: new Set(),
    };
    const blocks = tree.children.flatMap((node) => {
        const block = convertBlock(node, context);
        return block ? [block] : [];
    });

    validateAnchorLinks(context);

    return {
        blocks,
        headings: context.headings,
        tableOfContents: buildTableOfContents(context.headings),
        links: context.links,
        warnings: [...context.warnings],
    };
}
