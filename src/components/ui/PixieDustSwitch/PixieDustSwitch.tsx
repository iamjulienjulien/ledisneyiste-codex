import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustSwitch.module.css";
import type {
    PixieDustSwitchProps,
    PixieDustSwitchSize,
    PixieDustSwitchStyle,
    PixieDustSwitchVariant,
} from "./PixieDustSwitch.types";

const variantClasses = {
    solid: styles.solid,
    soft: styles.soft,
    outline: styles.outline,
} as const satisfies Record<PixieDustSwitchVariant, string>;

const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
} as const satisfies Record<PixieDustSwitchSize, string>;

function isAriaInvalid(value: PixieDustSwitchProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieDustSwitch({
    variant = "solid",
    size = "md",
    color = false,
    invalid = false,
    className = "",
    inputClassName = "",
    style,
    disabled = false,
    "aria-invalid": ariaInvalid,
    ...inputProps
}: PixieDustSwitchProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieDustSwitchStyle | undefined = colorDefinition
        ? { "--pixie-switch-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
            style={rootStyle}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pixie-switch-color={color || "inherit"}
            data-pixie-switch-size={size}
            data-pixie-switch-variant={variant}
        >
            <input
                {...inputProps}
                type="checkbox"
                role="switch"
                disabled={disabled}
                aria-invalid={isInvalid ? true : ariaInvalid}
                className={`${styles.input} ${inputClassName}`.trim()}
                style={style}
            />
            <span aria-hidden="true" className={styles.track}>
                <span className={styles.thumb} />
            </span>
        </span>
    );
}
