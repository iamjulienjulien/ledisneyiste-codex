export type GuidebookSourceKind = "local" | "notion";

export type GuidebookDocumentState =
    | "ready"
    | "empty"
    | "missing"
    | "partial"
    | "restricted"
    | "stale"
    | "unavailable"
    | "deferred";

export type GuidebookLinkState =
    "internal" | "external" | "anchor" | "restricted" | "invalid";

export type GuidebookBlockKind =
    | "heading"
    | "paragraph"
    | "blockquote"
    | "list"
    | "code"
    | "table"
    | "thematic-break"
    | "unsupported";

export type GuidebookHeading = {
    id: string;
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
};

export type GuidebookTableOfContentsItem = GuidebookHeading & {
    children: GuidebookTableOfContentsItem[];
};

export type GuidebookLink = {
    label: string;
    href: string | null;
    state: GuidebookLinkState;
    targetSlug?: string;
};

export type GuidebookInline =
    | {
          kind: "text" | "inline-code";
          value: string;
      }
    | {
          kind: "emphasis" | "strong" | "delete";
          children: GuidebookInline[];
      }
    | {
          kind: "link";
          link: GuidebookLink;
          children: GuidebookInline[];
      }
    | {
          kind: "break";
      };

type GuidebookBlockBase = {
    id: string;
    kind: GuidebookBlockKind;
};

export type GuidebookHeadingBlock = GuidebookBlockBase & {
    kind: "heading";
    heading: GuidebookHeading;
};

export type GuidebookParagraphBlock = GuidebookBlockBase & {
    kind: "paragraph";
    content: GuidebookInline[];
};

export type GuidebookBlockquoteBlock = GuidebookBlockBase & {
    kind: "blockquote";
    blocks: GuidebookBlock[];
};

export type GuidebookListItem = {
    id: string;
    checked?: boolean;
    blocks: GuidebookBlock[];
    children: GuidebookListBlock[];
};

export type GuidebookListBlock = GuidebookBlockBase & {
    kind: "list";
    ordered: boolean;
    start?: number;
    items: GuidebookListItem[];
};

export type GuidebookCodeBlock = GuidebookBlockBase & {
    kind: "code";
    code: string;
    language?: string;
    presentation: "code" | "ascii";
    asciiKind?: "composition" | "studio-card";
    alternative?: string;
};

export type GuidebookTableBlock = GuidebookBlockBase & {
    kind: "table";
    alignments: Array<"left" | "center" | "right" | null>;
    rows: GuidebookInline[][][];
};

export type GuidebookThematicBreakBlock = GuidebookBlockBase & {
    kind: "thematic-break";
};

export type GuidebookUnsupportedBlock = GuidebookBlockBase & {
    kind: "unsupported";
    sourceType: string;
    plainText: string;
};

export type GuidebookBlock =
    | GuidebookHeadingBlock
    | GuidebookParagraphBlock
    | GuidebookBlockquoteBlock
    | GuidebookListBlock
    | GuidebookCodeBlock
    | GuidebookTableBlock
    | GuidebookThematicBreakBlock
    | GuidebookUnsupportedBlock;

export type GuidebookMarkdownAnalysis = {
    blocks: GuidebookBlock[];
    headings: GuidebookHeading[];
    tableOfContents: GuidebookTableOfContentsItem[];
    links: GuidebookLink[];
    warnings: string[];
};

export type GuidebookDocument = {
    slug: string;
    title: string;
    source: GuidebookSourceKind;
    state: GuidebookDocumentState;
    analysis: GuidebookMarkdownAnalysis | null;
    updatedAt?: string;
};

export type GuidebookNavigationNode = {
    slug: string;
    title: string;
    order: number;
    children: GuidebookNavigationNode[];
};

export type GuidebookProjectionTree = {
    version: 1;
    title: string;
    nodes: GuidebookNavigationNode[];
};

export type GuidebookLibrary = {
    title: string;
    state: GuidebookDocumentState;
    navigation: GuidebookNavigationNode[];
    document: GuidebookDocument | null;
};
