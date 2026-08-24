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
            description: "Figure d’opposition dans les récits Disney.",
            color: "gouache",
        },
        protagoniste: {
            label: "Protagoniste",
            description: "Figure au centre du récit et de ses enjeux.",
            color: "bleu-reperage",
        },
        allie: {
            label: "Allié",
            description:
                "Figure qui protège, accompagne ou soutient le protagoniste.",
            color: "vert-cellulo",
        },
        "figure-magique": {
            label: "Figure magique",
            description:
                "Présence surnaturelle qui agit sur le cours du récit.",
            color: "violet-ombre-portee",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
