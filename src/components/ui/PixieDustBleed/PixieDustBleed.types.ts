import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustBleedElement = "div" | "figure" | "section";

export type PixieDustBleedSide = "start" | "end" | "both";

export type PixieDustBleedExtent = "sm" | "md" | "lg" | "xl" | "viewport";

export type PixieDustBleedGutter = "none" | "sm" | "md" | "lg";

export type PixieDustBleedProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustBleedElement;
        side?: PixieDustBleedSide;
        extent?: PixieDustBleedExtent;
        gutter?: PixieDustBleedGutter;
        children: ReactNode;
    }
>;
