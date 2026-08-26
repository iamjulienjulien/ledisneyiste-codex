import type { Metadata } from "next";
import { CodexIndexPage } from "@/components/codex/CodexIndexPage";
import { CodexIndexListItem } from "@/components/codex/CodexIndexListItem";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { CodexOeuvreCard } from "@/components/codex/CodexOeuvreCard";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getRecompensesPourOeuvre } from "@/data/recompenses/relations";
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
                <ul className="grid gap-6 lg:grid-cols-2">
                    {oeuvres.map((oeuvre) => {
                        const fiche = getFicheOeuvreBySlug(oeuvre.slug);
                        const recompenses = getRecompensesPourOeuvre(
                            oeuvre.slug,
                        );

                        return fiche ? (
                            <li key={oeuvre.slug}>
                                <CodexOeuvreCard
                                    oeuvre={oeuvre}
                                    fiche={fiche}
                                    recompenses={recompenses}
                                />
                            </li>
                        ) : null;
                    })}
                </ul>
            ) : (
                <ul className="space-y-3">
                    {oeuvres.map((oeuvre, index) => (
                        <CodexIndexListItem
                            key={oeuvre.slug}
                            href={`/oeuvres/${oeuvre.slug}`}
                            index={index}
                            famille="oeuvres"
                            titre={oeuvre.nom}
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
                    ))}
                </ul>
            )}
        </CodexIndexPage>
    );
}
