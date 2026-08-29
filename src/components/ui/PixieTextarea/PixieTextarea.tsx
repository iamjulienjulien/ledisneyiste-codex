"use client";

import {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieTextarea.module.css";
import type {
    PixieTextareaEffect,
    PixieTextareaFont,
    PixieTextareaProps,
    PixieTextareaResize,
    PixieTextareaShape,
    PixieTextareaSize,
    PixieTextareaStyle,
    PixieTextareaTone,
    PixieTextareaVariant,
} from "./PixieTextarea.types";

const variantClasses = {
    outline: styles.outline,
    filled: styles.filled,
    underline: styles.underline,
    ghost: styles.ghost,
    manuscript: styles.manuscript,
} as const satisfies Record<PixieTextareaVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieTextareaSize, string>;

const shapeClasses = {
    square: styles.square,
    rounded: styles.rounded,
} as const satisfies Record<PixieTextareaShape, string>;

const fontClasses = {
    body: styles.fontBody,
    mono: styles.fontMono,
} as const satisfies Record<PixieTextareaFont, string>;

const toneClasses = {
    neutral: styles.toneNeutral,
    success: styles.toneSuccess,
    warning: styles.toneWarning,
} as const satisfies Record<PixieTextareaTone, string>;

const effectClasses = {
    none: styles.effectNone,
    ring: styles.effectRing,
    glow: styles.effectGlow,
    dust: styles.effectDust,
} as const satisfies Record<PixieTextareaEffect, string>;

const resizeClasses = {
    none: styles.resizeNone,
    vertical: styles.resizeVertical,
    horizontal: styles.resizeHorizontal,
    both: styles.resizeBoth,
} as const satisfies Record<PixieTextareaResize, string>;

function isAriaInvalid(value: PixieTextareaProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

function getValueLength(value: unknown) {
    return typeof value === "string" || typeof value === "number"
        ? String(value).length
        : 0;
}

export function PixieTextarea({
    variant = "outline",
    size = "md",
    shape = "rounded",
    font = "body",
    tone = "neutral",
    effect = "ring",
    color = false,
    invalid = false,
    busy = false,
    resize = "vertical",
    autoGrow = false,
    minRows = 3,
    maxRows = 12,
    showCount = false,
    countLabel,
    startAdornment,
    endAdornment,
    footerStart,
    footerEnd,
    className = "",
    textareaClassName = "",
    headerClassName = "",
    footerClassName = "",
    style,
    disabled = false,
    readOnly = false,
    value,
    defaultValue,
    rows,
    maxLength,
    onChange,
    ref: forwardedRef,
    "aria-invalid": ariaInvalid,
    "aria-busy": ariaBusy,
    ...textareaProps
}: PixieTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [uncontrolledLength, setUncontrolledLength] = useState(() =>
        getValueLength(defaultValue),
    );
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieTextareaStyle | undefined = colorDefinition
        ? { "--pixie-textarea-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);
    const currentLength =
        value === undefined ? uncontrolledLength : getValueLength(value);
    const safeMinRows = Math.max(1, minRows);
    const safeMaxRows = Math.max(safeMinRows, maxRows);
    const hasHeader = Boolean(startAdornment || endAdornment || busy);
    const hasFooter = Boolean(footerStart || footerEnd || showCount);
    const countWarning = Boolean(
        maxLength && maxLength > 0 && currentLength / maxLength >= 0.85,
    );
    const countLimit = Boolean(maxLength && currentLength >= maxLength);

    const setTextareaRef = useCallback(
        (node: HTMLTextAreaElement | null) => {
            textareaRef.current = node;

            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        },
        [forwardedRef],
    );

    const resizeToContent = useCallback(() => {
        const node = textareaRef.current;

        if (!node || !autoGrow) {
            return;
        }

        node.style.height = "auto";
        const computedStyle = window.getComputedStyle(node);
        const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 24;
        const chrome =
            Number.parseFloat(computedStyle.paddingTop) +
            Number.parseFloat(computedStyle.paddingBottom) +
            Number.parseFloat(computedStyle.borderTopWidth) +
            Number.parseFloat(computedStyle.borderBottomWidth);
        const minimumHeight = safeMinRows * lineHeight + chrome;
        const maximumHeight = safeMaxRows * lineHeight + chrome;
        const nextHeight = Math.min(
            Math.max(node.scrollHeight, minimumHeight),
            maximumHeight,
        );

        node.style.height = `${Math.ceil(nextHeight)}px`;
        node.style.overflowY =
            node.scrollHeight > maximumHeight ? "auto" : "hidden";
    }, [autoGrow, safeMaxRows, safeMinRows]);

    useLayoutEffect(() => {
        const node = textareaRef.current;

        if (!autoGrow && node) {
            node.style.height = "";
            node.style.overflowY = "";
            return;
        }

        resizeToContent();
    }, [autoGrow, font, resizeToContent, size, value, variant]);

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setUncontrolledLength(event.currentTarget.value.length);
        resizeToContent();
        onChange?.(event);
    }

    const renderedCount = countLabel
        ? countLabel(currentLength, maxLength)
        : maxLength
          ? `${currentLength} / ${maxLength}`
          : `${currentLength} caractère${currentLength > 1 ? "s" : ""}`;

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${toneClasses[tone]} ${effectClasses[effect]} ${className}`.trim()}
            style={rootStyle}
            data-auto-grow={autoGrow || undefined}
            data-busy={busy || undefined}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pixie-textarea-color={color || "inherit"}
            data-pixie-textarea-effect={effect}
            data-pixie-textarea-font={font}
            data-pixie-textarea-resize={autoGrow ? "auto" : resize}
            data-pixie-textarea-shape={shape}
            data-pixie-textarea-size={size}
            data-pixie-textarea-tone={tone}
            data-pixie-textarea-variant={variant}
            data-readonly={readOnly || undefined}
        >
            <span className={styles.control}>
                {hasHeader ? (
                    <span
                        className={`${styles.header} ${headerClassName}`.trim()}
                    >
                        <span className={styles.headerStart} aria-hidden="true">
                            {startAdornment}
                        </span>
                        <span className={styles.headerEnd} aria-hidden="true">
                            {endAdornment}
                            {busy ? (
                                <span
                                    className={styles.busy}
                                    aria-hidden="true"
                                />
                            ) : null}
                        </span>
                    </span>
                ) : null}
                <textarea
                    {...textareaProps}
                    ref={setTextareaRef}
                    value={value}
                    defaultValue={defaultValue}
                    rows={autoGrow ? safeMinRows : rows}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-busy={busy ? true : ariaBusy}
                    aria-invalid={isInvalid ? true : ariaInvalid}
                    onChange={handleChange}
                    className={`${styles.textarea} ${fontClasses[font]} ${resizeClasses[autoGrow ? "none" : resize]} ${textareaClassName}`.trim()}
                    style={style}
                />
                {effect === "dust" ? (
                    <span className={styles.dust} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                ) : null}
            </span>
            {hasFooter ? (
                <span
                    className={`${styles.footer} ${footerClassName}`.trim()}
                    data-count-limit={countLimit || undefined}
                    data-count-warning={countWarning || undefined}
                >
                    <span className={styles.footerStart}>{footerStart}</span>
                    <span className={styles.footerEnd}>
                        {footerEnd}
                        {showCount ? (
                            <span className={styles.count} aria-hidden="true">
                                {renderedCount}
                            </span>
                        ) : null}
                    </span>
                </span>
            ) : null}
        </span>
    );
}
