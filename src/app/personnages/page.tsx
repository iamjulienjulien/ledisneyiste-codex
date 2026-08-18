import type { Metadata } from "next";
import { CodexIndexListItem } from "@/components/codex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { CodexPersonnageCard } from "@/components/codex/CodexPersonnageCard";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
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

            <section className="mt-12">
                <PixieSeparator
                    variant="beam"
                    intensity="strong"
                    color="rouge-crayon"
                    spacing="none"
                    decorative
                />

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
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
                    <ul className="mt-8 space-y-3">
                        {personnages.map((personnage, index) => (
                            <CodexIndexListItem
                                key={personnage.slug}
                                href={`/personnages/${personnage.slug}`}
                                index={index}
                                famille="personnages"
                                titre={personnage.nom}
                                sousTitre={personnage.sousTitre}
                            >
                                <ul
                                    aria-label="Catégories"
                                    className="flex flex-wrap gap-2"
                                >
                                    {personnage.metadata.categories.map(
                                        (category) => (
                                            <li key={category}>
                                                <PixieBadge
                                                    registry="personnages"
                                                    collection="categories"
                                                    slug={category}
                                                    size="xs"
                                                    shape="pill"
                                                />
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </CodexIndexListItem>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
