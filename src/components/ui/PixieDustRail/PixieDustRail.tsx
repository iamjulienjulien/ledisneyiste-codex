import styles from "./PixieDustRail.module.css";
import type {
    PixieDustRailAlign,
    PixieDustRailGap,
    PixieDustRailGutter,
    PixieDustRailItemWidth,
    PixieDustRailProps,
    PixieDustRailSnap,
} from "./PixieDustRail.types";

const itemWidthClasses = {
    xs: styles.itemWidthExtraSmall,
    sm: styles.itemWidthSmall,
    md: styles.itemWidthMedium,
    lg: styles.itemWidthLarge,
    xl: styles.itemWidthExtraLarge,
} as const satisfies Record<PixieDustRailItemWidth, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustRailGap, string>;

const gutterClasses = {
    none: styles.gutterNone,
    sm: styles.gutterSmall,
    md: styles.gutterMedium,
    lg: styles.gutterLarge,
} as const satisfies Record<PixieDustRailGutter, string>;

const snapClasses = {
    none: styles.snapNone,
    start: styles.snapStart,
    center: styles.snapCenter,
} as const satisfies Record<PixieDustRailSnap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustRailAlign, string>;

export function PixieDustRail({
    as: Element = "div",
    itemWidth = "md",
    gap = "md",
    gutter = "none",
    snap = "start",
    align = "stretch",
    peek = true,
    tabIndex = 0,
    className = "",
    children,
    ...elementProps
}: PixieDustRailProps) {
    return (
        <Element
            {...elementProps}
            tabIndex={tabIndex}
            className={`${styles.root} ${itemWidthClasses[itemWidth]} ${gapClasses[gap]} ${gutterClasses[gutter]} ${snapClasses[snap]} ${alignClasses[align]} ${peek ? styles.peek : styles.noPeek} ${className}`.trim()}
            data-pixie-rail-item-width={itemWidth}
            data-pixie-rail-gap={gap}
            data-pixie-rail-gutter={gutter}
            data-pixie-rail-snap={snap}
            data-pixie-rail-align={align}
            data-pixie-rail-peek={peek}
        >
            {children}
        </Element>
    );
}
