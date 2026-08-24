import styles from "./PixieDustBleed.module.css";
import type {
    PixieDustBleedExtent,
    PixieDustBleedGutter,
    PixieDustBleedProps,
    PixieDustBleedSide,
} from "./PixieDustBleed.types";

const sideClasses = {
    start: styles.sideStart,
    end: styles.sideEnd,
    both: styles.sideBoth,
} as const satisfies Record<PixieDustBleedSide, string>;

const extentClasses = {
    sm: styles.extentSmall,
    md: styles.extentMedium,
    lg: styles.extentLarge,
    xl: styles.extentExtraLarge,
    viewport: styles.extentViewport,
} as const satisfies Record<PixieDustBleedExtent, string>;

const gutterClasses = {
    none: styles.gutterNone,
    sm: styles.gutterSmall,
    md: styles.gutterMedium,
    lg: styles.gutterLarge,
} as const satisfies Record<PixieDustBleedGutter, string>;

export function PixieDustBleed({
    as: Element = "div",
    side = "both",
    extent = "md",
    gutter = "none",
    className = "",
    children,
    ...elementProps
}: PixieDustBleedProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${sideClasses[side]} ${extentClasses[extent]} ${gutterClasses[gutter]} ${className}`.trim()}
            data-pixie-bleed-side={side}
            data-pixie-bleed-extent={extent}
            data-pixie-bleed-gutter={gutter}
        >
            {children}
        </Element>
    );
}
