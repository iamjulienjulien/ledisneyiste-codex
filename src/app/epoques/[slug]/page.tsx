import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFiche } from "@/components/codex/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFicheHeader";
import { CodexFicheReperes } from "@/components/codex/CodexFicheReperes";
import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import { CodexSources } from "@/components/codex/CodexSources";
import { CodexRelations } from "@/components/codex/CodexRelations";
import { CodexBlocsEditoriaux } from "@/components/codex/CodexBlocsEditoriaux";
import {
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { epoques, getEpoqueBySlug } from "@/data/catalogues";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";
import { getFicheSourceIds } from "@/lib/source";
import { getContributeursDeLEpoque } from "@/data/epoques/relations";

export const dynamicParams = false;

export function generateStaticParams() {
    return epoques.map((epoque) => ({
        slug: epoque.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const epoque = getEpoqueBySlug(slug);

    if (!epoque) {
        return {};
    }

    return {
        title: epoque.nom,
        description:
            epoque.sousTitre ||
            `Découvrir ${epoque.nom} dans Le Codex du Disneyiste.`,
    };
}

export default async function EpoquePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const epoque = getEpoqueBySlug(slug);
    const fiche = getFicheEpoqueBySlug(slug);

    if (!epoque || !fiche) {
        notFound();
    }

    const sources = getSourcesByIds(getFicheSourceIds(fiche));
    const contributeurs = getContributeursDeLEpoque(slug);
    const personnages = getPersonnagesDeLEpoque(slug);
    const oeuvres = getOeuvresDeLEpoque(slug);

    return (
        <CodexFiche family="epoques">
            <CodexFicheHeader
                family="epoques"
                eyebrow="Époque"
                titre={epoque.nom}
                sousTitre={epoque.sousTitre}
                introduction={fiche.introduction}
            />

            <CodexFicheReperes
                reperes={[
                    {
                        label: "Début",
                        value: formatDateHistorique(fiche.periode.debut),
                    },
                    ...(fiche.periode.fin
                        ? [
                              {
                                  label: "Fin",
                                  value: formatDateHistorique(
                                      fiche.periode.fin,
                                  ),
                              },
                          ]
                        : []),
                ]}
            />

            {fiche.description && (
                <CodexFicheSection
                    eyebrow="La période"
                    titre="Comprendre cette époque"
                >
                    <p className="max-w-2xl text-lg leading-8 text-ink-soft">
                        {fiche.description}
                    </p>
                </CodexFicheSection>
            )}

            <CodexBlocsEditoriaux
                collection="epoques"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
            />

            <CodexRelations
                groupes={[
                    {
                        family: "createurs",
                        titre: "Créateurs",
                        references: contributeurs,
                    },
                    {
                        family: "personnages",
                        titre: "Personnages",
                        references: personnages,
                    },
                    {
                        family: "oeuvres",
                        titre: "Œuvres",
                        references: oeuvres,
                    },
                ]}
            />
            <CodexSources sources={sources} />
        </CodexFiche>
    );
}
