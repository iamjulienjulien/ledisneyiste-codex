import type {
    DonneeEconomiqueOeuvre,
    DossierEnqueteEconomiquePrive,
    DonneeEconomiqueOeuvreEnquete,
    DonneeEconomiqueOeuvreHistorique,
    DonneeEconomiqueOeuvreStructuree,
    ProjectionDonneeEconomiquePublique,
    TemporaliteMesureEconomique,
} from "@/types/donnee-economique";
import type { PorteeTerritorialeDocumentaireCodex } from "@/types/documentaire";
import { formatDateHistorique } from "@/lib/date";
import { formatPorteeTerritorialeDocumentaire } from "@/lib/documentaire";

const libellesMesures = {
    "budget-annonce": "Budget annoncé",
    "cout-production": "Coût de production",
    "recette-brute-guichet": "Recette brute au guichet",
    "location-distributeur": "Location distributeur",
    "revenu-studio": "Revenu du studio",
    benefice: "Bénéfice",
    perte: "Perte",
    entrees: "Entrées",
    classement: "Classement",
    revenus: "Revenus",
} as const;

export function estDonneeEconomiqueStructuree(
    donnee: DonneeEconomiqueOeuvreStructuree | DonneeEconomiqueOeuvreHistorique,
): donnee is DonneeEconomiqueOeuvreStructuree {
    return "schemaVersion" in donnee && "mesure" in donnee;
}

