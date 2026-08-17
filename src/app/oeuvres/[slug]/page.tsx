import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFicheHeader } from "@/components/codex/CodexFicheHeader";
import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { CodexSources } from "@/components/codex/CodexSources";
import { CodexEpoque } from "@/components/codex/CodexEpoque";
import { CodexBlocsEditoriaux } from "@/components/codex/CodexBlocsEditoriaux";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquePourDate } from "@/data/epoques/relations";
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
    const epoque = getEpoquePourDate(fiche.sortie.date);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16">
            <CodexFicheHeader
                eyebrow="Œuvre"
                titre={oeuvre.nom}
                sousTitre={oeuvre.sousTitre}
                introduction={fiche.introduction}
            />

            <ul
                aria-label="Métadonnées de l’œuvre"
                className="mt-8 flex flex-wrap gap-2"
            >
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="collections"
                        slug={oeuvre.metadata.collection}
                        size="sm"
                        shape="pill"
                    />
                </li>
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="types"
                        slug={oeuvre.metadata.type}
                        size="sm"
                        shape="pill"
                    />
                </li>
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="sons"
                        slug={oeuvre.metadata.son}
                        size="sm"
                        shape="pill"
                    />
                </li>
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="couleurs"
                        slug={oeuvre.metadata.couleur}
                        size="sm"
                        shape="pill"
                    />
                </li>
            </ul>

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
                                <CodexReferenceLink
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
                                <CodexReferenceLink reference={personnage} />
                                {index < fiche.personnages.length - 1 && ","}
                            </span>
                        ))}
                    </dd>
                </div>

                <CodexEpoque epoque={epoque} />
            </dl>

            <CodexBlocsEditoriaux
                collection="oeuvres"
                blocs={fiche.blocsEditoriaux}
            />

            <CodexSources sources={sources} />
        </main>
    );
}
