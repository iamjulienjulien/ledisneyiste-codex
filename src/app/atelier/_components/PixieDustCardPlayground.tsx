"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustCard,
    type PixieDustCardColor,
    type PixieDustCardEffect,
    type PixieDustCardElement,
    type PixieDustCardPadding,
    type PixieDustCardRadius,
    type PixieDustCardVariant,
} from "@/components/ui/PixieDustCard";
import { PixieLink } from "@/components/ui/PixieLink";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "surface", label: "Surface" },
    { value: "outline", label: "Contour" },
    { value: "elevated", label: "Élevé" },
    { value: "accent", label: "Accent" },
] as const;

const paddings = [
    { value: "none", label: "Aucun" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
] as const;

const radii = [
    { value: "none", label: "Aucun" },
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
] as const;

const effects = [
    { value: "none", label: "Aucun" },
    { value: "lift", label: "Élévation" },
    { value: "projector", label: "Projecteur" },
] as const;

const elements = ["div", "article", "section", "li"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-2xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustCardPlayground() {
    const [element, setElement] = useState<PixieDustCardElement>("article");
    const [variant, setVariant] = useState<PixieDustCardVariant>("accent");
    const [padding, setPadding] = useState<PixieDustCardPadding>("md");
    const [radius, setRadius] = useState<PixieDustCardRadius>("medium");
    const [effect, setEffect] = useState<PixieDustCardEffect>("projector");
    const [color, setColor] = useState<PixieDustCardColor>("rouge-crayon");
    const [effectPreview, setEffectPreview] = useState(false);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");
    const cardCode = `<PixieDustCard
    as="${element}"
    variant="${variant}"${color ? `\n    color="${color}"` : ""}
    padding="${padding}"
    radius="${radius}"
    effect="${effect}"
>
    {/* Contenu libre */}
</PixieDustCard>`;
    const code =
        element === "li"
            ? `<ul>\n${cardCode
                  .split("\n")
                  .map((line) => `    ${line}`)
                  .join("\n")}\n</ul>`
            : cardCode;
    const preview = (
        <PixieDustCard
            as={element}
            variant={variant}
            color={color}
            padding={padding}
            radius={radius}
            effect={effect}
            data-effect-preview={effectPreview ? "true" : undefined}
        >
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                Archive en préparation
            </p>
            <h4 className="mt-3 text-2xl text-ink">
                Une surface laisse le contenu jouer
            </h4>
            <p className="mt-4 leading-7 text-ink-soft">
                La carte installe le décor sans décider de la distribution des
                informations qu’elle accueille.
            </p>
            <PixieLink
                href="#pixie-dust-card-playground"
                variant="action"
                color={color}
                indicator="arrow"
                className="mt-6"
            >
                Examiner le plan
            </PixieLink>
        </PixieDustCard>
    );

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
                                htmlFor="card-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="card-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustCardElement,
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
                                Variant
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="card-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
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
                                        name="card-padding"
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
                                        name="card-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Effet
                            </legend>
                            <div className="mt-3 space-y-2">
                                {effects.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="card-effect"
                                        {...option}
                                        selectedValue={effect}
                                        onChange={setEffect}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="card-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="card-color"
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
                                checked={effectPreview}
                                onChange={(event) =>
                                    setEffectPreview(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Maintenir l’effet visible
                        </label>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="card"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[30rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            {element === "li" ? <ul>{preview}</ul> : preview}
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
