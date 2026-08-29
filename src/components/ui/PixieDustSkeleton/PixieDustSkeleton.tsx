import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustSkeleton.module.css";
import type {
    PixieDustSkeletonAnimation,
    PixieDustSkeletonDimension,
    PixieDustSkeletonIntensity,
    PixieDustSkeletonLineStyle,
    PixieDustSkeletonProps,
    PixieDustSkeletonRadius,
    PixieDustSkeletonSize,
    PixieDustSkeletonSpeed,
    PixieDustSkeletonStyle,
    PixieDustSkeletonVariant,
} from "./PixieDustSkeleton.types";

const variantClasses = {
    text: styles.text,
    block: styles.block,
    circle: styles.circle,
    media: styles.media,
    control: styles.control,
    pill: styles.pill,
} as const satisfies Record<PixieDustSkeletonVariant, string>;

const animationClasses = {
    shimmer: styles.shimmer,
    pulse: styles.pulse,
    beam: styles.beam,
    develop: styles.develop,
    grain: styles.grain,
    none: styles.still,
} as const satisfies Record<PixieDustSkeletonAnimation, string>;

const radiusClasses = {
    none: styles.radiusNone,
    sm: styles.radiusSm,
    md: styles.radiusMd,
    lg: styles.radiusLg,
    full: styles.radiusFull,
} as const satisfies Record<PixieDustSkeletonRadius, string>;

const intensityClasses = {
    subtle: styles.intensitySubtle,
    normal: styles.intensityNormal,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieDustSkeletonIntensity, string>;

const speedDurations = {
    slow: 2800,
    normal: 1900,
    fast: 1100,
} as const satisfies Record<PixieDustSkeletonSpeed, number>;

const sizeHeights = {
    xs: "0.5rem",
    sm: "0.625rem",
    md: "0.875rem",
    lg: "1.125rem",
    xl: "1.5rem",
} as const satisfies Record<PixieDustSkeletonSize, string>;

const circleSizes = {
    xs: "1.5rem",
    sm: "2rem",
    md: "3rem",
    lg: "4rem",
    xl: "6rem",
} as const satisfies Record<PixieDustSkeletonSize, string>;

const controlHeights = {
    xs: "2rem",
    sm: "2.25rem",
    md: "2.75rem",
    lg: "3.25rem",
    xl: "3.75rem",
} as const satisfies Record<PixieDustSkeletonSize, string>;

function toCssDimension(value: PixieDustSkeletonDimension) {
    return typeof value === "number" ? `${value}px` : value;
}

function toCssRatio(value: PixieDustSkeletonDimension) {
    return String(value);
}

function resolveDefaultWidth(
    variant: PixieDustSkeletonVariant,
    size: PixieDustSkeletonSize,
) {
    if (variant === "circle") return circleSizes[size];
    if (variant === "pill") return size === "xl" ? "8rem" : "5rem";
    return "100%";
}

function resolveDefaultHeight(
    variant: PixieDustSkeletonVariant,
    size: PixieDustSkeletonSize,
    width: PixieDustSkeletonDimension,
) {
    if (variant === "circle") return width;
    if (variant === "block") return "8rem";
    if (variant === "media") return "auto";
    if (variant === "control" || variant === "pill") {
        return controlHeights[size];
    }
    return sizeHeights[size];
}

export function PixieDustSkeleton({
    variant = "text",
    animation = "shimmer",
    size = "md",
    width,
    height,
    aspectRatio = "16 / 9",
    lines = 1,
    lineWidths,
    lineHeight,
    lastLineWidth = "62%",
    gap = "sm",
    radius = "sm",
    color = "graphite",
    highlightColor = false,
    intensity = "normal",
    speed = "normal",
    duration,
    delay = 0,
    direction = "forward",
    active = true,
    reserveSpace = false,
    decorative = true,
    label = "Chargement du contenu",
    ariaLive = "polite",
    ariaControls,
    className = "",
}: PixieDustSkeletonProps) {
    if (!active && !reserveSpace) return null;

    const resolvedWidth = width ?? resolveDefaultWidth(variant, size);
    const resolvedHeight =
        lineHeight ??
        height ??
        resolveDefaultHeight(variant, size, resolvedWidth);
    const resolvedLineWidths = lineWidths?.length ? lineWidths : undefined;
    const lineCount = resolvedLineWidths
        ? resolvedLineWidths.length
        : Math.max(1, Math.floor(lines));
    const informative = active && !decorative;
    const skeletonStyle: PixieDustSkeletonStyle = {
        "--pixie-skeleton-color": color
            ? getAtelierAnimationColor(color).cssValue
            : "currentColor",
        "--pixie-skeleton-highlight-color": highlightColor
            ? getAtelierAnimationColor(highlightColor).cssValue
            : "currentColor",
        "--pixie-skeleton-width": toCssDimension(resolvedWidth),
        "--pixie-skeleton-height": toCssDimension(resolvedHeight),
        "--pixie-skeleton-aspect-ratio": toCssRatio(aspectRatio),
        "--pixie-skeleton-gap":
            typeof gap === "number"
                ? `${Math.max(0, gap)}px`
                : `var(--pixie-skeleton-gap-${gap})`,
        "--pixie-skeleton-duration": `${Math.max(0, duration ?? speedDurations[speed])}ms`,
        "--pixie-skeleton-delay": `${Math.max(0, delay)}ms`,
        "--pixie-skeleton-direction":
            direction === "reverse" ? "reverse" : "normal",
    };

    return (
        <div
            role={informative ? "status" : undefined}
            aria-live={informative ? ariaLive : undefined}
            aria-controls={informative ? ariaControls : undefined}
            aria-hidden={!active || decorative || undefined}
            className={`${styles.root} ${variantClasses[variant]} ${animationClasses[animation]} ${radiusClasses[radius]} ${intensityClasses[intensity]} ${!active ? styles.reserved : ""} ${className}`.trim()}
            style={skeletonStyle}
        >
            {variant === "text" ? (
                Array.from({ length: lineCount }, (_, index) => {
                    const lineWidth =
                        resolvedLineWidths?.[index] ??
                        (index === lineCount - 1 && lineCount > 1
                            ? lastLineWidth
                            : "100%");
                    const lineStyle: PixieDustSkeletonLineStyle = {
                        "--pixie-skeleton-line-width":
                            toCssDimension(lineWidth),
                    };

                    return (
                        <span
                            key={`${lineWidth}-${index}`}
                            className={styles.shape}
                            style={lineStyle}
                            aria-hidden="true"
                        />
                    );
                })
            ) : (
                <span className={styles.shape} aria-hidden="true" />
            )}

            {informative ? (
                <span className={styles.visuallyHidden}>{label}</span>
            ) : null}
        </div>
    );
}
