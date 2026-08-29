import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieTextareaVariant =
    "outline" | "filled" | "underline" | "ghost" | "manuscript";

export type PixieTextareaSize = "sm" | "md" | "lg";

export type PixieTextareaColor = AtelierAnimationColorSlug | false;

export type PixieTextareaShape = "square" | "rounded";

export type PixieTextareaFont = "body" | "mono";

export type PixieTextareaTone = "neutral" | "success" | "warning";

export type PixieTextareaEffect = "none" | "ring" | "glow" | "dust";

export type PixieTextareaResize = "none" | "vertical" | "horizontal" | "both";

export type PixieTextareaProps = Readonly<
    Omit<ComponentPropsWithRef<"textarea">, "color" | "className"> & {
        variant?: PixieTextareaVariant;
        size?: PixieTextareaSize;
        shape?: PixieTextareaShape;
        font?: PixieTextareaFont;
        tone?: PixieTextareaTone;
        effect?: PixieTextareaEffect;
        color?: PixieTextareaColor;
        invalid?: boolean;
        busy?: boolean;
        resize?: PixieTextareaResize;
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

export type PixieTextareaStyle = CSSProperties & {
    "--pixie-textarea-color"?: string;
};
