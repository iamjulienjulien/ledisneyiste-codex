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
