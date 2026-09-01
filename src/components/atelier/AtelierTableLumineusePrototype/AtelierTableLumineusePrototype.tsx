"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSearchField } from "@/components/ui/PixieSearchField";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type {
    CodexPlanEvidencePosition,
    CodexPlanEvidenceScope,
    CodexPlanEvidenceStatus,
    CodexPlanRuntimeState,
    CodexPlanSourceClassification,
    CodexTableLumineuseItem,
} from "@/types/codex-plans";
import type {
    AtelierTableLumineuseClassification,
    AtelierTableLumineuseCountershot,
    AtelierTableLumineuseDensity,
    AtelierTableLumineuseEvidence,
    AtelierTableLumineuseLayout,
    AtelierTableLumineuseLight,
    AtelierTableLumineuseMatterKey,
    AtelierTableLumineuseObjective,
    AtelierTableLumineusePosition,
    AtelierTableLumineusePrototypeProps,
    AtelierTableLumineuseScope,
    AtelierTableLumineuseStatus,
    AtelierTableLumineuseView,
} from "./AtelierTableLumineusePrototype.types";
import styles from "./AtelierTableLumineusePrototype.module.css";

const angleOptions = [
    ["provenance", "Provenance"],
    ["reception", "Réception"],
    ["contradiction", "Contradictions"],
    ["geography", "Géographie"],
    ["uncertainty", "Incertitudes"],
] as const satisfies readonly (readonly [AtelierTableLumineuseView, string])[];

const objectiveLabels = {
    verify: "Vérifier",
    understand: "Comprendre",
    compare: "Comparer",
} as const satisfies Record<AtelierTableLumineuseObjective, string>;

const scopeLabels = {
    fiche: "Fiche",
    "editorial-block": "Bloc éditorial",
    "alternate-name": "Nom alternatif",
    "character-form": "Forme du personnage",
    "alternate-title": "Titre alternatif",
    duration: "Durée",
    production: "Production",
    "release-event": "Sortie",
    "work-version": "Version d’œuvre",
    "work-exploitation": "Exploitation",
    "work-reception": "Réception",
    "economic-data": "Donnée économique",
    "work-relation": "Relation d’œuvre",
    reward: "Récompense",
} as const satisfies Record<CodexPlanEvidenceScope, string>;

const statusLabels = {
    documented: "Documentée",
    "partially-resolved": "Partiellement résolue",
    undocumented: "Non documentée",
} as const satisfies Record<CodexPlanEvidenceStatus, string>;

const positionLabels = {
    supports: "Conforte",
    nuances: "Nuance",
    contradicts: "Contredit",
    inconclusive: "Ne tranche pas",
    unclassified: "Non classée",
} as const satisfies Record<CodexPlanEvidencePosition, string>;

const classificationLabels = {
    primary: "Source primaire",
    secondary: "Source secondaire",
    database: "Base documentaire",
    "editorial-interpretation": "Interprétation éditoriale",
    unclassified: "Nature non classée",
} as const satisfies Record<CodexPlanSourceClassification, string>;

const runtimeLabels = {
    idle: "En attente d’un Sujet",
    loading: "Les preuves rejoignent la table",
    ready: "Registre prêt à vérifier",
    empty: "Aucune preuve dans le Cadre",
    sparse: "Matière documentaire réduite",
    dense: "Registre dense à parcourir",
    incomplete: "Registre encore incomplet",
    error: "Projection impossible",
} as const satisfies Record<CodexPlanRuntimeState, string>;

const positionColors = {
    supports: "vert-cellulo",
    nuances: "bleu-reperage",
    contradicts: "rouge-crayon",
    inconclusive: "jaune-lampe",
    unclassified: "graphite",
} as const;

type EvidenceGroup = Readonly<{
    id: string;
    label: string;
    description: string;
    items: readonly CodexTableLumineuseItem[];
}>;

function normalizeSearch(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr")
        .replace(/\s+/g, " ")
        .trim();
}

