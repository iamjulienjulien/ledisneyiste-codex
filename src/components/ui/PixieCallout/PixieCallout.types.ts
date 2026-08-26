import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieCalloutElement = "aside" | "section" | "div";

export type PixieCalloutVariant =
    "plain" | "subtle" | "outline" | "accent" | "tinted";

export type PixieCalloutLayout = "stacked" | "inline" | "header";

export type PixieCalloutPadding = "sm" | "md" | "lg" | "xl";

export type PixieCalloutRadius = "none" | "small" | "medium" | "large";

export type PixieCalloutColor = AtelierAnimationColorSlug | false;

export type PixieCalloutAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieCalloutElevation = "none" | "soft" | "strong";

export type PixieCalloutDividers = "none" | "header" | "footer" | "both";

export type PixieCalloutFooterAlign = "start" | "end";

export type PixieCalloutEffect = "none" | "grain" | "halo" | "projector";

export type PixieCalloutEffectIntensity = "subtle" | "medium" | "strong";

export type PixieCalloutIconAlign = "start" | "center";

export type PixieCalloutStyle = CSSProperties & {
    "--pixie-callout-color"?: string;
};

export type PixieCalloutProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieCalloutElement;
        variant?: PixieCalloutVariant;
        layout?: PixieCalloutLayout;
        padding?: PixieCalloutPadding;
        radius?: PixieCalloutRadius;
        color?: PixieCalloutColor;
        accentPosition?: PixieCalloutAccentPosition;
        elevation?: PixieCalloutElevation;
        dividers?: PixieCalloutDividers;
        footerAlign?: PixieCalloutFooterAlign;
        effect?: PixieCalloutEffect;
        effectIntensity?: PixieCalloutEffectIntensity;
        iconAlign?: PixieCalloutIconAlign;
        icon?: ReactNode;
        eyebrow?: ReactNode;
        heading?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
