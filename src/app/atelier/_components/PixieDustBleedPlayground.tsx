"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import {
    PixieDustBleed,
    type PixieDustBleedElement,
    type PixieDustBleedExtent,
    type PixieDustBleedGutter,
    type PixieDustBleedSide,
} from "@/components/ui/PixieDustBleed";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieDustRail } from "@/components/ui/PixieDustRail";
import { PixieStack } from "@/components/ui/PixieStack";

const elements = ["div", "figure", "section"] as const;

const sides = [
    { value: "start", label: "Début" },
    { value: "end", label: "Fin" },
    { value: "both", label: "Les deux côtés" },
] as const;

const extents = [
    { value: "sm", label: "Petite · 1 rem" },
    { value: "md", label: "Moyenne · 2 rem" },
    { value: "lg", label: "Grande · 4 rem" },
    { value: "xl", label: "Très grande · 6 rem" },
    { value: "viewport", label: "Fenêtre" },
] as const;

const gutters = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const contentModes = [
    { value: "panorama", label: "Panorama" },
    { value: "surface", label: "Surface éditoriale" },
    { value: "rail", label: "Rail d’archives" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const films = [
    ["1928", "Steamboat Willie"],
    ["1929", "The Skeleton Dance"],
    ["1932", "Flowers and Trees"],
    ["1933", "Three Little Pigs"],
] as const;

type ContentMode = (typeof contentModes)[number]["value"];

function BleedContent({ mode }: Readonly<{ mode: ContentMode }>) {
    if (mode === "surface") {
        return (
            <PixieBackdrop variant="projector" intensity="medium" padding="lg">
                <div className="mx-auto max-w-2xl py-6 text-center">
                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                        Interlude
                    </p>
                    <h5 className="mt-3 text-3xl text-ink">
                        La lumière gagne les bords du cadre
                    </h5>
                    <p className="mt-4 leading-7 text-ink-soft">
                        La surface s’échappe, tandis que sa matière demeure
                        protégée par la gouttière.
                    </p>
                </div>
            </PixieBackdrop>
        );
    }

    if (mode === "rail") {
        return (
            <PixieDustRail
                itemWidth="sm"
                gap="sm"
                gutter="sm"
                aria-label="Œuvres à parcourir"
                className="pb-3"
            >
                {films.map(([year, title]) => (
                    <div key={title}>
                        <PixieCard
                            as="article"
                            variant="outline"
                            padding="md"
                            className="h-full"
                        >
                            <p className="font-mono text-xs text-accent">
                                {year}
                            </p>
                            <h5 className="mt-3 text-lg text-ink">{title}</h5>
                        </PixieCard>
                    </div>
                ))}
            </PixieDustRail>
        );
    }

    return (
        <PixieFrame variant="film" padding="none">
            <div className="relative min-h-64 overflow-hidden bg-surface-muted">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_36%,var(--color-accent)_0,transparent_24%),linear-gradient(135deg,var(--color-surface-muted),var(--color-canvas))] opacity-60" />
                <div className="relative flex min-h-64 items-end p-6 sm:p-8">
                    <div className="max-w-xl">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                            Panorama de production
                        </p>
                        <h5 className="mt-3 text-3xl text-ink">
                            La table d’animation quitte le cadre
                        </h5>
                    </div>
                </div>
            </div>
        </PixieFrame>
    );
}

export function PixieDustBleedPlayground() {
    const [element, setElement] = useState<PixieDustBleedElement>("div");
    const [side, setSide] = useState<PixieDustBleedSide>("both");
    const [extent, setExtent] = useState<PixieDustBleedExtent>("lg");
    const [gutter, setGutter] = useState<PixieDustBleedGutter>("none");
    const [contentMode, setContentMode] = useState<ContentMode>("panorama");
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const labelLine =
        element === "section" ? '    aria-label="Séquence panoramique"\n' : "";
    const code = `<PixieDustBleed
    as="${element}"
    side="${side}"
    extent="${extent}"
    gutter="${gutter}"
${labelLine}>
    {/* ${contentModes.find(({ value }) => value === contentMode)?.label} */}
</PixieDustBleed>`;

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="bleed-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="bleed-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustBleedElement,
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Côté échappé
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sides.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="bleed-side"
                                        {...option}
                                        selectedValue={side}
                                        onChange={setSide}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Amplitude
                            </legend>
                            <div className="mt-3 space-y-2">
                                {extents.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="bleed-extent"
                                        {...option}
                                        selectedValue={extent}
                                        onChange={setExtent}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Gouttière de sécurité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gutters.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="bleed-gutter"
                                        {...option}
                                        selectedValue={gutter}
                                        onChange={setGutter}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="bleed-content"
                                className="text-sm font-medium text-ink"
                            >
                                Matière sur le plateau
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="bleed-content"
                                value={contentMode}
                                onChange={(event) =>
                                    setContentMode(
                                        event.target.value as ContentMode,
                                    )
                                }
                                className="mt-2"
                            >
                                {contentModes.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                            <p className="mt-2 text-xs leading-5 text-muted">
                                Réglage propre au plateau, absent de l’API.
                            </p>
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[44rem] items-center justify-center overflow-hidden bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong px-8 py-10 transition-[max-width] sm:px-12 ${frameWidths[frame]}`}
                        >
                            <PixieStack gap="lg">
                                <div>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Avant le débordement
                                    </p>
                                    <p className="mt-3 max-w-xl leading-7 text-ink-soft">
                                        Le texte matérialise les limites du
                                        cadre de lecture.
                                    </p>
                                </div>

                                <PixieDustBleed
                                    as={element}
                                    side={side}
                                    extent={extent}
                                    gutter={gutter}
                                    aria-label={
                                        element === "section"
                                            ? "Séquence panoramique"
                                            : undefined
                                    }
                                    className={
                                        element === "figure" ? "m-0" : ""
                                    }
                                >
                                    <BleedContent mode={contentMode} />
                                </PixieDustBleed>

                                <div>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Retour au cadre
                                    </p>
                                    <p className="mt-3 max-w-xl leading-7 text-ink-soft">
                                        La séquence suivante retrouve la même
                                        colonne de lecture.
                                    </p>
                                </div>
                            </PixieStack>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
