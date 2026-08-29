import type {
    CodexPlanAngleSlug,
    CodexPlanDefinition,
    CodexPlanObjectiveSlug,
    CodexPlanSlug,
    CodexPlanVocabularyDefinition,
} from "@/types/codex-plans";

export const planAngles = {
    filiation: {
        label: "Filiation",
        description:
            "Suit la manière dont une création en prépare ou en prolonge une autre.",
    },
    adaptation: {
        label: "Adaptation",
        description:
            "Observe le passage d’un récit, d’une forme ou d’un motif vers une nouvelle œuvre.",
    },
    influence: {
        label: "Influence",
        description:
            "Met en regard les traces documentées d’une influence entre plusieurs sujets.",
    },
    reception: {
        label: "Réception",
        description:
            "Observe la manière dont une création est accueillie, distinguée ou réévaluée.",
    },
    transmission: {
        label: "Transmission",
        description:
            "Suit le passage d’un savoir, d’une pratique ou d’un héritage entre plusieurs sujets.",
    },
    people: {
        label: "Personnes",
        description:
            "Situe les créateurs et créatrices qui entourent le Sujet.",
    },
    works: {
        label: "Œuvres",
        description:
            "Situe les œuvres directement ou indirectement reliées au Sujet.",
    },
    characters: {
        label: "Personnages",
        description:
            "Situe les personnages qui prennent part au voisinage documentaire du Sujet.",
    },
    rewards: {
        label: "Récompenses",
        description:
            "Situe les distinctions rattachées au Sujet ou à son voisinage.",
    },
    sources: {
        label: "Sources",
        description:
            "Situe les documents qui permettent d’établir ou d’éclairer les relations visibles.",
    },
    relations: {
        label: "Relations",
        description:
            "Observe le voisinage selon la nature et la direction des liens documentaires.",
    },
    production: {
        label: "Fabrication",
        description:
            "Observe les étapes et périodes qui composent la fabrication d’une œuvre.",
    },
    distribution: {
        label: "Diffusion",
        description:
            "Observe les sorties, reprises et territoires dans lesquels une œuvre circule.",
    },
    legacy: {
        label: "Postérité",
        description:
            "Observe les prolongements et réévaluations qui survivent à la sortie initiale.",
    },
    transformation: {
        label: "Transformations",
        description:
            "Observe les changements de forme, de statut ou de contexte au fil du temps.",
    },
    roles: {
        label: "Métiers",
        description:
            "Regroupe les contributions selon les métiers documentés dans le générique.",
    },
    departments: {
        label: "Départements",
        description:
            "Rassemble les métiers dans des domaines de fabrication explicitement dérivés.",
    },
    responsibilities: {
        label: "Responsabilités",
        description:
            "Distingue les responsabilités documentées de la simple présence au générique.",
    },
    collaborations: {
        label: "Collaborations",
        description:
            "Observe les rapprochements documentés ou les co-présences sans les confondre.",
    },
    recurrences: {
        label: "Récurrences",
        description:
            "Repère les personnes, rôles ou équipes qui réapparaissent dans le Cadre.",
    },
    provenance: {
        label: "Provenance",
        description:
            "Observe l’origine, la nature et le contexte des preuves mobilisées.",
    },
    contradiction: {
        label: "Contradiction",
        description:
            "Rend visibles les désaccords entre les documents sans les réduire à un score.",
    },
    geography: {
        label: "Géographie",
        description:
            "Observe les territoires auxquels une preuve, un événement ou une réception se rapporte.",
    },
    uncertainty: {
        label: "Incertitude",
        description:
            "Montre les limites, absences et degrés de précision que les Archives conservent.",
    },
} as const satisfies Record<CodexPlanAngleSlug, CodexPlanVocabularyDefinition>;

