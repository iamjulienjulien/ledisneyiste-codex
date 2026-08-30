import type { ElementType, ReactNode } from "react";
import { tokenizeCode, type CodeToken } from "@/lib/code-tokens";
import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    GuidebookBlock,
    GuidebookInline,
    GuidebookLink,
    GuidebookListBlock,
    GuidebookListItem,
    GuidebookTableBlock,
} from "@/types/guidebook";
import { PixieAscii } from "@/components/ui/PixieAscii";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import styles from "./PixieDustMarkdown.module.css";
import type {
    PixieDustMarkdownCodeOverflow,
    PixieDustMarkdownDensity,
    PixieDustMarkdownHeadingScale,
    PixieDustMarkdownMeasure,
    PixieDustMarkdownProps,
    PixieDustMarkdownStyle,
    PixieDustMarkdownTableLayout,
    PixieDustMarkdownWideBlocks,
} from "./PixieDustMarkdown.types";

const densityClasses = {
    compact: styles.densityCompact,
    comfortable: "",
    airy: styles.densityAiry,
} as const satisfies Record<PixieDustMarkdownDensity, string>;

const measureClasses = {
    reading: styles.measureReading,
    wide: styles.measureWide,
    full: styles.measureFull,
} as const satisfies Record<PixieDustMarkdownMeasure, string>;

const codeOverflowClasses = {
    scroll: styles.codeScroll,
    wrap: styles.codeWrap,
} as const satisfies Record<PixieDustMarkdownCodeOverflow, string>;

const tableLayoutClasses = {
    auto: "",
    fixed: styles.tableFixed,
} as const satisfies Record<PixieDustMarkdownTableLayout, string>;

type RenderContext = {
    anchorPrefix: string;
    headingOffset: number;
    headingScale: PixieDustMarkdownHeadingScale;
    wideBlocks: PixieDustMarkdownWideBlocks;
    codeOverflow: PixieDustMarkdownCodeOverflow;
    codeLineNumbers: boolean;
    tableLayout: PixieDustMarkdownTableLayout;
    asciiCopyable: boolean;
    color: PixieDustMarkdownProps["color"];
};

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
    context: RenderContext,
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
                {item.blocks.map((block) => renderBlock(block, context, false))}
                {item.children.map((list) => renderList(list, context, false))}
            </div>
        </li>
    );
}

function renderList(
    block: GuidebookListBlock,
    context: RenderContext,
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
            {block.items.map((item) => renderListItem(item, context))}
        </ListTag>
    );
}

function getWideBlockClass(context: RenderContext): string {
    return context.wideBlocks === "measure" ? styles.block : styles.wideBlock;
}

function getVisualHeadingLevel(
    sourceDepth: number,
    scale: PixieDustMarkdownHeadingScale,
): number {
    const shift = scale === "display" ? 0 : scale === "reading" ? 1 : 2;
    return Math.min(6, sourceDepth + shift);
}

function splitCodeTokensByLine(tokens: readonly CodeToken[]): CodeToken[][] {
    const lines: CodeToken[][] = [[]];

    for (const token of tokens) {
        const parts = token.value.split("\n");

        parts.forEach((part, index) => {
            if (part) {
                lines[lines.length - 1].push(
                    token.kind
                        ? { value: part, kind: token.kind }
                        : { value: part },
                );
            }

            if (index < parts.length - 1) {
                lines.push([]);
            }
        });
    }

    return lines;
}

function renderCodeToken(token: CodeToken, key: string): ReactNode {
    return token.kind ? (
        <span className={styles[token.kind]} key={key}>
            {token.value}
        </span>
    ) : (
        token.value
    );
}

