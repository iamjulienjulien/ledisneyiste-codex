import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contributeurs, getContributeurBySlug } from "@/data/catalogues";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import { getSourcesByIds } from "@/data/sources";
import SourcesCodex from "@/components/codex/SourcesCodex";
import { formatDateHistorique } from "@/lib/date";

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

    const sources = getSourcesByIds(fiche.sources);

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Contributeur
                </p>

                <h1 className="mt-4 text-5xl">{contributeur.nom}</h1>

                {contributeur.sousTitre && (
                    <p className="mt-4 text-xl text-ink-soft">
                        {contributeur.sousTitre}
                    </p>
                )}

                {fiche.introduction && (
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
                        {fiche.introduction}
                    </p>
                )}
            </header>

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

            <SourcesCodex sources={sources} />
        </main>
    );
}
