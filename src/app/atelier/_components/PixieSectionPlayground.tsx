"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieCluster } from "@/components/ui/PixieCluster";
import {
    PixieSection,
    type PixieSectionAlign,
    type PixieSectionElement,
    type PixieSectionGap,
    type PixieSectionGutter,
    type PixieSectionSpacing,
    type PixieSectionWidth,
} from "@/components/ui/PixieSection";
import { PixieStack } from "@/components/ui/PixieStack";

const elements = ["section", "article", "div"] as const;

const widths = [
    { value: "42", label: "42 rem · Lecture" },
    { value: "56", label: "56 rem · Éditorial" },
    { value: "72", label: "72 rem · Collection" },
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

type SpacingOverride = PixieSectionSpacing | "inherit";

const spacingOverrides = [
    { value: "inherit", label: "Hériter de spacing" },
    ...spacings,
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
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieSectionPlayground() {
    const [element, setElement] = useState<PixieSectionElement>("section");
    const [width, setWidth] = useState<PixieSectionWidth>("72");
    const [gutter, setGutter] = useState<PixieSectionGutter>("md");
    const [spacing, setSpacing] = useState<PixieSectionSpacing>("lg");
    const [spacingStart, setSpacingStart] =
        useState<SpacingOverride>("inherit");
    const [spacingEnd, setSpacingEnd] = useState<SpacingOverride>("inherit");
    const [gap, setGap] = useState<PixieSectionGap>("lg");
    const [align, setAlign] = useState<PixieSectionAlign>("stretch");
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const labelledBy =
        element === "div" ? "" : '    aria-labelledby="section-heading"\n';
    const spacingStartProp =
        spacingStart === "inherit"
            ? ""
            : `    spacingStart="${spacingStart}"\n`;
    const spacingEndProp =
        spacingEnd === "inherit" ? "" : `    spacingEnd="${spacingEnd}"\n`;
    const code = `<PixieSection
    as="${element}"
    width="${width}"
    gutter="${gutter}"
    spacing="${spacing}"
${spacingStartProp}${spacingEndProp}    gap="${gap}"
    align="${align}"
${labelledBy}>
    <header>
        <p>Le dessin animé trouve son langage</p>
        <h2 id="section-heading">Le mouvement rejoint la musique</h2>
    </header>
    <p>Une introduction éditoriale installe la séquence.</p>
    <PixieCluster>{/* Métadonnées */}</PixieCluster>
    {/* Matière principale */}
</PixieSection>`;
    const contentWidth = align === "stretch" ? "w-full" : "w-full max-w-2xl";

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
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
                                            .value as PixieSectionElement,
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

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div>
                                <label
                                    htmlFor="section-spacing-start"
                                    className="text-sm font-medium text-ink"
                                >
                                    Respiration d’ouverture
                                </label>
                                <select
                                    id="section-spacing-start"
                                    value={spacingStart}
                                    onChange={(event) =>
                                        setSpacingStart(
                                            event.target
                                                .value as SpacingOverride,
                                        )
                                    }
                                    className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                >
                                    {spacingOverrides.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="section-spacing-end"
                                    className="text-sm font-medium text-ink"
                                >
                                    Respiration de fermeture
                                </label>
                                <select
                                    id="section-spacing-end"
                                    value={spacingEnd}
                                    onChange={(event) =>
                                        setSpacingEnd(
                                            event.target
                                                .value as SpacingOverride,
                                        )
                                    }
                                    className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                >
                                    {spacingOverrides.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

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

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[54rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full overflow-hidden border border-dashed border-line-strong transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieSection
                                as={element}
                                width={width}
                                gutter={gutter}
                                spacing={spacing}
                                spacingStart={
                                    spacingStart === "inherit"
                                        ? undefined
                                        : spacingStart
                                }
                                spacingEnd={
                                    spacingEnd === "inherit"
                                        ? undefined
                                        : spacingEnd
                                }
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    element === "div"
                                        ? undefined
                                        : "section-preview-heading"
                                }
                                className="bg-surface-muted/60"
                            >
                                <PixieStack gap="xs" className={contentWidth}>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Le dessin animé trouve son langage
                                    </p>
                                    <h4
                                        id="section-preview-heading"
                                        className="text-3xl text-ink"
                                    >
                                        Le mouvement rejoint la musique
                                    </h4>
                                </PixieStack>

                                <p
                                    className={`${contentWidth} leading-7 text-ink-soft`}
                                >
                                    Une séquence complète réunit son ouverture,
                                    ses repères et sa matière dans un même
                                    rythme.
                                </p>

                                <PixieCluster gap="xs" className={contentWidth}>
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
                                </PixieCluster>

                                <PixieCard
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
                                </PixieCard>
                            </PixieSection>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
