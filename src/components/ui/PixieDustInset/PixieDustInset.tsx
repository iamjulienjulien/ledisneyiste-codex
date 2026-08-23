import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustInset.module.css";
import type {
    PixieDustInsetDepth,
    PixieDustInsetPadding,
    PixieDustInsetProps,
    PixieDustInsetRadius,
    PixieDustInsetStyle,
    PixieDustInsetVariant,
} from "./PixieDustInset.types";

const variantClasses = {
    subtle: styles.subtle,
    recessed: styles.recessed,
    groove: styles.groove,
    accent: styles.accent,
} as const satisfies Record<PixieDustInsetVariant, string>;

const depthClasses = {
    shallow: styles.depthShallow,
    medium: styles.depthMedium,
    deep: styles.depthDeep,
} as const satisfies Record<PixieDustInsetDepth, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieDustInsetPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustInsetRadius, string>;

export function PixieDustInset({
    as: Element = "div",
    variant = "recessed",
    depth = "medium",
    padding = "md",
    radius = "medium",
    color = false,
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustInsetProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const insetStyle: PixieDustInsetStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-inset-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${depthClasses[depth]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${className}`.trim()}
            style={insetStyle}
            data-pixie-inset-variant={variant}
            data-pixie-inset-depth={depth}
            data-pixie-inset-color={color || "theme"}
        >
            {children}
        </Element>
    );
}
