import type {
    CodexPlanArchives,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanEvent,
} from "@/types/codex-plans";
import { formatPorteeTerritorialeDocumentaire } from "@/lib/documentaire";
import {
    createDerivationResult,
    createPublishedReference,
    createRewardReference,
    sourcedProvenance,
} from "@/lib/plans/utils";

const releaseLabels = {
    "premiere-mondiale": "Première mondiale",
    "avant-premiere": "Avant-première",
    "sortie-nationale": "Sortie nationale",
    ressortie: "Ressortie",
    "presentation-festival": "Présentation en festival",
    "mise-a-disposition": "Mise à disposition",
} as const;

const exploitationLabels = {
    "premiere-exploitation": "Première exploitation",
    "exploitation-nationale": "Exploitation nationale",
    ressortie: "Ressortie",
    festival: "Présentation en festival",
    restauration: "Exploitation restaurée",
    "edition-video": "Édition vidéo",
    "diffusion-televisuelle": "Diffusion télévisuelle",
    "diffusion-numerique": "Diffusion numérique",
} as const;

const receptionLabels = {
    "critique-contemporaine": "Critique contemporaine",
    professionnelle: "Réception professionnelle",
    publique: "Réception publique",
    institutionnelle: "Réception institutionnelle",
    reevaluation: "Réévaluation",
} as const;

function provenanceExplanation(base: string, reserve?: string) {
    return reserve ? `${base} Réserve documentaire : ${reserve}` : base;
}

function missingSourcesNotice(
    event: CodexPlanEvent,
): CodexPlanDerivationNotice | undefined {
    if (event.provenance.some((provenance) => provenance.sourceIds?.length)) {
        return undefined;
    }

    return {
        code: "missing-sources",
        message: `L’événement « ${event.label} » ne possède pas de rattachement documentaire propre.`,
        itemId: event.id,
    };
}