function Setting({
    label,
    children,
    hint,
}: Readonly<{
    label: string;
    children: React.ReactNode;
    hint?: string;
}>) {
    return (
        <label className={styles.setting}>
            <span>{label}</span>
            {children}
            {hint ? <small>{hint}</small> : null}
        </label>
    );
}

function sourceTerritory(item: CodexTableLumineuseItem) {
    return (
        item.facts.find((fact) => fact.label === "Territoire")?.value ??
        "Territoire non renseigné"
    );
}

function createGroups(
    angle: AtelierTableLumineuseView,
    items: readonly CodexTableLumineuseItem[],
): readonly EvidenceGroup[] {
    const definition =
        angle === "provenance"
            ? {
                  key: (item: CodexTableLumineuseItem) => item.scope,
                  label: (key: string) =>
                      scopeLabels[key as CodexPlanEvidenceScope],
                  description: "Type d’affirmation documentée",
              }
            : angle === "reception"
              ? {
                    key: (item: CodexTableLumineuseItem) => item.status,
                    label: (key: string) =>
                        statusLabels[key as CodexPlanEvidenceStatus],
                    description: "État de résolution documentaire",
                }
              : angle === "contradiction"
                ? {
                      key: (item: CodexTableLumineuseItem) => item.position,
                      label: (key: string) =>
                          positionLabels[key as CodexPlanEvidencePosition],
                      description: "Position déclarée de la preuve",
                  }
                : angle === "geography"
                  ? {
                        key: sourceTerritory,
                        label: (key: string) => key,
                        description: "Territoire explicitement conservé",
                    }
                  : {
                        key: (item: CodexTableLumineuseItem) =>
                            item.status === "documented" &&
                            item.position !== "unclassified" &&
                            item.sourceClassification !== "unclassified"
                                ? "qualified"
                                : "unresolved",
                        label: (key: string) =>
                            key === "qualified"
                                ? "Cadre qualifié"
                                : "Incertitudes conservées",
                        description:
                            "Ce qui peut être lu sans effacer les lacunes",
                    };
    const keys = [...new Set(items.map(definition.key))];

    return keys.map((key) => ({
        id: `${angle}:${key}`,
        label: definition.label(key),
        description: definition.description,
        items: items.filter((item) => definition.key(item) === key),
    }));
}

function sourceCount(item: CodexTableLumineuseItem) {
    return item.sources.length + item.unresolvedSourceIds.length;
}

function ignoreSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
}

function formatComparison(item: CodexTableLumineuseItem) {
    return item.facts.find((fact) => fact.numericValue !== undefined);
}

