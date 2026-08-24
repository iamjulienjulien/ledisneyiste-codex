import type { CSSProperties } from "react";
import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustLoader.module.css";
import type {
    PixieDustLoaderLayout,
    PixieDustLoaderProps,
    PixieDustLoaderSize,
    PixieDustLoaderSpeed,
    PixieDustLoaderStyle,
    PixieDustLoaderVariant,
} from "./PixieDustLoader.types";

const variantClasses = {
    sparkle: styles.sparkle,
    reel: styles.reel,
    beam: styles.beam,
} as const satisfies Record<PixieDustLoaderVariant, string>;

const sizeClasses = {
    xs: styles.xs,
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
    xl: styles.xl,
} as const satisfies Record<PixieDustLoaderSize, string>;

const speedClasses = {
    slow: styles.slow,
    normal: styles.normal,
    fast: styles.fast,
} as const satisfies Record<PixieDustLoaderSpeed, string>;

const layoutClasses = {
    inline: styles.inline,
    stacked: styles.stacked,
} as const satisfies Record<PixieDustLoaderLayout, string>;

export function PixieDustLoader({
    label = "Chargement en cours",
    labelHidden = false,
    variant = "sparkle",
    size = "md",
    speed = "normal",
    layout = "stacked",
    color = "ambre-projecteur",
    active = true,
    delay = 0,
    decorative = false,
    className = "",
}: PixieDustLoaderProps) {
    if (!active) {
        return null;
    }

    const loaderStyle: PixieDustLoaderStyle = {
        "--pixie-loader-color": color
            ? getAtelierAnimationColor(color).cssValue
            : "currentColor",
        "--pixie-loader-delay": `${Math.max(0, delay)}ms`,
    };

    return (
        <div
            role={decorative ? undefined : "status"}
            aria-hidden={decorative || undefined}
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${speedClasses[speed]} ${layoutClasses[layout]} ${className}`.trim()}
            style={loaderStyle}
        >
            <span className={styles.visual} aria-hidden="true">
                <span className={styles.halo} />
                <span className={styles.orbit} />
                <span className={styles.core} />
                <span className={styles.beamRay} />
                {Array.from({ length: 8 }, (_, index) => (
                    <span
                        key={index}
                        className={styles.particle}
                        style={
                            {
                                "--particle-angle": `${index * 45}deg`,
                                "--particle-delay": `${index * 140}ms`,
                            } as CSSProperties
                        }
                    />
                ))}
            </span>

            {!decorative ? (
                <span
                    className={
                        labelHidden ? styles.visuallyHidden : styles.label
                    }
                >
                    {label}
                </span>
            ) : null}
        </div>
    );
}
