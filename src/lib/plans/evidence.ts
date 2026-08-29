import type {
    CodexPlanArchives,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanEntityReference,
    CodexPlanEvidence,
    CodexPlanEvidenceScope,
} from "@/types/codex-plans";
import {
    createDerivationResult,
    createPublishedReference,
    createRewardReference,
    createSourceReference,
    sourcedProvenance,
} from "@/lib/plans/utils";

type EvidenceInput = Readonly<{
    id: string;
    owner: CodexPlanEntityReference;
    scope: CodexPlanEvidenceScope;
    label: string;
    sourceIds?: readonly string[];
}>;

function createEvidence(
    input: EvidenceInput,
    archives: CodexPlanArchives,
): CodexPlanEvidence {
    const sourceIds = [...new Set(input.sourceIds ?? [])];
    const sourceById = new Map(
        archives.sources.map((source) => [source.id, source] as const),
    );
    const sources = sourceIds.flatMap((id) => {
        const source = sourceById.get(id);

        return source ? [createSourceReference(source.id, source.titre)] : [];
    });
    const unresolvedSourceIds = sourceIds.filter((id) => !sourceById.has(id));
    const status =
        sourceIds.length === 0
            ? ("undocumented" as const)
            : unresolvedSourceIds.length > 0
              ? ("partially-resolved" as const)
              : ("documented" as const);

    return {
        id: input.id,
        owner: input.owner,
        scope: input.scope,
        label: input.label,
        sourceIds,
        sources,
        unresolvedSourceIds,
        status,
        sourceClassification: "unclassified",
        provenance: [
            sourcedProvenance(
                sourceIds,
                sourceIds.length > 0
                    ? "Rattachement documentaire déclaré explicitement dans les Archives."
                    : "Aucun rattachement documentaire propre n’est déclaré pour cet élément.",
            ),
        ],
    };
}

function createEvidenceNotices(evidence: CodexPlanEvidence) {
    const notices: CodexPlanDerivationNotice[] = [];

    if (evidence.status === "undocumented") {
        notices.push({
            code: "missing-sources",
            message: `« ${evidence.label} » ne possède aucune source propre dans les Archives.`,
            itemId: evidence.id,
        });
    }

    for (const sourceId of evidence.unresolvedSourceIds) {
        notices.push({
            code: "unresolved-source",
            message: `La source « ${sourceId} » est référencée mais absente du registre central.`,
            itemId: evidence.id,
        });
    }

    return notices;
}

function addBaseEvidence(
    items: CodexPlanEvidence[],
    archives: CodexPlanArchives,
    owner: CodexPlanEntityReference,
    fiche: Readonly<{
        sources: readonly string[];
        blocsEditoriaux?: readonly Readonly<{
            titre: string;
            sources?: readonly string[];
        }>[];
    }>,
) {
    items.push(
        createEvidence(
            {
                id: `evidence:${owner.id}:fiche`,
                owner,
                scope: "fiche",
                label: `Sources générales · ${owner.label}`,
                sourceIds: fiche.sources,
            },
            archives,
        ),
    );

    fiche.blocsEditoriaux?.forEach((block, index) => {
        items.push(
            createEvidence(
                {
                    id: `evidence:${owner.id}:editorial-block:${index}`,
                    owner,
                    scope: "editorial-block",
                    label: block.titre,
                    sourceIds: block.sources,
                },
                archives,
            ),
        );
    });
}

