import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSwitchVariant =
    "solid" | "soft" | "outline" | "glass" | "projector";

export type PixieDustSwitchSize = "sm" | "md" | "lg";

export type PixieDustSwitchColor = AtelierAnimationColorSlug | false;

export type PixieDustSwitchMotion = "slide" | "snap" | "spring" | "none";

export type PixieDustSwitchEffect = "none" | "glow" | "dust";

export type PixieDustSwitchProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "className" | "color" | "size" | "type"
    > & {
        variant?: PixieDustSwitchVariant;
        size?: PixieDustSwitchSize;
        color?: PixieDustSwitchColor;
        motion?: PixieDustSwitchMotion;
        effect?: PixieDustSwitchEffect;
        invalid?: boolean;
        pending?: boolean;
        checkedIcon?: ReactNode;
        uncheckedIcon?: ReactNode;
        onCheckedChange?: (checked: boolean) => void;
        className?: string;
        inputClassName?: string;
        trackClassName?: string;
        thumbClassName?: string;
    }
>;

export type PixieDustSwitchStyle = CSSProperties & {
    "--pixie-switch-color"?: string;
};
