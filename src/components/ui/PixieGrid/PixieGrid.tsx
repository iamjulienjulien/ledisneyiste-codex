import styles from "./PixieGrid.module.css";
import type {
    PixieGridAlign,
    PixieGridDistribution,
    PixieGridGap,
    PixieGridJustify,
    PixieGridMaxColumns,
    PixieGridMinItemWidth,
    PixieGridProps,
} from "./PixieGrid.types";

const columnClasses = {
    1: styles.columnsOne,
    2: styles.columnsTwo,
    3: styles.columnsThree,
    4: styles.columnsFour,
    5: styles.columnsFive,
    6: styles.columnsSix,
} as const satisfies Record<PixieGridMaxColumns, string>;

const minItemWidthClasses = {
    xs: styles.minItemWidthExtraSmall,
    sm: styles.minItemWidthSmall,
    md: styles.minItemWidthMedium,
    lg: styles.minItemWidthLarge,
} as const satisfies Record<PixieGridMinItemWidth, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieGridGap, string>;

const rowGapClasses = {
    none: styles.rowGapNone,
    xs: styles.rowGapExtraSmall,
    sm: styles.rowGapSmall,
    md: styles.rowGapMedium,
    lg: styles.rowGapLarge,
    xl: styles.rowGapExtraLarge,
} as const satisfies Record<PixieGridGap, string>;

const columnGapClasses = {
    none: styles.columnGapNone,
    xs: styles.columnGapExtraSmall,
    sm: styles.columnGapSmall,
    md: styles.columnGapMedium,
    lg: styles.columnGapLarge,
    xl: styles.columnGapExtraLarge,
} as const satisfies Record<PixieGridGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieGridAlign, string>;

const justifyClasses = {
    stretch: styles.justifyStretch,
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
} as const satisfies Record<PixieGridJustify, string>;

const distributionClasses = {
    fit: styles.distributionFit,
    fill: styles.distributionFill,
} as const satisfies Record<PixieGridDistribution, string>;

export function PixieGrid({
    as: Element = "div",
    maxColumns = 3,
    minItemWidth = "md",
    gap = "md",
    rowGap,
    columnGap,
    align = "stretch",
    justify = "stretch",
    distribution = "fit",
    className = "",
    children,
    ...elementProps
}: PixieGridProps) {
    const rowGapClass = rowGap ? rowGapClasses[rowGap] : "";
    const columnGapClass = columnGap ? columnGapClasses[columnGap] : "";

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${columnClasses[maxColumns]} ${minItemWidthClasses[minItemWidth]} ${gapClasses[gap]} ${rowGapClass} ${columnGapClass} ${alignClasses[align]} ${justifyClasses[justify]} ${distributionClasses[distribution]} ${className}`.trim()}
            data-pixie-grid-max-columns={maxColumns}
            data-pixie-grid-min-item-width={minItemWidth}
            data-pixie-grid-gap={gap}
            data-pixie-grid-row-gap={rowGap ?? "inherit"}
            data-pixie-grid-column-gap={columnGap ?? "inherit"}
            data-pixie-grid-align={align}
            data-pixie-grid-justify={justify}
            data-pixie-grid-distribution={distribution}
        >
            {children}
        </Element>
    );
}
