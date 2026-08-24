import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustFrameElement = "figure" | "div";

export type PixieDustFrameVariant =
    "plain" | "outline" | "mount" | "film" | "slide" | "cel";

export type PixieDustFrameAspect =
    | "auto"
    | "square"
    | "poster"
    | "portrait"
    | "landscape"
    | "wide"
    | "cinema"
    | "scope";

export type PixieDustFrameFit =
    "cover" | "contain" | "fill" | "none" | "scale-down";

export type PixieDustFramePosition =
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";

export type PixieDustFrameFocalPoint = Readonly<{
    x: number;
    y: number;
}>;

export type PixieDustFramePadding = "none" | "xs" | "sm" | "md" | "lg";

export type PixieDustFrameRadius = "none" | "small" | "medium" | "large";

export type PixieDustFrameColor = AtelierAnimationColorSlug | false;

export type PixieDustFrameElevation = "none" | "soft" | "strong";

export type PixieDustFrameTreatment = "original" | "monochrome" | "sepia";

export type PixieDustFrameEffect =
    "none" | "grain" | "vignette" | "light-leak" | "projector";

export type PixieDustFrameIntensity = "subtle" | "medium" | "strong";

export type PixieDustFrameOverlayPosition =
    "top-start" | "top-end" | "center" | "bottom-start" | "bottom-end";

export type PixieDustFrameCaptionPosition = "outside" | "overlay";

export type PixieDustFrameCaptionAlign = "start" | "center" | "end";

export type PixieDustFrameStyle = CSSProperties & {
    "--pixie-frame-color"?: string;
    "--pixie-frame-aspect"?: CSSProperties["aspectRatio"];
    "--pixie-frame-position"?: string;
};

export type PixieDustFrameProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustFrameElement;
        variant?: PixieDustFrameVariant;
        aspect?: PixieDustFrameAspect;
        customAspect?: CSSProperties["aspectRatio"];
        fit?: PixieDustFrameFit;
        position?: PixieDustFramePosition;
        focalPoint?: PixieDustFrameFocalPoint;
        padding?: PixieDustFramePadding;
        radius?: PixieDustFrameRadius;
        mediaRadius?: PixieDustFrameRadius;
        color?: PixieDustFrameColor;
        elevation?: PixieDustFrameElevation;
        treatment?: PixieDustFrameTreatment;
        effect?: PixieDustFrameEffect;
        intensity?: PixieDustFrameIntensity;
        overlay?: ReactNode;
        overlayPosition?: PixieDustFrameOverlayPosition;
        caption?: ReactNode;
        captionPosition?: PixieDustFrameCaptionPosition;
        captionAlign?: PixieDustFrameCaptionAlign;
        children: ReactNode;
    }
>;
