import type { Metadata } from "next";
import { CodexIndexPage } from "@/components/codex/CodexIndex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndex/CodexIndexViewSwitch";
import { CodexIndexPersonnageCard } from "@/components/codex/CodexIndex/CodexIndexPersonnageCard";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
import { construireRouteCanoniqueCodex } from "@/lib/navigation/routes-codex";
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
                <PixieGrid as="ul" maxColumns={2} minItemWidth="lg" gap="md">
                    {personnages.map((personnage) => {
                        const fiche = getFichePersonnageBySlug(personnage.slug);
                        const identite = resoudreIdentiteCodex(
                            "personnages",
                            personnage.slug,
                        );

                        return fiche && identite ? (
                            <li key={personnage.slug}>
                                <CodexIndexPersonnageCard
                                    personnage={personnage}
                                    fiche={fiche}
                                    identite={identite}
                                />
                            </li>
                        ) : null;
                    })}
                </PixieGrid>
            ) : (
                <ul className="space-y-3">
                    {personnages.map((personnage, index) => {
                        const identite = resoudreIdentiteCodex(
                            "personnages",
                            personnage.slug,
                        );

                        return identite ? (
                            <CodexIndexListItem
                                key={personnage.slug}
                                href={construireRouteCanoniqueCodex(
                                    "personnages",
                                    personnage.slug,
                                )}
                                index={index}
                                famille="personnages"
                                identite={identite}
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
                        ) : null;
                    })}
                </ul>
            )}
        </CodexIndexPage>
    );
}
