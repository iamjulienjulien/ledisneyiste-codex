import styles from "./PixieDustSplit.module.css";
import type {
    PixieDustSplitAlign,
    PixieDustSplitGap,
    PixieDustSplitMinPaneWidth,
    PixieDustSplitProps,
    PixieDustSplitRatio,
} from "./PixieDustSplit.types";

const ratioClasses = {
    equal: styles.ratioEqual,
    "start-wide": styles.ratioStartWide,
    "end-wide": styles.ratioEndWide,
} as const satisfies Record<PixieDustSplitRatio, string>;

const minPaneWidthClasses = {
    xs: styles.minPaneWidthExtraSmall,
    sm: styles.minPaneWidthSmall,
    md: styles.minPaneWidthMedium,
    lg: styles.minPaneWidthLarge,
} as const satisfies Record<PixieDustSplitMinPaneWidth, string>;

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustSplitGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustSplitAlign, string>;

export function PixieDustSplit({
    as: Element = "div",
    ratio = "equal",
    minPaneWidth = "md",
    gap = "lg",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustSplitProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${ratioClasses[ratio]} ${minPaneWidthClasses[minPaneWidth]} ${gapClasses[gap]} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-split-ratio={ratio}
            data-pixie-split-min-pane-width={minPaneWidth}
            data-pixie-split-gap={gap}
            data-pixie-split-align={align}
        >
            {children}
        </Element>
    );
}
