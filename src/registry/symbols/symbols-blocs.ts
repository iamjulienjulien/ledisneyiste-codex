import type { SymbolDefinition } from "@/types/symbols";

export const symbolsBlocs = {
    contributeurs: {
        debuts: {
            src: "/symbols/blocs/contributeurs/debuts.png",
            label: "Débuts",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        signature: {
            src: "/symbols/blocs/contributeurs/signature.png",
            label: "Signature",
            accent: "var(--atelier-animation-corail-cel)",
        },
        trajectoire: {
            src: "/symbols/blocs/contributeurs/trajectoire.png",
            label: "Trajectoire",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        transmission: {
            src: "/symbols/blocs/contributeurs/transmission.png",
            label: "Transmission",
            accent: "var(--atelier-animation-vert-cellulo)",
        },
    },
    epoques: {
        fondations: {
            src: "/symbols/blocs/epoques/fondations.png",
            label: "Fondations",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        mutations: {
            src: "/symbols/blocs/epoques/mutations.png",
            label: "Mutations",
            accent: "var(--atelier-animation-vert-cellulo)",
        },
        tensions: {
            src: "/symbols/blocs/epoques/tensions.png",
            label: "Tensions",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
    },
    oeuvres: {
        repere: {
            src: "/symbols/blocs/oeuvres/repere.png",
            label: "Repère",
            accent: "var(--atelier-animation-gouache)",
        },
        langage: {
            src: "/symbols/blocs/oeuvres/langage.png",
            label: "Langage",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        relations: {
            src: "/symbols/blocs/oeuvres/relations.png",
            label: "Relations",
            accent: "var(--atelier-animation-corail-cel)",
        },
    },
    personnages: {
        genese: {
            src: "/symbols/blocs/personnages/genese.png",
            label: "Genèse",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        caractere: {
            src: "/symbols/blocs/personnages/caractere.png",
            label: "Caractère",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        trajectoire: {
            src: "/symbols/blocs/personnages/trajectoire.png",
            label: "Trajectoire",
            accent: "var(--atelier-animation-corail-cel)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
