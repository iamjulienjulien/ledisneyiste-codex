"use client";

import {
    useId,
    useRef,
    useState,
    type AriaAttributes,
    type ChangeEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import {
    PixieButton,
    type PixieButtonSize,
    type PixieButtonVariant,
} from "@/components/ui/PixieButton";
import { PixieField } from "@/components/ui/PixieField";
import { PixieInput } from "@/components/ui/PixieInput";
import styles from "./PixieDustSearchField.module.css";
import type {
    PixieDustSearchFieldComposition,
    PixieDustSearchFieldLayout,
    PixieDustSearchFieldProps,
} from "./PixieDustSearchField.types";

const layoutClasses = {
    inline: styles.inline,
    stacked: styles.stacked,
    responsive: styles.responsive,
} as const satisfies Record<PixieDustSearchFieldLayout, string>;

const compositionClasses = {
    separate: styles.separate,
    joined: styles.joined,
    embedded: styles.embedded,
} as const satisfies Record<PixieDustSearchFieldComposition, string>;

const buttonSizes = {
    xs: "xs",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const satisfies Record<
    NonNullable<PixieDustSearchFieldProps["size"]>,
    PixieButtonSize
>;

type CommandContentProps = Readonly<{
    icon?: ReactNode;
    label: string;
    labelHidden?: boolean;
}>;

function CommandContent({
    icon,
    label,
    labelHidden = false,
}: CommandContentProps) {
    return (
        <>
            {icon ? (
                <span aria-hidden="true" className={styles.commandIcon}>
                    {icon}
                </span>
            ) : null}
            <span className={labelHidden ? styles.visuallyHidden : undefined}>
                {label}
            </span>
        </>
    );
}

type SearchControlProps = Readonly<{
    id?: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    variant: NonNullable<PixieDustSearchFieldProps["variant"]>;
    size: NonNullable<PixieDustSearchFieldProps["size"]>;
    shape: NonNullable<PixieDustSearchFieldProps["shape"]>;
    tone: NonNullable<PixieDustSearchFieldProps["tone"]>;
    color: NonNullable<PixieDustSearchFieldProps["color"]>;
    composition: PixieDustSearchFieldComposition;
    layout: PixieDustSearchFieldLayout;
    submitVariant: PixieButtonVariant;
    submitLabel: string;
    submitIcon?: ReactNode;
    submitLabelHidden: boolean;
    searchIcon?: ReactNode;
    clearIcon?: ReactNode;
    clearLabel: string;
    showClear: boolean;
    busy: boolean;
    disabled: boolean;
    required: boolean;
    autoComplete?: string;
    autoFocus: boolean;
    minLength?: number;
    maxLength?: number;
    spellCheck?: boolean;
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
    onKeyDown,
    placeholder,
    variant,
    size,
    shape,
    tone,
    color,
    composition,
    layout,
    submitVariant,
    submitLabel,
    submitIcon,
    submitLabelHidden,
    searchIcon,
    clearIcon,
    clearLabel,
    showClear,
    busy,
    disabled,
    required,
    autoComplete,
    autoFocus,
    minLength,
    maxLength,
    spellCheck,
    inputClassName,
    inputRef,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
}: SearchControlProps) {
    const buttonSize = buttonSizes[size];
    const resolvedSubmitIcon = submitIcon ?? (submitLabelHidden ? "⌕" : null);
    const clearCommand = showClear ? (
        <PixieButton
            type="button"
            variant="ghost"
            size={composition === "separate" ? buttonSize : "xs"}
            color={color}
            disabled={disabled || busy}
            aria-label={clearLabel}
            title={clearLabel}
            className={styles.clearButton}
            onClick={onClear}
        >
            <CommandContent icon={clearIcon} label={clearLabel} labelHidden />
        </PixieButton>
    ) : null;
    const submitCommand = (
        <PixieButton
            type="submit"
            variant={composition === "embedded" ? "ghost" : submitVariant}
            size={composition === "embedded" ? "xs" : buttonSize}
            color={color}
            loading={busy}
            disabled={disabled}
            aria-label={submitLabelHidden ? submitLabel : undefined}
            className={`${styles.submitButton} ${submitLabelHidden ? styles.iconButton : ""}`.trim()}
        >
            <CommandContent
                icon={resolvedSubmitIcon}
                label={submitLabel}
                labelHidden={submitLabelHidden}
            />
        </PixieButton>
    );
    const endAction =
        composition === "embedded" ? (
            <span className={styles.embeddedCommands}>
                {clearCommand}
                {submitCommand}
            </span>
        ) : composition === "joined" ? (
            clearCommand
        ) : null;

    return (
        <div
            className={`${styles.controls} ${layoutClasses[layout]} ${compositionClasses[composition]}`}
            data-composition={composition}
            data-layout={layout}
            data-shape={shape}
        >
            <PixieInput
                ref={inputRef}
                id={id}
                type="search"
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                variant={variant}
                size={size}
                shape={shape}
                tone={tone}
                color={color}
                busy={busy}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                minLength={minLength}
                maxLength={maxLength}
                spellCheck={spellCheck}
                aria-describedby={ariaDescribedBy}
                aria-errormessage={ariaErrorMessage}
                aria-invalid={ariaInvalid}
                aria-required={ariaRequired}
                startAdornment={searchIcon}
                endAction={endAction}
                className={
                    composition === "joined" ? styles.joinedInput : undefined
                }
                inputClassName={`${styles.searchInput} ${inputClassName}`.trim()}
            />

            {composition === "separate" ? clearCommand : null}
            {composition !== "embedded" ? submitCommand : null}
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
    feedback,
    feedbackTone = "success",
    meta,
    variant = "outline",
    size = "md",
    shape = "rounded",
    tone = "neutral",
    color = false,
    composition = "separate",
    layout = "responsive",
    submitVariant = "solid",
    submitLabel = "Rechercher",
    submitIcon,
    submitLabelHidden = false,
    searchIcon = "⌕",
    clearIcon = "×",
    clearLabel = "Effacer la recherche",
    clearable = true,
    clearOnEscape = true,
    labelHidden = false,
    busy = false,
    disabled = false,
    required = false,
    autoComplete,
    autoFocus = false,
    minLength,
    maxLength,
    spellCheck,
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

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (
            event.key === "Escape" &&
            clearOnEscape &&
            showClear &&
            !disabled &&
            !busy
        ) {
            event.preventDefault();
            handleClear();
        }
    }

    const fieldRequirement = required
        ? ({ required: true } as const)
        : ({} as const);
    const hasError = error !== undefined && error !== null;
    const hasFeedback = feedback !== undefined && feedback !== null;
    const fieldFeedback = hasError
        ? ({ error } as const)
        : hasFeedback
          ? ({ feedback, feedbackTone } as const)
          : ({} as const);

    return (
        <div className={`${styles.root} ${className}`.trim()}>
            <form
                role="search"
                aria-label={typeof label === "string" ? label : undefined}
                aria-busy={busy || undefined}
                action={action}
                method={method}
                onSubmit={onSubmit}
                className={`${styles.form} ${formClassName}`.trim()}
                data-pixie-search-composition={composition}
            >
                <PixieField
                    controlId={inputId}
                    label={label}
                    description={description}
                    meta={meta}
                    labelHidden={labelHidden}
                    {...fieldFeedback}
                    {...fieldRequirement}
                >
                    <SearchControl
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        onClear={handleClear}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        variant={variant}
                        size={size}
                        shape={shape}
                        tone={tone}
                        color={color}
                        composition={composition}
                        layout={layout}
                        submitVariant={submitVariant}
                        submitLabel={submitLabel}
                        submitIcon={submitIcon}
                        submitLabelHidden={submitLabelHidden}
                        searchIcon={searchIcon}
                        clearIcon={clearIcon}
                        clearLabel={clearLabel}
                        showClear={showClear}
                        busy={busy}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        autoFocus={autoFocus}
                        minLength={minLength}
                        maxLength={maxLength}
                        spellCheck={spellCheck}
                        inputClassName={inputClassName}
                        inputRef={inputRef}
                    />
                </PixieField>
            </form>
        </div>
    );
}
