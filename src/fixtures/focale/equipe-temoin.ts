export type FocaleEquipeTemoinContribution = Readonly<{
    id: string;
    person: string;
    group: string;
    role: string;
    resolved: boolean;
    provenance: readonly string[];
}>;

export const focaleEquipeTemoin = {
    label: "Équipe témoin indépendante",
    groups: [
        {
            id: "preparation",
            label: "Préparation",
            color: "var(--atelier-animation-ambre-projecteur)",
        },
        {
            id: "fabrication",
            label: "Fabrication",
            color: "var(--atelier-animation-vert-cellulo)",
        },
        {
            id: "finalisation",
            label: "Finalisation",
            color: "var(--atelier-animation-violet-ombre-portee)",
        },
    ],
    contributions: [
        {
            id: "credit:alpha",
            person: "Ariane Exemple",
            group: "preparation",
            role: "coordination de la matière témoin",
            resolved: true,
            provenance: ["source-temoin-a"],
        },
        {
            id: "credit:bruno",
            person: "Bruno Démonstration",
            group: "fabrication",
            role: "fabrication du premier ensemble neutre",
            resolved: true,
            provenance: ["source-temoin-b"],
        },
        {
            id: "credit:camille",
            person: "Camille Cas Limite",
            group: "fabrication",
            role: "responsabilité au libellé volontairement long pour éprouver la restitution sans troncature silencieuse",
            resolved: true,
            provenance: ["source-temoin-b", "source-temoin-c"],
        },
        {
            id: "credit:delta",
            person: "Mention non publiée",
            group: "finalisation",
            role: "vérification témoin conservée sans route",
            resolved: false,
            provenance: ["source-temoin-c"],
        },
        {
            id: "credit:elise",
            person: "Élise Exemple",
            group: "finalisation",
            role: "finalisation de la projection neutre",
            resolved: true,
            provenance: ["source-temoin-d"],
        },
    ] satisfies readonly FocaleEquipeTemoinContribution[],
} as const;
