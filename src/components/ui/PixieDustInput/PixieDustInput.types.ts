import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustInputType =
    "text" | "search" | "email" | "password" | "tel" | "url" | "number";

export type PixieDustInputVariant = "outline" | "filled" | "underline";

export type PixieDustInputSize = "sm" | "md" | "lg";

export type PixieDustInputColor = AtelierAnimationColorSlug | false;

export type PixieDustInputProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "size" | "type" | "color" | "className"
    > & {
        type?: PixieDustInputType;
        variant?: PixieDustInputVariant;
        size?: PixieDustInputSize;
        color?: PixieDustInputColor;
        invalid?: boolean;
        startAdornment?: ReactNode;
        endAdornment?: ReactNode;
        className?: string;
        inputClassName?: string;
    }
>;

export type PixieDustInputStyle = CSSProperties & {
    "--pixie-input-color"?: string;
};
