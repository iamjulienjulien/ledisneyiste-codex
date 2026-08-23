import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustBackdrop.module.css";
import type {
    PixieDustBackdropIntensity,
    PixieDustBackdropPadding,
    PixieDustBackdropPosition,
    PixieDustBackdropProps,
    PixieDustBackdropRadius,
    PixieDustBackdropStyle,
    PixieDustBackdropVariant,
} from "./PixieDustBackdrop.types";

const variantClasses = {
    wash: styles.wash,
    gradient: styles.gradient,
    halo: styles.halo,
    vignette: styles.vignette,
    projector: styles.projector,
} as const satisfies Record<PixieDustBackdropVariant, string>;

const intensityClasses = {
    subtle: styles.intensitySubtle,
    medium: styles.intensityMedium,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieDustBackdropIntensity, string>;

const positionClasses = {
    start: styles.positionStart,
    center: styles.positionCenter,
    end: styles.positionEnd,
} as const satisfies Record<PixieDustBackdropPosition, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieDustBackdropPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustBackdropRadius, string>;

export function PixieDustBackdrop({
    as: Element = "div",
    variant = "wash",
    intensity = "medium",
    position = "center",
    padding = "lg",
    radius = "none",
    color = false,
    grain = false,
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustBackdropProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const backdropStyle: PixieDustBackdropStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-backdrop-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${intensityClasses[intensity]} ${positionClasses[position]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${grain ? styles.grain : ""} ${className}`.trim()}
            style={backdropStyle}
            data-pixie-backdrop-variant={variant}
            data-pixie-backdrop-intensity={intensity}
            data-pixie-backdrop-position={position}
            data-pixie-backdrop-color={color || "theme"}
            data-pixie-backdrop-grain={grain ? "true" : "false"}
        >
            {children}
        </Element>
    );
}
