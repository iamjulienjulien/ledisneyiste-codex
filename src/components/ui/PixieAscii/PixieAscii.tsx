"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieAscii.module.css";
import type {
    PixieAsciiAlign,
    PixieAsciiCopyState,
    PixieAsciiDensity,
    PixieAsciiMaxHeight,
    PixieAsciiOverflow,
    PixieAsciiPadding,
    PixieAsciiProps,
    PixieAsciiSize,
    PixieAsciiStyle,
    PixieAsciiTexture,
    PixieAsciiVariant,
    PixieAsciiWidth,
} from "./PixieAscii.types";

const variantClasses = {
    plain: styles.plain,
    surface: styles.surface,
    outline: styles.outline,
    slate: styles.slate,
    projector: styles.projector,
} as const satisfies Record<PixieAsciiVariant, string>;

const sizeClasses = {
    sm: styles.sizeSmall,
    md: styles.sizeMedium,
    lg: styles.sizeLarge,
} as const satisfies Record<PixieAsciiSize, string>;

const densityClasses = {
    compact: styles.densityCompact,
    comfortable: styles.densityComfortable,
    airy: styles.densityAiry,
} as const satisfies Record<PixieAsciiDensity, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieAsciiPadding, string>;

const widthClasses = {
    fit: styles.widthFit,
    full: styles.widthFull,
} as const satisfies Record<PixieAsciiWidth, string>;

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
} as const satisfies Record<PixieAsciiAlign, string>;

const overflowClasses = {
    auto: styles.overflowAuto,
    clip: styles.overflowClip,
} as const satisfies Record<PixieAsciiOverflow, string>;

const maxHeightClasses = {
    none: styles.maxHeightNone,
    sm: styles.maxHeightSmall,
    md: styles.maxHeightMedium,
    lg: styles.maxHeightLarge,
} as const satisfies Record<PixieAsciiMaxHeight, string>;

const textureClasses = {
    none: "",
    grain: styles.textureGrain,
    scanlines: styles.textureScanlines,
} as const satisfies Record<PixieAsciiTexture, string>;

type ScrollState = Readonly<{
    horizontal: boolean;
    vertical: boolean;
    inlineStart: boolean;
    inlineEnd: boolean;
    blockStart: boolean;
    blockEnd: boolean;
}>;

const initialScrollState: ScrollState = {
    horizontal: false,
    vertical: false,
    inlineStart: true,
    inlineEnd: true,
    blockStart: true,
    blockEnd: true,
};

function areScrollStatesEqual(first: ScrollState, second: ScrollState) {
    return (
        first.horizontal === second.horizontal &&
        first.vertical === second.vertical &&
        first.inlineStart === second.inlineStart &&
        first.inlineEnd === second.inlineEnd &&
        first.blockStart === second.blockStart &&
        first.blockEnd === second.blockEnd
    );
}

