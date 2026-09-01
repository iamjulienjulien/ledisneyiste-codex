import type { Metadata } from "next";
import { CodexIndexPage } from "@/components/codex/CodexIndex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndex/CodexIndexViewSwitch";
import { CodexIndexOeuvreCard } from "@/components/codex/CodexIndex/CodexIndexOeuvreCard";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getRecompensesPourOeuvre } from "@/data/recompenses/relations";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
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
        <CodexIndexPage
            famille="oeuvres"
            eyebrow="Explorer le Codex"
            titre="Œuvres"
            introduction="Les films, courts métrages et créations où les imaginaires Disney prennent forme."
            compteur={{
                valeur: oeuvres.length,
                singulier: "œuvre",
                pluriel: "œuvres",
            }}
            commandes={
                <CodexIndexViewSwitch
                    pathname="/oeuvres"
                    currentView={currentView}
                />
            }
        >
            {currentView === "cards" ? (
                <PixieGrid as="ul" maxColumns={2} minItemWidth="lg" gap="md">
                    {oeuvres.map((oeuvre) => {
                        const fiche = getFicheOeuvreBySlug(oeuvre.slug);
                        const recompenses = getRecompensesPourOeuvre(
                            oeuvre.slug,
                        );
                        const identite = resoudreIdentiteCodex(
                            "oeuvres",
                            oeuvre.slug,
                        );

                        return fiche && identite ? (
                            <li key={oeuvre.slug}>
                                <CodexIndexOeuvreCard
                                    oeuvre={oeuvre}
                                    fiche={fiche}
                                    identite={identite}
                                    recompenses={recompenses}
                                />
                            </li>
                        ) : null;
                    })}
                </PixieGrid>
            ) : (
                <ul className="space-y-3">
                    {oeuvres.map((oeuvre, index) => {
                        const identite = resoudreIdentiteCodex(
                            "oeuvres",
                            oeuvre.slug,
                        );

                        return identite ? (
                            <CodexIndexListItem
                                key={oeuvre.slug}
                                href={`/oeuvres/${oeuvre.slug}`}
                                index={index}
                                famille="oeuvres"
                                identite={identite}
                                sousTitre={oeuvre.sousTitre}
                            >
                                <ul
                                    aria-label="Métadonnées"
                                    className="flex flex-wrap gap-2"
                                >
                                    <li>
                                        <PixieBadge
                                            registry="oeuvres"
                                            collection="collections"
                                            slug={oeuvre.metadata.collection}
                                            size="xs"
                                            shape="pill"
                                        />
                                    </li>
                                    <li>
                                        <PixieBadge
                                            registry="oeuvres"
                                            collection="types"
                                            slug={oeuvre.metadata.type}
                                            size="xs"
                                            shape="pill"
                                        />
                                    </li>
                                </ul>
                            </CodexIndexListItem>
                        ) : null;
                    })}
                </ul>
            )}
        </CodexIndexPage>
    );
}
