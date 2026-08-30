import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { GuidebookBlock } from "@/types/guidebook";

export type PixieDustMarkdownElement = "article" | "section" | "div";

export type PixieDustMarkdownDensity = "compact" | "comfortable" | "airy";

export type PixieDustMarkdownMeasure = "reading" | "wide" | "full";

export type PixieDustMarkdownHeadingOffset = 0 | 1 | 2 | 3;

export type PixieDustMarkdownHeadingScale = "display" | "reading" | "compact";

export type PixieDustMarkdownWideBlocks = "frame" | "measure";

export type PixieDustMarkdownCodeOverflow = "scroll" | "wrap";

export type PixieDustMarkdownTableLayout = "auto" | "fixed";

export type PixieDustMarkdownColor = AtelierAnimationColorSlug | false;

export type PixieDustMarkdownStyle = CSSProperties & {
    "--pixie-markdown-measure"?: string;
    "--pixie-markdown-color"?: string;
};

export type PixieDustMarkdownProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color" | "style"> & {
        blocks: readonly GuidebookBlock[];
        as?: PixieDustMarkdownElement;
        density?: PixieDustMarkdownDensity;
        measure?: PixieDustMarkdownMeasure;
        color?: PixieDustMarkdownColor;
        headingOffset?: PixieDustMarkdownHeadingOffset;
        headingScale?: PixieDustMarkdownHeadingScale;
        headingAnchors?: boolean;
        anchorPrefix?: string;
        wideBlocks?: PixieDustMarkdownWideBlocks;
        codeOverflow?: PixieDustMarkdownCodeOverflow;
        codeLineNumbers?: boolean;
        tableLayout?: PixieDustMarkdownTableLayout;
        asciiCopyable?: boolean;
        emptyMessage?: ReactNode;
        style?: PixieDustMarkdownStyle;
    }
>;
