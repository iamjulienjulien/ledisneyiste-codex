import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieInset.module.css";
import type {
    PixieInsetAccentPosition,
    PixieInsetDepth,
    PixieInsetPadding,
    PixieInsetProps,
    PixieInsetRadius,
    PixieInsetStyle,
    PixieInsetTexture,
    PixieInsetTextureIntensity,
    PixieInsetVariant,
} from "./PixieInset.types";

const variantClasses = {
    plain: styles.plain,
    subtle: styles.subtle,
    recessed: styles.recessed,
    groove: styles.groove,
    accent: styles.accent,
    tinted: styles.tinted,
} as const satisfies Record<PixieInsetVariant, string>;

const depthClasses = {
    none: styles.depthNone,
    shallow: styles.depthShallow,
    medium: styles.depthMedium,
    deep: styles.depthDeep,
} as const satisfies Record<PixieInsetDepth, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieInsetPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieInsetRadius, string>;

const accentPositionClasses = {
    top: styles.accentTop,
    end: styles.accentEnd,
    bottom: styles.accentBottom,
    start: styles.accentStart,
} as const satisfies Record<PixieInsetAccentPosition, string>;

const textureClasses = {
    none: styles.textureNone,
    grain: styles.textureGrain,
    grid: styles.textureGrid,
    crosshatch: styles.textureCrosshatch,
} as const satisfies Record<PixieInsetTexture, string>;

const textureIntensityClasses = {
    subtle: styles.textureIntensitySubtle,
    medium: styles.textureIntensityMedium,
    strong: styles.textureIntensityStrong,
} as const satisfies Record<PixieInsetTextureIntensity, string>;

export function PixieInset({
    as: Element = "div",
    variant = "recessed",
    depth = "medium",
    padding = "md",
    radius = "medium",
    color = false,
    accentPosition = "start",
    texture = "none",
    textureIntensity = "medium",
    className = "",
    style,
    children,
    ...elementProps
}: PixieInsetProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const insetStyle: PixieInsetStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-inset-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${depthClasses[depth]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${accentPositionClasses[accentPosition]} ${textureClasses[texture]} ${textureIntensityClasses[textureIntensity]} ${className}`.trim()}
            style={insetStyle}
            data-pixie-inset-variant={variant}
            data-pixie-inset-depth={depth}
            data-pixie-inset-color={color || "theme"}
            data-pixie-inset-texture={texture}
        >
            <span className={styles.decoration} aria-hidden="true" />
            <div className={styles.content} data-pixie-inset-slot="content">
                {children}
            </div>
        </Element>
    );
}
