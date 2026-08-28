import styles from "./PixieStickyRegion.module.css";
import type { CSSProperties } from "react";
import type {
    PixieStickyRegionEdge,
    PixieStickyRegionLayer,
    PixieStickyRegionOffsetPreset,
    PixieStickyRegionOverflow,
    PixieStickyRegionProps,
    PixieStickyRegionWidth,
} from "./PixieStickyRegion.types";

const edgeClasses = {
    start: styles.edgeStart,
    end: styles.edgeEnd,
} as const satisfies Record<PixieStickyRegionEdge, string>;

const offsetClasses = {
    none: styles.offsetNone,
    xs: styles.offsetExtraSmall,
    sm: styles.offsetSmall,
    md: styles.offsetMedium,
    lg: styles.offsetLarge,
    xl: styles.offsetExtraLarge,
} as const satisfies Record<PixieStickyRegionOffsetPreset, string>;

const widthClasses = {
    full: styles.widthFull,
    fit: styles.widthFit,
} as const satisfies Record<PixieStickyRegionWidth, string>;

const overflowClasses = {
    visible: styles.overflowVisible,
    auto: styles.overflowAuto,
} as const satisfies Record<PixieStickyRegionOverflow, string>;

const layerClasses = {
    auto: styles.layerAuto,
    raised: styles.layerRaised,
    overlay: styles.layerOverlay,
} as const satisfies Record<PixieStickyRegionLayer, string>;

export function PixieStickyRegion({
    as: Element = "div",
    edge = "start",
    offset = "md",
    width = "full",
    overflow = "visible",
    safeArea = false,
    layer = "auto",
    className = "",
    style,
    tabIndex,
    children,
    ...elementProps
}: PixieStickyRegionProps) {
    const customOffset =
        typeof offset === "number"
            ? ({
                  ...style,
                  "--pixie-sticky-region-offset": `${offset}px`,
              } as CSSProperties)
            : style;

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${edgeClasses[edge]} ${typeof offset === "number" ? "" : offsetClasses[offset]} ${widthClasses[width]} ${overflowClasses[overflow]} ${safeArea ? styles.safeArea : ""} ${layerClasses[layer]} ${className}`.trim()}
            style={customOffset}
            tabIndex={overflow === "auto" ? (tabIndex ?? 0) : tabIndex}
            data-pixie-sticky-region-edge={edge}
            data-pixie-sticky-region-offset={offset}
            data-pixie-sticky-region-width={width}
            data-pixie-sticky-region-overflow={overflow}
            data-pixie-sticky-region-safe-area={safeArea ? "true" : "false"}
            data-pixie-sticky-region-layer={layer}
        >
            {children}
        </Element>
    );
}
