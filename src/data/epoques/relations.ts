import {
    epoques,
    getOeuvreBySlug,
    getPersonnageBySlug,
} from "@/data/catalogues";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { fichesOeuvres } from "@/data/oeuvres";
import { fichesPersonnages } from "@/data/personnages";
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

export function getPersonnagesDeLEpoque(slug: string): ReferenceCodex[] {
    const ficheEpoque = getFicheEpoqueBySlug(slug);

    if (!ficheEpoque) {
        return [];
    }

    const debut = getAnnee(ficheEpoque.periode.debut);
    const fin = ficheEpoque.periode.fin
        ? getAnnee(ficheEpoque.periode.fin)
        : Number.POSITIVE_INFINITY;

    return fichesPersonnages
        .filter((fiche) => {
            const annee = getAnnee(fiche.premiereApparition.date);

            return annee >= debut && annee <= fin;
        })
        .map((fiche) => getPersonnageBySlug(fiche.slug))
        .filter((personnage) => personnage !== undefined)
        .map((personnage) => ({
            nom: personnage.nom,
            type: "personnage" as const,
            slug: personnage.slug,
        }));
}

export function getOeuvresDeLEpoque(slug: string): ReferenceCodex[] {
    const ficheEpoque = getFicheEpoqueBySlug(slug);

    if (!ficheEpoque) {
        return [];
    }

    const debut = getAnnee(ficheEpoque.periode.debut);
    const fin = ficheEpoque.periode.fin
        ? getAnnee(ficheEpoque.periode.fin)
        : Number.POSITIVE_INFINITY;

    return fichesOeuvres
        .filter((fiche) => {
            const annee = getAnnee(fiche.sortie.date);

            return annee >= debut && annee <= fin;
        })
        .map((fiche) => getOeuvreBySlug(fiche.slug))
        .filter((oeuvre) => oeuvre !== undefined)
        .map((oeuvre) => ({
            nom: oeuvre.nom,
            type: "oeuvre" as const,
            slug: oeuvre.slug,
        }));
}
