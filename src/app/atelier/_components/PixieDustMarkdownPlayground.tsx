"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import {
    PixieDustMarkdown,
    type PixieDustMarkdownCodeOverflow,
    type PixieDustMarkdownColor,
    type PixieDustMarkdownDensity,
    type PixieDustMarkdownHeadingOffset,
    type PixieDustMarkdownHeadingScale,
    type PixieDustMarkdownMeasure,
    type PixieDustMarkdownTableLayout,
    type PixieDustMarkdownWideBlocks,
} from "@/components/ui/PixieDustMarkdown";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieSwitch } from "@/components/ui/PixieSwitch";
import type { GuidebookBlock } from "@/types/guidebook";

type PixieDustMarkdownFixture = {
    slug: string;
    label: string;
    description: string;
    blocks: GuidebookBlock[];
};

const densities = [
    ["compact", "Compacte"],
    ["comfortable", "Confortable"],
    ["airy", "Aérée"],
] as const satisfies readonly [PixieDustMarkdownDensity, string][];

const measures = [
    ["reading", "Lecture"],
    ["wide", "Large"],
    ["full", "Pleine largeur"],
] as const satisfies readonly [PixieDustMarkdownMeasure, string][];

const headingScales = [
    ["display", "Affiche"],
    ["reading", "Lecture"],
    ["compact", "Compacte"],
] as const satisfies readonly [PixieDustMarkdownHeadingScale, string][];

const wideBlockModes = [
    ["frame", "Cadre disponible"],
    ["measure", "Mesure du texte"],
] as const satisfies readonly [PixieDustMarkdownWideBlocks, string][];

const codeOverflowModes = [
    ["scroll", "Défilement"],
    ["wrap", "Retour à la ligne"],
] as const satisfies readonly [PixieDustMarkdownCodeOverflow, string][];

const tableLayouts = [
    ["auto", "Naturelle"],
    ["fixed", "Colonnes fixes"],
] as const satisfies readonly [PixieDustMarkdownTableLayout, string][];

const colors = [
    ["theme", "Lumière du thème"],
    ["violet-ombre-portee", "Violet ombre portée"],
    ["rouge-crayon", "Rouge crayon"],
    ["vert-cellulo", "Vert cellulo"],
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const;

function ControlSelect({
    id,
    label,
    value,
    options,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: string;
    options: readonly (readonly [string, string])[];
    onChange: (value: string) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <PixieSelect
                mode="popover"
                portal
                size="sm"
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                ))}
            </PixieSelect>
        </div>
    );
}

