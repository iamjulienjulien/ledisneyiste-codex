"use client";

import Image from "next/image";
import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustFrame,
    type PixieDustFrameAspect,
    type PixieDustFrameCaptionAlign,
    type PixieDustFrameCaptionPosition,
    type PixieDustFrameColor,
    type PixieDustFrameEffect,
    type PixieDustFrameElement,
    type PixieDustFrameElevation,
    type PixieDustFrameFit,
    type PixieDustFrameIntensity,
    type PixieDustFrameOverlayPosition,
    type PixieDustFramePadding,
    type PixieDustFramePosition,
    type PixieDustFrameRadius,
    type PixieDustFrameTreatment,
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
    { value: "slide", label: "Diapositive" },
    { value: "cel", label: "Cellulo" },
] as const;

const aspects = [
    { value: "auto", label: "Naturel" },
    { value: "square", label: "Carré · 1 / 1" },
    { value: "poster", label: "Affiche · 2 / 3" },
    { value: "portrait", label: "Portrait · 3 / 4" },
    { value: "landscape", label: "Paysage · 4 / 3" },
    { value: "wide", label: "Large · 3 / 2" },
    { value: "cinema", label: "Cinéma · 16 / 9" },
    { value: "scope", label: "Scope · 2,39 / 1" },
] as const;

