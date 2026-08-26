import type { HTMLAttributes, ReactNode } from "react";
import type {
    PixieContainerGutter,
    PixieContainerWidth,
} from "@/components/ui/PixieContainer";
import type {
    PixieStackAlign,
    PixieStackGap,
} from "@/components/ui/PixieStack";

export type PixieSectionElement = "section" | "article" | "div";

export type PixieSectionWidth = PixieContainerWidth;

export type PixieSectionGutter = PixieContainerGutter;

export type PixieSectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type PixieSectionGap = PixieStackGap;

export type PixieSectionAlign = PixieStackAlign;

export type PixieSectionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieSectionElement;
        width?: PixieSectionWidth;
        gutter?: PixieSectionGutter;
        spacing?: PixieSectionSpacing;
        spacingStart?: PixieSectionSpacing;
        spacingEnd?: PixieSectionSpacing;
        gap?: PixieSectionGap;
        align?: PixieSectionAlign;
        children: ReactNode;
    }
>;
