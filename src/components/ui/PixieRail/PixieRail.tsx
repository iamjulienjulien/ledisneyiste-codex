import styles from "./PixieRail.module.css";
import type { CSSProperties } from "react";
import type {
    PixieRailAlign,
    PixieRailGapPreset,
    PixieRailGutterPreset,
    PixieRailItemWidthPreset,
    PixieRailOverscroll,
    PixieRailPeek,
    PixieRailProps,
    PixieRailScrollbar,
    PixieRailSnap,
    PixieRailSnapAlign,
    PixieRailSnapStop,
} from "./PixieRail.types";

const itemWidthClasses = {
    auto: styles.itemWidthAuto,
    xs: styles.itemWidthExtraSmall,
    sm: styles.itemWidthSmall,
    md: styles.itemWidthMedium,
    lg: styles.itemWidthLarge,
    xl: styles.itemWidthExtraLarge,
} as const satisfies Record<PixieRailItemWidthPreset, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieRailGapPreset, string>;

const gutterClasses = {
    none: styles.gutterNone,
    sm: styles.gutterSmall,
    md: styles.gutterMedium,
    lg: styles.gutterLarge,
} as const satisfies Record<PixieRailGutterPreset, string>;

const peekClasses = {
    none: styles.peekNone,
    subtle: styles.peekSubtle,
    strong: styles.peekStrong,
} as const satisfies Record<PixieRailPeek, string>;

const snapClasses = {
    none: styles.snapNone,
    proximity: styles.snapProximity,
    mandatory: styles.snapMandatory,
} as const satisfies Record<PixieRailSnap, string>;

const snapAlignClasses = {
    start: styles.snapAlignStart,
    center: styles.snapAlignCenter,
    end: styles.snapAlignEnd,
} as const satisfies Record<PixieRailSnapAlign, string>;

const snapStopClasses = {
    normal: styles.snapStopNormal,
    always: styles.snapStopAlways,
} as const satisfies Record<PixieRailSnapStop, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieRailAlign, string>;

const scrollbarClasses = {
    auto: styles.scrollbarAuto,
    thin: styles.scrollbarThin,
    hidden: styles.scrollbarHidden,
} as const satisfies Record<PixieRailScrollbar, string>;

const overscrollClasses = {
    auto: styles.overscrollAuto,
    contain: styles.overscrollContain,
} as const satisfies Record<PixieRailOverscroll, string>;

export function PixieRail({
    as: Element = "div",
    itemWidth = "md",
    gap = "md",
    gutter = "none",
    peek = "subtle",
    snap = "proximity",
    snapAlign = "start",
    snapStop = "normal",
    align = "stretch",
    scrollbar = "auto",
    overscroll = "contain",
    tabIndex = 0,
    className = "",
    style,
    children,
    ...elementProps
}: PixieRailProps) {
    const customStyles = {
        ...style,
        ...(typeof itemWidth === "number"
            ? { "--pixie-rail-item-width": `${itemWidth}px` }
            : {}),
        ...(typeof gap === "number" ? { "--pixie-rail-gap": `${gap}px` } : {}),
        ...(typeof gutter === "number"
            ? { "--pixie-rail-gutter": `${gutter}px` }
            : {}),
    } as CSSProperties;

    return (
        <Element
            {...elementProps}
            tabIndex={tabIndex}
            className={`${styles.root} ${typeof itemWidth === "number" ? styles.itemWidthCustom : itemWidthClasses[itemWidth]} ${typeof gap === "number" ? styles.gapCustom : gapClasses[gap]} ${typeof gutter === "number" ? styles.gutterCustom : gutterClasses[gutter]} ${peekClasses[peek]} ${snapClasses[snap]} ${snapAlignClasses[snapAlign]} ${snapStopClasses[snapStop]} ${alignClasses[align]} ${scrollbarClasses[scrollbar]} ${overscrollClasses[overscroll]} ${className}`.trim()}
            style={customStyles}
            data-pixie-rail-item-width={itemWidth}
            data-pixie-rail-gap={gap}
            data-pixie-rail-gutter={gutter}
            data-pixie-rail-peek={peek}
            data-pixie-rail-snap={snap}
            data-pixie-rail-snap-align={snapAlign}
            data-pixie-rail-snap-stop={snapStop}
            data-pixie-rail-align={align}
            data-pixie-rail-scrollbar={scrollbar}
            data-pixie-rail-overscroll={overscroll}
        >
            {children}
        </Element>
    );
}