function renderTable(
    block: GuidebookTableBlock,
    context: RenderContext,
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
            className={`${styles.tableViewport} ${getWideBlockClass(context)}`}
            role="region"
            aria-label="Tableau documentaire"
            tabIndex={0}
            data-markdown-block
            key={block.id}
        >
            <table
                className={`${styles.table} ${tableLayoutClasses[context.tableLayout]}`.trim()}
            >
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
                                    context.anchorPrefix,
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
                                        context.anchorPrefix,
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
    context: RenderContext,
    isRootBlock = true,
): ReactNode {
    switch (block.kind) {
        case "heading": {
            const level = Math.min(
                6,
                block.heading.depth + context.headingOffset,
            );
            const visualLevel = getVisualHeadingLevel(
                block.heading.depth,
                context.headingScale,
            );
            const HeadingTag = `h${level}` as ElementType;
            const headingId = resolveAnchor(
                block.heading.id,
                context.anchorPrefix,
            );

            return (
                <HeadingTag
                    id={headingId}
                    className={`${styles.heading} ${styles[`heading${visualLevel}`]} ${isRootBlock ? styles.block : ""}`.trim()}
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
                    {renderInlines(
                        block.content,
                        block.id,
                        context.anchorPrefix,
                    )}
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
                        renderBlock(child, context, false),
                    )}
                </blockquote>
            );
        case "list":
            return renderList(block, context, isRootBlock);
        case "code":
            if (block.presentation === "ascii") {
                return (
                    <PixieAscii
                        label="Composition ASCII du document"
                        alternative={block.alternative}
                        variant="surface"
                        color={context.color}
                        size="sm"
                        density="compact"
                        padding="md"
                        overflow="auto"
                        width="full"
                        copyable={context.asciiCopyable}
                        className={getWideBlockClass(context)}
                        data-markdown-block
                        key={block.id}
                    >
                        {block.code}
                    </PixieAscii>
                );
            }

            const codeTokens = tokenizeCode(block.code);
            const codeLines = context.codeLineNumbers
                ? splitCodeTokensByLine(codeTokens)
                : [];

            return (
                <figure
                    className={`${styles.codeFigure} ${getWideBlockClass(context)}`}
                    data-markdown-block
                    key={block.id}
                >
                    <figcaption className={styles.codeLanguage}>
                        {block.language || "texte"}
                    </figcaption>
                    <pre
                        className={`${styles.codeViewport} ${codeOverflowClasses[context.codeOverflow]}`}
                        tabIndex={0}
                        aria-label={`Extrait de code${block.language ? ` en ${block.language}` : ""}`}
                    >
                        <code
                            className={`${styles.code} ${context.codeLineNumbers ? styles.codeWithLineNumbers : ""}`.trim()}
                        >
                            {context.codeLineNumbers
                                ? codeLines.map((line, lineIndex) => (
                                      <span
                                          className={styles.codeLine}
                                          key={`${block.id}-line-${lineIndex}`}
                                      >
                                          <span
                                              className={styles.codeLineNumber}
                                              aria-hidden="true"
                                          >
                                              {lineIndex + 1}
                                          </span>
                                          <span
                                              className={styles.codeLineContent}
                                          >
                                              {line.length > 0
                                                  ? line.map(
                                                        (token, tokenIndex) =>
                                                            renderCodeToken(
                                                                token,
                                                                `${block.id}-line-${lineIndex}-token-${tokenIndex}`,
                                                            ),
                                                    )
                                                  : " "}
                                          </span>
                                      </span>
                                  ))
                                : codeTokens.map((token, index) =>
                                      renderCodeToken(
                                          token,
                                          `${block.id}-token-${index}`,
                                      ),
                                  )}
                        </code>
                    </pre>
                </figure>
            );
        case "table":
            return renderTable(block, context);
        case "thematic-break":
            return (
                <PixieSeparator
                    variant="line"
                    intensity="subtle"
                    color={context.color}
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
                    <span className={styles.unsupportedType}>
                        {block.sourceType}
                    </span>
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
    color = false,
    headingOffset = 0,
    headingScale = "display",
    headingAnchors = true,
    anchorPrefix = "",
    wideBlocks = "frame",
    codeOverflow = "scroll",
    codeLineNumbers = false,
    tableLayout = "auto",
    asciiCopyable = true,
    emptyMessage = "Aucune matière à projeter.",
    className = "",
    style,
    ...elementProps
}: PixieDustMarkdownProps) {
    const normalizedPrefix = normalizeAnchorPrefix(anchorPrefix);
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const markdownStyle: PixieDustMarkdownStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-markdown-color": colorDefinition.cssValue }
            : {}),
    };
    const renderContext: RenderContext = {
        anchorPrefix: normalizedPrefix,
        headingOffset,
        headingScale,
        wideBlocks,
        codeOverflow,
        codeLineNumbers,
        tableLayout,
        asciiCopyable,
        color,
    };

    return (
        <RootTag
            {...elementProps}
            className={`${styles.root} ${densityClasses[density]} ${measureClasses[measure]} ${headingAnchors ? "" : styles.withoutHeadingAnchors} ${className}`.trim()}
            style={markdownStyle}
            data-pixie-markdown-density={density}
            data-pixie-markdown-measure={measure}
            data-pixie-markdown-color={color || "theme"}
            data-pixie-markdown-heading-scale={headingScale}
            data-pixie-markdown-heading-anchors={headingAnchors}
            data-pixie-markdown-wide-blocks={wideBlocks}
            data-pixie-markdown-code-overflow={codeOverflow}
            data-pixie-markdown-code-line-numbers={codeLineNumbers || undefined}
            data-pixie-markdown-table-layout={tableLayout}
            data-pixie-markdown-ascii-copyable={asciiCopyable}
        >
            {blocks.length > 0 ? (
                blocks.map((block) => renderBlock(block, renderContext))
            ) : (
                <p className={styles.empty}>{emptyMessage}</p>
            )}
        </RootTag>
    );
}
