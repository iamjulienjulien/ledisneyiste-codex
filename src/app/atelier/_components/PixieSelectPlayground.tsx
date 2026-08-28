"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieDustField } from "@/components/ui/PixieDustField";
import {
    PixieSelect,
    type PixieSelectMode,
    type PixieSelectSize,
    type PixieSelectVariant,
} from "@/components/ui/PixieSelect";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "outline", label: "Contour" },
    { value: "filled", label: "Surface" },
    { value: "underline", label: "Souligné" },
] as const satisfies readonly Readonly<{
    value: PixieSelectVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieSelectSize;
    label: string;
}>[];

const modes = [
    { value: "native", label: "Menu natif" },
    { value: "popover", label: "Popover Pixie" },
] as const satisfies readonly Readonly<{
    value: PixieSelectMode;
    label: string;
}>[];

const colors: readonly Readonly<{
    value: AtelierAnimationColorSlug | "inherit";
    label: string;
}>[] = [
    { value: "inherit", label: "Héritée" },
    ...getAtelierAnimationColorSlugs().map((slug) => ({
        value: slug,
        label: getAtelierAnimationColor(slug).label,
    })),
];

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const flatOptionsCode = `    <option value="pionniers">Le temps des pionniers</option>
    <option value="chefs-oeuvre">Le temps des chefs-d’œuvre</option>`;

const groupedOptionsCode = `    <optgroup label="Premières fondations">
        <option value="alice-comedies">Alice Comedies</option>
        <option value="oswald">Oswald</option>
    </optgroup>
    <optgroup label="Le dessin trouve son langage">
        <option value="mickey-mouse">Mickey Mouse</option>
        <option value="silly-symphonies">Silly Symphonies</option>
    </optgroup>`;

export function PixieSelectPlayground() {
    const [variant, setVariant] = useState<PixieSelectVariant>("outline");
    const [size, setSize] = useState<PixieSelectSize>("md");
    const [mode, setMode] = useState<PixieSelectMode>("native");
    const [portal, setPortal] = useState(false);
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [value, setValue] = useState("");
    const [placeholder, setPlaceholder] = useState(true);
    const [grouped, setGrouped] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const placeholderProp = placeholder
        ? '\n        placeholder="Choisir une période"'
        : "";
    const modeProps =
        mode === "popover"
            ? `\n        mode="popover"${portal ? "\n        portal" : ""}`
            : "";
    const code = `<PixieDustField
    controlId="archive-period"
    label="Période des archives"${invalid ? '\n    error="Choisissez une période avant de poursuivre."' : '\n    description="Une seule période peut être retenue."'}${required ? "\n    required" : ""}
>
    <PixieSelect
        variant="${variant}"
        size="${size}"${modeProps}${colorProp}${placeholderProp}${disabled ? "\n        disabled" : ""}${required ? "\n        required" : ""}
    >
${grouped ? groupedOptionsCode : flatOptionsCode}
    </PixieSelect>
</PixieDustField>`;
    const fieldRequirement = required
        ? ({ required: true } as const)
        : ({} as const);
    const booleanControls: readonly Readonly<{
        label: string;
        checked: boolean;
        disabled?: boolean;
        onChange: (checked: boolean) => void;
    }>[] = [
        {
            label: "Instruction initiale",
            checked: placeholder,
            onChange: (nextValue) => {
                setPlaceholder(nextValue);
                if (!nextValue && value === "") {
                    setValue(grouped ? "alice-comedies" : "pionniers");
                }
            },
        },
        {
            label: "Options regroupées",
            checked: grouped,
            onChange: (nextValue) => {
                setGrouped(nextValue);
                setValue(
                    placeholder
                        ? ""
                        : nextValue
                          ? "alice-comedies"
                          : "pionniers",
                );
            },
        },
        {
            label: "Portail vers document.body",
            checked: portal,
            disabled: mode === "native",
            onChange: setPortal,
        },
        { label: "Invalide", checked: invalid, onChange: setInvalid },
        { label: "Désactivé", checked: disabled, onChange: setDisabled },
        { label: "Obligatoire", checked: required, onChange: setRequired },
    ];

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="select-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Ouverture
                            </legend>
                            <div className="mt-3 space-y-2">
                                {modes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="select-mode"
                                        {...option}
                                        selectedValue={mode}
                                        onChange={setMode}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Taille
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sizes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="select-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="select-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <select
                                id="select-color"
                                value={color}
                                onChange={(event) =>
                                    setColor(
                                        event.target.value as
                                            | AtelierAnimationColorSlug
                                            | "inherit",
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {colors.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3 text-sm text-ink-soft">
                            {booleanControls.map((control) => (
                                <label
                                    key={control.label}
                                    className={`flex items-start gap-3 ${control.disabled ? "opacity-50" : ""}`.trim()}
                                >
                                    <input
                                        type="checkbox"
                                        checked={control.checked}
                                        disabled={control.disabled}
                                        onChange={(event) =>
                                            control.onChange(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    {control.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieDustField
                                controlId="select-preview"
                                label="Période des archives"
                                description={
                                    invalid
                                        ? undefined
                                        : "Une seule période peut être retenue."
                                }
                                error={
                                    invalid
                                        ? "Choisissez une période avant de poursuivre."
                                        : undefined
                                }
                                {...fieldRequirement}
                            >
                                <PixieSelect
                                    variant={variant}
                                    size={size}
                                    mode={mode}
                                    portal={mode === "popover" && portal}
                                    color={color === "inherit" ? false : color}
                                    placeholder={
                                        placeholder
                                            ? "Choisir une période"
                                            : undefined
                                    }
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                    disabled={disabled}
                                    required={required}
                                >
                                    {grouped ? (
                                        <>
                                            <optgroup label="Premières fondations">
                                                <option value="alice-comedies">
                                                    Alice Comedies
                                                </option>
                                                <option value="oswald">
                                                    Oswald
                                                </option>
                                            </optgroup>
                                            <optgroup label="Le dessin trouve son langage">
                                                <option value="mickey-mouse">
                                                    Mickey Mouse
                                                </option>
                                                <option value="silly-symphonies">
                                                    Silly Symphonies
                                                </option>
                                            </optgroup>
                                        </>
                                    ) : (
                                        <>
                                            <option value="pionniers">
                                                Le temps des pionniers
                                            </option>
                                            <option value="chefs-oeuvre">
                                                Le temps des chefs-d’œuvre
                                            </option>
                                        </>
                                    )}
                                </PixieSelect>
                            </PixieDustField>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
