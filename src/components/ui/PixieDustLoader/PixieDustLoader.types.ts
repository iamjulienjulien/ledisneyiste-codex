import type { CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustLoaderVariant =
    | "sparkle"
    | "reel"
    | "beam"
    | "iris"
    | "cel"
    | "flipbook"
    | "filmstrip"
    | "orbit"
    | "dots";

export type PixieDustLoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustLoaderSpeed = "slow" | "normal" | "fast";

export type PixieDustLoaderLayout = "inline" | "stacked";

export type PixieDustLoaderLabelPosition = "before" | "after";

export type PixieDustLoaderIntensity = "subtle" | "normal" | "strong";

export type PixieDustLoaderMotion = "expressive" | "gentle" | "static";

export type PixieDustLoaderDirection = "forward" | "reverse";

export type PixieDustLoaderAriaLive = "polite" | "assertive" | "off";

export type PixieDustLoaderColor = AtelierAnimationColorSlug | false;

export type PixieDustLoaderProps = Readonly<{
    label?: ReactNode;
    description?: ReactNode;
    labelHidden?: boolean;
    variant?: PixieDustLoaderVariant;
    size?: PixieDustLoaderSize | number;
    speed?: PixieDustLoaderSpeed;
    duration?: number;
    layout?: PixieDustLoaderLayout;
    labelPosition?: PixieDustLoaderLabelPosition;
    intensity?: PixieDustLoaderIntensity;
    motion?: PixieDustLoaderMotion;
    direction?: PixieDustLoaderDirection;
    color?: PixieDustLoaderColor;
    secondaryColor?: PixieDustLoaderColor;
    active?: boolean;
    reserveSpace?: boolean;
    delay?: number;
    decorative?: boolean;
    ariaLive?: PixieDustLoaderAriaLive;
    ariaAtomic?: boolean;
    ariaControls?: string;
    className?: string;
}>;

export type PixieDustLoaderStyle = CSSProperties & {
    "--pixie-loader-color": string;
    "--pixie-loader-secondary-color": string;
    "--pixie-loader-size-custom"?: string;
    "--pixie-loader-duration-custom"?: string;
    "--pixie-loader-delay": string;
};

export type PixieDustLoaderParticleStyle = CSSProperties & {
    "--particle-angle": string;
    "--particle-delay": string;
    "--particle-distance": string;
    "--particle-size": string;
};
