import type { MetadataDefinition } from "@/types/metadata";

export const metadataPersonnages = {
    categories: {
        precurseur: {
            label: "Précurseur",
            description: "Figure qui précède ou prépare le cercle de Mickey.",
            color: "jaune-lampe",
        },
        "cercle-de-mickey": {
            label: "Cercle de Mickey",
            description:
                "Personnage récurrent lié aux premières séries de Mickey.",
            color: "rouge-crayon",
        },
        antagoniste: {
            label: "Antagoniste",
            description:
                "Figure d’opposition récurrente dans les récits Disney.",
            color: "gouache",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
