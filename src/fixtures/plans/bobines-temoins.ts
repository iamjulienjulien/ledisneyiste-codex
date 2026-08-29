import type {
    CodexPlanBobineTemoin,
    CodexPlanBobineTemoinSlug,
    CodexPlanCredit,
    CodexPlanEntityKind,
    CodexPlanEntityReference,
    CodexPlanEvent,
    CodexPlanEvidence,
    CodexPlanEvidencePosition,
    CodexPlanLink,
    CodexPlanNode,
    CodexPlanProvenance,
    CodexPlanSlug,
    CodexPlanSourceClassification,
} from "@/types/codex-plans";

const ALL_PLANS: readonly CodexPlanSlug[] = [
    "travelling-documentaire",
    "plan-d-ensemble",
    "montage-du-temps",
    "generique-vivant",
    "table-lumineuse",
];

function provenance(explanation: string): readonly CodexPlanProvenance[] {
    return [
        {
            kind: "bobine-temoin",
            explanation,
        },
    ];
}

function reference(
    kind: CodexPlanEntityKind,
    slug: string,
    label: string,
    resolved = true,
): CodexPlanEntityReference {
    return {
        id: `${kind}:${slug}`,
        kind,
        label,
        slug,
        resolved,
    };
}

function node(
    kind: CodexPlanEntityKind,
    slug: string,
    label: string,
    metadata: CodexPlanNode["metadata"] = {},
): CodexPlanNode {
    return {
        ...reference(kind, slug, label),
        publishedSubject: false,
        metadata,
        provenance: provenance(
            "Nœud synthétique réservé aux essais de la Bobine témoin.",
        ),
    };
}

function link(
    id: string,
    from: CodexPlanEntityReference,
    to: CodexPlanEntityReference,
    label = "Raccord témoin",
): CodexPlanLink {
    return {
        id: `work-relation:${id}`,
        kind: "work-relation",
        label,
        from,
        to,
        direction: "directed",
        provenance: provenance(
            "Relation synthétique réservée aux essais de la Bobine témoin.",
        ),
    };
}

function evidence(
    id: string,
    owner: CodexPlanEntityReference,
    label: string,
    position: CodexPlanEvidencePosition,
    source: CodexPlanEntityReference | undefined,
    sourceClassification: CodexPlanSourceClassification,
): CodexPlanEvidence {
    return {
        id: `evidence:${id}`,
        owner,
        scope: "editorial-block",
        label,
        sourceIds: source?.slug ? [source.slug] : [],
        sources: source ? [source] : [],
        unresolvedSourceIds: [],
        status: source ? "documented" : "undocumented",
        position,
        sourceClassification,
        provenance: provenance(
            "Preuve synthétique réservée aux essais de la Bobine témoin.",
        ),
    };
}

function bobine(
    definition: Omit<CodexPlanBobineTemoin, "matter">,
): CodexPlanBobineTemoin {
    return {
        ...definition,
        matter: {
            kind: "bobine-temoin",
            fixture: definition.slug,
        },
    };
}

const reducedWork = reference(
    "oeuvre",
    "oeuvre-reduite",
    "Œuvre témoin au corpus volontairement réduit",
);
const reducedContributor = reference(
    "contributeur",
    "contributeur-reduit",
    "Créatrice témoin",
);
const reducedSource = reference(
    "source",
    "source-reduite",
    "Document témoin unique",
);

const reducedNodes: readonly CodexPlanNode[] = [
    node(reducedWork.kind, reducedWork.slug ?? "", reducedWork.label),
    node(
        reducedContributor.kind,
        reducedContributor.slug ?? "",
        reducedContributor.label,
    ),
    node(reducedSource.kind, reducedSource.slug ?? "", reducedSource.label, {
        classification: "secondary",
    }),
];

