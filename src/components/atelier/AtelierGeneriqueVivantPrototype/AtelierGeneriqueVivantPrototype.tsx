"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSearchField } from "@/components/ui/PixieSearchField";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { FocaleTable } from "@/components/focale/FocaleTable";
import type { FocaleTableColumn } from "@/components/focale/FocaleTable";
import { getCreditDomainDefinition } from "@/registry/credits";
import type {
    CodexGeneriqueVivantAngleView,
    CodexGeneriqueVivantContribution,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";
import type {
    AtelierGeneriqueVivantCountershot,
    AtelierGeneriqueVivantDensity,
    AtelierGeneriqueVivantEvidence,
    AtelierGeneriqueVivantLight,
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
    const [objective, setObjective] =
        useState<AtelierGeneriqueVivantObjective>("understand");
    const [domain, setDomain] = useState("all");
    const [query, setQuery] = useState("");
    const [presence, setPresence] =
        useState<AtelierGeneriqueVivantPresence>("all");
    const [sort, setSort] = useState<AtelierGeneriqueVivantSort>("documentary");
    const [density, setDensity] =
        useState<AtelierGeneriqueVivantDensity>("comfortable");
    const [evidence, setEvidence] =
        useState<AtelierGeneriqueVivantEvidence>("summary");
    const [countershot, setCountershot] =
        useState<AtelierGeneriqueVivantCountershot>("visible");
    const [light, setLight] = useState<AtelierGeneriqueVivantLight>("sombre");
    const [selectedId, setSelectedId] = useState<string>();
    const [visibleLimit, setVisibleLimit] = useState(48);
    const projection =
        projections.find((item) => item.matterKey === matterKey) ??
        projections[0];
    const model = projection.model;
    const angleView = model.views[angle];
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

        if (sort === "alphabetical" || objective === "find") {
            return [...items].sort((a, b) =>
                a.contributor.label.localeCompare(b.contributor.label, "fr"),
            );
        }
        if (objective === "compare") {
            return [...items].sort(
                (a, b) =>
                    b.roles.length - a.roles.length ||
                    b.recurrenceWorkLabels.length -
                        a.recurrenceWorkLabels.length ||
                    a.contributor.label.localeCompare(
                        b.contributor.label,
                        "fr",
                    ),
            );
        }

        return items;
    }, [
        domain,
        model.contributions,
        normalizedQuery,
        objective,
        presence,
        sort,
    ]);
    const viewGroups = useMemo(
        () => createViewGroups(angleView, filtered),
        [angleView, filtered],
    );
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
            data-density={density}
        >
            <header className={styles.prototypeHeader}>
                <div>
                    <p className={styles.eyebrow}>Prototype privé · v0.2.0</p>
                    <h3 className={styles.prototypeTitle}>
                        Le générique devient une carte humaine
                    </h3>
                    <p className={styles.prototypeDescription}>
                        Les 31 contributions de Pinocchio rendent visibles huit
                        domaines de fabrication sans fabriquer de hiérarchie, de
                        valeur ni de collaboration.
                    </p>
                </div>
                <div className={styles.badges}>
                    <PixieBadge size="sm" color="violet-ombre-portee">
                        {objectiveLabels[objective]}
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline">
                        {model.stats.contributions} contributions
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
                        <p className={styles.eyebrow}>Régie</p>
                        <h4>Régler la distribution</h4>
                    </div>
                    <p aria-live="polite" className={styles.liveCount}>
                        {viewItems.length} résultat
                        {viewItems.length > 1 ? "s" : ""}
                    </p>
                </div>
                <div className={styles.settings}>
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
                    <Setting label="Objectif">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={objective}
                            onChange={(event) =>
                                setObjective(
                                    event.target
                                        .value as AtelierGeneriqueVivantObjective,
                                )
                            }
                        >
                            <option value="understand">Comprendre</option>
                            <option value="find">Retrouver</option>
                            <option value="compare">Comparer</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Cadre">
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
                    <Setting label="Densité">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={density}
                            onChange={(event) =>
                                setDensity(
                                    event.target
                                        .value as AtelierGeneriqueVivantDensity,
                                )
                            }
                        >
                            <option value="comfortable">Confortable</option>
                            <option value="compact">Compacte</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Preuves">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={evidence}
                            onChange={(event) =>
                                setEvidence(
                                    event.target
                                        .value as AtelierGeneriqueVivantEvidence,
                                )
                            }
                        >
                            <option value="summary">Résumé</option>
                            <option value="developed">Développées</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Contrechamp">
                        <PixieSelect
                            mode="popover"
                            portal
                            size="sm"
                            value={countershot}
                            onChange={(event) =>
                                setCountershot(
                                    event.target
                                        .value as AtelierGeneriqueVivantCountershot,
                                )
                            }
                        >
                            <option value="visible">Visible</option>
                            <option value="collapsed">Replié</option>
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
                    </div>
                </header>

                {model.notices.length > 0 ? (
                    <PixieCallout
                        variant="subtle"
                        color="violet-ombre-portee"
                        padding="sm"
                        heading="Raccords documentaires"
                    >
                        {model.notices.map((notice) => (
                            <p
                                key={`${notice.code}:${notice.itemId ?? notice.message}`}
                            >
                                {notice.message}
                            </p>
                        ))}
                    </PixieCallout>
                ) : null}

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
                    <div className={styles.creditLayout}>
                        <div className={styles.creditStage}>
                            {displayedGroups.map((group) => {
                                const definition = getCreditDomainDefinition(
                                    group.id,
                                );
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
                                        <header className={styles.groupHeader}>
                                            <div
                                                className={styles.groupIdentity}
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
                                                    <p>{group.actionLabel}</p>
                                                    <h5
                                                        id={`generique-group-${group.id.replace(/[^a-z0-9-]/gi, "-")}`}
                                                    >
                                                        {group.label}
                                                    </h5>
                                                </div>
                                            </div>
                                            <PixieBadge
                                                size="xs"
                                                variant="outline"
                                            >
                                                {group.items.length}
                                            </PixieBadge>
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
                                                            {angle ===
                                                            "collaborations" ? (
                                                                <small>
                                                                    {group.items
                                                                        .length -
                                                                        1}{" "}
                                                                    autre
                                                                    {group.items
                                                                        .length >
                                                                    2
                                                                        ? "s"
                                                                        : ""}{" "}
                                                                    présence
                                                                    {group.items
                                                                        .length >
                                                                    2
                                                                        ? "s"
                                                                        : ""}{" "}
                                                                    dans ce
                                                                    département
                                                                </small>
                                                            ) : null}
                                                            {angle ===
                                                            "recurrences" ? (
                                                                <small>
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
                                                                        : ""}{" "}
                                                                    documentée
                                                                    {item
                                                                        .recurrenceWorkLabels
                                                                        .length >
                                                                    1
                                                                        ? "s"
                                                                        : ""}
                                                                </small>
                                                            ) : null}
                                                        </button>
                                                    </PixieCard>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                );
                            })}
                            {isDense ? (
                                <button
                                    type="button"
                                    className={styles.moreButton}
                                    onClick={() =>
                                        setVisibleLimit((value) => value + 48)
                                    }
                                >
                                    Afficher 48 crédits supplémentaires
                                </button>
                            ) : null}
                        </div>

                        {selected ? (
                            <aside
                                className={styles.inspector}
                                aria-label="Détail de la contribution"
                            >
                                <p className={styles.eyebrow}>Gros plan</p>
                                <h5>{selected.contributor.label}</h5>
                                <p className={styles.inspectorDomain}>
                                    {selected.domainLabel}
                                </p>
                                <dl>
                                    <div>
                                        <dt>Rôles archivés</dt>
                                        <dd>{selected.roles.join(" · ")}</dd>
                                    </div>
                                    <div>
                                        <dt>Présence</dt>
                                        <dd>
                                            {selected.contributor.resolved
                                                ? "Fiche publiée"
                                                : "Référence non résolue"}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Récurrences</dt>
                                        <dd>
                                            {selected.recurrenceWorkLabels.join(
                                                " · ",
                                            )}
                                        </dd>
                                    </div>
                                    {evidence === "developed" ? (
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
                                    ) : (
                                        <div>
                                            <dt>Preuves</dt>
                                            <dd>
                                                {sourceCount(selected) ||
                                                    "Aucune"}{" "}
                                                source
                                                {sourceCount(selected) > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                rattachée
                                                {sourceCount(selected) > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                à l’œuvre
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                                {contributorHref(selected) ? (
                                    <PixieLink
                                        href={contributorHref(selected)!}
                                        variant="action"
                                        indicator="arrow"
                                        color="violet-ombre-portee"
                                    >
                                        Ouvrir la fiche
                                    </PixieLink>
                                ) : (
                                    <p className={styles.unresolved}>
                                        Aucune fiche publiée : le nom reste
                                        visible sans être complété
                                        artificiellement.
                                    </p>
                                )}
                            </aside>
                        ) : null}
                    </div>
                )}
            </div>

            <details
                className={styles.countershot}
                open={countershot === "visible"}
                onToggle={(event) =>
                    setCountershot(
                        event.currentTarget.open ? "visible" : "collapsed",
                    )
                }
            >
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
