import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustFrame.module.css";
import type {
    PixieDustFrameAspect,
    PixieDustFrameFit,
    PixieDustFramePadding,
    PixieDustFramePosition,
    PixieDustFrameProps,
    PixieDustFrameRadius,
    PixieDustFrameStyle,
    PixieDustFrameVariant,
} from "./PixieDustFrame.types";

const variantClasses = {
    plain: styles.plain,
    outline: styles.outline,
    mount: styles.mount,
    film: styles.film,
} as const satisfies Record<PixieDustFrameVariant, string>;

const aspectClasses = {
    auto: styles.aspectAuto,
    square: styles.aspectSquare,
    portrait: styles.aspectPortrait,
    landscape: styles.aspectLandscape,
    cinema: styles.aspectCinema,
} as const satisfies Record<PixieDustFrameAspect, string>;

const fitClasses = {
    cover: styles.fitCover,
    contain: styles.fitContain,
} as const satisfies Record<PixieDustFrameFit, string>;

const positionClasses = {
    center: styles.positionCenter,
    top: styles.positionTop,
    bottom: styles.positionBottom,
    left: styles.positionLeft,
    right: styles.positionRight,
} as const satisfies Record<PixieDustFramePosition, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieDustFramePadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustFrameRadius, string>;

export function PixieDustFrame({
    as: Element = "figure",
    variant = "plain",
    aspect = "auto",
    fit = "cover",
    position = "center",
    padding = "none",
    radius = "medium",
    color = false,
    caption,
    captionPosition = "outside",
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustFrameProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const frameStyle: PixieDustFrameStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-frame-color": colorDefinition.cssValue }
            : {}),
    };
    const CaptionElement = Element === "figure" ? "figcaption" : "div";

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${className}`.trim()}
            style={frameStyle}
            data-pixie-frame-variant={variant}
            data-pixie-frame-color={color || "theme"}
            data-pixie-frame-caption={
                caption != null ? captionPosition : "none"
            }
        >
            <div className={styles.stage}>
                <div
                    className={`${styles.media} ${aspectClasses[aspect]} ${fitClasses[fit]} ${positionClasses[position]}`}
                    data-pixie-frame-slot="media"
                >
                    {children}
                </div>
            </div>

            {caption != null ? (
                <CaptionElement
                    className={
                        captionPosition === "overlay"
                            ? styles.captionOverlay
                            : styles.captionOutside
                    }
                    data-pixie-frame-slot="caption"
                >
                    {caption}
                </CaptionElement>
            ) : null}
        </Element>
    );
}
