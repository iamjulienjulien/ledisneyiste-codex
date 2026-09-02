import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtelierPlanDossier } from "@/components/atelier/AtelierPlanDossier";
import { AtelierMontageDuTempsPrototype } from "@/components/atelier/AtelierMontageDuTempsPrototype";
import type {
    AtelierMontageDuTempsMatterKey,
    AtelierMontageDuTempsProjection,
} from "@/components/atelier/AtelierMontageDuTempsPrototype";
import { AtelierGeneriqueVivantPrototype } from "@/components/atelier/AtelierGeneriqueVivantPrototype";
import type {
    AtelierGeneriqueVivantMatterKey,
    AtelierGeneriqueVivantProjection,
} from "@/components/atelier/AtelierGeneriqueVivantPrototype";
import { AtelierPlanDEnsemblePrototype } from "@/components/atelier/AtelierPlanDEnsemblePrototype";
import type {
    AtelierPlanDEnsembleDepth,
    AtelierPlanDEnsembleMatterKey,
    AtelierPlanDEnsembleProjection,
} from "@/components/atelier/AtelierPlanDEnsemblePrototype";
import { AtelierTravellingDocumentairePrototype } from "@/components/atelier/AtelierTravellingDocumentairePrototype";
import type {
    AtelierTravellingDepth,
    AtelierTravellingLimit,
    AtelierTravellingMatterKey,
    AtelierTravellingProjection,
} from "@/components/atelier/AtelierTravellingDocumentairePrototype";
import { AtelierTableLumineusePrototype } from "@/components/atelier/AtelierTableLumineusePrototype";
import type {
    AtelierTableLumineuseMatterKey,
    AtelierTableLumineuseProjection,
} from "@/components/atelier/AtelierTableLumineusePrototype";
import { bobinesTemoins } from "@/fixtures/plans";
import {
    codexPlanArchives,
    deriveGeneriqueVivant,
    deriveMontageDuTemps,
    derivePlanDEnsemble,
    deriveTableLumineuse,
    deriveTravellingDocumentaire,
} from "@/lib/plans";
import { getCodexPlan, getCodexPlans, isCodexPlanSlug } from "@/registry/plans";
import type { CodexPlanConfiguration } from "@/types/codex-plans";

type AtelierPlanPageProps = Readonly<{
    params: Promise<{
        slug: string;
    }>;
}>;

export const dynamicParams = false;

const travellingMatterOptions = [
    ["archives", "Archives publiées"],
    ["corpus-vide", "Bobine · Corpus vide"],
    ["corpus-reduit", "Bobine · Corpus réduit"],
    ["corpus-dense", "Bobine · Corpus dense"],
    ["cycles-et-orphelins", "Bobine · Cycles et orphelins"],
] as const satisfies readonly (readonly [AtelierTravellingMatterKey, string])[];

const travellingDepths = [
    1, 2,
] as const satisfies readonly AtelierTravellingDepth[];
const travellingLimits = [
    4, 8,
] as const satisfies readonly AtelierTravellingLimit[];

const ensembleMatterOptions = [
    ["archives", "Archives publiées"],
    ["corpus-vide", "Bobine · Corpus vide"],
    ["corpus-reduit", "Bobine · Corpus réduit"],
    ["corpus-dense", "Bobine · Corpus dense"],
    ["cycles-et-orphelins", "Bobine · Cycles et orphelins"],
] as const satisfies readonly (readonly [
    AtelierPlanDEnsembleMatterKey,
    string,
])[];

const ensembleDepths = [
    1, 2,
] as const satisfies readonly AtelierPlanDEnsembleDepth[];

const montageMatterOptions = [
    ["archives", "Archives publiées"],
    ["corpus-vide", "Bobine · Corpus vide"],
    ["corpus-reduit", "Bobine · Corpus réduit"],
    [
        "dates-partielles-et-contradictoires",
        "Bobine · Dates partielles et contradictoires",
    ],
] as const satisfies readonly (readonly [
    AtelierMontageDuTempsMatterKey,
    string,
])[];

