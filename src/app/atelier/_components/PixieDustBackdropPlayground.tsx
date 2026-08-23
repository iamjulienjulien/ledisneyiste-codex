"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustBackdrop,
    type PixieDustBackdropColor,
    type PixieDustBackdropElement,
    type PixieDustBackdropIntensity,
    type PixieDustBackdropPadding,
    type PixieDustBackdropPosition,
    type PixieDustBackdropRadius,
    type PixieDustBackdropVariant,
} from "@/components/ui/PixieDustBackdrop";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "wash", label: "Bain" },
    { value: "gradient", label: "Dégradé" },
    { value: "halo", label: "Halo" },
    { value: "vignette", label: "Vignette" },
    { value: "projector", label: "Projecteur" },
] as const;

const intensities = [
    { value: "subtle", label: "Discrète" },
    { value: "medium", label: "Moyenne" },
    { value: "strong", label: "Forte" },
] as const;

const positions = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const paddings = [
    { value: "none", label: "Aucun" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const radii = [
    { value: "none", label: "Aucun" },
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
] as const;

const elements = ["div", "section", "header", "footer"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-2xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustBackdropPlayground() {
    const [element, setElement] = useState<PixieDustBackdropElement>("section");
    const [variant, setVariant] =
        useState<PixieDustBackdropVariant>("projector");
    const [intensity, setIntensity] =
        useState<PixieDustBackdropIntensity>("medium");
    const [position, setPosition] =
        useState<PixieDustBackdropPosition>("start");
    const [padding, setPadding] = useState<PixieDustBackdropPadding>("lg");
    const [radius, setRadius] = useState<PixieDustBackdropRadius>("large");
    const [color, setColor] =
        useState<PixieDustBackdropColor>("ambre-projecteur");
    const [grain, setGrain] = useState(true);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        color ? `    color="${color}"` : null,
        grain ? "    grain" : null,
        element === "section" ? '    aria-labelledby="backdrop-heading"' : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustBackdrop
    as="${element}"
    variant="${variant}"
    intensity="${intensity}"
    position="${position}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    <h2 id="backdrop-heading">Les origines retrouvent leur lumière</h2>
    {/* Composition au premier plan */}
</PixieDustBackdrop>`;

    function selectColor(value: string) {
        setColor(
            value === "theme" ? false : (value as AtelierAnimationColorSlug),
        );
    }

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="backdrop-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="backdrop-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustBackdropElement,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Atmosphère
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="backdrop-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Intensité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {intensities.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="backdrop-intensity"
                                        {...option}
                                        selectedValue={intensity}
                                        onChange={setIntensity}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Position
                            </legend>
                            <div className="mt-3 space-y-2">
                                {positions.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="backdrop-position"
                                        {...option}
                                        selectedValue={position}
                                        onChange={setPosition}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement intérieur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {paddings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="backdrop-padding"
                                        {...option}
                                        selectedValue={padding}
                                        onChange={setPadding}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Rayon
                            </legend>
                            <div className="mt-3 space-y-2">
                                {radii.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="backdrop-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="backdrop-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="backdrop-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="theme">Accent du thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={grain}
                                onChange={(event) =>
                                    setGrain(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Ajouter le grain
                        </label>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="backdrop"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[38rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustBackdrop
                                as={element}
                                variant={variant}
                                intensity={intensity}
                                position={position}
                                padding={padding}
                                radius={radius}
                                color={color}
                                grain={grain}
                                aria-labelledby={
                                    element === "section"
                                        ? "backdrop-preview-heading"
                                        : undefined
                                }
                            >
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Projection générale
                                </p>
                                <h4
                                    id="backdrop-preview-heading"
                                    className="mt-3 max-w-2xl text-3xl text-ink"
                                >
                                    Les origines retrouvent leur lumière
                                </h4>
                                <p className="mt-4 max-w-xl leading-7 text-ink-soft">
                                    L’atmosphère accompagne la composition sans
                                    remplacer les surfaces qui portent le récit.
                                </p>

                                <PixieDustCard
                                    as="div"
                                    variant="outline"
                                    padding="md"
                                    className="mt-7 max-w-md backdrop-blur-[2px]"
                                >
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                        Première archive
                                    </p>
                                    <p className="mt-2 text-xl text-ink">
                                        Alice’s Wonderland · 1923
                                    </p>
                                </PixieDustCard>
                            </PixieDustBackdrop>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
