import type { Metadata } from "next";
import Link from "next/link";
import { CodexCreateurCard } from "@/components/codex/CodexCreateurCard";
import { CodexIndexViewSwitch } from "@/components/codex/CodexIndexViewSwitch";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { contributeurs } from "@/data/catalogues";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import { getEpoquesPourContributeur } from "@/data/epoques/relations";
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
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="createurs"
                    size="xl"
                />
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-famille-createurs">
                        Explorer le Codex
                    </p>

                    <h1 className="mt-3 text-5xl text-famille-createurs">
                        Créateurs
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-ink-soft">
                        Celles et ceux qui ont imaginé, construit et transformé
                        Disney.
                    </p>
                </div>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted">
                        {contributeurs.length}{" "}
                        {contributeurs.length > 1 ? "créateurs" : "créateur"}
                    </p>

                    <CodexIndexViewSwitch
                        pathname="/contributeurs"
                        currentView={currentView}
                    />
                </div>

                {currentView === "cards" ? (
                    <ul className="mt-8 grid gap-6 lg:grid-cols-2">
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
                                    />
                                </li>
                            ) : null;
                        })}
                    </ul>
                ) : (
                    <ul className="mt-6 divide-y divide-line">
                        {contributeurs.map((contributeur) => (
                            <li key={contributeur.slug}>
                                <Link
                                    href={`/contributeurs/${contributeur.slug}`}
                                    className="group block py-6"
                                >
                                    <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-createurs group-focus-visible:text-famille-createurs">
                                        {contributeur.nom}
                                    </h2>

                                    {contributeur.sousTitre && (
                                        <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                                            {contributeur.sousTitre}
                                        </p>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
