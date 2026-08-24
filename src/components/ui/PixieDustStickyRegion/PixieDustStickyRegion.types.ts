import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustStickyRegionElement = "div" | "aside" | "nav" | "header";

export type PixieDustStickyRegionEdge = "start" | "end";

export type PixieDustStickyRegionOffset =
    "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustStickyRegionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustStickyRegionElement;
        edge?: PixieDustStickyRegionEdge;
        offset?: PixieDustStickyRegionOffset;
        children: ReactNode;
    }
>;
