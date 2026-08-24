import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustRailElement = "div" | "ul" | "ol";

export type PixieDustRailItemWidth = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustRailGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustRailGutter = "none" | "sm" | "md" | "lg";

export type PixieDustRailSnap = "none" | "start" | "center";

export type PixieDustRailAlign = "stretch" | "start" | "center" | "end";

export type PixieDustRailProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustRailElement;
        itemWidth?: PixieDustRailItemWidth;
        gap?: PixieDustRailGap;
        gutter?: PixieDustRailGutter;
        snap?: PixieDustRailSnap;
        align?: PixieDustRailAlign;
        peek?: boolean;
        children: ReactNode;
    }
>;
