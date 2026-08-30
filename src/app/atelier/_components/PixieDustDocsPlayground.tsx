"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import {
    PixieDustDocs,
    type PixieDustDocsDensity,
    type PixieDustDocsNavigationItem,
    type PixieDustDocsNavigationMode,
    type PixieDustDocsNavigationWidth,
    type PixieDustDocsTocMode,
} from "@/components/ui/PixieDustDocs";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieSwitch } from "@/components/ui/PixieSwitch";
import type { GuidebookDocumentState } from "@/types/guidebook";
import type { PixieDustDocsFixture } from "./PixieDustDocs.fixtures.server";

const densities = [
    ["compact", "Compacte"],
    ["comfortable", "Confortable"],
    ["airy", "Aérée"],
] as const satisfies readonly [PixieDustDocsDensity, string][];

const navigationWidths = [
    ["sm", "Étroite"],
    ["md", "Moyenne"],
    ["lg", "Large"],
] as const satisfies readonly [PixieDustDocsNavigationWidth, string][];

const navigationModes = [
    ["inline", "Dans le cadre"],
    ["floating", "Flottante"],
] as const satisfies readonly [PixieDustDocsNavigationMode, string][];

const tocModes = [
    ["visible", "Visible"],
    ["collapsible", "Repliable"],
    ["hidden", "Masqué"],
] as const satisfies readonly [PixieDustDocsTocMode, string][];

const documentStates = [
    ["ready", "Prêt à lire"],
    ["empty", "Vide"],
    ["partial", "Partiel"],
    ["missing", "Introuvable"],
    ["restricted", "Réservé"],
    ["stale", "À synchroniser"],
    ["unavailable", "Indisponible"],
    ["deferred", "Différé"],
] as const satisfies readonly [GuidebookDocumentState, string][];

const frameWidths = {
    compact: "max-w-3xl",
    moyen: "max-w-6xl",
    large: "max-w-none",
} as const;

function createDestination(
    fixture: PixieDustDocsFixture | undefined,
    anchor: string,
) {
    return fixture
        ? {
              slug: fixture.slug,
              title: fixture.title,
              href: `#${anchor}-${fixture.slug}`,
          }
        : null;
}

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
                id={id}
                mode="popover"
                portal
                size="sm"
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

