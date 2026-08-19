import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustFrameElement = "figure" | "div";

export type PixieDustFrameVariant = "plain" | "outline" | "mount" | "film";

export type PixieDustFrameAspect =
    "auto" | "square" | "portrait" | "landscape" | "cinema";

export type PixieDustFrameFit = "cover" | "contain";

export type PixieDustFramePosition =
    "center" | "top" | "bottom" | "left" | "right";

export type PixieDustFramePadding = "none" | "sm" | "md" | "lg";

export type PixieDustFrameRadius = "none" | "small" | "medium" | "large";

export type PixieDustFrameColor = AtelierAnimationColorSlug | false;

export type PixieDustFrameCaptionPosition = "outside" | "overlay";

export type PixieDustFrameStyle = CSSProperties & {
    "--pixie-frame-color"?: string;
};

export type PixieDustFrameProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustFrameElement;
        variant?: PixieDustFrameVariant;
        aspect?: PixieDustFrameAspect;
        fit?: PixieDustFrameFit;
        position?: PixieDustFramePosition;
        padding?: PixieDustFramePadding;
        radius?: PixieDustFrameRadius;
        color?: PixieDustFrameColor;
        caption?: ReactNode;
        captionPosition?: PixieDustFrameCaptionPosition;
        children: ReactNode;
    }
>;
