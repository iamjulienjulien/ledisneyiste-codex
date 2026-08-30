import type { ElementType, ReactNode } from "react";
import { tokenizeCode } from "@/lib/code-tokens";
import type {
    GuidebookBlock,
    GuidebookInline,
    GuidebookLink,
    GuidebookListBlock,
    GuidebookListItem,
    GuidebookTableBlock,
} from "@/types/guidebook";
import { PixieDustAscii } from "@/components/ui/PixieDustAscii";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import styles from "./PixieDustMarkdown.module.css";
import type {
    PixieDustMarkdownDensity,
    PixieDustMarkdownMeasure,
    PixieDustMarkdownProps,
} from "./PixieDustMarkdown.types";

const densityClasses = {
    compact: styles.densityCompact,
    comfortable: styles.densityComfortable,
    airy: styles.densityAiry,
} as const satisfies Record<PixieDustMarkdownDensity, string>;

const measureClasses = {
    reading: styles.measureReading,
    wide: styles.measureWide,
    full: styles.measureFull,
} as const satisfies Record<PixieDustMarkdownMeasure, string>;

function normalizeAnchorPrefix(prefix: string): string {
    return prefix
        .trim()
        .replace(/^#+/u, "")
        .replace(/[^\p{Letter}\p{Number}_-]+/gu, "-")
        .replace(/-+/gu, "-")
        .replace(/^-|-$/gu, "");
}

function resolveAnchor(id: string, prefix: string): string {
    return prefix ? `${prefix}-${id}` : id;
}

function resolveLinkHref(link: GuidebookLink, prefix: string): string | null {
    if (!link.href || link.state !== "anchor") {
        return link.href;
    }

    return `#${resolveAnchor(link.href.slice(1), prefix)}`;
}

function renderInline(
    inline: GuidebookInline,
    key: string,
    anchorPrefix: string,
): ReactNode {
    switch (inline.kind) {
        case "text":
            return inline.value;
        case "inline-code":
            return (
                <code className={styles.inlineCode} key={key}>
                    {inline.value}
                </code>
            );
        case "break":
            return <br key={key} />;
        case "emphasis":
            return (
                <em key={key}>
                    {renderInlines(inline.children, key, anchorPrefix)}
                </em>
            );
        case "strong":
            return (
                <strong key={key}>
                    {renderInlines(inline.children, key, anchorPrefix)}
                </strong>
            );
        case "delete":
            return (
                <del key={key}>
                    {renderInlines(inline.children, key, anchorPrefix)}
                </del>
            );
        case "link": {
            const href = resolveLinkHref(inline.link, anchorPrefix);
            const children = renderInlines(inline.children, key, anchorPrefix);

            if (!href) {
                return (
                    <span
                        className={styles.unavailableLink}
                        data-guidebook-link-state={inline.link.state}
                        key={key}
                    >
                        {children}
                        <span className={styles.visuallyHidden}>
                            {inline.link.state === "restricted"
                                ? " — destination privée"
                                : " — lien indisponible"}
                        </span>
                    </span>
                );
            }

            return (
                <PixieLink
                    href={href}
                    variant="inline"
                    indicator={
                        inline.link.state === "external"
                            ? "external"
                            : inline.link.state === "anchor"
                              ? "anchor"
                              : "none"
                    }
                    className={styles.link}
                    data-guidebook-link-state={inline.link.state}
                    key={key}
                >
                    {children}
                </PixieLink>
            );
        }
    }
}

function renderInlines(
    inlines: readonly GuidebookInline[],
    keyPrefix: string,
    anchorPrefix: string,
): ReactNode[] {
    return inlines.map((inline, index) =>
        renderInline(inline, `${keyPrefix}-${index}`, anchorPrefix),
    );
}

function renderListItem(
    item: GuidebookListItem,
    anchorPrefix: string,
): ReactNode {
    return (
        <li
            className={styles.listItem}
            data-task-state={
                typeof item.checked === "boolean"
                    ? item.checked
                        ? "checked"
                        : "unchecked"
                    : undefined
            }
            key={item.id}
        >
            {typeof item.checked === "boolean" ? (
                <span className={styles.taskStatus}>
                    <span aria-hidden="true">{item.checked ? "✓" : "○"}</span>
                    <span className={styles.visuallyHidden}>
                        {item.checked
                            ? "Tâche terminée : "
                            : "Tâche à faire : "}
                    </span>
                </span>
            ) : null}

            <div className={styles.listItemContent}>
                {item.blocks.map((block) =>
                    renderBlock(block, anchorPrefix, 0, false),
                )}
                {item.children.map((list) =>
                    renderList(list, anchorPrefix, false),
                )}
            </div>
        </li>
    );
}

function renderList(
    block: GuidebookListBlock,
    anchorPrefix: string,
    isRootBlock: boolean,
): ReactNode {
    const ListTag = block.ordered ? "ol" : "ul";

    return (
        <ListTag
            className={`${styles.list} ${isRootBlock ? styles.block : ""}`.trim()}
            start={block.ordered ? block.start : undefined}
            data-markdown-block={isRootBlock || undefined}
            key={block.id}
        >
            {block.items.map((item) => renderListItem(item, anchorPrefix))}
        </ListTag>
    );
}

function renderTable(
    block: GuidebookTableBlock,
    anchorPrefix: string,
): ReactNode {
    const [header, ...body] = block.rows;

    if (!header) {
        return null;
    }

    const alignmentClasses = {
        left: styles.alignLeft,
        center: styles.alignCenter,
        right: styles.alignRight,
    } as const;

    const cellClass = (index: number) => {
        const alignment = block.alignments[index];
        return alignment ? alignmentClasses[alignment] : styles.alignLeft;
    };

    return (
        <div
            className={`${styles.tableViewport} ${styles.wideBlock}`}
            role="region"
            aria-label="Tableau documentaire"
            tabIndex={0}
            data-markdown-block
            key={block.id}
        >
            <table className={styles.table}>
                <thead>
                    <tr>
                        {header.map((cell, index) => (
                            <th
                                scope="col"
                                className={cellClass(index)}
                                key={`${block.id}-head-${index}`}
                            >
                                {renderInlines(
                                    cell,
                                    `${block.id}-head-${index}`,
                                    anchorPrefix,
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {body.map((row, rowIndex) => (
                        <tr key={`${block.id}-row-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    className={cellClass(cellIndex)}
                                    key={`${block.id}-cell-${rowIndex}-${cellIndex}`}
                                >
                                    {renderInlines(
                                        cell,
                                        `${block.id}-cell-${rowIndex}-${cellIndex}`,
                                        anchorPrefix,
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function renderBlock(
    block: GuidebookBlock,
    anchorPrefix: string,
    headingOffset: number,
    isRootBlock = true,
): ReactNode {
    switch (block.kind) {
        case "heading": {
            const level = Math.min(6, block.heading.depth + headingOffset);
            const HeadingTag = `h${level}` as ElementType;
            const headingId = resolveAnchor(block.heading.id, anchorPrefix);

            return (
                <HeadingTag
                    id={headingId}
                    className={`${styles.heading} ${styles[`heading${level}`]} ${isRootBlock ? styles.block : ""}`.trim()}
                    data-markdown-block={isRootBlock || undefined}
                    data-source-heading-depth={block.heading.depth}
                    key={block.id}
                >
                    <span>{block.heading.text}</span>
                    <PixieLink
                        href={`#${headingId}`}
                        variant="inline"
                        indicator="anchor"
                        className={styles.headingAnchor}
                        aria-label={`Aller à la section « ${block.heading.text} »`}
                    >
                        <span aria-hidden="true">#</span>
                    </PixieLink>
                </HeadingTag>
            );
        }
        case "paragraph":
            return (
                <p
                    className={`${styles.paragraph} ${isRootBlock ? styles.block : ""}`.trim()}
                    data-markdown-block={isRootBlock || undefined}
                    key={block.id}
                >
                    {renderInlines(block.content, block.id, anchorPrefix)}
                </p>
            );
        case "blockquote":
            return (
                <blockquote
                    className={`${styles.blockquote} ${isRootBlock ? styles.block : ""}`.trim()}
                    data-markdown-block={isRootBlock || undefined}
                    key={block.id}
                >
                    {block.blocks.map((child) =>
                        renderBlock(child, anchorPrefix, headingOffset, false),
                    )}
                </blockquote>
            );
        case "list":
            return renderList(block, anchorPrefix, isRootBlock);
        case "code":
            if (block.presentation === "ascii") {
                return (
                    <PixieDustAscii
                        label={
                            block.alternative || "Composition ASCII du document"
                        }
                        variant="surface"
                        color={false}
                        size="sm"
                        density="compact"
                        padding="md"
                        overflow="auto"
                        width="full"
                        copyable
                        className={styles.wideBlock}
                        data-markdown-block
                        key={block.id}
                    >
                        {block.code}
                    </PixieDustAscii>
                );
            }

            return (
                <figure
                    className={`${styles.codeFigure} ${styles.wideBlock}`}
                    data-markdown-block
                    key={block.id}
                >
                    <figcaption className={styles.codeLanguage}>
                        {block.language || "texte"}
                    </figcaption>
                    <pre
                        className={styles.codeViewport}
                        tabIndex={0}
                        aria-label={`Extrait de code${block.language ? ` en ${block.language}` : ""}`}
                    >
                        <code className={styles.code}>
                            {tokenizeCode(block.code).map((token, index) =>
                                token.kind ? (
                                    <span
                                        className={styles[token.kind]}
                                        key={index}
                                    >
                                        {token.value}
                                    </span>
                                ) : (
                                    token.value
                                ),
                            )}
                        </code>
                    </pre>
                </figure>
            );
        case "table":
            return renderTable(block, anchorPrefix);
        case "thematic-break":
            return (
                <PixieSeparator
                    variant="line"
                    intensity="subtle"
                    width="full"
                    spacing="sm"
                    className={styles.wideBlock}
                    key={block.id}
                />
            );
        case "unsupported":
            return (
                <aside
                    className={`${styles.unsupported} ${styles.block}`}
                    data-markdown-block
                    key={block.id}
                >
                    <strong>Contenu conservé sans mise en forme</strong>
                    {block.plainText ? <p>{block.plainText}</p> : null}
                </aside>
            );
    }
}

export function PixieDustMarkdown({
    blocks,
    as: RootTag = "article",
    density = "comfortable",
    measure = "reading",
    headingOffset = 0,
    headingAnchors = true,
    anchorPrefix = "",
    emptyMessage = "Aucune matière à projeter.",
    className = "",
    ...elementProps
}: PixieDustMarkdownProps) {
    const normalizedPrefix = normalizeAnchorPrefix(anchorPrefix);

    return (
        <RootTag
            {...elementProps}
            className={`${styles.root} ${densityClasses[density]} ${measureClasses[measure]} ${headingAnchors ? styles.withHeadingAnchors : styles.withoutHeadingAnchors} ${className}`.trim()}
            data-pixie-markdown-density={density}
            data-pixie-markdown-measure={measure}
        >
            {blocks.length > 0 ? (
                blocks.map((block) =>
                    renderBlock(block, normalizedPrefix, headingOffset),
                )
            ) : (
                <p className={styles.empty}>{emptyMessage}</p>
            )}
        </RootTag>
    );
}
