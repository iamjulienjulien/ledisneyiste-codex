import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieInput.module.css";
import type {
    PixieInputAlign,
    PixieInputFont,
    PixieInputProps,
    PixieInputShape,
    PixieInputSize,
    PixieInputStyle,
    PixieInputTone,
    PixieInputVariant,
} from "./PixieInput.types";

const variantClasses = {
    outline: styles.outline,
    filled: styles.filled,
    underline: styles.underline,
    ghost: styles.ghost,
} as const satisfies Record<PixieInputVariant, string>;

const sizeClasses = {
    xs: styles.extraSmall,
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
    xl: styles.extraLarge,
} as const satisfies Record<PixieInputSize, string>;

const shapeClasses = {
    square: styles.square,
    rounded: styles.rounded,
    pill: styles.pill,
} as const satisfies Record<PixieInputShape, string>;

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<PixieInputAlign, string>;

const fontClasses = {
    body: styles.fontBody,
    mono: styles.fontMono,
} as const satisfies Record<PixieInputFont, string>;

const toneClasses = {
    neutral: styles.toneNeutral,
    success: styles.toneSuccess,
    warning: styles.toneWarning,
} as const satisfies Record<PixieInputTone, string>;

function isAriaInvalid(value: PixieInputProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieInput({
    type = "text",
    variant = "outline",
    size = "md",
    shape = "rounded",
    align = "start",
    font = "body",
    tone = "neutral",
    color = false,
    invalid = false,
    busy = false,
    startAdornment,
    endAdornment,
    startAction,
    endAction,
    className = "",
    inputClassName = "",
    style,
    disabled = false,
    readOnly = false,
    "aria-invalid": ariaInvalid,
    "aria-busy": ariaBusy,
    ...inputProps
}: PixieInputProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const inputStyle: PixieInputStyle | undefined = colorDefinition
        ? { "--pixie-input-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || isAriaInvalid(ariaInvalid);

    return (
        <span
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${toneClasses[tone]} ${className}`.trim()}
            style={inputStyle}
            data-busy={busy || undefined}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-pixie-input-align={align}
            data-pixie-input-color={color || "inherit"}
            data-pixie-input-font={font}
            data-pixie-input-shape={shape}
            data-pixie-input-size={size}
            data-pixie-input-tone={tone}
            data-pixie-input-variant={variant}
            data-readonly={readOnly || undefined}
        >
            {startAdornment ? (
                <span aria-hidden="true" className={styles.adornment}>
                    {startAdornment}
                </span>
            ) : null}
            {startAction ? (
                <span className={styles.action}>{startAction}</span>
            ) : null}
            <input
                {...inputProps}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                aria-busy={busy ? true : ariaBusy}
                aria-invalid={isInvalid ? true : ariaInvalid}
                className={`${styles.input} ${alignClasses[align]} ${fontClasses[font]} ${inputClassName}`.trim()}
                style={style}
            />
            {endAdornment ? (
                <span aria-hidden="true" className={styles.adornment}>
                    {endAdornment}
                </span>
            ) : null}
            {busy ? <span className={styles.busy} aria-hidden="true" /> : null}
            {endAction ? (
                <span className={styles.action}>{endAction}</span>
            ) : null}
        </span>
    );
}
