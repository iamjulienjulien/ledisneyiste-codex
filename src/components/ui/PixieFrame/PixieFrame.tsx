import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieFrame.module.css";
import type {
    PixieFrameAspect,
    PixieFrameCaptionAlign,
    PixieFrameEffect,
    PixieFrameElevation,
    PixieFrameFit,
    PixieFrameIntensity,
    PixieFrameOverlayPosition,
    PixieFramePadding,
    PixieFramePosition,
    PixieFrameProps,
    PixieFrameRadius,
    PixieFrameStyle,
    PixieFrameTreatment,
    PixieFrameVariant,
} from "./PixieFrame.types";

const variantClasses = {
    plain: styles.plain,
    outline: styles.outline,
    mount: styles.mount,
    film: styles.film,
    slide: styles.slide,
    cel: styles.cel,
} as const satisfies Record<PixieFrameVariant, string>;

const aspectClasses = {
    auto: styles.aspectAuto,
    square: styles.aspectSquare,
    poster: styles.aspectPoster,
    portrait: styles.aspectPortrait,
    landscape: styles.aspectLandscape,
    wide: styles.aspectWide,
    cinema: styles.aspectCinema,
    scope: styles.aspectScope,
} as const satisfies Record<PixieFrameAspect, string>;

const fitClasses = {
    cover: styles.fitCover,
    contain: styles.fitContain,
    fill: styles.fitFill,
    none: styles.fitNone,
    "scale-down": styles.fitScaleDown,
} as const satisfies Record<PixieFrameFit, string>;

const positionClasses = {
    center: styles.positionCenter,
    top: styles.positionTop,
    bottom: styles.positionBottom,
    left: styles.positionLeft,
    right: styles.positionRight,
    "top-start": styles.positionTopStart,
    "top-end": styles.positionTopEnd,
    "bottom-start": styles.positionBottomStart,
    "bottom-end": styles.positionBottomEnd,
} as const satisfies Record<PixieFramePosition, string>;

const paddingClasses = {
    none: styles.paddingNone,
    xs: styles.paddingExtraSmall,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieFramePadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieFrameRadius, string>;

const mediaRadiusClasses = {
    none: styles.mediaRadiusNone,
    small: styles.mediaRadiusSmall,
    medium: styles.mediaRadiusMedium,
    large: styles.mediaRadiusLarge,
} as const satisfies Record<PixieFrameRadius, string>;

const elevationClasses = {
    none: styles.elevationNone,
    soft: styles.elevationSoft,
    strong: styles.elevationStrong,
} as const satisfies Record<PixieFrameElevation, string>;

const treatmentClasses = {
    original: styles.treatmentOriginal,
    monochrome: styles.treatmentMonochrome,
    sepia: styles.treatmentSepia,
} as const satisfies Record<PixieFrameTreatment, string>;

const effectClasses = {
    none: "",
    grain: styles.effectGrain,
    vignette: styles.effectVignette,
    "light-leak": styles.effectLightLeak,
    projector: styles.effectProjector,
} as const satisfies Record<PixieFrameEffect, string>;

const intensityClasses = {
    subtle: styles.intensitySubtle,
    medium: styles.intensityMedium,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieFrameIntensity, string>;

const overlayPositionClasses = {
    "top-start": styles.overlayTopStart,
    "top-end": styles.overlayTopEnd,
    center: styles.overlayCenter,
    "bottom-start": styles.overlayBottomStart,
    "bottom-end": styles.overlayBottomEnd,
} as const satisfies Record<PixieFrameOverlayPosition, string>;

const captionAlignClasses = {
    start: styles.captionAlignStart,
    center: styles.captionAlignCenter,
    end: styles.captionAlignEnd,
} as const satisfies Record<PixieFrameCaptionAlign, string>;

function clampPercentage(value: number) {
    return Math.min(100, Math.max(0, value));
}

export function PixieFrame({
    as: Element = "figure",
    variant = "plain",
    aspect = "auto",
    customAspect,
    fit = "cover",
    position = "center",
    focalPoint,
    padding = "none",
    radius = "medium",
    mediaRadius,
    color = false,
    elevation = "none",
    treatment = "original",
    effect = "none",
    intensity = "subtle",
    overlay,
    overlayPosition = "bottom-end",
    caption,
    captionPosition = "outside",
    captionAlign = "start",
    className = "",
    style,
    children,
    ...elementProps
}: PixieFrameProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const frameStyle: PixieFrameStyle = {
        ...style,
        ...(customAspect != null
            ? { "--pixie-frame-aspect": customAspect }
            : {}),
        ...(focalPoint
            ? {
                  "--pixie-frame-position": `${clampPercentage(focalPoint.x)}% ${clampPercentage(focalPoint.y)}%`,
              }
            : {}),
        ...(colorDefinition
            ? { "--pixie-frame-color": colorDefinition.cssValue }
            : {}),
    };
    const CaptionElement = Element === "figure" ? "figcaption" : "div";

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${mediaRadius ? mediaRadiusClasses[mediaRadius] : ""} ${elevationClasses[elevation]} ${className}`.trim()}
            style={frameStyle}
            data-pixie-frame-variant={variant}
            data-pixie-frame-color={color || "theme"}
            data-pixie-frame-aspect={customAspect != null ? "custom" : aspect}
            data-pixie-frame-fit={fit}
            data-pixie-frame-position={focalPoint ? "focal-point" : position}
            data-pixie-frame-elevation={elevation}
            data-pixie-frame-treatment={treatment}
            data-pixie-frame-effect={effect}
            data-pixie-frame-intensity={intensity}
            data-pixie-frame-caption={
                caption != null ? captionPosition : "none"
            }
        >
            <div className={styles.stage}>
                <div
                    className={`${styles.media} ${customAspect != null ? styles.aspectCustom : aspectClasses[aspect]} ${fitClasses[fit]} ${focalPoint ? styles.positionCustom : positionClasses[position]} ${treatmentClasses[treatment]}`}
                    data-pixie-frame-slot="media"
                >
                    {children}
                </div>

                {effect !== "none" ? (
                    <span
                        aria-hidden="true"
                        className={`${styles.effect} ${effectClasses[effect]} ${intensityClasses[intensity]}`}
                        data-pixie-frame-slot="effect"
                    />
                ) : null}

                {overlay != null ? (
                    <div
                        className={`${styles.overlay} ${overlayPositionClasses[overlayPosition]}`}
                        data-pixie-frame-slot="overlay"
                    >
                        {overlay}
                    </div>
                ) : null}
            </div>

            {caption != null && captionPosition === "overlay" ? (
                <CaptionElement
                    className={`${styles.captionOverlay} ${captionAlignClasses[captionAlign]}`}
                    data-pixie-frame-slot="caption"
                >
                    {caption}
                </CaptionElement>
            ) : null}

            {caption != null && captionPosition === "outside" ? (
                <CaptionElement
                    className={`${styles.captionOutside} ${captionAlignClasses[captionAlign]}`}
                    data-pixie-frame-slot="caption"
                >
                    {caption}
                </CaptionElement>
            ) : null}
        </Element>
    );
}
