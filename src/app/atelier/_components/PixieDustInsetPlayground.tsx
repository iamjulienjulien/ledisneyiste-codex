"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustInset,
    type PixieDustInsetAccentPosition,
    type PixieDustInsetColor,
    type PixieDustInsetDepth,
    type PixieDustInsetElement,
    type PixieDustInsetPadding,
    type PixieDustInsetRadius,
    type PixieDustInsetTexture,
    type PixieDustInsetTextureIntensity,
    type PixieDustInsetVariant,
} from "@/components/ui/PixieDustInset";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "plain", label: "Nu" },
    { value: "subtle", label: "Discret" },
    { value: "recessed", label: "Creusé" },
    { value: "groove", label: "Rainure" },
    { value: "accent", label: "Accent" },
    { value: "tinted", label: "Teinté" },
] as const;

const depths = [
    { value: "none", label: "Aucune" },
    { value: "shallow", label: "Faible" },
    { value: "medium", label: "Moyenne" },
    { value: "deep", label: "Profonde" },
] as const;

const paddings = ["none", "sm", "md", "lg", "xl"] as const;
const radii = ["none", "small", "medium", "large"] as const;
const elements = ["div", "section", "aside"] as const;
const accentPositions = ["top", "end", "bottom", "start"] as const;
const textures = ["none", "grain", "grid", "crosshatch"] as const;
const textureIntensities = ["subtle", "medium", "strong"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const selectClassName =
    "mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink";

export function PixieDustInsetPlayground() {
    const [element, setElement] = useState<PixieDustInsetElement>("div");
    const [variant, setVariant] = useState<PixieDustInsetVariant>("accent");
    const [depth, setDepth] = useState<PixieDustInsetDepth>("medium");
    const [padding, setPadding] = useState<PixieDustInsetPadding>("md");
    const [radius, setRadius] = useState<PixieDustInsetRadius>("medium");
    const [color, setColor] = useState<PixieDustInsetColor>("ambre-projecteur");
    const [accentPosition, setAccentPosition] =
        useState<PixieDustInsetAccentPosition>("start");
    const [texture, setTexture] = useState<PixieDustInsetTexture>("grain");
    const [textureIntensity, setTextureIntensity] =
        useState<PixieDustInsetTextureIntensity>("subtle");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const props = [
        `    as="${element}"`,
        `    variant="${variant}"`,
        `    depth="${depth}"`,
        `    padding="${padding}"`,
        `    radius="${radius}"`,
        color ? `    color="${color}"` : null,
        variant === "accent" ? `    accentPosition="${accentPosition}"` : null,
        texture !== "none" ? `    texture="${texture}"` : null,
        texture !== "none"
            ? `    textureIntensity="${textureIntensity}"`
            : null,
        element !== "div" ? '    aria-labelledby="inset-heading"' : null,
    ].filter((line): line is string => line !== null);

    const code = `<PixieDustInset\n${props.join("\n")}\n>\n    <h3 id="inset-heading">Repères de consultation</h3>\n    <p>Première projection : 18 novembre 1928</p>\n</PixieDustInset>`;

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
                                htmlFor="inset-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="inset-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustInsetElement,
                                    )
                                }
                                className={`${selectClassName} font-mono`}
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
                                        name="inset-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Profondeur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {depths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="inset-depth"
                                        {...option}
                                        selectedValue={depth}
                                        onChange={setDepth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="inset-padding"
                                className="text-sm font-medium text-ink"
                            >
                                Espacement intérieur
                            </label>
                            <select
                                id="inset-padding"
                                value={padding}
                                onChange={(event) =>
                                    setPadding(
                                        event.target
                                            .value as PixieDustInsetPadding,
                                    )
                                }
                                className={selectClassName}
                            >
                                {paddings.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="inset-radius"
                                className="text-sm font-medium text-ink"
                            >
                                Rayon
                            </label>
                            <select
                                id="inset-radius"
                                value={radius}
                                onChange={(event) =>
                                    setRadius(
                                        event.target
                                            .value as PixieDustInsetRadius,
                                    )
                                }
                                className={selectClassName}
                            >
                                {radii.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="inset-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="inset-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className={selectClassName}
                            >
                                <option value="theme">Accent du thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="inset-accent-position"
                                className="text-sm font-medium text-ink"
                            >
                                Position de l’accent
                            </label>
                            <select
                                id="inset-accent-position"
                                value={accentPosition}
                                onChange={(event) =>
                                    setAccentPosition(
                                        event.target
                                            .value as PixieDustInsetAccentPosition,
                                    )
                                }
                                disabled={variant !== "accent"}
                                className={selectClassName}
                            >
                                {accentPositions.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="inset-texture"
                                className="text-sm font-medium text-ink"
                            >
                                Texture
                            </label>
                            <select
                                id="inset-texture"
                                value={texture}
                                onChange={(event) =>
                                    setTexture(
                                        event.target
                                            .value as PixieDustInsetTexture,
                                    )
                                }
                                className={selectClassName}
                            >
                                {textures.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="inset-texture-intensity"
                                className="text-sm font-medium text-ink"
                            >
                                Intensité de la texture
                            </label>
                            <select
                                id="inset-texture-intensity"
                                value={textureIntensity}
                                onChange={(event) =>
                                    setTextureIntensity(
                                        event.target
                                            .value as PixieDustInsetTextureIntensity,
                                    )
                                }
                                disabled={texture === "none"}
                                className={selectClassName}
                            >
                                {textureIntensities.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="inset"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[34rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <div className="border border-line bg-surface p-6 shadow-soft sm:p-8">
                                <p className="leading-7 text-ink-soft">
                                    Le récit principal conserve toute la lumière
                                    pendant que les repères se placent en
                                    retrait.
                                </p>
                                <PixieDustInset
                                    as={element}
                                    variant={variant}
                                    depth={depth}
                                    padding={padding}
                                    radius={radius}
                                    color={color}
                                    accentPosition={accentPosition}
                                    texture={texture}
                                    textureIntensity={textureIntensity}
                                    aria-labelledby={
                                        element !== "div"
                                            ? "inset-preview-heading"
                                            : undefined
                                    }
                                    className="mt-6"
                                >
                                    <h4
                                        id="inset-preview-heading"
                                        className="text-xl text-ink"
                                    >
                                        Repères de consultation
                                    </h4>
                                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                                        <div>
                                            <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                                                Première projection
                                            </dt>
                                            <dd className="mt-1 text-ink">
                                                18 novembre 1928
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                                                Durée
                                            </dt>
                                            <dd className="mt-1 text-ink">
                                                7 minutes 42 secondes
                                            </dd>
                                        </div>
                                    </dl>
                                </PixieDustInset>
                            </div>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