function chaineNonVide(valeur: string | undefined): valeur is string {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function nombresPositifs(
    valeur: DonneeEconomiqueOeuvreEnquete["valeurOriginale"],
) {
    if (!valeur) {
        return false;
    }

    if (valeur.nature === "valeur") {
        return Number.isFinite(valeur.valeur) && valeur.valeur > 0;
    }

    return (
        Number.isFinite(valeur.minimum) &&
        Number.isFinite(valeur.maximum) &&
        valeur.minimum > 0 &&
        valeur.maximum >= valeur.minimum
    );
}

function declarationComplete(
    declaration: DonneeEconomiqueOeuvreEnquete,
): declaration is DonneeEconomiqueOeuvreStructuree {
    const dimensionsCommunes = Boolean(
        declaration.mesure &&
        nombresPositifs(declaration.valeurOriginale) &&
        declaration.porteeTerritoriale &&
        declaration.porteeTerritoriale.nature !== "non-precisee" &&
        declaration.temporalite &&
        (declaration.temporalite.nature !== "cumul" ||
            declaration.temporalite.periode.fin) &&
        declaration.base &&
        chaineNonVide(declaration.methode?.description) &&
        declaration.methode?.sourceIds.length &&
        declaration.certitude &&
        declaration.comparabilite &&
        chaineNonVide(declaration.comparabilite.motif) &&
        chaineNonVide(declaration.finaliteEditoriale) &&
        declaration.sources?.length,
    );

    if (!dimensionsCommunes) {
        return false;
    }

    if (declaration.unite === "monetaire") {
        return Boolean(
            declaration.mesure !== "entrees" &&
            declaration.mesure !== "classement" &&
            chaineNonVide(declaration.devise) &&
            declaration.anneeMonetaire,
        );
    }

    if (declaration.unite === "entrees") {
        return (
            declaration.mesure === "entrees" &&
            declaration.devise === undefined &&
            declaration.anneeMonetaire === undefined
        );
    }

    return (
        declaration.unite === "rang" &&
        declaration.mesure === "classement" &&
        declaration.devise === undefined &&
        declaration.anneeMonetaire === undefined
    );
}

function copierDonneePublique(
    declaration: DonneeEconomiqueOeuvreStructuree,
): DonneeEconomiqueOeuvreStructuree {
    const temporalite: TemporaliteMesureEconomique =
        declaration.temporalite.nature === "instantanee"
            ? {
                  nature: "instantanee",
                  date: { ...declaration.temporalite.date },
              }
            : {
                  nature: declaration.temporalite.nature,
                  periode: {
                      debut: { ...declaration.temporalite.periode.debut },
                      ...(declaration.temporalite.periode.fin
                          ? {
                                fin: {
                                    ...declaration.temporalite.periode.fin,
                                },
                            }
                          : {}),
                  },
              };
    const commun = {
        schemaVersion: declaration.schemaVersion,
        id: declaration.id,
        valeurOriginale: { ...declaration.valeurOriginale },
        porteeTerritoriale: { ...declaration.porteeTerritoriale },
        temporalite,
        base: declaration.base,
        methode: {
            description: declaration.methode.description,
            sourceIds: [...declaration.methode.sourceIds],
        },
        certitude: declaration.certitude,
        comparabilite: {
            statut: declaration.comparabilite.statut,
            avec: [...declaration.comparabilite.avec],
            motif: declaration.comparabilite.motif,
        },
        finaliteEditoriale: declaration.finaliteEditoriale,
        sources: [...declaration.sources],
        ...(declaration.noteDeReserve
            ? { noteDeReserve: declaration.noteDeReserve }
            : {}),
        ...(declaration.conflit
            ? {
                  conflit: {
                      groupeId: declaration.conflit.groupeId,
                      nature: declaration.conflit.nature,
                      note: declaration.conflit.note,
                  },
              }
            : {}),
    };

    if (declaration.unite === "monetaire") {
        return {
            ...commun,
            mesure: declaration.mesure,
            unite: "monetaire",
            devise: declaration.devise,
            anneeMonetaire: { ...declaration.anneeMonetaire },
        };
    }

    if (declaration.unite === "entrees") {
        return {
            ...commun,
            mesure: "entrees",
            unite: "entrees",
        };
    }

    return {
        ...commun,
        mesure: "classement",
        unite: "rang",
    };
}

export function projeterDossierEconomiquePublic(
    dossier: DossierEnqueteEconomiquePrive,
): ProjectionDonneeEconomiquePublique {
    if (dossier.verdict === "excluded") {
        return { statut: "exclue", donnee: null };
    }

    if (
        dossier.verdict === "investigation-only" ||
        dossier.dimensionsManquantes.length > 0 ||
        !declarationComplete(dossier.declaration)
    ) {
        return { statut: "non-publiee", donnee: null };
    }

    if (
        dossier.verdict === "publishable-with-reserve" &&
        !chaineNonVide(dossier.declaration.noteDeReserve)
    ) {
        return { statut: "non-publiee", donnee: null };
    }

    if (
        dossier.verdict === "publishable" &&
        dossier.declaration.conflit !== undefined
    ) {
        return { statut: "non-publiee", donnee: null };
    }

    return {
        statut:
            dossier.verdict === "publishable"
                ? "publiee"
                : "publiee-avec-reserve",
        donnee: copierDonneePublique(dossier.declaration),
    };
}

function convertirTerritoireHistorique(
    territoire: string,
): PorteeTerritorialeDocumentaireCodex {
    if (territoire === "Monde") {
        return { nature: "monde" };
    }

    if (territoire === "Non précisé par la source") {
        return {
            nature: "non-precisee",
            libelleSource: territoire,
        };
    }

    return { nature: "zone", libelle: territoire };
}

export function adapterDonneeEconomiqueHistorique(
    donnee: DonneeEconomiqueOeuvreHistorique,
    contexte: Readonly<{
        id: string;
        oeuvre: DossierEnqueteEconomiquePrive["oeuvre"];
    }>,
): DossierEnqueteEconomiquePrive {
    const mesure = donnee.nature === "revenus" ? undefined : donnee.nature;
    const dimensionsManquantes = [
        ...(mesure ? [] : ["mesure-exacte"]),
        ...(donnee.unite === "monetaire" ? ["annee-monetaire"] : []),
        "base",
        "methode",
        "comparabilite",
        "finalite-editoriale",
    ];

    return {
        id: `enquete:${contexte.id}`,
        statutEnquete: "incomplet",
        oeuvre: contexte.oeuvre,
        declaration: {
            schemaVersion: "1.0.0",
            id: contexte.id,
            ...(mesure ? { mesure } : {}),
            valeurOriginale: {
                nature: "valeur",
                valeur: donnee.valeur,
            },
            unite: donnee.unite,
            ...(donnee.unite === "monetaire" ? { devise: donnee.devise } : {}),
            porteeTerritoriale: convertirTerritoireHistorique(
                donnee.territoire,
            ),
            temporalite: {
                nature: "periode",
                periode: donnee.periode,
            },
            certitude: donnee.certitude,
            sources: donnee.sources,
            formulationSource: donnee.nature,
        },
        verdict: "investigation-only",
        dimensionsManquantes,
        sourceIdsEvalues: donnee.sources,
        noteInterne:
            "Adaptation de compatibilité : aucune dimension absente n’est déduite de la forme historique.",
    };
}

function formatterPeriodeHistorique(
    periode: DonneeEconomiqueOeuvreHistorique["periode"],
) {
    return `${formatDateHistorique(periode.debut)}–${
        periode.fin ? formatDateHistorique(periode.fin) : "aujourd’hui"
    }`;
}

function formatterValeur(
    donnee: DonneeEconomiqueOeuvreStructuree,
    valeur: number,
) {
    if (donnee.unite === "monetaire") {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: donnee.devise,
            maximumFractionDigits: 0,
        }).format(valeur);
    }

    if (donnee.unite === "entrees") {
        return `${new Intl.NumberFormat("fr-FR").format(valeur)} entrées`;
    }

    return `${new Intl.NumberFormat("fr-FR").format(valeur)}e rang`;
}

