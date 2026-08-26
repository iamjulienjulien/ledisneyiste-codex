import styles from "./PixieCluster.module.css";
import type {
    PixieClusterAlign,
    PixieClusterGap,
    PixieClusterJustify,
    PixieClusterProps,
} from "./PixieCluster.types";

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieClusterGap, string>;

const justifyClasses = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
} as const satisfies Record<PixieClusterJustify, string>;

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    baseline: styles.alignBaseline,
} as const satisfies Record<PixieClusterAlign, string>;

export function PixieCluster({
    as: Element = "div",
    gap = "sm",
    justify = "start",
    align = "center",
    className = "",
    children,
    ...elementProps
}: PixieClusterProps) {
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