const fits = ["cover", "contain", "fill", "none", "scale-down"] as const;
const paddings = ["none", "xs", "sm", "md", "lg"] as const;
const radii = ["none", "small", "medium", "large"] as const;
const positions = [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
] as const;
const elevations = ["none", "soft", "strong"] as const;
const treatments = ["original", "monochrome", "sepia"] as const;
const effects = [
    "none",
    "grain",
    "vignette",
    "light-leak",
    "projector",
] as const;
const intensities = ["subtle", "medium", "strong"] as const;
const overlayPositions = [
    "top-start",
    "top-end",
    "center",
    "bottom-start",
    "bottom-end",
] as const;
const captionAlignments = ["start", "center", "end"] as const;
const elements = ["figure", "div"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-56",
    moyen: "max-w-md",
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const selectClassName =
    "mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink";

export function PixieDustFramePlayground() {
    const [element, setElement] = useState<PixieDustFrameElement>("figure");
    const [variant, setVariant] = useState<PixieDustFrameVariant>("mount");
    const [aspect, setAspect] = useState<PixieDustFrameAspect>("landscape");
    const [useCustomAspect, setUseCustomAspect] = useState(false);
    const [customAspect, setCustomAspect] = useState("5 / 2");
    const [fit, setFit] = useState<PixieDustFrameFit>("contain");
    const [position, setPosition] = useState<PixieDustFramePosition>("center");
    const [useFocalPoint, setUseFocalPoint] = useState(false);
    const [focalX, setFocalX] = useState(50);
    const [focalY, setFocalY] = useState(50);
    const [padding, setPadding] = useState<PixieDustFramePadding>("md");
    const [radius, setRadius] = useState<PixieDustFrameRadius>("medium");
    const [mediaRadius, setMediaRadius] = useState<
        PixieDustFrameRadius | "inherit"
    >("inherit");
    const [color, setColor] = useState<PixieDustFrameColor>("ambre-projecteur");
    const [elevation, setElevation] = useState<PixieDustFrameElevation>("soft");
    const [treatment, setTreatment] =
        useState<PixieDustFrameTreatment>("original");
    const [effect, setEffect] = useState<PixieDustFrameEffect>("none");
    const [intensity, setIntensity] =
        useState<PixieDustFrameIntensity>("subtle");
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayPosition, setOverlayPosition] =
        useState<PixieDustFrameOverlayPosition>("top-end");
    const [showCaption, setShowCaption] = useState(true);
    const [captionPosition, setCaptionPosition] =
        useState<PixieDustFrameCaptionPosition>("outside");
    const [captionAlign, setCaptionAlign] =
        useState<PixieDustFrameCaptionAlign>("start");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        useCustomAspect
            ? `    customAspect="${customAspect}"`
            : `    aspect="${aspect}"`,
        useFocalPoint
            ? `    focalPoint={{ x: ${focalX}, y: ${focalY} }}`
            : `    position="${position}"`,
        mediaRadius !== "inherit" ? `    mediaRadius="${mediaRadius}"` : null,
        color ? `    color="${color}"` : null,
        elevation !== "none" ? `    elevation="${elevation}"` : null,
        treatment !== "original" ? `    treatment="${treatment}"` : null,
        effect !== "none" ? `    effect="${effect}"` : null,
        effect !== "none" && intensity !== "subtle"
            ? `    intensity="${intensity}"`
            : null,
        showOverlay ? '    overlay="Plan maître"' : null,
        showOverlay && overlayPosition !== "bottom-end"
            ? `    overlayPosition="${overlayPosition}"`
            : null,
        showCaption
            ? '    caption="Symbole des Œuvres · Table lumineuse"'
            : null,
        showCaption && captionPosition !== "outside"
            ? `    captionPosition="${captionPosition}"`
            : null,
        showCaption && captionAlign !== "start"
            ? `    captionAlign="${captionAlign}"`
            : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustFrame
    as="${element}"
    variant="${variant}"
    fit="${fit}"
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
            <div className="grid lg:grid-cols-[20rem_1fr]">
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
                                className={selectClassName}
                            >
                                {elements.map((value) => (
                                    <option key={value}>{value}</option>
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

                        <div>
                            <label
                                htmlFor="frame-aspect"
                                className="text-sm font-medium text-ink"
                            >
                                Proportion
                            </label>
                            <select
                                id="frame-aspect"
                                value={aspect}
                                disabled={useCustomAspect}
                                onChange={(event) =>
                                    setAspect(
                                        event.target
                                            .value as PixieDustFrameAspect,
                                    )
                                }
                                className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {aspects.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={useCustomAspect}
                                    onChange={(event) =>
                                        setUseCustomAspect(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Proportion personnalisée
                            </label>
                            {useCustomAspect ? (
                                <input
                                    aria-label="Proportion personnalisée"
                                    value={customAspect}
                                    onChange={(event) =>
                                        setCustomAspect(event.target.value)
                                    }
                                    className={selectClassName}
                                />
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="frame-fit"
                                className="text-sm font-medium text-ink"
                            >
                                Ajustement
                            </label>
                            <select
                                id="frame-fit"
                                value={fit}
                                onChange={(event) =>
                                    setFit(
                                        event.target.value as PixieDustFrameFit,
                                    )
                                }
                                className={selectClassName}
                            >
                                {fits.map((value) => (
                                    <option key={value}>{value}</option>
                                ))}
                            </select>
                        </div>

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
                                disabled={useFocalPoint}
                                onChange={(event) =>
                                    setPosition(
                                        event.target
                                            .value as PixieDustFramePosition,
                                    )
                                }
                                className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {positions.map((value) => (
                                    <option key={value}>{value}</option>
                                ))}
                            </select>
                            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={useFocalPoint}
                                    onChange={(event) =>
                                        setUseFocalPoint(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Employer un point focal
                            </label>
                            {useFocalPoint ? (
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <label className="text-xs text-muted">
                                        X · {focalX}%
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={focalX}
                                            onChange={(event) =>
                                                setFocalX(
                                                    Number(event.target.value),
                                                )
                                            }
                                            className="mt-2 w-full accent-accent"
                                        />
                                    </label>
                                    <label className="text-xs text-muted">
                                        Y · {focalY}%
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={focalY}
                                            onChange={(event) =>
                                                setFocalY(
                                                    Number(event.target.value),
                                                )
                                            }
                                            className="mt-2 w-full accent-accent"
                                        />
                                    </label>
                                </div>
                            ) : null}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Marge
                                <select
                                    value={padding}
                                    onChange={(event) =>
                                        setPadding(
                                            event.target
                                                .value as PixieDustFramePadding,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {paddings.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Rayon cadre
                                <select
                                    value={radius}
                                    onChange={(event) =>
                                        setRadius(
                                            event.target
                                                .value as PixieDustFrameRadius,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {radii.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label
                                htmlFor="frame-media-radius"
                                className="text-sm font-medium text-ink"
                            >
                                Rayon du média
                            </label>
                            <select
                                id="frame-media-radius"
                                value={mediaRadius}
                                onChange={(event) =>
                                    setMediaRadius(
                                        event.target.value as
                                            PixieDustFrameRadius | "inherit",
                                    )
                                }
                                className={selectClassName}
                            >
                                <option value="inherit">
                                    Hériter du cadre
                                </option>
                                {radii.map((value) => (
                                    <option key={value}>{value}</option>
                                ))}
                            </select>
                        </div>

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

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Élévation
                                <select
                                    value={elevation}
                                    onChange={(event) =>
                                        setElevation(
                                            event.target
                                                .value as PixieDustFrameElevation,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {elevations.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Traitement
                                <select
                                    value={treatment}
                                    onChange={(event) =>
                                        setTreatment(
                                            event.target
                                                .value as PixieDustFrameTreatment,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {treatments.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Effet
                                <select
                                    value={effect}
                                    onChange={(event) =>
                                        setEffect(
                                            event.target
                                                .value as PixieDustFrameEffect,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {effects.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Intensité
                                <select
                                    value={intensity}
                                    disabled={effect === "none"}
                                    onChange={(event) =>
                                        setIntensity(
                                            event.target
                                                .value as PixieDustFrameIntensity,
                                        )
                                    }
                                    className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    {intensities.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={showOverlay}
                                    onChange={(event) =>
                                        setShowOverlay(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Afficher une annotation
                            </label>
                            <select
                                aria-label="Position de l’annotation"
                                value={overlayPosition}
                                disabled={!showOverlay}
                                onChange={(event) =>
                                    setOverlayPosition(
                                        event.target
                                            .value as PixieDustFrameOverlayPosition,
                                    )
                                }
                                className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {overlayPositions.map((value) => (
                                    <option key={value}>{value}</option>
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
                            <div className="grid grid-cols-2 gap-3">
                                <select
                                    aria-label="Position de la légende"
                                    value={captionPosition}
                                    disabled={!showCaption}
                                    onChange={(event) =>
                                        setCaptionPosition(
                                            event.target
                                                .value as PixieDustFrameCaptionPosition,
                                        )
                                    }
                                    className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <option value="outside">outside</option>
                                    <option value="overlay">overlay</option>
                                </select>
                                <select
                                    aria-label="Alignement de la légende"
                                    value={captionAlign}
                                    disabled={!showCaption}
                                    onChange={(event) =>
                                        setCaptionAlign(
                                            event.target
                                                .value as PixieDustFrameCaptionAlign,
                                        )
                                    }
                                    className={`${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    {captionAlignments.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
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
                                customAspect={
                                    useCustomAspect ? customAspect : undefined
                                }
                                fit={fit}
                                position={position}
                                focalPoint={
                                    useFocalPoint
                                        ? { x: focalX, y: focalY }
                                        : undefined
                                }
                                padding={padding}
                                radius={radius}
                                mediaRadius={
                                    mediaRadius === "inherit"
                                        ? undefined
                                        : mediaRadius
                                }
                                color={color}
                                elevation={elevation}
                                treatment={treatment}
                                effect={effect}
                                intensity={intensity}
                                overlay={
                                    showOverlay ? "Plan maître" : undefined
                                }
                                overlayPosition={overlayPosition}
                                caption={
                                    showCaption
                                        ? "Symbole des Œuvres · Table lumineuse"
                                        : undefined
                                }
                                captionPosition={captionPosition}
                                captionAlign={captionAlign}
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
