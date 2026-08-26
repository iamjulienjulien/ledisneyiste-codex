import type { HTMLAttributes, ReactNode } from "react";
import type {
    PixieContainerGutter,
    PixieContainerWidth,
} from "@/components/ui/PixieContainer";
import type {
    PixieStackAlign,
    PixieStackGap,
} from "@/components/ui/PixieStack";

export type PixieDustSectionElement = "section" | "article" | "div";

export type PixieDustSectionWidth = PixieContainerWidth;

export type PixieDustSectionGutter = PixieContainerGutter;

export type PixieDustSectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustSectionGap = PixieStackGap;

export type PixieDustSectionAlign = PixieStackAlign;

export type PixieDustSectionProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustSectionElement;
        width?: PixieDustSectionWidth;
        gutter?: PixieDustSectionGutter;
        spacing?: PixieDustSectionSpacing;
        spacingStart?: PixieDustSectionSpacing;
        spacingEnd?: PixieDustSectionSpacing;
        gap?: PixieDustSectionGap;
        align?: PixieDustSectionAlign;
        children: ReactNode;
    }
>;
