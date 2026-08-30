import type { SymbolDefinition } from "@/types/symbols";

const accents = {
    personnages: "var(--atelier-famille-personnages)",
    createurs: "var(--atelier-famille-createurs)",
    oeuvres: "var(--atelier-famille-oeuvres)",
    epoques: "var(--atelier-famille-epoques)",
    chansons: "var(--atelier-animation-rose-aerographe)",
} as const;

export const symbolsIndex = {
    personnages: {
        principal: {
            src: "/symbols/index/personnages/principal.png",
            label: "Personnages",
            accent: accents.personnages,
        },
        genese: {
            src: "/symbols/index/personnages/genese.png",
            label: "Genèse",
            accent: accents.personnages,
        },
        apparence: {
            src: "/symbols/index/personnages/apparence.png",
            label: "Apparence",
            accent: accents.personnages,
        },
        caractere: {
            src: "/symbols/index/personnages/caractere.png",
            label: "Caractère",
            accent: accents.personnages,
        },
        gestuelle: {
            src: "/symbols/index/personnages/gestuelle.png",
            label: "Gestuelle",
            accent: accents.personnages,
        },
        voix: {
            src: "/symbols/index/personnages/voix.png",
            label: "Voix",
            accent: accents.personnages,
        },
        relations: {
            src: "/symbols/index/personnages/relations.png",
            label: "Relations",
            accent: accents.personnages,
        },
        trajectoire: {
            src: "/symbols/index/personnages/trajectoire.png",
            label: "Trajectoire",
            accent: accents.personnages,
        },
        heritage: {
            src: "/symbols/index/personnages/heritage.png",
            label: "Héritage",
            accent: accents.personnages,
        },
    },
    oeuvres: {
        principal: {
            src: "/symbols/index/oeuvres/principal.png",
            label: "Œuvres",
            accent: accents.oeuvres,
        },
        genese: {
            src: "/symbols/index/oeuvres/genese.png",
            label: "Genèse",
            accent: accents.oeuvres,
        },
        fabrication: {
            src: "/symbols/index/oeuvres/fabrication.png",
            label: "Fabrication",
            accent: accents.oeuvres,
        },
        repere: {
            src: "/symbols/index/oeuvres/repere.png",
            label: "Repère",
            accent: accents.oeuvres,
        },
        langage: {
            src: "/symbols/index/oeuvres/langage.png",
            label: "Langage",
            accent: accents.oeuvres,
        },
        relations: {
            src: "/symbols/index/oeuvres/relations.png",
            label: "Relations",
            accent: accents.oeuvres,
        },
        diffusion: {
            src: "/symbols/index/oeuvres/diffusion.png",
            label: "Diffusion",
            accent: accents.oeuvres,
        },
        reception: {
            src: "/symbols/index/oeuvres/reception.png",
            label: "Réception",
            accent: accents.oeuvres,
        },
        heritage: {
            src: "/symbols/index/oeuvres/heritage.png",
            label: "Héritage",
            accent: accents.oeuvres,
        },
    },
    createurs: {
        principal: {
            src: "/symbols/index/createurs/principal.png",
            label: "Créateurs",
            accent: accents.createurs,
        },
        origines: {
            src: "/symbols/index/createurs/origines.png",
            label: "Origines",
            accent: accents.createurs,
        },
        formation: {
            src: "/symbols/index/createurs/formation.png",
            label: "Formation",
            accent: accents.createurs,
        },
        debuts: {
            src: "/symbols/index/createurs/debuts.png",
            label: "Débuts",
            accent: accents.createurs,
        },
        pratique: {
            src: "/symbols/index/createurs/pratique.png",
            label: "Pratique",
            accent: accents.createurs,
        },
        signature: {
            src: "/symbols/index/createurs/signature.png",
            label: "Signature",
            accent: accents.createurs,
        },
        collaborations: {
            src: "/symbols/index/createurs/collaborations.png",
            label: "Collaborations",
            accent: accents.createurs,
        },
        trajectoire: {
            src: "/symbols/index/createurs/trajectoire.png",
            label: "Trajectoire",
            accent: accents.createurs,
        },
        transmission: {
            src: "/symbols/index/createurs/transmission.png",
            label: "Transmission",
            accent: accents.createurs,
        },
    },
    epoques: {
        principal: {
            src: "/symbols/index/epoques/principal.png",
            label: "Époques",
            accent: accents.epoques,
        },
        fondations: {
            src: "/symbols/index/epoques/fondations.png",
            label: "Fondations",
            accent: accents.epoques,
        },
        transitions: {
            src: "/symbols/index/epoques/transitions.png",
            label: "Transitions",
            accent: accents.epoques,
        },
        mutations: {
            src: "/symbols/index/epoques/mutations.png",
            label: "Mutations",
            accent: accents.epoques,
        },
        tensions: {
            src: "/symbols/index/epoques/tensions.png",
            label: "Tensions",
            accent: accents.epoques,
        },
        ruptures: {
            src: "/symbols/index/epoques/ruptures.png",
            label: "Ruptures",
            accent: accents.epoques,
        },
        innovations: {
            src: "/symbols/index/epoques/innovations.png",
            label: "Innovations",
            accent: accents.epoques,
        },
        reperes: {
            src: "/symbols/index/epoques/reperes.png",
            label: "Repères",
            accent: accents.epoques,
        },
        heritage: {
            src: "/symbols/index/epoques/heritage.png",
            label: "Héritage",
            accent: accents.epoques,
        },
    },
    chansons: {
        principal: {
            src: "/symbols/index/chansons/principal.png",
            label: "Chansons",
            accent: accents.chansons,
        },
        genese: {
            src: "/symbols/index/chansons/genese.png",
            label: "Genèse",
            accent: accents.chansons,
        },
        paroles: {
            src: "/symbols/index/chansons/paroles.png",
            label: "Paroles",
            accent: accents.chansons,
        },
        melodie: {
            src: "/symbols/index/chansons/melodie.png",
            label: "Mélodie",
            accent: accents.chansons,
        },
        arrangement: {
            src: "/symbols/index/chansons/arrangement.png",
            label: "Arrangement",
            accent: accents.chansons,
        },
        interpretation: {
            src: "/symbols/index/chansons/interpretation.png",
            label: "Interprétation",
            accent: accents.chansons,
        },
        "fonction-narrative": {
            src: "/symbols/index/chansons/fonction-narrative.png",
            label: "Fonction narrative",
            accent: accents.chansons,
        },
        reprises: {
            src: "/symbols/index/chansons/reprises.png",
            label: "Reprises",
            accent: accents.chansons,
        },
        heritage: {
            src: "/symbols/index/chansons/heritage.png",
            label: "Héritage",
            accent: accents.chansons,
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
