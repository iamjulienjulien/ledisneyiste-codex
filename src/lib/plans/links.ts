import type { DateHistorique, PeriodeHistorique } from "@/types/date";
import type {
    CodexPlanArchives,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanEntityReference,
    CodexPlanLink,
    CodexPlanLinkKind,
    CodexPlanProvenance,
} from "@/types/codex-plans";
import {
    createDerivationResult,
    createPublishedReference,
    createReference,
    createRewardReference,
    createWorkReference,
    derivedProvenance,
    editorialProvenance,
    unresolvedReferenceNotice,
} from "@/lib/plans/utils";

function year(date: DateHistorique) {
    return Number(date.valeur.slice(0, 4));
}

function dateBelongsToPeriod(date: DateHistorique, period: PeriodeHistorique) {
    return (
        year(date) >= year(period.debut) &&
        year(date) < (period.fin ? year(period.fin) : Number.POSITIVE_INFINITY)
    );
}

function periodsOverlap(a: PeriodeHistorique, b: PeriodeHistorique) {
    const endA = a.fin ? year(a.fin) : Number.POSITIVE_INFINITY;
    const endB = b.fin ? year(b.fin) : Number.POSITIVE_INFINITY;

    return year(a.debut) < endB && endA >= year(b.debut);
}

function createLink(
    kind: CodexPlanLinkKind,
    id: string,
    label: string,
    from: CodexPlanEntityReference,
    to: CodexPlanEntityReference,
    provenance: readonly CodexPlanProvenance[],
): CodexPlanLink {
    return {
        id: `${kind}:${id}`,
        kind,
        label,
        from,
        to,
        direction: "directed",
        provenance,
    };
}

function getEpochReferenceForDate(
    date: DateHistorique,
    archives: CodexPlanArchives,
) {
    const fiche = archives.fiches.epoques.find((epoch) =>
        dateBelongsToPeriod(date, epoch.periode),
    );
    const catalogue = fiche
        ? archives.catalogues.epoques.find((epoch) => epoch.slug === fiche.slug)
        : undefined;

    if (!fiche || !catalogue) {
        return undefined;
    }

    return createPublishedReference("epoque", fiche.slug, catalogue.nom);
}

function collectReferenceNotices(
    link: CodexPlanLink,
): CodexPlanDerivationNotice[] {
    return [
        unresolvedReferenceNotice(link.from, link.id),
        unresolvedReferenceNotice(link.to, link.id),
    ].filter(
        (notice): notice is CodexPlanDerivationNotice => notice !== undefined,
    );
}

