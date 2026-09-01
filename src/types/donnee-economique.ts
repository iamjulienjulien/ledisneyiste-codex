import type { DateHistorique, PeriodeHistorique } from "@/types/date";
import type { PorteeTerritorialeDocumentaireCodex } from "@/types/documentaire";

export type NatureMesureEconomiqueOeuvre =
    | "budget-annonce"
    | "cout-production"
    | "recette-brute-guichet"
    | "location-distributeur"
    | "revenu-studio"
    | "benefice"
    | "perte"
    | "entrees"
    | "classement";

export type DegreCertitudeDonneeEconomique =
    "documente" | "estimation" | "conteste";

export type ValeurEconomiqueOriginale =
    | Readonly<{
          nature: "valeur";
          valeur: number;
      }>
    | Readonly<{
          nature: "fourchette";
          minimum: number;
          maximum: number;
      }>;

export type TemporaliteMesureEconomique =
    | Readonly<{
          nature: "instantanee";
          date: DateHistorique;
      }>
    | Readonly<{
          nature: "periode" | "cumul";
          periode: PeriodeHistorique;
      }>;

export type BaseMesureEconomique =
    | "budget-annonce"
    | "cout-final"
    | "brut-taxes-incluses"
    | "brut-taxes-non-precisees"
    | "location-distributeur"
    | "encaissement-studio"
    | "resultat-net"
    | "premiere-exploitation"
    | "cumul-exploitations"
    | "classement-echantillon";

export type MethodeMesureEconomique = Readonly<{
    description: string;
    sourceIds: readonly string[];
}>;

export type ComparabiliteMesureEconomique = Readonly<{
    statut: "comparable" | "comparable-sous-reserve" | "non-comparable";
    avec: readonly string[];
    motif: string;
}>;

export type ConflitMesureEconomique = Readonly<{
    groupeId: string;
    nature:
        | "valeurs-divergentes"
        | "perimetres-divergents"
        | "methodes-divergentes";
    note: string;
}>;

type DonneeEconomiqueOeuvreStructureeBase = Readonly<{
    schemaVersion: "1.0.0";
    id: string;
    valeurOriginale: ValeurEconomiqueOriginale;
    porteeTerritoriale: PorteeTerritorialeDocumentaireCodex;
    temporalite: TemporaliteMesureEconomique;
    base: BaseMesureEconomique;
    methode: MethodeMesureEconomique;
    certitude: DegreCertitudeDonneeEconomique;
    comparabilite: ComparabiliteMesureEconomique;
    finaliteEditoriale: string;
    sources: readonly string[];
    noteDeReserve?: string;
    conflit?: ConflitMesureEconomique;
}>;

export type DonneeEconomiqueOeuvreStructuree =
    DonneeEconomiqueOeuvreStructureeBase &
        (
            | Readonly<{
                  mesure: Exclude<
                      NatureMesureEconomiqueOeuvre,
                      "entrees" | "classement"
                  >;
                  unite: "monetaire";
                  devise: string;
                  anneeMonetaire: DateHistorique;
              }>
            | Readonly<{
                  mesure: "entrees";
                  unite: "entrees";
                  devise?: never;
                  anneeMonetaire?: never;
              }>
            | Readonly<{
                  mesure: "classement";
                  unite: "rang";
                  devise?: never;
                  anneeMonetaire?: never;
              }>
        );

/**
 * Forme historique encore lue par l’unique fiche économique publiée.
 * La Phase 5 doit la migrer puis la retirer lorsque tous les consommateurs
 * lisent `DonneeEconomiqueOeuvreStructuree`.
 */
export type DonneeEconomiqueOeuvreHistorique = Readonly<{
    valeur: number;
    territoire: string;
    periode: PeriodeHistorique;
    certitude: DegreCertitudeDonneeEconomique;
    sources: readonly string[];
}> &
    (
        | Readonly<{
              nature: "cout-production" | "revenus";
              unite: "monetaire";
              devise: string;
          }>
        | Readonly<{
              nature: "entrees";
              unite: "entrees";
              devise?: never;
          }>
    );

export type DonneeEconomiqueOeuvre =
    DonneeEconomiqueOeuvreStructuree | DonneeEconomiqueOeuvreHistorique;

export type DonneeEconomiqueOeuvreEnquete = Readonly<{
    schemaVersion: "1.0.0";
    id: string;
    mesure?: NatureMesureEconomiqueOeuvre;
    valeurOriginale?: ValeurEconomiqueOriginale;
    unite?: "monetaire" | "entrees" | "rang";
    devise?: string;
    anneeMonetaire?: DateHistorique;
    porteeTerritoriale?: PorteeTerritorialeDocumentaireCodex;
    temporalite?: TemporaliteMesureEconomique;
    base?: BaseMesureEconomique;
    methode?: MethodeMesureEconomique;
    certitude?: DegreCertitudeDonneeEconomique;
    comparabilite?: ComparabiliteMesureEconomique;
    finaliteEditoriale?: string;
    sources?: readonly string[];
    noteDeReserve?: string;
    conflit?: ConflitMesureEconomique;
    formulationSource?: string;
}>;

export type VerdictPublicationDonneeEconomique =
    | "publishable"
    | "publishable-with-reserve"
    | "investigation-only"
    | "excluded";

export type DossierEnqueteEconomiquePrive = Readonly<{
    id: string;
    statutEnquete: "factuel" | "hypothetique" | "incomplet";
    oeuvre: Readonly<{
        nom: string;
        type: "oeuvre" | "oeuvre-privee";
        slug: string;
        id?: string;
    }>;
    declaration: DonneeEconomiqueOeuvreEnquete;
    verdict: VerdictPublicationDonneeEconomique;
    dimensionsManquantes: readonly string[];
    sourceIdsEvalues: readonly string[];
    noteInterne: string;
    verifiePar?: string;
    verifieLe?: string;
}>;

export type StatutProjectionDonneeEconomiquePublique =
    "publiee" | "publiee-avec-reserve" | "non-publiee" | "exclue";

export type ProjectionDonneeEconomiquePublique = Readonly<{
    statut: StatutProjectionDonneeEconomiquePublique;
    donnee: DonneeEconomiqueOeuvreStructuree | null;
}>;

export type DonneeEconomiqueDeriveeOeuvre = Readonly<{
    schemaVersion: "1.0.0";
    id: string;
    nature: "conversion-devise" | "actualisation-monetaire" | "agregation";
    statutEnquete: "factuel" | "hypothetique";
    declarationIds: readonly string[];
    valeur: number;
    unite: "monetaire" | "entrees" | "rang";
    devise?: string;
    calcul: Readonly<{
        formule: string;
        sourceMethodologiqueIds: readonly string[];
        dateCalcul: DateHistorique;
        dateOuPeriodeIndice: DateHistorique | PeriodeHistorique;
        anneeDeBase?: DateHistorique;
        conventionArrondi: string;
    }>;
    finaliteEditoriale: string;
    sources: readonly string[];
}>;