export function PixieDustMarkdownPlayground({
    fixtures,
}: Readonly<{ fixtures: readonly PixieDustMarkdownFixture[] }>) {
    const [fixtureSlug, setFixtureSlug] = useState("rich");
    const [density, setDensity] =
        useState<PixieDustMarkdownDensity>("comfortable");
    const [measure, setMeasure] = useState<PixieDustMarkdownMeasure>("reading");
    const [color, setColor] = useState<PixieDustMarkdownColor>(false);
    const [headingOffset, setHeadingOffset] =
        useState<PixieDustMarkdownHeadingOffset>(1);
    const [headingScale, setHeadingScale] =
        useState<PixieDustMarkdownHeadingScale>("reading");
    const [headingAnchors, setHeadingAnchors] = useState(true);
    const [wideBlocks, setWideBlocks] =
        useState<PixieDustMarkdownWideBlocks>("frame");
    const [codeOverflow, setCodeOverflow] =
        useState<PixieDustMarkdownCodeOverflow>("scroll");
    const [codeLineNumbers, setCodeLineNumbers] = useState(true);
    const [tableLayout, setTableLayout] =
        useState<PixieDustMarkdownTableLayout>("auto");
    const [asciiCopyable, setAsciiCopyable] = useState(true);
    const { lumiere, cadre } = useAtelierProjection();
    const fixture =
        fixtures.find((candidate) => candidate.slug === fixtureSlug) ??
        fixtures[0];
    const code = `<PixieDustMarkdown
    blocks={document.analysis.blocks}
    density="${density}"
    measure="${measure}"
    color={${color ? `"${color}"` : "false"}}
    headingOffset={${headingOffset}}
    headingScale="${headingScale}"
    headingAnchors={${headingAnchors}}
    anchorPrefix="preview"
    wideBlocks="${wideBlocks}"
    codeOverflow="${codeOverflow}"
    codeLineNumbers={${codeLineNumbers}}
    tableLayout="${tableLayout}"
    asciiCopyable={${asciiCopyable}}
/>`;

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-6">
                        <ControlSelect
                            id="markdown-fixture"
                            label="Document"
                            value={fixture.slug}
                            options={fixtures.map((item) => [
                                item.slug,
                                item.label,
                            ])}
                            onChange={setFixtureSlug}
                        />
                        <ControlSelect
                            id="markdown-density"
                            label="Densité"
                            value={density}
                            options={densities}
                            onChange={(value) =>
                                setDensity(value as PixieDustMarkdownDensity)
                            }
                        />
                        <ControlSelect
                            id="markdown-measure"
                            label="Mesure"
                            value={measure}
                            options={measures}
                            onChange={(value) =>
                                setMeasure(value as PixieDustMarkdownMeasure)
                            }
                        />
                        <ControlSelect
                            id="markdown-color"
                            label="Accent"
                            value={color || "theme"}
                            options={colors}
                            onChange={(value) =>
                                setColor(
                                    value === "theme"
                                        ? false
                                        : (value as PixieDustMarkdownColor),
                                )
                            }
                        />
                        <ControlSelect
                            id="markdown-heading-offset"
                            label="Décalage des titres"
                            value={String(headingOffset)}
                            options={[
                                ["0", "Aucun"],
                                ["1", "+1 niveau"],
                                ["2", "+2 niveaux"],
                                ["3", "+3 niveaux"],
                            ]}
                            onChange={(value) =>
                                setHeadingOffset(
                                    Number(
                                        value,
                                    ) as PixieDustMarkdownHeadingOffset,
                                )
                            }
                        />
                        <ControlSelect
                            id="markdown-heading-scale"
                            label="Échelle des titres"
                            value={headingScale}
                            options={headingScales}
                            onChange={(value) =>
                                setHeadingScale(
                                    value as PixieDustMarkdownHeadingScale,
                                )
                            }
                        />
                        <ControlSelect
                            id="markdown-wide-blocks"
                            label="Blocs techniques"
                            value={wideBlocks}
                            options={wideBlockModes}
                            onChange={(value) =>
                                setWideBlocks(
                                    value as PixieDustMarkdownWideBlocks,
                                )
                            }
                        />
                        <ControlSelect
                            id="markdown-code-overflow"
                            label="Code hors cadre"
                            value={codeOverflow}
                            options={codeOverflowModes}
                            onChange={(value) =>
                                setCodeOverflow(
                                    value as PixieDustMarkdownCodeOverflow,
                                )
                            }
                        />
                        <ControlSelect
                            id="markdown-table-layout"
                            label="Tableaux"
                            value={tableLayout}
                            options={tableLayouts}
                            onChange={(value) =>
                                setTableLayout(
                                    value as PixieDustMarkdownTableLayout,
                                )
                            }
                        />

                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Ancres des titres
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={headingAnchors}
                                onCheckedChange={setHeadingAnchors}
                                aria-label="Afficher les ancres des titres"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Numéros de ligne
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={codeLineNumbers}
                                onCheckedChange={setCodeLineNumbers}
                                aria-label="Afficher les numéros de ligne"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Copie des ASCII
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={asciiCopyable}
                                onCheckedChange={setAsciiCopyable}
                                aria-label="Autoriser la copie des compositions ASCII"
                            />
                        </label>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={lumiere}
                        className="min-h-[38rem] overflow-hidden bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`mx-auto w-full min-w-0 transition-[max-width] ${frameWidths[cadre]}`}
                        >
                            <p className="mb-5 text-sm leading-6 text-muted">
                                {fixture.description}
                            </p>
                            <div
                                className="max-h-[48rem] overflow-y-auto border border-line bg-surface p-5 sm:p-8"
                                tabIndex={0}
                                aria-label={`Aperçu : ${fixture.label}`}
                            >
                                <PixieDustMarkdown
                                    blocks={fixture.blocks}
                                    density={density}
                                    measure={measure}
                                    color={color}
                                    headingOffset={headingOffset}
                                    headingScale={headingScale}
                                    headingAnchors={headingAnchors}
                                    anchorPrefix="markdown-preview"
                                    wideBlocks={wideBlocks}
                                    codeOverflow={codeOverflow}
                                    codeLineNumbers={codeLineNumbers}
                                    tableLayout={tableLayout}
                                    asciiCopyable={asciiCopyable}
                                />
                            </div>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
