import type { Metadata } from "next";
import Link from "next/link";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { epoques } from "@/data/catalogues";

export const metadata: Metadata = {
    title: "Époques",
    description:
        "Explorer les grandes périodes qui racontent les transformations de Disney dans le temps.",
};

export default function EpoquesPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="epoques"
                    size="xl"
                />
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-famille-epoques">
                        Explorer le Codex
                    </p>

                    <h1 className="mt-3 text-5xl text-famille-epoques">
                        Époques
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-ink-soft">
                        Des périodes pour suivre les transformations du studio,
                        de ses créations et de ceux qui les ont façonnées.
                    </p>
                </div>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-muted">
                    {epoques.length} {epoques.length > 1 ? "époques" : "époque"}
                </p>

                <ul className="mt-6 divide-y divide-line">
                    {epoques.map((epoque) => (
                        <li key={epoque.slug}>
                            <Link
                                href={`/epoques/${epoque.slug}`}
                                className="group block py-6"
                            >
                                <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-epoques group-focus-visible:text-famille-epoques">
                                    {epoque.nom}
                                </h2>

                                {epoque.sousTitre && (
                                    <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                                        {epoque.sousTitre}
                                    </p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
