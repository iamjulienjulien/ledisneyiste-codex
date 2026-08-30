import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { GuidebookBlock } from "@/types/guidebook";

export type PixieMarkdownElement = "article" | "section" | "div";

export type PixieMarkdownDensity = "compact" | "comfortable" | "airy";

export type PixieMarkdownMeasure = "reading" | "wide" | "full";

export type PixieMarkdownHeadingOffset = 0 | 1 | 2 | 3;

export type PixieMarkdownHeadingScale = "display" | "reading" | "compact";

export type PixieMarkdownWideBlocks = "frame" | "measure";

export type PixieMarkdownCodeOverflow = "scroll" | "wrap";

export type PixieMarkdownTableLayout = "auto" | "fixed";

export type PixieMarkdownColor = AtelierAnimationColorSlug | false;

export type PixieMarkdownStyle = CSSProperties & {
    "--pixie-markdown-measure"?: string;
    "--pixie-markdown-color"?: string;
};

export type PixieMarkdownProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color" | "style"> & {
        blocks: readonly GuidebookBlock[];
        as?: PixieMarkdownElement;
        density?: PixieMarkdownDensity;
        measure?: PixieMarkdownMeasure;
        color?: PixieMarkdownColor;
        headingOffset?: PixieMarkdownHeadingOffset;
        headingScale?: PixieMarkdownHeadingScale;
        headingAnchors?: boolean;
        anchorPrefix?: string;
        wideBlocks?: PixieMarkdownWideBlocks;
        codeOverflow?: PixieMarkdownCodeOverflow;
        codeLineNumbers?: boolean;
        tableLayout?: PixieMarkdownTableLayout;
        asciiCopyable?: boolean;
        emptyMessage?: ReactNode;
        style?: PixieMarkdownStyle;
    }
>;
