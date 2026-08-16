import { epoques } from "@/data/catalogues";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import type { DateHistorique } from "@/types/date";
import type { ReferenceCodex } from "@/types/reference";

function getAnnee(date: DateHistorique): number {
    return Number(date.valeur.slice(0, 4));
}

export function getEpoquePourDate(
    date: DateHistorique,
): ReferenceCodex | undefined {
    const annee = getAnnee(date);

    const epoque = epoques.find((entree) => {
        const fiche = getFicheEpoqueBySlug(entree.slug);

        if (!fiche) {
            return false;
        }

        const debut = getAnnee(fiche.periode.debut);
        const fin = fiche.periode.fin
            ? getAnnee(fiche.periode.fin)
            : Number.POSITIVE_INFINITY;

        return annee >= debut && annee <= fin;
    });

    if (!epoque) {
        return undefined;
    }

    return {
        nom: epoque.nom,
        type: "epoque",
        slug: epoque.slug,
    };
}
