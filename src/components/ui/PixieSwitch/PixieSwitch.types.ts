import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieSwitchVariant =
    "solid" | "soft" | "outline" | "glass" | "projector";

export type PixieSwitchSize = "sm" | "md" | "lg";

export type PixieSwitchColor = AtelierAnimationColorSlug | false;

export type PixieSwitchMotion = "slide" | "snap" | "spring" | "none";

export type PixieSwitchEffect = "none" | "glow" | "dust";

export type PixieSwitchProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "className" | "color" | "size" | "type"
    > & {
        variant?: PixieSwitchVariant;
        size?: PixieSwitchSize;
        color?: PixieSwitchColor;
        motion?: PixieSwitchMotion;
        effect?: PixieSwitchEffect;
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

export type PixieSwitchStyle = CSSProperties & {
    "--pixie-switch-color"?: string;
};
