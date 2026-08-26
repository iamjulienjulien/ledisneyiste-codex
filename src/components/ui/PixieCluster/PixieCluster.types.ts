import type { HTMLAttributes, ReactNode } from "react";

export type PixieClusterElement = "div" | "section" | "nav" | "ul";

export type PixieClusterGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieClusterJustify = "start" | "center" | "end" | "between";

export type PixieClusterAlign = "start" | "center" | "end" | "baseline";

export type PixieClusterProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieClusterElement;
        gap?: PixieClusterGap;
        justify?: PixieClusterJustify;
        align?: PixieClusterAlign;
        children: ReactNode;
    }
>;
