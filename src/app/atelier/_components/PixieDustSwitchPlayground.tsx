"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieField } from "@/components/ui/PixieField";
import {
    PixieDustSwitch,
    type PixieDustSwitchSize,
    type PixieDustSwitchVariant,
} from "@/components/ui/PixieDustSwitch";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "solid", label: "Plein" },
    { value: "soft", label: "Léger" },
    { value: "outline", label: "Contour" },
] as const satisfies readonly Readonly<{
    value: PixieDustSwitchVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustSwitchSize;
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

export function PixieDustSwitchPlayground() {
    const [variant, setVariant] = useState<PixieDustSwitchVariant>("solid");
    const [size, setSize] = useState<PixieDustSwitchSize>("md");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "ambre-projecteur",
    );
    const [checked, setChecked] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const code = `<PixieField
    controlId="projection-grain"
    label="Grain de projection"${invalid ? '\n    error="Cette préférence doit être vérifiée."' : `\n    description="Le grain est actuellement ${checked ? "actif" : "inactif"}."`}${required ? "\n    required" : ""}
>
    <PixieDustSwitch
        variant="${variant}"
        size="${size}"${colorProp}
        checked={grainEnabled}
        onChange={(event) => setGrainEnabled(event.target.checked)}${disabled ? "\n        disabled" : ""}${required ? "\n        required" : ""}
    />
</PixieField>`;
    const fieldRequirement = required
        ? ({ required: true } as const)
        : ({} as const);
    const booleanControls: readonly Readonly<{
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    }>[] = [
        { label: "Préférence active", checked, onChange: setChecked },
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
                                        name="switch-variant"
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
                                        name="switch-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="switch-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switch-color"
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
                                controlId="switch-preview"
                                label="Grain de projection"
                                description={
                                    invalid
                                        ? undefined
                                        : `Le grain est actuellement ${checked ? "actif" : "inactif"}.`
                                }
                                error={
                                    invalid
                                        ? "Cette préférence doit être vérifiée."
                                        : undefined
                                }
                                {...fieldRequirement}
                            >
                                <PixieDustSwitch
                                    variant={variant}
                                    size={size}
                                    color={color === "inherit" ? false : color}
                                    checked={checked}
                                    onChange={(event) =>
                                        setChecked(event.target.checked)
                                    }
                                    disabled={disabled}
                                    required={required}
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
