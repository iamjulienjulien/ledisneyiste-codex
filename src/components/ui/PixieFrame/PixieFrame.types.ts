import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieFrameElement = "figure" | "div";

export type PixieFrameVariant =
    "plain" | "outline" | "mount" | "film" | "slide" | "cel";

export type PixieFrameAspect =
    | "auto"
    | "square"
    | "poster"
    | "portrait"
    | "landscape"
    | "wide"
    | "cinema"
    | "scope";

export type PixieFrameFit =
    "cover" | "contain" | "fill" | "none" | "scale-down";

export type PixieFramePosition =
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";

export type PixieFrameFocalPoint = Readonly<{
    x: number;
    y: number;
}>;

export type PixieFramePadding = "none" | "xs" | "sm" | "md" | "lg";

export type PixieFrameRadius = "none" | "small" | "medium" | "large";

export type PixieFrameColor = AtelierAnimationColorSlug | false;

export type PixieFrameElevation = "none" | "soft" | "strong";

export type PixieFrameTreatment = "original" | "monochrome" | "sepia";

export type PixieFrameEffect =
    "none" | "grain" | "vignette" | "light-leak" | "projector";

export type PixieFrameIntensity = "subtle" | "medium" | "strong";

export type PixieFrameOverlayPosition =
    "top-start" | "top-end" | "center" | "bottom-start" | "bottom-end";

export type PixieFrameCaptionPosition = "outside" | "overlay";

export type PixieFrameCaptionAlign = "start" | "center" | "end";

export type PixieFrameStyle = CSSProperties & {
    "--pixie-frame-color"?: string;
    "--pixie-frame-aspect"?: CSSProperties["aspectRatio"];
    "--pixie-frame-position"?: string;
};

export type PixieFrameProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieFrameElement;
        variant?: PixieFrameVariant;
        aspect?: PixieFrameAspect;
        customAspect?: CSSProperties["aspectRatio"];
        fit?: PixieFrameFit;
        position?: PixieFramePosition;
        focalPoint?: PixieFrameFocalPoint;
        padding?: PixieFramePadding;
        radius?: PixieFrameRadius;
        mediaRadius?: PixieFrameRadius;
        color?: PixieFrameColor;
        elevation?: PixieFrameElevation;
        treatment?: PixieFrameTreatment;
        effect?: PixieFrameEffect;
        intensity?: PixieFrameIntensity;
        overlay?: ReactNode;
        overlayPosition?: PixieFrameOverlayPosition;
        caption?: ReactNode;
        captionPosition?: PixieFrameCaptionPosition;
        captionAlign?: PixieFrameCaptionAlign;
        children: ReactNode;
    }
>;
