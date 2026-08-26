import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustGridElement = "div" | "ul" | "ol";

export type PixieDustGridMaxColumns = 1 | 2 | 3 | 4 | 5 | 6;

export type PixieDustGridMinItemWidth = "xs" | "sm" | "md" | "lg";

export type PixieDustGridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustGridAlign = "stretch" | "start" | "center" | "end";

export type PixieDustGridJustify = "stretch" | "start" | "center" | "end";

export type PixieDustGridDistribution = "fit" | "fill";

export type PixieDustGridProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustGridElement;
        maxColumns?: PixieDustGridMaxColumns;
        minItemWidth?: PixieDustGridMinItemWidth;
        gap?: PixieDustGridGap;
        rowGap?: PixieDustGridGap;
        columnGap?: PixieDustGridGap;
        align?: PixieDustGridAlign;
        justify?: PixieDustGridJustify;
        distribution?: PixieDustGridDistribution;
        children: ReactNode;
    }
>;
