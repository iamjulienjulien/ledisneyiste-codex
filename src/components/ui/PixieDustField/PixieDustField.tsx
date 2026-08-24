import { cloneElement } from "react";
import styles from "./PixieDustField.module.css";
import type {
    PixieDustFieldProps,
    PixieDustFieldSpacing,
} from "./PixieDustField.types";

const spacingClasses = {
    sm: styles.spacingSmall,
    md: styles.spacingMedium,
    lg: styles.spacingLarge,
} as const satisfies Record<PixieDustFieldSpacing, string>;

function joinIds(...values: (string | undefined)[]) {
    return values.filter(Boolean).join(" ") || undefined;
}

export function PixieDustField({
    controlId,
    label,
    children,
    description,
    error,
    required = false,
    optional = false,
    labelHidden = false,
    spacing = "md",
    className = "",
}: PixieDustFieldProps) {
    const hasDescription = description !== undefined && description !== null;
    const hasError = error !== undefined && error !== null;
    const descriptionId = hasDescription
        ? `${controlId}-description`
        : undefined;
    const errorId = hasError ? `${controlId}-error` : undefined;
    const control = cloneElement(children, {
        id: controlId,
        "aria-describedby": joinIds(
            children.props["aria-describedby"],
            descriptionId,
            errorId,
        ),
        "aria-errormessage": hasError
            ? errorId
            : children.props["aria-errormessage"],
        "aria-invalid": hasError ? true : children.props["aria-invalid"],
        "aria-required": required ? true : children.props["aria-required"],
    });

    return (
        <div
            className={`${styles.root} ${spacingClasses[spacing]} ${className}`.trim()}
            data-pixie-field-invalid={hasError || undefined}
            data-pixie-field-spacing={spacing}
        >
            <div
                className={
                    labelHidden ? styles.visuallyHidden : styles.labelRow
                }
            >
                <label htmlFor={controlId} className={styles.label}>
                    {label}
                </label>
                {required || optional ? (
                    <span className={styles.indicator} aria-hidden="true">
                        {required ? "Obligatoire" : "Facultatif"}
                    </span>
                ) : null}
            </div>

            <div className={styles.control}>{control}</div>

            {hasDescription || hasError ? (
                <div className={styles.messages}>
                    {hasDescription ? (
                        <p id={descriptionId} className={styles.description}>
                            {description}
                        </p>
                    ) : null}
                    {hasError ? (
                        <p id={errorId} className={styles.error} role="alert">
                            {error}
                        </p>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
