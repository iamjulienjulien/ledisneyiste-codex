import styles from "./PixieStack.module.css";
import type {
    PixieStackAlign,
    PixieStackGap,
    PixieStackProps,
} from "./PixieStack.types";

const gapClasses = {
    none: styles.gapNone,
    xs: styles.gapExtraSmall,
    sm: styles.gapSmall,
    md: styles.gapMedium,
    lg: styles.gapLarge,
    xl: styles.gapExtraLarge,
} as const satisfies Record<PixieStackGap, string>;

const alignClasses = {
    stretch: styles.alignStretch,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieStackAlign, string>;

export function PixieStack({
    as: Element = "div",
    gap = "md",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieStackProps) {
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
