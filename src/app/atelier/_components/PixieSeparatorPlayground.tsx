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
    PixieSeparator,
    type PixieSeparatorAlign,
    type PixieSeparatorIntensity,
    type PixieSeparatorPosition,
    type PixieSeparatorSpacing,
    type PixieSeparatorVariant,
    type PixieSeparatorWidth,
} from "@/components/ui/PixieSeparator";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "line", label: "Filet" },
    { value: "section", label: "Section de fiche" },
    { value: "beam", label: "Faisceau" },
    { value: "fade", label: "Fondu" },
    { value: "film", label: "Pellicule" },
    { value: "splice", label: "Raccord" },
    { value: "leader", label: "Décompte" },
] as const;

const intensities = [
    { value: "subtle", label: "Discrète" },
    { value: "strong", label: "Soutenue" },
] as const;

const colors = [
    { value: "theme", label: "Lignes du thème" },
    ...getAtelierAnimationColorSlugs().map((slug) => ({
        value: slug,
        label: getAtelierAnimationColor(slug).label,
    })),
];

const spacings = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const widths = [
    { value: "full", label: "Pleine" },
    { value: "medium", label: "Moyenne" },
    { value: "short", label: "Courte" },
] as const;

const aligns = [
    { value: "start", label: "Départ" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const frameWidths = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
} as const;

function supportsPosition(variant: PixieSeparatorVariant) {
    return (
        variant === "section" ||
        variant === "fade" ||
        variant === "splice" ||
        variant === "leader"
    );
}

export function PixieSeparatorPlayground() {
    const [variant, setVariant] = useState<PixieSeparatorVariant>("line");
    const [intensity, setIntensity] =
        useState<PixieSeparatorIntensity>("subtle");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "theme">(
        "theme",
    );
    const [spacing, setSpacing] = useState<PixieSeparatorSpacing>("md");
    const [width, setWidth] = useState<PixieSeparatorWidth>("full");
    const [align, setAlign] = useState<PixieSeparatorAlign>("center");
    const [position, setPosition] = useState<PixieSeparatorPosition>("center");
    const [decorative, setDecorative] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorCode = color === "theme" ? "" : `\n    color="${color}"`;
    const positionCode = supportsPosition(variant)
        ? `\n    position="${position}"`
        : "";
    const decorativeCode = decorative ? "\n    decorative" : "";
    const code = `<PixieSeparator
    variant="${variant}"
    intensity="${intensity}"${colorCode}
    spacing="${spacing}"
    width="${width}"
    align="${align}"${positionCode}${decorativeCode}
/>`;

    function selectVariant(nextVariant: PixieSeparatorVariant) {
        setVariant(nextVariant);

        if (nextVariant === "section" || nextVariant === "fade") {
            setPosition("start");
        } else if (nextVariant === "splice" || nextVariant === "leader") {
            setPosition("center");
        }
    }

    return (
        <div className="relative z-[10000] overflow-clip border border-line bg-surface">
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
                                        name="separator-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={selectVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {supportsPosition(variant) ? (
                            <fieldset>
                                <legend className="text-sm font-medium text-ink">
                                    Position interne
                                </legend>
                                <div className="mt-3 space-y-2">
                                    {aligns.map((option) => (
                                        <AtelierOptionRadio
                                            key={option.value}
                                            name="separator-position"
                                            {...option}
                                            selectedValue={position}
                                            onChange={setPosition}
                                        />
                                    ))}
                                </div>
                            </fieldset>
                        ) : null}

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Intensité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {intensities.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="separator-intensity"
                                        {...option}
                                        selectedValue={intensity}
                                        onChange={setIntensity}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="separator-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="separator-color"
                                value={color}
                                onChange={(event) =>
                                    setColor(
                                        event.target.value as
                                            AtelierAnimationColorSlug | "theme",
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

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Respiration
                            </legend>
                            <div className="mt-3 space-y-2">
                                {spacings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="separator-spacing"
                                        {...option}
                                        selectedValue={spacing}
                                        onChange={setSpacing}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Largeur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {widths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="separator-width"
                                        {...option}
                                        selectedValue={width}
                                        onChange={setWidth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {width !== "full" ? (
                            <fieldset>
                                <legend className="text-sm font-medium text-ink">
                                    Alignement
                                </legend>
                                <div className="mt-3 space-y-2">
                                    {aligns.map((option) => (
                                        <AtelierOptionRadio
                                            key={option.value}
                                            name="separator-align"
                                            {...option}
                                            selectedValue={align}
                                            onChange={setAlign}
                                        />
                                    ))}
                                </div>
                            </fieldset>
                        ) : null}

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={decorative}
                                onChange={(event) =>
                                    setDecorative(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Purement décoratif
                        </label>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 text-ink transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <p className="text-sm leading-6 text-ink-soft">
                                Une première séquence arrive à son terme.
                            </p>
                            <PixieSeparator
                                variant={variant}
                                intensity={intensity}
                                color={color === "theme" ? false : color}
                                spacing={spacing}
                                width={width}
                                align={align}
                                position={position}
                                decorative={decorative}
                            />
                            <p className="text-sm leading-6 text-ink-soft">
                                Une nouvelle séquence peut maintenant commencer.
                            </p>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
