"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSidebar } from "@/components/ui/PixieSidebar";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustStickyRegion,
    type PixieDustStickyRegionEdge,
    type PixieDustStickyRegionElement,
    type PixieDustStickyRegionOffset,
} from "@/components/ui/PixieDustStickyRegion";

const elements = ["div", "aside", "nav", "header"] as const;

const edges = [
    { value: "start", label: "Début" },
    { value: "end", label: "Fin" },
] as const;

const offsets = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit · 0,5 rem" },
    { value: "sm", label: "Petit · 1 rem" },
    { value: "md", label: "Moyen · 1,5 rem" },
    { value: "lg", label: "Grand · 2 rem" },
    { value: "xl", label: "Très grand · 3 rem" },
] as const;

const materials = [
    { value: "summary", label: "Sommaire" },
    { value: "metadata", label: "Métadonnées" },
    { value: "actions", label: "Actions" },
] as const;

const lengths = [
    { value: 4, label: "Courte" },
    { value: 7, label: "Moyenne" },
    { value: 10, label: "Longue" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const sections = [
    ["Ouverture", "Le récit présente les premières ambitions du studio."],
    ["Premiers essais", "Les techniques se cherchent au fil des productions."],
    ["Le son", "La musique et les voix commencent à structurer le mouvement."],
    ["La couleur", "La palette devient un nouvel outil de narration."],
    [
        "Les personnages",
        "Les tempéraments donnent enfin un rythme propre aux figures.",
    ],
    [
        "Le studio",
        "Les métiers se spécialisent autour des nouvelles productions.",
    ],
    [
        "Les récompenses",
        "Les premiers trophées consacrent les innovations du studio.",
    ],
    ["La profondeur", "La caméra multiplane élargit la scène animée."],
    [
        "La transmission",
        "Les animateurs partagent un langage devenu collectif.",
    ],
    ["Dernière image", "Le récit rejoint les portes du premier long métrage."],
] as const;

type Material = (typeof materials)[number]["value"];

function RegionContent({ material }: Readonly<{ material: Material }>) {
    if (material === "metadata") {
        return (
            <PixieInset variant="recessed" depth="medium" padding="md">
                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                    Repères
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                    <div>
                        <dt className="text-muted">Période</dt>
                        <dd className="mt-1 text-ink">1928–1937</dd>
                    </div>
                    <div>
                        <dt className="text-muted">Œuvres</dt>
                        <dd className="mt-1 text-ink">Six jalons</dd>
                    </div>
                    <div>
                        <dt className="text-muted">Lumière</dt>
                        <dd className="mt-1 text-ink">Projection originale</dd>
                    </div>
                </dl>
            </PixieInset>
        );
    }

    if (material === "actions") {
        return (
            <PixiePanel variant="accent" padding="md">
                <p className="text-sm font-medium text-ink">
                    Conserver ce raccord ?
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        className="border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="bg-accent px-3 py-2 text-sm text-accent-contrast"
                    >
                        Enregistrer
                    </button>
                </div>
            </PixiePanel>
        );
    }

    return (
        <PixiePanel variant="outline" padding="md">
            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                Dans cette fiche
            </p>
            <ol className="mt-4 space-y-2 text-sm text-ink-soft">
                {["Ouverture", "Premiers essais", "Le son", "La couleur"].map(
                    (label, index) => (
                        <li key={label}>
                            <span className="mr-2 font-mono text-xs text-accent">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {label}
                        </li>
                    ),
                )}
            </ol>
        </PixiePanel>
    );
}

export function PixieDustStickyRegionPlayground() {
    const [element, setElement] =
        useState<PixieDustStickyRegionElement>("aside");
    const [edge, setEdge] = useState<PixieDustStickyRegionEdge>("start");
    const [offset, setOffset] = useState<PixieDustStickyRegionOffset>("md");
    const [material, setMaterial] = useState<Material>("summary");
    const [length, setLength] = useState(7);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const labelLine =
        element === "nav"
            ? '    aria-label="Dans cette fiche"\n'
            : element === "aside"
              ? '    aria-label="Repères de la fiche"\n'
              : "";
    const code = `<PixieDustStickyRegion
    as="${element}"
    edge="${edge}"
    offset="${offset}"
${labelLine}>
    {/* ${materials.find(({ value }) => value === material)?.label} */}
</PixieDustStickyRegion>`;

    const stickyRegion = (
        <PixieDustStickyRegion
            as={element}
            edge={edge}
            offset={offset}
            aria-label={
                element === "nav"
                    ? "Dans cette fiche"
                    : element === "aside"
                      ? "Repères de la fiche"
                      : undefined
            }
        >
            <RegionContent material={material} />
        </PixieDustStickyRegion>
    );

    const editorialContent = (
        <PixieStack gap="xl">
            {sections.slice(0, length).map(([title, description], index) => (
                <section
                    key={title}
                    aria-labelledby={`sticky-preview-${index}`}
                >
                    <p className="font-mono text-xs text-accent">
                        Séquence {String(index + 1).padStart(2, "0")}
                    </p>
                    <h5
                        id={`sticky-preview-${index}`}
                        className="mt-3 text-2xl text-ink"
                    >
                        {title}
                    </h5>
                    <p className="mt-4 leading-7 text-ink-soft">
                        {description}
                    </p>
                    <div className="mt-5 h-20 border border-dashed border-line-strong bg-surface-muted" />
                </section>
            ))}
        </PixieStack>
    );

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="sticky-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="sticky-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustStickyRegionElement,
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
                                Bord d’attache
                            </legend>
                            <div className="mt-3 space-y-2">
                                {edges.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sticky-edge"
                                        {...option}
                                        selectedValue={edge}
                                        onChange={setEdge}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Décalage
                            </legend>
                            <div className="mt-3 space-y-2">
                                {offsets.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sticky-offset"
                                        {...option}
                                        selectedValue={offset}
                                        onChange={setOffset}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="sticky-material"
                                className="text-sm font-medium text-ink"
                            >
                                Matière de la région
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="sticky-material"
                                value={material}
                                onChange={(event) =>
                                    setMaterial(event.target.value as Material)
                                }
                                className="mt-2"
                            >
                                {materials.map((option) => (
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
                                Longueur du récit
                            </legend>
                            <div className="mt-3 space-y-2">
                                {lengths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sticky-length"
                                        value={String(option.value)}
                                        label={option.label}
                                        selectedValue={String(length)}
                                        onChange={(value) =>
                                            setLength(Number(value))
                                        }
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-xs leading-5 text-muted">
                                Réglage propre au plateau, absent de l’API.
                            </p>
                        </fieldset>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[44rem] items-center justify-center overflow-hidden bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full min-w-0 border border-dashed border-line-strong transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <div
                                tabIndex={0}
                                aria-label="Plateau vertical défilable"
                                className="h-[36rem] overflow-y-auto p-5 sm:p-7"
                            >
                                {edge === "start" ? (
                                    <PixieSidebar
                                        side="start"
                                        sidebar={stickyRegion}
                                        sideWidth="sm"
                                        contentMinWidth="half"
                                        gap="lg"
                                        align="start"
                                    >
                                        {editorialContent}
                                    </PixieSidebar>
                                ) : (
                                    <PixieStack gap="xl">
                                        {editorialContent}
                                        {stickyRegion}
                                    </PixieStack>
                                )}
                            </div>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
