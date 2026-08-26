import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieInsetElement = "div" | "section" | "aside";

export type PixieInsetVariant =
    "plain" | "subtle" | "recessed" | "groove" | "accent" | "tinted";

export type PixieInsetDepth = "none" | "shallow" | "medium" | "deep";

export type PixieInsetPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieInsetRadius = "none" | "small" | "medium" | "large";

export type PixieInsetColor = AtelierAnimationColorSlug | false;

export type PixieInsetAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieInsetTexture = "none" | "grain" | "grid" | "crosshatch";

export type PixieInsetTextureIntensity = "subtle" | "medium" | "strong";

export type PixieInsetStyle = CSSProperties & {
    "--pixie-inset-color"?: string;
};

export type PixieInsetProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieInsetElement;
        variant?: PixieInsetVariant;
        depth?: PixieInsetDepth;
        padding?: PixieInsetPadding;
        radius?: PixieInsetRadius;
        color?: PixieInsetColor;
        accentPosition?: PixieInsetAccentPosition;
        texture?: PixieInsetTexture;
        textureIntensity?: PixieInsetTextureIntensity;
        children: ReactNode;
    }
>;
