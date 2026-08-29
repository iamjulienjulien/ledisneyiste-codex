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
    PixieSwitch,
    type PixieSwitchEffect,
    type PixieSwitchMotion,
    type PixieSwitchSize,
    type PixieSwitchVariant,
} from "@/components/ui/PixieSwitch";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "solid", label: "Plein" },
    { value: "soft", label: "Léger" },
    { value: "outline", label: "Contour" },
    { value: "glass", label: "Verre" },
    { value: "projector", label: "Projecteur" },
] as const satisfies readonly Readonly<{
    value: PixieSwitchVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieSwitchSize;
    label: string;
}>[];

const motions = [
    { value: "slide", label: "Glissement" },
    { value: "snap", label: "Déclic" },
    { value: "spring", label: "Rebond" },
    { value: "none", label: "Aucun" },
] as const satisfies readonly Readonly<{
    value: PixieSwitchMotion;
    label: string;
}>[];

const effects = [
    { value: "none", label: "Aucun" },
    { value: "glow", label: "Halo" },
    { value: "dust", label: "Poussière Pixie" },
] as const satisfies readonly Readonly<{
    value: PixieSwitchEffect;
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

export function PixieSwitchPlayground() {
    const [variant, setVariant] = useState<PixieSwitchVariant>("projector");
    const [size, setSize] = useState<PixieSwitchSize>("md");
    const [motion, setMotion] = useState<PixieSwitchMotion>("spring");
    const [effect, setEffect] = useState<PixieSwitchEffect>("dust");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "ambre-projecteur",
    );
    const [checked, setChecked] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [pending, setPending] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [required, setRequired] = useState(false);
    const [icons, setIcons] = useState(true);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp = color === "inherit" ? "" : `\n        color="${color}"`;
    const code = `<PixieField
    controlId="projection-grain"
    label="Grain de projection"${invalid ? '\n    error="Cette préférence doit être vérifiée."' : `\n    description="Le grain est actuellement ${checked ? "actif" : "inactif"}."`}${required ? "\n    required" : ""}
>
    <PixieSwitch
        id="projection-grain"
        variant="${variant}"
        size="${size}"
        motion="${motion}"
        effect="${effect}"${colorProp}
        checked={grainEnabled}
        onCheckedChange={setGrainEnabled}${icons ? '\n        checkedIcon="✓"\n        uncheckedIcon="–"' : ""}${pending ? "\n        pending" : ""}${invalid ? "\n        invalid" : ""}${disabled ? "\n        disabled" : ""}${readOnly ? "\n        readOnly" : ""}${required ? "\n        required" : ""}
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
        { label: "Préférence active", checked, onChange: setChecked },
        { label: "Symboles d’état", checked: icons, onChange: setIcons },
        { label: "En attente", checked: pending, onChange: setPending },
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
                                htmlFor="switch-motion"
                                className="text-sm font-medium text-ink"
                            >
                                Mouvement
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switch-motion"
                                value={motion}
                                onChange={(event) =>
                                    setMotion(
                                        event.target.value as PixieSwitchMotion,
                                    )
                                }
                                className="mt-2"
                            >
                                {motions.map((option) => (
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
                                htmlFor="switch-effect"
                                className="text-sm font-medium text-ink"
                            >
                                Effet
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switch-effect"
                                value={effect}
                                onChange={(event) =>
                                    setEffect(
                                        event.target.value as PixieSwitchEffect,
                                    )
                                }
                                className="mt-2"
                            >
                                {effects.map((option) => (
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
                                        : pending
                                          ? "La préférence rejoint la régie…"
                                          : `Le grain est actuellement ${checked ? "actif" : "inactif"}.`
                                }
                                error={
                                    invalid
                                        ? "Cette préférence doit être vérifiée."
                                        : undefined
                                }
                                {...fieldRequirement}
                            >
                                <PixieSwitch
                                    id="switch-preview"
                                    variant={variant}
                                    size={size}
                                    motion={motion}
                                    effect={effect}
                                    color={color === "inherit" ? false : color}
                                    checked={checked}
                                    onCheckedChange={setChecked}
                                    checkedIcon={icons ? "✓" : undefined}
                                    uncheckedIcon={icons ? "–" : undefined}
                                    pending={pending}
                                    invalid={invalid}
                                    disabled={disabled}
                                    readOnly={readOnly}
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
