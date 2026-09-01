import type {
    EntreeChanson,
    FicheChanson,
    RegistreChansons,
    ResolutionChanson,
} from "@/types/chanson";
import type {
    DossierProjectionMediaPrive,
    MatiereMediaPublique,
    ProjectionMediaPublique,
} from "@/types/projection-media";

function creerEntreeChanson(fiche: FicheChanson): EntreeChanson {
    return {
        id: fiche.id,
        slug: fiche.slug,
        titre: fiche.identite.libelle,
        oeuvreOrigine: fiche.oeuvreOrigine,
    };
}

export function creerRegistreChansons(
    fiches: readonly FicheChanson[],
): RegistreChansons {
    return {
        entrees: fiches.map(creerEntreeChanson),
        fiches: [...fiches],
    };
}

export function resoudreChanson(
    reference: Readonly<{ id: string; slug: string }>,
    registre?: RegistreChansons,
): ResolutionChanson {
    const fiche = registre?.fiches.find((item) => item.id === reference.id);
    const entree = registre?.entrees.find((item) => item.id === reference.id);

    if (!fiche || !entree || fiche.slug !== reference.slug) {
        return {
            referenceId: reference.id,
            resolved: false,
        };
    }

    return {
        referenceId: reference.id,
        resolved: true,
        entree,
        fiche,
    };
}

function chaineNonVide(valeur: string | undefined): valeur is string {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function lienHttpsValide(href: string | undefined): boolean {
    if (!chaineNonVide(href)) {
        return false;
    }

    try {
        return new URL(href).protocol === "https:";
    } catch {
        return false;
    }
}

function copierMatierePublique(
    matiere: MatiereMediaPublique,
): MatiereMediaPublique {
    return {
        nature: matiere.nature,
        ...(matiere.href ? { href: matiere.href } : {}),
        label: matiere.label,
        attribution: matiere.attribution,
    };
}

function dossierAutoriseComplet(
    dossier: DossierProjectionMediaPrive,
): dossier is DossierProjectionMediaPrive & {
    matiereAutorisee: MatiereMediaPublique;
    verifiePar: string;
    verifieLe: string;
} {
    return Boolean(
        dossier.matiereAutorisee &&
        chaineNonVide(dossier.matiereAutorisee.label) &&
        chaineNonVide(dossier.matiereAutorisee.attribution) &&
        dossier.territoires.length > 0 &&
        dossier.couches.length > 0 &&
        dossier.usagesAutorises.length > 0 &&
        dossier.evidenceIds.length > 0 &&
        chaineNonVide(dossier.fondement) &&
        chaineNonVide(dossier.titulaireOuFournisseur) &&
        chaineNonVide(dossier.controleViePrivee) &&
        chaineNonVide(dossier.verifiePar) &&
        chaineNonVide(dossier.verifieLe),
    );
}

export function projeterDossierMediaPublic(
    dossier: DossierProjectionMediaPrive,
): ProjectionMediaPublique {
    switch (dossier.statut) {
        case "metadata-only":
            return { statut: "metadata-only", matiere: null };

        case "external-link":
            if (
                dossier.matiereAutorisee?.nature === "lien-externe" &&
                lienHttpsValide(dossier.matiereAutorisee.href) &&
                chaineNonVide(dossier.matiereAutorisee.label) &&
                chaineNonVide(dossier.matiereAutorisee.attribution)
            ) {
                return {
                    statut: "external-link",
                    matiere: copierMatierePublique(dossier.matiereAutorisee),
                };
            }

            return { statut: "bloquee", matiere: null };

        case "licensed":
        case "public-domain-verified":
            if (dossierAutoriseComplet(dossier)) {
                return {
                    statut: "autorisee",
                    matiere: copierMatierePublique(dossier.matiereAutorisee),
                };
            }

            return { statut: "bloquee", matiere: null };

        case "short-quotation-review":
        case "embed-review":
            return { statut: "en-revue", matiere: null };

        case "excluded":
            return { statut: "exclue", matiere: null };

        case "blocked":
        default:
            return { statut: "bloquee", matiere: null };
    }
}
