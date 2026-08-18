import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieButtonVariant = "solid" | "soft" | "outline" | "ghost";

export type PixieButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieButtonColor = AtelierAnimationColorSlug | false;

export type PixieButtonProps = Readonly<
    Omit<ComponentPropsWithoutRef<"button">, "children" | "color"> & {
        children: ReactNode;
        variant?: PixieButtonVariant;
        size?: PixieButtonSize;
        color?: PixieButtonColor;
        loading?: boolean;
        fullWidth?: boolean;
    }
>;

export type PixieButtonStyle = CSSProperties & {
    "--pixie-button-color"?: string;
    "--pixie-button-foreground": string;
};
