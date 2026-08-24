import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustInput.module.css";
import type {
    PixieDustInputProps,
    PixieDustInputSize,
    PixieDustInputStyle,
    PixieDustInputVariant,
} from "./PixieDustInput.types";

const variantClasses = {
    outline: styles.outline,
    filled: styles.filled,
    underline: styles.underline,
} as const satisfies Record<PixieDustInputVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieDustInputSize, string>;

function isAriaInvalid(value: PixieDustInputProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieDustInput({
    type = "text",
    variant = "outline",
    size = "md",
    color = false,
    invalid = false,
    startAdornment,
    endAdornment,
    className = "",
    inputClassName = "",
    style,
    disabled = false,
    readOnly = false,
    "aria-invalid": ariaInvalid,
    ...inputProps
}: PixieDustInputProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const inputStyle: PixieDustInputStyle | undefined = colorDefinition
        ? { "--pixie-input-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
            style={inputStyle}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pixie-input-color={color || "inherit"}
            data-pixie-input-size={size}
            data-pixie-input-variant={variant}
            data-readonly={readOnly || undefined}
        >
            {startAdornment ? (
                <span aria-hidden="true" className={styles.adornment}>
                    {startAdornment}
                </span>
            ) : null}
            <input
                {...inputProps}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={isInvalid ? true : ariaInvalid}
                className={`${styles.input} ${inputClassName}`.trim()}
                style={style}
            />
            {endAdornment ? (
                <span aria-hidden="true" className={styles.adornment}>
                    {endAdornment}
                </span>
            ) : null}
        </span>
    );
}
