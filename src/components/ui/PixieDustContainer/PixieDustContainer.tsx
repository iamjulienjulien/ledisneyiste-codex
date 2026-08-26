import styles from "./PixieDustContainer.module.css";
import type {
    PixieDustContainerGutter,
    PixieDustContainerProps,
    PixieDustContainerWidth,
} from "./PixieDustContainer.types";

const widthClasses = {
    "42": styles.width42,
    "56": styles.width56,
    "72": styles.width72,
    full: styles.widthFull,
} as const satisfies Record<PixieDustContainerWidth, string>;

const gutterClasses = {
    none: styles.gutterNone,
    sm: styles.gutterSmall,
    md: styles.gutterMedium,
    lg: styles.gutterLarge,
} as const satisfies Record<PixieDustContainerGutter, string>;

export function PixieDustContainer({
    as: Element = "div",
    width = "72",
    gutter = "md",
    className = "",
    children,
    ...elementProps
}: PixieDustContainerProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${widthClasses[width]} ${gutterClasses[gutter]} ${className}`.trim()}
            data-pixie-container-width={width}
            data-pixie-container-gutter={gutter}
        >
            {children}
        </Element>
    );
}
