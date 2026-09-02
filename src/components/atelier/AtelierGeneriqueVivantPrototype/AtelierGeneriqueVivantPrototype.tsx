"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSearchField } from "@/components/ui/PixieSearchField";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieStickyRegion } from "@/components/ui/PixieStickyRegion";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { FocaleAnnotation } from "@/components/focale/FocaleAnnotation";
import { FocaleLegend } from "@/components/focale/FocaleLegend";
import { FocaleMark } from "@/components/focale/FocaleMark";
import { FocaleTable } from "@/components/focale/FocaleTable";
import type { FocaleTableColumn } from "@/components/focale/FocaleTable";
import { FocaleViewport } from "@/components/focale/FocaleViewport";
import { getCreditDomainDefinition } from "@/registry/credits";
import type {
    CodexGeneriqueVivantAngleView,
    CodexGeneriqueVivantContribution,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";
import type {
    AtelierGeneriqueVivantLight,
    AtelierGeneriqueVivantInspectorMode,
    AtelierGeneriqueVivantMatterKey,
    AtelierGeneriqueVivantObjective,
    AtelierGeneriqueVivantPresence,
    AtelierGeneriqueVivantPrototypeProps,
    AtelierGeneriqueVivantSort,
    AtelierGeneriqueVivantView,
} from "./AtelierGeneriqueVivantPrototype.types";
import styles from "./AtelierGeneriqueVivantPrototype.module.css";

const angleOptions = [
    ["departments", "Domaines"],
    ["roles", "Rôles exacts"],
    ["responsibilities", "Responsabilités"],
    ["collaborations", "Co-présences"],
    ["recurrences", "Récurrences"],
] as const satisfies readonly (readonly [AtelierGeneriqueVivantView, string])[];

const objectiveLabels = {
    understand: "Comprendre",
    find: "Retrouver",
    compare: "Comparer",
} as const satisfies Record<AtelierGeneriqueVivantObjective, string>;

const objectiveByAngle = {
    departments: "understand",
    roles: "find",
    responsibilities: "compare",
    collaborations: "understand",
    recurrences: "compare",
} as const satisfies Record<
    AtelierGeneriqueVivantView,
    AtelierGeneriqueVivantObjective
>;

const runtimeLabels = {
    idle: "En attente d’un Sujet",
    loading: "Le générique rejoint le plateau",
    ready: "Générique prêt à explorer",
    empty: "Aucun crédit dans le Cadre",
    sparse: "Générique réduit",
    dense: "Générique dense à parcourir",
    incomplete: "Générique partiellement résolu",
    error: "Projection impossible",
} as const satisfies Record<CodexPlanRuntimeState, string>;

type ViewGroup = Readonly<{
    id: string;
    label: string;
    actionLabel: string;
    items: readonly CodexGeneriqueVivantContribution[];
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

function createViewGroups(
    view: CodexGeneriqueVivantAngleView,
    items: readonly CodexGeneriqueVivantContribution[],
): readonly ViewGroup[] {
    return view.groups
        .map((group) => ({
            id: group.id,
            label: group.label,
            actionLabel: group.actionLabel,
            items: items.filter((item) =>
                group.contributionIds.includes(item.id),
            ),
        }))
        .filter((group) => group.items.length > 0);
}

function uniqueViewItems(groups: readonly ViewGroup[]) {
    const seen = new Set<string>();

    return groups.flatMap((group) =>
        group.items.filter((item) => {
            if (seen.has(item.id)) {
                return false;
            }
            seen.add(item.id);
            return true;
        }),
    );
}

function contributorHref(item: CodexGeneriqueVivantContribution) {
    return item.contributor.resolved && item.contributor.slug
        ? `/contributeurs/${item.contributor.slug}`
        : undefined;
}

function sourceCount(item: CodexGeneriqueVivantContribution) {
    return new Set(
        item.provenance.flatMap((provenance) => provenance.sourceIds ?? []),
    ).size;
}

const countershotColumns = [
    {
        id: "contributor",
        header: "Personne",
        render: (item) => {
            const href = contributorHref(item);

            return href ? (
                <PixieLink href={href}>{item.contributor.label}</PixieLink>
            ) : (
                <strong>{item.contributor.label}</strong>
            );
        },
    },
    {
        id: "roles",
        header: "Rôle documenté",
        render: (item) => item.roles.join(" · "),
    },
    {
        id: "domain",
        header: "Domaine",
        render: (item) => item.domainLabel,
    },
    {
        id: "presence",
        header: "Présence",
        render: (item) =>
            item.contributor.resolved ? "Fiche publiée" : "Mention non publiée",
    },
    {
        id: "works",
        header: "Œuvres documentées",
        render: (item) => item.recurrenceWorkLabels.join(" · "),
    },
    {
        id: "provenance",
        header: "Provenance",
        render: (item) =>
            item.provenance
                .map((provenance) => provenance.explanation ?? provenance.kind)
                .join(" · "),
    },
] as const satisfies readonly FocaleTableColumn<CodexGeneriqueVivantContribution>[];

export function AtelierGeneriqueVivantPrototype({
    projections,
}: AtelierGeneriqueVivantPrototypeProps) {
    const [matterKey, setMatterKey] =
        useState<AtelierGeneriqueVivantMatterKey>("archives");
    const [angle, setAngle] =
        useState<AtelierGeneriqueVivantView>("departments");
    const [domain, setDomain] = useState("all");
    const [query, setQuery] = useState("");
    const [presence, setPresence] =
        useState<AtelierGeneriqueVivantPresence>("all");
    const [sort, setSort] = useState<AtelierGeneriqueVivantSort>("documentary");
    const [inspectorMode, setInspectorMode] =
        useState<AtelierGeneriqueVivantInspectorMode>("inline");
    const [inspectorOpen, setInspectorOpen] = useState(true);
    const [light, setLight] = useState<AtelierGeneriqueVivantLight>("sombre");
    const [selectedId, setSelectedId] = useState<string>();
    const [visibleLimit, setVisibleLimit] = useState(48);
    const projection =
        projections.find((item) => item.matterKey === matterKey) ??
        projections[0];
    const model = projection.model;
    const angleView = model.views[angle];
    const objective = objectiveByAngle[angle];
    const normalizedQuery = normalizeSearch(query);
    const filtered = useMemo(() => {
        const items = model.contributions.filter((item) => {
            const matchesDomain = domain === "all" || item.domain === domain;
            const matchesPresence =
                presence === "all" ||
                (presence === "published"
                    ? item.contributor.resolved
                    : !item.contributor.resolved);
            const matchesQuery =
                !normalizedQuery || item.searchKey.includes(normalizedQuery);

            return matchesDomain && matchesPresence && matchesQuery;
        });

        if (sort === "alphabetical") {
            return [...items].sort((a, b) =>
                a.contributor.label.localeCompare(b.contributor.label, "fr"),
            );
        }
        return items;
    }, [domain, model.contributions, normalizedQuery, presence, sort]);
    const viewGroups = useMemo(() => {
        const groups = createViewGroups(angleView, filtered);

        return sort === "alphabetical"
            ? [...groups].sort((a, b) => a.label.localeCompare(b.label, "fr"))
            : groups;
    }, [angleView, filtered, sort]);
    const viewItems = useMemo(() => uniqueViewItems(viewGroups), [viewGroups]);
    const selected =
        filtered.find((item) => item.id === selectedId) ?? filtered[0];
    const visibleIds = new Set(
        filtered.slice(0, visibleLimit).map((item) => item.id),
    );
    const displayedGroups = viewGroups
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => visibleIds.has(item.id)),
        }))
        .filter((group) => group.items.length > 0);
    const isDense = filtered.length > visibleLimit;

    function ignoreSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <section
            className={styles.projection}
            data-projection="originale"
            data-lumiere={light}
        >
            <header className={styles.prototypeHeader}>
                <div>
                    <p className={styles.eyebrow}>
                        Banc d’essai privé · Plan v1.0.0
                    </p>
                    <h3 className={styles.prototypeTitle}>
                        Pinocchio révèle les gestes derrière l’écran
                    </h3>
                    <p className={styles.prototypeDescription}>
                        Le générique devient une carte humaine : chaque rôle
                        reste relié à sa présence documentée, sans fabriquer de
                        hiérarchie, de valeur ni de collaboration.
                    </p>
                    <p className={styles.masterQuestion}>
                        {angleView.question}
                    </p>
                </div>
                <div className={styles.badges}>
                    <PixieBadge size="sm" color="violet-ombre-portee">
                        {objectiveLabels[objective]}
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline">
                        {model.stats.contributions} contributions
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline">
                        {model.stats.domains} domaines
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline">
                        {model.stats.unresolved} non publiée
                        {model.stats.unresolved > 1 ? "s" : ""}
                    </PixieBadge>
                </div>
            </header>

            <PixiePanel
                variant="muted"
                padding="lg"
                radius="large"
                className={styles.controlPanel}
            >
                <div className={styles.panelHeader}>
                    <div>
                        <p className={styles.eyebrow}>Régie de lecture</p>
                        <h4>Choisir comment parcourir le générique</h4>
                    </div>
                    <p
                        aria-live="polite"
                        aria-atomic="true"
                        className={styles.liveCount}
                    >
                        {viewItems.length} résultat
                        {viewItems.length > 1 ? "s" : ""}
                    </p>
                </div>
                <PixieSearchField
                    label="Rechercher dans le générique"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery("")}
                    onSubmit={ignoreSubmit}
                    submitLabel="Chercher"
                    placeholder="Nom, rôle ou domaine…"
                    clearable
                    composition="joined"
                    size="sm"
                    color="violet-ombre-portee"
                />
                <div className={styles.settings}>
                    <Setting label="Angle">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={angle}
                            onChange={(event) =>
                                setAngle(
                                    event.target
                                        .value as AtelierGeneriqueVivantView,
                                )
                            }
                        >
                            {angleOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Domaine">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={domain}
                            onChange={(event) => setDomain(event.target.value)}
                        >
                            <option value="all">Tous les domaines</option>
                            {model.groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Présence">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={presence}
                            onChange={(event) =>
                                setPresence(
                                    event.target
                                        .value as AtelierGeneriqueVivantPresence,
                                )
                            }
                        >
                            <option value="all">Toutes les références</option>
                            <option value="published">Fiches publiées</option>
                            <option value="unresolved">
                                Références non résolues
                            </option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Ordre">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={sort}
                            onChange={(event) =>
                                setSort(
                                    event.target
                                        .value as AtelierGeneriqueVivantSort,
                                )
                            }
                        >
                            <option value="documentary">
                                Ordre documentaire
                            </option>
                            <option value="alphabetical">
                                Ordre alphabétique
                            </option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Gros plan">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={inspectorMode}
                            onChange={(event) => {
                                setInspectorMode(
                                    event.target
                                        .value as AtelierGeneriqueVivantInspectorMode,
                                );
                                setInspectorOpen(true);
                            }}
                        >
                            <option value="inline">Intégré</option>
                            <option value="floating">Flottant</option>
                        </PixieSelect>
                    </Setting>
                </div>
            </PixiePanel>

            <PixiePanel
                variant="outline"
                padding="lg"
                radius="large"
                className={styles.testBench}
            >
                <div className={styles.testBenchHeader}>
                    <div>
                        <p className={styles.eyebrow}>Banc d’essai privé</p>
                        <h4>Éprouver la matière et les deux Lumières</h4>
                    </div>
                    <PixieBadge size="xs" variant="outline">
                        Hors régie de lecture
                    </PixieBadge>
                </div>
                <div className={styles.testBenchSettings}>
                    <Setting label="Matière">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={matterKey}
                            onChange={(event) => {
                                setMatterKey(
                                    event.target
                                        .value as AtelierGeneriqueVivantMatterKey,
                                );
                                setDomain("all");
                                setVisibleLimit(48);
                            }}
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
                    <Setting label="Lumière">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={light}
                            onChange={(event) =>
                                setLight(
                                    event.target
                                        .value as AtelierGeneriqueVivantLight,
                                )
                            }
                        >
                            <option value="sombre">Sombre</option>
                            <option value="claire">Claire</option>
                        </PixieSelect>
                    </Setting>
                </div>
            </PixiePanel>

            <div className={styles.stage}>
                <header className={styles.masterHeader}>
                    <div>
                        <p className={styles.eyebrow}>Plan maître</p>
                        <h4 className={styles.masterTitle}>
                            {model.subject.label}
                        </h4>
                        <p>
                            {runtimeLabels[model.runtimeState]}.{" "}
                            {model.stats.domains} domaines,{" "}
                            {model.stats.multiRole} contributions à plusieurs
                            rôles.
                        </p>
                    </div>
                    <div className={styles.badges}>
                        <PixieBadge size="sm" variant="outline">
                            {model.stats.resolved} publiées
                        </PixieBadge>
                        <PixieBadge size="sm" color="violet-ombre-portee">
                            {model.stats.unresolved} non résolues
                        </PixieBadge>
                        {selected && !inspectorOpen ? (
                            <PixieButton
                                type="button"
                                variant="ghost"
                                size="xs"
                                color="violet-ombre-portee"
                                onClick={() => setInspectorOpen(true)}
                            >
                                Afficher le gros plan
                            </PixieButton>
                        ) : null}
                    </div>
                </header>

                {model.notices.length > 0 ? (
                    <FocaleAnnotation
                        title="Raccords documentaires"
                        tone={matterKey === "archives" ? "uncertainty" : "info"}
                        provenance={projection.matterLabel}
                    >
                        {model.notices.map((notice) => (
                            <p
                                key={`${notice.code}:${notice.itemId ?? notice.message}`}
                            >
                                {notice.message}
                            </p>
                        ))}
                    </FocaleAnnotation>
                ) : null}

                <FocaleLegend
                    title="Légende des domaines"
                    items={model.groups.flatMap((group) => {
                        const definition = getCreditDomainDefinition(group.id);

                        return definition
                            ? [
                                  {
                                      id: group.id,
                                      label: group.label,
                                      description: `${group.contributionIds.length} contribution${group.contributionIds.length > 1 ? "s" : ""}`,
                                      color: `var(--atelier-animation-${definition.color})`,
                                      shape: "dot" as const,
                                  },
                              ]
                            : [];
                    })}
                    orientation="horizontal"
                />

                {viewItems.length === 0 ? (
                    <PixieCallout
                        variant="outline"
                        color="violet-ombre-portee"
                        heading={angleView.label}
                    >
                        {filtered.length === 0
                            ? "Aucune contribution ne répond à la recherche et aux filtres actuels."
                            : angleView.emptyLabel}
                    </PixieCallout>
                ) : (
                    <FocaleViewport
                        label={`Carte humaine de ${model.subject.label}`}
                        description="La longueur de chaque repère exprime une part du générique visible, jamais l’importance d’un métier ou d’une personne."
                        overflow="clip"
                        className={styles.creditViewport}
                    >
                        <div
                            className={styles.creditLayout}
                            data-inspector-mode={inspectorMode}
                        >
                            <div className={styles.creditStage}>
                                {displayedGroups.map((group) => {
                                    const definition =
                                        getCreditDomainDefinition(group.id);
                                    const style = definition
                                        ? ({
                                              "--group-color": `var(--atelier-animation-${definition.color})`,
                                          } as CSSProperties)
                                        : undefined;

                                    return (
                                        <section
                                            key={group.id}
                                            className={styles.group}
                                            style={style}
                                            aria-labelledby={`generique-group-${group.id.replace(/[^a-z0-9-]/gi, "-")}`}
                                        >
                                            <header
                                                className={styles.groupHeader}
                                            >
                                                <div
                                                    className={
                                                        styles.groupIdentity
                                                    }
                                                >
                                                    {definition ? (
                                                        <PixieSymbol
                                                            {...definition.symbol}
                                                            size={48}
                                                        />
                                                    ) : (
                                                        <span
                                                            className={
                                                                styles.groupCue
                                                            }
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    <div>
                                                        <p>
                                                            {group.actionLabel}
                                                        </p>
                                                        <h5
                                                            id={`generique-group-${group.id.replace(/[^a-z0-9-]/gi, "-")}`}
                                                        >
                                                            {group.label}
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.groupMetric
                                                    }
                                                >
                                                    <FocaleMark
                                                        shape="bar"
                                                        size="sm"
                                                        color="var(--group-color)"
                                                        value={
                                                            group.items.length /
                                                            Math.max(
                                                                1,
                                                                viewItems.length,
                                                            )
                                                        }
                                                        label={`${group.items.length} contributions sur ${viewItems.length}`}
                                                    />
                                                    <span>
                                                        {group.items.length} sur{" "}
                                                        {viewItems.length}
                                                    </span>
                                                </div>
                                            </header>
                                            <ul className={styles.creditGrid}>
                                                {group.items.map((item) => (
                                                    <li
                                                        key={`${group.id}:${item.id}`}
                                                    >
                                                        <PixieCard
                                                            asChild
                                                            variant={
                                                                selected?.id ===
                                                                item.id
                                                                    ? "accent"
                                                                    : "outline"
                                                            }
                                                            color={
                                                                definition?.color ??
                                                                "violet-ombre-portee"
                                                            }
                                                            padding="none"
                                                            radius="medium"
                                                        >
                                                            <button
                                                                type="button"
                                                                className={
                                                                    styles.creditButton
                                                                }
                                                                onClick={() => {
                                                                    setSelectedId(
                                                                        item.id,
                                                                    );
                                                                    setInspectorOpen(
                                                                        true,
                                                                    );
                                                                }}
                                                                aria-pressed={
                                                                    selected?.id ===
                                                                    item.id
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.creditStatus
                                                                    }
                                                                >
                                                                    {item
                                                                        .contributor
                                                                        .resolved
                                                                        ? "Fiche publiée"
                                                                        : "Non résolu"}
                                                                </span>
                                                                <strong>
                                                                    {
                                                                        item
                                                                            .contributor
                                                                            .label
                                                                    }
                                                                </strong>
                                                                <span
                                                                    className={
                                                                        styles.roleList
                                                                    }
                                                                >
                                                                    {item.roles.join(
                                                                        " · ",
                                                                    )}
                                                                </span>
                                                                <small
                                                                    className={
                                                                        styles.creditTrace
                                                                    }
                                                                >
                                                                    {
                                                                        item.domainLabel
                                                                    }
                                                                    {" · "}
                                                                    {
                                                                        item
                                                                            .recurrenceWorkLabels
                                                                            .length
                                                                    }{" "}
                                                                    œuvre
                                                                    {item
                                                                        .recurrenceWorkLabels
                                                                        .length >
                                                                    1
                                                                        ? "s"
                                                                        : ""}
                                                                    {" · "}
                                                                    {sourceCount(
                                                                        item,
                                                                    )}{" "}
                                                                    source
                                                                    {sourceCount(
                                                                        item,
                                                                    ) > 1
                                                                        ? "s"
                                                                        : ""}
                                                                </small>
                                                            </button>
                                                        </PixieCard>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    );
                                })}
                                {isDense ? (
                                    <PixieButton
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        color="violet-ombre-portee"
                                        className={styles.moreButton}
                                        onClick={() =>
                                            setVisibleLimit(
                                                (value) => value + 48,
                                            )
                                        }
                                    >
                                        Afficher 48 crédits supplémentaires
                                    </PixieButton>
                                ) : null}
                            </div>

                            {selected && inspectorOpen ? (
                                <PixieStickyRegion
                                    as="aside"
                                    offset="md"
                                    width="full"
                                    overflow="auto"
                                    layer={
                                        inspectorMode === "floating"
                                            ? "overlay"
                                            : "raised"
                                    }
                                    className={styles.inspectorShell}
                                    aria-label="Détail de la contribution"
                                >
                                    <PixiePanel
                                        variant="muted"
                                        padding="md"
                                        radius="large"
                                        className={styles.inspector}
                                    >
                                        <header
                                            className={styles.inspectorHeader}
                                        >
                                            <div>
                                                <p className={styles.eyebrow}>
                                                    Gros plan
                                                </p>
                                                <h5>
                                                    {selected.contributor.label}
                                                </h5>
                                            </div>
                                            <PixieButton
                                                type="button"
                                                variant="ghost"
                                                size="xs"
                                                color="violet-ombre-portee"
                                                aria-label="Fermer le gros plan"
                                                title="Fermer le gros plan"
                                                onClick={() =>
                                                    setInspectorOpen(false)
                                                }
                                            >
                                                <span aria-hidden="true">
                                                    ×
                                                </span>
                                            </PixieButton>
                                        </header>
                                        <p className={styles.inspectorDomain}>
                                            {selected.domainLabel}
                                        </p>
                                        <dl>
                                            <div>
                                                <dt>Rôles archivés</dt>
                                                <dd>
                                                    {selected.roles.join(" · ")}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Présence</dt>
                                                <dd>
                                                    {selected.contributor
                                                        .resolved
                                                        ? "Fiche publiée"
                                                        : "Référence non résolue"}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Œuvres documentées</dt>
                                                <dd>
                                                    {selected
                                                        .recurrenceWorkLabels
                                                        .length > 0
                                                        ? selected.recurrenceWorkLabels.join(
                                                              " · ",
                                                          )
                                                        : selected.work.label}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Sources rattachées</dt>
                                                <dd>
                                                    {sourceCount(selected) ||
                                                        "Aucune"}{" "}
                                                    source
                                                    {sourceCount(selected) > 1
                                                        ? "s"
                                                        : ""}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Provenance</dt>
                                                <dd>
                                                    {selected.provenance
                                                        .map(
                                                            (item) =>
                                                                item.explanation ??
                                                                item.kind,
                                                        )
                                                        .join(" · ")}
                                                </dd>
                                            </div>
                                        </dl>
                                        {contributorHref(selected) ? (
                                            <PixieLink
                                                href={contributorHref(
                                                    selected,
                                                )!}
                                                variant="action"
                                                indicator="arrow"
                                                color="violet-ombre-portee"
                                            >
                                                Ouvrir la fiche
                                            </PixieLink>
                                        ) : (
                                            <p className={styles.unresolved}>
                                                Aucune fiche publiée : le nom
                                                reste visible sans être complété
                                                artificiellement.
                                            </p>
                                        )}
                                    </PixiePanel>
                                </PixieStickyRegion>
                            ) : null}
                        </div>
                    </FocaleViewport>
                )}
            </div>

            <details className={styles.countershot} open>
                <summary>
                    Contrechamp textuel · {viewItems.length} contributions
                </summary>
                <div>
                    <FocaleTable
                        caption={`${angleView.question} · ${viewItems.length} contributions`}
                        captionHidden
                        columns={countershotColumns}
                        rows={viewItems}
                        getRowId={(item) => item.id}
                        density="compact"
                        emptyLabel="Aucune contribution ne répond au Cadre actuel."
                    />
                </div>
            </details>
        </section>
    );
}
