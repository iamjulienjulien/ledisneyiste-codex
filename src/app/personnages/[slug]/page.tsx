import { notFound } from "next/navigation";
import { getPersonnageBySlug, personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";

export const dynamicParams = false;

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

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
                    Personnage
                </p>

                <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    {personnage.nom}
                </h1>

                {personnage.sousTitre && (
                    <p className="mt-4 text-xl text-neutral-600">
                        {personnage.sousTitre}
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
