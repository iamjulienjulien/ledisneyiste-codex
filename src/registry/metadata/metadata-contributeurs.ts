import type { MetadataDefinition } from "@/types/metadata";

export const metadataContributeurs = {
    categories: {
        fondateur: {
            label: "Fondateur",
            description: "Personne ayant participé à la fondation du studio.",
            color: "jaune-lampe",
        },
        animateur: {
            label: "Animateur",
            description:
                "Artiste qui construit le mouvement et le jeu des personnages.",
            color: "bleu-reperage",
        },
        realisateur: {
            label: "Réalisateur",
            description:
                "Créateur responsable de la mise en scène d’une œuvre.",
            color: "corail-cel",
        },
        producteur: {
            label: "Producteur",
            description:
                "Responsable de l’organisation et de la conduite d’une production.",
            color: "gouache",
        },
        interprete: {
            label: "Interprète",
            description:
                "Artiste qui donne sa voix ou son jeu à un personnage.",
            color: "rouge-crayon",
        },
        musicien: {
            label: "Musicien",
            description:
                "Compositeur, arrangeur ou interprète participant à l’identité sonore.",
            color: "vert-cellulo",
        },
        technicien: {
            label: "Technicien",
            description:
                "Créateur d’un procédé ou d’un outil au service des œuvres.",
            color: "graphite",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
