"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierPlaygroundProjection } from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieCard,
    type PixieCardAccentPosition,
    type PixieCardColor,
    type PixieCardEffect,
    type PixieCardEffectIntensity,
    type PixieCardElement,
    type PixieCardPadding,
    type PixieCardRadius,
    type PixieCardVariant,
} from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "surface", label: "Surface" },
    { value: "muted", label: "Atténué" },
    { value: "outline", label: "Contour" },
    { value: "elevated", label: "Élevé" },
    { value: "accent", label: "Accent" },
    { value: "tinted", label: "Teinté" },
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

const effects = [
    { value: "none", label: "Aucun" },
    { value: "lift", label: "Élévation" },
    { value: "glow", label: "Halo" },
    { value: "reveal", label: "Révélation" },
    { value: "projector", label: "Projecteur" },
] as const;

const accentPositions = [
    { value: "top", label: "Haut" },
    { value: "end", label: "Fin" },
    { value: "bottom", label: "Bas" },
    { value: "start", label: "Début" },
] as const;

const effectIntensities = [
    { value: "subtle", label: "Subtile" },
    { value: "medium", label: "Moyenne" },
    { value: "strong", label: "Forte" },
] as const;

const contentLengths = [
    { value: "short", label: "Court" },
    { value: "medium", label: "Moyen" },
    { value: "long", label: "Long" },
] as const;

const elements = ["div", "article", "section", "li"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-2xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieCardPlayground() {
    const [element, setElement] = useState<PixieCardElement>("article");
    const [asChild, setAsChild] = useState(true);
    const [variant, setVariant] = useState<PixieCardVariant>("accent");
    const [padding, setPadding] = useState<PixieCardPadding>("md");
    const [radius, setRadius] = useState<PixieCardRadius>("medium");
    const [accentPosition, setAccentPosition] =
        useState<PixieCardAccentPosition>("top");
    const [effect, setEffect] = useState<PixieCardEffect>("projector");
    const [effectIntensity, setEffectIntensity] =
        useState<PixieCardEffectIntensity>("medium");
    const [color, setColor] = useState<PixieCardColor>("rouge-crayon");
    const [contentLength, setContentLength] = useState<
        "short" | "medium" | "long"
    >("medium");
    const [effectPreview, setEffectPreview] = useState(false);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");
    const cardCode = `<PixieCard${asChild ? "\n    asChild" : `\n    as="${element}"`}
    variant="${variant}"${color ? `\n    color="${color}"` : ""}
    padding="${padding}"
    radius="${radius}"
    accentPosition="${accentPosition}"
    effect="${effect}"
    effectIntensity="${effectIntensity}"
>
    ${
        asChild
            ? `<PixieLink href="/archives" variant="surface"${color ? ` color="${color}"` : ""}>
        {/* Contenu libre */}
    </PixieLink>`
            : "{/* Contenu libre */}"
    }
</PixieCard>`;
    const code =
        !asChild && element === "li"
            ? `<ul>\n${cardCode
                  .split("\n")
                  .map((line) => `    ${line}`)
                  .join("\n")}\n</ul>`
            : cardCode;
    const descriptions = {
        short: "La carte installe le décor sans écrire le récit.",
        medium: "La carte installe le décor sans décider de la distribution des informations qu’elle accueille.",
        long: "La carte installe le décor sans décider de la distribution des informations qu’elle accueille. Cette version volontairement développée permet d’observer les retours à la ligne, l’équilibre des espacements et la stabilité de la surface lorsque le contenu prend davantage de place.",
    } as const;
    const previewContent = (
        <>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                Archive en préparation
            </p>
            <h4 className="mt-3 text-2xl text-ink">
                Une surface laisse le contenu jouer
            </h4>
            <p className="mt-4 leading-7 text-ink-soft">
                {descriptions[contentLength]}
            </p>
        </>
    );
    const cardProps = {
        variant,
        color,
        padding,
        radius,
        accentPosition,
        effect,
        effectIntensity,
        "data-effect-preview": effectPreview ? "true" : undefined,
    } as const;
    const staticPreview = (
        <PixieCard as={element} {...cardProps}>
            {previewContent}
            <PixieLink
                href="#pixie-card-playground"
                variant="action"
                color={color}
                indicator="arrow"
                className="mt-6"
            >
                Examiner le plan
            </PixieLink>
        </PixieCard>
    );
    const slottedPreview = (
        <PixieCard asChild {...cardProps}>
            <PixieLink
                href="#pixie-card-playground"
                variant="surface"
                color={color}
            >
                {previewContent}
                <span className="mt-6 block font-medium text-accent">
                    Examiner le plan →
                </span>
            </PixieLink>
        </PixieCard>
    );
    const preview = asChild ? slottedPreview : staticPreview;

    function selectColor(value: string) {
        setColor(
            value === "theme" ? false : (value as AtelierAnimationColorSlug),
        );
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
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
                                disabled={asChild}
                                onChange={(event) =>
                                    setElement(
                                        event.target.value as PixieCardElement,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="flex cursor-pointer items-start gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={asChild}
                                onChange={(event) =>
                                    setAsChild(event.target.checked)
                                }
                                className="mt-0.5 accent-accent"
                            />
                            <span>
                                Transmettre la racine à PixieLink
                                <span className="mt-1 block text-xs leading-5 text-muted">
                                    Désactive le choix de l’élément sémantique.
                                </span>
                            </span>
                        </label>

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

                        <div>
                            <label
                                htmlFor="card-content-length"
                                className="text-sm font-medium text-ink"
                            >
                                Longueur du contenu
                            </label>
                            <select
                                id="card-content-length"
                                value={contentLength}
                                onChange={(event) =>
                                    setContentLength(
                                        event.target.value as
                                            "short" | "medium" | "long",
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {contentLengths.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                Position de l’accent
                            </legend>
                            <div className="mt-3 space-y-2">
                                {accentPositions.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="card-accent-position"
                                        {...option}
                                        selectedValue={accentPosition}
                                        onChange={setAccentPosition}
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
                                Intensité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {effectIntensities.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="card-effect-intensity"
                                        {...option}
                                        selectedValue={effectIntensity}
                                        onChange={setEffectIntensity}
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

                <AtelierPlaygroundProjection>
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
                            {!asChild && element === "li" ? (
                                <ul>{preview}</ul>
                            ) : (
                                preview
                            )}
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
