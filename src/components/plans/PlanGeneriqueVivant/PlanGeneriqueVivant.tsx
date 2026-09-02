"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { FocaleAnnotation } from "@/components/focale/FocaleAnnotation";
import { FocaleLegend } from "@/components/focale/FocaleLegend";
import { FocaleMark } from "@/components/focale/FocaleMark";
import { FocaleTable } from "@/components/focale/FocaleTable";
import type { FocaleTableColumn } from "@/components/focale/FocaleTable";
import { FocaleViewport } from "@/components/focale/FocaleViewport";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { getCreditDomainDefinition } from "@/registry/credits";
import type { CodexGeneriqueVivantContribution } from "@/types/codex-plans";
import type {
    PlanGeneriqueVivantProps,
    PlanGeneriqueVivantVersion,
} from "./PlanGeneriqueVivant.types";
import styles from "./PlanGeneriqueVivant.module.css";

export const PLAN_GENERIQUE_VIVANT_VERSION: PlanGeneriqueVivantVersion =
    "1.0.0";

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
        id: "provenance",
        header: "Provenance",
        render: (item) =>
            item.provenance
                .map((provenance) => provenance.explanation ?? provenance.kind)
                .join(" · "),
    },
] as const satisfies readonly FocaleTableColumn<CodexGeneriqueVivantContribution>[];

export function PlanGeneriqueVivant({
    model,
    simpleCredits,
}: PlanGeneriqueVivantProps) {
    const [showSimpleCredits, setShowSimpleCredits] = useState(false);
    const view = model.views.departments;

    if (showSimpleCredits) {
        return (
            <div className={styles.simpleView}>
                <header className={styles.viewHeader}>
                    <div>
                        <p className={styles.eyebrow}>Contrechamp de lecture</p>
                        <h3>Le générique simple</h3>
                        <p>
                            Les mêmes crédits retrouvent leur liste de
                            référence, sans représentation proportionnelle.
                        </p>
                    </div>
                    <PixieButton
                        type="button"
                        variant="outline"
                        size="sm"
                        color="violet-ombre-portee"
                        onClick={() => setShowSimpleCredits(false)}
                    >
                        Revenir au Plan
                    </PixieButton>
                </header>
                {simpleCredits}
            </div>
        );
    }

    return (
        <section
            className={styles.plan}
            aria-labelledby="generique-vivant-title"
        >
            <header className={styles.planHeader}>
                <div>
                    <p className={styles.eyebrow}>
                        Plan Générique vivant · v{PLAN_GENERIQUE_VIVANT_VERSION}
                    </p>
                    <h3 id="generique-vivant-title">{view.question}</h3>
                    <p>
                        Chaque domaine conserve ses gestes, ses personnes et ses
                        sources sans transformer leur nombre en hiérarchie.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.badges}>
                        <PixieBadge size="sm" variant="outline">
                            {model.stats.contributions} contributions
                        </PixieBadge>
                        <PixieBadge size="sm" variant="outline">
                            {model.stats.domains} domaines
                        </PixieBadge>
                        {model.stats.unresolved > 0 ? (
                            <PixieBadge size="sm" color="violet-ombre-portee">
                                {model.stats.unresolved} non publiée
                                {model.stats.unresolved > 1 ? "s" : ""}
                            </PixieBadge>
                        ) : null}
                    </div>
                    <PixieButton
                        type="button"
                        variant="outline"
                        size="sm"
                        color="violet-ombre-portee"
                        onClick={() => setShowSimpleCredits(true)}
                    >
                        Afficher le générique simple
                    </PixieButton>
                </div>
            </header>

            {model.notices.length > 0 ? (
                <FocaleAnnotation
                    title="Raccords documentaires"
                    tone="uncertainty"
                    provenance="Archives publiées"
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

            <FocaleViewport
                label={`Carte humaine de ${model.subject.label}`}
                description="La longueur de chaque repère exprime une part du générique, jamais l’importance d’un métier ou d’une personne."
                overflow="clip"
            >
                <div className={styles.groups}>
                    {view.groups.map((group) => {
                        const definition = getCreditDomainDefinition(group.id);
                        const items = model.contributions.filter((item) =>
                            group.contributionIds.includes(item.id),
                        );
                        const style = definition
                            ? ({
                                  "--group-color": `var(--atelier-animation-${definition.color})`,
                              } as CSSProperties)
                            : undefined;
                        const headingId = `generique-vivant-${group.id.replace(/[^a-z0-9-]/gi, "-")}`;

                        return (
                            <section
                                key={group.id}
                                className={styles.group}
                                style={style}
                                aria-labelledby={headingId}
                            >
                                <header className={styles.groupHeader}>
                                    <div className={styles.groupIdentity}>
                                        {definition ? (
                                            <PixieSymbol
                                                {...definition.symbol}
                                                size={48}
                                            />
                                        ) : (
                                            <span
                                                className={styles.groupCue}
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div>
                                            <p>{group.actionLabel}</p>
                                            <h4 id={headingId}>
                                                {group.label}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className={styles.groupMetric}>
                                        <FocaleMark
                                            shape="bar"
                                            size="sm"
                                            color="var(--group-color)"
                                            value={
                                                items.length /
                                                Math.max(
                                                    1,
                                                    model.stats.contributions,
                                                )
                                            }
                                            label={`${items.length} contributions sur ${model.stats.contributions}`}
                                        />
                                        <span>
                                            {items.length} sur{" "}
                                            {model.stats.contributions}
                                        </span>
                                    </div>
                                </header>
                                <ul className={styles.creditGrid}>
                                    {items.map((item) => {
                                        const href = contributorHref(item);
                                        const content = (
                                            <>
                                                <span
                                                    className={
                                                        styles.creditStatus
                                                    }
                                                >
                                                    {item.contributor.resolved
                                                        ? "Fiche publiée"
                                                        : "Non résolu"}
                                                </span>
                                                <strong>
                                                    {item.contributor.label}
                                                </strong>
                                                <span
                                                    className={styles.roleList}
                                                >
                                                    {item.roles.join(" · ")}
                                                </span>
                                                <small>
                                                    {sourceCount(item)} source
                                                    {sourceCount(item) > 1
                                                        ? "s"
                                                        : ""}
                                                </small>
                                            </>
                                        );

                                        return (
                                            <li key={item.id}>
                                                <PixieCard
                                                    asChild
                                                    variant="outline"
                                                    color={
                                                        definition?.color ??
                                                        "violet-ombre-portee"
                                                    }
                                                    padding="none"
                                                    radius="medium"
                                                >
                                                    {href ? (
                                                        <PixieLink
                                                            href={href}
                                                            className={
                                                                styles.creditLink
                                                            }
                                                        >
                                                            {content}
                                                        </PixieLink>
                                                    ) : (
                                                        <div
                                                            className={
                                                                styles.creditItem
                                                            }
                                                        >
                                                            {content}
                                                        </div>
                                                    )}
                                                </PixieCard>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </FocaleViewport>

            <details className={styles.countershot}>
                <summary>
                    Contrechamp textuel · {model.stats.contributions}{" "}
                    contributions
                </summary>
                <div>
                    <FocaleTable
                        caption={`${view.question} · ${model.stats.contributions} contributions`}
                        captionHidden
                        columns={countershotColumns}
                        rows={model.contributions}
                        getRowId={(item) => item.id}
                        density="compact"
                        emptyLabel="Aucune contribution documentée."
                    />
                </div>
            </details>
        </section>
    );
}
