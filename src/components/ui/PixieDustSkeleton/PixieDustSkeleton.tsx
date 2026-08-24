import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustSkeleton.module.css";
import type {
    PixieDustSkeletonAnimation,
    PixieDustSkeletonDimension,
    PixieDustSkeletonGap,
    PixieDustSkeletonProps,
    PixieDustSkeletonRadius,
    PixieDustSkeletonStyle,
    PixieDustSkeletonVariant,
} from "./PixieDustSkeleton.types";

const variantClasses = {
    text: styles.text,
    block: styles.block,
    circle: styles.circle,
} as const satisfies Record<PixieDustSkeletonVariant, string>;

const animationClasses = {
    shimmer: styles.shimmer,
    pulse: styles.pulse,
    none: styles.still,
} as const satisfies Record<PixieDustSkeletonAnimation, string>;

const gapClasses = {
    xs: styles.gapXs,
    sm: styles.gapSm,
    md: styles.gapMd,
} as const satisfies Record<PixieDustSkeletonGap, string>;

const radiusClasses = {
    none: styles.radiusNone,
    sm: styles.radiusSm,
    md: styles.radiusMd,
    lg: styles.radiusLg,
    full: styles.radiusFull,
} as const satisfies Record<PixieDustSkeletonRadius, string>;

function toCssDimension(value: PixieDustSkeletonDimension) {
    return typeof value === "number" ? `${value}px` : value;
}

export function PixieDustSkeleton({
    variant = "text",
    animation = "shimmer",
    width,
    height,
    lines = 1,
    lastLineWidth = "62%",
    gap = "sm",
    radius = "sm",
    color = "graphite",
    active = true,
    decorative = true,
    label = "Chargement du contenu",
    className = "",
}: PixieDustSkeletonProps) {
    if (!active) {
        return null;
    }

    const resolvedWidth = width ?? (variant === "circle" ? "3rem" : "100%");
    const resolvedHeight =
        height ??
        (variant === "circle"
            ? resolvedWidth
            : variant === "block"
              ? "8rem"
              : "1em");
    const lineCount = Math.max(1, Math.floor(lines));
    const skeletonStyle: PixieDustSkeletonStyle = {
        "--pixie-skeleton-color": color
            ? getAtelierAnimationColor(color).cssValue
            : "currentColor",
        "--pixie-skeleton-width": toCssDimension(resolvedWidth),
        "--pixie-skeleton-height": toCssDimension(resolvedHeight),
        "--pixie-skeleton-last-line-width": toCssDimension(lastLineWidth),
    };

    return (
        <div
            role={decorative ? undefined : "status"}
            aria-hidden={decorative || undefined}
            className={`${styles.root} ${variantClasses[variant]} ${animationClasses[animation]} ${gapClasses[gap]} ${radiusClasses[radius]} ${className}`.trim()}
            style={skeletonStyle}
        >
            {variant === "text" ? (
                Array.from({ length: lineCount }, (_, index) => (
                    <span
                        key={index}
                        className={`${styles.shape} ${index === lineCount - 1 && lineCount > 1 ? styles.lastLine : ""}`.trim()}
                        aria-hidden="true"
                    />
                ))
            ) : (
                <span className={styles.shape} aria-hidden="true" />
            )}

            {!decorative ? (
                <span className={styles.visuallyHidden}>{label}</span>
            ) : null}
        </div>
    );
}
