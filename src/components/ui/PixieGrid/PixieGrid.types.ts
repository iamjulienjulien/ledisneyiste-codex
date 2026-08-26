import type { HTMLAttributes, ReactNode } from "react";

export type PixieGridElement = "div" | "ul" | "ol";

export type PixieGridMaxColumns = 1 | 2 | 3 | 4 | 5 | 6;

export type PixieGridMinItemWidth = "xs" | "sm" | "md" | "lg";

export type PixieGridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieGridAlign = "stretch" | "start" | "center" | "end";

export type PixieGridJustify = "stretch" | "start" | "center" | "end";

export type PixieGridDistribution = "fit" | "fill";

export type PixieGridProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieGridElement;
        maxColumns?: PixieGridMaxColumns;
        minItemWidth?: PixieGridMinItemWidth;
        gap?: PixieGridGap;
        rowGap?: PixieGridGap;
        columnGap?: PixieGridGap;
        align?: PixieGridAlign;
        justify?: PixieGridJustify;
        distribution?: PixieGridDistribution;
        children: ReactNode;
    }
>;
