"use client";

import { useMemo, useState } from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieRail } from "@/components/ui/PixieRail";
import { PixieSelect } from "@/components/ui/PixieSelect";
import type {
    CodexPlanRuntimeState,
    CodexTravellingDocumentaireEvidence,
    CodexTravellingDocumentaireStage,
} from "@/types/codex-plans";
import type {
    AtelierTravellingDepth,
    AtelierTravellingDocumentairePrototypeProps,
    AtelierTravellingLimit,
    AtelierTravellingMatterKey,
} from "./AtelierTravellingDocumentairePrototype.types";
import styles from "./AtelierTravellingDocumentairePrototype.module.css";

const runtimeLabels = {
    idle: "En attente",
    loading: "Chargement",
    ready: "Prêt à parcourir",
    empty: "Cadre vide",
    sparse: "Parcours réduit",
    dense: "Parcours dense",
    incomplete: "Parcours incomplet",
    error: "Projection impossible",
} as const satisfies Record<CodexPlanRuntimeState, string>;

const zoneLabels = {
    origin: "Origine",
    laboratory: "Laboratoire",
    destination: "Destination",
} as const;

type EvidenceMode = "summary" | "developed";
type CountershotMode = "visible" | "collapsed";
type LightMode = "sombre" | "claire";

function formatHistoricalDate(stage: CodexTravellingDocumentaireStage) {
    const date = stage.date;
    if (!date) {
        return "Date non documentée";
    }

    if (date.precision === "annee") {
        return date.valeur;
    }

    const value = date.precision === "mois" ? `${date.valeur}-01` : date.valeur;
    const parsed = new Date(`${value}T12:00:00Z`);

    return new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
        ...(date.precision === "jour" ? { day: "numeric" } : {}),
        timeZone: "UTC",
    }).format(parsed);
}

function EvidenceList({
    evidence,
}: Readonly<{
    evidence: readonly CodexTravellingDocumentaireEvidence[];
}>) {
    if (evidence.length === 0) {
        return (
            <p className={styles.missingEvidence}>Aucune preuve rattachée</p>
        );
    }

    return (
        <ul className={styles.evidenceList} aria-label="Sources du raccord">
            {evidence.map((source) => (
                <li key={source.id}>
                    {source.url ? (
                        <PixieLink
                            href={source.url}
                            indicator="external"
                            color="violet-ombre-portee"
                        >
                            {source.label}
                        </PixieLink>
                    ) : (
                        source.label
                    )}
                </li>
            ))}
        </ul>
    );
}

function StageCard({
    stage,
    relationLabel,
    relationTarget,
    evidenceMode,
}: Readonly<{
    stage: CodexTravellingDocumentaireStage;
    relationLabel?: string;
    relationTarget?: string;
    evidenceMode: EvidenceMode;
}>) {
    return (
        <PixieCard
            as="li"
            variant={stage.zone === "origin" ? "tinted" : "surface"}
            color="violet-ombre-portee"
            padding="lg"
            radius="medium"
            effect="projector"
            effectIntensity="subtle"
            className={styles.stage}
        >
            <div className={styles.stageTopline}>
                <PixieBadge
                    size="xs"
                    variant="soft"
                    tone="color"
                    color={
                        stage.zone === "origin"
                            ? "bleu-reperage"
                            : "violet-ombre-portee"
                    }
                >
                    {zoneLabels[stage.zone]}
                </PixieBadge>
                <span className={styles.stageOrder}>
                    {String(stage.order + 1).padStart(2, "0")}
                </span>
            </div>

            <div>
                {stage.href ? (
                    <h4 className={styles.stageTitle}>
                        <PixieLink
                            href={stage.href}
                            color="violet-ombre-portee"
                            indicator="none"
                        >
                            {stage.node.label}
                        </PixieLink>
                    </h4>
                ) : (
                    <h4 className={styles.stageTitle}>{stage.node.label}</h4>
                )}
                <p className={styles.stageDate}>
                    {formatHistoricalDate(stage)}
                </p>
            </div>

            {relationTarget ? (
                <p className={styles.connectionLabel}>
                    <span>{relationLabel ?? "se raccorde à"}</span>
                    <strong>
                        <span aria-hidden="true">→</span> {relationTarget}
                    </strong>
                </p>
            ) : (
                <p className={styles.connectionEnd}>Fin de piste témoin</p>
            )}

            {evidenceMode === "developed" ? (
                <EvidenceList evidence={stage.evidence} />
            ) : (
                <PixieBadge
                    size="xs"
                    variant="outline"
                    tone="inherit"
                    className={styles.evidenceCount}
                >
                    {stage.evidence.length} source
                    {stage.evidence.length > 1 ? "s" : ""}
                </PixieBadge>
            )}
        </PixieCard>
    );
}

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

