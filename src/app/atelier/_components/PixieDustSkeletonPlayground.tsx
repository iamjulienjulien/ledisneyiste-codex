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
    PixieDustSkeleton,
    type PixieDustSkeletonAnimation,
    type PixieDustSkeletonDirection,
    type PixieDustSkeletonGap,
    type PixieDustSkeletonIntensity,
    type PixieDustSkeletonRadius,
    type PixieDustSkeletonSize,
    type PixieDustSkeletonSpeed,
    type PixieDustSkeletonVariant,
} from "@/components/ui/PixieDustSkeleton";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "text", label: "Texte" },
    { value: "block", label: "Bloc" },
    { value: "circle", label: "Cercle" },
    { value: "media", label: "Média" },
    { value: "control", label: "Contrôle" },
    { value: "pill", label: "Pilule" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonVariant;
    label: string;
}>[];

const animations = [
    { value: "shimmer", label: "Reflet" },
    { value: "pulse", label: "Respiration" },
    { value: "beam", label: "Faisceau" },
    { value: "develop", label: "Développement" },
    { value: "grain", label: "Grain" },
    { value: "none", label: "Fixe" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonAnimation;
    label: string;
}>[];

const gaps = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonGap;
    label: string;
}>[];

const sizes = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "xl", label: "Très grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonSize;
    label: string;
}>[];

