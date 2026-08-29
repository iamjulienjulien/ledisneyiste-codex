import type { SymbolSelection } from "@/registry/symbols";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { DomaineCreditOeuvre } from "@/types/oeuvre";

export type CreditDomainDefinition = Readonly<{
    label: string;
    actionLabel: string;
    color: AtelierAnimationColorSlug;
    symbol: SymbolSelection;
}>;

export const creditDomainRegistry = {
    "production-direction": {
        label: "Production et direction",
        actionLabel: "Produire et conduire",
        color: "rouge-crayon",
        symbol: {
            registry: "general",
            collection: "cinema",
            slug: "fauteuil-realisateur",
        },
    },
    "histoire-adaptation": {
        label: "Histoire et adaptation",
        actionLabel: "Écrire et adapter",
        color: "orange-banc-titre",
        symbol: { registry: "general", collection: "cinema", slug: "scenario" },
    },
    "direction-artistique-conception": {
        label: "Direction artistique et conception",
        actionLabel: "Concevoir le monde",
        color: "jaune-lampe",
        symbol: {
            registry: "techniques",
            collection: "couleur",
            slug: "color-script",
        },
    },
    "animation-personnages": {
        label: "Animation et personnages",
        actionLabel: "Donner le mouvement",
        color: "rouge-crayon",
        symbol: {
            registry: "techniques",
            collection: "animation",
            slug: "planche-modele",
        },
    },
    "decors-effets-photographie": {
        label: "Décors, effets et photographie",
        actionLabel: "Construire l’image",
        color: "vert-cellulo",
        symbol: {
            registry: "techniques",
            collection: "images",
            slug: "matte-painting",
        },
    },
    "musique-chansons": {
        label: "Musique et chansons",
        actionLabel: "Composer et faire entendre",
        color: "bleu-reperage",
        symbol: {
            registry: "techniques",
            collection: "son",
            slug: "generateur-click-track",
        },
    },
    "interpretation-vocale": {
        label: "Interprétation vocale",
        actionLabel: "Prêter une voix",
        color: "violet-ombre-portee",
        symbol: {
            registry: "techniques",
            collection: "son",
            slug: "microphone-ruban",
        },
    },
    "innovations-techniques": {
        label: "Innovations techniques",
        actionLabel: "Transformer la technique",
        color: "vert-cellulo",
        symbol: {
            registry: "techniques",
            collection: "animation",
            slug: "camera-multiplane",
        },
    },
    "reference-filmee": {
        label: "Référence filmée",
        actionLabel: "Donner un modèle au mouvement",
        color: "bleu-reperage",
        symbol: {
            registry: "general",
            collection: "cinema",
            slug: "camera-cinema",
        },
    },
} as const satisfies Record<DomaineCreditOeuvre, CreditDomainDefinition>;

export const creditDomainOrder = Object.keys(
    creditDomainRegistry,
) as DomaineCreditOeuvre[];

export function getCreditDomainDefinition(domain: string) {
    return domain in creditDomainRegistry
        ? creditDomainRegistry[domain as DomaineCreditOeuvre]
        : undefined;
}
