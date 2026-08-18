import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieDustCardEffect,
    PixieDustCardPadding,
    PixieDustCardProps,
    PixieDustCardRadius,
    PixieDustCardStyle,
    PixieDustCardVariant,
} from "./PixieDustCard.types";
import styles from "./PixieDustCard.module.css";

const variantClasses = {
    surface: styles.surface,
    outline: styles.outline,
    elevated: styles.elevated,
    accent: styles.accent,
} as const satisfies Record<PixieDustCardVariant, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
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
    projector: styles.effectProjector,
} as const satisfies Record<PixieDustCardEffect, string>;

export function PixieDustCard({
    as: Element = "div",
    variant = "surface",
    color = false,
    padding = "md",
    radius = "medium",
    effect = "none",
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

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${effectClasses[effect]} ${className}`.trim()}
            style={cardStyle}
            data-pixie-card-variant={variant}
            data-pixie-card-color={color || "theme"}
            data-pixie-card-effect={effect}
        >
            {children}
        </Element>
    );
}
