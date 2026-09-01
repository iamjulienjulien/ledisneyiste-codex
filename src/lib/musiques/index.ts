import type { ContributionOeuvre } from "@/types/oeuvre";
import type {
    EntreeMusique,
    FicheMusique,
    ProjectionCreditMusicalExistant,
    RegistreMusiques,
} from "@/types/musique";

function creerEntreeMusique(fiche: FicheMusique): EntreeMusique {
    return {
        id: fiche.id,
        slug: fiche.slug,
        titre: fiche.identite.libelle,
        oeuvre: fiche.oeuvre,
    };
}

export function creerRegistreMusiques(
    fiches: readonly FicheMusique[],
): RegistreMusiques {
    return {
        entrees: fiches.map(creerEntreeMusique),
        fiches: [...fiches],
    };
}

export function projeterCreditsMusicauxExistants(
    contributions: readonly ContributionOeuvre[],
    sources: readonly string[],
): ProjectionCreditMusicalExistant[] {
    return contributions
        .filter((contribution) => contribution.domaine === "musique-chansons")
        .map((contribution) => ({
            personne: contribution.contributeur,
            roles: [...contribution.roles],
            domaine: "musique-chansons",
            sources: [...sources],
        }));
}
