import styles from "./PixieDustSwitcher.module.css";
import type {
    PixieDustSwitcherAlign,
    PixieDustSwitcherGap,
    PixieDustSwitcherLimit,
    PixieDustSwitcherProps,
    PixieDustSwitcherThreshold,
} from "./PixieDustSwitcher.types";

const thresholdClasses = {
    xs: styles.thresholdExtraSmall,
    sm: styles.thresholdSmall,
    md: styles.thresholdMedium,
    lg: styles.thresholdLarge,
} as const satisfies Record<PixieDustSwitcherThreshold, string>;

const limitClasses = {
    2: styles.limitTwo,
    3: styles.limitThree,
    4: styles.limitFour,
    5: styles.limitFive,
    6: styles.limitSix,
} as const satisfies Record<PixieDustSwitcherLimit, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustSwitcherGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustSwitcherAlign, string>;

export function PixieDustSwitcher({
    as: Element = "div",
    threshold = "md",
    limit = 4,
    gap = "md",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustSwitcherProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${thresholdClasses[threshold]} ${limitClasses[limit]} ${gapClasses[gap]} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-switcher-threshold={threshold}
            data-pixie-switcher-limit={limit}
            data-pixie-switcher-gap={gap}
            data-pixie-switcher-align={align}
        >
            {children}
        </Element>
    );
}
