import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustCalloutElement = "aside" | "section" | "div";

export type PixieDustCalloutVariant =
    "subtle" | "outline" | "accent" | "spotlight";

export type PixieDustCalloutLayout = "stacked" | "inline";

export type PixieDustCalloutPadding = "sm" | "md" | "lg";

export type PixieDustCalloutRadius = "none" | "small" | "medium" | "large";

export type PixieDustCalloutColor = AtelierAnimationColorSlug | false;

export type PixieDustCalloutStyle = CSSProperties & {
    "--pixie-callout-color"?: string;
};

export type PixieDustCalloutProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustCalloutElement;
        variant?: PixieDustCalloutVariant;
        layout?: PixieDustCalloutLayout;
        padding?: PixieDustCalloutPadding;
        radius?: PixieDustCalloutRadius;
        color?: PixieDustCalloutColor;
        icon?: ReactNode;
        eyebrow?: ReactNode;
        heading?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
