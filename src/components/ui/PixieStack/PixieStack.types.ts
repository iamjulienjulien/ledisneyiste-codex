import type { HTMLAttributes, ReactNode } from "react";

export type PixieStackElement =
    "div" | "section" | "article" | "nav" | "ul" | "ol";

export type PixieStackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieStackAlign = "stretch" | "start" | "center" | "end";

export type PixieStackProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieStackElement;
        gap?: PixieStackGap;
        align?: PixieStackAlign;
        children: ReactNode;
    }
>;