function stageSignature(
    projection: AtelierTravellingDocumentairePrototypeProps["projections"][number],
) {
    return projection.model.stages.map((stage) => stage.id).join("|");
}

export function AtelierTravellingDocumentairePrototype({
    projections,
}: AtelierTravellingDocumentairePrototypeProps) {
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
        useState<AtelierTravellingMatterKey>("archives");
    const [depth, setDepth] = useState<AtelierTravellingDepth>(2);
    const [limit, setLimit] = useState<AtelierTravellingLimit>(8);
    const [evidenceMode, setEvidenceMode] = useState<EvidenceMode>("summary");
    const [countershot, setCountershot] = useState<CountershotMode>("visible");
    const [light, setLight] = useState<LightMode>("sombre");
    const projection =
        projections.find(
            (candidate) =>
                candidate.matterKey === matterKey &&
                candidate.depth === depth &&
                candidate.limit === limit,
        ) ?? projections[0];

    if (!projection) {
        return null;
    }

    const { model } = projection;
    const depthChangesMatter = projections.some(
        (candidate) =>
            candidate.matterKey === matterKey &&
            candidate.limit === limit &&
            candidate.depth !== depth &&
            stageSignature(candidate) !== stageSignature(projection),
    );
    const limitChangesMatter = projections.some(
        (candidate) =>
            candidate.matterKey === matterKey &&
            candidate.depth === depth &&
            candidate.limit !== limit &&
            stageSignature(candidate) !== stageSignature(projection),
    );
    const preparatoryStages = model.stages.filter((stage) => !stage.isSubject);
    const destination = model.stages.find((stage) => stage.isSubject);
    const destinationLabel = model.subject.label;
    const stageByNodeId = new Map(
        model.stages.map((stage) => [stage.node.id, stage]),
    );
    const matterLabel =
        matterOptions.find((option) => option.matterKey === matterKey)
            ?.matterLabel ?? projection.matterLabel;
    const isArchiveProjection = model.matter.kind === "archives";
    const prototypeTitle = isArchiveProjection
        ? "Des laboratoires au premier long métrage"
        : `Bobine témoin · ${matterLabel}`;
    const prototypeDescription =
        preparatoryStages.length === 0
            ? "Le Cadre reste en place pour rendre l’absence de matière visible sans inventer de raccord."
            : isArchiveProjection
              ? `${preparatoryStages.length} piste${preparatoryStages.length > 1 ? "s documentaires indépendantes convergent" : " documentaire indépendante converge"} vers Blanche-Neige sans fabriquer de causalité entre elles.`
              : `${preparatoryStages.length} jalon${preparatoryStages.length > 1 ? "s synthétiques éprouvent" : " synthétique éprouve"} la grammaire du Travelling sans rejoindre les Archives publiées.`;
    const masterDescription = isArchiveProjection
        ? "Les raccords visibles conduisent vers cette destination documentaire."
        : "Cette bobine éprouve le parcours sans fabriquer de destination documentaire.";
    const trackLabel = isArchiveProjection
        ? `${preparatoryStages.length} piste${preparatoryStages.length > 1 ? "s documentaires convergentes" : " documentaire convergente"}`
        : `Piste témoin · ${preparatoryStages.length} jalon${preparatoryStages.length > 1 ? "s" : ""}`;
    const getStageRelation = (stage: CodexTravellingDocumentaireStage) => {
        const connection = model.connections.find(
            (candidate) => candidate.fromId === stage.node.id,
        );
        const target = connection
            ? stageByNodeId.get(connection.toId)
            : undefined;

        return {
            label: connection?.label ?? stage.relationLabel,
            target:
                model.matter.kind === "archives"
                    ? destinationLabel
                    : target?.node.label,
        };
    };

    return (
        <div
            className={styles.projection}
            data-projection="originale"
            data-lumiere={light}
        >
            <div className={styles.prototypeHeader}>
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
                        Filiation
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline" tone="inherit">
                        Suivre
                    </PixieBadge>
                </div>
            </div>

            <PixiePanel
                as="aside"
                variant="muted"
                padding="lg"
                dividers="header"
                header={
                    <div>
                        <p className={styles.panelEyebrow}>Régie</p>
                        <h4 className={styles.panelTitle}>
                            Régler la projection
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
                                        .value as AtelierTravellingMatterKey,
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
                        label="Profondeur maximale"
                        hint={
                            depthChangesMatter
                                ? "Modifie le voisinage parcouru."
                                : "Tout le voisinage tient déjà dans ce raccord."
                        }
                    >
                        <PixieSelect
                            value={depth}
                            onChange={(event) =>
                                setDepth(
                                    Number(
                                        event.target.value,
                                    ) as AtelierTravellingDepth,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value={1}>Jusqu’à 1 raccord</option>
                            <option value={2}>Jusqu’à 2 raccords</option>
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Limite du cadre"
                        hint={
                            limitChangesMatter
                                ? "Réduit réellement le parcours."
                                : `Les ${model.selection.total} jalons tiennent dans le Cadre.`
                        }
                    >
                        <PixieSelect
                            value={limit}
                            onChange={(event) =>
                                setLimit(
                                    Number(
                                        event.target.value,
                                    ) as AtelierTravellingLimit,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value={4}>Jusqu’à 4 jalons</option>
                            <option value={8}>Jusqu’à 8 jalons</option>
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
                aria-labelledby="travelling-master-title"
            >
                <header className={styles.masterHeader}>
                    <div>
                        <p className={styles.panelEyebrow}>Plan maître</p>
                        <h4
                            id="travelling-master-title"
                            className={styles.masterTitle}
                        >
                            {model.subject.label}
                        </h4>
                        <p className={styles.masterDescription}>
                            {masterDescription}
                        </p>
                    </div>
                    <div className={styles.stateBadges}>
                        <PixieBadge size="sm" variant="outline" tone="inherit">
                            {model.stages.length} jalon
                            {model.stages.length > 1 ? "s" : ""}
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
                    {matterLabel}. {model.stages.length} jalon
                    {model.stages.length > 1 ? "s" : ""}. État :{" "}
                    {runtimeLabels[model.runtimeState]}.
                </p>

                {preparatoryStages.length === 0 ? (
                    <PixieCallout
                        variant="tinted"
                        color="violet-ombre-portee"
                        padding="lg"
                        eyebrow="Plan de coupe"
                        heading="Aucun jalon ne rejoint le Cadre"
                    >
                        La structure reste lisible et explique l’absence de
                        matière sans inventer de raccord.
                    </PixieCallout>
                ) : (
                    <div className={styles.path}>
                        <div className={styles.approaches}>
                            <p className={styles.trackLabel}>{trackLabel}</p>
                            <PixieRail
                                key={`${matterKey}-${depth}-${limit}`}
                                as="ol"
                                itemWidth="md"
                                gap="md"
                                peek="subtle"
                                snap="proximity"
                                scrollbar="thin"
                                className={styles.rail}
                                aria-label="Jalons préparant le Sujet"
                            >
                                {preparatoryStages.map((stage) => {
                                    const relation = getStageRelation(stage);

                                    return (
                                        <StageCard
                                            key={stage.id}
                                            stage={stage}
                                            relationLabel={relation.label}
                                            relationTarget={relation.target}
                                            evidenceMode={evidenceMode}
                                        />
                                    );
                                })}
                            </PixieRail>
                        </div>

                        <div className={styles.convergence} aria-hidden="true">
                            <span>Convergent vers</span>
                            <strong>→</strong>
                        </div>

                        {destination ? (
                            <PixieCard
                                variant="accent"
                                color="violet-ombre-portee"
                                accentPosition="start"
                                padding="xl"
                                radius="large"
                                effect="glow"
                                effectIntensity="medium"
                                className={styles.destination}
                            >
                                <p className={styles.destinationEyebrow}>
                                    Destination · Sujet publié
                                </p>
                                <h5 className={styles.destinationTitle}>
                                    {destination.href ? (
                                        <PixieLink
                                            href={destination.href}
                                            indicator="none"
                                            color="violet-ombre-portee"
                                        >
                                            {destination.node.label}
                                        </PixieLink>
                                    ) : (
                                        destination.node.label
                                    )}
                                </h5>
                                <p className={styles.destinationDate}>
                                    {formatHistoricalDate(destination)}
                                </p>
                            </PixieCard>
                        ) : (
                            <PixieInset
                                variant="accent"
                                color="jaune-lampe"
                                padding="lg"
                            >
                                La Bobine témoin éprouve le parcours sans se
                                substituer au Sujet publié «{" "}
                                {model.subject.label}
                                ».
                            </PixieInset>
                        )}
                    </div>
                )}

                {model.notices.length > 0 ? (
                    <PixieInset
                        as="aside"
                        variant="subtle"
                        depth="shallow"
                        padding="md"
                        className={styles.noticePanel}
                    >
                        <p className={styles.noticeTitle}>Limites du raccord</p>
                        <ul
                            className={styles.notices}
                            aria-label="Limites du Plan"
                        >
                            {model.notices.map((notice, index) => (
                                <li
                                    key={`${notice.code}-${notice.itemId ?? index}`}
                                >
                                    {notice.message}
                                </li>
                            ))}
                        </ul>
                    </PixieInset>
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
                        <strong>Parcours ordonné et justifié</strong>
                    </span>
                    <span className={styles.countershotMeta}>
                        <span className={styles.countershotCount}>
                            {model.stages.length} jalon
                            {model.stages.length > 1 ? "s" : ""}
                        </span>
                        <span
                            className={styles.countershotToggle}
                            aria-hidden="true"
                        />
                    </span>
                </summary>
                <div className={styles.countershotBody}>
                    {model.stages.length === 0 ? (
                        <p>
                            Aucun jalon n’est disponible dans la matière
                            choisie.
                        </p>
                    ) : (
                        <ol>
                            {model.stages.map((stage) => {
                                const relation = getStageRelation(stage);

                                return (
                                    <li key={`text-${stage.id}`}>
                                        <strong>{stage.node.label}</strong>,{" "}
                                        {formatHistoricalDate(stage)}
                                        {stage.isSubject
                                            ? ", constitue la destination du parcours."
                                            : relation.target
                                              ? `, ${relation.label ?? "se raccorde à"} ${relation.target}.`
                                              : ", termine cette piste témoin sans fabriquer de destination."}
                                        {evidenceMode === "developed" &&
                                        stage.evidence.length > 0 ? (
                                            <EvidenceList
                                                evidence={stage.evidence}
                                            />
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </div>
            </details>
        </div>
    );
}
