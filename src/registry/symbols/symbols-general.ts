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
    ecriture: {
        "carnet-travail": {
            src: "/symbols/general/ecriture/carnet-travail.png",
            label: "Carnet de travail",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "crayon-bleu": {
            src: "/symbols/general/ecriture/crayon-bleu.png",
            label: "Crayon bleu",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "machine-a-ecrire": {
            src: "/symbols/general/ecriture/machine-a-ecrire.png",
            label: "Machine à écrire",
            accent: "var(--atelier-animation-graphite)",
        },
        "manuscrit-corrige": {
            src: "/symbols/general/ecriture/manuscrit-corrige.png",
            label: "Manuscrit corrigé",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "plume-ecriture": {
            src: "/symbols/general/ecriture/plume-ecriture.png",
            label: "Plume d’écriture",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "stylo-plume": {
            src: "/symbols/general/ecriture/stylo-plume.png",
            label: "Stylo-plume",
            accent: "var(--atelier-animation-encre)",
        },
        storyboard: {
            src: "/symbols/general/ecriture/storyboard.png",
            label: "Storyboard d’écriture",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "bloc-notes": {
            src: "/symbols/general/ecriture/bloc-notes.png",
            label: "Bloc-notes",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "presse-typographique": {
            src: "/symbols/general/ecriture/presse-typographique.png",
            label: "Presse typographique",
            accent: "var(--atelier-animation-graphite)",
        },
        "marque-page": {
            src: "/symbols/general/ecriture/marque-page.png",
            label: "Marque-page",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        encrier: {
            src: "/symbols/general/ecriture/encrier.png",
            label: "Encrier",
            accent: "var(--atelier-animation-encre)",
        },
        "pile-epreuves": {
            src: "/symbols/general/ecriture/pile-epreuves.png",
            label: "Pile d’épreuves",
            accent: "var(--atelier-animation-papier-animation)",
        },
    },
    exploration: {
        "boussole-orientation": {
            src: "/symbols/general/exploration/boussole-orientation.png",
            label: "Boussole d’orientation",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "carte-depliee": {
            src: "/symbols/general/exploration/carte-depliee.png",
            label: "Carte dépliée",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "jumelles-observation": {
            src: "/symbols/general/exploration/jumelles-observation.png",
            label: "Jumelles d’observation",
            accent: "var(--atelier-animation-graphite)",
        },
        "porte-entrouverte": {
            src: "/symbols/general/exploration/porte-entrouverte.png",
            label: "Porte entrouverte",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "longue-vue": {
            src: "/symbols/general/exploration/longue-vue.png",
            label: "Longue-vue",
            accent: "var(--atelier-animation-graphite)",
        },
        "telescope-exploration": {
            src: "/symbols/general/exploration/telescope-exploration.png",
            label: "Télescope d’exploration",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "lanterne-parcours": {
            src: "/symbols/general/exploration/lanterne-parcours.png",
            label: "Lanterne de parcours",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "cle-passage": {
            src: "/symbols/general/exploration/cle-passage.png",
            label: "Clé de passage",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "panneau-indicateur": {
            src: "/symbols/general/exploration/panneau-indicateur.png",
            label: "Panneau indicateur",
            accent: "var(--atelier-animation-corail-cel)",
        },
        "balise-cheminement": {
            src: "/symbols/general/exploration/balise-cheminement.png",
            label: "Balise de cheminement",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "sacoche-explorateur": {
            src: "/symbols/general/exploration/sacoche-explorateur.png",
            label: "Sacoche d’explorateur",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "carnet-terrain": {
            src: "/symbols/general/exploration/carnet-terrain.png",
            label: "Carnet de terrain",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "cairn-reperage": {
            src: "/symbols/general/exploration/cairn-reperage.png",
            label: "Cairn de repérage",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "carte-balises-reliees": {
            src: "/symbols/general/exploration/carte-balises-reliees.png",
            label: "Carte de balises reliées",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "fanion-decouverte": {
            src: "/symbols/general/exploration/fanion-decouverte.png",
            label: "Fanion de découverte",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "passage-sous-arche": {
            src: "/symbols/general/exploration/passage-sous-arche.png",
            label: "Passage sous arche",
            accent: "var(--atelier-animation-papier-animation)",
        },
    },
    temps: {
        "horloge-studio": {
            src: "/symbols/general/temps/horloge-studio.png",
            label: "Horloge de studio",
            accent: "var(--atelier-animation-graphite)",
        },
        "sablier-precision": {
            src: "/symbols/general/temps/sablier-precision.png",
            label: "Sablier de précision",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "calendrier-perpetuel": {
            src: "/symbols/general/temps/calendrier-perpetuel.png",
            label: "Calendrier perpétuel",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "chronometre-production": {
            src: "/symbols/general/temps/chronometre-production.png",
            label: "Chronomètre de production",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "montre-poche": {
            src: "/symbols/general/temps/montre-poche.png",
            label: "Montre de poche",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "horloge-clapets": {
            src: "/symbols/general/temps/horloge-clapets.png",
            label: "Horloge à clapets",
            accent: "var(--atelier-animation-graphite)",
        },
        ephemeride: {
            src: "/symbols/general/temps/ephemeride.png",
            label: "Éphéméride",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "cadran-chronologique": {
            src: "/symbols/general/temps/cadran-chronologique.png",
            label: "Cadran chronologique",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "compteur-dates": {
            src: "/symbols/general/temps/compteur-dates.png",
            label: "Compteur de dates",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "frise-mecanique": {
            src: "/symbols/general/temps/frise-mecanique.png",
            label: "Frise mécanique",
            accent: "var(--atelier-animation-graphite)",
        },
        "ligne-temps-jalons": {
            src: "/symbols/general/temps/ligne-temps-jalons.png",
            label: "Ligne du temps à jalons",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "capsule-temporelle": {
            src: "/symbols/general/temps/capsule-temporelle.png",
            label: "Capsule temporelle",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "roue-saisons": {
            src: "/symbols/general/temps/roue-saisons.png",
            label: "Roue des saisons",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "pendule-precision": {
            src: "/symbols/general/temps/pendule-precision.png",
            label: "Pendule de précision",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "selecteur-periode": {
            src: "/symbols/general/temps/selecteur-periode.png",
            label: "Sélecteur de période",
            accent: "var(--atelier-animation-corail-cel)",
        },
        "ruban-chronologique": {
            src: "/symbols/general/temps/ruban-chronologique.png",
            label: "Ruban chronologique",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
    },
    atelier: {
        "boite-outils-ouverte": {
            src: "/symbols/general/atelier/boite-outils-ouverte.png",
            label: "Boîte à outils ouverte",
            accent: "var(--atelier-animation-rouge-crayon)",
        },
        "pot-outils-creatifs": {
            src: "/symbols/general/atelier/pot-outils-creatifs.png",
            label: "Pot d’outils créatifs",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "palette-atelier": {
            src: "/symbols/general/atelier/palette-atelier.png",
            label: "Palette d’atelier",
            accent: "var(--atelier-animation-corail-cel)",
        },
        "regle-t-equerre": {
            src: "/symbols/general/atelier/regle-t-equerre.png",
            label: "Règle en T et équerre",
            accent: "var(--atelier-animation-graphite)",
        },
        "compas-dessin": {
            src: "/symbols/general/atelier/compas-dessin.png",
            label: "Compas de dessin",
            accent: "var(--atelier-animation-graphite)",
        },
        "cutter-precision": {
            src: "/symbols/general/atelier/cutter-precision.png",
            label: "Cutter de précision",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "rouleau-papier": {
            src: "/symbols/general/atelier/rouleau-papier.png",
            label: "Rouleau de papier",
            accent: "var(--atelier-animation-papier-animation)",
        },
        "planche-dessin-inclinee": {
            src: "/symbols/general/atelier/planche-dessin-inclinee.png",
            label: "Planche à dessin inclinée",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
        "lampe-atelier": {
            src: "/symbols/general/atelier/lampe-atelier.png",
            label: "Lampe d’atelier",
            accent: "var(--atelier-animation-jaune-lampe)",
        },
        "nuancier-matieres": {
            src: "/symbols/general/atelier/nuancier-matieres.png",
            label: "Nuancier de matières",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
        "tablier-artiste": {
            src: "/symbols/general/atelier/tablier-artiste.png",
            label: "Tablier d’artiste",
            accent: "var(--atelier-animation-indigo-nuit-studio)",
        },
        "serre-joints": {
            src: "/symbols/general/atelier/serre-joints.png",
            label: "Serre-joints",
            accent: "var(--atelier-animation-graphite)",
        },
        "devidoir-ruban-masquage": {
            src: "/symbols/general/atelier/devidoir-ruban-masquage.png",
            label: "Dévidoir de ruban de masquage",
            accent: "var(--atelier-animation-ambre-projecteur)",
        },
        "plateau-fournitures": {
            src: "/symbols/general/atelier/plateau-fournitures.png",
            label: "Plateau de fournitures",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
        "etau-precision": {
            src: "/symbols/general/atelier/etau-precision.png",
            label: "Étau de précision",
            accent: "var(--atelier-animation-graphite)",
        },
        "tiroir-atelier-ouvert": {
            src: "/symbols/general/atelier/tiroir-atelier-ouvert.png",
            label: "Tiroir d’atelier ouvert",
            accent: "var(--atelier-animation-sepia-storyboard)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
