import styles from "./PixieDustSwitcher.module.css";
import type {
    PixieDustSwitcherAlign,
    PixieDustSwitcherGap,
    PixieDustSwitcherLimit,
    PixieDustSwitcherLayout,
    PixieDustSwitcherProps,
    PixieDustSwitcherThreshold,
} from "./PixieDustSwitcher.types";

const thresholdClasses = {
    xs: styles.thresholdExtraSmall,
    sm: styles.thresholdSmall,
    md: styles.thresholdMedium,
    lg: styles.thresholdLarge,
    xl: styles.thresholdExtraLarge,
} as const satisfies Record<PixieDustSwitcherThreshold, string>;

const limitClasses = {
    2: styles.limitTwo,
    3: styles.limitThree,
    4: styles.limitFour,
    5: styles.limitFive,
    6: styles.limitSix,
} as const satisfies Record<Exclude<PixieDustSwitcherLimit, false>, string>;

const layoutClasses = {
    auto: styles.layoutAuto,
    row: styles.layoutRow,
    stack: styles.layoutStack,
} as const satisfies Record<PixieDustSwitcherLayout, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustSwitcherGap, string>;

const rowGapClasses = {
    none: styles.rowGapNone,
    xs: styles.rowGapExtraSmall,
    sm: styles.rowGapSmall,
    md: styles.rowGapMedium,
    lg: styles.rowGapLarge,
    xl: styles.rowGapExtraLarge,
} as const satisfies Record<PixieDustSwitcherGap, string>;

const columnGapClasses = {
    none: styles.columnGapNone,
    xs: styles.columnGapExtraSmall,
    sm: styles.columnGapSmall,
    md: styles.columnGapMedium,
    lg: styles.columnGapLarge,
    xl: styles.columnGapExtraLarge,
} as const satisfies Record<PixieDustSwitcherGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustSwitcherAlign, string>;

export function PixieDustSwitcher({
    as: Element = "div",
    layout = "auto",
    threshold = "md",
    limit = 4,
    gap = "md",
    rowGap,
    columnGap,
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustSwitcherProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${layoutClasses[layout]} ${thresholdClasses[threshold]} ${limit === false ? "" : limitClasses[limit]} ${gapClasses[gap]} ${rowGap ? rowGapClasses[rowGap] : ""} ${columnGap ? columnGapClasses[columnGap] : ""} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-switcher-layout={layout}
            data-pixie-switcher-threshold={threshold}
            data-pixie-switcher-limit={limit === false ? "none" : limit}
            data-pixie-switcher-gap={gap}
            data-pixie-switcher-row-gap={rowGap ?? gap}
            data-pixie-switcher-column-gap={columnGap ?? gap}
            data-pixie-switcher-align={align}
        >
            {children}
        </Element>
    );
}
