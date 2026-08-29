import type { HTMLAttributes, ReactNode } from "react";

export type PixieRailElement = "div" | "ul" | "ol";

export type PixieRailItemWidthPreset =
    "auto" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieRailItemWidth = PixieRailItemWidthPreset | number;

export type PixieRailGapPreset = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieRailGap = PixieRailGapPreset | number;

export type PixieRailGutterPreset = "none" | "sm" | "md" | "lg";

export type PixieRailGutter = PixieRailGutterPreset | number;

export type PixieRailPeek = "none" | "subtle" | "strong";

export type PixieRailSnap = "none" | "proximity" | "mandatory";

export type PixieRailSnapAlign = "start" | "center" | "end";

export type PixieRailSnapStop = "normal" | "always";

export type PixieRailAlign = "stretch" | "start" | "center" | "end";

export type PixieRailScrollbar = "auto" | "thin" | "hidden";

export type PixieRailOverscroll = "auto" | "contain";

export type PixieRailProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieRailElement;
        itemWidth?: PixieRailItemWidth;
        gap?: PixieRailGap;
        gutter?: PixieRailGutter;
        peek?: PixieRailPeek;
        snap?: PixieRailSnap;
        snapAlign?: PixieRailSnapAlign;
        snapStop?: PixieRailSnapStop;
        align?: PixieRailAlign;
        scrollbar?: PixieRailScrollbar;
        overscroll?: PixieRailOverscroll;
        children: ReactNode;
    }
>;
