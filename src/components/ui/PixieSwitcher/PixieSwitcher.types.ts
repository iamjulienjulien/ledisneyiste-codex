import type { HTMLAttributes, ReactNode } from "react";

export type PixieSwitcherElement = "div" | "section" | "nav" | "ul" | "ol";

export type PixieSwitcherLayout = "auto" | "row" | "stack";

export type PixieSwitcherThreshold = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieSwitcherLimit = false | 2 | 3 | 4 | 5 | 6;

export type PixieSwitcherGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieSwitcherAlign = "stretch" | "start" | "center" | "end";

export type PixieSwitcherProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieSwitcherElement;
        layout?: PixieSwitcherLayout;
        threshold?: PixieSwitcherThreshold;
        limit?: PixieSwitcherLimit;
        gap?: PixieSwitcherGap;
        rowGap?: PixieSwitcherGap;
        columnGap?: PixieSwitcherGap;
        align?: PixieSwitcherAlign;
        children: ReactNode;
    }
>;
