import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieBackdrop.module.css";
import type {
    PixieBackdropBase,
    PixieBackdropDirection,
    PixieBackdropIntensity,
    PixieBackdropMotion,
    PixieBackdropPadding,
    PixieBackdropPosition,
    PixieBackdropProps,
    PixieBackdropRadius,
    PixieBackdropSpread,
    PixieBackdropStyle,
    PixieBackdropTexture,
    PixieBackdropTextureIntensity,
    PixieBackdropVariant,
} from "./PixieBackdrop.types";

const variantClasses = {
    wash: styles.wash,
    gradient: styles.gradient,
    halo: styles.halo,
    vignette: styles.vignette,
    projector: styles.projector,
    horizon: styles.horizon,
    split: styles.split,
    cel: styles.cel,
} as const satisfies Record<PixieBackdropVariant, string>;

const intensityClasses = {
    subtle: styles.intensitySubtle,
    medium: styles.intensityMedium,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieBackdropIntensity, string>;

const positionClasses = {
    "top-start": styles.positionTopStart,
    top: styles.positionTop,
    "top-end": styles.positionTopEnd,
    start: styles.positionStart,
    center: styles.positionCenter,
    end: styles.positionEnd,
    "bottom-start": styles.positionBottomStart,
    bottom: styles.positionBottom,
    "bottom-end": styles.positionBottomEnd,
} as const satisfies Record<PixieBackdropPosition, string>;

const directionClasses = {
    horizontal: styles.directionHorizontal,
    vertical: styles.directionVertical,
    "diagonal-up": styles.directionDiagonalUp,
    "diagonal-down": styles.directionDiagonalDown,
} as const satisfies Record<PixieBackdropDirection, string>;

const spreadClasses = {
    narrow: styles.spreadNarrow,
    medium: styles.spreadMedium,
    wide: styles.spreadWide,
} as const satisfies Record<PixieBackdropSpread, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieBackdropPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieBackdropRadius, string>;

const baseClasses = {
    transparent: styles.baseTransparent,
    canvas: styles.baseCanvas,
    surface: styles.baseSurface,
    muted: styles.baseMuted,
} as const satisfies Record<PixieBackdropBase, string>;

const textureClasses = {
    none: styles.textureNone,
    grain: styles.textureGrain,
    dust: styles.textureDust,
    paper: styles.texturePaper,
} as const satisfies Record<PixieBackdropTexture, string>;

const textureIntensityClasses = {
    subtle: styles.textureIntensitySubtle,
    medium: styles.textureIntensityMedium,
    strong: styles.textureIntensityStrong,
} as const satisfies Record<PixieBackdropTextureIntensity, string>;

const motionClasses = {
    none: styles.motionNone,
    drift: styles.motionDrift,
    breathe: styles.motionBreathe,
} as const satisfies Record<PixieBackdropMotion, string>;

export function PixieBackdrop({
    as: Element = "div",
    variant = "wash",
    intensity = "medium",
    position = "center",
    direction = "horizontal",
    spread = "medium",
    padding = "lg",
    radius = "none",
    color = false,
    secondaryColor = false,
    base = "surface",
    texture = "none",
    textureIntensity = "medium",
    motion = "none",
    className = "",
    style,
    children,
    ...elementProps
}: PixieBackdropProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const secondaryColorDefinition = secondaryColor
        ? getAtelierAnimationColor(secondaryColor)
        : null;
    const backdropStyle: PixieBackdropStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-backdrop-color": colorDefinition.cssValue }
            : {}),
        ...(secondaryColorDefinition
            ? {
                  "--pixie-backdrop-secondary-color":
                      secondaryColorDefinition.cssValue,
              }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${intensityClasses[intensity]} ${positionClasses[position]} ${directionClasses[direction]} ${spreadClasses[spread]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${baseClasses[base]} ${textureClasses[texture]} ${textureIntensityClasses[textureIntensity]} ${motionClasses[motion]} ${className}`.trim()}
            style={backdropStyle}
            data-pixie-backdrop-variant={variant}
            data-pixie-backdrop-intensity={intensity}
            data-pixie-backdrop-position={position}
            data-pixie-backdrop-direction={direction}
            data-pixie-backdrop-spread={spread}
            data-pixie-backdrop-color={color || "theme"}
            data-pixie-backdrop-secondary-color={secondaryColor || "derived"}
            data-pixie-backdrop-base={base}
            data-pixie-backdrop-texture={texture}
            data-pixie-backdrop-motion={motion}
        >
            <span className={styles.atmosphere} aria-hidden="true">
                <span className={styles.primaryLayer} />
                <span className={styles.secondaryLayer} />
                <span className={styles.textureLayer} />
            </span>
            <div className={styles.content}>{children}</div>
        </Element>
    );
}
