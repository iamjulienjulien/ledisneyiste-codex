import type { MetadataDefinition } from "@/types/metadata";

export const metadataPersonnages = {
    categories: {
        precurseur: {
            label: "Précurseur",
            description: "Figure qui précède ou prépare le cercle de Mickey.",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "cercle-de-mickey": {
            label: "Cercle de Mickey",
            description:
                "Personnage récurrent lié aux premières séries de Mickey.",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        antagoniste: {
            label: "Antagoniste",
            description:
                "Figure d’opposition récurrente dans les récits Disney.",
            accent: "var(--atelier-animation-gouache)",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
