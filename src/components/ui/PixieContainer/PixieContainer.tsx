import styles from "./PixieContainer.module.css";
import type {
    PixieContainerGutter,
    PixieContainerProps,
    PixieContainerWidth,
} from "./PixieContainer.types";

const widthClasses = {
    "42": styles.width42,
    "56": styles.width56,
    "72": styles.width72,
    full: styles.widthFull,
} as const satisfies Record<PixieContainerWidth, string>;

const gutterClasses = {
    none: styles.gutterNone,
    sm: styles.gutterSmall,
    md: styles.gutterMedium,
    lg: styles.gutterLarge,
} as const satisfies Record<PixieContainerGutter, string>;

export function PixieContainer({
    as: Element = "div",
    width = "72",
    gutter = "md",
    className = "",
    children,
    ...elementProps
}: PixieContainerProps) {
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
