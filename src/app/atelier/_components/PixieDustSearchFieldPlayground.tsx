"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import type { PixieButtonVariant } from "@/components/ui/PixieButton";
import {
    PixieDustSearchField,
    type PixieDustSearchFieldComposition,
    type PixieDustSearchFieldLayout,
} from "@/components/ui/PixieDustSearchField";
import type {
    PixieInputShape,
    PixieInputSize,
    PixieInputTone,
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
    { value: "ghost", label: "Fantôme" },
] as const satisfies readonly Readonly<{
    value: PixieInputVariant;
    label: string;
}>[];

const sizes = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "xl", label: "Très grande" },
] as const satisfies readonly Readonly<{
    value: PixieInputSize;
    label: string;
}>[];

const compositions = [
    { value: "separate", label: "Séparée" },
    { value: "joined", label: "Jointe" },
    { value: "embedded", label: "Intégrée" },
] as const satisfies readonly Readonly<{
    value: PixieDustSearchFieldComposition;
    label: string;
}>[];

const shapes = [
    { value: "square", label: "Carrée" },
    { value: "rounded", label: "Arrondie" },
    { value: "pill", label: "Pilule" },
] as const satisfies readonly Readonly<{
    value: PixieInputShape;
    label: string;
}>[];

const tones = [
    { value: "neutral", label: "Neutre" },
    { value: "success", label: "Succès" },
    { value: "warning", label: "Avertissement" },
] as const satisfies readonly Readonly<{
    value: PixieInputTone;
    label: string;
}>[];

const submitVariants = [
    { value: "solid", label: "Plein" },
    { value: "soft", label: "Doux" },
    { value: "outline", label: "Contour" },
    { value: "ghost", label: "Fantôme" },
] as const satisfies readonly Readonly<{
    value: PixieButtonVariant;
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
    const [shape, setShape] = useState<PixieInputShape>("rounded");
    const [tone, setTone] = useState<PixieInputTone>("neutral");
    const [composition, setComposition] =
        useState<PixieDustSearchFieldComposition>("joined");
    const [layout, setLayout] =
        useState<PixieDustSearchFieldLayout>("responsive");
    const [submitVariant, setSubmitVariant] =
        useState<PixieButtonVariant>("solid");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [query, setQuery] = useState("mickey");
    const [clearable, setClearable] = useState(true);
    const [labelHidden, setLabelHidden] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [busy, setBusy] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(false);
    const [clearOnEscape, setClearOnEscape] = useState(true);
    const [submitLabelHidden, setSubmitLabelHidden] = useState(false);
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
    shape="${shape}"
    tone="${tone}"
    composition="${composition}"
    layout="${layout}"
    submitVariant="${submitVariant}"${colorProp}${clearable ? "" : "\n    clearable={false}"}${clearOnEscape ? "" : "\n    clearOnEscape={false}"}${labelHidden ? "\n    labelHidden" : ""}${submitLabelHidden ? "\n    submitLabelHidden" : ""}${invalid ? '\n    error="Précisez le nom ou le titre recherché."' : successful ? '\n    feedback="23 archives trouvées."' : '\n    description="Noms, titres, catégories ou collections."'}${busy ? "\n    busy" : ""}${disabled ? "\n    disabled" : ""}${required ? "\n    required" : ""}
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
        {
            label: "Résultats trouvés",
            checked: successful,
            onChange: setSuccessful,
        },
        { label: "Recherche en cours", checked: busy, onChange: setBusy },
        { label: "Désactivé", checked: disabled, onChange: setDisabled },
        { label: "Obligatoire", checked: required, onChange: setRequired },
        {
            label: "Effacer avec Échap",
            checked: clearOnEscape,
            onChange: setClearOnEscape,
        },
        {
            label: "Masquer le libellé du bouton",
            checked: submitLabelHidden,
            onChange: setSubmitLabelHidden,
        },
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

                        <div>
                            <label
                                htmlFor="search-field-composition"
                                className="text-sm font-medium text-ink"
                            >
                                Composition
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="search-field-composition"
                                value={composition}
                                onChange={(event) =>
                                    setComposition(
                                        event.target
                                            .value as PixieDustSearchFieldComposition,
                                    )
                                }
                                className="mt-2"
                            >
                                {compositions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

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
                                htmlFor="search-field-shape"
                                className="text-sm font-medium text-ink"
                            >
                                Forme
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="search-field-shape"
                                value={shape}
                                onChange={(event) =>
                                    setShape(
                                        event.target.value as PixieInputShape,
                                    )
                                }
                                className="mt-2"
                            >
                                {shapes.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="search-field-tone"
                                className="text-sm font-medium text-ink"
                            >
                                Ton
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="search-field-tone"
                                value={tone}
                                onChange={(event) =>
                                    setTone(
                                        event.target.value as PixieInputTone,
                                    )
                                }
                                className="mt-2"
                            >
                                {tones.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="search-field-submit-variant"
                                className="text-sm font-medium text-ink"
                            >
                                Bouton de soumission
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="search-field-submit-variant"
                                value={submitVariant}
                                onChange={(event) =>
                                    setSubmitVariant(
                                        event.target
                                            .value as PixieButtonVariant,
                                    )
                                }
                                className="mt-2"
                            >
                                {submitVariants.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

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
                                {...(invalid
                                    ? {
                                          error: "Précisez le nom ou le titre recherché.",
                                      }
                                    : successful
                                      ? {
                                            feedback: "23 archives trouvées.",
                                            meta: "23 résultats",
                                        }
                                      : {
                                            description:
                                                "Noms, titres, catégories ou collections.",
                                        })}
                                variant={variant}
                                size={size}
                                shape={shape}
                                tone={tone}
                                composition={composition}
                                layout={layout}
                                submitVariant={submitVariant}
                                submitLabelHidden={submitLabelHidden}
                                color={color === "inherit" ? false : color}
                                clearable={clearable}
                                clearOnEscape={clearOnEscape}
                                labelHidden={labelHidden}
                                busy={busy}
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
