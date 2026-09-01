import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFiche } from "@/components/codex/CodexFiche/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFiche/CodexFicheHeader";
import { CodexFicheReperes } from "@/components/codex/CodexFiche/CodexFicheReperes";
import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { CodexFicheSources } from "@/components/codex/CodexFiche/CodexFicheSources";
import { CodexFicheRelations } from "@/components/codex/CodexFiche/CodexFicheRelations";
import { CodexFicheBlocsEditoriaux } from "@/components/codex/CodexFiche/CodexFicheBlocsEditoriaux";
import {
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { epoques, getEpoqueBySlug } from "@/data/catalogues";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
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
    const identite = resoudreIdentiteCodex("epoques", slug);

    if (!epoque || !fiche || !identite) {
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
                identite={identite}
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

            <CodexFicheBlocsEditoriaux
                collection="epoques"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
            />

            <CodexFicheRelations
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
            <CodexFicheSources sources={sources} />
        </CodexFiche>
    );
}
