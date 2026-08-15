import { notFound } from "next/navigation";
import { contributeurs, getContributeurBySlug } from "@/data/catalogues";
import { getFicheContributeurBySlug } from "@/data/contributeurs";

export const dynamicParams = false;

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

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
                    Contributeur
                </p>

                <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    {contributeur.nom}
                </h1>

                {contributeur.sousTitre && (
                    <p className="mt-4 text-xl text-neutral-600">
                        {contributeur.sousTitre}
                    </p>
                )}

                {fiche.introduction && (
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                        {fiche.introduction}
                    </p>
                )}
            </header>
        </main>
    );
}
