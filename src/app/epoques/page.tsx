import type { Metadata } from "next";
import { CodexEpoqueCard } from "@/components/codex/CodexEpoqueCard";
import { CodexIndexPage } from "@/components/codex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { epoques } from "@/data/catalogues";
import {
    getContributeursDeLEpoque,
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { resolveCodexIndexView } from "@/lib/index-view";

export const metadata: Metadata = {
    title: "Époques",
    description:
        "Explorer les grandes périodes qui racontent les transformations de Disney dans le temps.",
};

export default async function EpoquesPage({
    searchParams,
}: PageProps<"/epoques">) {
    const { view } = await searchParams;
    const currentView = resolveCodexIndexView(view);

    return (
        <CodexIndexPage
            famille="epoques"
            eyebrow="Explorer le Codex"
            titre="Époques"
            introduction="Des périodes pour suivre les transformations du studio, de ses créations et de ceux qui les ont façonnées."
            compteur={{
                valeur: epoques.length,
                singulier: "époque",
                pluriel: "époques",
            }}
            commandes={
                <CodexIndexViewSwitch
                    pathname="/epoques"
                    currentView={currentView}
                />
            }
        >
            {currentView === "cards" ? (
                <ul className="grid gap-6 lg:grid-cols-2">
                    {epoques.map((epoque) => {
                        const fiche = getFicheEpoqueBySlug(epoque.slug);

                        return fiche ? (
                            <li key={epoque.slug}>
                                <CodexEpoqueCard
                                    epoque={epoque}
                                    fiche={fiche}
                                    nombres={{
                                        oeuvres: getOeuvresDeLEpoque(
                                            epoque.slug,
                                        ).length,
                                        personnages: getPersonnagesDeLEpoque(
                                            epoque.slug,
                                        ).length,
                                        createurs: getContributeursDeLEpoque(
                                            epoque.slug,
                                        ).length,
                                    }}
                                />
                            </li>
                        ) : null;
                    })}
                </ul>
            ) : (
                <ul className="space-y-3">
                    {epoques.map((epoque, index) => (
                        <CodexIndexListItem
                            key={epoque.slug}
                            href={`/epoques/${epoque.slug}`}
                            index={index}
                            famille="epoques"
                            titre={epoque.nom}
                            sousTitre={epoque.sousTitre}
                        />
                    ))}
                </ul>
            )}
        </CodexIndexPage>
    );
}
