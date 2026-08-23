import styles from "./PixieDustStack.module.css";
import type {
    PixieDustStackAlign,
    PixieDustStackGap,
    PixieDustStackProps,
} from "./PixieDustStack.types";

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieDustStackGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieDustStackAlign, string>;

export function PixieDustStack({
    as: Element = "div",
    gap = "md",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustStackProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${gapClasses[gap]} ${alignClasses[align]} ${className}`.trim()}
            data-pixie-stack-gap={gap}
            data-pixie-stack-align={align}
        >
            {children}
        </Element>
    );
}
