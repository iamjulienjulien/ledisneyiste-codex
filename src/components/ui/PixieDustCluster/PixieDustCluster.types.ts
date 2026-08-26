import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustClusterElement = "div" | "section" | "nav" | "ul";

export type PixieDustClusterGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustClusterJustify = "start" | "center" | "end" | "between";

export type PixieDustClusterAlign = "start" | "center" | "end" | "baseline";

export type PixieDustClusterProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustClusterElement;
        gap?: PixieDustClusterGap;
        justify?: PixieDustClusterJustify;
        align?: PixieDustClusterAlign;
        children: ReactNode;
    }
>;
