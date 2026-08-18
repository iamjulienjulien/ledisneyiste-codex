import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustButtonVariant = "solid" | "soft" | "outline" | "ghost";

export type PixieDustButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustButtonColor = AtelierAnimationColorSlug | false;

export type PixieDustButtonProps = Readonly<
    Omit<ComponentPropsWithoutRef<"button">, "children" | "color"> & {
        children: ReactNode;
        variant?: PixieDustButtonVariant;
        size?: PixieDustButtonSize;
        color?: PixieDustButtonColor;
        loading?: boolean;
        fullWidth?: boolean;
    }
>;

export type PixieDustButtonStyle = CSSProperties & {
    "--pixie-dust-button-color"?: string;
    "--pixie-dust-button-foreground": string;
};
