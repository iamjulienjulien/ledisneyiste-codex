import type { CSSProperties, ReactNode } from "react";

export type PixieDustToastTone =
    "neutral" | "success" | "info" | "warning" | "danger";

export type PixieDustToastVariant = "surface" | "solid" | "outline";

export type PixieDustToastSize = "sm" | "md";

export type PixieDustToastPriority = "polite" | "assertive";

export type PixieDustToastProps = Readonly<{
    children: ReactNode;
    title?: ReactNode;
    tone?: PixieDustToastTone;
    variant?: PixieDustToastVariant;
    size?: PixieDustToastSize;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    duration?: number | false;
    pauseOnInteraction?: boolean;
    dismissible?: boolean;
    dismissLabel?: string;
    actionLabel?: string;
    onAction?: () => void;
    priority?: PixieDustToastPriority;
    icon?: ReactNode | false;
    className?: string;
}>;

export type PixieDustToastStyle = CSSProperties & {
    "--pixie-toast-color": string;
    "--pixie-toast-foreground": string;
};
