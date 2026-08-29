import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustLoader.module.css";
import type {
    PixieDustLoaderDirection,
    PixieDustLoaderIntensity,
    PixieDustLoaderLabelPosition,
    PixieDustLoaderLayout,
    PixieDustLoaderMotion,
    PixieDustLoaderParticleStyle,
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
    iris: styles.iris,
    cel: styles.cel,
    flipbook: styles.flipbook,
    filmstrip: styles.filmstrip,
    orbit: styles.orbitVariant,
    dots: styles.dotsVariant,
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

const labelPositionClasses = {
    before: styles.labelBefore,
    after: styles.labelAfter,
} as const satisfies Record<PixieDustLoaderLabelPosition, string>;

const intensityClasses = {
    subtle: styles.subtle,
    normal: styles.normalIntensity,
    strong: styles.strong,
} as const satisfies Record<PixieDustLoaderIntensity, string>;

const motionClasses = {
    expressive: "",
    gentle: styles.gentle,
    static: styles.static,
} as const satisfies Record<PixieDustLoaderMotion, string>;

const directionClasses = {
    forward: styles.forward,
    reverse: styles.reverse,
} as const satisfies Record<PixieDustLoaderDirection, string>;

const FAIRY_DUST_COUNT = 16;

function getParticleStyle(index: number): PixieDustLoaderParticleStyle {
    const distance = 0.26 + (index % 4) * 0.055;
    const size = 0.026 + (index % 3) * 0.018;

    return {
        "--particle-angle": `${index * (360 / FAIRY_DUST_COUNT)}deg`,
        "--particle-delay": `${index * 85}ms`,
        "--particle-distance": `calc(var(--pixie-loader-size) * ${distance})`,
        "--particle-size": `max(1px, calc(var(--pixie-loader-size) * ${size}))`,
    };
}

function resolveColor(color: PixieDustLoaderProps["color"], fallback: string) {
    return color ? getAtelierAnimationColor(color).cssValue : fallback;
}

function FairyDust() {
    return (
        <span className={styles.fairyDust}>
            {Array.from({ length: FAIRY_DUST_COUNT }, (_, index) => (
                <span
                    key={index}
                    className={styles.particle}
                    style={getParticleStyle(index)}
                />
            ))}
        </span>
    );
}

function CelLayers() {
    return (
        <span className={styles.celStack}>
            {Array.from({ length: 3 }, (_, index) => (
                <span key={index} className={styles.celLayer} />
            ))}
        </span>
    );
}

function FlipbookPages() {
    return (
        <span className={styles.flipbookStack}>
            {Array.from({ length: 4 }, (_, index) => (
                <span key={index} className={styles.flipbookPage} />
            ))}
        </span>
    );
}

function FilmstripFrames() {
    return (
        <span className={styles.filmstripWindow}>
            <span className={styles.filmstripTrack}>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={styles.filmFrame} />
                ))}
            </span>
        </span>
    );
}

function Dots() {
    return (
        <span className={styles.dots}>
            {Array.from({ length: 3 }, (_, index) => (
                <span key={index} className={styles.dot} />
            ))}
        </span>
    );
}

export function PixieDustLoader({
    label = "Chargement en cours",
    description,
    labelHidden = false,
    variant = "sparkle",
    size = "md",
    speed = "normal",
    duration,
    layout = "stacked",
    labelPosition = "after",
    intensity = "normal",
    motion = "expressive",
    direction = "forward",
    color = "ambre-projecteur",
    secondaryColor = false,
    active = true,
    reserveSpace = false,
    delay = 0,
    decorative = false,
    ariaLive = "polite",
    ariaAtomic = true,
    ariaControls,
    className = "",
}: PixieDustLoaderProps) {
    if (!active && !reserveSpace) {
        return null;
    }

    const loaderStyle: PixieDustLoaderStyle = {
        "--pixie-loader-color": resolveColor(color, "currentColor"),
        "--pixie-loader-secondary-color": resolveColor(
            secondaryColor,
            "currentColor",
        ),
        "--pixie-loader-size-custom":
            typeof size === "number" ? `${Math.max(8, size)}px` : undefined,
        "--pixie-loader-duration-custom":
            duration === undefined ? undefined : `${Math.max(250, duration)}ms`,
        "--pixie-loader-delay": `${Math.max(0, delay)}ms`,
    };
    const sizeClass = typeof size === "number" ? "" : sizeClasses[size];
    const isInformative = active && !decorative;

    return (
        <span
            role={isInformative ? "status" : undefined}
            aria-live={isInformative ? ariaLive : undefined}
            aria-atomic={isInformative ? ariaAtomic : undefined}
            aria-controls={isInformative ? ariaControls : undefined}
            aria-hidden={!active || decorative || undefined}
            className={`${styles.root} ${variantClasses[variant]} ${sizeClass} ${speedClasses[speed]} ${layoutClasses[layout]} ${labelPositionClasses[labelPosition]} ${intensityClasses[intensity]} ${motionClasses[motion]} ${directionClasses[direction]} ${!active ? styles.inactive : ""} ${className}`.trim()}
            style={loaderStyle}
            data-variant={variant}
            data-motion={motion}
        >
            <span className={styles.visual} aria-hidden="true">
                <span className={styles.halo} />
                <span className={styles.orbit} />
                <span className={styles.secondaryOrbit} />
                <span className={styles.core} />
                <span className={styles.beamRay} />
                {variant === "iris" ? (
                    <span className={styles.irisBlades} />
                ) : null}
                {variant === "cel" ? <CelLayers /> : null}
                {variant === "flipbook" ? <FlipbookPages /> : null}
                {variant === "filmstrip" ? <FilmstripFrames /> : null}
                {variant === "dots" ? <Dots /> : null}
                <FairyDust />
            </span>

            {!decorative ? (
                <span
                    className={`${styles.copy} ${labelHidden ? styles.visuallyHidden : ""}`.trim()}
                >
                    <span className={styles.label}>{label}</span>
                    {description ? (
                        <span className={styles.description}>
                            {description}
                        </span>
                    ) : null}
                </span>
            ) : null}
        </span>
    );
}
