import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtelierPlanDossier } from "@/components/atelier/AtelierPlanDossier";
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
import { bobinesTemoins } from "@/fixtures/plans";
import {
    codexPlanArchives,
    derivePlanDEnsemble,
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

    return <AtelierPlanDossier slug={slug} plan={plan} />;
}
