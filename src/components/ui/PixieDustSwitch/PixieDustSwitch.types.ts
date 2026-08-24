import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSwitchVariant = "solid" | "soft" | "outline";

export type PixieDustSwitchSize = "sm" | "md" | "lg";

export type PixieDustSwitchColor = AtelierAnimationColorSlug | false;

export type PixieDustSwitchProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "className" | "color" | "size" | "type"
    > & {
        variant?: PixieDustSwitchVariant;
        size?: PixieDustSwitchSize;
        color?: PixieDustSwitchColor;
        invalid?: boolean;
        className?: string;
        inputClassName?: string;
    }
>;

export type PixieDustSwitchStyle = CSSProperties & {
    "--pixie-switch-color"?: string;
};