export type LectureDonneeEconomiqueOeuvre = Readonly<{
    id?: string;
    mesure: string;
    valeur: string;
    valeurNumerique?: number;
    unite: string;
    territoire: string;
    temporalite: string;
    certitude: DonneeEconomiqueOeuvre["certitude"];
    methode?: string;
    noteDeReserve?: string;
    sources: readonly string[];
}>;

export function lireDonneeEconomiqueOeuvre(
    donnee: DonneeEconomiqueOeuvre,
): LectureDonneeEconomiqueOeuvre {
    if (!estDonneeEconomiqueStructuree(donnee)) {
        const valeur =
            donnee.unite === "monetaire"
                ? new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: donnee.devise,
                      maximumFractionDigits: 0,
                  }).format(donnee.valeur)
                : `${new Intl.NumberFormat("fr-FR").format(donnee.valeur)} entrées`;

        return {
            mesure: libellesMesures[donnee.nature],
            valeur,
            valeurNumerique: donnee.valeur,
            unite: donnee.unite === "monetaire" ? donnee.devise : donnee.unite,
            territoire: donnee.territoire,
            temporalite: formatterPeriodeHistorique(donnee.periode),
            certitude: donnee.certitude,
            sources: donnee.sources,
        };
    }

    const temporalite =
        donnee.temporalite.nature === "instantanee"
            ? formatDateHistorique(donnee.temporalite.date)
            : `${
                  donnee.temporalite.nature === "cumul" ? "Cumul · " : ""
              }${formatterPeriodeHistorique(donnee.temporalite.periode)}`;
    const valeur =
        donnee.valeurOriginale.nature === "valeur"
            ? formatterValeur(donnee, donnee.valeurOriginale.valeur)
            : `${formatterValeur(donnee, donnee.valeurOriginale.minimum)}–${formatterValeur(
                  donnee,
                  donnee.valeurOriginale.maximum,
              )}`;

    return {
        id: donnee.id,
        mesure: libellesMesures[donnee.mesure],
        valeur,
        ...(donnee.valeurOriginale.nature === "valeur"
            ? { valeurNumerique: donnee.valeurOriginale.valeur }
            : {}),
        unite: donnee.unite === "monetaire" ? donnee.devise : donnee.unite,
        territoire: formatPorteeTerritorialeDocumentaire(
            donnee.porteeTerritoriale,
        ),
        temporalite,
        certitude: donnee.certitude,
        methode: donnee.methode.description,
        ...(donnee.noteDeReserve
            ? { noteDeReserve: donnee.noteDeReserve }
            : {}),
        sources: donnee.sources,
    };
}
