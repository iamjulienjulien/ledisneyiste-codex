import styles from "./PixieDustCluster.module.css";
import type {
    PixieDustClusterAlign,
    PixieDustClusterGap,
    PixieDustClusterJustify,
    PixieDustClusterProps,
} from "./PixieDustCluster.types";

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustClusterGap, string>;

const justifyClasses = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
} as const satisfies Record<PixieDustClusterJustify, string>;

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    baseline: styles.alignBaseline,
} as const satisfies Record<PixieDustClusterAlign, string>;

export function PixieDustCluster({
    as: Element = "div",
    gap = "sm",
    justify = "start",
    align = "center",
    className = "",
    children,
    ...elementProps
}: PixieDustClusterProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${gapClasses[gap]} ${justifyClasses[justify]} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-cluster-gap={gap}
            data-pixie-cluster-justify={justify}
            data-pixie-cluster-align={align}
        >
            {children}
        </Element>
    );
}
