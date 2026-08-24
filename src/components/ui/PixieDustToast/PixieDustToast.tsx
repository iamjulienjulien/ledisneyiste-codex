"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type FocusEvent,
} from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    AtelierAnimationColorSlug,
    ColorForeground,
} from "@/types/colors";
import styles from "./PixieDustToast.module.css";
import type {
    PixieDustToastPriority,
    PixieDustToastProps,
    PixieDustToastSize,
    PixieDustToastStyle,
    PixieDustToastTone,
    PixieDustToastVariant,
} from "./PixieDustToast.types";

const toneColors = {
    neutral: "graphite",
    success: "vert-cellulo",
    info: "bleu-reperage",
    warning: "ambre-projecteur",
    danger: "rouge-crayon",
} as const satisfies Record<PixieDustToastTone, AtelierAnimationColorSlug>;

const toneIcons = {
    neutral: "•",
    success: "✓",
    info: "i",
    warning: "!",
    danger: "×",
} as const satisfies Record<PixieDustToastTone, string>;

const toneClasses = {
    neutral: styles.neutral,
    success: styles.success,
    info: styles.info,
    warning: styles.warning,
    danger: styles.danger,
} as const satisfies Record<PixieDustToastTone, string>;

const variantClasses = {
    surface: styles.surface,
    solid: styles.solid,
    outline: styles.outline,
} as const satisfies Record<PixieDustToastVariant, string>;

const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
} as const satisfies Record<PixieDustToastSize, string>;

const priorityRoles = {
    polite: "status",
    assertive: "alert",
} as const satisfies Record<PixieDustToastPriority, "status" | "alert">;

function getForegroundColor(foreground: ColorForeground) {
    return foreground === "light"
        ? "var(--atelier-animation-papier-animation)"
        : "var(--atelier-animation-encre)";
}

export function PixieDustToast({
    children,
    title,
    tone = "neutral",
    variant = "surface",
    size = "md",
    open,
    defaultOpen = true,
    onOpenChange,
    duration = 6000,
    pauseOnInteraction = true,
    dismissible = true,
    dismissLabel = "Fermer la notification",
    actionLabel,
    onAction,
    priority,
    icon,
    className = "",
}: PixieDustToastProps) {
    const isControlled = open !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [interactionPaused, setInteractionPaused] = useState(false);
    const resolvedOpen = isControlled ? open : uncontrolledOpen;
    const resolvedPriority =
        priority ??
        (tone === "warning" || tone === "danger" ? "assertive" : "polite");
    const color = getAtelierAnimationColor(toneColors[tone]);
    const remainingDuration = useRef(duration === false ? 0 : duration);

    const requestOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(nextOpen);
            }
            onOpenChange?.(nextOpen);
        },
        [isControlled, onOpenChange],
    );

    useEffect(() => {
        if (resolvedOpen && duration !== false) {
            remainingDuration.current = duration;
        }
    }, [duration, resolvedOpen]);

    const paused = pauseOnInteraction && interactionPaused;

    useEffect(() => {
        if (!resolvedOpen || duration === false || paused) {
            return;
        }

        const startedAt = Date.now();
        const timer = window.setTimeout(
            () => requestOpenChange(false),
            remainingDuration.current,
        );

        return () => {
            window.clearTimeout(timer);
            remainingDuration.current = Math.max(
                0,
                remainingDuration.current - (Date.now() - startedAt),
            );
        };
    }, [duration, paused, requestOpenChange, resolvedOpen]);

    if (!resolvedOpen) {
        return null;
    }

    const toastStyle: PixieDustToastStyle = {
        "--pixie-toast-color": color.cssValue,
        "--pixie-toast-foreground": getForegroundColor(color.foreground),
    };
    const resolvedIcon = icon === undefined ? toneIcons[tone] : icon;
    const hasAction = actionLabel !== undefined && onAction !== undefined;

    function handleBlur(event: FocusEvent<HTMLDivElement>) {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setInteractionPaused(false);
        }
    }

    return (
        <div
            role={priorityRoles[resolvedPriority]}
            aria-atomic="true"
            data-tone={tone}
            className={`${styles.root} ${toneClasses[tone]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
            style={toastStyle}
            onPointerEnter={() => setInteractionPaused(true)}
            onPointerLeave={() => setInteractionPaused(false)}
            onFocusCapture={() => setInteractionPaused(true)}
            onBlurCapture={handleBlur}
        >
            <span className={styles.rail} aria-hidden="true" />

            {resolvedIcon !== false ? (
                <span className={styles.icon} aria-hidden="true">
                    {resolvedIcon}
                </span>
            ) : null}

            <div className={styles.content}>
                {title ? <div className={styles.title}>{title}</div> : null}
                <div className={styles.message}>{children}</div>
            </div>

            {hasAction ? (
                <button
                    type="button"
                    className={styles.action}
                    onClick={onAction}
                >
                    {actionLabel}
                </button>
            ) : null}

            {dismissible ? (
                <button
                    type="button"
                    className={styles.dismiss}
                    aria-label={dismissLabel}
                    title={dismissLabel}
                    onClick={() => requestOpenChange(false)}
                >
                    <span aria-hidden="true">×</span>
                </button>
            ) : null}
        </div>
    );
}