export const planObjectives = {
    follow: {
        label: "Suivre",
        description:
            "Parcourir une suite de jalons sans perdre le fil documentaire.",
    },
    understand: {
        label: "Comprendre",
        description:
            "Rendre intelligible une organisation, une relation ou une temporalité complexe.",
    },
    discover: {
        label: "Découvrir",
        description:
            "Faire apparaître des voisinages ou des prolongements encore peu visibles.",
    },
    situate: {
        label: "Situer",
        description:
            "Placer un Sujet dans un environnement documentaire clairement délimité.",
    },
    compare: {
        label: "Comparer",
        description:
            "Lire plusieurs éléments selon une règle et un Cadre communs.",
    },
    find: {
        label: "Retrouver",
        description:
            "Identifier rapidement une personne, un rôle ou un élément précis.",
    },
    verify: {
        label: "Vérifier",
        description:
            "Remonter d’un récit vers les preuves, leurs accords et leurs limites.",
    },
} as const satisfies Record<
    CodexPlanObjectiveSlug,
    CodexPlanVocabularyDefinition
>;

export const codexPlans = {
    "travelling-documentaire": {
        label: "Travelling documentaire",
        description:
            "Une séquence de jalons et de raccords pour suivre le prolongement d’un Sujet.",
        question: "Par quel chemin le Sujet se prolonge-t-il ?",
        actionLabel: "Suivre",
        textAlternativeLabel: "Parcours ordonné et justifié",
        angles: [
            "filiation",
            "adaptation",
            "influence",
            "reception",
            "transmission",
        ],
        objectives: ["follow", "understand", "discover"],
        frameDescription:
            "Nombre de jalons, destination éventuelle et embranchements admis.",
        matterDescription:
            "Nœuds, relations qualifiées, dates, justifications et preuves disponibles.",
    },
    "plan-d-ensemble": {
        label: "Plan d’ensemble",
        description:
            "Un voisinage documentaire limité qui situe le Sujet dans un réseau intelligible.",
        question: "Quel voisinage documentaire entoure le Sujet ?",
        actionLabel: "Situer",
        textAlternativeLabel: "Liste relationnelle groupée",
        angles: [
            "people",
            "works",
            "characters",
            "rewards",
            "sources",
            "relations",
        ],
        objectives: ["situate", "compare", "discover"],
        frameDescription:
            "Profondeur relationnelle, catégories visibles et seuil de densité.",
        matterDescription:
            "Nœuds typés, liens qualifiés, directions, dates et provenance disponible.",
    },
    "montage-du-temps": {
        label: "Montage du temps",
        description:
            "Des pistes temporelles pour comparer les différents rythmes de vie d’un Sujet.",
        question: "Comment plusieurs temporalités se répondent-elles ?",
        actionLabel: "Comparer",
        textAlternativeLabel: "Chronologie structurée par pistes",
        angles: [
            "production",
            "distribution",
            "reception",
            "legacy",
            "transformation",
        ],
        objectives: ["compare", "understand", "situate"],
        frameDescription:
            "Bornes temporelles, pistes visibles, précision et territoire observé.",
        matterDescription:
            "Événements, périodes, catégories temporelles, territoires et sources.",
    },
    "generique-vivant": {
        label: "Générique vivant",
        description:
            "Une lecture collective des métiers, responsabilités et récurrences d’une production.",
        question: "Comment une production s’organise-t-elle humainement ?",
        actionLabel: "Explorer",
        textAlternativeLabel: "Crédits groupés par métiers",
        angles: [
            "roles",
            "departments",
            "responsibilities",
            "collaborations",
            "recurrences",
        ],
        objectives: ["understand", "find", "compare"],
        frameDescription:
            "Œuvre, département, rôle ou ensemble limité de productions.",
        matterDescription:
            "Contributions, rôles normalisés, regroupements dérivés, personnes et œuvres.",
    },
    "table-lumineuse": {
        label: "Table lumineuse",
        description:
            "Des couches documentaires pour relier le récit aux preuves qui le soutiennent ou le nuancent.",
        question: "Sur quelles preuves le récit repose-t-il ?",
        actionLabel: "Vérifier",
        textAlternativeLabel: "Registre des affirmations et sources",
        angles: [
            "provenance",
            "reception",
            "contradiction",
            "geography",
            "uncertainty",
        ],
        objectives: ["verify", "understand", "compare"],
        frameDescription:
            "Affirmation, chapitre, fiche ou corpus documentaire limité.",
        matterDescription:
            "Sources, rattachements, nature des documents, dates et notes éditoriales.",
    },
} as const satisfies Record<CodexPlanSlug, CodexPlanDefinition>;
