"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type AnimationEvent,
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
} from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    AtelierAnimationColorSlug,
    ColorForeground,
} from "@/types/colors";
import styles from "./PixieToast.module.css";
import type {
    PixieToastDismissReason,
    PixieToastLayout,
    PixieToastMotion,
    PixieToastPriority,
    PixieToastProps,
    PixieToastSize,
    PixieToastStyle,
    PixieToastSwipeDirection,
    PixieToastTone,
    PixieToastVariant,
    PixieToastWidth,
} from "./PixieToast.types";

const toneColors = {
    neutral: "graphite",
    success: "vert-cellulo",
    info: "bleu-reperage",
    warning: "ambre-projecteur",
    danger: "rouge-crayon",
} as const satisfies Record<PixieToastTone, AtelierAnimationColorSlug>;

const toneIcons = {
    neutral: "•",
    success: "✓",
    info: "i",
    warning: "!",
    danger: "×",
} as const satisfies Record<PixieToastTone, string>;

const variantClasses = {
    surface: styles.surface,
    solid: styles.solid,
    outline: styles.outline,
    glass: styles.glass,
    spotlight: styles.spotlight,
} as const satisfies Record<PixieToastVariant, string>;

const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
} as const satisfies Record<PixieToastSize, string>;

const layoutClasses = {
    auto: styles.layoutAuto,
    inline: styles.layoutInline,
    stacked: styles.layoutStacked,
} as const satisfies Record<PixieToastLayout, string>;

const widthClasses = {
    fit: styles.widthFit,
    sm: styles.widthSm,
    md: styles.widthMd,
    lg: styles.widthLg,
    full: styles.widthFull,
} as const satisfies Record<PixieToastWidth, string>;

const motionClasses = {
    slide: styles.motionSlide,
    fade: styles.motionFade,
    pop: styles.motionPop,
    dust: styles.motionDust,
    none: styles.motionNone,
} as const satisfies Record<PixieToastMotion, string>;

const priorityRoles = {
    polite: "status",
    assertive: "alert",
} as const satisfies Record<
    Exclude<PixieToastPriority, "auto">,
    "status" | "alert"
>;

type PresenceState = "opening" | "open" | "closing";

type SwipeOrigin = Readonly<{
    pointerId: number;
    x: number;
    y: number;
}>;

const PRESENCE_FALLBACK_DURATION = 260;
const SWIPE_THRESHOLD = 56;

function getForegroundColor(foreground: ColorForeground) {
    return foreground === "light"
        ? "var(--atelier-animation-papier-animation)"
        : "var(--atelier-animation-encre)";
}

function getLogicalSwipeSign(
    direction: PixieToastSwipeDirection,
    writingDirection: string,
) {
    if (direction === "up") {
        return -1;
    }

    if (direction === "down") {
        return 1;
    }

    const inlineEndSign = writingDirection === "rtl" ? -1 : 1;
    return direction === "start" ? -inlineEndSign : inlineEndSign;
}

