import type { SymbolDefinition } from "@/types/symbols";

export const symbolsTechniques = {
    animation: {
        "camera-banc-titre": {
            src: "/symbols/techniques/animation/camera-banc-titre.png",
            label: "Caméra de banc-titre",
            accent: "var(--atelier-animation-orange-banc-titre)",
        },
        "camera-multiplane": {
            src: "/symbols/techniques/animation/camera-multiplane.png",
            label: "Caméra multiplane",
            accent: "var(--atelier-animation-olive-decor)",
        },
        "camera-pencil-test": {
            src: "/symbols/techniques/animation/camera-pencil-test.png",
            label: "Caméra de pencil test",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "cellulo-peint": {
            src: "/symbols/techniques/animation/cellulo-peint.png",
            label: "Cellulo peint",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "crayons-animation": {
            src: "/symbols/techniques/animation/crayons-animation.png",
            label: "Crayons d’animation",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "disque-animation": {
            src: "/symbols/techniques/animation/disque-animation.png",
            label: "Disque d’animation",
            accent: "var(--atelier-animation-graphite)",
        },
        "feuille-animation": {
            src: "/symbols/techniques/animation/feuille-animation.png",
            label: "Feuille d’animation",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "feuille-exposition": {
            src: "/symbols/techniques/animation/feuille-exposition.png",
            label: "Feuille d’exposition",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "kit-encrage-cellulo": {
            src: "/symbols/techniques/animation/kit-encrage-cellulo.png",
            label: "Kit d’encrage et de peinture",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "metronome-synchronisation": {
            src: "/symbols/techniques/animation/metronome-synchronisation.png",
            label: "Métronome de synchronisation",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "pile-cellulos": {
            src: "/symbols/techniques/animation/pile-cellulos.png",
            label: "Pile de cellulos",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "planche-modele": {
            src: "/symbols/techniques/animation/planche-modele.png",
            label: "Planche modèle",
            accent: "var(--atelier-animation-graphite)",
        },
        "regle-a-tenons": {
            src: "/symbols/techniques/animation/regle-a-tenons.png",
            label: "Règle à tenons",
            accent: "var(--atelier-animation-graphite)",
        },
        rotoscope: {
            src: "/symbols/techniques/animation/rotoscope.png",
            label: "Rotoscope",
            accent: "var(--atelier-animation-cyan-effets-optiques)",
        },
        "station-caps": {
            src: "/symbols/techniques/animation/station-caps.png",
            label: "Station CAPS",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "table-lumineuse": {
            src: "/symbols/techniques/animation/table-lumineuse.png",
            label: "Table lumineuse",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "taille-crayon-mecanique": {
            src: "/symbols/techniques/animation/taille-crayon-mecanique.png",
            label: "Taille-crayon mécanique",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        xerographie: {
            src: "/symbols/techniques/animation/xerographie.png",
            label: "Xérographie",
            accent: "var(--atelier-animation-vert-cellulo)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
