import type { CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSkeletonVariant =
    "text" | "block" | "circle" | "media" | "control" | "pill";

export type PixieDustSkeletonAnimation =
    "shimmer" | "pulse" | "beam" | "develop" | "grain" | "none";

export type PixieDustSkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustSkeletonGap = "xs" | "sm" | "md" | "lg" | number;

export type PixieDustSkeletonRadius = "none" | "sm" | "md" | "lg" | "full";

export type PixieDustSkeletonColor = AtelierAnimationColorSlug | false;

export type PixieDustSkeletonIntensity = "subtle" | "normal" | "strong";

export type PixieDustSkeletonSpeed = "slow" | "normal" | "fast";

export type PixieDustSkeletonDirection = "forward" | "reverse";

export type PixieDustSkeletonDimension = string | number;

export type PixieDustSkeletonLive = "off" | "polite" | "assertive";

export type PixieDustSkeletonProps = Readonly<{
    variant?: PixieDustSkeletonVariant;
    animation?: PixieDustSkeletonAnimation;
    size?: PixieDustSkeletonSize;
    width?: PixieDustSkeletonDimension;
    height?: PixieDustSkeletonDimension;
    aspectRatio?: PixieDustSkeletonDimension;
    lines?: number;
    lineWidths?: readonly PixieDustSkeletonDimension[];
    lineHeight?: PixieDustSkeletonDimension;
    lastLineWidth?: PixieDustSkeletonDimension;
    gap?: PixieDustSkeletonGap;
    radius?: PixieDustSkeletonRadius;
    color?: PixieDustSkeletonColor;
    highlightColor?: PixieDustSkeletonColor;
    intensity?: PixieDustSkeletonIntensity;
    speed?: PixieDustSkeletonSpeed;
    duration?: number;
    delay?: number;
    direction?: PixieDustSkeletonDirection;
    active?: boolean;
    reserveSpace?: boolean;
    decorative?: boolean;
    label?: string;
    ariaLive?: PixieDustSkeletonLive;
    ariaControls?: string;
    className?: string;
}>;

export type PixieDustSkeletonStyle = CSSProperties & {
    "--pixie-skeleton-color": string;
    "--pixie-skeleton-highlight-color": string;
    "--pixie-skeleton-width": string;
    "--pixie-skeleton-height": string;
    "--pixie-skeleton-aspect-ratio": string;
    "--pixie-skeleton-gap": string;
    "--pixie-skeleton-duration": string;
    "--pixie-skeleton-delay": string;
    "--pixie-skeleton-direction": "normal" | "reverse";
};

export type PixieDustSkeletonLineStyle = CSSProperties & {
    "--pixie-skeleton-line-width": string;
};
