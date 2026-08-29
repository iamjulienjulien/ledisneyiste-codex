"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { PixieField } from "@/components/ui/PixieField";
import { PixieSelect } from "@/components/ui/PixieSelect";
import {
    PixieTextarea,
    type PixieTextareaEffect,
    type PixieTextareaFont,
    type PixieTextareaResize,
    type PixieTextareaShape,
    type PixieTextareaSize,
    type PixieTextareaTone,
    type PixieTextareaVariant,
} from "@/components/ui/PixieTextarea";
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
    { value: "manuscript", label: "Manuscrit" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaSize;
    label: string;
}>[];

const shapes = [
    { value: "square", label: "Carrée" },
    { value: "rounded", label: "Arrondie" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaShape;
    label: string;
}>[];

const fonts = [
    { value: "body", label: "Texte" },
    { value: "mono", label: "Monospace" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaFont;
    label: string;
}>[];

const tones = [
    { value: "neutral", label: "Neutre" },
    { value: "success", label: "Succès" },
    { value: "warning", label: "Avertissement" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaTone;
    label: string;
}>[];

const effects = [
    { value: "none", label: "Aucun" },
    { value: "ring", label: "Anneau" },
    { value: "glow", label: "Halo" },
    { value: "dust", label: "Poussière Pixie" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaEffect;
    label: string;
}>[];

const resizes = [
    { value: "none", label: "Aucun" },
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" },
    { value: "both", label: "Les deux axes" },
] as const satisfies readonly Readonly<{
    value: PixieTextareaResize;
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

const rowOptions = [2, 3, 5, 7, 10, 12] as const;
const maxLengthOptions = [120, 240, 480, 960] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const initialValue =
    "Cette séquence marque le moment où le mouvement, la musique et le caractère commencent à parler d’une même voix.";

export function PixieTextareaPlayground() {
    const [variant, setVariant] = useState<PixieTextareaVariant>("manuscript");
    const [size, setSize] = useState<PixieTextareaSize>("md");
    const [shape, setShape] = useState<PixieTextareaShape>("rounded");
    const [font, setFont] = useState<PixieTextareaFont>("body");
    const [tone, setTone] = useState<PixieTextareaTone>("neutral");
    const [effect, setEffect] = useState<PixieTextareaEffect>("dust");
    const [resize, setResize] = useState<PixieTextareaResize>("vertical");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "violet-ombre-portee",
    );
    const [rows, setRows] = useState(5);
    const [minRows, setMinRows] = useState(3);
    const [maxRows, setMaxRows] = useState(10);
    const [maxLength, setMaxLength] = useState(240);
    const [value, setValue] = useState(initialValue);
    const [autoGrow, setAutoGrow] = useState(true);
    const [showCount, setShowCount] = useState(true);
    const [adornments, setAdornments] = useState(true);
    const [footer, setFooter] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [busy, setBusy] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const toneProp = tone === "neutral" ? "" : `\n        tone="${tone}"`;
    const growProps = autoGrow
        ? `\n        autoGrow\n        minRows={${minRows}}\n        maxRows={${maxRows}}`
        : `\n        resize="${resize}"\n        rows={${rows}}`;
    const fieldFeedback = invalid
        ? ({ error: "La note doit préciser le raccord à conserver." } as const)
        : tone === "success"
          ? ({
                feedback: "La note peut rejoindre les archives.",
                feedbackTone: "success",
            } as const)
          : tone === "warning"
            ? ({
                  feedback: "Cette note mérite une relecture.",
                  feedbackTone: "warning",
              } as const)
            : ({
                  description:
                      "Décrivez le raccord à conserver dans les archives.",
              } as const);
    const fieldMessage = invalid
        ? '\n    error="La note doit préciser le raccord à conserver."'
        : tone === "success"
          ? '\n    feedback="La note peut rejoindre les archives."\n    feedbackTone="success"'
          : tone === "warning"
            ? '\n    feedback="Cette note mérite une relecture."\n    feedbackTone="warning"'
            : '\n    description="Décrivez le raccord à conserver dans les archives."';
    const code = `<PixieField
    controlId="projection-note"
    label="Note de projection"${fieldMessage}${required ? "\n    required" : ""}
>
    <PixieTextarea
        variant="${variant}"
        size="${size}"
        shape="${shape}"
        font="${font}"
        effect="${effect}"${toneProp}${colorProp}${growProps}
        maxLength={${maxLength}}${showCount ? "\n        showCount" : ""}${adornments ? '\n        startAdornment="✦"\n        endAdornment="Brouillon"' : ""}${footer ? '\n        footerStart="Sauvegarde locale"' : ""}${busy ? "\n        busy" : ""}${invalid ? "\n        invalid" : ""}${disabled ? "\n        disabled" : ""}${readOnly ? "\n        readOnly" : ""}${required ? "\n        required" : ""}
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
            label: "Croissance automatique",
            checked: autoGrow,
            onChange: setAutoGrow,
        },
        { label: "Compteur", checked: showCount, onChange: setShowCount },
        { label: "Ornements", checked: adornments, onChange: setAdornments },
        { label: "Pied de régie", checked: footer, onChange: setFooter },
        { label: "En attente", checked: busy, onChange: setBusy },
        { label: "Invalide", checked: invalid, onChange: setInvalid },
        { label: "Désactivé", checked: disabled, onChange: setDisabled },
        { label: "Lecture seule", checked: readOnly, onChange: setReadOnly },
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
                                        name="textarea-variant"
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
                                        name="textarea-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <SelectControl
                            id="textarea-shape"
                            label="Forme"
                            value={shape}
                            options={shapes}
                            onChange={(nextValue) =>
                                setShape(nextValue as PixieTextareaShape)
                            }
                        />
                        <SelectControl
                            id="textarea-font"
                            label="Typographie"
                            value={font}
                            options={fonts}
                            onChange={(nextValue) =>
                                setFont(nextValue as PixieTextareaFont)
                            }
                        />
                        <SelectControl
                            id="textarea-tone"
                            label="Ton"
                            value={tone}
                            options={tones}
                            onChange={(nextValue) =>
                                setTone(nextValue as PixieTextareaTone)
                            }
                        />
                        <SelectControl
                            id="textarea-effect"
                            label="Effet de focus"
                            value={effect}
                            options={effects}
                            onChange={(nextValue) =>
                                setEffect(nextValue as PixieTextareaEffect)
                            }
                        />
                        <SelectControl
                            id="textarea-color"
                            label="Couleur du registre"
                            value={color}
                            options={colors}
                            onChange={(nextValue) =>
                                setColor(
                                    nextValue as
                                        AtelierAnimationColorSlug | "inherit",
                                )
                            }
                        />

                        {autoGrow ? (
                            <div className="grid grid-cols-2 gap-3">
                                <NumberControl
                                    id="textarea-min-rows"
                                    label="Lignes min."
                                    value={minRows}
                                    options={rowOptions}
                                    onChange={(nextValue) => {
                                        setMinRows(nextValue);
                                        setMaxRows((currentValue) =>
                                            Math.max(currentValue, nextValue),
                                        );
                                    }}
                                />
                                <NumberControl
                                    id="textarea-max-rows"
                                    label="Lignes max."
                                    value={maxRows}
                                    options={rowOptions}
                                    onChange={(nextValue) => {
                                        setMaxRows(nextValue);
                                        setMinRows((currentValue) =>
                                            Math.min(currentValue, nextValue),
                                        );
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <SelectControl
                                    id="textarea-resize"
                                    label="Redimensionnement"
                                    value={resize}
                                    options={resizes}
                                    onChange={(nextValue) =>
                                        setResize(
                                            nextValue as PixieTextareaResize,
                                        )
                                    }
                                />
                                <NumberControl
                                    id="textarea-rows"
                                    label="Lignes initiales"
                                    value={rows}
                                    options={rowOptions}
                                    onChange={setRows}
                                />
                            </>
                        )}

                        <NumberControl
                            id="textarea-max-length"
                            label="Limite de caractères"
                            value={maxLength}
                            options={maxLengthOptions}
                            onChange={setMaxLength}
                        />

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
                        className="flex min-h-[34rem] items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieField
                                controlId="textarea-preview"
                                label="Note de projection"
                                {...fieldFeedback}
                                {...fieldRequirement}
                            >
                                <PixieTextarea
                                    id="textarea-preview"
                                    variant={variant}
                                    size={size}
                                    shape={shape}
                                    font={font}
                                    tone={tone}
                                    effect={effect}
                                    color={color === "inherit" ? false : color}
                                    resize={resize}
                                    rows={rows}
                                    autoGrow={autoGrow}
                                    minRows={minRows}
                                    maxRows={maxRows}
                                    maxLength={maxLength}
                                    showCount={showCount}
                                    startAdornment={
                                        adornments ? "✦" : undefined
                                    }
                                    endAdornment={
                                        adornments ? "Brouillon" : undefined
                                    }
                                    footerStart={
                                        footer ? "Sauvegarde locale" : undefined
                                    }
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                    busy={busy}
                                    invalid={invalid}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    required={required}
                                    placeholder="Cette séquence marque…"
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

function SelectControl({
    id,
    label,
    value,
    options,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: string;
    options: readonly Readonly<{ value: string; label: string }>[];
    onChange: (value: string) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <PixieSelect
                id={id}
                className="mt-2"
                mode="popover"
                portal
                size="sm"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </PixieSelect>
        </div>
    );
}

function NumberControl({
    id,
    label,
    value,
    options,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: number;
    options: readonly number[];
    onChange: (value: number) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <PixieSelect
                id={id}
                className="mt-2 font-mono"
                mode="popover"
                portal
                size="sm"
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </PixieSelect>
        </div>
    );
}
