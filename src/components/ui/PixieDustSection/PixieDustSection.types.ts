import type { HTMLAttributes, ReactNode } from "react";
import type {
    PixieDustContainerGutter,
    PixieDustContainerWidth,
} from "@/components/ui/PixieDustContainer";
import type {
    PixieDustStackAlign,
    PixieDustStackGap,
} from "@/components/ui/PixieDustStack";

export type PixieDustSectionElement = "section" | "article" | "div";

export type PixieDustSectionWidth = PixieDustContainerWidth;

export type PixieDustSectionGutter = PixieDustContainerGutter;

export type PixieDustSectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustSectionGap = PixieDustStackGap;

export type PixieDustSectionAlign = PixieDustStackAlign;

export type PixieDustSectionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustSectionElement;
        width?: PixieDustSectionWidth;
        gutter?: PixieDustSectionGutter;
        spacing?: PixieDustSectionSpacing;
        gap?: PixieDustSectionGap;
        align?: PixieDustSectionAlign;
        children: ReactNode;
    }
>;
