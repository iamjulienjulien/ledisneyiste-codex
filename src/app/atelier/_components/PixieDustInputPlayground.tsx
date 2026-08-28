"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierPlaygroundProjection } from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieDustField } from "@/components/ui/PixieDustField";
import {
    PixieDustInput,
    type PixieDustInputSize,
    type PixieDustInputType,
    type PixieDustInputVariant,
} from "@/components/ui/PixieDustInput";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const types: readonly PixieDustInputType[] = [
    "text",
    "search",
    "email",
    "password",
    "tel",
    "url",
    "number",
];

const variants = [
    { value: "outline", label: "Contour" },
    { value: "filled", label: "Surface" },
    { value: "underline", label: "Souligné" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputSize;
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
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustInputPlayground() {
    const [type, setType] = useState<PixieDustInputType>("search");
    const [variant, setVariant] = useState<PixieDustInputVariant>("outline");
    const [size, setSize] = useState<PixieDustInputSize>("md");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [value, setValue] = useState("");
    const [startAdornment, setStartAdornment] = useState(true);
    const [endAdornment, setEndAdornment] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [required, setRequired] = useState(false);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const code = `<PixieDustField
    controlId="archive-search"
    label="Rechercher dans les archives"${invalid ? '\n    error="Aucune archive ne correspond à cette saisie."' : '\n    description="Noms, titres, catégories ou collections."'}${required ? "\n    required" : ""}
>
    <PixieDustInput
        type="${type}"
        variant="${variant}"
        size="${size}"${colorProp}${startAdornment ? '\n        startAdornment="⌕"' : ""}${endAdornment ? '\n        endAdornment="⌘ K"' : ""}${disabled ? "\n        disabled" : ""}${readOnly ? "\n        readOnly" : ""}${required ? "\n        required" : ""}
    />
</PixieDustField>`;
    const fieldRequirement = required
        ? ({ required: true } as const)
        : ({} as const);
    const booleanControls: readonly Readonly<{
        label: string;
        checked: boolean;
        onChange: Dispatch<SetStateAction<boolean>>;
    }>[] = [
        {
            label: "Ornement initial",
            checked: startAdornment,
            onChange: setStartAdornment,
        },
        {
            label: "Ornement final",
            checked: endAdornment,
            onChange: setEndAdornment,
        },
        { label: "Invalide", checked: invalid, onChange: setInvalid },
        { label: "Désactivé", checked: disabled, onChange: setDisabled },
        {
            label: "Lecture seule",
            checked: readOnly,
            onChange: setReadOnly,
        },
        { label: "Obligatoire", checked: required, onChange: setRequired },
    ];

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="input-type"
                                className="text-sm font-medium text-ink"
                            >
                                Type
                            </label>
                            <select
                                id="input-type"
                                value={type}
                                onChange={(event) =>
                                    setType(
                                        event.target
                                            .value as PixieDustInputType,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {types.map((inputType) => (
                                    <option key={inputType} value={inputType}>
                                        {inputType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="input-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
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
                                        name="input-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="input-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <select
                                id="input-color"
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
                                    className="flex items-start gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={control.checked}
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
                    <AtelierRegiePlateau
                        namePrefix="input"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieDustField
                                controlId="input-preview"
                                label="Rechercher dans les archives"
                                description={
                                    invalid
                                        ? undefined
                                        : "Noms, titres, catégories ou collections."
                                }
                                error={
                                    invalid
                                        ? "Aucune archive ne correspond à cette saisie."
                                        : undefined
                                }
                                {...fieldRequirement}
                            >
                                <PixieDustInput
                                    type={type}
                                    variant={variant}
                                    size={size}
                                    color={color === "inherit" ? false : color}
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                    startAdornment={
                                        startAdornment ? "⌕" : undefined
                                    }
                                    endAdornment={
                                        endAdornment ? "⌘ K" : undefined
                                    }
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    required={required}
                                    placeholder="Mickey, Oswald, Silly Symphonies…"
                                />
                            </PixieDustField>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
