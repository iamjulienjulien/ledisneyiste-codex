"use client";

import { useMemo, useState } from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSelect } from "@/components/ui/PixieSelect";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type {
    CodexPlanDEnsembleDirection,
    CodexPlanDEnsembleGroup,
    CodexPlanDEnsembleGroupSlug,
    CodexPlanDEnsembleItem,
    CodexPlanDEnsembleRelation,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";
import type {
    AtelierPlanDEnsembleAngle,
    AtelierPlanDEnsembleDepth,
    AtelierPlanDEnsembleLimit,
    AtelierPlanDEnsembleMatterKey,
    AtelierPlanDEnsemblePrototypeProps,
} from "./AtelierPlanDEnsemblePrototype.types";
import styles from "./AtelierPlanDEnsemblePrototype.module.css";

type EvidenceMode = "summary" | "developed";
type CountershotMode = "visible" | "collapsed";
type LightMode = "sombre" | "claire";

const runtimeLabels = {
    idle: "En attente",
    loading: "Chargement",
    ready: "Prêt à situer",
    empty: "Cadre vide",
    sparse: "Voisinage réduit",
    dense: "Voisinage dense",
    incomplete: "Voisinage incomplet",
    error: "Projection impossible",
} as const satisfies Record<CodexPlanRuntimeState, string>;

const directionLabels = {
    all: "Tous les raccords",
    incoming: "Raccords entrants",
    outgoing: "Raccords sortants",
} as const;

const groupPresentation = {
    characters: { label: "Personnages", color: "rouge-crayon" },
    people: { label: "Créateurs", color: "jaune-lampe" },
    works: { label: "Œuvres", color: "violet-ombre-portee" },
    epochs: { label: "Époques", color: "vert-cellulo" },
    rewards: { label: "Récompenses", color: "ambre-projecteur" },
    sources: { label: "Sources", color: "bleu-reperage" },
} as const satisfies Record<
    CodexPlanDEnsembleGroupSlug,
    Readonly<{ label: string; color: AtelierAnimationColorSlug }>
>;

const angleOptions = [
    ["relations", "Toutes les relations"],
    ["characters", "Personnages"],
    ["people", "Créateurs"],
    ["works", "Œuvres"],
    ["epochs", "Époques"],
    ["rewards", "Récompenses"],
    ["sources", "Sources"],
] as const satisfies readonly (readonly [AtelierPlanDEnsembleAngle, string])[];

function Setting({
    label,
    hint,
    children,
}: Readonly<{
    label: string;
    hint?: string;
    children: React.ReactNode;
}>) {
    return (
        <label className={styles.setting}>
            <span>{label}</span>
            {children}
            {hint ? <small>{hint}</small> : null}
        </label>
    );
}

function primaryRelation(item: CodexPlanDEnsembleItem) {
    return [...item.relations].sort((a, b) => {
        const aTouchesItem =
            a.fromId === item.node.id || a.toId === item.node.id ? 0 : 1;
        const bTouchesItem =
            b.fromId === item.node.id || b.toId === item.node.id ? 0 : 1;

        return aTouchesItem - bTouchesItem || a.depth - b.depth;
    })[0];
}

function RelationLine({
    relation,
}: Readonly<{ relation: CodexPlanDEnsembleRelation }>) {
    return (
        <div className={styles.relationBlock}>
            <p className={styles.relationEyebrow}>Raccord principal</p>
            <p className={styles.relationLine}>
                <span>{relation.from.label}</span>
                <strong>
                    <span aria-hidden="true">→</span> {relation.label}
                </strong>
                <span>{relation.to.label}</span>
            </p>
        </div>
    );
}

function NeighbourCard({
    item,
    color,
    evidenceMode,
}: Readonly<{
    item: CodexPlanDEnsembleItem;
    color: AtelierAnimationColorSlug;
    evidenceMode: EvidenceMode;
}>) {
    const relation = primaryRelation(item);

    return (
        <PixieCard
            as="li"
            variant={item.resolved ? "accent" : "tinted"}
            color={color}
            padding="md"
            radius="medium"
            accentPosition="start"
            effect="reveal"
            effectIntensity="subtle"
            className={styles.neighbour}
        >
            <div className={styles.neighbourTopline}>
                <PixieBadge
                    size="xs"
                    variant={item.resolved ? "outline" : "soft"}
                    tone="color"
                    color={color}
                >
                    {item.resolved ? `Profondeur ${item.depth}` : "Non résolu"}
                </PixieBadge>
                <PixieBadge
                    size="xs"
                    variant="outline"
                    tone="inherit"
                    className={styles.relationCount}
                >
                    {item.relations.length} raccord
                    {item.relations.length > 1 ? "s" : ""}
                </PixieBadge>
            </div>

            <h6 className={styles.neighbourTitle}>
                {item.href ? (
                    <PixieLink
                        href={item.href}
                        indicator={
                            item.node.kind === "source" ? "external" : "none"
                        }
                        color={color}
                    >
                        {item.node.label}
                    </PixieLink>
                ) : (
                    item.node.label
                )}
            </h6>

            {relation ? <RelationLine relation={relation} /> : null}

            {evidenceMode === "developed" ? (
                <div className={styles.evidenceBlock}>
                    <p className={styles.evidenceEyebrow}>
                        Preuves documentaires
                    </p>
                    {item.evidence.length > 0 ? (
                        <ul
                            className={styles.evidenceList}
                            aria-label="Sources"
                        >
                            {item.evidence.map((source) => (
                                <li key={source.id}>
                                    {source.url ? (
                                        <PixieLink
                                            href={source.url}
                                            indicator="external"
                                            color={color}
                                        >
                                            {source.label}
                                        </PixieLink>
                                    ) : (
                                        source.label
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.missingEvidence}>
                            Aucune preuve rattachée
                        </p>
                    )}
                </div>
            ) : (
                <div className={styles.evidenceFooter}>
                    <span className={styles.evidenceEyebrow}>Preuves</span>
                    <PixieBadge
                        size="xs"
                        variant="soft"
                        tone="color"
                        color={color}
                        className={styles.evidenceCount}
                    >
                        {item.evidence.length} source
                        {item.evidence.length > 1 ? "s" : ""}
                    </PixieBadge>
                </div>
            )}
        </PixieCard>
    );
}

function NeighbourGroup({
    group,
    evidenceMode,
}: Readonly<{
    group: CodexPlanDEnsembleGroup;
    evidenceMode: EvidenceMode;
}>) {
    const presentation = groupPresentation[group.id];

    return (
        <PixiePanel
            as="section"
            variant="tinted"
            color={presentation.color}
            padding="none"
            headerPadding="md"
            bodyPadding="sm"
            radius="large"
            dividers="header"
            className={styles.group}
            header={
                <div className={styles.groupHeader}>
                    <div>
                        <p className={styles.groupEyebrow}>Constellation</p>
                        <h5 className={styles.groupTitle}>
                            {presentation.label}
                        </h5>
                    </div>
                    <PixieBadge
                        size="sm"
                        variant="soft"
                        tone="color"
                        color={presentation.color}
                    >
                        {group.items.length} / {group.selection.total}
                    </PixieBadge>
                </div>
            }
        >
            <ul className={styles.neighbourList}>
                {group.items.map((item) => (
                    <NeighbourCard
                        key={item.id}
                        item={item}
                        color={presentation.color}
                        evidenceMode={evidenceMode}
                    />
                ))}
            </ul>
        </PixiePanel>
    );
}

function groupSignature(
    projection: AtelierPlanDEnsemblePrototypeProps["projections"][number],
) {
    return projection.model.groups
        .flatMap((group) => group.items.map((item) => item.id))
        .join("|");
}

function limitGroups(
    groups: readonly CodexPlanDEnsembleGroup[],
    limit: AtelierPlanDEnsembleLimit,
) {
    const selectedByGroup = new Map<
        CodexPlanDEnsembleGroupSlug,
        CodexPlanDEnsembleItem[]
    >(groups.map((group) => [group.id, []]));
    let selectedCount = 0;
    let position = 0;

    while (selectedCount < limit) {
        let added = false;

        for (const group of groups) {
            const item = group.items[position];
            if (!item || selectedCount >= limit) {
                continue;
            }

            selectedByGroup.get(group.id)?.push(item);
            selectedCount += 1;
            added = true;
        }

        if (!added) {
            break;
        }
        position += 1;
    }

    return groups.flatMap((group) => {
        const items = selectedByGroup.get(group.id) ?? [];

        return items.length > 0
            ? [
                  {
                      ...group,
                      items,
                      selection: {
                          total: group.items.length,
                          returned: items.length,
                          limit,
                          truncated: items.length < group.items.length,
                      },
                  } satisfies CodexPlanDEnsembleGroup,
              ]
            : [];
    });
}

export function AtelierPlanDEnsemblePrototype({
    projections,
}: AtelierPlanDEnsemblePrototypeProps) {
    const matterOptions = useMemo(
        () =>
            projections.filter(
                (projection, index, all) =>
                    all.findIndex(
                        (candidate) =>
                            candidate.matterKey === projection.matterKey,
                    ) === index,
            ),
        [projections],
    );
    const [matterKey, setMatterKey] =
        useState<AtelierPlanDEnsembleMatterKey>("archives");
    const [angle, setAngle] = useState<AtelierPlanDEnsembleAngle>("relations");
    const [direction, setDirection] =
        useState<CodexPlanDEnsembleDirection>("all");
    const [depth, setDepth] = useState<AtelierPlanDEnsembleDepth>(1);
    const [limit, setLimit] = useState<AtelierPlanDEnsembleLimit>(24);
    const [evidenceMode, setEvidenceMode] = useState<EvidenceMode>("summary");
    const [countershot, setCountershot] = useState<CountershotMode>("visible");
    const [light, setLight] = useState<LightMode>("sombre");
    const projection =
        projections.find(
            (candidate) =>
                candidate.matterKey === matterKey && candidate.depth === depth,
        ) ?? projections[0];

    if (!projection) {
        return null;
    }

    const { model } = projection;
    const candidateGroups = model.groups
        .filter((group) => angle === "relations" || group.id === angle)
        .flatMap((group) => {
            const items = group.items.filter((item) => {
                const relation = primaryRelation(item);

                return direction === "all" || relation?.direction === direction;
            });

            return items.length > 0 ? [{ ...group, items }] : [];
        });
    const visibleGroups = limitGroups(candidateGroups, limit);
    const visibleItems = visibleGroups.flatMap((group) => group.items);
    const candidateCount = candidateGroups.reduce(
        (total, group) => total + group.items.length,
        0,
    );
    const matterLabel =
        matterOptions.find((option) => option.matterKey === matterKey)
            ?.matterLabel ?? projection.matterLabel;
    const depthChangesMatter = projections.some(
        (candidate) =>
            candidate.matterKey === matterKey &&
            candidate.depth !== depth &&
            groupSignature(candidate) !== groupSignature(projection),
    );
    const limitChangesMatter = candidateCount > 12;
    const isArchiveProjection = model.matter.kind === "archives";
    const prototypeTitle = isArchiveProjection
        ? "Blanche-Neige au milieu de ses constellations"
        : `Bobine témoin · ${matterLabel}`;
    const prototypeDescription =
        visibleItems.length === 0
            ? "Le Cadre demeure visible afin d’expliquer pourquoi aucun voisin ne répond au réglage courant."
            : isArchiveProjection
              ? `${visibleItems.length} voisin${visibleItems.length > 1 ? "s documentaires sont répartis" : " documentaire est réparti"} dans ${visibleGroups.length} constellation${visibleGroups.length > 1 ? "s" : ""}, sans transformer leur proximité en causalité.`
              : `${visibleItems.length} voisin${visibleItems.length > 1 ? "s synthétiques éprouvent" : " synthétique éprouve"} la composition sans rejoindre les Archives publiées.`;

    return (
        <div
            className={styles.projection}
            data-projection="originale"
            data-lumiere={light}
        >
            <header className={styles.prototypeHeader}>
                <div>
                    <p className={styles.prototypeEyebrow}>
                        Prototype privé · v0.1.0
                    </p>
                    <h3 className={styles.prototypeTitle}>{prototypeTitle}</h3>
                    <p className={styles.prototypeDescription}>
                        {prototypeDescription}
                    </p>
                </div>
                <div className={styles.prototypeBadges}>
                    <PixieBadge
                        size="sm"
                        variant="soft"
                        tone="color"
                        color="violet-ombre-portee"
                    >
                        {angleOptions.find(([value]) => value === angle)?.[1]}
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline" tone="inherit">
                        Situer
                    </PixieBadge>
                </div>
            </header>

            <PixiePanel
                as="aside"
                variant="muted"
                padding="lg"
                dividers="header"
                header={
                    <div>
                        <p className={styles.panelEyebrow}>Régie</p>
                        <h4 className={styles.panelTitle}>
                            Régler le voisinage
                        </h4>
                    </div>
                }
            >
                <div className={styles.settings}>
                    <Setting label="Matière">
                        <PixieSelect
                            value={matterKey}
                            onChange={(event) =>
                                setMatterKey(
                                    event.target
                                        .value as AtelierPlanDEnsembleMatterKey,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {matterOptions.map((option) => (
                                <option
                                    key={option.matterKey}
                                    value={option.matterKey}
                                >
                                    {option.matterLabel}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Angle"
                        hint="Filtre les constellations sans réécrire les liens."
                    >
                        <PixieSelect
                            value={angle}
                            onChange={(event) =>
                                setAngle(
                                    event.target
                                        .value as AtelierPlanDEnsembleAngle,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {angleOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Direction">
                        <PixieSelect
                            value={direction}
                            onChange={(event) =>
                                setDirection(
                                    event.target
                                        .value as CodexPlanDEnsembleDirection,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {Object.entries(directionLabels).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Profondeur"
                        hint={
                            depthChangesMatter
                                ? "Ajoute une couronne de voisinage."
                                : "Le corpus courant tient déjà dans cette couronne."
                        }
                    >
                        <PixieSelect
                            value={depth}
                            onChange={(event) =>
                                setDepth(
                                    Number(
                                        event.target.value,
                                    ) as AtelierPlanDEnsembleDepth,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value={1}>1 raccord</option>
                            <option value={2}>2 raccords</option>
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Limite"
                        hint={
                            limitChangesMatter
                                ? "Resserre réellement le Cadre."
                                : `${candidateCount} voisins tiennent déjà dans le Cadre.`
                        }
                    >
                        <PixieSelect
                            value={limit}
                            onChange={(event) =>
                                setLimit(
                                    Number(
                                        event.target.value,
                                    ) as AtelierPlanDEnsembleLimit,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value={12}>12 voisins</option>
                            <option value={24}>24 voisins</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Preuves">
                        <PixieSelect
                            value={evidenceMode}
                            onChange={(event) =>
                                setEvidenceMode(
                                    event.target.value as EvidenceMode,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
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
                                    event.target.value as CountershotMode,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="visible">Visible</option>
                            <option value="collapsed">Replié</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Lumière">
                        <PixieSelect
                            value={light}
                            onChange={(event) =>
                                setLight(event.target.value as LightMode)
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="sombre">Sombre</option>
                            <option value="claire">Claire</option>
                        </PixieSelect>
                    </Setting>
                </div>
            </PixiePanel>

            <section
                className={styles.master}
                aria-labelledby="ensemble-master-title"
            >
                <header className={styles.masterHeader}>
                    <div>
                        <p className={styles.panelEyebrow}>Plan maître</p>
                        <h4
                            id="ensemble-master-title"
                            className={styles.masterTitle}
                        >
                            {model.focus.label}
                        </h4>
                        <p className={styles.masterDescription}>
                            Le Sujet demeure stable pendant que son voisinage
                            change de direction, de profondeur et d’angle.
                        </p>
                    </div>
                    <div className={styles.stateBadges}>
                        <PixieBadge size="sm" variant="outline" tone="inherit">
                            {visibleItems.length} voisin
                            {visibleItems.length > 1 ? "s" : ""}
                        </PixieBadge>
                        <PixieBadge
                            size="sm"
                            variant="soft"
                            tone="color"
                            color={
                                model.runtimeState === "ready"
                                    ? "vert-cellulo"
                                    : "violet-ombre-portee"
                            }
                        >
                            {runtimeLabels[model.runtimeState]}
                        </PixieBadge>
                        {model.matter.kind === "bobine-temoin" ? (
                            <PixieBadge
                                size="sm"
                                variant="outline"
                                tone="color"
                                color="jaune-lampe"
                            >
                                Bobine témoin
                            </PixieBadge>
                        ) : null}
                    </div>
                </header>

                <p className={styles.liveStatus} role="status">
                    {matterLabel}. {visibleItems.length} voisin
                    {visibleItems.length > 1 ? "s" : ""}. Angle : {angle}.
                    Direction : {directionLabels[direction]}. État :{" "}
                    {runtimeLabels[model.runtimeState]}.
                </p>

                <div className={styles.focusStage}>
                    <PixieCard
                        variant="accent"
                        color="violet-ombre-portee"
                        accentPosition="top"
                        padding="xl"
                        radius="large"
                        effect="glow"
                        effectIntensity="medium"
                        className={styles.focusCard}
                    >
                        <p className={styles.focusEyebrow}>
                            {isArchiveProjection
                                ? "Sujet publié"
                                : "Foyer synthétique · Bobine témoin"}
                        </p>
                        <h5 className={styles.focusTitle}>
                            {isArchiveProjection &&
                            model.focus.resolved &&
                            model.focus.slug ? (
                                <PixieLink
                                    href={`/oeuvres/${model.focus.slug}`}
                                    indicator="none"
                                    color="violet-ombre-portee"
                                >
                                    {model.focus.label}
                                </PixieLink>
                            ) : (
                                model.focus.label
                            )}
                        </h5>
                        <p className={styles.focusMeta}>
                            {directionLabels[direction]} · profondeur {depth}
                        </p>
                    </PixieCard>
                    <div className={styles.focusConnector} aria-hidden="true">
                        <span />
                        <strong>Constellations documentaires</strong>
                        <span />
                    </div>
                </div>

                {visibleGroups.length === 0 ? (
                    <PixieCallout
                        variant="tinted"
                        color="violet-ombre-portee"
                        padding="lg"
                        eyebrow="Plan de coupe"
                        heading="Aucun voisin ne répond au Cadre"
                    >
                        Le foyer reste visible et le Plan explique l’absence de
                        matière sans fabriquer de relation.
                    </PixieCallout>
                ) : (
                    <div className={styles.groupGrid}>
                        {visibleGroups.map((group) => (
                            <NeighbourGroup
                                key={group.id}
                                group={group}
                                evidenceMode={evidenceMode}
                            />
                        ))}
                    </div>
                )}

                {model.notices.length > 0 ? (
                    <PixieCallout
                        variant="subtle"
                        color="jaune-lampe"
                        padding="md"
                        eyebrow="Raccords à surveiller"
                        heading={`${model.notices.length} indication${model.notices.length > 1 ? "s" : ""} conservée${model.notices.length > 1 ? "s" : ""}`}
                    >
                        <ul className={styles.notices}>
                            {model.notices.map((notice, index) => (
                                <li
                                    key={`${notice.code}-${notice.itemId ?? index}`}
                                >
                                    {notice.message}
                                </li>
                            ))}
                        </ul>
                    </PixieCallout>
                ) : null}
            </section>

            <details
                open={countershot === "visible"}
                onToggle={(event) =>
                    setCountershot(
                        event.currentTarget.open ? "visible" : "collapsed",
                    )
                }
                className={styles.countershot}
            >
                <summary>
                    <span>
                        <span className={styles.panelEyebrow}>
                            Contrechamp textuel
                        </span>
                        <strong>Liste relationnelle groupée</strong>
                    </span>
                    <span className={styles.countershotMeta}>
                        <span className={styles.countershotCount}>
                            {visibleItems.length} voisin
                            {visibleItems.length > 1 ? "s" : ""}
                        </span>
                        <span
                            className={styles.countershotToggle}
                            aria-hidden="true"
                        />
                    </span>
                </summary>
                <div className={styles.countershotBody}>
                    {visibleGroups.length === 0 ? (
                        <p>
                            Aucun voisin documentaire ne répond au Cadre courant
                            autour de {model.focus.label}.
                        </p>
                    ) : (
                        visibleGroups.map((group) => (
                            <section key={group.id}>
                                <h5>{groupPresentation[group.id].label}</h5>
                                <ol>
                                    {group.items.map((item) => {
                                        const relation = primaryRelation(item);

                                        return (
                                            <li key={item.id}>
                                                <strong>
                                                    {item.node.label}
                                                </strong>
                                                {relation ? (
                                                    <span>
                                                        {" "}
                                                        — {relation.from.label}
                                                        {" → "}
                                                        {relation.label}
                                                        {" → "}
                                                        {relation.to.label}.
                                                    </span>
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </section>
                        ))
                    )}
                </div>
            </details>
        </div>
    );
}
