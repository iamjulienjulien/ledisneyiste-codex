import type { Metadata } from "next";
import Link from "next/link";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { CodexPersonnageCard } from "@/components/codex/CodexPersonnageCard";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { resolveCodexIndexView } from "@/lib/index-view";

export const metadata: Metadata = {
    title: "Personnages",
    description:
        "Explorer les figures fictives qui peuplent les récits et les imaginaires Disney.",
};

export default async function PersonnagesPage({
    searchParams,
}: PageProps<"/personnages">) {
    const { view } = await searchParams;
    const currentView = resolveCodexIndexView(view);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="personnages"
                    size="xl"
                />
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-famille-personnages">
                        Explorer le Codex
                    </p>

                    <h1 className="mt-3 text-5xl text-famille-personnages">
                        Personnages
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-ink-soft">
                        Les figures fictives qui peuplent les récits et les
                        imaginaires Disney.
                    </p>
                </div>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted">
                        {personnages.length}{" "}
                        {personnages.length > 1 ? "personnages" : "personnage"}
                    </p>

                    <CodexIndexViewSwitch
                        pathname="/personnages"
                        currentView={currentView}
                    />
                </div>

                {currentView === "cards" ? (
                    <ul className="mt-8 grid gap-6 lg:grid-cols-2">
                        {personnages.map((personnage) => {
                            const fiche = getFichePersonnageBySlug(
                                personnage.slug,
                            );

                            return fiche ? (
                                <li key={personnage.slug}>
                                    <CodexPersonnageCard
                                        personnage={personnage}
                                        fiche={fiche}
                                    />
                                </li>
                            ) : null;
                        })}
                    </ul>
                ) : (
                    <ul className="mt-6 divide-y divide-line">
                        {personnages.map((personnage) => (
                            <li key={personnage.slug}>
                                <Link
                                    href={`/personnages/${personnage.slug}`}
                                    className="group block py-6"
                                >
                                    <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-personnages group-focus-visible:text-famille-personnages">
                                        {personnage.nom}
                                    </h2>

                                    {personnage.sousTitre && (
                                        <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                                            {personnage.sousTitre}
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
