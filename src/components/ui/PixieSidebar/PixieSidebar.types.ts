import type { HTMLAttributes, ReactNode } from "react";

export type PixieSidebarElement = "div" | "section" | "article";

export type PixieSidebarSide = "start" | "end";

export type PixieSidebarSideWidth = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieSidebarContentMinWidth =
    "half" | "two-thirds" | "three-quarters";

export type PixieSidebarGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieSidebarAlign = "stretch" | "start" | "center" | "end";

export type PixieSidebarProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieSidebarElement;
        side?: PixieSidebarSide;
        sideWidth?: PixieSidebarSideWidth;
        contentMinWidth?: PixieSidebarContentMinWidth;
        gap?: PixieSidebarGap;
        rowGap?: PixieSidebarGap;
        columnGap?: PixieSidebarGap;
        align?: PixieSidebarAlign;
        sidebar: ReactNode;
        children: ReactNode;
    }
>;
