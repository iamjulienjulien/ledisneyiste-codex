import type { SymbolDefinition } from "@/types/symbols";

export const symbolsGeneral = {
    logos: {
        "le-codex-du-disneyiste": {
            src: "/symbols/general/logos/le-codex-du-disneyiste.png",
            label: "Le Codex du Disneyiste",
            accent: "var(--atelier-animation-violet-ombre-portee)",
        },
    },
    cinema: {
        bobine: {
            src: "/symbols/general/cinema/bobine.png",
            label: "Bobine de film",
            accent: "var(--atelier-animation-graphite)",
        },
        "camera-cinema": {
            src: "/symbols/general/cinema/camera-cinema.png",
            label: "Caméra de cinéma",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "casque-studio": {
            src: "/symbols/general/cinema/casque-studio.png",
            label: "Casque de studio",
            accent: "var(--atelier-animation-encre)",
        },
        clap: {
            src: "/symbols/general/cinema/clap.png",
            label: "Clap",
            accent: "var(--atelier-animation-graphite)",
        },
        "fauteuil-realisateur": {
            src: "/symbols/general/cinema/fauteuil-realisateur.png",
            label: "Fauteuil de réalisateur",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "haut-parleur": {
            src: "/symbols/general/cinema/haut-parleur.png",
            label: "Haut-parleur de studio",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        megaphone: {
            src: "/symbols/general/cinema/megaphone.png",
            label: "Mégaphone",
            accent: "var(--atelier-animation-corail-cel)",
        },
        "micro-perche": {
            src: "/symbols/general/cinema/micro-perche.png",
            label: "Micro sur perche",
            accent: "var(--atelier-animation-graphite)",
        },
        pellicule: {
            src: "/symbols/general/cinema/pellicule.png",
            label: "Pellicule",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "projecteur-cinema": {
            src: "/symbols/general/cinema/projecteur-cinema.png",
            label: "Projecteur de cinéma",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "projecteur-plateau": {
            src: "/symbols/general/cinema/projecteur-plateau.png",
            label: "Projecteur de plateau",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "rideau-cinema": {
            src: "/symbols/general/cinema/rideau-cinema.png",
            label: "Rideaux de cinéma",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        scenario: {
            src: "/symbols/general/cinema/scenario.png",
            label: "Scénario",
            accent: "var(--atelier-animation-papier-animation)",
        },
        storyboard: {
            src: "/symbols/general/cinema/storyboard.png",
            label: "Storyboard",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "ticket-cinema": {
            src: "/symbols/general/cinema/ticket-cinema.png",
            label: "Billet de cinéma",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
