"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustAscii.module.css";
import type {
    PixieDustAsciiAlign,
    PixieDustAsciiCopyState,
    PixieDustAsciiDensity,
    PixieDustAsciiMaxHeight,
    PixieDustAsciiOverflow,
    PixieDustAsciiPadding,
    PixieDustAsciiProps,
    PixieDustAsciiSize,
    PixieDustAsciiStyle,
    PixieDustAsciiTexture,
    PixieDustAsciiVariant,
    PixieDustAsciiWidth,
} from "./PixieDustAscii.types";

const variantClasses = {
    plain: styles.plain,
    surface: styles.surface,
    outline: styles.outline,
    slate: styles.slate,
    projector: styles.projector,
} as const satisfies Record<PixieDustAsciiVariant, string>;

const sizeClasses = {
    sm: styles.sizeSmall,
    md: styles.sizeMedium,
    lg: styles.sizeLarge,
} as const satisfies Record<PixieDustAsciiSize, string>;

const densityClasses = {
    compact: styles.densityCompact,
    comfortable: styles.densityComfortable,
    airy: styles.densityAiry,
} as const satisfies Record<PixieDustAsciiDensity, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieDustAsciiPadding, string>;

const widthClasses = {
    fit: styles.widthFit,
    full: styles.widthFull,
} as const satisfies Record<PixieDustAsciiWidth, string>;

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
} as const satisfies Record<PixieDustAsciiAlign, string>;

const overflowClasses = {
    auto: styles.overflowAuto,
    clip: styles.overflowClip,
} as const satisfies Record<PixieDustAsciiOverflow, string>;

const maxHeightClasses = {
    none: styles.maxHeightNone,
    sm: styles.maxHeightSmall,
    md: styles.maxHeightMedium,
    lg: styles.maxHeightLarge,
} as const satisfies Record<PixieDustAsciiMaxHeight, string>;

const textureClasses = {
    none: "",
    grain: styles.textureGrain,
    scanlines: styles.textureScanlines,
} as const satisfies Record<PixieDustAsciiTexture, string>;

const copyStateLabels = {
    copied: "La composition est dans le presse-papiers.",
    error: "La copie automatique a échoué. La composition reste sélectionnable.",
} as const satisfies Record<Exclude<PixieDustAsciiCopyState, "idle">, string>;

export function PixieDustAscii({
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
    maxHeight = "none",
    tabSize = 4,
    texture = "none",
    decorative = false,
    label,
    copyable = false,
    copyLabel = "Copier la composition",
    copiedLabel = "Composition copiée",
    copyErrorLabel = "La copie a échoué",
    className = "",
    style,
    ...elementProps
}: PixieDustAsciiProps) {
    const [copyState, setCopyState] = useState<PixieDustAsciiCopyState>("idle");
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const captionId = useId();
    const isEmpty = children.length === 0;
    const canCopy = !decorative && copyable;
    const isScrollable = overflow === "auto";
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const asciiStyle: PixieDustAsciiStyle = {
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

    if (decorative && isEmpty) {
        return null;
    }

    const scheduleCopyReset = () => {
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
        }

        resetTimer.current = setTimeout(() => setCopyState("idle"), 2200);
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
        } catch {
            setCopyState("error");
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
                        <button
                            type="button"
                            disabled={isEmpty}
                            onClick={copyContent}
                            className={styles.copyButton}
                            data-copy-state={copyState}
                        >
                            {copyButtonLabel}
                        </button>
                    </div>
                ) : null}

                <div
                    className={styles.viewport}
                    role={decorative ? undefined : "img"}
                    aria-label={decorative ? undefined : label}
                    aria-describedby={caption ? captionId : undefined}
                    aria-hidden={decorative || undefined}
                    tabIndex={!decorative && isScrollable ? 0 : undefined}
                >
                    {isEmpty ? (
                        <p className={styles.empty}>
                            Aucune composition à afficher.
                        </p>
                    ) : (
                        <pre className={styles.pre} aria-hidden="true">
                            {children}
                        </pre>
                    )}
                </div>

                {canCopy ? (
                    <span className={styles.visuallyHidden} aria-live="polite">
                        {copyState === "idle" ? "" : copyStateLabels[copyState]}
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
