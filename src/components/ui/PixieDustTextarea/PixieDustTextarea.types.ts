import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustTextareaVariant =
    "outline" | "filled" | "underline" | "ghost" | "manuscript";

export type PixieDustTextareaSize = "sm" | "md" | "lg";

export type PixieDustTextareaColor = AtelierAnimationColorSlug | false;

export type PixieDustTextareaShape = "square" | "rounded";

export type PixieDustTextareaFont = "body" | "mono";

export type PixieDustTextareaTone = "neutral" | "success" | "warning";

export type PixieDustTextareaEffect = "none" | "ring" | "glow" | "dust";

export type PixieDustTextareaResize =
    "none" | "vertical" | "horizontal" | "both";

export type PixieDustTextareaProps = Readonly<
    Omit<ComponentPropsWithRef<"textarea">, "color" | "className"> & {
        variant?: PixieDustTextareaVariant;
        size?: PixieDustTextareaSize;
        shape?: PixieDustTextareaShape;
        font?: PixieDustTextareaFont;
        tone?: PixieDustTextareaTone;
        effect?: PixieDustTextareaEffect;
        color?: PixieDustTextareaColor;
        invalid?: boolean;
        busy?: boolean;
        resize?: PixieDustTextareaResize;
        autoGrow?: boolean;
        minRows?: number;
        maxRows?: number;
        showCount?: boolean;
        countLabel?: (current: number, maximum?: number) => ReactNode;
        startAdornment?: ReactNode;
        endAdornment?: ReactNode;
        footerStart?: ReactNode;
        footerEnd?: ReactNode;
        className?: string;
        textareaClassName?: string;
        headerClassName?: string;
        footerClassName?: string;
    }
>;

export type PixieDustTextareaStyle = CSSProperties & {
    "--pixie-textarea-color"?: string;
};
