import styles from "./PixieDustSidebar.module.css";
import type {
    PixieDustSidebarAlign,
    PixieDustSidebarContentMinWidth,
    PixieDustSidebarGap,
    PixieDustSidebarProps,
    PixieDustSidebarSide,
    PixieDustSidebarSideWidth,
} from "./PixieDustSidebar.types";

const sideClasses = {
    start: styles.sideStart,
    end: styles.sideEnd,
} as const satisfies Record<PixieDustSidebarSide, string>;

const sideWidthClasses = {
    xs: styles.sideWidthExtraSmall,
    sm: styles.sideWidthSmall,
    md: styles.sideWidthMedium,
    lg: styles.sideWidthLarge,
    xl: styles.sideWidthExtraLarge,
} as const satisfies Record<PixieDustSidebarSideWidth, string>;

const contentMinWidthClasses = {
    half: styles.contentMinWidthHalf,
    "two-thirds": styles.contentMinWidthTwoThirds,
    "three-quarters": styles.contentMinWidthThreeQuarters,
} as const satisfies Record<PixieDustSidebarContentMinWidth, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustSidebarGap, string>;

const rowGapClasses = {
    none: styles.rowGapNone,
    xs: styles.rowGapExtraSmall,
    sm: styles.rowGapSmall,
    md: styles.rowGapMedium,
    lg: styles.rowGapLarge,
    xl: styles.rowGapExtraLarge,
} as const satisfies Record<PixieDustSidebarGap, string>;

const columnGapClasses = {
    none: styles.columnGapNone,
    xs: styles.columnGapExtraSmall,
    sm: styles.columnGapSmall,
    md: styles.columnGapMedium,
    lg: styles.columnGapLarge,
    xl: styles.columnGapExtraLarge,
} as const satisfies Record<PixieDustSidebarGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustSidebarAlign, string>;

export function PixieDustSidebar({
    as: Element = "div",
    side = "start",
    sideWidth = "md",
    contentMinWidth = "two-thirds",
    gap = "lg",
    rowGap,
    columnGap,
    align = "stretch",
    className = "",
    sidebar,
    children,
    ...elementProps
}: PixieDustSidebarProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${sideClasses[side]} ${sideWidthClasses[sideWidth]} ${contentMinWidthClasses[contentMinWidth]} ${gapClasses[gap]} ${rowGap ? rowGapClasses[rowGap] : ""} ${columnGap ? columnGapClasses[columnGap] : ""} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-sidebar-side={side}
            data-pixie-sidebar-side-width={sideWidth}
            data-pixie-sidebar-content-min-width={contentMinWidth}
            data-pixie-sidebar-gap={gap}
            data-pixie-sidebar-row-gap={rowGap ?? gap}
            data-pixie-sidebar-column-gap={columnGap ?? gap}
            data-pixie-sidebar-align={align}
        >
            {side === "start" ? sidebar : children}
            {side === "start" ? children : sidebar}
        </Element>
    );
}
