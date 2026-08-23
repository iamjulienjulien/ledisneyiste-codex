import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustPanel.module.css";
import type {
    PixieDustPanelPadding,
    PixieDustPanelProps,
    PixieDustPanelRadius,
    PixieDustPanelStyle,
    PixieDustPanelVariant,
} from "./PixieDustPanel.types";

const variantClasses = {
    surface: styles.surface,
    outline: styles.outline,
    accent: styles.accent,
} as const satisfies Record<PixieDustPanelVariant, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixieDustPanelPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixieDustPanelRadius, string>;

export function PixieDustPanel({
    as: Element = "section",
    variant = "surface",
    padding = "lg",
    radius = "medium",
    color = false,
    dividers = false,
    header,
    footer,
    className = "",
    style,
    children,
    ...elementProps
}: PixieDustPanelProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const panelStyle: PixieDustPanelStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-panel-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${dividers ? styles.dividers : ""} ${className}`.trim()}
            style={panelStyle}
            data-pixie-panel-variant={variant}
            data-pixie-panel-color={color || "theme"}
            data-pixie-panel-dividers={dividers ? "true" : "false"}
        >
            {header != null ? (
                <div className={styles.header} data-pixie-panel-slot="header">
                    {header}
                </div>
            ) : null}

            <div className={styles.body} data-pixie-panel-slot="body">
                {children}
            </div>

            {footer != null ? (
                <div className={styles.footer} data-pixie-panel-slot="footer">
                    {footer}
                </div>
            ) : null}
        </Element>
    );
}