const denseWork = reference(
    "oeuvre",
    "oeuvre-dense",
    "Œuvre témoin au voisinage dense",
);
const denseCharacters = Array.from({ length: 120 }, (_, index) =>
    reference(
        "personnage",
        `personnage-dense-${index + 1}`,
        `Personnage témoin ${String(index + 1).padStart(3, "0")}`,
    ),
);
const denseNodes: readonly CodexPlanNode[] = [
    node(denseWork.kind, denseWork.slug ?? "", denseWork.label),
    ...denseCharacters.map((character) =>
        node(character.kind, character.slug ?? "", character.label),
    ),
];
const denseLinks: readonly CodexPlanLink[] = denseCharacters.flatMap(
    (character, index) => [
        link(`dense:${index}:aller`, denseWork, character, "Met en scène"),
        link(`dense:${index}:retour`, character, denseWork, "Revient vers"),
    ],
);

const cycleA = reference("oeuvre", "cycle-a", "Jalon témoin A");
const cycleB = reference("oeuvre", "cycle-b", "Jalon témoin B");
const cycleC = reference("oeuvre", "cycle-c", "Jalon témoin C");
const orphan = reference(
    "personnage",
    "noeud-orphelin",
    "Nœud témoin volontairement orphelin",
);

const datedWork = reference(
    "oeuvre",
    "oeuvre-dates-incertaines",
    "Œuvre témoin aux dates incertaines",
);
const datedEvents: readonly CodexPlanEvent[] = [
    {
        id: "work-release:date-partielle-annee",
        kind: "work-release",
        label: "Sortie documentée à l’année seulement",
        subject: datedWork,
        start: { valeur: "1937", precision: "annee" },
        provenance: provenance(
            "Date partielle synthétique réservée à la Bobine témoin.",
        ),
    },
    {
        id: "work-release:date-contradictoire-a",
        kind: "release-event",
        label: "Première datation contradictoire",
        subject: datedWork,
        start: { valeur: "1937-12", precision: "mois" },
        provenance: provenance(
            "Première datation synthétique d’un désaccord volontaire.",
        ),
    },
    {
        id: "work-release:date-contradictoire-b",
        kind: "release-event",
        label: "Seconde datation contradictoire",
        subject: datedWork,
        start: { valeur: "1938-01-04", precision: "jour" },
        provenance: provenance(
            "Seconde datation synthétique d’un désaccord volontaire.",
        ),
    },
];

const creditsWork = reference(
    "oeuvre",
    "oeuvre-grand-generique",
    "Œuvre témoin au générique démesuré",
);
const creditsContributors = Array.from({ length: 240 }, (_, index) =>
    reference(
        "contributeur",
        `contributeur-generique-${index + 1}`,
        index === 0
            ? "Créatrice témoin au nom volontairement et exceptionnellement long pour éprouver les retours à la ligne, les libellés accessibles et les surfaces les plus étroites"
            : `Collaborateur témoin ${String(index + 1).padStart(3, "0")}`,
    ),
);
const largeCreditRoles = Array.from({ length: 18 }, (_, index) =>
    index === 0
        ? "responsabilité synthétique au libellé volontairement très long afin d’éprouver la recherche, le regroupement et la restitution textuelle sans troncature silencieuse"
        : `rôle témoin ${String(index + 1).padStart(2, "0")}`,
);
const largeCredits: readonly CodexPlanCredit[] = creditsContributors.map(
    (contributor, index) => ({
        id: `credit:grand-generique:${index + 1}`,
        work: creditsWork,
        contributor,
        roles: [largeCreditRoles[index % largeCreditRoles.length]],
        domain: `departement-temoin-${(index % 9) + 1}`,
        provenance: provenance(
            "Crédit synthétique réservé aux essais de densité de la Bobine témoin.",
        ),
    }),
);

