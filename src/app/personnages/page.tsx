import type { Metadata } from "next";
import { CodexIndexPage } from "@/components/codex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { CodexPersonnageCard } from "@/components/codex/CodexPersonnageCard";
import { PixieBadge } from "@/components/ui/PixieBadge";
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
        <CodexIndexPage
            famille="personnages"
            eyebrow="Explorer le Codex"
            titre="Personnages"
            introduction="Les figures fictives qui peuplent les récits et les imaginaires Disney."
            compteur={{
                valeur: personnages.length,
                singulier: "personnage",
                pluriel: "personnages",
            }}
            commandes={
                <CodexIndexViewSwitch
                    pathname="/personnages"
                    currentView={currentView}
                />
            }
        >
            {currentView === "cards" ? (
                <ul className="grid gap-6 lg:grid-cols-2">
                    {personnages.map((personnage) => {
                        const fiche = getFichePersonnageBySlug(personnage.slug);

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
                <ul className="space-y-3">
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
        </CodexIndexPage>
    );
}