const generiqueMatterOptions = [
    ["archives", "Archives publiées"],
    ["corpus-vide", "Bobine · Corpus vide"],
    ["corpus-reduit", "Bobine · Corpus réduit"],
    ["grand-generique", "Bobine · Grand générique"],
] as const satisfies readonly (readonly [
    AtelierGeneriqueVivantMatterKey,
    string,
])[];

const generiqueVivantTechnical = {
    title: "API du composant",
    description:
        "PlanGeneriqueVivant reçoit un modèle déjà dérivé côté serveur et le contrechamp simple déjà rendu. Il ne lit aucune Archive et n’embarque aucune Régie publique.",
    properties: [
        {
            name: "model",
            type: "CodexGeneriqueVivantModel",
            defaultValue: "—",
            description:
                "Porte les contributions, domaines, statistiques, notices et provenances dérivés du Sujet.",
        },
        {
            name: "simpleCredits",
            type: "ReactNode",
            defaultValue: "—",
            description:
                "Conserve la liste simple comme contrechamp réversible de la projection.",
        },
    ],
    types: [
        {
            name: "PlanGeneriqueVivantVersion",
            values: ['"1.0.0"'],
            description:
                "Grave la première application publique bornée du Plan, sans définir le workflow des autres Plans.",
        },
    ],
} as const;

const tableLumineuseMatterOptions = [
    ["archives", "Archives publiées"],
    ["corpus-vide", "Bobine · Corpus vide"],
    ["corpus-reduit", "Bobine · Corpus réduit"],
    ["preuves-contrastees", "Bobine · Preuves contrastées"],
    [
        "dates-partielles-et-contradictoires",
        "Bobine · Dates partielles et contradictoires",
    ],
    ["accessibilite-sous-contrainte", "Bobine · Accessibilité sous contrainte"],
] as const satisfies readonly (readonly [
    AtelierTableLumineuseMatterKey,
    string,
])[];

function createTravellingProjections() {
    const projections: AtelierTravellingProjection[] = [];

    for (const [matterKey, matterLabel] of travellingMatterOptions) {
        for (const depth of travellingDepths) {
            for (const limit of travellingLimits) {
                const configuration: CodexPlanConfiguration = {
                    plan: "travelling-documentaire",
                    subject: {
                        family: "oeuvres",
                        slug: "snow-white-and-the-seven-dwarfs",
                    },
                    angle: "filiation",
                    objective: "follow",
                    frame: {
                        label: "Des laboratoires au premier long métrage",
                        description:
                            "Suivre les œuvres et la source qui convergent vers Blanche-Neige.",
                        depth,
                        limit,
                    },
                    matter:
                        matterKey === "archives"
                            ? { kind: "archives" }
                            : { kind: "bobine-temoin", fixture: matterKey },
                };
                const model =
                    matterKey === "archives"
                        ? deriveTravellingDocumentaire(configuration, {
                              kind: "archives",
                              archives: codexPlanArchives,
                          })
                        : deriveTravellingDocumentaire(configuration, {
                              kind: "bobine-temoin",
                              archives: codexPlanArchives,
                              bobine: bobinesTemoins[matterKey],
                          });

                projections.push({
                    matterKey,
                    matterLabel,
                    depth,
                    limit,
                    model,
                });
            }
        }
    }

    return projections;
}

function createEnsembleProjections() {
    const projections: AtelierPlanDEnsembleProjection[] = [];

    for (const [matterKey, matterLabel] of ensembleMatterOptions) {
        for (const depth of ensembleDepths) {
            const configuration: CodexPlanConfiguration = {
                plan: "plan-d-ensemble",
                subject: {
                    family: "oeuvres",
                    slug: "snow-white-and-the-seven-dwarfs",
                },
                angle: "relations",
                objective: "situate",
                frame: {
                    label: "Le voisinage documentaire de Blanche-Neige",
                    description:
                        "Situer le premier long métrage dans ses relations publiées.",
                    depth,
                    limit: 24,
                },
                matter:
                    matterKey === "archives"
                        ? { kind: "archives" }
                        : { kind: "bobine-temoin", fixture: matterKey },
            };
            const model =
                matterKey === "archives"
                    ? derivePlanDEnsemble(configuration, {
                          kind: "archives",
                          archives: codexPlanArchives,
                      })
                    : derivePlanDEnsemble(configuration, {
                          kind: "bobine-temoin",
                          archives: codexPlanArchives,
                          bobine: bobinesTemoins[matterKey],
                      });

            projections.push({
                matterKey,
                matterLabel,
                depth,
                model,
            });
        }
    }

    return projections;
}