const speeds = [
    { value: "slow", label: "Lente" },
    { value: "normal", label: "Normale" },
    { value: "fast", label: "Rapide" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonSpeed;
    label: string;
}>[];

const intensities = [
    { value: "subtle", label: "Discrète" },
    { value: "normal", label: "Présente" },
    { value: "strong", label: "Appuyée" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonIntensity;
    label: string;
}>[];

const radii = [
    { value: "none", label: "Aucun" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "full", label: "Complet" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonRadius;
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
} as const;

export function PixieDustSkeletonPlayground() {
    const [variant, setVariant] = useState<PixieDustSkeletonVariant>("text");
    const [animation, setAnimation] =
        useState<PixieDustSkeletonAnimation>("shimmer");
    const [size, setSize] = useState<PixieDustSkeletonSize>("md");
    const [width, setWidth] = useState("100%");
    const [height, setHeight] = useState("1em");
    const [aspectRatio, setAspectRatio] = useState("16 / 9");
    const [lines, setLines] = useState(3);
    const [lastLineWidth, setLastLineWidth] = useState("62%");
    const [customLineWidths, setCustomLineWidths] = useState(false);
    const [gap, setGap] = useState<PixieDustSkeletonGap>("sm");
    const [radius, setRadius] = useState<PixieDustSkeletonRadius>("sm");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "graphite",
    );
    const [highlightColor, setHighlightColor] = useState<
        AtelierAnimationColorSlug | "inherit"
    >("ambre-projecteur");
    const [intensity, setIntensity] =
        useState<PixieDustSkeletonIntensity>("normal");
    const [speed, setSpeed] = useState<PixieDustSkeletonSpeed>("normal");
    const [direction, setDirection] =
        useState<PixieDustSkeletonDirection>("forward");
    const [delay, setDelay] = useState(0);
    const [active, setActive] = useState(true);
    const [reserveSpace, setReserveSpace] = useState(false);
    const [decorative, setDecorative] = useState(true);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp =
        color === "inherit"
            ? "\n    color={false}"
            : color === "graphite"
              ? ""
              : `\n    color="${color}"`;
    const highlightColorProp =
        highlightColor === "inherit"
            ? "\n    highlightColor={false}"
            : `\n    highlightColor="${highlightColor}"`;
    const textProps =
        variant === "text"
            ? customLineWidths
                ? '\n    lineWidths={["100%", "84%", "58%"]}'
                : `\n    lines={${lines}}\n    lastLineWidth="${lastLineWidth}"\n    gap="${gap}"`
            : "";
    const code = `<PixieDustSkeleton
    variant="${variant}"
    animation="${animation}"
    size="${size}"
    width="${width}"
    height="${height}"${variant === "media" ? `\n    aspectRatio="${aspectRatio}"` : ""}${textProps}
    radius="${radius}"
    intensity="${intensity}"
    speed="${speed}"
    direction="${direction}"${colorProp}${highlightColorProp}${delay ? `\n    delay={${delay}}` : ""}${active ? "" : "\n    active={false}"}${reserveSpace ? "\n    reserveSpace" : ""}${decorative ? "" : '\n    decorative={false}\n    label="Chargement de la fiche"'}
/>`;

    function handleVariantChange(nextVariant: PixieDustSkeletonVariant) {
        setVariant(nextVariant);
        if (nextVariant === "text") {
            setWidth("100%");
            setHeight("1em");
        } else if (nextVariant === "block") {
            setWidth("100%");
            setHeight("10rem");
        } else if (nextVariant === "circle") {
            setWidth("5rem");
            setHeight("5rem");
        } else if (nextVariant === "media") {
            setWidth("100%");
            setHeight("auto");
        } else if (nextVariant === "control") {
            setWidth("100%");
            setHeight("2.75rem");
        } else {
            setWidth("6rem");
            setHeight("2rem");
        }
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>
                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Forme
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="skeleton-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={handleVariantChange}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Animation
                            </legend>
                            <div className="mt-3 space-y-2">
                                {animations.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="skeleton-animation"
                                        {...option}
                                        selectedValue={animation}
                                        onChange={setAnimation}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="skeleton-size"
                                className="text-sm font-medium text-ink"
                            >
                                Taille
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="skeleton-size"
                                value={size}
                                onChange={(event) =>
                                    setSize(
                                        event.target
                                            .value as PixieDustSkeletonSize,
                                    )
                                }
                                className="mt-2"
                            >
                                {sizes.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Largeur
                                <input
                                    type="text"
                                    value={width}
                                    onChange={(event) =>
                                        setWidth(event.target.value)
                                    }
                                    className="mt-2 font-mono"
                                />
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Hauteur
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(event) =>
                                        setHeight(event.target.value)
                                    }
                                    className="mt-2 font-mono"
                                />
                            </label>
                        </div>

                        {variant === "media" ? (
                            <label className="block text-sm font-medium text-ink">
                                Ratio du média
                                <input
                                    type="text"
                                    value={aspectRatio}
                                    onChange={(event) =>
                                        setAspectRatio(event.target.value)
                                    }
                                    className="mt-2 font-mono"
                                />
                            </label>
                        ) : null}

                        {variant === "text" ? (
                            <div className="space-y-5">
                                <label className="block text-sm font-medium text-ink">
                                    Lignes — {lines}
                                    <input
                                        type="range"
                                        min="1"
                                        max="6"
                                        value={lines}
                                        onChange={(event) =>
                                            setLines(Number(event.target.value))
                                        }
                                        className="mt-2 w-full"
                                    />
                                </label>
                                <label className="flex gap-3 text-sm text-ink-soft">
                                    <input
                                        type="checkbox"
                                        checked={customLineWidths}
                                        onChange={(event) =>
                                            setCustomLineWidths(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    Largeurs de lignes explicites
                                </label>
                                <label className="block text-sm font-medium text-ink">
                                    Dernière ligne
                                    <input
                                        type="text"
                                        value={lastLineWidth}
                                        onChange={(event) =>
                                            setLastLineWidth(event.target.value)
                                        }
                                        className="mt-2 font-mono"
                                    />
                                </label>
                                <div>
                                    <label
                                        htmlFor="skeleton-gap"
                                        className="text-sm font-medium text-ink"
                                    >
                                        Espacement
                                    </label>
                                    <PixieSelect
                                        mode="popover"
                                        portal
                                        size="sm"
                                        id="skeleton-gap"
                                        value={gap}
                                        onChange={(event) =>
                                            setGap(
                                                event.target
                                                    .value as PixieDustSkeletonGap,
                                            )
                                        }
                                        className="mt-2"
                                    >
                                        {gaps.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </PixieSelect>
                                </div>
                            </div>
                        ) : null}

                        <div>
                            <label
                                htmlFor="skeleton-radius"
                                className="text-sm font-medium text-ink"
                            >
                                Arrondi
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="skeleton-radius"
                                value={radius}
                                disabled={variant === "circle"}
                                onChange={(event) =>
                                    setRadius(
                                        event.target
                                            .value as PixieDustSkeletonRadius,
                                    )
                                }
                                className="mt-2"
                            >
                                {radii.map((option) => (
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
                                htmlFor="skeleton-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="skeleton-color"
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

                        <div>
                            <label
                                htmlFor="skeleton-highlight-color"
                                className="text-sm font-medium text-ink"
                            >
                                Lumière secondaire
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="skeleton-highlight-color"
                                value={highlightColor}
                                onChange={(event) =>
                                    setHighlightColor(
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

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Intensité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {intensities.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="skeleton-intensity"
                                        {...option}
                                        selectedValue={intensity}
                                        onChange={setIntensity}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Vitesse
                            </legend>
                            <div className="mt-3 space-y-2">
                                {speeds.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="skeleton-speed"
                                        {...option}
                                        selectedValue={speed}
                                        onChange={setSpeed}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="skeleton-direction"
                                    className="text-sm font-medium text-ink"
                                >
                                    Sens
                                </label>
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    id="skeleton-direction"
                                    value={direction}
                                    onChange={(event) =>
                                        setDirection(
                                            event.target
                                                .value as PixieDustSkeletonDirection,
                                        )
                                    }
                                    className="mt-2"
                                >
                                    <option value="forward">Avant</option>
                                    <option value="reverse">Inverse</option>
                                </PixieSelect>
                            </div>
                            <div>
                                <label
                                    htmlFor="skeleton-delay"
                                    className="text-sm font-medium text-ink"
                                >
                                    Délai
                                </label>
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    id="skeleton-delay"
                                    value={delay}
                                    onChange={(event) =>
                                        setDelay(Number(event.target.value))
                                    }
                                    className="mt-2"
                                >
                                    <option value="0">Aucun</option>
                                    <option value="250">250 ms</option>
                                    <option value="500">500 ms</option>
                                    <option value="1000">1 000 ms</option>
                                </PixieSelect>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-ink-soft">
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={(event) =>
                                        setActive(event.target.checked)
                                    }
                                />
                                Actif
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={reserveSpace}
                                    onChange={(event) =>
                                        setReserveSpace(event.target.checked)
                                    }
                                />
                                Conserver l’espace
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={decorative}
                                    onChange={(event) =>
                                        setDecorative(event.target.checked)
                                    }
                                />
                                Décoratif
                            </label>
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                            aria-busy={active}
                            aria-label="Aperçu du contenu en chargement"
                        >
                            <PixieDustSkeleton
                                variant={variant}
                                animation={animation}
                                size={size}
                                width={width}
                                height={height}
                                aspectRatio={aspectRatio}
                                lines={lines}
                                lineWidths={
                                    customLineWidths
                                        ? ["100%", "84%", "58%"]
                                        : undefined
                                }
                                lastLineWidth={lastLineWidth}
                                gap={gap}
                                radius={radius}
                                color={color === "inherit" ? false : color}
                                highlightColor={
                                    highlightColor === "inherit"
                                        ? false
                                        : highlightColor
                                }
                                intensity={intensity}
                                speed={speed}
                                direction={direction}
                                delay={delay}
                                active={active}
                                reserveSpace={reserveSpace}
                                decorative={decorative}
                                label="Chargement de la fiche"
                            />
                            {!active && !reserveSpace ? (
                                <p className="text-sm text-ink-soft">
                                    Le contenu réel peut maintenant prendre sa
                                    place.
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
