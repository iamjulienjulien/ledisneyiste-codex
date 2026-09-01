import type { Metadata } from "next";
import { CodexIndexEpoqueCard } from "@/components/codex/CodexIndex/CodexIndexEpoqueCard";
import { CodexIndexPage } from "@/components/codex/CodexIndex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndex/CodexIndexViewSwitch";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { epoques } from "@/data/catalogues";
import {
    getContributeursDeLEpoque,
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
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
                <PixieGrid as="ul" maxColumns={2} minItemWidth="lg" gap="md">
                    {epoques.map((epoque) => {
                        const fiche = getFicheEpoqueBySlug(epoque.slug);
                        const identite = resoudreIdentiteCodex(
                            "epoques",
                            epoque.slug,
                        );

                        return fiche && identite ? (
                            <li key={epoque.slug}>
                                <CodexIndexEpoqueCard
                                    epoque={epoque}
                                    fiche={fiche}
                                    identite={identite}
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
                </PixieGrid>
            ) : (
                <ul className="space-y-3">
                    {epoques.map((epoque, index) => {
                        const identite = resoudreIdentiteCodex(
                            "epoques",
                            epoque.slug,
                        );

                        return identite ? (
                            <CodexIndexListItem
                                key={epoque.slug}
                                href={`/epoques/${epoque.slug}`}
                                index={index}
                                famille="epoques"
                                identite={identite}
                                sousTitre={epoque.sousTitre}
                            />
                        ) : null;
                    })}
                </ul>
            )}
        </CodexIndexPage>
    );
}
