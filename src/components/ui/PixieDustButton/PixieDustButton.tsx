import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieDustButtonProps,
    PixieDustButtonStyle,
} from "./PixieDustButton.types";
import styles from "./PixieDustButton.module.css";

export function PixieDustButton({
    children,
    variant = "solid",
    size = "md",
    color = false,
    loading = false,
    fullWidth = false,
    disabled = false,
    type = "button",
    className = "",
    style,
    "aria-busy": ariaBusy,
    ...buttonProps
}: PixieDustButtonProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const buttonStyle: PixieDustButtonStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-dust-button-color": colorDefinition.cssValue }
            : {}),
        "--pixie-dust-button-foreground": colorDefinition
            ? colorDefinition.foreground === "light"
                ? "var(--pixie-dust-button-contrast-light)"
                : "var(--pixie-dust-button-contrast-dark)"
            : "var(--color-accent-contrast)",
    };

    return (
        <button
            {...buttonProps}
            type={type}
            disabled={disabled || loading}
            aria-busy={loading ? true : ariaBusy}
            className={`${styles.root} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ""} ${loading ? styles.loading : ""} ${className}`.trim()}
            style={buttonStyle}
            data-pixie-dust-button-color={color || "theme"}
            data-pixie-dust-button-loading={loading || undefined}
        >
            <span className={styles.label}>{children}</span>
            {loading ? (
                <span aria-hidden="true" className={styles.spinner} />
            ) : null}
        </button>
    );
}