export function PixieDustDocsPlayground({
    fixtures,
    navigation,
    denseNavigation,
    anchor,
    controls = true,
    libraryTitle = "Le Codex du Disneyiste pour les Nuls",
    documentEyebrow = "Édition pour agent IA",
    authorizedLabel,
}: Readonly<{
    fixtures: readonly PixieDustDocsFixture[];
    navigation: readonly PixieDustDocsNavigationItem[];
    denseNavigation?: readonly PixieDustDocsNavigationItem[];
    anchor: string;
    controls?: boolean;
    libraryTitle?: string;
    documentEyebrow?: string;
    authorizedLabel?: string;
}>) {
    const [activeSlug, setActiveSlug] = useState(
        fixtures[0]?.slug ?? "bienvenue",
    );
    const [documentState, setDocumentState] = useState<GuidebookDocumentState>(
        fixtures[0]?.state ?? "ready",
    );
    const [density, setDensity] = useState<PixieDustDocsDensity>("comfortable");
    const [navigationWidth, setNavigationWidth] =
        useState<PixieDustDocsNavigationWidth>("md");
    const [navigationMode, setNavigationMode] =
        useState<PixieDustDocsNavigationMode>("inline");
    const [toc, setToc] = useState<PixieDustDocsTocMode>("visible");
    const [sticky, setSticky] = useState(true);
    const [filterable, setFilterable] = useState(true);
    const [navigationFixture, setNavigationFixture] = useState<
        "published" | "dense"
    >("published");
    const { lumiere, cadre } = useAtelierProjection();
    const currentIndex = Math.max(
        0,
        fixtures.findIndex((fixture) => fixture.slug === activeSlug),
    );
    const current = fixtures[currentIndex] ?? fixtures[0];
    const state = controls ? documentState : (current?.state ?? "ready");
    const previous = fixtures[currentIndex - 1];
    const next = fixtures[currentIndex + 1];
    const projectedNavigation =
        navigationFixture === "dense" && denseNavigation
            ? denseNavigation
            : navigation;
    const code = `<PixieDustDocs
    title="${libraryTitle}"
    navigation={navigation}
    activeSlug="${current?.slug ?? "bienvenue"}"
    documentTitle="${current?.title ?? "Salle de briefing"}"
    document={document}
    tableOfContents={tableOfContents}
    documentState="${state}"
    density="${density}"
    navigationWidth="${navigationWidth}"
    navigationMode="${navigationMode}"
    toc="${toc}"${sticky ? "\n    sticky" : ""}${filterable ? "\n    filterable" : ""}
/>`;

    if (!current) {
        return null;
    }

    const projection = (
        <div
            data-projection="originale"
            data-lumiere={lumiere}
            className="min-h-[36rem] overflow-clip bg-canvas p-3 sm:p-6"
        >
            <div
                className={`mx-auto w-full min-w-0 transition-[max-width] ${frameWidths[cadre]}`}
            >
                <PixieDustDocs
                    title={libraryTitle}
                    navigation={projectedNavigation}
                    activeSlug={current.slug}
                    documentTitle={current.title}
                    documentEyebrow={documentEyebrow}
                    documentSummary={current.summary}
                    documentMeta={
                        <>
                            <span>{current.sourceLabel}</span>
                            <span>
                                {authorizedLabel ??
                                    `${fixtures.length} documents autorisés`}
                            </span>
                            {current.updatedAt ? (
                                <span>Source synchronisée</span>
                            ) : null}
                        </>
                    }
                    document={current.document}
                    tableOfContents={current.tableOfContents}
                    documentState={state}
                    density={density}
                    navigationWidth={navigationWidth}
                    navigationMode={navigationMode}
                    toc={toc}
                    sticky={sticky}
                    filterable={filterable}
                    previous={createDestination(previous, anchor)}
                    next={createDestination(next, anchor)}
                    headingLevel={4}
                    onNavigate={setActiveSlug}
                />
            </div>
        </div>
    );

    if (!controls) {
        return (
            <AtelierPlaygroundProjection>
                {projection}
            </AtelierPlaygroundProjection>
        );
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-6">
                        <ControlSelect
                            id="docs-document"
                            label="Document"
                            value={current.slug}
                            options={fixtures.map((fixture) => [
                                fixture.slug,
                                fixture.title,
                            ])}
                            onChange={setActiveSlug}
                        />
                        <ControlSelect
                            id="docs-state"
                            label="État"
                            value={state}
                            options={documentStates}
                            onChange={(value) =>
                                setDocumentState(
                                    value as GuidebookDocumentState,
                                )
                            }
                        />
                        {denseNavigation ? (
                            <ControlSelect
                                id="docs-navigation-fixture"
                                label="Arborescence"
                                value={navigationFixture}
                                options={[
                                    ["published", "7 documents publiés"],
                                    ["dense", "40 titres témoins"],
                                ]}
                                onChange={(value) =>
                                    setNavigationFixture(
                                        value as "published" | "dense",
                                    )
                                }
                            />
                        ) : null}
                        <ControlSelect
                            id="docs-density"
                            label="Densité"
                            value={density}
                            options={densities}
                            onChange={(value) =>
                                setDensity(value as PixieDustDocsDensity)
                            }
                        />
                        <ControlSelect
                            id="docs-navigation-width"
                            label="Largeur de bibliothèque"
                            value={navigationWidth}
                            options={navigationWidths}
                            onChange={(value) =>
                                setNavigationWidth(
                                    value as PixieDustDocsNavigationWidth,
                                )
                            }
                        />
                        <ControlSelect
                            id="docs-navigation-mode"
                            label="Présence de la bibliothèque"
                            value={navigationMode}
                            options={navigationModes}
                            onChange={(value) =>
                                setNavigationMode(
                                    value as PixieDustDocsNavigationMode,
                                )
                            }
                        />
                        <ControlSelect
                            id="docs-toc"
                            label="Sommaire"
                            value={toc}
                            options={tocModes}
                            onChange={(value) =>
                                setToc(value as PixieDustDocsTocMode)
                            }
                        />

                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Régions sticky
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={sticky}
                                onCheckedChange={setSticky}
                                aria-label="Maintenir la bibliothèque et le sommaire"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Filtre de titres
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={filterable}
                                onCheckedChange={setFilterable}
                                aria-label="Afficher le filtre de titres"
                            />
                        </label>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    {projection}
                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
