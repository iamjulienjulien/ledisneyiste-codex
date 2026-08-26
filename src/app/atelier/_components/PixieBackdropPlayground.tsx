"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieBackdrop,
    type PixieBackdropBase,
    type PixieBackdropColor,
    type PixieBackdropDirection,
    type PixieBackdropElement,
    type PixieBackdropIntensity,
    type PixieBackdropMotion,
    type PixieBackdropPadding,
    type PixieBackdropPosition,
    type PixieBackdropRadius,
    type PixieBackdropSpread,
    type PixieBackdropTexture,
    type PixieBackdropTextureIntensity,
    type PixieBackdropVariant,
} from "@/components/ui/PixieBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
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
    { value: "horizon", label: "Horizon" },
    { value: "split", label: "Champ / contrechamp" },
    { value: "cel", label: "Celluloïd" },
] as const;

const intensities = [
    { value: "subtle", label: "Discrète" },
    { value: "medium", label: "Moyenne" },
    { value: "strong", label: "Forte" },
] as const;

const positions = [
    "top-start",
    "top",
    "top-end",
    "start",
    "center",
    "end",
    "bottom-start",
    "bottom",
    "bottom-end",
] as const;

const directions = [
    "horizontal",
    "vertical",
    "diagonal-up",
    "diagonal-down",
] as const;
const spreads = ["narrow", "medium", "wide"] as const;
const paddings = ["none", "sm", "md", "lg", "xl"] as const;
const radii = ["none", "small", "medium", "large"] as const;
const bases = ["transparent", "canvas", "surface", "muted"] as const;
const textures = ["none", "grain", "dust", "paper"] as const;
const textureIntensities = ["subtle", "medium", "strong"] as const;
const motions = ["none", "drift", "breathe"] as const;
const elements = ["div", "section", "header", "footer"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-2xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const selectClassName =
    "mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink";

export function PixieBackdropPlayground() {
    const [element, setElement] = useState<PixieBackdropElement>("section");
    const [variant, setVariant] = useState<PixieBackdropVariant>("cel");
    const [intensity, setIntensity] =
        useState<PixieBackdropIntensity>("strong");
    const [position, setPosition] =
        useState<PixieBackdropPosition>("top-start");
    const [direction, setDirection] =
        useState<PixieBackdropDirection>("diagonal-down");
    const [spread, setSpread] = useState<PixieBackdropSpread>("wide");
    const [padding, setPadding] = useState<PixieBackdropPadding>("xl");
    const [radius, setRadius] = useState<PixieBackdropRadius>("large");
    const [color, setColor] = useState<PixieBackdropColor>("ambre-projecteur");
    const [secondaryColor, setSecondaryColor] = useState<PixieBackdropColor>(
        "violet-ombre-portee",
    );
    const [base, setBase] = useState<PixieBackdropBase>("surface");
    const [texture, setTexture] = useState<PixieBackdropTexture>("grain");
    const [textureIntensity, setTextureIntensity] =
        useState<PixieBackdropTextureIntensity>("subtle");
    const [motion, setMotion] = useState<PixieBackdropMotion>("none");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const props = [
        `    as="${element}"`,
        `    variant="${variant}"`,
        `    intensity="${intensity}"`,
        `    position="${position}"`,
        `    direction="${direction}"`,
        `    spread="${spread}"`,
        `    padding="${padding}"`,
        `    radius="${radius}"`,
        `    base="${base}"`,
        color ? `    color="${color}"` : null,
        secondaryColor ? `    secondaryColor="${secondaryColor}"` : null,
        texture !== "none" ? `    texture="${texture}"` : null,
        texture !== "none"
            ? `    textureIntensity="${textureIntensity}"`
            : null,
        motion !== "none" ? `    motion="${motion}"` : null,
        element === "section" ? '    aria-labelledby="backdrop-heading"' : null,
    ].filter((line): line is string => line !== null);

    const code = `<PixieBackdrop\n${props.join("\n")}\n>\n    <h2 id="backdrop-heading">Les origines retrouvent leur lumière</h2>\n    {/* Composition au premier plan */}\n</PixieBackdrop>`;

    function selectColor(
        value: string,
        setter: (color: PixieBackdropColor) => void,
    ) {
        setter(
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
                                            .value as PixieBackdropElement,
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

                        <div>
                            <label
                                htmlFor="backdrop-position"
                                className="text-sm font-medium text-ink"
                            >
                                Position du foyer
                            </label>
                            <select
                                id="backdrop-position"
                                value={position}
                                onChange={(event) =>
                                    setPosition(
                                        event.target
                                            .value as PixieBackdropPosition,
                                    )
                                }
                                className={selectClassName}
                            >
                                {positions.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="backdrop-direction"
                                className="text-sm font-medium text-ink"
                            >
                                Direction
                            </label>
                            <select
                                id="backdrop-direction"
                                value={direction}
                                onChange={(event) =>
                                    setDirection(
                                        event.target
                                            .value as PixieBackdropDirection,
                                    )
                                }
                                className={selectClassName}
                            >
                                {directions.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="backdrop-spread"
                                className="text-sm font-medium text-ink"
                            >
                                Étendue
                            </label>
                            <select
                                id="backdrop-spread"
                                value={spread}
                                onChange={(event) =>
                                    setSpread(
                                        event.target
                                            .value as PixieBackdropSpread,
                                    )
                                }
                                className={selectClassName}
                            >
                                {spreads.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="backdrop-base"
                                className="text-sm font-medium text-ink"
                            >
                                Surface de base
                            </label>
                            <select
                                id="backdrop-base"
                                value={base}
                                onChange={(event) =>
                                    setBase(
                                        event.target.value as PixieBackdropBase,
                                    )
                                }
                                className={selectClassName}
                            >
                                {bases.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="backdrop-padding"
                                className="text-sm font-medium text-ink"
                            >
                                Espacement intérieur
                            </label>
                            <select
                                id="backdrop-padding"
                                value={padding}
                                onChange={(event) =>
                                    setPadding(
                                        event.target
                                            .value as PixieBackdropPadding,
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
                                htmlFor="backdrop-radius"
                                className="text-sm font-medium text-ink"
                            >
                                Rayon
                            </label>
                            <select
                                id="backdrop-radius"
                                value={radius}
                                onChange={(event) =>
                                    setRadius(
                                        event.target
                                            .value as PixieBackdropRadius,
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
                                htmlFor="backdrop-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur principale
                            </label>
                            <select
                                id="backdrop-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value, setColor)
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
                                htmlFor="backdrop-secondary-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur secondaire
                            </label>
                            <select
                                id="backdrop-secondary-color"
                                value={secondaryColor || "theme"}
                                onChange={(event) =>
                                    selectColor(
                                        event.target.value,
                                        setSecondaryColor,
                                    )
                                }
                                className={selectClassName}
                            >
                                <option value="theme">Teinte dérivée</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="backdrop-texture"
                                className="text-sm font-medium text-ink"
                            >
                                Texture
                            </label>
                            <select
                                id="backdrop-texture"
                                value={texture}
                                onChange={(event) =>
                                    setTexture(
                                        event.target
                                            .value as PixieBackdropTexture,
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
                                htmlFor="backdrop-texture-intensity"
                                className="text-sm font-medium text-ink"
                            >
                                Intensité de la texture
                            </label>
                            <select
                                id="backdrop-texture-intensity"
                                value={textureIntensity}
                                onChange={(event) =>
                                    setTextureIntensity(
                                        event.target
                                            .value as PixieBackdropTextureIntensity,
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

                        <div>
                            <label
                                htmlFor="backdrop-motion"
                                className="text-sm font-medium text-ink"
                            >
                                Mouvement
                            </label>
                            <select
                                id="backdrop-motion"
                                value={motion}
                                onChange={(event) =>
                                    setMotion(
                                        event.target
                                            .value as PixieBackdropMotion,
                                    )
                                }
                                className={selectClassName}
                            >
                                {motions.map((value) => (
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
                        namePrefix="backdrop"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[42rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieBackdrop
                                as={element}
                                variant={variant}
                                intensity={intensity}
                                position={position}
                                direction={direction}
                                spread={spread}
                                padding={padding}
                                radius={radius}
                                color={color}
                                secondaryColor={secondaryColor}
                                base={base}
                                texture={texture}
                                textureIntensity={textureIntensity}
                                motion={motion}
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

                                <PixieCard
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
                                </PixieCard>
                            </PixieBackdrop>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
