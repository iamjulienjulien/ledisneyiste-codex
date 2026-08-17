import type { SymbolDefinition } from "@/types/symbols";

export const symbolsBlocs = {
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
