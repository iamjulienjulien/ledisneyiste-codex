import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustTextarea.module.css";
import type {
    PixieDustTextareaProps,
    PixieDustTextareaResize,
    PixieDustTextareaSize,
    PixieDustTextareaStyle,
    PixieDustTextareaVariant,
} from "./PixieDustTextarea.types";

const variantClasses = {
    outline: styles.outline,
    filled: styles.filled,
    underline: styles.underline,
} as const satisfies Record<PixieDustTextareaVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieDustTextareaSize, string>;

const resizeClasses = {
    none: styles.resizeNone,
    vertical: styles.resizeVertical,
    horizontal: styles.resizeHorizontal,
    both: styles.resizeBoth,
} as const satisfies Record<PixieDustTextareaResize, string>;

function isAriaInvalid(value: PixieDustTextareaProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieDustTextarea({
    variant = "outline",
    size = "md",
    color = false,
    invalid = false,
    resize = "vertical",
    className = "",
    textareaClassName = "",
    style,
    disabled = false,
    readOnly = false,
    "aria-invalid": ariaInvalid,
    ...textareaProps
}: PixieDustTextareaProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieDustTextareaStyle | undefined = colorDefinition
        ? { "--pixie-textarea-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);

    return (
        <span
            className={`${styles.root} ${className}`.trim()}
            style={rootStyle}
        >
            <textarea
                {...textareaProps}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={isInvalid ? true : ariaInvalid}
                className={`${styles.textarea} ${variantClasses[variant]} ${sizeClasses[size]} ${resizeClasses[resize]} ${textareaClassName}`.trim()}
                style={style}
                data-invalid={isInvalid || undefined}
                data-pixie-textarea-color={color || "inherit"}
                data-pixie-textarea-resize={resize}
                data-pixie-textarea-size={size}
                data-pixie-textarea-variant={variant}
            />
        </span>
    );
}
