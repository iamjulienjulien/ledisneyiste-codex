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
    type PixieDustSkeletonGap,
    type PixieDustSkeletonRadius,
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
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonVariant;
    label: string;
}>[];

const animations = [
    { value: "shimmer", label: "Reflet" },
    { value: "pulse", label: "Respiration" },
    { value: "none", label: "Fixe" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonAnimation;
    label: string;
}>[];

const gaps = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonGap;
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
    const [width, setWidth] = useState("100%");
    const [height, setHeight] = useState("1em");
    const [lines, setLines] = useState(3);
    const [lastLineWidth, setLastLineWidth] = useState("62%");
    const [gap, setGap] = useState<PixieDustSkeletonGap>("sm");
    const [radius, setRadius] = useState<PixieDustSkeletonRadius>("sm");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "graphite",
    );
    const [active, setActive] = useState(true);
    const [decorative, setDecorative] = useState(true);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp =
        color === "inherit"
            ? "\n    color={false}"
            : color === "graphite"
              ? ""
              : `\n    color="${color}"`;
    const textProps =
        variant === "text"
            ? `\n    lines={${lines}}\n    lastLineWidth="${lastLineWidth}"\n    gap="${gap}"`
            : "";
    const code = `<PixieDustSkeleton
    variant="${variant}"
    animation="${animation}"
    width="${width}"
    height="${height}"${textProps}
    radius="${radius}"${colorProp}${active ? "" : "\n    active={false}"}${decorative ? "" : '\n    decorative={false}\n    label="Chargement de la fiche"'}
/>`;

    function handleVariantChange(nextVariant: PixieDustSkeletonVariant) {
        setVariant(nextVariant);
        if (nextVariant === "text") {
            setWidth("100%");
            setHeight("1em");
        } else if (nextVariant === "block") {
            setWidth("100%");
            setHeight("10rem");
        } else {
            setWidth("5rem");
            setHeight("5rem");
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
                    {" "}
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
                                width={width}
                                height={height}
                                lines={lines}
                                lastLineWidth={lastLineWidth}
                                gap={gap}
                                radius={radius}
                                color={color === "inherit" ? false : color}
                                active={active}
                                decorative={decorative}
                                label="Chargement de la fiche"
                            />
                            {!active ? (
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
