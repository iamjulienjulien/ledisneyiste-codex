import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFicheHeader } from "@/components/codex/CodexFicheHeader";
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

    const sources = getSourcesByIds(fiche.sources);
    const contributeurs = getContributeursDeLEpoque(slug);
    const personnages = getPersonnagesDeLEpoque(slug);
    const oeuvres = getOeuvresDeLEpoque(slug);

    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:py-20">
            <CodexFicheHeader
                eyebrow="Époque"
                titre={epoque.nom}
                sousTitre={epoque.sousTitre}
                introduction={fiche.introduction}
            />

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-muted">Début</dt>

                    <dd className="mt-1 text-lg text-ink">
                        {formatDateHistorique(fiche.periode.debut)}
                    </dd>
                </div>

                {fiche.periode.fin && (
                    <div>
                        <dt className="text-sm text-muted">Fin</dt>

                        <dd className="mt-1 text-lg text-ink">
                            {formatDateHistorique(fiche.periode.fin)}
                        </dd>
                    </div>
                )}
            </dl>

            {fiche.description && (
                <section className="mt-16 border-t border-line pt-8">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                        La période
                    </p>

                    <h2 className="mt-3 text-3xl text-ink">
                        Comprendre cette époque
                    </h2>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                        {fiche.description}
                    </p>
                </section>
            )}

            <CodexBlocsEditoriaux blocs={fiche.blocsEditoriaux} />

            <CodexRelations
                groupes={[
                    {
                        titre: "Créateurs",
                        references: contributeurs,
                    },
                    {
                        titre: "Personnages",
                        references: personnages,
                    },
                    {
                        titre: "Œuvres",
                        references: oeuvres,
                    },
                ]}
            />
            <CodexSources sources={sources} />
        </main>
    );
}
