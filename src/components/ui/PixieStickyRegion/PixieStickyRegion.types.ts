import type { HTMLAttributes, ReactNode } from "react";

export type PixieStickyRegionElement =
    "div" | "aside" | "nav" | "header" | "footer";

export type PixieStickyRegionEdge = "start" | "end";

export type PixieStickyRegionOffsetPreset =
    "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieStickyRegionOffset = PixieStickyRegionOffsetPreset | number;

export type PixieStickyRegionWidth = "full" | "fit";

export type PixieStickyRegionOverflow = "visible" | "auto";

export type PixieStickyRegionLayer = "auto" | "raised" | "overlay";

export type PixieStickyRegionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieStickyRegionElement;
        edge?: PixieStickyRegionEdge;
        offset?: PixieStickyRegionOffset;
        width?: PixieStickyRegionWidth;
        overflow?: PixieStickyRegionOverflow;
        safeArea?: boolean;
        layer?: PixieStickyRegionLayer;
        children: ReactNode;
    }
>;
