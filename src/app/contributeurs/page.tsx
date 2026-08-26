import type { Metadata } from "next";
import { CodexCreateurCard } from "@/components/codex/CodexCreateurCard";
import { CodexIndexPage } from "@/components/codex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { PixieBadge } from "@/components/ui/PixieBadge";
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
                <ul className="grid gap-6 lg:grid-cols-2">
                    {contributeurs.map((contributeur) => {
                        const fiche = getFicheContributeurBySlug(
                            contributeur.slug,
                        );

                        return fiche ? (
                            <li key={contributeur.slug}>
                                <CodexCreateurCard
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
                </ul>
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
