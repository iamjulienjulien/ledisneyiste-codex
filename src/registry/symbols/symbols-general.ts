import type { SymbolDefinition } from "@/types/symbols";

export const symbolsGeneral = {
    logos: {
        "le-codex-du-disneyiste": {
            src: "/symbols/general/logos/le-codex-du-disneyiste.png",
            label: "Le Codex du Disneyiste",
            accent: "var(--atelier-animation-violet-ombre-portee)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
