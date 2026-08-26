import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustInsetElement = "div" | "section" | "aside";

export type PixieDustInsetVariant =
    "plain" | "subtle" | "recessed" | "groove" | "accent" | "tinted";

export type PixieDustInsetDepth = "none" | "shallow" | "medium" | "deep";

export type PixieDustInsetPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustInsetRadius = "none" | "small" | "medium" | "large";

export type PixieDustInsetColor = AtelierAnimationColorSlug | false;

export type PixieDustInsetAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieDustInsetTexture = "none" | "grain" | "grid" | "crosshatch";

export type PixieDustInsetTextureIntensity = "subtle" | "medium" | "strong";

export type PixieDustInsetStyle = CSSProperties & {
    "--pixie-inset-color"?: string;
};

export type PixieDustInsetProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustInsetElement;
        variant?: PixieDustInsetVariant;
        depth?: PixieDustInsetDepth;
        padding?: PixieDustInsetPadding;
        radius?: PixieDustInsetRadius;
        color?: PixieDustInsetColor;
        accentPosition?: PixieDustInsetAccentPosition;
        texture?: PixieDustInsetTexture;
        textureIntensity?: PixieDustInsetTextureIntensity;
        children: ReactNode;
    }
>;
