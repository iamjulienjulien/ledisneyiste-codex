import {
    contributeurs,
    epoques,
    oeuvres,
    personnages,
} from "@/data/catalogues";
import { getMetadata } from "@/registry/metadata";
import type { ResultatsRechercheCodex } from "@/types/recherche";

function normaliserTexte(texte: string) {
    return texte
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replaceAll("œ", "oe")
        .replaceAll("æ", "ae")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function creerTexteRecherche(champs: string[]) {
    return normaliserTexte(champs.join(" "));
}

const indexRecherche = {
    personnages: personnages.map((personnage) => ({
        entree: personnage,
        texte: creerTexteRecherche([
            personnage.nom,
            personnage.sousTitre,
            ...personnage.metadata.categories.flatMap((categorie) => [
                categorie,
                getMetadata("personnages", "categories", categorie).label,
            ]),
        ]),
    })),
    contributeurs: contributeurs.map((contributeur) => ({
        entree: contributeur,
        texte: creerTexteRecherche([
            contributeur.nom,
            contributeur.sousTitre,
            ...contributeur.metadata.categories.flatMap((categorie) => [
                categorie,
                getMetadata("contributeurs", "categories", categorie).label,
            ]),
        ]),
    })),
    oeuvres: oeuvres.map((oeuvre) => ({
        entree: oeuvre,
        texte: creerTexteRecherche([
            oeuvre.nom,
            oeuvre.sousTitre,
            oeuvre.metadata.collection,
            getMetadata("oeuvres", "collections", oeuvre.metadata.collection)
                .label,
            oeuvre.metadata.type,
            getMetadata("oeuvres", "types", oeuvre.metadata.type).label,
        ]),
    })),
    epoques: epoques.map((epoque) => ({
        entree: epoque,
        texte: creerTexteRecherche([epoque.nom, epoque.sousTitre]),
    })),
} as const;

function correspondARequete(texte: string, termes: string[]) {
    return termes.every((terme) => texte.includes(terme));
}

export function rechercherDansCatalogues(
    requeteBrute: string,
): ResultatsRechercheCodex {
    const requete = normaliserTexte(requeteBrute);
    const termes = requete.split(" ").filter(Boolean);

    if (termes.length === 0) {
        return {
            personnages: [],
            contributeurs: [],
            oeuvres: [],
            epoques: [],
            total: 0,
        };
    }

    const resultats = {
        personnages: indexRecherche.personnages
            .filter(({ texte }) => correspondARequete(texte, termes))
            .map(({ entree }) => entree),
        contributeurs: indexRecherche.contributeurs
            .filter(({ texte }) => correspondARequete(texte, termes))
            .map(({ entree }) => entree),
        oeuvres: indexRecherche.oeuvres
            .filter(({ texte }) => correspondARequete(texte, termes))
            .map(({ entree }) => entree),
        epoques: indexRecherche.epoques
            .filter(({ texte }) => correspondARequete(texte, termes))
            .map(({ entree }) => entree),
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
