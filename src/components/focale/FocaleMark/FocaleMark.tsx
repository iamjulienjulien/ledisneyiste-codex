import styles from "./FocaleMark.module.css";
import type {
    FocaleMarkProps,
    FocaleMarkShape,
    FocaleMarkSize,
    FocaleMarkStyle,
} from "./FocaleMark.types";

const shapeClasses = {
    dot: styles.dot,
    bar: styles.bar,
    line: styles.line,
} as const satisfies Record<FocaleMarkShape, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<FocaleMarkSize, string>;

export function FocaleMark({
    shape = "dot",
    size = "md",
    color,
    value = 1,
    decorative = false,
    label,
    className = "",
    style,
    ...elementProps
}: FocaleMarkProps) {
    const normalizedValue = Math.min(1, Math.max(0, value));
    const markStyle: FocaleMarkStyle = {
        ...style,
        ...(color ? { "--focale-mark-color": color } : {}),
        "--focale-mark-value": normalizedValue,
    };

    return (
        <span
            {...elementProps}
            className={`${styles.root} ${shapeClasses[shape]} ${sizeClasses[size]} ${className}`.trim()}
            style={markStyle}
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : label}
            aria-hidden={decorative || undefined}
            data-focale-mark={shape}
            data-focale-mark-value={normalizedValue}
        />
    );
}
