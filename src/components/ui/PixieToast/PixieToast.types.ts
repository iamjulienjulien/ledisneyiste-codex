import type { CSSProperties, ReactNode } from "react";

export type PixieToastTone =
    "neutral" | "success" | "info" | "warning" | "danger";

export type PixieToastVariant =
    "surface" | "solid" | "outline" | "glass" | "spotlight";

export type PixieToastSize = "sm" | "md" | "lg";

export type PixieToastPriority = "auto" | "polite" | "assertive";

export type PixieToastLayout = "auto" | "inline" | "stacked";

export type PixieToastWidth = "fit" | "sm" | "md" | "lg" | "full";

export type PixieToastMotion = "slide" | "fade" | "pop" | "dust" | "none";

export type PixieToastProgress = "none" | "rail" | "bar";

export type PixieToastSwipeDirection = "start" | "end" | "up" | "down" | false;

export type PixieToastDismissReason =
    "timeout" | "dismiss" | "action" | "escape" | "swipe";

export type PixieToastProps = Readonly<{
    children: ReactNode;
    title?: ReactNode;
    tone?: PixieToastTone;
    variant?: PixieToastVariant;
    size?: PixieToastSize;
    layout?: PixieToastLayout;
    width?: PixieToastWidth;
    motion?: PixieToastMotion;
    progress?: PixieToastProgress;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onDismiss?: (reason: PixieToastDismissReason) => void;
    duration?: number | false;
    pauseOnInteraction?: boolean;
    pauseOnPageHidden?: boolean;
    dismissible?: boolean;
    dismissLabel?: string;
    closeOnEscape?: boolean;
    swipeDirection?: PixieToastSwipeDirection;
    actionLabel?: string;
    onAction?: () => void;
    closeOnAction?: boolean;
    priority?: PixieToastPriority;
    icon?: ReactNode | false;
    className?: string;
}>;

export type PixieToastStyle = CSSProperties & {
    "--pixie-toast-color": string;
    "--pixie-toast-foreground": string;
    "--pixie-toast-duration"?: string;
    "--pixie-toast-swipe-x"?: string;
    "--pixie-toast-swipe-y"?: string;
};
