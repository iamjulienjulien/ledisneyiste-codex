import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieInputType =
    | "text"
    | "search"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";

export type PixieInputVariant = "outline" | "filled" | "underline" | "ghost";

export type PixieInputSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieInputShape = "square" | "rounded" | "pill";

export type PixieInputAlign = "start" | "center" | "end";

export type PixieInputFont = "body" | "mono";

export type PixieInputTone = "neutral" | "success" | "warning";

export type PixieInputColor = AtelierAnimationColorSlug | false;

export type PixieInputProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "size" | "type" | "color" | "className"
    > & {
        type?: PixieInputType;
        variant?: PixieInputVariant;
        size?: PixieInputSize;
        shape?: PixieInputShape;
        align?: PixieInputAlign;
        font?: PixieInputFont;
        tone?: PixieInputTone;
        color?: PixieInputColor;
        invalid?: boolean;
        busy?: boolean;
        startAdornment?: ReactNode;
        endAdornment?: ReactNode;
        startAction?: ReactNode;
        endAction?: ReactNode;
        className?: string;
        inputClassName?: string;
    }
>;

export type PixieInputStyle = CSSProperties & {
    "--pixie-input-color"?: string;
};