const evidenceOwner = reference(
    "oeuvre",
    "oeuvre-preuves-contrastees",
    "Œuvre témoin aux preuves contrastées",
);
const evidenceSources = [
    reference("source", "source-primaire-a", "Document primaire témoin A"),
    reference("source", "source-secondaire-b", "Étude secondaire témoin B"),
    reference("source", "source-base-c", "Base documentaire témoin C"),
    reference(
        "source",
        "source-interpretation-d",
        "Interprétation éditoriale témoin D",
    ),
] as const;
const contrastedEvidence: readonly CodexPlanEvidence[] = [
    evidence(
        "convergence-a",
        evidenceOwner,
        "La première couche soutient l’affirmation témoin",
        "supports",
        evidenceSources[0],
        "primary",
    ),
    evidence(
        "convergence-b",
        evidenceOwner,
        "La seconde couche converge avec la première",
        "supports",
        evidenceSources[1],
        "secondary",
    ),
    evidence(
        "nuance",
        evidenceOwner,
        "Une troisième couche nuance la portée de l’affirmation",
        "nuances",
        evidenceSources[2],
        "database",
    ),
    evidence(
        "contradiction",
        evidenceOwner,
        "Une quatrième couche contredit explicitement le raccord proposé",
        "contradicts",
        evidenceSources[3],
        "editorial-interpretation",
    ),
    evidence(
        "absence",
        evidenceOwner,
        "Aucune preuve ne permet de conclure sur cette affirmation témoin",
        "inconclusive",
        undefined,
        "unclassified",
    ),
];

const accessibilityNodes = Array.from({ length: 24 }, (_, index) =>
    reference(
        index % 2 === 0 ? "personnage" : "contributeur",
        `accessibilite-${index + 1}`,
        `Élément focalisable ${index + 1} — ${"libellé étendu ".repeat((index % 4) + 1).trim()}`,
    ),
);

