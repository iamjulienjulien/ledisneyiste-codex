import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceCodexLink from "@/components/codex/ReferenceCodexLink";
import SourcesCodex from "@/components/codex/SourcesCodex";
import { getOeuvreBySlug, oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";

export const dynamicParams = false;

export function generateStaticParams() {
    return oeuvres.map((oeuvre) => ({
        slug: oeuvre.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const oeuvre = getOeuvreBySlug(slug);

    if (!oeuvre) {
        return {};
    }

    return {
        title: oeuvre.nom,
        description:
            oeuvre.sousTitre ||
            `Découvrir ${oeuvre.nom} dans Le Codex du Disneyiste.`,
    };
}

export default async function OeuvrePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const oeuvre = getOeuvreBySlug(slug);
    const fiche = getFicheOeuvreBySlug(slug);

    if (!oeuvre || !fiche) {
        notFound();
    }

    const sources = getSourcesByIds(fiche.sources);

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Œuvre
                </p>

                <h1 className="mt-4 text-5xl text-ink">{oeuvre.nom}</h1>

                {oeuvre.sousTitre && (
                    <p className="mt-4 text-xl text-ink-soft">
                        {oeuvre.sousTitre}
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
                    <dt className="text-sm text-muted">Sortie</dt>

                    <dd className="mt-1 text-lg text-ink">
                        {formatDateHistorique(fiche.sortie.date)}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Format</dt>

                    <dd className="mt-1 text-lg text-ink">{fiche.format}</dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Contributions</dt>

                    <dd className="mt-1 space-y-3 text-lg text-ink">
                        {fiche.contributions.map((contribution) => (
                            <div key={contribution.contributeur.nom}>
                                <ReferenceCodexLink
                                    reference={contribution.contributeur}
                                />

                                <p className="mt-1 text-sm text-muted">
                                    {contribution.roles.join(", ")}
                                </p>
                            </div>
                        ))}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Personnages</dt>

                    <dd className="mt-1 flex flex-wrap gap-x-2 text-lg text-ink">
                        {fiche.personnages.map((personnage, index) => (
                            <span key={personnage.nom}>
                                <ReferenceCodexLink reference={personnage} />
                                {index < fiche.personnages.length - 1 && ","}
                            </span>
                        ))}
                    </dd>
                </div>
            </dl>

            <SourcesCodex sources={sources} />
        </main>
    );
}
