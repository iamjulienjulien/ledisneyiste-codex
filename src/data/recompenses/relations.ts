import { getEpoquePourDate } from "@/data/epoques/relations";
import { recompenses } from "@/data/recompenses";

export function getRecompensesPourOeuvre(slug: string) {
    return recompenses.filter(
        (recompense) =>
            recompense.oeuvreConcernee?.type === "oeuvre" &&
            recompense.oeuvreConcernee.slug === slug,
    );
}

export function getRecompensesPourContributeur(slug: string) {
    return recompenses.filter((recompense) =>
        recompense.beneficiaires.some(
            (beneficiaire) =>
                beneficiaire.type === "contributeur" &&
                beneficiaire.slug === slug,
        ),
    );
}

export function getRecompensesPourEpoque(slug: string) {
    return recompenses.filter(
        (recompense) =>
            getEpoquePourDate(recompense.dateAttribution)?.slug === slug,
    );
}
