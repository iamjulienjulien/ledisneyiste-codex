export type StatutDossierProjectionMedia =
    | "metadata-only"
    | "external-link"
    | "short-quotation-review"
    | "embed-review"
    | "licensed"
    | "public-domain-verified"
    | "blocked"
    | "excluded";

export type CoucheDroitMedia =
    | "composition"
    | "paroles"
    | "traduction"
    | "enregistrement"
    | "interpretation"
    | "production-phonographique"
    | "visuels"
    | "service-tiers"
    | "vie-privee";

export type MatiereMediaPublique = Readonly<{
    nature: "lien-externe" | "audio" | "courte-citation" | "integration";
    href?: string;
    label: string;
    attribution: string;
}>;

export type DossierProjectionMediaPrive = Readonly<{
    id: string;
    chansonId: string;
    assetId: string;
    version: string;
    territoires: readonly string[];
    couches: readonly CoucheDroitMedia[];
    fondement: string;
    titulaireOuFournisseur: string;
    usagesAutorises: readonly string[];
    attribution: string;
    evidenceIds: readonly string[];
    controleViePrivee: string;
    verifiePar?: string;
    verifieLe?: string;
    expireLe?: string;
    statut: StatutDossierProjectionMedia;
    matiereAutorisee?: MatiereMediaPublique;
    noteInterne?: string;
}>;

export type StatutProjectionMediaPublique =
    | "metadata-only"
    | "external-link"
    | "autorisee"
    | "en-revue"
    | "bloquee"
    | "exclue";

export type ProjectionMediaPublique = Readonly<{
    statut: StatutProjectionMediaPublique;
    matiere: MatiereMediaPublique | null;
}>;
