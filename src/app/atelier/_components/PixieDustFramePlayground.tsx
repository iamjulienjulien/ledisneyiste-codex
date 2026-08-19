"use client";

import Image from "next/image";
import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustFrame,
    type PixieDustFrameAspect,
    type PixieDustFrameCaptionPosition,
    type PixieDustFrameColor,
    type PixieDustFrameElement,
    type PixieDustFrameFit,
    type PixieDustFramePadding,
    type PixieDustFramePosition,
    type PixieDustFrameRadius,
    type PixieDustFrameVariant,
} from "@/components/ui/PixieDustFrame";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "plain", label: "Simple" },
    { value: "outline", label: "Contour" },
    { value: "mount", label: "Passe-partout" },
    { value: "film", label: "Pellicule" },
] as const;

const aspects = [
    { value: "auto", label: "Naturel" },
    { value: "square", label: "Carré" },
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Paysage" },
    { value: "cinema", label: "Cinéma" },
] as const;

const fits = [
    { value: "cover", label: "Remplir" },
    { value: "contain", label: "Contenir" },
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

const positions = ["center", "top", "bottom", "left", "right"] as const;
const elements = ["figure", "div"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-56",
    moyen: "max-w-md",
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustFramePlayground() {
    const [element, setElement] = useState<PixieDustFrameElement>("figure");
    const [variant, setVariant] = useState<PixieDustFrameVariant>("mount");
    const [aspect, setAspect] = useState<PixieDustFrameAspect>("landscape");
    const [fit, setFit] = useState<PixieDustFrameFit>("contain");
    const [position, setPosition] = useState<PixieDustFramePosition>("center");
    const [padding, setPadding] = useState<PixieDustFramePadding>("md");
    const [radius, setRadius] = useState<PixieDustFrameRadius>("medium");
    const [color, setColor] = useState<PixieDustFrameColor>("ambre-projecteur");
    const [showCaption, setShowCaption] = useState(true);
    const [captionPosition, setCaptionPosition] =
        useState<PixieDustFrameCaptionPosition>("outside");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        color ? `    color="${color}"` : null,
        showCaption
            ? '    caption="Symbole des Œuvres · Table lumineuse"'
            : null,
        showCaption && captionPosition !== "outside"
            ? `    captionPosition="${captionPosition}"`
            : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustFrame
    as="${element}"
    variant="${variant}"
    aspect="${aspect}"
    fit="${fit}"
    position="${position}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    <Image
        src="/symbols/codex/index/oeuvres.png"
        alt="Symbole illustré des Œuvres"
        width={1024}
        height={1024}
    />
</PixieDustFrame>`;

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
                                htmlFor="frame-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="frame-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustFrameElement,
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
                                        name="frame-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Proportion
                            </legend>
                            <div className="mt-3 space-y-2">
                                {aspects.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="frame-aspect"
                                        {...option}
                                        selectedValue={aspect}
                                        onChange={setAspect}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Ajustement du média
                            </legend>
                            <div className="mt-3 space-y-2">
                                {fits.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="frame-fit"
                                        {...option}
                                        selectedValue={fit}
                                        onChange={setFit}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="frame-position"
                                className="text-sm font-medium text-ink"
                            >
                                Position du média
                            </label>
                            <select
                                id="frame-position"
                                value={position}
                                onChange={(event) =>
                                    setPosition(
                                        event.target
                                            .value as PixieDustFramePosition,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {positions.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Marge du cadre
                            </legend>
                            <div className="mt-3 space-y-2">
                                {paddings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="frame-padding"
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
                                        name="frame-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="frame-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="frame-color"
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

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={showCaption}
                                    onChange={(event) =>
                                        setShowCaption(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Afficher la légende
                            </label>

                            <div>
                                <label
                                    htmlFor="frame-caption-position"
                                    className="text-sm font-medium text-ink"
                                >
                                    Position de la légende
                                </label>
                                <select
                                    id="frame-caption-position"
                                    value={captionPosition}
                                    disabled={!showCaption}
                                    onChange={(event) =>
                                        setCaptionPosition(
                                            event.target
                                                .value as PixieDustFrameCaptionPosition,
                                        )
                                    }
                                    className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="outside">Extérieure</option>
                                    <option value="overlay">Superposée</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="frame"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[40rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustFrame
                                as={element}
                                variant={variant}
                                aspect={aspect}
                                fit={fit}
                                position={position}
                                padding={padding}
                                radius={radius}
                                color={color}
                                caption={
                                    showCaption
                                        ? "Symbole des Œuvres · Table lumineuse"
                                        : undefined
                                }
                                captionPosition={captionPosition}
                            >
                                <Image
                                    src="/symbols/codex/index/oeuvres.png"
                                    alt="Symbole illustré des Œuvres"
                                    width={1024}
                                    height={1024}
                                    sizes="(max-width: 1024px) 80vw, 48rem"
                                />
                            </PixieDustFrame>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
