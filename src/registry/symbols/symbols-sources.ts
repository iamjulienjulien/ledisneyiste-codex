import type { SymbolDefinition } from "@/types/symbols";

const accents = {
    supports: "var(--atelier-animation-bleu-reperage)",
    documents: "var(--atelier-animation-sepia-storyboard)",
    archives: "var(--atelier-animation-indigo-nuit-studio)",
    conservation: "var(--atelier-animation-turquoise-acetate)",
} as const;

export const symbolsSources = {
    supports: {
        "livre-relie": {
            src: "/symbols/sources/supports/livre-relie.png",
            label: "Livre relié",
            accent: accents.supports,
        },
        "page-web-archivee": {
            src: "/symbols/sources/supports/page-web-archivee.png",
            label: "Page web archivée",
            accent: accents.supports,
        },
        "bobine-film": {
            src: "/symbols/sources/supports/bobine-film.png",
            label: "Bobine de film",
            accent: accents.supports,
        },
        "cassette-vhs": {
            src: "/symbols/sources/supports/cassette-vhs.png",
            label: "Cassette VHS",
            accent: accents.supports,
        },
        "revue-illustree": {
            src: "/symbols/sources/supports/revue-illustree.png",
            label: "Revue illustrée",
            accent: accents.supports,
        },
        "journal-imprime": {
            src: "/symbols/sources/supports/journal-imprime.png",
            label: "Journal imprimé",
            accent: accents.supports,
        },
        "catalogue-brochure": {
            src: "/symbols/sources/supports/catalogue-brochure.png",
            label: "Catalogue ou brochure",
            accent: accents.supports,
        },
        "fichier-pdf": {
            src: "/symbols/sources/supports/fichier-pdf.png",
            label: "Fichier PDF",
            accent: accents.supports,
        },
        diapositive: {
            src: "/symbols/sources/supports/diapositive.png",
            label: "Diapositive",
            accent: accents.supports,
        },
        "negatif-photographique": {
            src: "/symbols/sources/supports/negatif-photographique.png",
            label: "Négatif photographique",
            accent: accents.supports,
        },
        "cassette-audio": {
            src: "/symbols/sources/supports/cassette-audio.png",
            label: "Cassette audio",
            accent: accents.supports,
        },
        "bande-magnetique": {
            src: "/symbols/sources/supports/bande-magnetique.png",
            label: "Bande magnétique",
            accent: accents.supports,
        },
        "disque-vinyle": {
            src: "/symbols/sources/supports/disque-vinyle.png",
            label: "Disque vinyle",
            accent: accents.supports,
        },
        laserdisc: {
            src: "/symbols/sources/supports/laserdisc.png",
            label: "LaserDisc",
            accent: accents.supports,
        },
        "disque-optique": {
            src: "/symbols/sources/supports/disque-optique.png",
            label: "Disque optique",
            accent: accents.supports,
        },
        "stockage-numerique": {
            src: "/symbols/sources/supports/stockage-numerique.png",
            label: "Stockage numérique",
            accent: accents.supports,
        },
    },
    documents: {
        "lettre-signee": {
            src: "/symbols/sources/documents/lettre-signee.png",
            label: "Lettre signée",
            accent: accents.documents,
        },
        contrat: {
            src: "/symbols/sources/documents/contrat.png",
            label: "Contrat",
            accent: accents.documents,
        },
        "memo-interne": {
            src: "/symbols/sources/documents/memo-interne.png",
            label: "Mémo interne",
            accent: accents.documents,
        },
        scenario: {
            src: "/symbols/sources/documents/scenario.png",
            label: "Scénario",
            accent: accents.documents,
        },
        "script-annote": {
            src: "/symbols/sources/documents/script-annote.png",
            label: "Script annoté",
            accent: accents.documents,
        },
        "feuille-production": {
            src: "/symbols/sources/documents/feuille-production.png",
            label: "Feuille de production",
            accent: accents.documents,
        },
        "feuille-service": {
            src: "/symbols/sources/documents/feuille-service.png",
            label: "Feuille de service",
            accent: accents.documents,
        },
        storyboard: {
            src: "/symbols/sources/documents/storyboard.png",
            label: "Storyboard",
            accent: accents.documents,
        },
        "model-sheet": {
            src: "/symbols/sources/documents/model-sheet.png",
            label: "Model sheet",
            accent: accents.documents,
        },
        "concept-art": {
            src: "/symbols/sources/documents/concept-art.png",
            label: "Concept art",
            accent: accents.documents,
        },
        "plan-technique": {
            src: "/symbols/sources/documents/plan-technique.png",
            label: "Plan technique",
            accent: accents.documents,
        },
        "photographie-plateau": {
            src: "/symbols/sources/documents/photographie-plateau.png",
            label: "Photographie de plateau",
            accent: accents.documents,
        },
        "coupure-presse": {
            src: "/symbols/sources/documents/coupure-presse.png",
            label: "Coupure de presse",
            accent: accents.documents,
        },
        "communique-presse": {
            src: "/symbols/sources/documents/communique-presse.png",
            label: "Communiqué de presse",
            accent: accents.documents,
        },
        "transcription-entretien": {
            src: "/symbols/sources/documents/transcription-entretien.png",
            label: "Transcription d’entretien",
            accent: accents.documents,
        },
        "rapport-recherche": {
            src: "/symbols/sources/documents/rapport-recherche.png",
            label: "Rapport de recherche",
            accent: accents.documents,
        },
    },
    archives: {
        "boite-archives-cotee": {
            src: "/symbols/sources/archives/boite-archives-cotee.png",
            label: "Boîte d’archives cotée",
            accent: accents.archives,
        },
        "dossier-cote": {
            src: "/symbols/sources/archives/dossier-cote.png",
            label: "Dossier coté",
            accent: accents.archives,
        },
        "chemise-onglets": {
            src: "/symbols/sources/archives/chemise-onglets.png",
            label: "Chemise à onglets",
            accent: accents.archives,
        },
        "registre-inventaire": {
            src: "/symbols/sources/archives/registre-inventaire.png",
            label: "Registre d’inventaire",
            accent: accents.archives,
        },
        "fiche-catalogue": {
            src: "/symbols/sources/archives/fiche-catalogue.png",
            label: "Fiche de catalogue",
            accent: accents.archives,
        },
        "tiroir-index": {
            src: "/symbols/sources/archives/tiroir-index.png",
            label: "Tiroir d’index",
            accent: accents.archives,
        },
        "bordereau-versement": {
            src: "/symbols/sources/archives/bordereau-versement.png",
            label: "Bordereau de versement",
            accent: accents.archives,
        },
        "etiquette-cote": {
            src: "/symbols/sources/archives/etiquette-cote.png",
            label: "Étiquette de cote",
            accent: accents.archives,
        },
        "sceau-provenance": {
            src: "/symbols/sources/archives/sceau-provenance.png",
            label: "Sceau de provenance",
            accent: accents.archives,
        },
        "bac-photographies": {
            src: "/symbols/sources/archives/bac-photographies.png",
            label: "Bac de photographies",
            accent: accents.archives,
        },
        "enveloppe-negatifs": {
            src: "/symbols/sources/archives/enveloppe-negatifs.png",
            label: "Enveloppe de négatifs",
            accent: accents.archives,
        },
        "boite-film": {
            src: "/symbols/sources/archives/boite-film.png",
            label: "Boîte de film",
            accent: accents.archives,
        },
        "rouleau-microfilm": {
            src: "/symbols/sources/archives/rouleau-microfilm.png",
            label: "Rouleau de microfilm",
            accent: accents.archives,
        },
        microfiche: {
            src: "/symbols/sources/archives/microfiche.png",
            label: "Microfiche",
            accent: accents.archives,
        },
        "rayonnage-compactus": {
            src: "/symbols/sources/archives/rayonnage-compactus.png",
            label: "Rayonnage compactus",
            accent: accents.archives,
        },
        "registre-consultation": {
            src: "/symbols/sources/archives/registre-consultation.png",
            label: "Registre de consultation",
            accent: accents.archives,
        },
    },
    conservation: {
        "gants-conservation": {
            src: "/symbols/sources/conservation/gants-conservation.png",
            label: "Gants de conservation",
            accent: accents.conservation,
        },
        "loupe-eclairante": {
            src: "/symbols/sources/conservation/loupe-eclairante.png",
            label: "Loupe éclairante",
            accent: accents.conservation,
        },
        "pinceau-doux": {
            src: "/symbols/sources/conservation/pinceau-doux.png",
            label: "Pinceau doux",
            accent: accents.conservation,
        },
        soufflette: {
            src: "/symbols/sources/conservation/soufflette.png",
            label: "Soufflette",
            accent: accents.conservation,
        },
        "plioir-spatule": {
            src: "/symbols/sources/conservation/plioir-spatule.png",
            label: "Plioir et spatule",
            accent: accents.conservation,
        },
        "pochette-sans-acide": {
            src: "/symbols/sources/conservation/pochette-sans-acide.png",
            label: "Pochette sans acide",
            accent: accents.conservation,
        },
        "enveloppe-photographique": {
            src: "/symbols/sources/conservation/enveloppe-photographique.png",
            label: "Enveloppe photographique",
            accent: accents.conservation,
        },
        "papier-intercalaire": {
            src: "/symbols/sources/conservation/papier-intercalaire.png",
            label: "Papier intercalaire",
            accent: accents.conservation,
        },
        "boite-conservation": {
            src: "/symbols/sources/conservation/boite-conservation.png",
            label: "Boîte de conservation",
            accent: accents.conservation,
        },
        "ruban-reparation": {
            src: "/symbols/sources/conservation/ruban-reparation.png",
            label: "Ruban de réparation",
            accent: accents.conservation,
        },
        "scanner-documentaire": {
            src: "/symbols/sources/conservation/scanner-documentaire.png",
            label: "Scanner documentaire",
            accent: accents.conservation,
        },
        "scanner-pellicule": {
            src: "/symbols/sources/conservation/scanner-pellicule.png",
            label: "Scanner de pellicule",
            accent: accents.conservation,
        },
        "table-nettoyage-film": {
            src: "/symbols/sources/conservation/table-nettoyage-film.png",
            label: "Table de nettoyage de film",
            accent: accents.conservation,
        },
        hygrometre: {
            src: "/symbols/sources/conservation/hygrometre.png",
            label: "Hygromètre",
            accent: accents.conservation,
        },
        "enregistreur-climatique": {
            src: "/symbols/sources/conservation/enregistreur-climatique.png",
            label: "Enregistreur climatique",
            accent: accents.conservation,
        },
        "armoire-climatisee": {
            src: "/symbols/sources/conservation/armoire-climatisee.png",
            label: "Armoire climatisée",
            accent: accents.conservation,
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
