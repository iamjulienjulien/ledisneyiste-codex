import styles from "./PixieDustContainer.module.css";
import type {
    PixieDustContainerGutter,
    PixieDustContainerProps,
    PixieDustContainerWidth,
} from "./PixieDustContainer.types";

const widthClasses = {
    narrow: styles.widthNarrow,
    medium: styles.widthMedium,
    wide: styles.widthWide,
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
    width = "wide",
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
