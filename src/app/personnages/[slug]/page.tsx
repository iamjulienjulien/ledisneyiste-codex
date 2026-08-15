import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonnageBySlug, personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { getSourcesByIds } from "@/data/sources";
import ReferenceCodexLink from "@/components/codex/ReferenceCodexLink";
import SourcesCodex from "@/components/codex/SourcesCodex";
import { formatDateHistorique } from "@/lib/date";

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const personnage = getPersonnageBySlug(slug);

    if (!personnage) {
        return {};
    }

    return {
        title: personnage.nom,
        description:
            personnage.sousTitre ||
            `Découvrir ${personnage.nom} dans Le Codex du Disneyiste.`,
    };
}

export function generateStaticParams() {
    return personnages.map((personnage) => ({
        slug: personnage.slug,
    }));
}

export default async function PersonnagePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const personnage = getPersonnageBySlug(slug);
    const fiche = getFichePersonnageBySlug(slug);

    if (!personnage || !fiche) {
        notFound();
    }

    const sources = getSourcesByIds(fiche.sources);

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Personnage
                </p>

                <h1 className="mt-4 text-5xl">{personnage.nom}</h1>

                {personnage.sousTitre && (
                    <p className="mt-4 text-xl text-ink-soft">
                        {personnage.sousTitre}
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
                    <dt className="text-sm text-muted">Espèce</dt>
                    <dd className="mt-1 text-lg">{fiche.espece}</dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Création</dt>
                    <dd className="mt-1 text-lg">
                        {formatDateHistorique(fiche.creation.date)}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Créateurs</dt>

                    <dd className="mt-1 flex flex-wrap gap-x-2 text-lg text-ink">
                        {fiche.creation.createurs.map((createur, index) => (
                            <span key={createur.nom}>
                                <ReferenceCodexLink reference={createur} />
                                {index < fiche.creation.createurs.length - 1 &&
                                    ","}
                            </span>
                        ))}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Première apparition</dt>

                    <dd className="mt-1 text-lg text-ink">
                        <ReferenceCodexLink
                            reference={fiche.premiereApparition.oeuvre}
                        />
                        {" · "}
                        {formatDateHistorique(fiche.premiereApparition.date)}
                    </dd>
                </div>
            </dl>

            <SourcesCodex sources={sources} />
        </main>
    );
}
