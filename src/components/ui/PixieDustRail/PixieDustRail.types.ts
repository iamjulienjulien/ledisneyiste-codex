import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustRailElement = "div" | "ul" | "ol";

export type PixieDustRailItemWidthPreset =
    "auto" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustRailItemWidth = PixieDustRailItemWidthPreset | number;

export type PixieDustRailGapPreset = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustRailGap = PixieDustRailGapPreset | number;

export type PixieDustRailGutterPreset = "none" | "sm" | "md" | "lg";

export type PixieDustRailGutter = PixieDustRailGutterPreset | number;

export type PixieDustRailPeek = "none" | "subtle" | "strong";

export type PixieDustRailSnap = "none" | "proximity" | "mandatory";

export type PixieDustRailSnapAlign = "start" | "center" | "end";

export type PixieDustRailSnapStop = "normal" | "always";

export type PixieDustRailAlign = "stretch" | "start" | "center" | "end";

export type PixieDustRailScrollbar = "auto" | "thin" | "hidden";

export type PixieDustRailOverscroll = "auto" | "contain";

export type PixieDustRailProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustRailElement;
        itemWidth?: PixieDustRailItemWidth;
        gap?: PixieDustRailGap;
        gutter?: PixieDustRailGutter;
        peek?: PixieDustRailPeek;
        snap?: PixieDustRailSnap;
        snapAlign?: PixieDustRailSnapAlign;
        snapStop?: PixieDustRailSnapStop;
        align?: PixieDustRailAlign;
        scrollbar?: PixieDustRailScrollbar;
        overscroll?: PixieDustRailOverscroll;
        children: ReactNode;
    }
>;
