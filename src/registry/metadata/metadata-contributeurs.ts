import type { MetadataDefinition } from "@/types/metadata";

export const metadataContributeurs = {
    categories: {
        fondateur: {
            label: "Fondateur",
            description: "Personne ayant participé à la fondation du studio.",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        animateur: {
            label: "Animateur",
            description:
                "Artiste qui construit le mouvement et le jeu des personnages.",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        realisateur: {
            label: "Réalisateur",
            description:
                "Créateur responsable de la mise en scène d’une œuvre.",
            accent: "var(--atelier-animation-corail-cel)",
        },
        producteur: {
            label: "Producteur",
            description:
                "Responsable de l’organisation et de la conduite d’une production.",
            accent: "var(--atelier-animation-gouache)",
        },
        interprete: {
            label: "Interprète",
            description:
                "Artiste qui donne sa voix ou son jeu à un personnage.",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        musicien: {
            label: "Musicien",
            description:
                "Compositeur, arrangeur ou interprète participant à l’identité sonore.",
            accent: "var(--atelier-animation-vert-cellulo)",
        },
        technicien: {
            label: "Technicien",
            description:
                "Créateur d’un procédé ou d’un outil au service des œuvres.",
            accent: "var(--atelier-animation-graphite)",
        },
    },
} as const satisfies Record<string, Record<string, MetadataDefinition>>;
