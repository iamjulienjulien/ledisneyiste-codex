import styles from "./FocaleViewport.module.css";
import type {
    FocaleViewportHeight,
    FocaleViewportOverflow,
    FocaleViewportProps,
    FocaleViewportStyle,
} from "./FocaleViewport.types";

const overflowClasses = {
    auto: styles.overflowAuto,
    clip: styles.overflowClip,
} as const satisfies Record<FocaleViewportOverflow, string>;

const heightClasses = {
    none: styles.heightNone,
    sm: styles.heightSmall,
    md: styles.heightMedium,
    lg: styles.heightLarge,
} as const satisfies Record<FocaleViewportHeight, string>;

export function FocaleViewport({
    label,
    description,
    children,
    overflow = "auto",
    maxHeight = "none",
    minWidth,
    className = "",
    style,
    ...elementProps
}: FocaleViewportProps) {
    const viewportStyle: FocaleViewportStyle = {
        ...style,
        ...(minWidth ? { "--focale-viewport-min-width": minWidth } : undefined),
    };

    return (
        <figure
            {...elementProps}
            className={`${styles.root} ${className}`.trim()}
            style={viewportStyle}
            data-focale-viewport={overflow}
        >
            <div
                className={`${styles.viewport} ${overflowClasses[overflow]} ${heightClasses[maxHeight]}`.trim()}
                role="group"
                aria-label={label}
                tabIndex={overflow === "auto" ? 0 : undefined}
            >
                <div className={styles.content}>{children}</div>
            </div>
            {description ? (
                <figcaption className={styles.caption}>
                    {description}
                </figcaption>
            ) : null}
        </figure>
    );
}
