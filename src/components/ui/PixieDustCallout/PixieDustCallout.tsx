import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustCallout.module.css";
import type {
    PixieDustCalloutLayout,
    PixieDustCalloutPadding,
    PixieDustCalloutProps,
    PixieDustCalloutRadius,
    PixieDustCalloutStyle,
    PixieDustCalloutVariant,
} from "./PixieDustCallout.types";

const variantClasses = {
    subtle: styles.subtle,
    outline: styles.outline,
    accent: styles.accent,
    spotlight: styles.spotlight,
} as const satisfies Record<PixieDustCalloutVariant, string>;

const layoutClasses = {
    stacked: styles.stacked,
    inline: styles.inline,
} as const satisfies Record<PixieDustCalloutLayout, string>;

const paddingClasses = {
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
} as const satisfies Record<PixieDustCalloutPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustCalloutRadius, string>;

export function PixieDustCallout({
    as: Element = "aside",
    variant = "subtle",
    layout = "stacked",
    padding = "md",
    radius = "medium",
    color = false,
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
            className={`${styles.root} ${variantClasses[variant]} ${layoutClasses[layout]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${className}`.trim()}
            style={calloutStyle}
            data-pixie-callout-variant={variant}
            data-pixie-callout-layout={layout}
            data-pixie-callout-color={color || "theme"}
            data-pixie-callout-icon={icon != null ? "true" : "false"}
        >
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
                        className={styles.footer}
                        data-pixie-callout-slot="footer"
                    >
                        {footer}
                    </div>
                ) : null}
            </div>
        </Element>
    );
}
