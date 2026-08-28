import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustStickyRegionElement =
    "div" | "aside" | "nav" | "header" | "footer";

export type PixieDustStickyRegionEdge = "start" | "end";

export type PixieDustStickyRegionOffsetPreset =
    "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustStickyRegionOffset =
    PixieDustStickyRegionOffsetPreset | number;

export type PixieDustStickyRegionWidth = "full" | "fit";

export type PixieDustStickyRegionOverflow = "visible" | "auto";

export type PixieDustStickyRegionLayer = "auto" | "raised" | "overlay";

export type PixieDustStickyRegionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustStickyRegionElement;
        edge?: PixieDustStickyRegionEdge;
        offset?: PixieDustStickyRegionOffset;
        width?: PixieDustStickyRegionWidth;
        overflow?: PixieDustStickyRegionOverflow;
        safeArea?: boolean;
        layer?: PixieDustStickyRegionLayer;
        children: ReactNode;
    }
>;
