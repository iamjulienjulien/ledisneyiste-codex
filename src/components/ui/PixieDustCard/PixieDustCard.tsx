import { cloneElement } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieDustCardAccentPosition,
    PixieDustCardEffect,
    PixieDustCardEffectIntensity,
    PixieDustCardPadding,
    PixieDustCardProps,
    PixieDustCardRadius,
    PixieDustCardStyle,
    PixieDustCardVariant,
} from "./PixieDustCard.types";
import styles from "./PixieDustCard.module.css";

const variantClasses = {
    surface: styles.surface,
    muted: styles.muted,
    outline: styles.outline,
    elevated: styles.elevated,
    accent: styles.accent,
    tinted: styles.tinted,
} as const satisfies Record<PixieDustCardVariant, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieDustCardPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustCardRadius, string>;

const effectClasses = {
    none: styles.effectNone,
    lift: styles.effectLift,
    glow: styles.effectGlow,
    reveal: styles.effectReveal,
    projector: styles.effectProjector,
} as const satisfies Record<PixieDustCardEffect, string>;

const accentPositionClasses = {
    top: styles.accentTop,
    end: styles.accentEnd,
    bottom: styles.accentBottom,
    start: styles.accentStart,
} as const satisfies Record<PixieDustCardAccentPosition, string>;

const effectIntensityClasses = {
    subtle: styles.intensitySubtle,
    medium: styles.intensityMedium,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieDustCardEffectIntensity, string>;

export function PixieDustCard({
    as: Element = "div",
    asChild = false,
    variant = "surface",
    color = false,
    padding = "md",
    radius = "medium",
    accentPosition = "top",
    effect = "none",
    effectIntensity = "medium",
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustCardProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const cardStyle: PixieDustCardStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-card-color": colorDefinition.cssValue }
            : {}),
    };

    const rootClassName =
        `${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${accentPositionClasses[accentPosition]} ${effectClasses[effect]} ${effectIntensityClasses[effectIntensity]} ${className}`.trim();
    const decoration = (
        <span className={styles.decoration} aria-hidden="true" />
    );
    const sharedProps = {
        ...elementProps,
        className: rootClassName,
        style: cardStyle,
        "data-pixie-card-variant": variant,
        "data-pixie-card-color": color || "theme",
        "data-pixie-card-accent-position": accentPosition,
        "data-pixie-card-effect": effect,
        "data-pixie-card-effect-intensity": effectIntensity,
    };

    if (asChild) {
        const child = children as ReactElement<{
            children?: ReactNode;
            className?: string;
            style?: CSSProperties;
        }>;
        const childProps = child.props;

        return cloneElement(
            child,
            {
                ...sharedProps,
                className:
                    `${childProps.className ?? ""} ${rootClassName}`.trim(),
                style: { ...childProps.style, ...cardStyle },
            },
            <>
                {decoration}
                {childProps.children}
            </>,
        );
    }

    return (
        <Element {...sharedProps}>
            {decoration}
            {children}
        </Element>
    );
}
