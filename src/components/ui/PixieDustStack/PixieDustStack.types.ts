import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustStackElement =
    "div" | "section" | "article" | "nav" | "ul" | "ol";

export type PixieDustStackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustStackAlign = "stretch" | "start" | "center" | "end";

export type PixieDustStackProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustStackElement;
        gap?: PixieDustStackGap;
        align?: PixieDustStackAlign;
        children: ReactNode;
    }
>;
