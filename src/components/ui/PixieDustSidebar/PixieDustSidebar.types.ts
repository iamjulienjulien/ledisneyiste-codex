import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustSidebarElement = "div" | "section" | "article";

export type PixieDustSidebarSide = "start" | "end";

export type PixieDustSidebarSideWidth = "xs" | "sm" | "md" | "lg";

export type PixieDustSidebarContentMinWidth =
    "half" | "two-thirds" | "three-quarters";

export type PixieDustSidebarGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustSidebarAlign = "stretch" | "start" | "center" | "end";

export type PixieDustSidebarChildren = readonly [ReactNode, ReactNode];

export type PixieDustSidebarProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustSidebarElement;
        side?: PixieDustSidebarSide;
        sideWidth?: PixieDustSidebarSideWidth;
        contentMinWidth?: PixieDustSidebarContentMinWidth;
        gap?: PixieDustSidebarGap;
        align?: PixieDustSidebarAlign;
        children: PixieDustSidebarChildren;
    }
>;
