import type { MetadataDefinition } from "@/types/metadata";

export const metadataOeuvres = {
    collections: {
        "alice-comedies": {
            label: "Alice Comedies",
            description:
                "Série mêlant une interprète réelle à un monde dessiné.",
            color: "jaune-lampe",
        },
        oswald: {
            label: "Oswald",
            description:
                "Courts métrages consacrés à Oswald le lapin chanceux.",
            color: "bleu-reperage",
        },
        "mickey-mouse": {
            label: "Mickey Mouse",
            description: "Courts métrages de la série Mickey Mouse.",
            color: "rouge-crayon",
        },
        "silly-symphonies": {
            label: "Silly Symphonies",
            description:
                "Courts métrages musicaux servant de laboratoire au studio.",
            color: "gouache",
        },
        specials: {
            label: "Cartoons spéciaux",
            description:
                "Courts métrages autonomes publiés hors des séries régulières.",
            color: "vert-cellulo",
        },
        "donald-duck": {
            label: "Donald Duck",
            description: "Courts métrages de la série Donald Duck.",
            color: "corail-cel",
        },
        pluto: {
            label: "Pluto",
            description: "Courts métrages de la série Pluto.",
            color: "vert-cellulo",
        },
        "classiques-animation": {
            label: "Classiques d’animation",
            description:
                "Longs métrages d’animation produits par le studio Disney.",
            color: "bleu-reperage",
        },
    },
    types: {
        "court-metrage-anime": {
            label: "Court métrage d’animation",
            description:
                "Œuvre animée dont la durée correspond au format du court métrage.",
            color: "jaune-lampe",
        },
        "court-metrage-hybride": {
            label: "Court métrage hybride",
            description:
                "Court métrage mêlant prises de vues réelles et animation.",
            color: "gouache",
        },
        "long-metrage-anime": {
            label: "Long métrage d’animation",
            description:
                "Œuvre animée dont la durée correspond au format du long métrage.",
            color: "bleu-reperage",
        },
    },
    sons: {
        muet: {
            label: "Muet",
            description:
                "Œuvre diffusée à l’origine sans bande sonore synchronisée.",
            color: "graphite",
        },
        sonore: {
            label: "Sonore",
            description:
                "Œuvre diffusée à l’origine avec une bande sonore synchronisée, avec ou sans dialogues.",
            color: "corail-cel",
        },
    },
    couleurs: {
        "noir-et-blanc": {
            label: "Noir et blanc",
            description:
                "Œuvre produite et diffusée à l’origine en noir et blanc.",
            color: "graphite",
        },
        couleur: {
            label: "Couleur",
            description: "Œuvre produite et diffusée à l’origine en couleur.",
            color: "gouache",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
