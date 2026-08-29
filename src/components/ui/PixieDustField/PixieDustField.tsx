import { cloneElement, useId } from "react";
import styles from "./PixieDustField.module.css";
import type {
    PixieDustFieldControlProps,
    PixieDustFieldFeedbackTone,
    PixieDustFieldLayout,
    PixieDustFieldProps,
    PixieDustFieldSpacing,
} from "./PixieDustField.types";

const spacingClasses = {
    xs: styles.spacingExtraSmall,
    sm: styles.spacingSmall,
    md: styles.spacingMedium,
    lg: styles.spacingLarge,
    xl: styles.spacingExtraLarge,
} as const satisfies Record<PixieDustFieldSpacing, string>;

const layoutClasses = {
    stacked: styles.layoutStacked,
    side: styles.layoutSide,
} as const satisfies Record<PixieDustFieldLayout, string>;

const feedbackClasses = {
    success: styles.feedbackSuccess,
    warning: styles.feedbackWarning,
} as const satisfies Record<PixieDustFieldFeedbackTone, string>;

function joinIds(...values: (string | undefined)[]) {
    const ids = values.flatMap(
        (value) => value?.split(/\s+/).filter(Boolean) ?? [],
    );

    return [...new Set(ids)].join(" ") || undefined;
}

function isAriaInvalid(value: PixieDustFieldControlProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

export function PixieDustField({
    controlId,
    label,
    children,
    description,
    error,
    feedback,
    feedbackTone = "success",
    meta,
    required = false,
    optional = false,
    labelHidden = false,
    layout = "stacked",
    spacing = "md",
    requirementDisplay = "text",
    requiredLabel = "Obligatoire",
    optionalLabel = "Facultatif",
    className = "",
}: PixieDustFieldProps) {
    const generatedId = useId();
    const hasDescription = description !== undefined && description !== null;
    const hasError = error !== undefined && error !== null;
    const hasFeedback = feedback !== undefined && feedback !== null;
    const resolvedControlId =
        controlId ??
        children.props.id ??
        `pixie-field-${generatedId.replaceAll(":", "")}`;
    const labelId = `${resolvedControlId}-label`;
    const descriptionId = hasDescription
        ? `${resolvedControlId}-description`
        : undefined;
    const feedbackId = hasFeedback
        ? `${resolvedControlId}-feedback`
        : undefined;
    const errorId = hasError ? `${resolvedControlId}-error` : undefined;
    const isInvalid = hasError || isAriaInvalid(children.props["aria-invalid"]);
    const isDisabled = Boolean(children.props.disabled);
    const isReadOnly = Boolean(children.props.readOnly);
    const showRequirement =
        (required || optional) && requirementDisplay !== "hidden";
    const requirement = required ? "required" : optional ? "optional" : "none";
    const requirementContent =
        requirementDisplay === "mark"
            ? required
                ? "*"
                : "○"
            : required
              ? requiredLabel
              : optionalLabel;
    const control = cloneElement(children, {
        id: resolvedControlId,
        "aria-labelledby": joinIds(children.props["aria-labelledby"], labelId),
        "aria-describedby": joinIds(
            children.props["aria-describedby"],
            descriptionId,
            feedbackId,
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
            className={`${styles.root} ${spacingClasses[spacing]} ${layoutClasses[layout]} ${className}`.trim()}
            data-pixie-field-disabled={isDisabled || undefined}
            data-pixie-field-feedback={
                hasError ? "error" : hasFeedback ? feedbackTone : undefined
            }
            data-pixie-field-invalid={isInvalid || undefined}
            data-pixie-field-layout={layout}
            data-pixie-field-readonly={isReadOnly || undefined}
            data-pixie-field-requirement={requirement}
            data-pixie-field-spacing={spacing}
        >
            <div
                className={
                    labelHidden ? styles.visuallyHidden : styles.labelRow
                }
            >
                <label
                    id={labelId}
                    htmlFor={resolvedControlId}
                    className={styles.label}
                >
                    {label}
                </label>
                {meta || showRequirement ? (
                    <span className={styles.labelTools}>
                        {meta ? (
                            <span className={styles.meta}>{meta}</span>
                        ) : null}
                        {showRequirement ? (
                            <span
                                className={styles.indicator}
                                aria-hidden="true"
                                data-display={requirementDisplay}
                            >
                                {requirementContent}
                            </span>
                        ) : null}
                    </span>
                ) : null}
            </div>

            <div className={styles.control}>{control}</div>

            {hasDescription || hasFeedback || hasError ? (
                <div className={styles.messages}>
                    {hasDescription ? (
                        <p id={descriptionId} className={styles.description}>
                            {description}
                        </p>
                    ) : null}
                    {hasFeedback ? (
                        <p
                            id={feedbackId}
                            className={`${styles.feedback} ${feedbackClasses[feedbackTone]}`}
                            role="status"
                        >
                            {feedback}
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
