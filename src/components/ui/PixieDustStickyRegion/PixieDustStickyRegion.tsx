import styles from "./PixieDustStickyRegion.module.css";
import type {
    PixieDustStickyRegionEdge,
    PixieDustStickyRegionOffset,
    PixieDustStickyRegionProps,
} from "./PixieDustStickyRegion.types";

const edgeClasses = {
    start: styles.edgeStart,
    end: styles.edgeEnd,
} as const satisfies Record<PixieDustStickyRegionEdge, string>;

const offsetClasses = {
    none: styles.offsetNone,
    xs: styles.offsetExtraSmall,
    sm: styles.offsetSmall,
    md: styles.offsetMedium,
    lg: styles.offsetLarge,
    xl: styles.offsetExtraLarge,
} as const satisfies Record<PixieDustStickyRegionOffset, string>;

export function PixieDustStickyRegion({
    as: Element = "div",
    edge = "start",
    offset = "md",
    className = "",
    children,
    ...elementProps
}: PixieDustStickyRegionProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${edgeClasses[edge]} ${offsetClasses[offset]} ${className}`.trim()}
            data-pixie-sticky-region-edge={edge}
            data-pixie-sticky-region-offset={offset}
        >
            {children}
        </Element>
    );
}
