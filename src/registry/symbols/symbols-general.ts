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
    archives: {
        "boite-archives": {
            src: "/symbols/general/archives/boite-archives.png",
            label: "Boîte d’archives",
            accent: "var(--atelier-animation-graphite)",
        },
        "chemise-archives": {
            src: "/symbols/general/archives/chemise-archives.png",
            label: "Chemise d’archives",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "dossier-ficelle": {
            src: "/symbols/general/archives/dossier-ficelle.png",
            label: "Dossier à ficelle",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "registre-relie": {
            src: "/symbols/general/archives/registre-relie.png",
            label: "Registre relié",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "porte-fiches": {
            src: "/symbols/general/archives/porte-fiches.png",
            label: "Porte-fiches",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "fichier-bois": {
            src: "/symbols/general/archives/fichier-bois.png",
            label: "Fichier en bois",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "classeur-anneaux": {
            src: "/symbols/general/archives/classeur-anneaux.png",
            label: "Classeur à anneaux",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "tube-plans": {
            src: "/symbols/general/archives/tube-plans.png",
            label: "Tube à plans",
            accent: "var(--atelier-animation-graphite)",
        },
        "boite-photographies": {
            src: "/symbols/general/archives/boite-photographies.png",
            label: "Boîte de photographies",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "bobine-film-archive": {
            src: "/symbols/general/archives/bobine-film-archive.png",
            label: "Bobine de film d’archive",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "lecteur-microfilm": {
            src: "/symbols/general/archives/lecteur-microfilm.png",
            label: "Lecteur de microfilm",
            accent: "var(--atelier-animation-graphite)",
        },
        "tampon-dateur": {
            src: "/symbols/general/archives/tampon-dateur.png",
            label: "Tampon dateur",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "presse-a-sec": {
            src: "/symbols/general/archives/presse-a-sec.png",
            label: "Presse à sec",
            accent: "var(--atelier-animation-graphite)",
        },
        "gants-conservation": {
            src: "/symbols/general/archives/gants-conservation.png",
            label: "Gants de conservation",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "loupe-archiviste": {
            src: "/symbols/general/archives/loupe-archiviste.png",
            label: "Loupe d’archiviste",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "pinceau-depoussierage": {
            src: "/symbols/general/archives/pinceau-depoussierage.png",
            label: "Pinceau de dépoussiérage",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "scanner-documents": {
            src: "/symbols/general/archives/scanner-documents.png",
            label: "Scanner de documents",
            accent: "var(--atelier-animation-graphite)",
        },
        "thermo-hygrometre": {
            src: "/symbols/general/archives/thermo-hygrometre.png",
            label: "Thermo-hygromètre",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
