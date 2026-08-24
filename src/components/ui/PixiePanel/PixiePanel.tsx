import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixiePanel.module.css";
import type {
    PixiePanelAccentPosition,
    PixiePanelDividers,
    PixiePanelElevation,
    PixiePanelPadding,
    PixiePanelProps,
    PixiePanelRadius,
    PixiePanelScroll,
    PixiePanelStyle,
    PixiePanelVariant,
} from "./PixiePanel.types";

const variantClasses = {
    plain: styles.plain,
    surface: styles.surface,
    muted: styles.muted,
    outline: styles.outline,
    accent: styles.accent,
    tinted: styles.tinted,
} as const satisfies Record<PixiePanelVariant, string>;

const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
    xl: styles.paddingExtraLarge,
} as const satisfies Record<PixiePanelPadding, string>;

const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
} as const satisfies Record<PixiePanelRadius, string>;

const accentPositionClasses = {
    top: styles.accentTop,
    end: styles.accentEnd,
    bottom: styles.accentBottom,
    start: styles.accentStart,
} as const satisfies Record<PixiePanelAccentPosition, string>;

const elevationClasses = {
    none: styles.elevationNone,
    soft: styles.elevationSoft,
    strong: styles.elevationStrong,
} as const satisfies Record<PixiePanelElevation, string>;

const dividerClasses = {
    none: "",
    header: styles.dividerHeader,
    footer: styles.dividerFooter,
    both: styles.dividersBoth,
} as const satisfies Record<PixiePanelDividers, string>;

const scrollClasses = {
    none: "",
    body: styles.scrollBody,
} as const satisfies Record<PixiePanelScroll, string>;

export function PixiePanel({
    as: Element = "section",
    variant = "surface",
    padding = "lg",
    headerPadding,
    bodyPadding,
    footerPadding,
    radius = "medium",
    color = false,
    accentPosition = "start",
    elevation = "none",
    dividers = "none",
    scroll = "none",
    maxHeight,
    header,
    footer,
    className = "",
    style,
    children,
    ...elementProps
}: PixiePanelProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const panelStyle: PixiePanelStyle = {
        ...style,
        ...(maxHeight != null ? { maxHeight } : {}),
        ...(colorDefinition
            ? { "--pixie-panel-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${variantClasses[variant]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${accentPositionClasses[accentPosition]} ${elevationClasses[elevation]} ${dividerClasses[dividers]} ${scrollClasses[scroll]} ${className}`.trim()}
            style={panelStyle}
            data-pixie-panel-variant={variant}
            data-pixie-panel-color={color || "theme"}
            data-pixie-panel-accent-position={accentPosition}
            data-pixie-panel-elevation={elevation}
            data-pixie-panel-dividers={dividers}
            data-pixie-panel-scroll={scroll}
        >
            {header != null ? (
                <header
                    className={`${styles.header} ${headerPadding ? paddingClasses[headerPadding] : ""}`.trim()}
                    data-pixie-panel-slot="header"
                >
                    {header}
                </header>
            ) : null}

            <div
                className={`${styles.body} ${bodyPadding ? paddingClasses[bodyPadding] : ""}`.trim()}
                data-pixie-panel-slot="body"
            >
                {children}
            </div>

            {footer != null ? (
                <footer
                    className={`${styles.footer} ${footerPadding ? paddingClasses[footerPadding] : ""}`.trim()}
                    data-pixie-panel-slot="footer"
                >
                    {footer}
                </footer>
            ) : null}
        </Element>
    );
}
