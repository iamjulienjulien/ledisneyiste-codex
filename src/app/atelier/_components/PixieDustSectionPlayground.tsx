"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import { PixieDustCluster } from "@/components/ui/PixieDustCluster";
import {
    PixieDustSection,
    type PixieDustSectionAlign,
    type PixieDustSectionElement,
    type PixieDustSectionGap,
    type PixieDustSectionGutter,
    type PixieDustSectionSpacing,
    type PixieDustSectionWidth,
} from "@/components/ui/PixieDustSection";
import { PixieDustStack } from "@/components/ui/PixieDustStack";

const elements = ["section", "article", "div"] as const;

const widths = [
    { value: "narrow", label: "Étroit" },
    { value: "medium", label: "Moyen" },
    { value: "wide", label: "Large" },
    { value: "full", label: "Pleine largeur" },
] as const;

const gutters = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const spacings = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "xl", label: "Très grande" },
] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const alignments = [
    { value: "stretch", label: "Étiré" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-2xl",
    large: "max-w-5xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustSectionPlayground() {
    const [element, setElement] = useState<PixieDustSectionElement>("section");
    const [width, setWidth] = useState<PixieDustSectionWidth>("medium");
    const [gutter, setGutter] = useState<PixieDustSectionGutter>("md");
    const [spacing, setSpacing] = useState<PixieDustSectionSpacing>("lg");
    const [gap, setGap] = useState<PixieDustSectionGap>("lg");
    const [align, setAlign] = useState<PixieDustSectionAlign>("stretch");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const labelledBy =
        element === "div" ? "" : '    aria-labelledby="section-heading"\n';
    const code = `<PixieDustSection
    as="${element}"
    width="${width}"
    gutter="${gutter}"
    spacing="${spacing}"
    gap="${gap}"
    align="${align}"
${labelledBy}>
    <header>
        <p>Le dessin animé trouve son langage</p>
        <h2 id="section-heading">Le mouvement rejoint la musique</h2>
    </header>
    <p>Une introduction éditoriale installe la séquence.</p>
    <PixieDustCluster>{/* Métadonnées */}</PixieDustCluster>
    {/* Matière principale */}
</PixieDustSection>`;
    const contentWidth = align === "stretch" ? "w-full" : "w-full max-w-2xl";

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="section-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="section-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustSectionElement,
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
                                Largeur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {widths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="section-width"
                                        {...option}
                                        selectedValue={width}
                                        onChange={setWidth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Gouttière
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gutters.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="section-gutter"
                                        {...option}
                                        selectedValue={gutter}
                                        onChange={setGutter}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Respiration externe
                            </legend>
                            <div className="mt-3 space-y-2">
                                {spacings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="section-spacing"
                                        {...option}
                                        selectedValue={spacing}
                                        onChange={setSpacing}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Rythme interne
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="section-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Alignement
                            </legend>
                            <div className="mt-3 space-y-2">
                                {alignments.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="section-align"
                                        {...option}
                                        selectedValue={align}
                                        onChange={setAlign}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="section"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[54rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full overflow-hidden border border-dashed border-line-strong transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustSection
                                as={element}
                                width={width}
                                gutter={gutter}
                                spacing={spacing}
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    element === "div"
                                        ? undefined
                                        : "section-preview-heading"
                                }
                                className="bg-surface-muted/60"
                            >
                                <PixieDustStack
                                    gap="xs"
                                    className={contentWidth}
                                >
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Le dessin animé trouve son langage
                                    </p>
                                    <h4
                                        id="section-preview-heading"
                                        className="text-3xl text-ink"
                                    >
                                        Le mouvement rejoint la musique
                                    </h4>
                                </PixieDustStack>

                                <p
                                    className={`${contentWidth} leading-7 text-ink-soft`}
                                >
                                    Une séquence complète réunit son ouverture,
                                    ses repères et sa matière dans un même
                                    rythme.
                                </p>

                                <PixieDustCluster
                                    gap="xs"
                                    className={contentWidth}
                                >
                                    {[
                                        "Animation",
                                        "Musique",
                                        "Technicolor",
                                    ].map((label) => (
                                        <PixieBadge
                                            key={label}
                                            variant="outline"
                                            size="sm"
                                            tone="inherit"
                                        >
                                            {label}
                                        </PixieBadge>
                                    ))}
                                </PixieDustCluster>

                                <PixieDustCard
                                    as="article"
                                    variant="outline"
                                    padding="md"
                                    className={contentWidth}
                                >
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Archive · 1929
                                    </p>
                                    <h5 className="mt-2 text-xl text-ink">
                                        The Skeleton Dance
                                    </h5>
                                </PixieDustCard>
                            </PixieDustSection>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
