import type {
    CodexPlanArchives,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanNode,
    CodexPlanNodeMetadataValue,
} from "@/types/codex-plans";
import {
    createDerivationResult,
    createEntityId,
    createPublishedReference,
    derivedProvenance,
    sourcedProvenance,
} from "@/lib/plans/utils";

function getFicheSources(
    slug: string,
    fiches: readonly { slug: string; sources: string[] }[],
) {
    return fiches.find((fiche) => fiche.slug === slug)?.sources ?? [];
}

function compactMetadata(
    metadata: Record<string, CodexPlanNodeMetadataValue | undefined>,
) {
    return Object.fromEntries(
        Object.entries(metadata).filter((entry) => entry[1] !== undefined),
    ) as Record<string, CodexPlanNodeMetadataValue>;
}

export function derivePlanNodes(
    archives: CodexPlanArchives,
    options: CodexPlanDerivationOptions = {},
): CodexPlanDerivationResult<CodexPlanNode> {
    const nodes: CodexPlanNode[] = [
        ...archives.catalogues.personnages.map((entry) => {
            const reference = createPublishedReference(
                "personnage",
                entry.slug,
                archives,
            );

            return {
                ...reference,
                subtitle: entry.sousTitre,
                publishedSubject: true,
                metadata: {
                    categories: entry.metadata.categories,
                },
                provenance: [
                    sourcedProvenance(
                        getFicheSources(
                            entry.slug,
                            archives.fiches.personnages,
                        ),
                        "Nœud publié dérivé du catalogue Personnages et de sa fiche.",
                    ),
                ],
            };
        }),
        ...archives.catalogues.contributeurs.map((entry) => {
            const reference = createPublishedReference(
                "contributeur",
                entry.slug,
                archives,
            );

            return {
                ...reference,
                subtitle: entry.sousTitre,
                publishedSubject: true,
                metadata: {
                    categories: entry.metadata.categories,
                },
                provenance: [
                    sourcedProvenance(
                        getFicheSources(
                            entry.slug,
                            archives.fiches.contributeurs,
                        ),
                        "Nœud publié dérivé du catalogue Créateurs et de sa fiche.",
                    ),
                ],
            };
        }),
        ...archives.catalogues.oeuvres.map((entry) => {
            const reference = createPublishedReference(
                "oeuvre",
                entry.slug,
                archives,
            );

            return {
                ...reference,
                subtitle: entry.sousTitre,
                publishedSubject: true,
                metadata: {
                    collection: entry.metadata.collection,
                    type: entry.metadata.type,
                    son: entry.metadata.son,
                    couleur: entry.metadata.couleur,
                },
                provenance: [
                    sourcedProvenance(
                        getFicheSources(entry.slug, archives.fiches.oeuvres),
                        "Nœud publié dérivé du catalogue Œuvres et de sa fiche.",
                    ),
                ],
            };
        }),
        ...archives.catalogues.epoques.map((entry) => {
            const reference = createPublishedReference(
                "epoque",
                entry.slug,
                archives,
            );

            return {
                ...reference,
                subtitle: entry.sousTitre,
                publishedSubject: true,
                metadata: {},
                provenance: [
                    sourcedProvenance(
                        getFicheSources(entry.slug, archives.fiches.epoques),
                        "Nœud publié dérivé du catalogue Époques et de sa fiche.",
                    ),
                ],
            };
        }),
        ...archives.recompenses.map((reward) => {
            const qualification = reward.categorie ?? reward.motif;

            return {
                id: createEntityId("recompense", reward.id),
                kind: "recompense" as const,
                label: qualification,
                slug: reward.id,
                resolved: true,
                publishedSubject: false,
                metadata: compactMetadata({
                    institution: reward.institution.nom,
                    edition: reward.edition.nom,
                    nature: reward.nature,
                    trophee: reward.trophee,
                    date: reward.dateAttribution.valeur,
                    categorie: reward.categorie,
                    motif: reward.motif,
                }),
                provenance: [
                    sourcedProvenance(
                        reward.sources,
                        "Nœud documentaire dérivé du registre des récompenses.",
                    ),
                ],
            };
        }),
        ...archives.sources.map((source) => ({
            id: createEntityId("source", source.id),
            kind: "source" as const,
            label: source.titre,
            slug: source.id,
            resolved: true,
            publishedSubject: false,
            metadata: compactMetadata({
                auteur: source.auteur,
                editeur: source.editeur,
                url: source.url,
                datePublication: source.datePublication,
                dateConsultation: source.dateConsultation,
                classification: "unclassified",
            }),
            provenance: [
                derivedProvenance(
                    "Nœud documentaire dérivé du registre central des sources.",
                ),
            ],
        })),
        ...(archives.oeuvresSources?.fiches.map((fiche) => {
            const entree = archives.oeuvresSources?.entrees.find(
                (item) => item.id === fiche.id,
            );

            return {
                id: createEntityId("oeuvre-source", fiche.id),
                kind: "oeuvre-source" as const,
                label: entree?.titre ?? fiche.identite.libelle,
                slug: entree?.slug ?? fiche.slug,
                resolved: entree !== undefined,
                subtitle: fiche.identitesAlternatives?.[0]?.libelle,
                publishedSubject: false,
                metadata: compactMetadata({
                    nature: fiche.nature,
                    support: fiche.support,
                    date: fiche.date.valeur,
                    auteurs: fiche.auteurs.map((auteur) => auteur.nom),
                }),
                provenance: [
                    sourcedProvenance(
                        fiche.sources,
                        "Nœud documentaire dérivé du registre interne des Œuvres sources.",
                    ),
                ],
            };
        }) ?? []),
    ];

    return createDerivationResult(nodes, options, [
        {
            code: "source-classification-unavailable",
            message:
                "Le registre des sources ne décrit pas encore leur nature ; leur classification reste explicitement indéterminée.",
        },
    ]);
}
