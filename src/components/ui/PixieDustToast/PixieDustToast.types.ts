import type { CSSProperties, ReactNode } from "react";

export type PixieDustToastTone =
    "neutral" | "success" | "info" | "warning" | "danger";

export type PixieDustToastVariant =
    "surface" | "solid" | "outline" | "glass" | "spotlight";

export type PixieDustToastSize = "sm" | "md" | "lg";

export type PixieDustToastPriority = "auto" | "polite" | "assertive";

export type PixieDustToastLayout = "auto" | "inline" | "stacked";

export type PixieDustToastWidth = "fit" | "sm" | "md" | "lg" | "full";

export type PixieDustToastMotion = "slide" | "fade" | "pop" | "dust" | "none";

export type PixieDustToastProgress = "none" | "rail" | "bar";

export type PixieDustToastSwipeDirection =
    "start" | "end" | "up" | "down" | false;

export type PixieDustToastDismissReason =
    "timeout" | "dismiss" | "action" | "escape" | "swipe";

export type PixieDustToastProps = Readonly<{
    children: ReactNode;
    title?: ReactNode;
    tone?: PixieDustToastTone;
    variant?: PixieDustToastVariant;
    size?: PixieDustToastSize;
    layout?: PixieDustToastLayout;
    width?: PixieDustToastWidth;
    motion?: PixieDustToastMotion;
    progress?: PixieDustToastProgress;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onDismiss?: (reason: PixieDustToastDismissReason) => void;
    duration?: number | false;
    pauseOnInteraction?: boolean;
    pauseOnPageHidden?: boolean;
    dismissible?: boolean;
    dismissLabel?: string;
    closeOnEscape?: boolean;
    swipeDirection?: PixieDustToastSwipeDirection;
    actionLabel?: string;
    onAction?: () => void;
    closeOnAction?: boolean;
    priority?: PixieDustToastPriority;
    icon?: ReactNode | false;
    className?: string;
}>;

export type PixieDustToastStyle = CSSProperties & {
    "--pixie-toast-color": string;
    "--pixie-toast-foreground": string;
    "--pixie-toast-duration"?: string;
    "--pixie-toast-swipe-x"?: string;
    "--pixie-toast-swipe-y"?: string;
};
