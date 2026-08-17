import type { MetadataDefinition } from "@/types/metadata";

export const metadataOeuvres = {
    collections: {
        "alice-comedies": {
            label: "Alice Comedies",
            description:
                "Série mêlant une interprète réelle à un monde dessiné.",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        oswald: {
            label: "Oswald",
            description:
                "Courts métrages consacrés à Oswald le lapin chanceux.",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "mickey-mouse": {
            label: "Mickey Mouse",
            description: "Courts métrages de la série Mickey Mouse.",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "silly-symphonies": {
            label: "Silly Symphonies",
            description:
                "Courts métrages musicaux servant de laboratoire au studio.",
            accent: "var(--atelier-animation-gouache)",
        },
        "donald-duck": {
            label: "Donald Duck",
            description: "Courts métrages de la série Donald Duck.",
            accent: "var(--atelier-animation-corail-cel)",
        },
        pluto: {
            label: "Pluto",
            description: "Courts métrages de la série Pluto.",
            accent: "var(--atelier-animation-vert-cellulo)",
        },
    },
    types: {
        "court-metrage-anime": {
            label: "Court métrage d’animation",
            description:
                "Œuvre animée dont la durée correspond au format du court métrage.",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "court-metrage-hybride": {
            label: "Court métrage hybride",
            description:
                "Court métrage mêlant prises de vues réelles et animation.",
            accent: "var(--atelier-animation-gouache)",
        },
        "long-metrage-anime": {
            label: "Long métrage d’animation",
            description:
                "Œuvre animée dont la durée correspond au format du long métrage.",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
    },
    sons: {
        muet: {
            label: "Muet",
            description:
                "Œuvre diffusée à l’origine sans bande sonore synchronisée.",
            accent: "var(--atelier-animation-graphite)",
        },
        sonore: {
            label: "Sonore",
            description:
                "Œuvre diffusée à l’origine avec une bande sonore synchronisée, avec ou sans dialogues.",
            accent: "var(--atelier-animation-corail-cel)",
        },
    },
    couleurs: {
        "noir-et-blanc": {
            label: "Noir et blanc",
            description:
                "Œuvre produite et diffusée à l’origine en noir et blanc.",
            accent: "var(--atelier-animation-graphite)",
        },
        couleur: {
            label: "Couleur",
            description: "Œuvre produite et diffusée à l’origine en couleur.",
            accent: "var(--atelier-animation-gouache)",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
