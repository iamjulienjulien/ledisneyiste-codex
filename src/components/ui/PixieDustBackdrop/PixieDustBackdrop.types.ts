import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustBackdropElement = "div" | "section" | "header" | "footer";

export type PixieDustBackdropVariant =
    | "wash"
    | "gradient"
    | "halo"
    | "vignette"
    | "projector"
    | "horizon"
    | "split"
    | "cel";

export type PixieDustBackdropIntensity = "subtle" | "medium" | "strong";

export type PixieDustBackdropPosition =
    | "top-start"
    | "top"
    | "top-end"
    | "start"
    | "center"
    | "end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";

export type PixieDustBackdropDirection =
    "horizontal" | "vertical" | "diagonal-up" | "diagonal-down";

export type PixieDustBackdropSpread = "narrow" | "medium" | "wide";

export type PixieDustBackdropPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustBackdropRadius = "none" | "small" | "medium" | "large";

export type PixieDustBackdropColor = AtelierAnimationColorSlug | false;

export type PixieDustBackdropBase =
    "transparent" | "canvas" | "surface" | "muted";

export type PixieDustBackdropTexture = "none" | "grain" | "dust" | "paper";

export type PixieDustBackdropTextureIntensity = "subtle" | "medium" | "strong";

export type PixieDustBackdropMotion = "none" | "drift" | "breathe";

export type PixieDustBackdropStyle = CSSProperties & {
    "--pixie-backdrop-color"?: string;
    "--pixie-backdrop-secondary-color"?: string;
};

export type PixieDustBackdropProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustBackdropElement;
        variant?: PixieDustBackdropVariant;
        intensity?: PixieDustBackdropIntensity;
        position?: PixieDustBackdropPosition;
        direction?: PixieDustBackdropDirection;
        spread?: PixieDustBackdropSpread;
        padding?: PixieDustBackdropPadding;
        radius?: PixieDustBackdropRadius;
        color?: PixieDustBackdropColor;
        secondaryColor?: PixieDustBackdropColor;
        base?: PixieDustBackdropBase;
        texture?: PixieDustBackdropTexture;
        textureIntensity?: PixieDustBackdropTextureIntensity;
        motion?: PixieDustBackdropMotion;
        children: ReactNode;
    }
>;
