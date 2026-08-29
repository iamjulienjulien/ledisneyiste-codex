import type { CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieLoaderVariant =
    | "sparkle"
    | "reel"
    | "beam"
    | "iris"
    | "cel"
    | "flipbook"
    | "filmstrip"
    | "orbit"
    | "dots";

export type PixieLoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieLoaderSpeed = "slow" | "normal" | "fast";

export type PixieLoaderLayout = "inline" | "stacked";

export type PixieLoaderLabelPosition = "before" | "after";

export type PixieLoaderIntensity = "subtle" | "normal" | "strong";

export type PixieLoaderMotion = "expressive" | "gentle" | "static";

export type PixieLoaderDirection = "forward" | "reverse";

export type PixieLoaderAriaLive = "polite" | "assertive" | "off";

export type PixieLoaderColor = AtelierAnimationColorSlug | false;

export type PixieLoaderProps = Readonly<{
    label?: ReactNode;
    description?: ReactNode;
    labelHidden?: boolean;
    variant?: PixieLoaderVariant;
    size?: PixieLoaderSize | number;
    speed?: PixieLoaderSpeed;
    duration?: number;
    layout?: PixieLoaderLayout;
    labelPosition?: PixieLoaderLabelPosition;
    intensity?: PixieLoaderIntensity;
    motion?: PixieLoaderMotion;
    direction?: PixieLoaderDirection;
    color?: PixieLoaderColor;
    secondaryColor?: PixieLoaderColor;
    active?: boolean;
    reserveSpace?: boolean;
    delay?: number;
    decorative?: boolean;
    ariaLive?: PixieLoaderAriaLive;
    ariaAtomic?: boolean;
    ariaControls?: string;
    className?: string;
}>;

export type PixieLoaderStyle = CSSProperties & {
    "--pixie-loader-color": string;
    "--pixie-loader-secondary-color": string;
    "--pixie-loader-size-custom"?: string;
    "--pixie-loader-duration-custom"?: string;
    "--pixie-loader-delay": string;
};

export type PixieLoaderParticleStyle = CSSProperties & {
    "--particle-angle": string;
    "--particle-delay": string;
    "--particle-distance": string;
    "--particle-size": string;
};
