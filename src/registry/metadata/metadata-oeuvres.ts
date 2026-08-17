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
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