function createMontageProjections() {
    return montageMatterOptions.map(([matterKey, matterLabel]) => {
        const configuration: CodexPlanConfiguration = {
            plan: "montage-du-temps",
            subject: {
                family: "oeuvres",
                slug: "snow-white-and-the-seven-dwarfs",
            },
            angle: "production",
            objective: "compare",
            frame: {
                label: "De la mise en chantier aux honneurs de l’Academy",
                description:
                    "Comparer fabrication, diffusion et reconnaissance sur une règle temporelle commune.",
            },
            matter:
                matterKey === "archives"
                    ? { kind: "archives" }
                    : { kind: "bobine-temoin", fixture: matterKey },
        };
        const model =
            matterKey === "archives"
                ? deriveMontageDuTemps(configuration, {
                      kind: "archives",
                      archives: codexPlanArchives,
                  })
                : deriveMontageDuTemps(configuration, {
                      kind: "bobine-temoin",
                      archives: codexPlanArchives,
                      bobine: bobinesTemoins[matterKey],
                  });

        return {
            matterKey,
            matterLabel,
            model,
        } satisfies AtelierMontageDuTempsProjection;
    });
}

function createGeneriqueProjections() {
    return generiqueMatterOptions.map(([matterKey, matterLabel]) => {
        const configuration: CodexPlanConfiguration = {
            plan: "generique-vivant",
            subject: {
                family: "oeuvres",
                slug: "pinocchio",
            },
            angle: "departments",
            objective: "understand",
            frame: {
                label: "Le générique humain de Pinocchio",
                description:
                    "Explorer les 31 contributions documentées sans leur attribuer de hiérarchie ni de valeur.",
            },
            matter:
                matterKey === "archives"
                    ? { kind: "archives" }
                    : { kind: "bobine-temoin", fixture: matterKey },
        };
        const model =
            matterKey === "archives"
                ? deriveGeneriqueVivant(configuration, {
                      kind: "archives",
                      archives: codexPlanArchives,
                  })
                : deriveGeneriqueVivant(configuration, {
                      kind: "bobine-temoin",
                      archives: codexPlanArchives,
                      bobine: bobinesTemoins[matterKey],
                  });

        return {
            matterKey,
            matterLabel,
            model,
        } satisfies AtelierGeneriqueVivantProjection;
    });
}

function createTableLumineuseProjections() {
    return tableLumineuseMatterOptions.map(([matterKey, matterLabel]) => {
        const configuration: CodexPlanConfiguration = {
            plan: "table-lumineuse",
            subject: {
                family: "oeuvres",
                slug: "snow-white-and-the-seven-dwarfs",
            },
            angle: "provenance",
            objective: "verify",
            frame: {
                label: "Les preuves documentaires de Blanche-Neige",
                description:
                    "Vérifier les affirmations, leurs sources et leurs incertitudes sans fabriquer de score.",
            },
            matter:
                matterKey === "archives"
                    ? { kind: "archives" }
                    : { kind: "bobine-temoin", fixture: matterKey },
        };
        const model =
            matterKey === "archives"
                ? deriveTableLumineuse(configuration, {
                      kind: "archives",
                      archives: codexPlanArchives,
                  })
                : deriveTableLumineuse(configuration, {
                      kind: "bobine-temoin",
                      archives: codexPlanArchives,
                      bobine: bobinesTemoins[matterKey],
                  });

        return {
            matterKey,
            matterLabel,
            model,
        } satisfies AtelierTableLumineuseProjection;
    });
}

