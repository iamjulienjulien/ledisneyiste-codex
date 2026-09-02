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
    {
        id: "oeuvre-source-collodi-pinocchio",
        slug: "le-avventure-di-pinocchio",
        identite: {
            libelle: "Le avventure di Pinocchio",
            nature: "original",
            langue: "it",
            territoire: "IT",
            sources: [
                "it-collodi-biography",
                "it-collodi-critical-text",
                "it-treccani-pinocchio",
            ],
        },
        identitesAlternatives: [
            {
                libelle: "Storia di un burattino",
                nature: "ancien",
                langue: "it",
                territoire: "IT",
                sources: ["it-collodi-biography", "it-treccani-pinocchio"],
            },
        ],
        auteurs: [
            {
                personne: {
                    nom: "Carlo Collodi",
                    type: "contributeur",
                    slug: "carlo-collodi",
                },
                role: "auteur",
                sources: ["it-collodi-biography", "it-collodi-critical-text"],
            },
        ],
        date: {
            valeur: "1883",
            precision: "annee",
        },
        nature: "roman",
        support: "livre",
        sources: [
            "it-collodi-biography",
            "it-collodi-critical-text",
            "it-collodi-translations",
            "it-treccani-pinocchio",
        ],
    },
] as const satisfies readonly FicheOeuvreSource[];