export function AtelierTableLumineusePrototype({
    projections,
}: AtelierTableLumineusePrototypeProps) {
    const [matterKey, setMatterKey] =
        useState<AtelierTableLumineuseMatterKey>("archives");
    const [angle, setAngle] = useState<AtelierTableLumineuseView>("provenance");
    const [objective, setObjective] =
        useState<AtelierTableLumineuseObjective>("verify");
    const [scope, setScope] = useState<AtelierTableLumineuseScope>("all");
    const [status, setStatus] = useState<AtelierTableLumineuseStatus>("all");
    const [position, setPosition] =
        useState<AtelierTableLumineusePosition>("all");
    const [classification, setClassification] =
        useState<AtelierTableLumineuseClassification>("all");
    const [layout, setLayout] = useState<AtelierTableLumineuseLayout>("table");
    const [density, setDensity] =
        useState<AtelierTableLumineuseDensity>("comfortable");
    const [evidence, setEvidence] =
        useState<AtelierTableLumineuseEvidence>("summary");
    const [countershot, setCountershot] =
        useState<AtelierTableLumineuseCountershot>("visible");
    const [light, setLight] = useState<AtelierTableLumineuseLight>("sombre");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string>();
    const [comparisonIds, setComparisonIds] = useState<readonly string[]>([]);
    const projection =
        projections.find((item) => item.matterKey === matterKey) ??
        projections[0];
    const model = projection.model;
    const normalizedQuery = normalizeSearch(query);
    const filtered = useMemo(
        () =>
            model.items.filter(
                (item) =>
                    (scope === "all" || item.scope === scope) &&
                    (status === "all" || item.status === status) &&
                    (position === "all" || item.position === position) &&
                    (classification === "all" ||
                        item.sourceClassification === classification) &&
                    (!normalizedQuery ||
                        item.searchKey.includes(normalizedQuery)),
            ),
        [classification, model.items, normalizedQuery, position, scope, status],
    );
    const groups = useMemo(
        () => createGroups(angle, filtered),
        [angle, filtered],
    );
    const selected =
        filtered.find((item) => item.id === selectedId) ?? filtered[0];
    const comparisonItems = comparisonIds
        .map((id) => model.items.find((item) => item.id === id))
        .filter((item): item is CodexTableLumineuseItem => item !== undefined);

    function toggleComparison(id: string) {
        setComparisonIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : current.length < 2
                  ? [...current, id]
                  : [current[1], id],
        );
    }

    return (
        <div
            className={styles.projection}
            data-light={light}
            data-density={density}
        >
            <header className={styles.prototypeHeader}>
                <div className={styles.titleGroup}>
                    <PixieSymbol
                        registry="techniques"
                        collection="animation"
                        slug="table-lumineuse"
                        size={72}
                    />
                    <div>
                        <p className={styles.eyebrow}>
                            Prototype privé · v0.1.0
                        </p>
                        <h3 className={styles.prototypeTitle}>
                            Les preuves passent sous la lumière
                        </h3>
                        <p className={styles.prototypeDescription}>
                            Chaque affirmation conserve ses sources, ses faits
                            et ses incertitudes. Aucun indice de fiabilité ne
                            remplace la lecture documentaire.
                        </p>
                    </div>
                </div>
                <div className={styles.badges}>
                    <PixieBadge color="jaune-lampe" variant="soft" size="sm">
                        {objectiveLabels[objective]}
                    </PixieBadge>
                    <PixieBadge variant="outline" size="sm">
                        {filtered.length} affirmation
                        {filtered.length > 1 ? "s" : ""}
                    </PixieBadge>
                </div>
            </header>

            <PixiePanel
                className={styles.controlPanel}
                variant="muted"
                color="jaune-lampe"
                padding="lg"
            >
                <header className={styles.panelHeader}>
                    <div>
                        <p className={styles.eyebrow}>Régie</p>
                        <h4>Régler la table lumineuse</h4>
                    </div>
                    <span className={styles.liveCount} aria-live="polite">
                        {runtimeLabels[model.runtimeState]}
                    </span>
                </header>
                <div className={styles.settings}>
                    <Setting label="Matière">
                        <PixieSelect
                            value={matterKey}
                            onChange={(event) => {
                                setMatterKey(
                                    event.target
                                        .value as AtelierTableLumineuseMatterKey,
                                );
                                setSelectedId(undefined);
                                setComparisonIds([]);
                            }}
                            mode="popover"
                            portal
                            size="sm"
                            color="jaune-lampe"
                        >
                            {projections.map((item) => (
                                <option
                                    key={item.matterKey}
                                    value={item.matterKey}
                                >
                                    {item.matterLabel}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Angle">
                        <PixieSelect
                            value={angle}
                            onChange={(event) =>
                                setAngle(
                                    event.target
                                        .value as AtelierTableLumineuseView,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="jaune-lampe"
                        >
                            {angleOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Objectif">
                        <PixieSelect
                            value={objective}
                            onChange={(event) => {
                                const value = event.target
                                    .value as AtelierTableLumineuseObjective;
                                setObjective(value);
                                if (value === "compare") {
                                    setLayout("comparison");
                                }
                            }}
                            mode="popover"
                            portal
                            size="sm"
                            color="jaune-lampe"
                        >
                            {Object.entries(objectiveLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Portée">
                        <PixieSelect
                            value={scope}
                            onChange={(event) =>
                                setScope(
                                    event.target
                                        .value as AtelierTableLumineuseScope,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="all">Toutes</option>
                            {Object.entries(scopeLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting label="État">
                        <PixieSelect
                            value={status}
                            onChange={(event) =>
                                setStatus(
                                    event.target
                                        .value as AtelierTableLumineuseStatus,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="all">Tous</option>
                            {Object.entries(statusLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Position">
                        <PixieSelect
                            value={position}
                            onChange={(event) =>
                                setPosition(
                                    event.target
                                        .value as AtelierTableLumineusePosition,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="all">Toutes</option>
                            {Object.entries(positionLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Nature de source">
                        <PixieSelect
                            value={classification}
                            onChange={(event) =>
                                setClassification(
                                    event.target
                                        .value as AtelierTableLumineuseClassification,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="all">Toutes</option>
                            {Object.entries(classificationLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Disposition">
                        <PixieSelect
                            value={layout}
                            onChange={(event) =>
                                setLayout(
                                    event.target
                                        .value as AtelierTableLumineuseLayout,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="table">Table</option>
                            <option value="comparison">Comparaison</option>
                            <option value="register">Registre</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Densité">
                        <PixieSelect
                            value={density}
                            onChange={(event) =>
                                setDensity(
                                    event.target
                                        .value as AtelierTableLumineuseDensity,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="comfortable">Confortable</option>
                            <option value="compact">Compacte</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Preuves">
                        <PixieSelect
                            value={evidence}
                            onChange={(event) =>
                                setEvidence(
                                    event.target
                                        .value as AtelierTableLumineuseEvidence,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="summary">Résumé</option>
                            <option value="developed">Développées</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Contrechamp">
                        <PixieSelect
                            value={countershot}
                            onChange={(event) =>
                                setCountershot(
                                    event.target
                                        .value as AtelierTableLumineuseCountershot,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                        >
                            <option value="visible">Visible</option>
                            <option value="collapsed">Replié</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Lumière">
                        <PixieSelect
                            value={light}
                            onChange={(event) =>
                                setLight(
                                    event.target
                                        .value as AtelierTableLumineuseLight,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="jaune-lampe"
                        >
                            <option value="sombre">Sombre</option>
                            <option value="claire">Claire</option>
                        </PixieSelect>
                    </Setting>
                </div>
                <PixieSearchField
                    label="Rechercher dans les affirmations et les sources"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery("")}
                    onSubmit={ignoreSubmit}
                    submitLabel="Chercher"
                    placeholder="Affirmation, source, territoire, fait…"
                    clearable
                    composition="joined"
                    size="sm"
                    color="jaune-lampe"
                />
            </PixiePanel>

            <section className={styles.stage}>
                <header className={styles.masterHeader}>
                    <div>
                        <p className={styles.eyebrow}>Plan maître</p>
                        <h4 className={styles.masterTitle}>
                            {model.subject.label}
                        </h4>
                        <p>
                            {model.stats.items} affirmations ·{" "}
                            {model.stats.sources} sources uniques ·{" "}
                            {model.stats.attachments} attaches documentaires
                        </p>
                    </div>
                    <div className={styles.badges}>
                        <PixieBadge variant="outline" size="xs">
                            {runtimeLabels[model.runtimeState]}
                        </PixieBadge>
                        <PixieBadge
                            color="jaune-lampe"
                            variant="soft"
                            size="xs"
                        >
                            {projection.matterLabel}
                        </PixieBadge>
                    </div>
                </header>

                {model.notices.length > 0 ? (
                    <PixieCallout
                        variant="outline"
                        color="jaune-lampe"
                        heading="Incertitudes conservées"
                    >
                        <ul className={styles.noticeList}>
                            {model.notices.slice(0, 4).map((notice, index) => (
                                <li
                                    key={`${notice.code}-${notice.itemId ?? index}`}
                                >
                                    {notice.message}
                                </li>
                            ))}
                        </ul>
                    </PixieCallout>
                ) : null}

                {filtered.length === 0 ? (
                    <PixieCallout
                        variant="outline"
                        color="jaune-lampe"
                        heading="Aucune preuve dans ce Cadre"
                    >
                        Le Sujet reste visible. Modifiez la recherche, la
                        Matière ou les filtres pour retrouver le registre.
                    </PixieCallout>
                ) : layout === "comparison" ? (
                    <div className={styles.comparisonLayout}>
                        <div className={styles.comparisonPicker}>
                            <p className={styles.eyebrow}>
                                Choisir deux affirmations
                            </p>
                            {filtered.map((item) => (
                                <label key={item.id} className={styles.pickRow}>
                                    <input
                                        type="checkbox"
                                        checked={comparisonIds.includes(
                                            item.id,
                                        )}
                                        onChange={() =>
                                            toggleComparison(item.id)
                                        }
                                    />
                                    <span>{item.label}</span>
                                    <small>{scopeLabels[item.scope]}</small>
                                </label>
                            ))}
                        </div>
                        <div className={styles.comparisonStage}>
                            {[0, 1].map((slot) => {
                                const item = comparisonItems[slot];
                                const value = item
                                    ? formatComparison(item)
                                    : undefined;

                                return (
                                    <PixieCard
                                        key={slot}
                                        variant="outline"
                                        color={
                                            item
                                                ? positionColors[item.position]
                                                : "graphite"
                                        }
                                        padding="lg"
                                        className={styles.comparisonCard}
                                    >
                                        {item ? (
                                            <>
                                                <p className={styles.eyebrow}>
                                                    Comparatif {slot + 1}
                                                </p>
                                                <h5>{item.label}</h5>
                                                <p>{item.owner.label}</p>
                                                {value ? (
                                                    <strong
                                                        className={
                                                            styles.bigValue
                                                        }
                                                    >
                                                        {value.value}
                                                    </strong>
                                                ) : (
                                                    <small>
                                                        Aucun fait numérique
                                                        comparable sans
                                                        interprétation.
                                                    </small>
                                                )}
                                            </>
                                        ) : (
                                            <p className={styles.emptySlot}>
                                                Sélectionnez une affirmation.
                                            </p>
                                        )}
                                    </PixieCard>
                                );
                            })}
                            {comparisonItems.length === 2 ? (
                                <p className={styles.comparisonNote}>
                                    {(() => {
                                        const first = formatComparison(
                                            comparisonItems[0],
                                        );
                                        const second = formatComparison(
                                            comparisonItems[1],
                                        );
                                        return first &&
                                            second &&
                                            first.unit === second.unit
                                            ? `Écart arithmétique : ${new Intl.NumberFormat("fr-FR").format(Math.abs((first.numericValue ?? 0) - (second.numericValue ?? 0)))} ${first.unit ?? ""}. Cet écart n’est pas un verdict.`
                                            : "Les deux affirmations restent juxtaposées : leurs unités ne permettent pas un calcul honnête.";
                                    })()}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : layout === "register" ? (
                    <ol className={styles.register}>
                        {filtered.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <strong>{item.label}</strong>
                                    <span>
                                        {scopeLabels[item.scope]} ·{" "}
                                        {item.owner.label}
                                    </span>
                                </div>
                                <span>{sourceCount(item)} source(s)</span>
                                <span>{positionLabels[item.position]}</span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className={styles.tableLayout}>
                        <div className={styles.groups}>
                            {groups.map((group) => (
                                <section
                                    key={group.id}
                                    className={styles.group}
                                    aria-labelledby={`${group.id.replace(/[^a-z0-9-]/gi, "-")}-title`}
                                >
                                    <header className={styles.groupHeader}>
                                        <div>
                                            <p>{group.description}</p>
                                            <h5
                                                id={`${group.id.replace(/[^a-z0-9-]/gi, "-")}-title`}
                                            >
                                                {group.label}
                                            </h5>
                                        </div>
                                        <PixieBadge variant="outline" size="xs">
                                            {group.items.length}
                                        </PixieBadge>
                                    </header>
                                    <ul className={styles.evidenceGrid}>
                                        {group.items.map((item) => (
                                            <li key={item.id}>
                                                <PixieCard
                                                    variant="outline"
                                                    color={
                                                        positionColors[
                                                            item.position
                                                        ]
                                                    }
                                                    padding="none"
                                                    className={
                                                        styles.evidenceCard
                                                    }
                                                >
                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.evidenceButton
                                                        }
                                                        onClick={() =>
                                                            setSelectedId(
                                                                item.id,
                                                            )
                                                        }
                                                        aria-pressed={
                                                            selected?.id ===
                                                            item.id
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.cardMeta
                                                            }
                                                        >
                                                            {
                                                                scopeLabels[
                                                                    item.scope
                                                                ]
                                                            }
                                                            <PixieBadge
                                                                variant="soft"
                                                                color={
                                                                    positionColors[
                                                                        item
                                                                            .position
                                                                    ]
                                                                }
                                                                size="xs"
                                                            >
                                                                {
                                                                    positionLabels[
                                                                        item
                                                                            .position
                                                                    ]
                                                                }
                                                            </PixieBadge>
                                                        </span>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                        <span>
                                                            {item.owner.label}
                                                        </span>
                                                        <small>
                                                            {sourceCount(item)}{" "}
                                                            source
                                                            {sourceCount(item) >
                                                            1
                                                                ? "s"
                                                                : ""}
                                                        </small>
                                                    </button>
                                                </PixieCard>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                        {selected ? (
                            <aside className={styles.inspector}>
                                <p className={styles.eyebrow}>Inspecteur</p>
                                <h5>{selected.label}</h5>
                                <p className={styles.inspectorOwner}>
                                    {selected.owner.label} ·{" "}
                                    {scopeLabels[selected.scope]}
                                </p>
                                <div className={styles.badges}>
                                    <PixieBadge
                                        color={
                                            positionColors[selected.position]
                                        }
                                        variant="soft"
                                        size="xs"
                                    >
                                        {positionLabels[selected.position]}
                                    </PixieBadge>
                                    <PixieBadge variant="outline" size="xs">
                                        {statusLabels[selected.status]}
                                    </PixieBadge>
                                </div>
                                {selected.facts.length > 0 ? (
                                    <dl className={styles.factList}>
                                        {selected.facts.map((fact) => (
                                            <div
                                                key={`${fact.label}-${fact.value}`}
                                            >
                                                <dt>{fact.label}</dt>
                                                <dd>{fact.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                ) : null}
                                <div className={styles.sources}>
                                    <p className={styles.eyebrow}>Sources</p>
                                    {selected.sources.map((source) => (
                                        <article key={source.id}>
                                            {source.url ? (
                                                <PixieLink
                                                    href={source.url}
                                                    variant="inline"
                                                    indicator="external"
                                                    color="jaune-lampe"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {source.label}
                                                </PixieLink>
                                            ) : (
                                                <strong>{source.label}</strong>
                                            )}
                                            {evidence === "developed" ? (
                                                <small>
                                                    {source.author ??
                                                        source.publisher ??
                                                        "Auteur non renseigné"}
                                                    {" · "}
                                                    {
                                                        classificationLabels[
                                                            source
                                                                .classification
                                                        ]
                                                    }
                                                </small>
                                            ) : null}
                                        </article>
                                    ))}
                                    {selected.unresolvedSourceIds.map((id) => (
                                        <article key={id}>
                                            <strong>{id}</strong>
                                            <small>Source non résolue</small>
                                        </article>
                                    ))}
                                </div>
                            </aside>
                        ) : null}
                    </div>
                )}

                {countershot === "visible" ? (
                    <details className={styles.countershot} open>
                        <summary>
                            <span>
                                <small>Contrechamp textuel</small>
                                Registre des affirmations et sources
                            </span>
                            <PixieBadge variant="outline" size="xs">
                                {filtered.length} entrées
                            </PixieBadge>
                        </summary>
                        <ol>
                            {filtered.map((item) => (
                                <li key={`text-${item.id}`}>
                                    <strong>{item.label}</strong> —{" "}
                                    {item.owner.label},{" "}
                                    {statusLabels[item.status].toLowerCase()},{" "}
                                    {sourceCount(item)} source
                                    {sourceCount(item) > 1 ? "s" : ""},{" "}
                                    {positionLabels[
                                        item.position
                                    ].toLowerCase()}
                                    .
                                </li>
                            ))}
                        </ol>
                    </details>
                ) : null}
            </section>
        </div>
    );
}
