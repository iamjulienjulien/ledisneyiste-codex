"use client";

import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieSwitch.module.css";
import type {
    PixieSwitchEffect,
    PixieSwitchMotion,
    PixieSwitchProps,
    PixieSwitchSize,
    PixieSwitchStyle,
    PixieSwitchVariant,
} from "./PixieSwitch.types";

const variantClasses = {
    solid: styles.solid,
    soft: styles.soft,
    outline: styles.outline,
    glass: styles.glass,
    projector: styles.projector,
} as const satisfies Record<PixieSwitchVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieSwitchSize, string>;

const motionClasses = {
    slide: "",
    snap: styles.motionSnap,
    spring: styles.motionSpring,
    none: styles.motionNone,
} as const satisfies Record<PixieSwitchMotion, string>;

const effectClasses = {
    none: "",
    glow: styles.effectGlow,
    dust: styles.effectDust,
} as const satisfies Record<PixieSwitchEffect, string>;

function isAriaInvalid(value: PixieSwitchProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieSwitch({
    variant = "solid",
    size = "md",
    color = false,
    motion = "slide",
    effect = "none",
    invalid = false,
    pending = false,
    checkedIcon,
    uncheckedIcon,
    onCheckedChange,
    className = "",
    inputClassName = "",
    trackClassName = "",
    thumbClassName = "",
    style,
    disabled = false,
    readOnly = false,
    onChange,
    onClick,
    onKeyDown,
    "aria-invalid": ariaInvalid,
    "aria-busy": ariaBusy,
    "aria-disabled": ariaDisabled,
    "aria-readonly": ariaReadOnly,
    ...inputProps
}: PixieSwitchProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieSwitchStyle | undefined = colorDefinition
        ? { "--pixie-switch-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);
    const isLocked = readOnly || pending;

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${motionClasses[motion]} ${effectClasses[effect]} ${className}`.trim()}
            style={rootStyle}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pending={pending || undefined}
            data-readonly={readOnly || undefined}
            data-pixie-switch-color={color || "inherit"}
            data-pixie-switch-effect={effect}
            data-pixie-switch-motion={motion}
            data-pixie-switch-size={size}
            data-pixie-switch-variant={variant}
        >
            <input
                {...inputProps}
                type="checkbox"
                role="switch"
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={isInvalid ? true : ariaInvalid}
                aria-busy={pending ? true : ariaBusy}
                aria-disabled={pending ? true : ariaDisabled}
                aria-readonly={readOnly ? true : ariaReadOnly}
                className={`${styles.input} ${inputClassName}`.trim()}
                style={style}
                onChange={(event) => {
                    if (isLocked) {
                        return;
                    }

                    onChange?.(event);
                    if (!event.defaultPrevented) {
                        onCheckedChange?.(event.currentTarget.checked);
                    }
                }}
                onClick={(event) => {
                    if (isLocked) {
                        event.preventDefault();
                    }
                    onClick?.(event);
                }}
                onKeyDown={(event) => {
                    if (
                        isLocked &&
                        (event.key === " " || event.key === "Enter")
                    ) {
                        event.preventDefault();
                    }
                    onKeyDown?.(event);
                }}
            />
            <span
                aria-hidden="true"
                className={`${styles.track} ${trackClassName}`.trim()}
            >
                <span className={`${styles.thumb} ${thumbClassName}`.trim()}>
                    <span className={styles.uncheckedIcon}>
                        {uncheckedIcon}
                    </span>
                    <span className={styles.checkedIcon}>{checkedIcon}</span>
                    <span className={styles.pendingIndicator} />
                </span>
            </span>
            <span aria-hidden="true" className={styles.dust}>
                <span />
                <span />
                <span />
                <span />
                <span />
            </span>
        </span>
    );
}
