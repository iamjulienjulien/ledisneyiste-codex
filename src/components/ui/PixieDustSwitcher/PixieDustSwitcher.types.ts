import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustSwitcherElement = "div" | "ul" | "ol";

export type PixieDustSwitcherThreshold = "xs" | "sm" | "md" | "lg";

export type PixieDustSwitcherLimit = 2 | 3 | 4 | 5 | 6;

export type PixieDustSwitcherGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustSwitcherAlign = "stretch" | "start" | "center" | "end";

export type PixieDustSwitcherProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustSwitcherElement;
        threshold?: PixieDustSwitcherThreshold;
        limit?: PixieDustSwitcherLimit;
        gap?: PixieDustSwitcherGap;
        align?: PixieDustSwitcherAlign;
        children: ReactNode;
    }
>;
