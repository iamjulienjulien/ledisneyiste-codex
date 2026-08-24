import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustCallout.module.css";
import type {
    PixieDustCalloutAccentPosition,
    PixieDustCalloutDividers,
    PixieDustCalloutEffect,
    PixieDustCalloutEffectIntensity,
    PixieDustCalloutElevation,
    PixieDustCalloutFooterAlign,
    PixieDustCalloutIconAlign,
    PixieDustCalloutLayout,
    PixieDustCalloutPadding,
    PixieDustCalloutProps,
    PixieDustCalloutRadius,
    PixieDustCalloutStyle,
    PixieDustCalloutVariant,
} from "./PixieDustCallout.types";

const variantClasses = {
    plain: styles.plain,
    subtle: styles.subtle,
    outline: styles.outline,
    accent: styles.accent,
    tinted: styles.tinted,
} as const satisfies Record<PixieDustCalloutVariant, string>;

const layoutClasses = {
    stacked: styles.stacked,
    inline: styles.inline,
    header: styles.headerLayout,
} as const satisfies Record<PixieDustCalloutLayout, string>;

const paddingClasses = {
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieDustCalloutPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustCalloutRadius, string>;

const accentPositionClasses = {
    top: styles.accentTop,
    end: styles.accentEnd,
    bottom: styles.accentBottom,
    start: styles.accentStart,
} as const satisfies Record<PixieDustCalloutAccentPosition, string>;

const elevationClasses = {
    none: styles.elevationNone,
    soft: styles.elevationSoft,
    strong: styles.elevationStrong,
} as const satisfies Record<PixieDustCalloutElevation, string>;

const dividerClasses = {
    none: styles.dividersNone,
    header: styles.dividerHeader,
    footer: styles.dividerFooter,
    both: styles.dividersBoth,
} as const satisfies Record<PixieDustCalloutDividers, string>;

const footerAlignClasses = {
    start: styles.footerAlignStart,
    end: styles.footerAlignEnd,
} as const satisfies Record<PixieDustCalloutFooterAlign, string>;

const effectClasses = {
    none: styles.effectNone,
    grain: styles.effectGrain,
    halo: styles.effectHalo,
    projector: styles.effectProjector,
} as const satisfies Record<PixieDustCalloutEffect, string>;

const effectIntensityClasses = {
    subtle: styles.intensitySubtle,
    medium: styles.intensityMedium,
    strong: styles.intensityStrong,
} as const satisfies Record<PixieDustCalloutEffectIntensity, string>;

const iconAlignClasses = {
    start: styles.iconAlignStart,
    center: styles.iconAlignCenter,
} as const satisfies Record<PixieDustCalloutIconAlign, string>;

export function PixieDustCallout({
    as: Element = "aside",
    variant = "subtle",
    layout = "stacked",
    padding = "md",
    radius = "medium",
    color = false,
    accentPosition = "start",
    elevation = "none",
    dividers = "none",
    footerAlign = "start",
    effect = "none",
    effectIntensity = "medium",
    iconAlign = "start",
    icon,
    eyebrow,
    heading,
    footer,
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustCalloutProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const calloutStyle: PixieDustCalloutStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-callout-color": colorDefinition.cssValue }
            : {}),
    };
    const hasHeader = eyebrow != null || heading != null;

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${layoutClasses[layout]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${accentPositionClasses[accentPosition]} ${elevationClasses[elevation]} ${dividerClasses[dividers]} ${effectClasses[effect]} ${effectIntensityClasses[effectIntensity]} ${iconAlignClasses[iconAlign]} ${className}`.trim()}
            style={calloutStyle}
            data-pixie-callout-variant={variant}
            data-pixie-callout-layout={layout}
            data-pixie-callout-color={color || "theme"}
            data-pixie-callout-icon={icon != null ? "true" : "false"}
            data-pixie-callout-header={hasHeader ? "true" : "false"}
            data-pixie-callout-effect={effect}
        >
            <span className={styles.decoration} aria-hidden="true" />

            {icon != null ? (
                <div className={styles.icon} data-pixie-callout-slot="icon">
                    {icon}
                </div>
            ) : null}

            <div className={styles.content}>
                {hasHeader ? (
                    <div
                        className={styles.header}
                        data-pixie-callout-slot="header"
                    >
                        {eyebrow != null ? (
                            <div className={styles.eyebrow}>{eyebrow}</div>
                        ) : null}
                        {heading != null ? (
                            <div className={styles.heading}>{heading}</div>
                        ) : null}
                    </div>
                ) : null}

                <div className={styles.body} data-pixie-callout-slot="body">
                    {children}
                </div>

                {footer != null ? (
                    <div
                        className={`${styles.footer} ${footerAlignClasses[footerAlign]}`}
                        data-pixie-callout-slot="footer"
                    >
                        {footer}
                    </div>
                ) : null}
            </div>
        </Element>
    );
}
