import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { GuidebookBlock } from "@/types/guidebook";

export type PixieDustMarkdownElement = "article" | "section" | "div";

export type PixieDustMarkdownDensity = "compact" | "comfortable" | "airy";

export type PixieDustMarkdownMeasure = "reading" | "wide" | "full";

export type PixieDustMarkdownHeadingOffset = 0 | 1 | 2 | 3;

export type PixieDustMarkdownStyle = CSSProperties & {
    "--pixie-markdown-measure"?: string;
};

export type PixieDustMarkdownProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "style"> & {
        blocks: readonly GuidebookBlock[];
        as?: PixieDustMarkdownElement;
        density?: PixieDustMarkdownDensity;
        measure?: PixieDustMarkdownMeasure;
        headingOffset?: PixieDustMarkdownHeadingOffset;
        headingAnchors?: boolean;
        anchorPrefix?: string;
        emptyMessage?: ReactNode;
        style?: PixieDustMarkdownStyle;
    }
>;
