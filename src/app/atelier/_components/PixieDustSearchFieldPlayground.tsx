"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import {
    PixieDustSearchField,
    type PixieDustSearchFieldLayout,
} from "@/components/ui/PixieDustSearchField";
import type {
    PixieInputSize,
    PixieInputVariant,
} from "@/components/ui/PixieInput";
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
    value: PixieInputVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieInputSize;
    label: string;
}>[];

const layouts = [
    { value: "inline", label: "En ligne" },
    { value: "stacked", label: "Empilée" },
    { value: "responsive", label: "Responsive" },
] as const satisfies readonly Readonly<{
    value: PixieDustSearchFieldLayout;
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

export function PixieDustSearchFieldPlayground() {
    const [variant, setVariant] = useState<PixieInputVariant>("outline");
    const [size, setSize] = useState<PixieInputSize>("md");
    const [layout, setLayout] =
        useState<PixieDustSearchFieldLayout>("responsive");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [query, setQuery] = useState("mickey");
    const [clearable, setClearable] = useState(true);
    const [labelHidden, setLabelHidden] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n    color="${color}"`;
    const code = `<PixieDustSearchField
    label="Rechercher dans le Codex"
    name="q"
    action="/recherche"
    value={query}
    onChange={(event) => setQuery(event.target.value)}
    onClear={() => setQuery("")}
    placeholder="Personnage, créateur, œuvre…"
    variant="${variant}"
    size="${size}"
    layout="${layout}"${colorProp}${clearable ? "" : "\n    clearable={false}"}${labelHidden ? "\n    labelHidden" : ""}${invalid ? '\n    error="Précisez le nom ou le titre recherché."' : '\n    description="Noms, titres, catégories ou collections."'}${disabled ? "\n    disabled" : ""}${required ? "\n    required" : ""}
/>`;

    const booleanControls: readonly Readonly<{
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    }>[] = [
        {
            label: "Effacement disponible",
            checked: clearable,
            onChange: setClearable,
        },
        {
            label: "Libellé masqué",
            checked: labelHidden,
            onChange: setLabelHidden,
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
                                        name="search-field-variant"
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
                                        name="search-field-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Disposition
                            </legend>
                            <div className="mt-3 space-y-2">
                                {layouts.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="search-field-layout"
                                        {...option}
                                        selectedValue={layout}
                                        onChange={setLayout}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="search-field-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="search-field-color"
                                value={color}
                                onChange={(event) =>
                                    setColor(
                                        event.target.value as
                                            | AtelierAnimationColorSlug
                                            | "inherit",
                                    )
                                }
                                className="mt-2"
                            >
                                {colors.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
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
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieDustSearchField
                                label="Rechercher dans le Codex"
                                name="q"
                                action="/recherche"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                onClear={() => setQuery("")}
                                onSubmit={(event) => event.preventDefault()}
                                placeholder="Personnage, créateur, œuvre…"
                                description={
                                    invalid
                                        ? undefined
                                        : "Noms, titres, catégories ou collections."
                                }
                                error={
                                    invalid
                                        ? "Précisez le nom ou le titre recherché."
                                        : undefined
                                }
                                variant={variant}
                                size={size}
                                layout={layout}
                                color={color === "inherit" ? false : color}
                                clearable={clearable}
                                labelHidden={labelHidden}
                                disabled={disabled}
                                required={required}
                            />
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
