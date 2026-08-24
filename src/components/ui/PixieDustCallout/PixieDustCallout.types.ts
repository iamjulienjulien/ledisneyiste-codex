import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustCalloutElement = "aside" | "section" | "div";

export type PixieDustCalloutVariant =
    "plain" | "subtle" | "outline" | "accent" | "tinted";

export type PixieDustCalloutLayout = "stacked" | "inline" | "header";

export type PixieDustCalloutPadding = "sm" | "md" | "lg" | "xl";

export type PixieDustCalloutRadius = "none" | "small" | "medium" | "large";

export type PixieDustCalloutColor = AtelierAnimationColorSlug | false;

export type PixieDustCalloutAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieDustCalloutElevation = "none" | "soft" | "strong";

export type PixieDustCalloutDividers = "none" | "header" | "footer" | "both";

export type PixieDustCalloutFooterAlign = "start" | "end";

export type PixieDustCalloutEffect = "none" | "grain" | "halo" | "projector";

export type PixieDustCalloutEffectIntensity = "subtle" | "medium" | "strong";

export type PixieDustCalloutIconAlign = "start" | "center";

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
        accentPosition?: PixieDustCalloutAccentPosition;
        elevation?: PixieDustCalloutElevation;
        dividers?: PixieDustCalloutDividers;
        footerAlign?: PixieDustCalloutFooterAlign;
        effect?: PixieDustCalloutEffect;
        effectIntensity?: PixieDustCalloutEffectIntensity;
        iconAlign?: PixieDustCalloutIconAlign;
        icon?: ReactNode;
        eyebrow?: ReactNode;
        heading?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
