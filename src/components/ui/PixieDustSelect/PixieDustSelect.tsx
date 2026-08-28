"use client";

import {
    Children,
    Fragment,
    isValidElement,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { getAtelierAnimationColor } from "@/registry/colors";
import styles from "./PixieDustSelect.module.css";
import type {
    PixieDustSelectItem,
    PixieDustSelectOption,
    PixieDustSelectOptionGroup,
    PixieDustSelectPortalStyle,
    PixieDustSelectProps,
    PixieDustSelectSize,
    PixieDustSelectStyle,
    PixieDustSelectVariant,
} from "./PixieDustSelect.types";
import type {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FormEvent,
    KeyboardEvent,
    ReactNode,
    Ref,
} from "react";

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

const portalTokens = [
    "--color-canvas",
    "--color-surface",
    "--color-surface-muted",
    "--color-ink",
    "--color-ink-soft",
    "--color-muted",
    "--color-line",
    "--color-line-strong",
    "--color-accent",
    "--radius-small",
    "--shadow-soft",
    "--pixie-select-active-color",
] as const;

function isAriaInvalid(value: PixieDustSelectProps["aria-invalid"]) {
    return value !== undefined && value !== false && value !== "false";
}

function normalizeValue(value: unknown) {
    if (Array.isArray(value)) {
        return value.length > 0 ? String(value[0]) : "";
    }

    return value === undefined || value === null ? undefined : String(value);
}

function getTextContent(node: ReactNode): string {
    return Children.toArray(node)
        .map((child) => {
            if (typeof child === "string" || typeof child === "number") {
                return String(child);
            }

            if (isValidElement<{ children?: ReactNode }>(child)) {
                return getTextContent(child.props.children);
            }

            return "";
        })
        .join("")
        .trim();
}

function createOption(
    props: ComponentPropsWithoutRef<"option">,
    index: number,
    inheritedDisabled = false,
): PixieDustSelectOption {
    const label = props.label ?? getTextContent(props.children);

    return {
        kind: "option",
        value: normalizeValue(props.value) ?? label,
        label,
        disabled: inheritedDisabled || Boolean(props.disabled),
        placeholder: false,
        index,
    };
}

function readOptions(children: ReactNode, placeholder?: string) {
    const items: PixieDustSelectItem[] = [];
    const options: PixieDustSelectOption[] = [];
    let optionIndex = 0;

    if (placeholder) {
        const placeholderOption: PixieDustSelectOption = {
            kind: "option",
            value: "",
            label: placeholder,
            disabled: false,
            placeholder: true,
            index: optionIndex,
        };

        optionIndex += 1;
        items.push(placeholderOption);
        options.push(placeholderOption);
    }

    function collectGroupOptions(
        groupChildren: ReactNode,
        groupDisabled: boolean,
    ) {
        const groupOptions: PixieDustSelectOption[] = [];

        Children.forEach(groupChildren, (child) => {
            if (!isValidElement<{ children?: ReactNode }>(child)) {
                return;
            }

            if (child.type === Fragment) {
                groupOptions.push(
                    ...collectGroupOptions(child.props.children, groupDisabled),
                );
                return;
            }

            if (child.type !== "option") {
                return;
            }

            const option = createOption(
                child.props as ComponentPropsWithoutRef<"option">,
                optionIndex,
                groupDisabled,
            );
            optionIndex += 1;
            groupOptions.push(option);
            options.push(option);
        });

        return groupOptions;
    }

    function collectItems(nodes: ReactNode) {
        Children.forEach(nodes, (child) => {
            if (!isValidElement<{ children?: ReactNode }>(child)) {
                return;
            }

            if (child.type === Fragment) {
                collectItems(child.props.children);
                return;
            }

            if (child.type === "option") {
                const option = createOption(
                    child.props as ComponentPropsWithoutRef<"option">,
                    optionIndex,
                );
                optionIndex += 1;
                items.push(option);
                options.push(option);
                return;
            }

            if (child.type === "optgroup") {
                const groupProps =
                    child.props as ComponentPropsWithoutRef<"optgroup">;
                const group: PixieDustSelectOptionGroup = {
                    kind: "group",
                    label: groupProps.label ?? "",
                    disabled: Boolean(groupProps.disabled),
                    options: collectGroupOptions(
                        groupProps.children,
                        Boolean(groupProps.disabled),
                    ),
                };
                items.push(group);
            }
        });
    }

    collectItems(children);

    return { items, options };
}

function setForwardedRef(
    ref: Ref<HTMLSelectElement> | undefined,
    node: HTMLSelectElement | null,
) {
    if (typeof ref === "function") {
        ref(node);
    } else if (ref) {
        ref.current = node;
    }
}

function normalizeSearchText(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
}

function findEnabledOption(
    options: readonly PixieDustSelectOption[],
    startIndex: number,
    direction: 1 | -1,
) {
    if (options.length === 0) {
        return -1;
    }

    for (let offset = 1; offset <= options.length; offset += 1) {
        const candidateIndex =
            (startIndex + direction * offset + options.length) % options.length;
        if (!options[candidateIndex]?.disabled) {
            return candidateIndex;
        }
    }

    return -1;
}

function SelectChevron() {
    return (
        <svg
            aria-hidden="true"
            className={styles.chevron}
            viewBox="0 0 16 16"
            fill="none"
        >
            <path d="m4 6 4 4 4-4" />
        </svg>
    );
}

export function PixieDustSelect({
    children,
    variant = "outline",
    size = "md",
    color = false,
    mode = "native",
    portal = false,
    placeholder,
    invalid = false,
    className = "",
    selectClassName = "",
    style,
    disabled = false,
    required = false,
    id,
    value,
    defaultValue,
    tabIndex,
    autoFocus,
    ref,
    onChange,
    onInvalid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...selectProps
}: PixieDustSelectProps) {
    const generatedId = useId();
    const rootRef = useRef<HTMLSpanElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const nativeSelectRef = useRef<HTMLSelectElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const typeaheadRef = useRef({ query: "", timestamp: 0 });
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [nativeInvalid, setNativeInvalid] = useState(false);
    const [portalStyle, setPortalStyle] =
        useState<PixieDustSelectPortalStyle>();
    const { items, options } = useMemo(
        () => readOptions(children, placeholder),
        [children, placeholder],
    );
    const controlledValue = normalizeValue(value);
    const initialValue =
        normalizeValue(defaultValue) ?? options.at(0)?.value ?? "";
    const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
    const selectedValue = controlledValue ?? uncontrolledValue;
    const selectedOption = options.find(
        (option) => option.value === selectedValue,
    );
    const isOpen = open && !disabled;
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const rootStyle: PixieDustSelectStyle | undefined = colorDefinition
        ? { "--pixie-select-color": colorDefinition.cssValue }
        : undefined;
    const isInvalid = invalid || nativeInvalid || isAriaInvalid(ariaInvalid);
    const controlId = id ?? `pixie-select-${generatedId}`;
    const listboxId = `${controlId}-listbox`;
    const nativeId = mode === "native" ? controlId : `${controlId}-native`;

    const setNativeSelectNode = useCallback(
        (node: HTMLSelectElement | null) => {
            nativeSelectRef.current = node;
            setForwardedRef(ref, node);
        },
        [ref],
    );

    const getInitialActiveIndex = useCallback(
        (direction: 1 | -1 = 1) => {
            const selectedIndex = options.findIndex(
                (option) => option.value === selectedValue && !option.disabled,
            );

            if (selectedIndex >= 0) {
                return selectedIndex;
            }

            return findEnabledOption(
                options,
                direction === 1 ? -1 : 0,
                direction,
            );
        },
        [options, selectedValue],
    );

    const openPopover = useCallback(
        (direction: 1 | -1 = 1) => {
            if (disabled) {
                return;
            }

            setActiveIndex(getInitialActiveIndex(direction));
            setOpen(true);
        },
        [disabled, getInitialActiveIndex],
    );

    const closePopover = useCallback(() => {
        setOpen(false);
        typeaheadRef.current = { query: "", timestamp: 0 };
    }, []);

    const handleNativeChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            if (controlledValue === undefined) {
                setUncontrolledValue(event.currentTarget.value);
            }

            if (event.currentTarget.value !== "") {
                setNativeInvalid(false);
            }

            onChange?.(event);
        },
        [controlledValue, onChange],
    );

    const handleNativeInvalid = useCallback(
        (event: FormEvent<HTMLSelectElement>) => {
            onInvalid?.(event);

            if (mode === "popover") {
                event.preventDefault();
                setNativeInvalid(true);
                triggerRef.current?.focus();
            }
        },
        [mode, onInvalid],
    );

    const selectOption = useCallback(
        (option: PixieDustSelectOption) => {
            if (option.disabled) {
                return;
            }

            const nativeSelect = nativeSelectRef.current;
            if (!nativeSelect) {
                return;
            }

            const valueSetter = Object.getOwnPropertyDescriptor(
                HTMLSelectElement.prototype,
                "value",
            )?.set;

            if (valueSetter) {
                valueSetter.call(nativeSelect, option.value);
            } else {
                nativeSelect.value = option.value;
            }

            nativeSelect.dispatchEvent(new Event("input", { bubbles: true }));
            nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
            closePopover();
            triggerRef.current?.focus();
        },
        [closePopover],
    );

    const moveActiveOption = useCallback(
        (direction: 1 | -1) => {
            setActiveIndex((currentIndex) =>
                findEnabledOption(options, currentIndex, direction),
            );
        },
        [options],
    );

    const handleTriggerKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                if (isOpen) {
                    moveActiveOption(1);
                } else {
                    openPopover(1);
                }
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                if (isOpen) {
                    moveActiveOption(-1);
                } else {
                    openPopover(-1);
                }
                return;
            }

            if (event.key === "Home" && isOpen) {
                event.preventDefault();
                setActiveIndex(findEnabledOption(options, -1, 1));
                return;
            }

            if (event.key === "End" && isOpen) {
                event.preventDefault();
                setActiveIndex(findEnabledOption(options, 0, -1));
                return;
            }

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!isOpen) {
                    openPopover(1);
                    return;
                }

                const activeOption = options[activeIndex];
                if (activeOption) {
                    selectOption(activeOption);
                }
                return;
            }

            if (event.key === "Escape" && isOpen) {
                event.preventDefault();
                closePopover();
                return;
            }

            if (event.key === "Tab") {
                closePopover();
                return;
            }

            if (
                event.key.length !== 1 ||
                event.ctrlKey ||
                event.metaKey ||
                event.altKey
            ) {
                return;
            }

            const now = performance.now();
            const previous = typeaheadRef.current;
            const query =
                now - previous.timestamp > 700
                    ? event.key
                    : `${previous.query}${event.key}`;
            typeaheadRef.current = { query, timestamp: now };
            const normalizedQuery = normalizeSearchText(query);
            const startIndex = activeIndex >= 0 ? activeIndex : -1;

            for (let offset = 1; offset <= options.length; offset += 1) {
                const candidateIndex =
                    (startIndex + offset + options.length) % options.length;
                const candidate = options[candidateIndex];
                if (
                    candidate &&
                    !candidate.disabled &&
                    normalizeSearchText(candidate.label).startsWith(
                        normalizedQuery,
                    )
                ) {
                    event.preventDefault();
                    setActiveIndex(candidateIndex);
                    setOpen(true);
                    break;
                }
            }
        },
        [
            activeIndex,
            closePopover,
            moveActiveOption,
            isOpen,
            openPopover,
            options,
            selectOption,
        ],
    );

    const updatePortalPosition = useCallback(() => {
        const trigger = triggerRef.current;
        const root = rootRef.current;
        if (!trigger || !root) {
            return;
        }

        const rect = trigger.getBoundingClientRect();
        const viewportGap = 8;
        const popoverGap = 6;
        const spaceBelow =
            window.innerHeight - rect.bottom - viewportGap - popoverGap;
        const spaceAbove = rect.top - viewportGap - popoverGap;
        const opensAbove = spaceBelow < 176 && spaceAbove > spaceBelow;
        const availableHeight = Math.max(
            96,
            Math.min(320, opensAbove ? spaceAbove : spaceBelow),
        );
        const width = Math.min(rect.width, window.innerWidth - viewportGap * 2);
        const left = Math.min(
            Math.max(viewportGap, rect.left),
            window.innerWidth - width - viewportGap,
        );
        const computedStyle = window.getComputedStyle(root);
        const nextStyle: PixieDustSelectPortalStyle = {
            position: "fixed",
            left,
            width,
            maxHeight: availableHeight,
            top: opensAbove ? undefined : rect.bottom + popoverGap,
            bottom: opensAbove
                ? window.innerHeight - rect.top + popoverGap
                : undefined,
            colorScheme: computedStyle.colorScheme,
            direction: computedStyle.direction === "rtl" ? "rtl" : "ltr",
            fontFamily: computedStyle.fontFamily,
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            lineHeight: computedStyle.lineHeight,
        };

        portalTokens.forEach((token) => {
            const tokenValue = computedStyle.getPropertyValue(token).trim();
            if (tokenValue) {
                nextStyle[token] = tokenValue;
            }
        });

        setPortalStyle(nextStyle);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;
            if (!(target instanceof Node)) {
                return;
            }

            if (
                rootRef.current?.contains(target) ||
                popoverRef.current?.contains(target)
            ) {
                return;
            }

            closePopover();
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        return () => {
            document.removeEventListener(
                "pointerdown",
                handlePointerDown,
                true,
            );
        };
    }, [closePopover, isOpen]);

    useLayoutEffect(() => {
        if (!isOpen || !portal) {
            return;
        }

        updatePortalPosition();
        const root = rootRef.current;
        const resizeObserver =
            root && typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(updatePortalPosition)
                : null;
        if (root) {
            resizeObserver?.observe(root);
        }
        window.addEventListener("resize", updatePortalPosition);
        window.addEventListener("scroll", updatePortalPosition, true);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updatePortalPosition);
            window.removeEventListener("scroll", updatePortalPosition, true);
        };
    }, [isOpen, portal, updatePortalPosition]);

    useEffect(() => {
        if (!isOpen || activeIndex < 0) {
            return;
        }

        const popover = popoverRef.current;
        const option = document.getElementById(
            `${listboxId}-option-${activeIndex}`,
        );
        if (!popover || !option) {
            return;
        }

        const popoverRect = popover.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();
        if (optionRect.top < popoverRect.top) {
            popover.scrollTop -= popoverRect.top - optionRect.top;
        } else if (optionRect.bottom > popoverRect.bottom) {
            popover.scrollTop += optionRect.bottom - popoverRect.bottom;
        }
    }, [activeIndex, isOpen, listboxId]);

    useEffect(() => {
        if (controlledValue !== undefined) {
            return;
        }

        const form = nativeSelectRef.current?.form;
        if (!form) {
            return;
        }

        const handleReset = () => {
            queueMicrotask(() => {
                setUncontrolledValue(initialValue);
                setNativeInvalid(false);
                closePopover();
            });
        };

        form.addEventListener("reset", handleReset);
        return () => form.removeEventListener("reset", handleReset);
    }, [closePopover, controlledValue, initialValue]);

    const renderOption = (option: PixieDustSelectOption) => {
        const selected = option.value === selectedValue;
        const active = option.index === activeIndex;

        return (
            <div
                key={`${option.value}-${option.index}`}
                id={`${listboxId}-option-${option.index}`}
                role="option"
                aria-disabled={option.disabled || undefined}
                aria-selected={selected}
                className={styles.option}
                data-active={active || undefined}
                data-disabled={option.disabled || undefined}
                data-placeholder={option.placeholder || undefined}
                data-selected={selected || undefined}
                onPointerMove={() => {
                    if (!option.disabled) {
                        setActiveIndex(option.index);
                    }
                }}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
            >
                <span className={styles.optionLabel}>{option.label}</span>
                {selected ? (
                    <svg
                        aria-hidden="true"
                        className={styles.checkmark}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path d="m3 8.5 3 3 7-7" />
                    </svg>
                ) : null}
            </div>
        );
    };

    const popoverContent = (
        <div
            ref={popoverRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            aria-labelledby={
                ariaLabel ? undefined : (ariaLabelledBy ?? controlId)
            }
            className={`${styles.popover} ${portal ? styles.portalPopover : ""}`.trim()}
            style={
                portal
                    ? {
                          ...portalStyle,
                          visibility: portalStyle ? "visible" : "hidden",
                      }
                    : undefined
            }
        >
            {items.map((item, itemIndex) => {
                if (item.kind === "option") {
                    return renderOption(item);
                }

                return (
                    <div
                        key={`${item.label}-${itemIndex}`}
                        role="group"
                        aria-label={item.label}
                        className={styles.optionGroup}
                        data-disabled={item.disabled || undefined}
                    >
                        <div aria-hidden="true" className={styles.groupLabel}>
                            {item.label}
                        </div>
                        {item.options.map(renderOption)}
                    </div>
                );
            })}
        </div>
    );

    return (
        <span
            ref={rootRef}
            className={`${styles.root} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
            style={rootStyle}
            data-disabled={disabled || undefined}
            data-invalid={isInvalid || undefined}
            data-open={mode === "popover" && isOpen ? true : undefined}
            data-pixie-select-color={color || "inherit"}
            data-pixie-select-mode={mode}
            data-pixie-select-portal={
                mode === "popover" && portal ? true : undefined
            }
            data-pixie-select-size={size}
            data-pixie-select-variant={variant}
        >
            {mode === "native" ? (
                <select
                    {...selectProps}
                    id={nativeId}
                    ref={setNativeSelectNode}
                    value={selectedValue}
                    disabled={disabled}
                    required={required}
                    tabIndex={tabIndex}
                    autoFocus={autoFocus}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}
                    aria-errormessage={ariaErrorMessage}
                    aria-invalid={isInvalid ? true : ariaInvalid}
                    aria-required={ariaRequired}
                    onChange={handleNativeChange}
                    onInvalid={handleNativeInvalid}
                    className={`${styles.select} ${selectClassName}`.trim()}
                    style={style}
                >
                    {placeholder ? (
                        <option value="">{placeholder}</option>
                    ) : null}
                    {children}
                </select>
            ) : (
                <>
                    <select
                        {...selectProps}
                        id={nativeId}
                        ref={setNativeSelectNode}
                        value={selectedValue}
                        disabled={disabled}
                        required={required}
                        tabIndex={-1}
                        aria-hidden="true"
                        onChange={handleNativeChange}
                        onInvalid={handleNativeInvalid}
                        className={`${styles.nativeProxy} ${selectClassName}`.trim()}
                    >
                        {placeholder ? (
                            <option value="">{placeholder}</option>
                        ) : null}
                        {children}
                    </select>
                    <button
                        id={controlId}
                        ref={triggerRef}
                        type="button"
                        role="combobox"
                        disabled={disabled}
                        tabIndex={tabIndex}
                        autoFocus={autoFocus}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        aria-describedby={ariaDescribedBy}
                        aria-errormessage={ariaErrorMessage}
                        aria-invalid={isInvalid ? true : ariaInvalid}
                        aria-required={required ? true : ariaRequired}
                        aria-autocomplete="none"
                        aria-controls={listboxId}
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-activedescendant={
                            isOpen && activeIndex >= 0
                                ? `${listboxId}-option-${activeIndex}`
                                : undefined
                        }
                        className={styles.trigger}
                        style={style}
                        data-placeholder={
                            !selectedOption || selectedValue === ""
                        }
                        onClick={() => {
                            if (isOpen) {
                                closePopover();
                            } else {
                                openPopover(1);
                            }
                        }}
                        onKeyDown={handleTriggerKeyDown}
                    >
                        <span className={styles.value}>
                            {selectedOption?.label ?? placeholder ?? ""}
                        </span>
                    </button>
                </>
            )}

            <SelectChevron />

            {mode === "popover" && isOpen
                ? portal
                    ? createPortal(popoverContent, document.body)
                    : popoverContent
                : null}
        </span>
    );
}
