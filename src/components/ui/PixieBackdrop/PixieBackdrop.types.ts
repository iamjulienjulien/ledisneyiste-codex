import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieBackdropElement = "div" | "section" | "header" | "footer";

export type PixieBackdropVariant =
    | "wash"
    | "gradient"
    | "halo"
    | "vignette"
    | "projector"
    | "horizon"
    | "split"
    | "cel";

export type PixieBackdropIntensity = "subtle" | "medium" | "strong";

export type PixieBackdropPosition =
    | "top-start"
    | "top"
    | "top-end"
    | "start"
    | "center"
    | "end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";

export type PixieBackdropDirection =
    "horizontal" | "vertical" | "diagonal-up" | "diagonal-down";

export type PixieBackdropSpread = "narrow" | "medium" | "wide";

export type PixieBackdropPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieBackdropRadius = "none" | "small" | "medium" | "large";

export type PixieBackdropColor = AtelierAnimationColorSlug | false;

export type PixieBackdropBase = "transparent" | "canvas" | "surface" | "muted";

export type PixieBackdropTexture = "none" | "grain" | "dust" | "paper";

export type PixieBackdropTextureIntensity = "subtle" | "medium" | "strong";

export type PixieBackdropMotion = "none" | "drift" | "breathe";

export type PixieBackdropStyle = CSSProperties & {
    "--pixie-backdrop-color"?: string;
    "--pixie-backdrop-secondary-color"?: string;
};

export type PixieBackdropProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieBackdropElement;
        variant?: PixieBackdropVariant;
        intensity?: PixieBackdropIntensity;
        position?: PixieBackdropPosition;
        direction?: PixieBackdropDirection;
        spread?: PixieBackdropSpread;
        padding?: PixieBackdropPadding;
        radius?: PixieBackdropRadius;
        color?: PixieBackdropColor;
        secondaryColor?: PixieBackdropColor;
        base?: PixieBackdropBase;
        texture?: PixieBackdropTexture;
        textureIntensity?: PixieBackdropTextureIntensity;
        motion?: PixieBackdropMotion;
        children: ReactNode;
    }
>;
