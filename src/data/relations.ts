import {
    getChansonBySlug,
    getOeuvreBySlug,
    getPersonnageBySlug,
} from "@/data/catalogues";
import { fichesChansons } from "@/data/chansons";
import { fichesOeuvres } from "@/data/oeuvres";
import { fichesPersonnages } from "@/data/personnages";
import type { ReferenceCodex } from "@/types/reference";

export function getPersonnagesCreesParContributeur(
    slug: string,
): ReferenceCodex[] {
    return fichesPersonnages
        .filter((fiche) =>
            fiche.creation.createurs.some(
                (createur) =>
                    createur.type === "contributeur" && createur.slug === slug,
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

export function getOeuvresContribueesParContributeur(
    slug: string,
): ReferenceCodex[] {
    return fichesOeuvres
        .filter((fiche) =>
            fiche.contributions.some(
                (contribution) =>
                    contribution.contributeur.type === "contributeur" &&
                    contribution.contributeur.slug === slug,
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

export function getOeuvresAvecPersonnage(slug: string): ReferenceCodex[] {
    return fichesOeuvres
        .filter((fiche) =>
            fiche.personnages.some(
                (personnage) =>
                    personnage.type === "personnage" &&
                    personnage.slug === slug,
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

export function getChansonsPourContributeur(slug: string): ReferenceCodex[] {
    return fichesChansons
        .filter((fiche) =>
            fiche.auteurs.some(
                (auteur) =>
                    auteur.personne.type === "contributeur" &&
                    auteur.personne.slug === slug,
            ),
        )
        .map((fiche) => getChansonBySlug(fiche.slug))
        .filter((chanson) => chanson !== undefined)
        .map((chanson) => ({
            nom: chanson.nom,
            type: "chanson" as const,
            slug: chanson.slug,
        }));
}

export function getChansonsPourOeuvre(slug: string): ReferenceCodex[] {
    return fichesChansons
        .filter(
            (fiche) =>
                (fiche.oeuvreOrigine.type === "oeuvre" &&
                    fiche.oeuvreOrigine.slug === slug) ||
                fiche.occurrences.some(
                    (occurrence) =>
                        occurrence.oeuvre.type === "oeuvre" &&
                        occurrence.oeuvre.slug === slug,
                ),
        )
        .map((fiche) => getChansonBySlug(fiche.slug))
        .filter((chanson) => chanson !== undefined)
        .map((chanson) => ({
            nom: chanson.nom,
            type: "chanson" as const,
            slug: chanson.slug,
        }));
}
