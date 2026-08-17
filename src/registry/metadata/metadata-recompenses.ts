import type { MetadataDefinition } from "@/types/metadata";

export const metadataRecompenses = {
    natures: {
        competitive: {
            label: "Compétitive",
            description:
                "Récompense attribuée à l’issue d’une sélection en compétition.",
            color: "jaune-lampe",
        },
        honorary: {
            label: "Honorifique",
            description:
                "Distinction spéciale qui reconnaît une œuvre, une figure ou une contribution.",
            color: "gouache",
        },
        technical: {
            label: "Technique",
            description:
                "Récompense qui distingue une innovation ou un procédé technique.",
            color: "bleu-reperage",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
