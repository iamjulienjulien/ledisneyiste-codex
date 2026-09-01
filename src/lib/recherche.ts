import "server-only";

import {
    contributeurs,
    epoques,
    oeuvres,
    personnages,
} from "@/data/catalogues";
import { normaliserIdentiteCodex } from "@/lib/identites/projeter-identite";
import { listerIdentitesCodex } from "@/lib/identites/server";
import {
    creerTexteRecherche,
    rechercherDansIndex,
} from "@/lib/recherche/filtrer-index";
import { getMetadata } from "@/registry/metadata";
import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";
import type { ResultatsRechercheCodex } from "@/types/recherche";

function indexerIdentites(famille: CodexFamily) {
    return new Map<string, ProjectionIdentiteCodex>(
        listerIdentitesCodex(famille).map((projection) => [
            projection.slugCanonique,
            projection,
        ]),
    );
}

const identitesRecherche = {
    personnages: indexerIdentites("personnages"),
    contributeurs: indexerIdentites("createurs"),
    oeuvres: indexerIdentites("oeuvres"),
    epoques: indexerIdentites("epoques"),
} as const;

function listerLibellesDocumentes(
    index: ReadonlyMap<string, ProjectionIdentiteCodex>,
    slug: string,
) {
    const projection = index.get(slug);

    if (!projection) {
        throw new Error(
            `L’Archive « ${slug} » ne possède pas de projection identitaire pour la recherche.`,
        );
    }

    return projection.documentees.map((identite) => identite.libelle);
}

const indexRecherche = {
    personnages: personnages.map((personnage) => ({
        entree: personnage,
        texte: creerTexteRecherche(
            [
                personnage.nom,
                personnage.sousTitre,
                ...personnage.metadata.categories.flatMap((categorie) => [
                    categorie,
                    getMetadata("personnages", "categories", categorie).label,
                ]),
                ...listerLibellesDocumentes(
                    identitesRecherche.personnages,
                    personnage.slug,
                ),
            ],
            normaliserIdentiteCodex,
        ),
    })),
    contributeurs: contributeurs.map((contributeur) => ({
        entree: contributeur,
        texte: creerTexteRecherche(
            [
                contributeur.nom,
                contributeur.sousTitre,
                ...contributeur.metadata.categories.flatMap((categorie) => [
                    categorie,
                    getMetadata("contributeurs", "categories", categorie).label,
                ]),
                ...listerLibellesDocumentes(
                    identitesRecherche.contributeurs,
                    contributeur.slug,
                ),
            ],
            normaliserIdentiteCodex,
        ),
    })),
    oeuvres: oeuvres.map((oeuvre) => ({
        entree: oeuvre,
        texte: creerTexteRecherche(
            [
                oeuvre.nom,
                oeuvre.sousTitre,
                oeuvre.metadata.collection,
                getMetadata(
                    "oeuvres",
                    "collections",
                    oeuvre.metadata.collection,
                ).label,
                oeuvre.metadata.type,
                getMetadata("oeuvres", "types", oeuvre.metadata.type).label,
                ...listerLibellesDocumentes(
                    identitesRecherche.oeuvres,
                    oeuvre.slug,
                ),
            ],
            normaliserIdentiteCodex,
        ),
    })),
    epoques: epoques.map((epoque) => ({
        entree: epoque,
        texte: creerTexteRecherche(
            [
                epoque.nom,
                epoque.sousTitre,
                ...listerLibellesDocumentes(
                    identitesRecherche.epoques,
                    epoque.slug,
                ),
            ],
            normaliserIdentiteCodex,
        ),
    })),
} as const;

export function rechercherDansCatalogues(
    requeteBrute: string,
): ResultatsRechercheCodex {
    if (normaliserIdentiteCodex(requeteBrute).length === 0) {
        return {
            personnages: [],
            contributeurs: [],
            oeuvres: [],
            epoques: [],
            total: 0,
        };
    }

    const resultats = {
        personnages: rechercherDansIndex(
            indexRecherche.personnages,
            requeteBrute,
            normaliserIdentiteCodex,
        ),
        contributeurs: rechercherDansIndex(
            indexRecherche.contributeurs,
            requeteBrute,
            normaliserIdentiteCodex,
        ),
        oeuvres: rechercherDansIndex(
            indexRecherche.oeuvres,
            requeteBrute,
            normaliserIdentiteCodex,
        ),
        epoques: rechercherDansIndex(
            indexRecherche.epoques,
            requeteBrute,
            normaliserIdentiteCodex,
        ),
    };

    return {
        ...resultats,
        total:
            resultats.personnages.length +
            resultats.contributeurs.length +
            resultats.oeuvres.length +
            resultats.epoques.length,
    };
}
