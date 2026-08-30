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
        "grand-trophee-art-venise": {
            src: "/symbols/recompenses/trophees/grand-trophee-art-venise.png",
            label: "Grand trophée d’art de Venise",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "rouleau-nyfcc": {
            src: "/symbols/recompenses/trophees/rouleau-nyfcc.png",
            label: "Rouleau du New York Film Critics Circle",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "globe-dore": {
            src: "/symbols/recompenses/trophees/globe-dore.png",
            label: "Globe doré",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "gramophone-grammy": {
            src: "/symbols/recompenses/trophees/gramophone-grammy.png",
            label: "Gramophone des Grammy Awards",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "grand-prix-animation-cannes": {
            src: "/symbols/recompenses/trophees/grand-prix-animation-cannes.png",
            label: "Grand prix d’animation de Cannes",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "masque-bafta": {
            src: "/symbols/recompenses/trophees/masque-bafta.png",
            label: "Masque des BAFTA",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "medaille-peabody": {
            src: "/symbols/recompenses/trophees/medaille-peabody.png",
            label: "Médaille Peabody",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "medaillon-tony": {
            src: "/symbols/recompenses/trophees/medaillon-tony.png",
            label: "Médaillon des Tony Awards",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "oscar-honorifique-blanche-neige": {
            src: "/symbols/recompenses/trophees/oscar-honorifique-blanche-neige.png",
            label: "Oscar honorifique de Blanche-Neige",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "ours-or-berlin": {
            src: "/symbols/recompenses/trophees/ours-or-berlin.png",
            label: "Ours d’or de Berlin",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "statuette-disney-legends": {
            src: "/symbols/recompenses/trophees/statuette-disney-legends.png",
            label: "Statuette Disney Legends",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "statuette-emmy": {
            src: "/symbols/recompenses/trophees/statuette-emmy.png",
            label: "Statuette des Emmy Awards",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "trophee-annie": {
            src: "/symbols/recompenses/trophees/trophee-annie.png",
            label: "Trophée des Annie Awards",
            accent: "var(--atelier-animation-corail-cel)",
        },
        "trophee-thea": {
            src: "/symbols/recompenses/trophees/trophee-thea.png",
            label: "Trophée des Thea Awards",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
    },
} as const satisfies Record<
    string,
    Record<TropheeRecompenseDisney, SymbolDefinition>
>;
