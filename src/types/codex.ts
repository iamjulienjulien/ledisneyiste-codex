export type CodexFamily =
    "personnages" | "createurs" | "oeuvres" | "epoques" | "chansons";

export type EntreeCatalogueBase = {
    slug: string;
    nom: string;
    sousTitre: string;
};
