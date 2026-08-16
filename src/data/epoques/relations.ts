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
import { getContributeurBySlug } from "@/data/catalogues";
import { fichesContributeurs } from "@/data/contributeurs";

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

export function getEpoquesPourContributeur(slug: string): ReferenceCodex[] {
    const ficheContributeur = fichesContributeurs.find(
        (fiche) => fiche.slug === slug,
    );

    if (!ficheContributeur) {
        return [];
    }

    return epoques
        .filter((epoque) => {
            const ficheEpoque = getFicheEpoqueBySlug(epoque.slug);

            if (!ficheEpoque) {
                return false;
            }

            const debutEpoque = getAnnee(ficheEpoque.periode.debut);
            const finEpoque = ficheEpoque.periode.fin
                ? getAnnee(ficheEpoque.periode.fin)
                : Number.POSITIVE_INFINITY;

            return ficheContributeur.periodesActivite.some((periode) => {
                const debutActivite = getAnnee(periode.debut);
                const finActivite = periode.fin
                    ? getAnnee(periode.fin)
                    : Number.POSITIVE_INFINITY;

                return debutActivite <= finEpoque && finActivite >= debutEpoque;
            });
        })
        .map((epoque) => ({
            nom: epoque.nom,
            type: "epoque" as const,
            slug: epoque.slug,
        }));
}

export function getContributeursDeLEpoque(slug: string): ReferenceCodex[] {
    const ficheEpoque = getFicheEpoqueBySlug(slug);

    if (!ficheEpoque) {
        return [];
    }

    const debutEpoque = getAnnee(ficheEpoque.periode.debut);
    const finEpoque = ficheEpoque.periode.fin
        ? getAnnee(ficheEpoque.periode.fin)
        : Number.POSITIVE_INFINITY;

    return fichesContributeurs
        .filter((fiche) =>
            fiche.periodesActivite.some((periode) => {
                const debutActivite = getAnnee(periode.debut);
                const finActivite = periode.fin
                    ? getAnnee(periode.fin)
                    : Number.POSITIVE_INFINITY;

                return debutActivite <= finEpoque && finActivite >= debutEpoque;
            }),
        )
        .map((fiche) => getContributeurBySlug(fiche.slug))
        .filter((contributeur) => contributeur !== undefined)
        .map((contributeur) => ({
            nom: contributeur.nom,
            type: "contributeur" as const,
            slug: contributeur.slug,
        }));
}
