import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieAsciiVariant =
    "plain" | "surface" | "outline" | "slate" | "projector";

export type PixieAsciiSize = "sm" | "md" | "lg";

export type PixieAsciiDensity = "compact" | "comfortable" | "airy";

export type PixieAsciiPadding = "none" | "sm" | "md" | "lg";

export type PixieAsciiWidth = "fit" | "full";

export type PixieAsciiAlign = "start" | "center";

export type PixieAsciiOverflow = "auto" | "clip";

export type PixieAsciiMaxHeight = "none" | "sm" | "md" | "lg";

export type PixieAsciiTexture = "none" | "grain" | "scanlines";

export type PixieAsciiColor = AtelierAnimationColorSlug | false;

export type PixieAsciiCopyState = "idle" | "copied" | "error";

export type PixieAsciiStyle = CSSProperties & {
    "--pixie-ascii-color"?: string;
    "--pixie-ascii-tab-size"?: number;
};

type PixieAsciiCommonProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color" | "style"
> & {
    children: string;
    caption?: ReactNode;
    variant?: PixieAsciiVariant;
    color?: PixieAsciiColor;
    size?: PixieAsciiSize;
    density?: PixieAsciiDensity;
    padding?: PixieAsciiPadding;
    width?: PixieAsciiWidth;
    align?: PixieAsciiAlign;
    overflow?: PixieAsciiOverflow;
    scrollHint?: boolean;
    maxHeight?: PixieAsciiMaxHeight;
    tabSize?: 2 | 4 | 8;
    texture?: PixieAsciiTexture;
    emptyLabel?: string;
    style?: PixieAsciiStyle;
};

type PixieAsciiInformativeProps = {
    decorative?: false;
    label: string;
    alternative?: string;
    copyable?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
    copyErrorLabel?: string;
    onCopyStateChange?: (state: PixieAsciiCopyState) => void;
};

type PixieAsciiDecorativeProps = {
    decorative: true;
    label?: never;
    alternative?: never;
    copyable?: false;
    copyLabel?: never;
    copiedLabel?: never;
    copyErrorLabel?: never;
    onCopyStateChange?: never;
};

export type PixieAsciiProps = Readonly<
    PixieAsciiCommonProps &
        (PixieAsciiInformativeProps | PixieAsciiDecorativeProps)
>;
