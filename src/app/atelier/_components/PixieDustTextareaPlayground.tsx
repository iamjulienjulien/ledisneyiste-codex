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
    PixieDustTextarea,
    type PixieDustTextareaResize,
    type PixieDustTextareaSize,
    type PixieDustTextareaVariant,
} from "@/components/ui/PixieDustTextarea";
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
    value: PixieDustTextareaVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustTextareaSize;
    label: string;
}>[];

const resizes = [
    { value: "none", label: "Aucun" },
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" },
    { value: "both", label: "Les deux axes" },
] as const satisfies readonly Readonly<{
    value: PixieDustTextareaResize;
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

const rowOptions = [3, 5, 7, 10] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const initialValue =
    "Cette séquence marque le moment où le mouvement, la musique et le caractère commencent à parler d’une même voix.";

export function PixieDustTextareaPlayground() {
    const [variant, setVariant] = useState<PixieDustTextareaVariant>("outline");
    const [size, setSize] = useState<PixieDustTextareaSize>("md");
    const [resize, setResize] = useState<PixieDustTextareaResize>("vertical");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [rows, setRows] = useState<number>(5);
    const [value, setValue] = useState(initialValue);
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const code = `<PixieField
    controlId="projection-note"
    label="Note de projection"${invalid ? '\n    error="La note doit préciser le raccord à conserver."' : '\n    description="Décrivez le raccord à conserver dans les archives."'}${required ? "\n    required" : ""}
>
    <PixieDustTextarea
        variant="${variant}"
        size="${size}"
        resize="${resize}"
        rows={${rows}}${colorProp}${disabled ? "\n        disabled" : ""}${readOnly ? "\n        readOnly" : ""}${required ? "\n        required" : ""}
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

                        <div>
                            <label
                                htmlFor="textarea-resize"
                                className="text-sm font-medium text-ink"
                            >
                                Redimensionnement
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="textarea-resize"
                                value={resize}
                                onChange={(event) =>
                                    setResize(
                                        event.target
                                            .value as PixieDustTextareaResize,
                                    )
                                }
                                className="mt-2"
                            >
                                {resizes.map((option) => (
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
                                htmlFor="textarea-rows"
                                className="text-sm font-medium text-ink"
                            >
                                Lignes initiales
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="textarea-rows"
                                value={rows}
                                onChange={(event) =>
                                    setRows(Number(event.target.value))
                                }
                                className="mt-2 font-mono"
                            >
                                {rowOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="textarea-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="textarea-color"
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
                        className="flex min-h-[32rem] items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieField
                                controlId="textarea-preview"
                                label="Note de projection"
                                description={
                                    invalid
                                        ? undefined
                                        : "Décrivez le raccord à conserver dans les archives."
                                }
                                error={
                                    invalid
                                        ? "La note doit préciser le raccord à conserver."
                                        : undefined
                                }
                                {...fieldRequirement}
                            >
                                <PixieDustTextarea
                                    variant={variant}
                                    size={size}
                                    resize={resize}
                                    rows={rows}
                                    color={color === "inherit" ? false : color}
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    required={required}
                                    maxLength={480}
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