export function derivePlanEvents(
    archives: CodexPlanArchives,
    options: CodexPlanDerivationOptions = {},
): CodexPlanDerivationResult<CodexPlanEvent> {
    const events: CodexPlanEvent[] = [];

    for (const character of archives.fiches.personnages) {
        const catalogue = archives.catalogues.personnages.find(
            (entry) => entry.slug === character.slug,
        );
        const subject = createPublishedReference(
            "personnage",
            character.slug,
            catalogue?.nom ?? character.slug,
        );

        events.push(
            {
                id: `character-creation:${character.slug}`,
                kind: "character-creation",
                label: `Création de ${subject.label}`,
                subject,
                start: character.creation.date,
                provenance: [
                    sourcedProvenance(
                        character.sources,
                        "Date déclarée dans la fiche du personnage.",
                    ),
                ],
            },
            {
                id: `first-appearance:${character.slug}`,
                kind: "first-appearance",
                label: `Première apparition de ${subject.label}`,
                subject,
                start: character.premiereApparition.date,
                provenance: [
                    sourcedProvenance(
                        character.sources,
                        "Date déclarée dans la première apparition du personnage.",
                    ),
                ],
            },
        );
    }

    for (const contributor of archives.fiches.contributeurs) {
        const catalogue = archives.catalogues.contributeurs.find(
            (entry) => entry.slug === contributor.slug,
        );
        const subject = createPublishedReference(
            "contributeur",
            contributor.slug,
            catalogue?.nom ?? contributor.slug,
        );

        events.push({
            id: `birth:${contributor.slug}`,
            kind: "birth",
            label: `Naissance de ${subject.label}`,
            subject,
            start: contributor.naissance.date,
            place: contributor.naissance.lieu,
            provenance: [
                sourcedProvenance(
                    contributor.sources,
                    "Date et lieu déclarés dans la fiche du créateur.",
                ),
            ],
        });

        if (contributor.deces) {
            events.push({
                id: `death:${contributor.slug}`,
                kind: "death",
                label: `Décès de ${subject.label}`,
                subject,
                start: contributor.deces.date,
                place: contributor.deces.lieu,
                provenance: [
                    sourcedProvenance(
                        contributor.sources,
                        "Date et lieu déclarés dans la fiche du créateur.",
                    ),
                ],
            });
        }

        contributor.periodesActivite.forEach((period, index) => {
            events.push({
                id: `activity:${contributor.slug}:${index}`,
                kind: "activity",
                label: `Période d’activité de ${subject.label}`,
                subject,
                start: period.debut,
                ...(period.fin ? { end: period.fin } : {}),
                provenance: [
                    sourcedProvenance(
                        contributor.sources,
                        "Période déclarée dans la fiche du créateur.",
                    ),
                ],
            });
        });
    }

    for (const work of archives.fiches.oeuvres) {
        const catalogue = archives.catalogues.oeuvres.find(
            (entry) => entry.slug === work.slug,
        );
        const subject = createPublishedReference(
            "oeuvre",
            work.slug,
            catalogue?.nom ?? work.slug,
        );

        events.push({
            id: `work-release:${work.slug}`,
            kind: "work-release",
            label: `Sortie de ${subject.label}`,
            subject,
            start: work.sortie.date,
            provenance: [
                sourcedProvenance(
                    work.sources,
                    "Date principale déclarée dans la fiche de l’œuvre.",
                ),
            ],
        });

        work.sortie.evenements?.forEach((release, index) => {
            events.push({
                id: `release-event:${work.slug}:${index}`,
                kind: "release-event",
                label: `${releaseLabels[release.nature]} de ${subject.label}`,
                subject,
                start: release.date,
                territory: release.porteeTerritoriale
                    ? formatPorteeTerritorialeDocumentaire(
                          release.porteeTerritoriale,
                      )
                    : release.territoire,
                ...(release.lieu ? { place: release.lieu } : {}),
                provenance: [
                    sourcedProvenance(
                        release.sources,
                        provenanceExplanation(
                            "Événement de diffusion documenté dans la fiche de l’œuvre.",
                            release.noteDeReserve,
                        ),
                    ),
                ],
            });
        });

        work.exploitations?.forEach((exploitation) => {
            events.push({
                id: `work-exploitation:${work.slug}:${exploitation.id}`,
                kind: "work-exploitation",
                label: `${exploitationLabels[exploitation.nature]} de ${subject.label}`,
                subject,
                start: exploitation.periode.debut,
                ...(exploitation.periode.fin
                    ? { end: exploitation.periode.fin }
                    : {}),
                territory: formatPorteeTerritorialeDocumentaire(
                    exploitation.porteeTerritoriale,
                ),
                provenance: [
                    sourcedProvenance(
                        exploitation.sources,
                        provenanceExplanation(
                            "Exploitation documentée dans la circulation de l’œuvre.",
                            exploitation.noteDeReserve,
                        ),
                    ),
                ],
            });
        });

        work.receptions?.forEach((reception) => {
            events.push({
                id: `work-reception:${work.slug}:${reception.id}`,
                kind: "work-reception",
                label: `${receptionLabels[reception.nature]} · ${reception.temoin.nom}`,
                subject,
                start: reception.date ?? reception.periode.debut,
                ...(reception.periode?.fin
                    ? { end: reception.periode.fin }
                    : {}),
                territory: formatPorteeTerritorialeDocumentaire(
                    reception.porteeTerritoriale,
                ),
                provenance: [
                    sourcedProvenance(
                        reception.sources,
                        provenanceExplanation(
                            `Réception qualifiée dans la fiche de l’œuvre : ${reception.resume}`,
                            reception.noteDeReserve,
                        ),
                    ),
                ],
            });
        });

        if (work.production) {
            events.push({
                id: `production:${work.slug}`,
                kind: "production",
                label: `Production de ${subject.label}`,
                subject,
                start: work.production.debut,
                ...(work.production.fin ? { end: work.production.fin } : {}),
                provenance: [
                    sourcedProvenance(
                        work.production.sources,
                        "Période de production documentée dans la fiche de l’œuvre.",
                    ),
                ],
            });
        }
    }

    for (const epoch of archives.fiches.epoques) {
        const catalogue = archives.catalogues.epoques.find(
            (entry) => entry.slug === epoch.slug,
        );
        const subject = createPublishedReference(
            "epoque",
            epoch.slug,
            catalogue?.nom ?? epoch.slug,
        );

        events.push({
            id: `era:${epoch.slug}`,
            kind: "era",
            label: subject.label,
            subject,
            start: epoch.periode.debut,
            ...(epoch.periode.fin
                ? { end: epoch.periode.fin, endExclusive: true }
                : {}),
            provenance: [
                sourcedProvenance(
                    epoch.sources,
                    "Bornes éditoriales déclarées dans la fiche de l’époque ; la fin est exclusive.",
                ),
            ],
        });
    }

    for (const reward of archives.recompenses) {
        const subject = createRewardReference(
            reward.id,
            reward.categorie ?? reward.motif,
        );
        events.push({
            id: `reward:${reward.id}`,
            kind: "reward",
            label: `${subject.label} · ${reward.edition.nom}`,
            subject,
            start: reward.dateAttribution,
            provenance: [
                sourcedProvenance(
                    reward.sources,
                    "Date d’attribution documentée dans le registre des récompenses.",
                ),
            ],
        });
    }

    return createDerivationResult(
        events,
        options,
        events.map(missingSourcesNotice),
    );
}
