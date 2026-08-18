import { getAtelierAnimationColor } from "@/registry/colors";
import type { PixieButtonProps, PixieButtonStyle } from "./PixieButton.types";
import styles from "./PixieButton.module.css";

export function PixieButton({
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
}: PixieButtonProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const buttonStyle: PixieButtonStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-button-color": colorDefinition.cssValue }
            : {}),
        "--pixie-button-foreground": colorDefinition
            ? colorDefinition.foreground === "light"
                ? "var(--pixie-button-contrast-light)"
                : "var(--pixie-button-contrast-dark)"
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
            data-pixie-button-color={color || "theme"}
            data-pixie-button-loading={loading || undefined}
        >
            <span className={styles.label}>{children}</span>
            {loading ? (
                <span aria-hidden="true" className={styles.spinner} />
            ) : null}
        </button>
    );
}
