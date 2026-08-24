import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustSelect.module.css";
import type {
    PixieDustSelectProps,
    PixieDustSelectSize,
    PixieDustSelectStyle,
    PixieDustSelectVariant,
} from "./PixieDustSelect.types";

const variantClasses = {
    outline: styles.outline,
    filled: styles.filled,
    underline: styles.underline,
} as const satisfies Record<PixieDustSelectVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieDustSelectSize, string>;

function isAriaInvalid(value: PixieDustSelectProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieDustSelect({
    children,
    variant = "outline",
    size = "md",
    color = false,
    placeholder,
    invalid = false,
    className = "",
    selectClassName = "",
    style,
    disabled = false,
    "aria-invalid": ariaInvalid,
    ...selectProps
}: PixieDustSelectProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieDustSelectStyle | undefined = colorDefinition
        ? { "--pixie-select-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
            style={rootStyle}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pixie-select-color={color || "inherit"}
            data-pixie-select-size={size}
            data-pixie-select-variant={variant}
        >
            <select
                {...selectProps}
                disabled={disabled}
                aria-invalid={isInvalid ? true : ariaInvalid}
                className={`${styles.select} ${selectClassName}`.trim()}
                style={style}
            >
                {placeholder ? (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                ) : null}
                {children}
            </select>

            <svg
                aria-hidden="true"
                className={styles.chevron}
                viewBox="0 0 16 16"
                fill="none"
            >
                <path d="m4 6 4 4 4-4" />
            </svg>
        </span>
    );
}
