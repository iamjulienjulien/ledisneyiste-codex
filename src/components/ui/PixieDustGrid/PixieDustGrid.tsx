import styles from "./PixieDustGrid.module.css";
import type {
    PixieDustGridAlign,
    PixieDustGridColumns,
    PixieDustGridGap,
    PixieDustGridMinItemWidth,
    PixieDustGridProps,
} from "./PixieDustGrid.types";

const columnClasses = {
    1: styles.columnsOne,
    2: styles.columnsTwo,
    3: styles.columnsThree,
    4: styles.columnsFour,
    5: styles.columnsFive,
    6: styles.columnsSix,
} as const satisfies Record<PixieDustGridColumns, string>;

const minItemWidthClasses = {
    xs: styles.minItemWidthExtraSmall,
    sm: styles.minItemWidthSmall,
    md: styles.minItemWidthMedium,
    lg: styles.minItemWidthLarge,
} as const satisfies Record<PixieDustGridMinItemWidth, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustGridGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustGridAlign, string>;

export function PixieDustGrid({
    as: Element = "div",
    columns = 3,
    minItemWidth = "md",
    gap = "md",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustGridProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${columnClasses[columns]} ${minItemWidthClasses[minItemWidth]} ${gapClasses[gap]} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-grid-columns={columns}
            data-pixie-grid-min-item-width={minItemWidth}
            data-pixie-grid-gap={gap}
            data-pixie-grid-align={align}
        >
            {children}
        </Element>
    );
}
