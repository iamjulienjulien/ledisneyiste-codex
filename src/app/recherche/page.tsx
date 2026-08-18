import type { Metadata } from "next";
import { CodexCreateurCard } from "@/components/codex/CodexCreateurCard";
import { CodexEpoqueCard } from "@/components/codex/CodexEpoqueCard";
import { CodexOeuvreCard } from "@/components/codex/CodexOeuvreCard";
import { CodexPersonnageCard } from "@/components/codex/CodexPersonnageCard";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import {
    getContributeursDeLEpoque,
    getEpoquesPourContributeur,
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { getRecompensesPourOeuvre } from "@/data/recompenses/relations";
import { rechercherDansCatalogues } from "@/lib/recherche";

export const metadata: Metadata = {
    title: "Recherche",
    description:
        "Rechercher une œuvre, un personnage, un créateur ou une époque dans le Codex du Disneyiste.",
};

export default async function RecherchePage({
    searchParams,
}: PageProps<"/recherche">) {
    const { q } = await searchParams;
    const requete = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
    const resultats = rechercherDansCatalogues(requete);
    const rechercheLancee = requete.length > 0;

    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="max-w-3xl">
                <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                    Explorer toutes les archives
                </p>

                <h1 className="mt-3 text-5xl text-ink">Recherche</h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
                    Retrouver un nom, un titre, une catégorie, un rôle ou une
                    collection parmi les quatre familles du Codex.
                </p>
            </header>

            <form
                action="/recherche"
                method="get"
                role="search"
                className="mt-12 border border-line-strong bg-surface-muted p-5 shadow-soft sm:p-7"
            >
                <label
                    htmlFor="recherche-q"
                    className="text-sm font-medium text-ink"
                >
                    Que souhaitez-vous retrouver ?
                </label>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                        id="recherche-q"
                        name="q"
                        type="search"
                        defaultValue={requete}
                        placeholder="Mickey, animateur, Silly Symphonies…"
                        autoComplete="off"
                        enterKeyHint="search"
                        className="min-h-12 min-w-0 flex-1 rounded-small border border-line-strong bg-canvas px-4 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_2px_var(--color-accent)]"
                    />

                    <PixieButton type="submit" size="lg">
                        Rechercher
                    </PixieButton>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted">
                    La recherche ignore les accents et la casse. Tous les mots
                    saisis doivent être présents dans la même archive.
                </p>
            </form>

            <div className="mt-12">
                <PixieSeparator
                    variant="film"
                    intensity="subtle"
                    spacing="none"
                    decorative
                />
            </div>

            {!rechercheLancee ? (
                <section
                    className="mt-10 max-w-2xl"
                    aria-labelledby="attente-title"
                >
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                        La table attend son sujet
                    </p>
                    <h2 id="attente-title" className="mt-3 text-3xl text-ink">
                        Lancez la première recherche
                    </h2>
                    <p className="mt-4 leading-7 text-ink-soft">
                        Les résultats apparaîtront ici, regroupés entre
                        Personnages, Créateurs, Œuvres et Époques.
                    </p>
                </section>
            ) : resultats.total === 0 ? (
                <section
                    className="mt-10 max-w-2xl"
                    aria-labelledby="vide-title"
                >
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                        Aucun raccord trouvé
                    </p>
                    <h2 id="vide-title" className="mt-3 text-3xl text-ink">
                        Aucune archive pour « {requete} »
                    </h2>
                    <p className="mt-4 leading-7 text-ink-soft">
                        Essayez un nom, un titre, une catégorie, un rôle ou une
                        collection plus générale.
                    </p>
                </section>
            ) : (
                <div className="mt-10">
                    <p className="text-sm text-muted" aria-live="polite">
                        {resultats.total} résultat
                        {resultats.total > 1 ? "s" : ""} pour « {requete} »
                    </p>

                    {resultats.personnages.length > 0 ? (
                        <section
                            className="mt-14"
                            aria-labelledby="resultats-personnages"
                        >
                            <div className="flex items-center gap-4">
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug="personnages"
                                    size="md"
                                />
                                <div>
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-famille-personnages">
                                        {resultats.personnages.length} résultat
                                        {resultats.personnages.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <h2
                                        id="resultats-personnages"
                                        className="mt-1 text-3xl text-ink"
                                    >
                                        Personnages
                                    </h2>
                                </div>
                            </div>

                            <ul className="mt-7 grid gap-6 lg:grid-cols-2">
                                {resultats.personnages.map((personnage) => {
                                    const fiche = getFichePersonnageBySlug(
                                        personnage.slug,
                                    );

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
                        </section>
                    ) : null}

                    {resultats.contributeurs.length > 0 ? (
                        <section
                            className="mt-14"
                            aria-labelledby="resultats-createurs"
                        >
                            <div className="flex items-center gap-4">
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug="createurs"
                                    size="md"
                                />
                                <div>
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-famille-createurs">
                                        {resultats.contributeurs.length}{" "}
                                        résultat
                                        {resultats.contributeurs.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <h2
                                        id="resultats-createurs"
                                        className="mt-1 text-3xl text-ink"
                                    >
                                        Créateurs
                                    </h2>
                                </div>
                            </div>

                            <ul className="mt-7 grid gap-6 lg:grid-cols-2">
                                {resultats.contributeurs.map((contributeur) => {
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
                        </section>
                    ) : null}

                    {resultats.oeuvres.length > 0 ? (
                        <section
                            className="mt-14"
                            aria-labelledby="resultats-oeuvres"
                        >
                            <div className="flex items-center gap-4">
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug="oeuvres"
                                    size="md"
                                />
                                <div>
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-famille-oeuvres">
                                        {resultats.oeuvres.length} résultat
                                        {resultats.oeuvres.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <h2
                                        id="resultats-oeuvres"
                                        className="mt-1 text-3xl text-ink"
                                    >
                                        Œuvres
                                    </h2>
                                </div>
                            </div>

                            <ul className="mt-7 grid gap-6 lg:grid-cols-2">
                                {resultats.oeuvres.map((oeuvre) => {
                                    const fiche = getFicheOeuvreBySlug(
                                        oeuvre.slug,
                                    );

                                    return fiche ? (
                                        <li key={oeuvre.slug}>
                                            <CodexOeuvreCard
                                                oeuvre={oeuvre}
                                                fiche={fiche}
                                                recompenses={getRecompensesPourOeuvre(
                                                    oeuvre.slug,
                                                )}
                                            />
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </section>
                    ) : null}

                    {resultats.epoques.length > 0 ? (
                        <section
                            className="mt-14"
                            aria-labelledby="resultats-epoques"
                        >
                            <div className="flex items-center gap-4">
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug="epoques"
                                    size="md"
                                />
                                <div>
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-famille-epoques">
                                        {resultats.epoques.length} résultat
                                        {resultats.epoques.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <h2
                                        id="resultats-epoques"
                                        className="mt-1 text-3xl text-ink"
                                    >
                                        Époques
                                    </h2>
                                </div>
                            </div>

                            <ul className="mt-7 grid gap-6 lg:grid-cols-2">
                                {resultats.epoques.map((epoque) => {
                                    const fiche = getFicheEpoqueBySlug(
                                        epoque.slug,
                                    );

                                    return fiche ? (
                                        <li key={epoque.slug}>
                                            <CodexEpoqueCard
                                                epoque={epoque}
                                                fiche={fiche}
                                                nombres={{
                                                    oeuvres:
                                                        getOeuvresDeLEpoque(
                                                            epoque.slug,
                                                        ).length,
                                                    personnages:
                                                        getPersonnagesDeLEpoque(
                                                            epoque.slug,
                                                        ).length,
                                                    createurs:
                                                        getContributeursDeLEpoque(
                                                            epoque.slug,
                                                        ).length,
                                                }}
                                            />
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </section>
                    ) : null}
                </div>
            )}
        </main>
    );
}
