import type { Metadata } from "next";
import { CodexIndexCreateurCard } from "@/components/codex/CodexIndex/CodexIndexCreateurCard";
import { CodexIndexPage } from "@/components/codex/CodexIndex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndex/CodexIndexViewSwitch";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { contributeurs } from "@/data/catalogues";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import { getEpoquesPourContributeur } from "@/data/epoques/relations";
import { getRecompensesPourContributeur } from "@/data/recompenses/relations";
import { resolveCodexIndexView } from "@/lib/index-view";

export const metadata: Metadata = {
    title: "Créateurs",
    description:
        "Explorer celles et ceux qui ont imaginé, construit et transformé Disney.",
};

export default async function ContributeursPage({
    searchParams,
}: PageProps<"/contributeurs">) {
    const { view } = await searchParams;
    const currentView = resolveCodexIndexView(view);

    return (
        <CodexIndexPage
            famille="createurs"
            eyebrow="Explorer le Codex"
            titre="Créateurs"
            introduction="Celles et ceux qui ont imaginé, construit et transformé Disney."
            compteur={{
                valeur: contributeurs.length,
                singulier: "créateur",
                pluriel: "créateurs",
            }}
            commandes={
                <CodexIndexViewSwitch
                    pathname="/contributeurs"
                    currentView={currentView}
                />
            }
        >
            {currentView === "cards" ? (
                <PixieGrid as="ul" maxColumns={2} minItemWidth="lg" gap="md">
                    {contributeurs.map((contributeur) => {
                        const fiche = getFicheContributeurBySlug(
                            contributeur.slug,
                        );

                        return fiche ? (
                            <li key={contributeur.slug}>
                                <CodexIndexCreateurCard
                                    contributeur={contributeur}
                                    fiche={fiche}
                                    epoques={getEpoquesPourContributeur(
                                        contributeur.slug,
                                    )}
                                    recompenses={getRecompensesPourContributeur(
                                        contributeur.slug,
                                    )}
                                />
                            </li>
                        ) : null;
                    })}
                </PixieGrid>
            ) : (
                <ul className="space-y-3">
                    {contributeurs.map((contributeur, index) => (
                        <CodexIndexListItem
                            key={contributeur.slug}
                            href={`/contributeurs/${contributeur.slug}`}
                            index={index}
                            famille="createurs"
                            titre={contributeur.nom}
                            sousTitre={contributeur.sousTitre}
                        >
                            <ul
                                aria-label="Catégories"
                                className="flex flex-wrap gap-2"
                            >
                                {contributeur.metadata.categories.map(
                                    (category) => (
                                        <li key={category}>
                                            <PixieBadge
                                                registry="contributeurs"
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
