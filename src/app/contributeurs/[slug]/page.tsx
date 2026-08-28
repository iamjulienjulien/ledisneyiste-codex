import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contributeurs, getContributeurBySlug } from "@/data/catalogues";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import { getSourcesByIds } from "@/data/sources";
import {
    getOeuvresContribueesParContributeur,
    getPersonnagesCreesParContributeur,
} from "@/data/relations";
import { CodexFiche } from "@/components/codex/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFicheHeader";
import { CodexSources } from "@/components/codex/CodexSources";
import { CodexRelations } from "@/components/codex/CodexRelations";
import { CodexBlocsEditoriaux } from "@/components/codex/CodexBlocsEditoriaux";
import { CodexRecompenses } from "@/components/codex/CodexRecompenses";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquesPourContributeur } from "@/data/epoques/relations";
import { getRecompensesPourContributeur } from "@/data/recompenses/relations";

import { formatDateHistorique } from "@/lib/date";
import { getFicheSourceIds } from "@/lib/source";

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const contributeur = getContributeurBySlug(slug);

    if (!contributeur) {
        return {};
    }

    return {
        title: contributeur.nom,
        description:
            contributeur.sousTitre ||
            `Découvrir ${contributeur.nom} dans Le Codex du Disneyiste.`,
    };
}

export function generateStaticParams() {
    return contributeurs.map((contributeur) => ({
        slug: contributeur.slug,
    }));
}

export default async function ContributeurPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const contributeur = getContributeurBySlug(slug);
    const fiche = getFicheContributeurBySlug(slug);

    if (!contributeur || !fiche) {
        notFound();
    }

    const recompenses = getRecompensesPourContributeur(slug);
    const sources = getSourcesByIds([
        ...new Set([
            ...getFicheSourceIds(fiche),
            ...recompenses.flatMap((recompense) => recompense.sources),
        ]),
    ]);
    const epoques = getEpoquesPourContributeur(slug);

    const personnagesCrees = getPersonnagesCreesParContributeur(slug);

    const oeuvresContribuees = getOeuvresContribueesParContributeur(slug);

    return (
        <CodexFiche family="createurs">
            <CodexFicheHeader
                family="createurs"
                eyebrow="Créateur"
                titre={contributeur.nom}
                sousTitre={contributeur.sousTitre}
                introduction={fiche.introduction}
                badges={
                    <ul
                        aria-label="Métadonnées du créateur"
                        className="flex flex-wrap gap-2"
                    >
                        {contributeur.metadata.categories.map((category) => (
                            <li key={category}>
                                <PixieBadge
                                    registry="contributeurs"
                                    collection="categories"
                                    slug={category}
                                    size="sm"
                                    shape="pill"
                                />
                            </li>
                        ))}
                    </ul>
                }
            />

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-muted">Naissance</dt>
                    <dd className="mt-1 text-lg">
                        {formatDateHistorique(fiche.naissance.date)}
                        {fiche.naissance.lieu && ` · ${fiche.naissance.lieu}`}
                    </dd>
                </div>

                {fiche.deces && (
                    <div>
                        <dt className="text-sm text-muted">Décès</dt>
                        <dd className="mt-1 text-lg">
                            {formatDateHistorique(fiche.deces.date)}
                            {fiche.deces.lieu && ` · ${fiche.deces.lieu}`}
                        </dd>
                    </div>
                )}

                <div className="sm:col-span-2">
                    <dt className="text-sm text-muted">Rôles</dt>
                    <dd className="mt-1 text-lg">{fiche.roles.join(", ")}</dd>
                </div>
            </dl>

            <CodexBlocsEditoriaux
                collection="contributeurs"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
            />

            <CodexRecompenses recompenses={recompenses} showWork />

            <CodexRelations
                groupes={[
                    {
                        family: "epoques",
                        titre: "Époques",
                        references: epoques,
                    },
                    {
                        family: "personnages",
                        titre: "Personnages",
                        references: personnagesCrees,
                    },
                    {
                        family: "oeuvres",
                        titre: "Œuvres",
                        references: oeuvresContribuees,
                    },
                ]}
            />

            <CodexSources sources={sources} />
        </CodexFiche>
    );
}
