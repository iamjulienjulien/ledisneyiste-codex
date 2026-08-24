import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustTextareaVariant = "outline" | "filled" | "underline";

export type PixieDustTextareaSize = "sm" | "md" | "lg";

export type PixieDustTextareaColor = AtelierAnimationColorSlug | false;

export type PixieDustTextareaResize =
    "none" | "vertical" | "horizontal" | "both";

export type PixieDustTextareaProps = Readonly<
    Omit<ComponentPropsWithRef<"textarea">, "color" | "className"> & {
        variant?: PixieDustTextareaVariant;
        size?: PixieDustTextareaSize;
        color?: PixieDustTextareaColor;
        invalid?: boolean;
        resize?: PixieDustTextareaResize;
        className?: string;
        textareaClassName?: string;
    }
>;

export type PixieDustTextareaStyle = CSSProperties & {
    "--pixie-textarea-color"?: string;
};
