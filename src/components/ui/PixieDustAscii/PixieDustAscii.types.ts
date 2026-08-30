import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustAsciiVariant =
    "plain" | "surface" | "outline" | "slate" | "projector";

export type PixieDustAsciiSize = "sm" | "md" | "lg";

export type PixieDustAsciiDensity = "compact" | "comfortable" | "airy";

export type PixieDustAsciiPadding = "none" | "sm" | "md" | "lg";

export type PixieDustAsciiWidth = "fit" | "full";

export type PixieDustAsciiAlign = "start" | "center";

export type PixieDustAsciiOverflow = "auto" | "clip";

export type PixieDustAsciiMaxHeight = "none" | "sm" | "md" | "lg";

export type PixieDustAsciiTexture = "none" | "grain" | "scanlines";

export type PixieDustAsciiColor = AtelierAnimationColorSlug | false;

export type PixieDustAsciiCopyState = "idle" | "copied" | "error";

export type PixieDustAsciiStyle = CSSProperties & {
    "--pixie-ascii-color"?: string;
    "--pixie-ascii-tab-size"?: number;
};

type PixieDustAsciiCommonProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color" | "style"
> & {
    children: string;
    caption?: ReactNode;
    variant?: PixieDustAsciiVariant;
    color?: PixieDustAsciiColor;
    size?: PixieDustAsciiSize;
    density?: PixieDustAsciiDensity;
    padding?: PixieDustAsciiPadding;
    width?: PixieDustAsciiWidth;
    align?: PixieDustAsciiAlign;
    overflow?: PixieDustAsciiOverflow;
    scrollHint?: boolean;
    maxHeight?: PixieDustAsciiMaxHeight;
    tabSize?: 2 | 4 | 8;
    texture?: PixieDustAsciiTexture;
    emptyLabel?: string;
    style?: PixieDustAsciiStyle;
};

type PixieDustAsciiInformativeProps = {
    decorative?: false;
    label: string;
    alternative?: string;
    copyable?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
    copyErrorLabel?: string;
    onCopyStateChange?: (state: PixieDustAsciiCopyState) => void;
};

type PixieDustAsciiDecorativeProps = {
    decorative: true;
    label?: never;
    alternative?: never;
    copyable?: false;
    copyLabel?: never;
    copiedLabel?: never;
    copyErrorLabel?: never;
    onCopyStateChange?: never;
};

export type PixieDustAsciiProps = Readonly<
    PixieDustAsciiCommonProps &
        (PixieDustAsciiInformativeProps | PixieDustAsciiDecorativeProps)
>;
