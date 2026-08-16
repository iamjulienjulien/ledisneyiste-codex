import {
    epoques,
    getContributeurBySlug,
    getOeuvreBySlug,
    getPersonnageBySlug,
} from "@/data/catalogues";
import { fichesContributeurs } from "@/data/contributeurs";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { fichesOeuvres } from "@/data/oeuvres";
import { fichesPersonnages } from "@/data/personnages";
import type { DateHistorique } from "@/types/date";
import type { ReferenceCodex } from "@/types/reference";

function getAnnee(date: DateHistorique): number {
    return Number(date.valeur.slice(0, 4));
}

function dateEstDansPeriode(
    date: DateHistorique,
    debut: DateHistorique,
    fin?: DateHistorique,
): boolean {
    const annee = getAnnee(date);
    const anneeDebut = getAnnee(debut);
    const anneeFin = fin ? getAnnee(fin) : Number.POSITIVE_INFINITY;

    return annee >= anneeDebut && annee < anneeFin;
}

function periodesSeChevauchent(
    debutA: DateHistorique,
    finA: DateHistorique | undefined,
    debutB: DateHistorique,
    finB: DateHistorique | undefined,
): boolean {
    const anneeDebutA = getAnnee(debutA);
    const anneeFinA = finA ? getAnnee(finA) : Number.POSITIVE_INFINITY;

    const anneeDebutB = getAnnee(debutB);
    const anneeFinB = finB ? getAnnee(finB) : Number.POSITIVE_INFINITY;

    return anneeDebutA < anneeFinB && anneeFinA >= anneeDebutB;
}

export function getEpoquePourDate(
    date: DateHistorique,
): ReferenceCodex | undefined {
    const epoque = epoques.find((entree) => {
        const fiche = getFicheEpoqueBySlug(entree.slug);

        if (!fiche) {
            return false;
        }

        return dateEstDansPeriode(date, fiche.periode.debut, fiche.periode.fin);
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

    return fichesPersonnages
        .filter((fiche) =>
            dateEstDansPeriode(
                fiche.premiereApparition.date,
                ficheEpoque.periode.debut,
                ficheEpoque.periode.fin,
            ),
        )
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

    return fichesOeuvres
        .filter((fiche) =>
            dateEstDansPeriode(
                fiche.sortie.date,
                ficheEpoque.periode.debut,
                ficheEpoque.periode.fin,
            ),
        )
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

            return ficheContributeur.periodesActivite.some((periode) =>
                periodesSeChevauchent(
                    periode.debut,
                    periode.fin,
                    ficheEpoque.periode.debut,
                    ficheEpoque.periode.fin,
                ),
            );
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

    return fichesContributeurs
        .filter((fiche) =>
            fiche.periodesActivite.some((periode) =>
                periodesSeChevauchent(
                    periode.debut,
                    periode.fin,
                    ficheEpoque.periode.debut,
                    ficheEpoque.periode.fin,
                ),
            ),
        )
        .map((fiche) => getContributeurBySlug(fiche.slug))
        .filter((contributeur) => contributeur !== undefined)
        .map((contributeur) => ({
            nom: contributeur.nom,
            type: "contributeur" as const,
            slug: contributeur.slug,
        }));
}