export function PixieToast({
    children,
    title,
    tone = "neutral",
    variant = "surface",
    size = "md",
    layout = "auto",
    width = "md",
    motion = "slide",
    progress = "none",
    open,
    defaultOpen = true,
    onOpenChange,
    onDismiss,
    duration = 6000,
    pauseOnInteraction = true,
    pauseOnPageHidden = true,
    dismissible = true,
    dismissLabel = "Fermer la notification",
    closeOnEscape = true,
    swipeDirection = false,
    actionLabel,
    onAction,
    closeOnAction = true,
    priority = "auto",
    icon,
    className = "",
}: PixieToastProps) {
    const isControlled = open !== undefined;
    const initialOpen = isControlled ? open : defaultOpen;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [present, setPresent] = useState(initialOpen);
    const [presenceState, setPresenceState] =
        useState<PresenceState>("opening");
    const [interactionPaused, setInteractionPaused] = useState(false);
    const [pageHidden, setPageHidden] = useState(false);
    const [progressCycle, setProgressCycle] = useState(0);
    const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
    const [swiping, setSwiping] = useState(false);
    const [previousOpen, setPreviousOpen] = useState(initialOpen);
    const [previousDuration, setPreviousDuration] = useState(duration);
    const swipeOrigin = useRef<SwipeOrigin | null>(null);
    const suppressClick = useRef(false);
    const remainingDuration = useRef(duration === false ? 0 : duration);
    const dismissRequested = useRef(false);
    const resolvedOpen = isControlled ? open : uncontrolledOpen;
    const resolvedPriority =
        priority === "auto"
            ? tone === "danger"
                ? "assertive"
                : "polite"
            : priority;
    const color = getAtelierAnimationColor(toneColors[tone]);
    const paused =
        (pauseOnInteraction && interactionPaused) ||
        (pauseOnPageHidden && pageHidden);

    if (resolvedOpen !== previousOpen || duration !== previousDuration) {
        const openChanged = resolvedOpen !== previousOpen;
        setPreviousOpen(resolvedOpen);
        setPreviousDuration(duration);

        if (resolvedOpen) {
            setProgressCycle((cycle) => cycle + 1);

            if (openChanged) {
                setPresent(true);
                setPresenceState("opening");
            }
        } else if (openChanged && present) {
            setPresenceState("closing");
        }
    }

    useEffect(() => {
        if (resolvedOpen) {
            dismissRequested.current = false;
            remainingDuration.current = duration === false ? 0 : duration;
        }
    }, [duration, resolvedOpen]);

    const requestOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(nextOpen);
            }
            onOpenChange?.(nextOpen);
        },
        [isControlled, onOpenChange],
    );

    const requestDismiss = useCallback(
        (reason: PixieToastDismissReason) => {
            if (dismissRequested.current) {
                return;
            }

            dismissRequested.current = true;
            onDismiss?.(reason);
            requestOpenChange(false);
        },
        [onDismiss, requestOpenChange],
    );

    useEffect(() => {
        if (presenceState === "open") {
            return;
        }

        const timer = window.setTimeout(() => {
            if (presenceState === "opening") {
                setPresenceState("open");
            } else {
                setPresent(false);
            }
        }, PRESENCE_FALLBACK_DURATION);

        return () => window.clearTimeout(timer);
    }, [presenceState]);

    useEffect(() => {
        if (!pauseOnPageHidden || duration === false || !resolvedOpen) {
            return;
        }

        const updateVisibility = () =>
            setPageHidden(document.visibilityState === "hidden");

        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);

        return () =>
            document.removeEventListener("visibilitychange", updateVisibility);
    }, [duration, pauseOnPageHidden, resolvedOpen]);

    useEffect(() => {
        if (!resolvedOpen || duration === false || paused) {
            return;
        }

        const startedAt = performance.now();
        const timer = window.setTimeout(
            () => requestDismiss("timeout"),
            remainingDuration.current,
        );

        return () => {
            window.clearTimeout(timer);
            remainingDuration.current = Math.max(
                0,
                remainingDuration.current - (performance.now() - startedAt),
            );
        };
    }, [duration, paused, requestDismiss, resolvedOpen]);

    if (!present) {
        return null;
    }

    const toastStyle: PixieToastStyle = {
        "--pixie-toast-color": color.cssValue,
        "--pixie-toast-foreground": getForegroundColor(color.foreground),
        "--pixie-toast-duration":
            duration === false ? undefined : `${duration}ms`,
        "--pixie-toast-swipe-x": `${swipeOffset.x}px`,
        "--pixie-toast-swipe-y": `${swipeOffset.y}px`,
    };
    const resolvedIcon = icon === undefined ? toneIcons[tone] : icon;
    const hasAction = actionLabel !== undefined && onAction !== undefined;
    const hasProgress = duration !== false && progress !== "none";

    function handleBlur(event: FocusEvent<HTMLDivElement>) {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setInteractionPaused(false);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Escape" && closeOnEscape) {
            event.preventDefault();
            requestDismiss("escape");
        }
    }

    function handleAction() {
        onAction?.();
        if (closeOnAction) {
            requestDismiss("action");
        }
    }

    function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
        if (swipeDirection === false || event.button !== 0) {
            return;
        }

        swipeOrigin.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
        };
        suppressClick.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        setSwiping(true);
        if (duration !== false) {
            setInteractionPaused(true);
        }
    }

    function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
        const origin = swipeOrigin.current;
        if (!origin || origin.pointerId !== event.pointerId) {
            return;
        }

        const writingDirection = window.getComputedStyle(
            event.currentTarget,
        ).direction;
        const sign = getLogicalSwipeSign(swipeDirection, writingDirection);
        const vertical = swipeDirection === "up" || swipeDirection === "down";
        const rawOffset = vertical
            ? event.clientY - origin.y
            : event.clientX - origin.x;
        const offset = rawOffset * sign > 0 ? rawOffset : rawOffset * 0.12;

        setSwipeOffset(vertical ? { x: 0, y: offset } : { x: offset, y: 0 });
    }

    function finishSwipe(event: PointerEvent<HTMLDivElement>) {
        const origin = swipeOrigin.current;
        if (!origin || origin.pointerId !== event.pointerId) {
            return;
        }

        const writingDirection = window.getComputedStyle(
            event.currentTarget,
        ).direction;
        const sign = getLogicalSwipeSign(swipeDirection, writingDirection);
        const vertical = swipeDirection === "up" || swipeDirection === "down";
        const distance = (vertical ? swipeOffset.y : swipeOffset.x) * sign;

        swipeOrigin.current = null;
        setSwiping(false);
        if (duration !== false) {
            setInteractionPaused(false);
        }

        if (distance >= SWIPE_THRESHOLD) {
            suppressClick.current = true;
            requestDismiss("swipe");
            return;
        }

        setSwipeOffset({ x: 0, y: 0 });
    }

    function cancelSwipe() {
        swipeOrigin.current = null;
        suppressClick.current = false;
        setSwiping(false);
        if (duration !== false) {
            setInteractionPaused(false);
        }
        setSwipeOffset({ x: 0, y: 0 });
    }

    function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
        if (!suppressClick.current) {
            return;
        }

        suppressClick.current = false;
        event.preventDefault();
        event.stopPropagation();
    }

    function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (presenceState === "opening") {
            setPresenceState("open");
        } else if (presenceState === "closing") {
            setPresent(false);
        }
    }

    return (
        <div
            data-tone={tone}
            data-state={presenceState}
            data-paused={paused ? "true" : "false"}
            data-swiping={swiping ? "true" : "false"}
            data-swipe-direction={swipeDirection || undefined}
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${layoutClasses[layout]} ${widthClasses[width]} ${motionClasses[motion]} ${className}`.trim()}
            style={toastStyle}
            onAnimationEnd={handleAnimationEnd}
            onClickCapture={handleClickCapture}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishSwipe}
            onPointerCancel={cancelSwipe}
            onPointerEnter={() => {
                if (pauseOnInteraction && duration !== false) {
                    setInteractionPaused(true);
                }
            }}
            onPointerLeave={() => {
                if (pauseOnInteraction && duration !== false && !swiping) {
                    setInteractionPaused(false);
                }
            }}
            onFocusCapture={() => {
                if (pauseOnInteraction && duration !== false) {
                    setInteractionPaused(true);
                }
            }}
            onBlurCapture={handleBlur}
        >
            <span className={styles.rail} aria-hidden="true" />

            {hasProgress && progress === "rail" ? (
                <span
                    key={`rail-${progressCycle}`}
                    className={`${styles.progress} ${styles.progressRail}`}
                    aria-hidden="true"
                />
            ) : null}

            {motion === "dust" ? (
                <span className={styles.dust} aria-hidden="true">
                    {Array.from({ length: 7 }, (_, index) => (
                        <span key={index} />
                    ))}
                </span>
            ) : null}

            {resolvedIcon !== false ? (
                <span className={styles.icon} aria-hidden="true">
                    {resolvedIcon}
                </span>
            ) : null}

            <div
                role={priorityRoles[resolvedPriority]}
                aria-live={resolvedPriority}
                aria-atomic="true"
                className={styles.content}
            >
                {title ? <div className={styles.title}>{title}</div> : null}
                <div className={styles.message}>{children}</div>
            </div>

            {hasAction ? (
                <button
                    type="button"
                    className={styles.action}
                    onClick={handleAction}
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
                    onClick={() => requestDismiss("dismiss")}
                >
                    <span aria-hidden="true">×</span>
                </button>
            ) : null}

            {hasProgress && progress === "bar" ? (
                <span
                    key={`bar-${progressCycle}`}
                    className={`${styles.progress} ${styles.progressBar}`}
                    aria-hidden="true"
                />
            ) : null}
        </div>
    );
}
