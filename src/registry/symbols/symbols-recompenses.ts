import type { SymbolDefinition } from "@/types/symbols";
import type { TropheeRecompenseDisney } from "@/types/recompense";

export const symbolsRecompenses = {
    trophees: {
        "statuette-oscar": {
            src: "/symbols/recompenses/trophees/statuette-oscar.png",
            label: "Statuette des Oscars",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "plaque-technique-multiplane": {
            src: "/symbols/recompenses/trophees/plaque-technique-multiplane.png",
            label: "Plaque scientifique et technique",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "medaille-societe-des-nations": {
            src: "/symbols/recompenses/trophees/medaille-societe-des-nations.png",
            label: "Médaille de la Société des Nations",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "medaille-or-venise": {
            src: "/symbols/recompenses/trophees/medaille-or-venise.png",
            label: "Médaille d’or de Venise",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
    },
} as const satisfies Record<
    string,
    Record<TropheeRecompenseDisney, SymbolDefinition>
>;
