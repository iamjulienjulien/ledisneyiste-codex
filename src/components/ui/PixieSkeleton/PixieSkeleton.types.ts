import type { CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieSkeletonVariant =
    "text" | "block" | "circle" | "media" | "control" | "pill";

export type PixieSkeletonAnimation =
    "shimmer" | "pulse" | "beam" | "develop" | "grain" | "none";

export type PixieSkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieSkeletonGap = "xs" | "sm" | "md" | "lg" | number;

export type PixieSkeletonRadius = "none" | "sm" | "md" | "lg" | "full";

export type PixieSkeletonColor = AtelierAnimationColorSlug | false;

export type PixieSkeletonIntensity = "subtle" | "normal" | "strong";

export type PixieSkeletonSpeed = "slow" | "normal" | "fast";

export type PixieSkeletonDirection = "forward" | "reverse";

export type PixieSkeletonDimension = string | number;

export type PixieSkeletonLive = "off" | "polite" | "assertive";

export type PixieSkeletonProps = Readonly<{
    variant?: PixieSkeletonVariant;
    animation?: PixieSkeletonAnimation;
    size?: PixieSkeletonSize;
    width?: PixieSkeletonDimension;
    height?: PixieSkeletonDimension;
    aspectRatio?: PixieSkeletonDimension;
    lines?: number;
    lineWidths?: readonly PixieSkeletonDimension[];
    lineHeight?: PixieSkeletonDimension;
    lastLineWidth?: PixieSkeletonDimension;
    gap?: PixieSkeletonGap;
    radius?: PixieSkeletonRadius;
    color?: PixieSkeletonColor;
    highlightColor?: PixieSkeletonColor;
    intensity?: PixieSkeletonIntensity;
    speed?: PixieSkeletonSpeed;
    duration?: number;
    delay?: number;
    direction?: PixieSkeletonDirection;
    active?: boolean;
    reserveSpace?: boolean;
    decorative?: boolean;
    label?: string;
    ariaLive?: PixieSkeletonLive;
    ariaControls?: string;
    className?: string;
}>;

export type PixieSkeletonStyle = CSSProperties & {
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

export type PixieSkeletonLineStyle = CSSProperties & {
    "--pixie-skeleton-line-width": string;
};
