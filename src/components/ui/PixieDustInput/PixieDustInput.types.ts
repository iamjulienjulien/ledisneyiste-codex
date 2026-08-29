import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustInputType =
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

export type PixieDustInputVariant =
    "outline" | "filled" | "underline" | "ghost";

export type PixieDustInputSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustInputShape = "square" | "rounded" | "pill";

export type PixieDustInputAlign = "start" | "center" | "end";

export type PixieDustInputFont = "body" | "mono";

export type PixieDustInputTone = "neutral" | "success" | "warning";

export type PixieDustInputColor = AtelierAnimationColorSlug | false;

export type PixieDustInputProps = Readonly<
    Omit<
        ComponentPropsWithRef<"input">,
        "size" | "type" | "color" | "className"
    > & {
        type?: PixieDustInputType;
        variant?: PixieDustInputVariant;
        size?: PixieDustInputSize;
        shape?: PixieDustInputShape;
        align?: PixieDustInputAlign;
        font?: PixieDustInputFont;
        tone?: PixieDustInputTone;
        color?: PixieDustInputColor;
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

export type PixieDustInputStyle = CSSProperties & {
    "--pixie-input-color"?: string;
};
