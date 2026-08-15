export type PrecisionDate = "jour" | "mois" | "annee";

export type DateHistorique = {
    valeur: string;
    precision: PrecisionDate;
};
