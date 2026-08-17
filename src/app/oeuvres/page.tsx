import type { Metadata } from "next";
import Link from "next/link";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { CodexOeuvreCard } from "@/components/codex/CodexOeuvreCard";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { resolveCodexIndexView } from "@/lib/index-view";

export const metadata: Metadata = {
    title: "Œuvres",
    description:
        "Explorer les films, courts métrages et créations qui composent les imaginaires Disney.",
};

export default async function OeuvresPage({
    searchParams,
}: PageProps<"/oeuvres">) {
    const { view } = await searchParams;
    const currentView = resolveCodexIndexView(view);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="oeuvres"
                    size="xl"
                />
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-famille-oeuvres">
                        Explorer le Codex
                    </p>

                    <h1 className="mt-3 text-5xl text-famille-oeuvres">
                        Œuvres
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-ink-soft">
                        Les films, courts métrages et créations où les
                        imaginaires Disney prennent forme.
                    </p>
                </div>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted">
                        {oeuvres.length}{" "}
                        {oeuvres.length > 1 ? "œuvres" : "œuvre"}
                    </p>

                    <CodexIndexViewSwitch
                        pathname="/oeuvres"
                        currentView={currentView}
                    />
                </div>

                {currentView === "cards" ? (
                    <ul className="mt-8 grid gap-6 lg:grid-cols-2">
                        {oeuvres.map((oeuvre) => {
                            const fiche = getFicheOeuvreBySlug(oeuvre.slug);

                            return fiche ? (
                                <li key={oeuvre.slug}>
                                    <CodexOeuvreCard
                                        oeuvre={oeuvre}
                                        fiche={fiche}
                                    />
                                </li>
                            ) : null;
                        })}
                    </ul>
                ) : (
                    <ul className="mt-6 divide-y divide-line">
                        {oeuvres.map((oeuvre) => (
                            <li key={oeuvre.slug}>
                                <Link
                                    href={`/oeuvres/${oeuvre.slug}`}
                                    className="group block py-6"
                                >
                                    <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-oeuvres group-focus-visible:text-famille-oeuvres">
                                        {oeuvre.nom}
                                    </h2>

                                    {oeuvre.sousTitre && (
                                        <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                                            {oeuvre.sousTitre}
                                        </p>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
