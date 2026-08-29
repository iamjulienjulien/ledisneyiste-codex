"use client";

import {
    useId,
    useRef,
    useState,
    type AriaAttributes,
    type ChangeEvent,
} from "react";
import { PixieButton, type PixieButtonSize } from "@/components/ui/PixieButton";
import { PixieField } from "@/components/ui/PixieField";
import { PixieDustInput } from "@/components/ui/PixieDustInput";
import styles from "./PixieDustSearchField.module.css";
import type {
    PixieDustSearchFieldLayout,
    PixieDustSearchFieldProps,
} from "./PixieDustSearchField.types";

const layoutClasses = {
    inline: styles.inline,
    stacked: styles.stacked,
    responsive: styles.responsive,
} as const satisfies Record<PixieDustSearchFieldLayout, string>;

const buttonSizes = {
    sm: "xs",
    md: "md",
    lg: "lg",
} as const satisfies Record<"sm" | "md" | "lg", PixieButtonSize>;

type SearchControlProps = Readonly<{
    id?: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    placeholder?: string;
    variant: NonNullable<PixieDustSearchFieldProps["variant"]>;
    size: NonNullable<PixieDustSearchFieldProps["size"]>;
    color: NonNullable<PixieDustSearchFieldProps["color"]>;
    layout: PixieDustSearchFieldLayout;
    submitLabel: string;
    clearLabel: string;
    showClear: boolean;
    disabled: boolean;
    required: boolean;
    inputClassName: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}>;

function SearchControl({
    id,
    name,
    value,
    onChange,
    onClear,
    placeholder,
    variant,
    size,
    color,
    layout,
    submitLabel,
    clearLabel,
    showClear,
    disabled,
    required,
    inputClassName,
    inputRef,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
}: SearchControlProps) {
    const buttonSize = buttonSizes[size];

    return (
        <div className={`${styles.controls} ${layoutClasses[layout]}`}>
            <PixieDustInput
                ref={inputRef}
                id={id}
                type="search"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                variant={variant}
                size={size}
                color={color}
                disabled={disabled}
                required={required}
                aria-describedby={ariaDescribedBy}
                aria-errormessage={ariaErrorMessage}
                aria-invalid={ariaInvalid}
                aria-required={ariaRequired}
                startAdornment="⌕"
                inputClassName={`${styles.searchInput} ${inputClassName}`.trim()}
            />

            {showClear ? (
                <PixieButton
                    type="button"
                    variant="ghost"
                    size={buttonSize}
                    color={color}
                    disabled={disabled}
                    aria-label={clearLabel}
                    title={clearLabel}
                    className={styles.clearButton}
                    onClick={onClear}
                >
                    ×
                </PixieButton>
            ) : null}

            <PixieButton
                type="submit"
                size={buttonSize}
                color={color}
                disabled={disabled}
                className={styles.submitButton}
            >
                {submitLabel}
            </PixieButton>
        </div>
    );
}

export function PixieDustSearchField({
    label,
    id,
    name = "q",
    action,
    method = "get",
    value,
    defaultValue = "",
    onChange,
    onSubmit,
    onClear,
    placeholder,
    description,
    error,
    variant = "outline",
    size = "md",
    color = false,
    layout = "responsive",
    submitLabel = "Rechercher",
    clearLabel = "Effacer la recherche",
    clearable = true,
    labelHidden = false,
    disabled = false,
    required = false,
    className = "",
    formClassName = "",
    inputClassName = "",
}: PixieDustSearchFieldProps) {
    const generatedId = useId();
    const inputId = id ?? `pixie-search-${generatedId.replaceAll(":", "")}`;
    const inputRef = useRef<HTMLInputElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;
    const canClearControlledValue = !isControlled || onClear !== undefined;
    const showClear =
        clearable && currentValue.length > 0 && canClearControlledValue;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (!isControlled) {
            setUncontrolledValue(event.target.value);
        }
        onChange?.(event);
    }

    function handleClear() {
        if (!isControlled) {
            setUncontrolledValue("");
        }
        onClear?.();
        inputRef.current?.focus();
    }

    const fieldRequirement = required
        ? ({ required: true } as const)
        : ({} as const);

    return (
        <div className={`${styles.root} ${className}`.trim()}>
            <form
                role="search"
                aria-label={typeof label === "string" ? label : undefined}
                action={action}
                method={method}
                onSubmit={onSubmit}
                className={`${styles.form} ${formClassName}`.trim()}
            >
                <PixieField
                    controlId={inputId}
                    label={label}
                    description={description}
                    error={error}
                    labelHidden={labelHidden}
                    {...fieldRequirement}
                >
                    <SearchControl
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        onClear={handleClear}
                        placeholder={placeholder}
                        variant={variant}
                        size={size}
                        color={color}
                        layout={layout}
                        submitLabel={submitLabel}
                        clearLabel={clearLabel}
                        showClear={showClear}
                        disabled={disabled}
                        required={required}
                        inputClassName={inputClassName}
                        inputRef={inputRef}
                    />
                </PixieField>
            </form>
        </div>
    );
}