export const bobinesTemoins = {
    "corpus-vide": bobine({
        slug: "corpus-vide",
        label: "Corpus vide",
        description:
            "Éprouve un Plan lorsqu’aucune matière ne répond au Cadre courant.",
        plans: ALL_PLANS,
        runtimeState: "empty",
        stresses: ["empty-corpus", "keyboard", "small-screen"],
        nodes: [],
        links: [],
        events: [],
        credits: [],
        evidence: [],
    }),
    "corpus-reduit": bobine({
        slug: "corpus-reduit",
        label: "Corpus réduit",
        description:
            "Éprouve la lisibilité d’un résultat unique ou presque sans surjouer sa densité.",
        plans: ALL_PLANS,
        runtimeState: "sparse",
        stresses: ["reduced-corpus", "keyboard", "small-screen"],
        nodes: reducedNodes,
        links: [link("reduit", reducedContributor, reducedWork, "Contribue à")],
        events: [
            {
                id: "work-release:oeuvre-reduite",
                kind: "work-release",
                label: "Sortie de l’œuvre témoin réduite",
                subject: reducedWork,
                start: { valeur: "1937", precision: "annee" },
                provenance: provenance(
                    "Événement synthétique réservé à la Bobine témoin.",
                ),
            },
        ],
        credits: [
            {
                id: "credit:oeuvre-reduite:contributeur-reduit",
                work: reducedWork,
                contributor: reducedContributor,
                roles: ["création témoin"],
                domain: "fabrication-temoin",
                provenance: provenance(
                    "Crédit synthétique réservé à la Bobine témoin.",
                ),
            },
        ],
        evidence: [
            evidence(
                "reduite",
                reducedWork,
                "Une seule source soutient le repère témoin",
                "supports",
                reducedSource,
                "secondary",
            ),
        ],
    }),
    "corpus-dense": bobine({
        slug: "corpus-dense",
        label: "Corpus dense",
        description:
            "Mesure la hiérarchie, les filtres et les calculs sur un voisinage volontairement encombré.",
        plans: ["plan-d-ensemble", "travelling-documentaire"],
        runtimeState: "dense",
        stresses: ["dense-corpus", "performance", "keyboard"],
        nodes: denseNodes,
        links: denseLinks,
        events: [],
        credits: [],
        evidence: [],
    }),
    "cycles-et-orphelins": bobine({
        slug: "cycles-et-orphelins",
        label: "Cycles et nœuds orphelins",
        description:
            "Vérifie qu’un parcours ne fabrique pas une causalité linéaire et qu’un nœud isolé reste explicable.",
        plans: ["travelling-documentaire", "plan-d-ensemble"],
        runtimeState: "incomplete",
        stresses: ["relational-cycle", "orphan-node", "keyboard"],
        nodes: [
            node(cycleA.kind, cycleA.slug ?? "", cycleA.label),
            node(cycleB.kind, cycleB.slug ?? "", cycleB.label),
            node(cycleC.kind, cycleC.slug ?? "", cycleC.label),
            node(orphan.kind, orphan.slug ?? "", orphan.label),
        ],
        links: [
            link("cycle:a-b", cycleA, cycleB),
            link("cycle:b-c", cycleB, cycleC),
            link("cycle:c-a", cycleC, cycleA),
        ],
        events: [],
        credits: [],
        evidence: [],
    }),
    "dates-partielles-et-contradictoires": bobine({
        slug: "dates-partielles-et-contradictoires",
        label: "Dates partielles et contradictoires",
        description:
            "Confronte le montage temporel à plusieurs précisions et à un désaccord qu’il ne doit pas résoudre seul.",
        plans: ["montage-du-temps", "table-lumineuse"],
        runtimeState: "incomplete",
        stresses: ["partial-date", "contradictory-date", "small-screen"],
        nodes: [node(datedWork.kind, datedWork.slug ?? "", datedWork.label)],
        links: [],
        events: datedEvents,
        credits: [],
        evidence: [],
    }),
    "grand-generique": bobine({
        slug: "grand-generique",
        label: "Très grand générique",
        description:
            "Éprouve recherche, regroupements, libellés extrêmes et navigation dans une équipe synthétique massive.",
        plans: ["generique-vivant"],
        runtimeState: "dense",
        stresses: [
            "large-credits",
            "long-label",
            "keyboard",
            "small-screen",
            "performance",
        ],
        nodes: [
            node(creditsWork.kind, creditsWork.slug ?? "", creditsWork.label),
            ...creditsContributors.map((contributor) =>
                node(
                    contributor.kind,
                    contributor.slug ?? "",
                    contributor.label,
                ),
            ),
        ],
        links: [],
        events: [],
        credits: largeCredits,
        evidence: [],
    }),
    "preuves-contrastees": bobine({
        slug: "preuves-contrastees",
        label: "Preuves contrastées",
        description:
            "Met côte à côte convergence, nuance, contradiction et absence sans calculer un score de vérité.",
        plans: ["table-lumineuse"],
        runtimeState: "incomplete",
        stresses: [
            "convergent-evidence",
            "divergent-evidence",
            "missing-evidence",
            "keyboard",
        ],
        nodes: [
            node(
                evidenceOwner.kind,
                evidenceOwner.slug ?? "",
                evidenceOwner.label,
            ),
            ...evidenceSources.map((source, index) =>
                node(source.kind, source.slug ?? "", source.label, {
                    classification: [
                        "primary",
                        "secondary",
                        "database",
                        "editorial-interpretation",
                    ][index],
                }),
            ),
        ],
        links: [],
        events: [],
        credits: [],
        evidence: contrastedEvidence,
    }),
    "accessibilite-sous-contrainte": bobine({
        slug: "accessibilite-sous-contrainte",
        label: "Accessibilité sous contrainte",
        description:
            "Fournit un ordre de lecture long, des libellés expansifs et assez de cibles pour éprouver clavier et petit écran sans animation obligatoire.",
        plans: ALL_PLANS,
        runtimeState: "ready",
        stresses: ["long-label", "keyboard", "reduced-motion", "small-screen"],
        nodes: accessibilityNodes.map((item) =>
            node(item.kind, item.slug ?? "", item.label),
        ),
        links: accessibilityNodes
            .slice(1)
            .map((item, index) =>
                link(
                    `accessibilite:${index}`,
                    accessibilityNodes[index],
                    item,
                    "Étape suivante dans l’ordre de lecture témoin",
                ),
            ),
        events: [],
        credits: [],
        evidence: [],
    }),
} as const satisfies Record<CodexPlanBobineTemoinSlug, CodexPlanBobineTemoin>;
