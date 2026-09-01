import type {
    EntreeOeuvreSource,
    FicheOeuvreSource,
    RegistreOeuvresSources,
    ResolutionOeuvreSource,
} from "@/types/oeuvre-source";

type ReferenceOeuvreSource = Readonly<{
    id: string;
    slug: string;
}>;

function creerEntreeOeuvreSource(fiche: FicheOeuvreSource): EntreeOeuvreSource {
    return {
        id: fiche.id,
        slug: fiche.slug,
        titre: fiche.identite.libelle,
        nature: fiche.nature,
        date: fiche.date,
    };
}

export function creerRegistreOeuvresSources(
    fiches: readonly FicheOeuvreSource[],
): RegistreOeuvresSources {
    return {
        entrees: fiches.map(creerEntreeOeuvreSource),
        fiches: [...fiches],
    };
}

export function resoudreOeuvreSource(
    reference: ReferenceOeuvreSource,
    registre?: RegistreOeuvresSources,
): ResolutionOeuvreSource {
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
