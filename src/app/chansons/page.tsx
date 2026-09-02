import type { Metadata } from "next";
import { CodexIndexChansonCard } from "@/components/codex/CodexIndex/CodexIndexChansonCard";
import { CodexIndexListItem } from "@/components/codex/CodexIndex/CodexIndexListItem";
import { CodexIndexPage } from "@/components/codex/CodexIndex/CodexIndexPage";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndex/CodexIndexViewSwitch";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { getFicheChansonBySlug } from "@/data/chansons";
import { chansons } from "@/data/catalogues";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
import { resolveCodexIndexView } from "@/lib/index-view";

export const metadata: Metadata = {
    title: "Chansons",
    description:
        "Explorer les chansons qui donnent une voix, un rythme et une mémoire aux œuvres Disney.",
};

export default async function ChansonsPage({
    searchParams,
}: PageProps<"/chansons">) {
    const { view } = await searchParams;
    const currentView = resolveCodexIndexView(view);

    return (
        <CodexIndexPage
            famille="chansons"
            eyebrow="Explorer le Codex"
            titre="Chansons"
            introduction="Les mélodies et les paroles qui donnent une voix, un rythme et une mémoire aux œuvres Disney."
            compteur={{
                valeur: chansons.length,
                singulier: "chanson",
                pluriel: "chansons",
            }}
            commandes={
                <CodexIndexViewSwitch
                    pathname="/chansons"
                    currentView={currentView}
                />
            }
        >
            {currentView === "cards" ? (
                <PixieGrid as="ul" maxColumns={2} minItemWidth="lg" gap="md">
                    {chansons.map((chanson) => {
                        const fiche = getFicheChansonBySlug(chanson.slug);
                        const identite = resoudreIdentiteCodex(
                            "chansons",
                            chanson.slug,
                        );

                        return fiche && identite ? (
                            <li key={chanson.slug}>
                                <CodexIndexChansonCard
                                    chanson={chanson}
                                    fiche={fiche}
                                    identite={identite}
                                />
                            </li>
                        ) : null;
                    })}
                </PixieGrid>
            ) : (
                <ul className="space-y-3">
                    {chansons.map((chanson, index) => {
                        const identite = resoudreIdentiteCodex(
                            "chansons",
                            chanson.slug,
                        );

                        return identite ? (
                            <CodexIndexListItem
                                key={chanson.slug}
                                href={`/chansons/${chanson.slug}`}
                                index={index}
                                famille="chansons"
                                identite={identite}
                                sousTitre={chanson.sousTitre}
                            >
                                <PixieBadge
                                    variant="soft"
                                    size="xs"
                                    shape="pill"
                                    color="rose-aerographe"
                                >
                                    {chanson.oeuvreOrigine.nom}
                                </PixieBadge>
                            </CodexIndexListItem>
                        ) : null;
                    })}
                </ul>
            )}
        </CodexIndexPage>
    );
}
