import type { CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSkeletonVariant = "text" | "block" | "circle";

export type PixieDustSkeletonAnimation = "shimmer" | "pulse" | "none";

export type PixieDustSkeletonGap = "xs" | "sm" | "md";

export type PixieDustSkeletonRadius = "none" | "sm" | "md" | "lg" | "full";

export type PixieDustSkeletonColor = AtelierAnimationColorSlug | false;

export type PixieDustSkeletonDimension = string | number;

export type PixieDustSkeletonProps = Readonly<{
    variant?: PixieDustSkeletonVariant;
    animation?: PixieDustSkeletonAnimation;
    width?: PixieDustSkeletonDimension;
    height?: PixieDustSkeletonDimension;
    lines?: number;
    lastLineWidth?: PixieDustSkeletonDimension;
    gap?: PixieDustSkeletonGap;
    radius?: PixieDustSkeletonRadius;
    color?: PixieDustSkeletonColor;
    active?: boolean;
    decorative?: boolean;
    label?: string;
    className?: string;
}>;

export type PixieDustSkeletonStyle = CSSProperties & {
    "--pixie-skeleton-color": string;
    "--pixie-skeleton-width": string;
    "--pixie-skeleton-height": string;
    "--pixie-skeleton-last-line-width": string;
};
