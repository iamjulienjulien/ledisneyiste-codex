"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState, type Dispatch, type SetStateAction } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieField } from "@/components/ui/PixieField";
import {
    PixieDustInput,
    type PixieDustInputAlign,
    type PixieDustInputFont,
    type PixieDustInputShape,
    type PixieDustInputSize,
    type PixieDustInputTone,
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
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
];

const variants = [
    { value: "outline", label: "Contour" },
    { value: "filled", label: "Surface" },
    { value: "underline", label: "Souligné" },
    { value: "ghost", label: "Fantôme" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputVariant;
    label: string;
}>[];

const sizes = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "xl", label: "Très grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputSize;
    label: string;
}>[];

const shapes = [
    { value: "square", label: "Carrée" },
    { value: "rounded", label: "Arrondie" },
    { value: "pill", label: "Pilule" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputShape;
    label: string;
}>[];

const alignments = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputAlign;
    label: string;
}>[];

const fonts = [
    { value: "body", label: "Texte" },
    { value: "mono", label: "Monospace" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputFont;
    label: string;
}>[];

const tones = [
    { value: "neutral", label: "Neutre" },
    { value: "success", label: "Succès" },
    { value: "warning", label: "Avertissement" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputTone;
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

export function PixieDustInputPlayground() {
    const [type, setType] = useState<PixieDustInputType>("search");
    const [variant, setVariant] = useState<PixieDustInputVariant>("outline");
    const [size, setSize] = useState<PixieDustInputSize>("md");
    const [shape, setShape] = useState<PixieDustInputShape>("rounded");
    const [align, setAlign] = useState<PixieDustInputAlign>("start");
    const [font, setFont] = useState<PixieDustInputFont>("body");
    const [tone, setTone] = useState<PixieDustInputTone>("neutral");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [value, setValue] = useState("");
    const [startAdornment, setStartAdornment] = useState(true);
    const [endAdornment, setEndAdornment] = useState(true);
    const [endAction, setEndAction] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [busy, setBusy] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const toneProp = tone === "neutral" ? "" : `\n        tone="${tone}"`;
    const fieldFeedback = invalid
        ? ({
              error: "Aucune archive ne correspond à cette saisie.",
          } as const)
        : tone === "success"
          ? ({
                feedback: "La valeur peut être conservée.",
                feedbackTone: "success",
            } as const)
          : tone === "warning"
            ? ({
                  feedback: "Cette valeur mérite une vérification.",
                  feedbackTone: "warning",
              } as const)
            : ({} as const);
    const fieldMessage = invalid
        ? '\n    error="Aucune archive ne correspond à cette saisie."'
        : tone === "success"
          ? '\n    feedback="La valeur peut être conservée."\n    feedbackTone="success"'
          : tone === "warning"
            ? '\n    feedback="Cette valeur mérite une vérification."\n    feedbackTone="warning"'
            : '\n    description="Noms, titres, catégories ou collections."';
    const code = `<PixieField
    controlId="archive-search"
    label="Rechercher dans les archives"${fieldMessage}${required ? "\n    required" : ""}
>
    <PixieDustInput
        type="${type}"
        variant="${variant}"
        size="${size}"
        shape="${shape}"
        align="${align}"
        font="${font}"${colorProp}${toneProp}${startAdornment ? '\n        startAdornment="⌕"' : ""}${endAdornment ? '\n        endAdornment="⌘ K"' : ""}${endAction ? '\n        endAction={<button aria-label="Effacer">×</button>}' : ""}${busy ? "\n        busy" : ""}${invalid ? "\n        invalid" : ""}${disabled ? "\n        disabled" : ""}${readOnly ? "\n        readOnly" : ""}${required ? "\n        required" : ""}
    />
</PixieField>`;
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
        {
            label: "Action finale",
            checked: endAction,
            onChange: setEndAction,
        },
        { label: "En attente", checked: busy, onChange: setBusy },
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
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="input-type"
                                className="text-sm font-medium text-ink"
                            >
                                Type
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="input-type"
                                value={type}
                                onChange={(event) =>
                                    setType(
                                        event.target
                                            .value as PixieDustInputType,
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                {types.map((inputType) => (
                                    <option key={inputType} value={inputType}>
                                        {inputType}
                                    </option>
                                ))}
                            </PixieSelect>
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
                                htmlFor="input-shape"
                                className="text-sm font-medium text-ink"
                            >
                                Forme
                            </label>
                            <PixieSelect
                                id="input-shape"
                                className="mt-2"
                                mode="popover"
                                portal
                                size="sm"
                                value={shape}
                                onChange={(event) =>
                                    setShape(
                                        event.target
                                            .value as PixieDustInputShape,
                                    )
                                }
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
                                htmlFor="input-align"
                                className="text-sm font-medium text-ink"
                            >
                                Alignement
                            </label>
                            <PixieSelect
                                id="input-align"
                                className="mt-2"
                                mode="popover"
                                portal
                                size="sm"
                                value={align}
                                onChange={(event) =>
                                    setAlign(
                                        event.target
                                            .value as PixieDustInputAlign,
                                    )
                                }
                            >
                                {alignments.map((option) => (
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
                                htmlFor="input-font"
                                className="text-sm font-medium text-ink"
                            >
                                Typographie
                            </label>
                            <PixieSelect
                                id="input-font"
                                className="mt-2"
                                mode="popover"
                                portal
                                size="sm"
                                value={font}
                                onChange={(event) =>
                                    setFont(
                                        event.target
                                            .value as PixieDustInputFont,
                                    )
                                }
                            >
                                {fonts.map((option) => (
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
                                htmlFor="input-tone"
                                className="text-sm font-medium text-ink"
                            >
                                Ton
                            </label>
                            <PixieSelect
                                id="input-tone"
                                className="mt-2"
                                mode="popover"
                                portal
                                size="sm"
                                value={tone}
                                onChange={(event) =>
                                    setTone(
                                        event.target
                                            .value as PixieDustInputTone,
                                    )
                                }
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
                                htmlFor="input-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="input-color"
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
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieField
                                controlId="input-preview"
                                label="Rechercher dans les archives"
                                description={
                                    invalid || tone !== "neutral"
                                        ? undefined
                                        : "Noms, titres, catégories ou collections."
                                }
                                {...fieldRequirement}
                                {...fieldFeedback}
                            >
                                <PixieDustInput
                                    type={type}
                                    variant={variant}
                                    size={size}
                                    shape={shape}
                                    align={align}
                                    font={font}
                                    tone={tone}
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
                                    endAction={
                                        endAction ? (
                                            <button
                                                type="button"
                                                aria-label="Effacer la saisie"
                                                onClick={() => setValue("")}
                                            >
                                                ×
                                            </button>
                                        ) : undefined
                                    }
                                    busy={busy}
                                    invalid={invalid}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    required={required}
                                    placeholder="Mickey, Oswald, Silly Symphonies…"
                                />
                            </PixieField>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