export function generateStaticParams() {
    return getCodexPlans().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: AtelierPlanPageProps): Promise<Metadata> {
    const { slug } = await params;

    if (!isCodexPlanSlug(slug)) {
        return {};
    }

    const plan = getCodexPlan(slug);

    return {
        title: `${plan.label} · Les Plans · L’Atelier`,
        description: plan.description,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function AtelierPlanPage({
    params,
}: AtelierPlanPageProps) {
    const { slug } = await params;

    if (!isCodexPlanSlug(slug)) {
        notFound();
    }

    const plan = getCodexPlan(slug);

    if (slug === "travelling-documentaire") {
        return (
            <AtelierPlanDossier
                slug={slug}
                plan={plan}
                status="Esquisse"
                program="P0 · Premier prototype"
                version="v0.1.0"
                prototypeTitle="Blanche-Neige révèle le premier Travelling"
                prototypeDescription="Le prototype suit une source et deux laboratoires jusqu’au premier long métrage, puis éprouve la même forme sur quatre Bobines témoins prioritaires."
                prototype={
                    <AtelierTravellingDocumentairePrototype
                        projections={createTravellingProjections()}
                    />
                }
            />
        );
    }

    if (slug === "plan-d-ensemble") {
        return (
            <AtelierPlanDossier
                slug={slug}
                plan={plan}
                status="Esquisse"
                program="P0 · Deuxième prototype"
                version="v0.1.0"
                prototypeTitle="Blanche-Neige révèle son voisinage documentaire"
                prototypeDescription="Le prototype maintient le Sujet au centre, répartit ses voisins par familles et éprouve la direction, la profondeur, la densité et les limites du Cadre."
                prototype={
                    <AtelierPlanDEnsemblePrototype
                        projections={createEnsembleProjections()}
                    />
                }
            />
        );
    }

    if (slug === "montage-du-temps") {
        return (
            <AtelierPlanDossier
                slug={slug}
                plan={plan}
                status="Esquisse"
                program="P0 · Troisième prototype"
                version="v0.1.0"
                prototypeTitle="Blanche-Neige fait apparaître plusieurs temps sur une même bobine"
                prototypeDescription="Le prototype compare la fabrication, la diffusion et la reconnaissance sur une règle commune, tout en conservant la précision réelle, les territoires, les preuves et les contradictions éventuelles."
                prototype={
                    <AtelierMontageDuTempsPrototype
                        projections={createMontageProjections()}
                    />
                }
            />
        );
    }

    if (slug === "generique-vivant") {
        return (
            <AtelierPlanDossier
                slug={slug}
                plan={plan}
                status="Prêt à projeter"
                program="Acte VI · Phase 8"
                version="v1.0.0"
                prototypeTitle="Pinocchio révèle les gestes humains derrière l’écran"
                prototypeDescription="Le prototype éprouve les 31 contributions documentées de Pinocchio, leurs huit domaines et la mention non publiée d’Evelyn Venable, tout en conservant les Bobines témoins pour les états limites."
                technical={generiqueVivantTechnical}
                prototype={
                    <AtelierGeneriqueVivantPrototype
                        projections={createGeneriqueProjections()}
                    />
                }
            />
        );
    }

    if (slug === "table-lumineuse") {
        return (
            <AtelierPlanDossier
                slug={slug}
                plan={plan}
                status="Esquisse"
                program="P0 · Cinquième prototype"
                version="v0.1.0"
                prototypeTitle="Blanche-Neige place ses preuves sous la lumière"
                prototypeDescription="Le prototype transforme les affirmations documentées en registre inspectable, préserve les classifications absentes et éprouve une Bobine de preuves réellement contrastées."
                prototype={
                    <AtelierTableLumineusePrototype
                        projections={createTableLumineuseProjections()}
                    />
                }
            />
        );
    }

    return <AtelierPlanDossier slug={slug} plan={plan} />;
}