export function derivePlanLinks(
    archives: CodexPlanArchives,
    options: CodexPlanDerivationOptions = {},
): CodexPlanDerivationResult<CodexPlanLink> {
    const links: CodexPlanLink[] = [];

    for (const character of archives.fiches.personnages) {
        const characterEntry = archives.catalogues.personnages.find(
            (entry) => entry.slug === character.slug,
        );
        const characterReference = createPublishedReference(
            "personnage",
            character.slug,
            characterEntry?.nom ?? character.slug,
        );

        character.creation.createurs.forEach((creator, index) => {
            const creatorReference = createReference(creator, archives);
            links.push(
                createLink(
                    "created-by",
                    `${character.slug}:${creatorReference.id}:${index}`,
                    "Créé par",
                    characterReference,
                    creatorReference,
                    [
                        editorialProvenance(
                            character.sources,
                            "Relation déclarée dans la création du personnage.",
                        ),
                    ],
                ),
            );
        });

        const firstWork = createReference(
            character.premiereApparition.oeuvre,
            archives,
        );
        links.push(
            createLink(
                "first-appeared-in",
                `${character.slug}:${firstWork.id}`,
                "Première apparition dans",
                characterReference,
                firstWork,
                [
                    editorialProvenance(
                        character.sources,
                        "Relation déclarée dans la première apparition du personnage.",
                    ),
                ],
            ),
        );

        const epoch = getEpochReferenceForDate(
            character.premiereApparition.date,
            archives,
        );
        if (epoch) {
            links.push(
                createLink(
                    "belongs-to-era",
                    `${character.slug}:${epoch.id}`,
                    "Apparaît durant",
                    characterReference,
                    epoch,
                    [
                        derivedProvenance(
                            "Époque calculée depuis la date de première apparition et des bornes chronologiques exclusives.",
                        ),
                    ],
                ),
            );
        }
    }

    for (const work of archives.fiches.oeuvres) {
        const workEntry = archives.catalogues.oeuvres.find(
            (entry) => entry.slug === work.slug,
        );
        const workReference = createPublishedReference(
            "oeuvre",
            work.slug,
            workEntry?.nom ?? work.slug,
        );

        work.contributions.forEach((contribution, index) => {
            const contributor = createReference(
                contribution.contributeur,
                archives,
            );
            links.push(
                createLink(
                    "contributed-to",
                    `${contributor.id}:${work.slug}:${index}`,
                    contribution.roles.join(" · "),
                    contributor,
                    workReference,
                    [
                        editorialProvenance(
                            work.sources,
                            "Contribution déclarée dans le générique de l’œuvre ; la fiche ne rattache pas encore chaque crédit à une source distincte.",
                        ),
                    ],
                ),
            );
        });

        work.personnages.forEach((character, index) => {
            const characterReference = createReference(character, archives);
            links.push(
                createLink(
                    "features",
                    `${work.slug}:${characterReference.id}:${index}`,
                    "Met en scène",
                    workReference,
                    characterReference,
                    [
                        editorialProvenance(
                            work.sources,
                            "Présence déclarée dans la distribution des personnages de l’œuvre.",
                        ),
                    ],
                ),
            );
        });

        work.relationsOeuvres?.forEach((relation, index) => {
            const relatedWork = createWorkReference(relation.oeuvre, archives);
            links.push(
                createLink(
                    "work-relation",
                    `${work.slug}:${relatedWork.id}:${relation.nature}:${index}`,
                    relation.nature,
                    workReference,
                    relatedWork,
                    [
                        editorialProvenance(
                            relation.sources,
                            "Relation qualifiée explicitement dans la fiche de l’œuvre.",
                        ),
                    ],
                ),
            );
        });

        const epoch = getEpochReferenceForDate(work.sortie.date, archives);
        if (epoch) {
            links.push(
                createLink(
                    "belongs-to-era",
                    `${work.slug}:${epoch.id}`,
                    "Sort durant",
                    workReference,
                    epoch,
                    [
                        derivedProvenance(
                            "Époque calculée depuis la date de sortie et des bornes chronologiques exclusives.",
                        ),
                    ],
                ),
            );
        }
    }

    for (const contributor of archives.fiches.contributeurs) {
        const contributorEntry = archives.catalogues.contributeurs.find(
            (entry) => entry.slug === contributor.slug,
        );
        const contributorReference = createPublishedReference(
            "contributeur",
            contributor.slug,
            contributorEntry?.nom ?? contributor.slug,
        );

        for (const epoch of archives.fiches.epoques) {
            if (
                !contributor.periodesActivite.some((period) =>
                    periodsOverlap(period, epoch.periode),
                )
            ) {
                continue;
            }

            const epochEntry = archives.catalogues.epoques.find(
                (entry) => entry.slug === epoch.slug,
            );
            if (!epochEntry) {
                continue;
            }

            links.push(
                createLink(
                    "belongs-to-era",
                    `${contributor.slug}:${epoch.slug}`,
                    "Actif durant",
                    contributorReference,
                    createPublishedReference(
                        "epoque",
                        epoch.slug,
                        epochEntry.nom,
                    ),
                    [
                        derivedProvenance(
                            "Époque calculée par chevauchement entre les périodes d’activité et les bornes chronologiques exclusives.",
                        ),
                    ],
                ),
            );
        }
    }

    for (const reward of archives.recompenses) {
        const rewardReference = createRewardReference(
            reward.id,
            reward.categorie ?? reward.motif,
        );

        if (reward.oeuvreConcernee) {
            const work = createReference(reward.oeuvreConcernee, archives);
            links.push(
                createLink(
                    "rewarded-work",
                    `${reward.id}:${work.id}`,
                    "Distingue l’œuvre",
                    rewardReference,
                    work,
                    [
                        editorialProvenance(
                            reward.sources,
                            "Œuvre concernée déclarée dans le registre des récompenses.",
                        ),
                    ],
                ),
            );
        }

        reward.beneficiaires.forEach((beneficiary, index) => {
            const beneficiaryReference = createReference(beneficiary, archives);
            links.push(
                createLink(
                    "reward-beneficiary",
                    `${reward.id}:${beneficiaryReference.id}:${index}`,
                    "Attribuée à",
                    rewardReference,
                    beneficiaryReference,
                    [
                        editorialProvenance(
                            reward.sources,
                            "Bénéficiaire déclaré dans le registre des récompenses.",
                        ),
                    ],
                ),
            );
        });
    }

    return createDerivationResult(
        links,
        options,
        links.flatMap(collectReferenceNotices),
    );
}
