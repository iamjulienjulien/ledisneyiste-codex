import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustGridElement = "div" | "ul" | "ol";

export type PixieDustGridColumns = 1 | 2 | 3 | 4 | 5 | 6;

export type PixieDustGridMinItemWidth = "xs" | "sm" | "md" | "lg";

export type PixieDustGridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustGridAlign = "stretch" | "start" | "center" | "end";

export type PixieDustGridProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustGridElement;
        columns?: PixieDustGridColumns;
        minItemWidth?: PixieDustGridMinItemWidth;
        gap?: PixieDustGridGap;
        align?: PixieDustGridAlign;
        children: ReactNode;
    }
>;
