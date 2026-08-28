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
    images: {
        "objectif-iris": {
            src: "/symbols/techniques/images/objectif-iris.png",
            label: "Objectif à iris",
            accent: "var(--atelier-animation-cyan-effets-optiques)",
        },
        posemetre: {
            src: "/symbols/techniques/images/posemetre.png",
            label: "Posemètre",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "filtres-optiques": {
            src: "/symbols/techniques/images/filtres-optiques.png",
            label: "Filtres optiques",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "viseur-composition": {
            src: "/symbols/techniques/images/viseur-composition.png",
            label: "Viseur de composition",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "matte-painting": {
            src: "/symbols/techniques/images/matte-painting.png",
            label: "Verre de matte painting",
            accent: "var(--atelier-animation-gouache)",
        },
        retroprojection: {
            src: "/symbols/techniques/images/retroprojection.png",
            label: "Rétroprojection",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "perspective-forcee": {
            src: "/symbols/techniques/images/perspective-forcee.png",
            label: "Décor en perspective forcée",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "maquette-miniature": {
            src: "/symbols/techniques/images/maquette-miniature.png",
            label: "Maquette miniature",
            accent: "var(--atelier-animation-olive-decor)",
        },
        "fond-bleu": {
            src: "/symbols/techniques/images/fond-bleu.png",
            label: "Fond bleu",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "incrustation-sodium": {
            src: "/symbols/techniques/images/incrustation-sodium.png",
            label: "Incrustation au sodium",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "tireuse-optique": {
            src: "/symbols/techniques/images/tireuse-optique.png",
            label: "Tireuse optique",
            accent: "var(--atelier-animation-cyan-effets-optiques)",
        },
        "compositing-calques": {
            src: "/symbols/techniques/images/compositing-calques.png",
            label: "Compositing par calques",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "cache-contre-cache": {
            src: "/symbols/techniques/images/cache-contre-cache.png",
            label: "Cache et contre-cache",
            accent: "var(--atelier-animation-graphite)",
        },
        etalonnage: {
            src: "/symbols/techniques/images/etalonnage.png",
            label: "Station d’étalonnage",
            accent: "var(--atelier-animation-gouache)",
        },
        "scanner-pellicule": {
            src: "/symbols/techniques/images/scanner-pellicule.png",
            label: "Scanner de pellicule",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "restauration-image": {
            src: "/symbols/techniques/images/restauration-image.png",
            label: "Station de restauration d’image",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
    },
    couleur: {
        "cercle-chromatique": {
            src: "/symbols/techniques/couleur/cercle-chromatique.png",
            label: "Cercle chromatique",
            accent: "var(--atelier-animation-gouache)",
        },
        "nuancier-production": {
            src: "/symbols/techniques/couleur/nuancier-production.png",
            label: "Nuancier de production",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "palette-harmonique": {
            src: "/symbols/techniques/couleur/palette-harmonique.png",
            label: "Palette harmonique",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "charte-colorimetrique": {
            src: "/symbols/techniques/couleur/charte-colorimetrique.png",
            label: "Charte colorimétrique",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "teintage-pellicule": {
            src: "/symbols/techniques/couleur/teintage-pellicule.png",
            label: "Teintage de pellicule",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "virage-pellicule": {
            src: "/symbols/techniques/couleur/virage-pellicule.png",
            label: "Virage de pellicule",
            accent: "var(--atelier-animation-cyan-effets-optiques)",
        },
        "colorisation-pochoir": {
            src: "/symbols/techniques/couleur/colorisation-pochoir.png",
            label: "Colorisation au pochoir",
            accent: "var(--atelier-animation-framboise-encrage)",
        },
        "separation-trichrome": {
            src: "/symbols/techniques/couleur/separation-trichrome.png",
            label: "Séparation trichrome",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "prisme-trichrome": {
            src: "/symbols/techniques/couleur/prisme-trichrome.png",
            label: "Prisme trichrome",
            accent: "var(--atelier-animation-cyan-effets-optiques)",
        },
        "camera-trois-bandes": {
            src: "/symbols/techniques/couleur/camera-trois-bandes.png",
            label: "Caméra trois bandes",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "matrices-colorants": {
            src: "/symbols/techniques/couleur/matrices-colorants.png",
            label: "Matrices de colorants",
            accent: "var(--atelier-animation-gouache)",
        },
        "transfert-colorants": {
            src: "/symbols/techniques/couleur/transfert-colorants.png",
            label: "Transfert de colorants",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "color-script": {
            src: "/symbols/techniques/couleur/color-script.png",
            label: "Color script",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "palette-personnage": {
            src: "/symbols/techniques/couleur/palette-personnage.png",
            label: "Palette de personnage",
            accent: "var(--atelier-animation-corail-cel)",
        },
        densitometre: {
            src: "/symbols/techniques/couleur/densitometre.png",
            label: "Densitomètre",
            accent: "var(--atelier-animation-graphite)",
        },
        "calibration-ecran": {
            src: "/symbols/techniques/couleur/calibration-ecran.png",
            label: "Calibration d’écran",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
