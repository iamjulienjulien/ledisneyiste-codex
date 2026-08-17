import type { SymbolDefinition } from "@/types/symbols";

export const symbolsCodex = {
    index: {
        personnages: {
            src: "/symbols/codex/index/personnages.png",
            label: "Personnages",
            accent: "var(--atelier-famille-personnages)",
        },
        createurs: {
            src: "/symbols/codex/index/createurs.png",
            label: "Créateurs",
            accent: "var(--atelier-famille-createurs)",
        },
        oeuvres: {
            src: "/symbols/codex/index/oeuvres.png",
            label: "Œuvres",
            accent: "var(--atelier-famille-oeuvres)",
        },
        epoques: {
            src: "/symbols/codex/index/epoques.png",
            label: "Époques",
            accent: "var(--atelier-famille-epoques)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
