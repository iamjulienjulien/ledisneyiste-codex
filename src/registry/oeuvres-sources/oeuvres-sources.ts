import type { FicheOeuvreSource } from "@/types/oeuvre-source";

export const fichesOeuvresSources = [
    {
        id: "oeuvre-source-grimm-schneewittchen",
        slug: "schneewittchen",
        identite: {
            libelle: "Schneewittchen",
            nature: "original",
            sources: ["afi-snow-white"],
        },
        auteurs: [
            {
                nom: "Jacob Grimm",
                role: "co-auteur",
                sources: ["afi-snow-white"],
            },
            {
                nom: "Wilhelm Grimm",
                role: "co-auteur",
                sources: ["afi-snow-white"],
            },
        ],
        date: {
            valeur: "1812",
            precision: "annee",
        },
        nature: "conte",
        support: "livre",
        sources: ["afi-snow-white"],
    },
] as const satisfies readonly FicheOeuvreSource[];