export function derivePlanEvidence(
    archives: CodexPlanArchives,
    options: CodexPlanDerivationOptions = {},
): CodexPlanDerivationResult<CodexPlanEvidence> {
    const items: CodexPlanEvidence[] = [];

    for (const character of archives.fiches.personnages) {
        const catalogue = archives.catalogues.personnages.find(
            (entry) => entry.slug === character.slug,
        );
        const owner = createPublishedReference(
            "personnage",
            character.slug,
            catalogue?.nom ?? character.slug,
        );

        addBaseEvidence(items, archives, owner, character);

        character.nomsAlternatifs?.forEach((name, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:alternate-name:${index}`,
                        owner,
                        scope: "alternate-name",
                        label: `Nom alternatif · ${name.nom}`,
                        sourceIds: name.sources,
                    },
                    archives,
                ),
            );
        });

        character.formes?.forEach((form, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:character-form:${index}`,
                        owner,
                        scope: "character-form",
                        label: `Forme · ${form.nom}`,
                        sourceIds: form.sources,
                    },
                    archives,
                ),
            );
        });
    }

    for (const contributor of archives.fiches.contributeurs) {
        const catalogue = archives.catalogues.contributeurs.find(
            (entry) => entry.slug === contributor.slug,
        );
        addBaseEvidence(
            items,
            archives,
            createPublishedReference(
                "contributeur",
                contributor.slug,
                catalogue?.nom ?? contributor.slug,
            ),
            contributor,
        );
    }

    for (const work of archives.fiches.oeuvres) {
        const catalogue = archives.catalogues.oeuvres.find(
            (entry) => entry.slug === work.slug,
        );
        const owner = createPublishedReference(
            "oeuvre",
            work.slug,
            catalogue?.nom ?? work.slug,
        );

        addBaseEvidence(items, archives, owner, work);

        work.titresAlternatifs?.forEach((title, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:alternate-title:${index}`,
                        owner,
                        scope: "alternate-title",
                        label: `Titre alternatif · ${title.titre}`,
                        sourceIds: title.sources,
                    },
                    archives,
                ),
            );
        });

        work.durees?.forEach((duration, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:duration:${index}`,
                        owner,
                        scope: "duration",
                        label: `Durée · ${duration.valeur} ${duration.unite} · ${duration.version}`,
                        sourceIds: duration.sources,
                    },
                    archives,
                ),
            );
        });

        if (work.production) {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:production`,
                        owner,
                        scope: "production",
                        label: `Période de production · ${owner.label}`,
                        sourceIds: work.production.sources,
                    },
                    archives,
                ),
            );
        }

        work.sortie.evenements?.forEach((release, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:release-event:${index}`,
                        owner,
                        scope: "release-event",
                        label: `Sortie · ${release.territoire} · ${release.date.valeur}`,
                        sourceIds: release.sources,
                    },
                    archives,
                ),
            );
        });

        work.donneesEconomiques?.forEach((data, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:economic-data:${index}`,
                        owner,
                        scope: "economic-data",
                        label: `Donnée économique · ${data.nature} · ${data.territoire}`,
                        sourceIds: data.sources,
                    },
                    archives,
                ),
            );
        });

        work.relationsOeuvres?.forEach((relation, index) => {
            items.push(
                createEvidence(
                    {
                        id: `evidence:${owner.id}:work-relation:${index}`,
                        owner,
                        scope: "work-relation",
                        label: `${relation.nature} · ${relation.oeuvre.nom}`,
                        sourceIds: relation.sources,
                    },
                    archives,
                ),
            );
        });
    }

    for (const epoch of archives.fiches.epoques) {
        const catalogue = archives.catalogues.epoques.find(
            (entry) => entry.slug === epoch.slug,
        );
        addBaseEvidence(
            items,
            archives,
            createPublishedReference(
                "epoque",
                epoch.slug,
                catalogue?.nom ?? epoch.slug,
            ),
            epoch,
        );
    }

    for (const reward of archives.recompenses) {
        const owner = createRewardReference(
            reward.id,
            reward.categorie ?? reward.motif,
        );
        items.push(
            createEvidence(
                {
                    id: `evidence:${owner.id}:reward`,
                    owner,
                    scope: "reward",
                    label: `${owner.label} · ${reward.edition.nom}`,
                    sourceIds: reward.sources,
                },
                archives,
            ),
        );
    }

    return createDerivationResult(items, options, [
        {
            code: "source-classification-unavailable",
            message:
                "Le registre des sources ne décrit pas encore leur nature ; chaque rattachement conserve la classification « unclassified ».",
        },
        ...items.flatMap(createEvidenceNotices),
    ]);
}