export function PixieAscii({
    children,
    caption,
    variant = "surface",
    color = false,
    size = "md",
    density = "comfortable",
    padding = "md",
    width = "full",
    align = "start",
    overflow = "auto",
    scrollHint = true,
    maxHeight = "none",
    tabSize = 4,
    texture = "none",
    emptyLabel = "Aucune composition à afficher.",
    decorative = false,
    label,
    alternative,
    copyable = false,
    copyLabel = "Copier la composition",
    copiedLabel = "Composition copiée",
    copyErrorLabel = "La copie a échoué",
    onCopyStateChange,
    className = "",
    style,
    ...elementProps
}: PixieAsciiProps) {
    const [copyState, setCopyState] = useState<PixieAsciiCopyState>("idle");
    const [scrollState, setScrollState] =
        useState<ScrollState>(initialScrollState);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const captionId = useId();
    const alternativeId = useId();
    const isEmpty = children.length === 0;
    const canCopy = !decorative && copyable;
    const isScrollable = overflow === "auto";
    const canScroll =
        isScrollable && (scrollState.horizontal || scrollState.vertical);
    const describedBy = [
        alternative ? alternativeId : null,
        caption ? captionId : null,
    ]
        .filter(Boolean)
        .join(" ");
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const asciiStyle: PixieAsciiStyle = {
        ...style,
        "--pixie-ascii-tab-size": tabSize,
        ...(colorDefinition
            ? { "--pixie-ascii-color": colorDefinition.cssValue }
            : {}),
    };

    useEffect(
        () => () => {
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        },
        [],
    );

    const updateScrollState = useCallback(() => {
        const viewport = viewportRef.current;

        if (!viewport) {
            return;
        }

        const tolerance = 1;
        const horizontal =
            isScrollable &&
            viewport.scrollWidth - viewport.clientWidth > tolerance;
        const vertical =
            isScrollable &&
            viewport.scrollHeight - viewport.clientHeight > tolerance;
        const nextState: ScrollState = {
            horizontal,
            vertical,
            inlineStart: !horizontal || viewport.scrollLeft <= tolerance,
            inlineEnd:
                !horizontal ||
                viewport.scrollLeft + viewport.clientWidth >=
                    viewport.scrollWidth - tolerance,
            blockStart: !vertical || viewport.scrollTop <= tolerance,
            blockEnd:
                !vertical ||
                viewport.scrollTop + viewport.clientHeight >=
                    viewport.scrollHeight - tolerance,
        };

        setScrollState((currentState) =>
            areScrollStatesEqual(currentState, nextState)
                ? currentState
                : nextState,
        );
    }, [isScrollable]);

    useEffect(() => {
        const viewport = viewportRef.current;

        if (!viewport) {
            return;
        }

        const animationFrame = window.requestAnimationFrame(updateScrollState);
        const resizeObserver = new ResizeObserver(updateScrollState);

        resizeObserver.observe(viewport);
        if (preRef.current) {
            resizeObserver.observe(preRef.current);
        }
        viewport.addEventListener("scroll", updateScrollState, {
            passive: true,
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            viewport.removeEventListener("scroll", updateScrollState);
        };
    }, [children, updateScrollState]);

    if (decorative && isEmpty) {
        return null;
    }

    const scheduleCopyReset = () => {
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
        }

        resetTimer.current = setTimeout(() => {
            setCopyState("idle");
            onCopyStateChange?.("idle");
        }, 2200);
    };

    const copyContent = async () => {
        if (isEmpty) {
            return;
        }

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error("Clipboard API unavailable");
            }

            await navigator.clipboard.writeText(children);
            setCopyState("copied");
            onCopyStateChange?.("copied");
        } catch {
            setCopyState("error");
            onCopyStateChange?.("error");
        }

        scheduleCopyReset();
    };

    const copyButtonLabel =
        copyState === "copied"
            ? copiedLabel
            : copyState === "error"
              ? copyErrorLabel
              : copyLabel;

    return (
        <figure
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${densityClasses[density]} ${paddingClasses[padding]} ${widthClasses[width]} ${alignClasses[align]} ${overflowClasses[overflow]} ${maxHeightClasses[maxHeight]} ${textureClasses[texture]} ${className}`.trim()}
            style={asciiStyle}
            data-pixie-ascii-variant={variant}
            data-pixie-ascii-color={color || "theme"}
            data-pixie-ascii-texture={texture}
        >
            <div className={styles.frame}>
                {canCopy ? (
                    <div className={styles.toolbar}>
                        <PixieButton
                            disabled={isEmpty}
                            onClick={copyContent}
                            variant="ghost"
                            size="xs"
                            color={color}
                            className={styles.copyButton}
                            data-copy-state={copyState}
                        >
                            {copyButtonLabel}
                        </PixieButton>
                    </div>
                ) : null}

                <div className={styles.viewportFrame}>
                    <div
                        ref={viewportRef}
                        className={styles.viewport}
                        role={decorative ? undefined : "img"}
                        aria-label={decorative ? undefined : label}
                        aria-describedby={
                            !decorative && describedBy ? describedBy : undefined
                        }
                        aria-hidden={decorative || undefined}
                        tabIndex={!decorative && canScroll ? 0 : undefined}
                        data-overflow-inline={
                            scrollState.horizontal || undefined
                        }
                        data-overflow-block={scrollState.vertical || undefined}
                    >
                        {isEmpty ? (
                            <p className={styles.empty}>{emptyLabel}</p>
                        ) : (
                            <pre
                                ref={preRef}
                                className={styles.pre}
                                aria-hidden="true"
                            >
                                {children}
                            </pre>
                        )}
                    </div>

                    {scrollHint && isScrollable ? (
                        <div className={styles.scrollHints} aria-hidden="true">
                            <span
                                className={`${styles.scrollHint} ${styles.scrollHintInlineStart}`}
                                data-visible={
                                    scrollState.horizontal &&
                                    !scrollState.inlineStart
                                        ? true
                                        : undefined
                                }
                            />
                            <span
                                className={`${styles.scrollHint} ${styles.scrollHintInlineEnd}`}
                                data-visible={
                                    scrollState.horizontal &&
                                    !scrollState.inlineEnd
                                        ? true
                                        : undefined
                                }
                            />
                            <span
                                className={`${styles.scrollHint} ${styles.scrollHintBlockStart}`}
                                data-visible={
                                    scrollState.vertical &&
                                    !scrollState.blockStart
                                        ? true
                                        : undefined
                                }
                            />
                            <span
                                className={`${styles.scrollHint} ${styles.scrollHintBlockEnd}`}
                                data-visible={
                                    scrollState.vertical &&
                                    !scrollState.blockEnd
                                        ? true
                                        : undefined
                                }
                            />
                        </div>
                    ) : null}
                </div>

                {!decorative && alternative ? (
                    <span id={alternativeId} className={styles.visuallyHidden}>
                        {alternative}
                    </span>
                ) : null}

                {canCopy ? (
                    <span className={styles.visuallyHidden} aria-live="polite">
                        {copyState === "idle" ? "" : copyButtonLabel}
                    </span>
                ) : null}
            </div>

            {caption ? (
                <figcaption id={captionId} className={styles.caption}>
                    {caption}
                </figcaption>
            ) : null}
        </figure>
    );
}
