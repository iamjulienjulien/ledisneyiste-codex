import type { CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustLoaderVariant = "sparkle" | "reel" | "beam";

export type PixieDustLoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustLoaderSpeed = "slow" | "normal" | "fast";

export type PixieDustLoaderLayout = "inline" | "stacked";

export type PixieDustLoaderColor = AtelierAnimationColorSlug | false;

export type PixieDustLoaderProps = Readonly<{
    label?: ReactNode;
    labelHidden?: boolean;
    variant?: PixieDustLoaderVariant;
    size?: PixieDustLoaderSize;
    speed?: PixieDustLoaderSpeed;
    layout?: PixieDustLoaderLayout;
    color?: PixieDustLoaderColor;
    active?: boolean;
    delay?: number;
    decorative?: boolean;
    className?: string;
}>;

export type PixieDustLoaderStyle = CSSProperties & {
    "--pixie-loader-color": string;
    "--pixie-loader-delay": string;
};
