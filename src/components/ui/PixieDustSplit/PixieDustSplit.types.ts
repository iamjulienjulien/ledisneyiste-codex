import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustSplitElement = "div" | "section" | "article";

export type PixieDustSplitRatio = "equal" | "start-wide" | "end-wide";

export type PixieDustSplitMinPaneWidth = "xs" | "sm" | "md" | "lg";

export type PixieDustSplitGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustSplitAlign = "stretch" | "start" | "center" | "end";

export type PixieDustSplitChildren = readonly [ReactNode, ReactNode];

export type PixieDustSplitProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustSplitElement;
        ratio?: PixieDustSplitRatio;
        minPaneWidth?: PixieDustSplitMinPaneWidth;
        gap?: PixieDustSplitGap;
        align?: PixieDustSplitAlign;
        children: PixieDustSplitChildren;
    }
>;
