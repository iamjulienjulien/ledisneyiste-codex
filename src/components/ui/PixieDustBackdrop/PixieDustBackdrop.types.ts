import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustBackdropElement = "div" | "section" | "header" | "footer";

export type PixieDustBackdropVariant =
    "wash" | "gradient" | "halo" | "vignette" | "projector";

export type PixieDustBackdropIntensity = "subtle" | "medium" | "strong";

export type PixieDustBackdropPosition = "start" | "center" | "end";

export type PixieDustBackdropPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustBackdropRadius = "none" | "small" | "medium" | "large";

export type PixieDustBackdropColor = AtelierAnimationColorSlug | false;

export type PixieDustBackdropStyle = CSSProperties & {
    "--pixie-backdrop-color"?: string;
};

export type PixieDustBackdropProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustBackdropElement;
        variant?: PixieDustBackdropVariant;
        intensity?: PixieDustBackdropIntensity;
        position?: PixieDustBackdropPosition;
        padding?: PixieDustBackdropPadding;
        radius?: PixieDustBackdropRadius;
        color?: PixieDustBackdropColor;
        grain?: boolean;
        children: ReactNode;
    }
>;
