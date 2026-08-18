import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    contributeurs,
    oeuvres,
    personnages,
    epoques,
} from "@/data/catalogues";

export default function Home() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
            <header className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted">
                    Le Disneyiste
                </p>

                <h1 className="mt-4 text-5xl text-ink sm:text-7xl">
                    Le Codex du Disneyiste
                </h1>

                <p className="mt-6 max-w-2xl text-xl leading-9 text-ink-soft">
                    Un atlas éditorial pour explorer, relier et raconter les
                    imaginaires Disney.
                </p>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
                    Œuvres, personnages et créateurs se croisent ici pour
                    documenter Disney comme phénomène culturel, mémoire
                    collective et fabrique d’imaginaires.
                </p>
            </header>

            <section className="mt-20">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                        Explorer
                    </p>

                    <h2 className="mt-3 text-3xl text-ink">
                        Quatre portes vers le Codex
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
                        Entrer par les figures de fiction, celles et ceux qui
                        les ont façonnées, les œuvres où leurs histoires
                        prennent vie, ou les époques qui les replacent dans le
                        temps.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <PixieLink
                        href="/personnages"
                        variant="surface"
                        color="rouge-crayon"
                        data-famille="personnages"
                        className="codex-door group border border-line p-6"
                    >
                        <PixieSymbol
                            registry="codex"
                            collection="index"
                            slug="personnages"
                            size="lg"
                            className="mb-5"
                        />
                        <p className="text-sm text-muted">
                            {personnages.length}{" "}
                            {personnages.length > 1
                                ? "personnages"
                                : "personnage"}
                        </p>

                        <h3 className="mt-3 text-2xl text-famille-personnages">
                            Personnages
                        </h3>

                        <p className="mt-3 leading-7 text-ink-soft">
                            Les figures fictives qui peuplent les récits et les
                            imaginaires Disney.
                        </p>

                        <p className="mt-6 font-medium text-famille-personnages transition-[filter] group-hover:brightness-125">
                            Explorer les personnages →
                        </p>
                    </PixieLink>

                    <PixieLink
                        href="/contributeurs"
                        variant="surface"
                        color="jaune-lampe"
                        data-famille="createurs"
                        className="codex-door group border border-line p-6"
                    >
                        <PixieSymbol
                            registry="codex"
                            collection="index"
                            slug="createurs"
                            size="lg"
                            className="mb-5"
                        />
                        <p className="text-sm text-muted">
                            {contributeurs.length}{" "}
                            {contributeurs.length > 1
                                ? "créateurs"
                                : "créateur"}
                        </p>

                        <h3 className="mt-3 text-2xl text-famille-createurs">
                            Créateurs
                        </h3>

                        <p className="mt-3 leading-7 text-ink-soft">
                            Celles et ceux qui ont imaginé, construit et
                            transformé Disney.
                        </p>

                        <p className="mt-6 font-medium text-famille-createurs transition-[filter] group-hover:brightness-125">
                            Explorer les créateurs →
                        </p>
                    </PixieLink>

                    <PixieLink
                        href="/oeuvres"
                        variant="surface"
                        color="gouache"
                        data-famille="oeuvres"
                        className="codex-door group border border-line p-6"
                    >
                        <PixieSymbol
                            registry="codex"
                            collection="index"
                            slug="oeuvres"
                            size="lg"
                            className="mb-5"
                        />
                        <p className="text-sm text-muted">
                            {oeuvres.length}{" "}
                            {oeuvres.length > 1 ? "œuvres" : "œuvre"}
                        </p>

                        <h3 className="mt-3 text-2xl text-famille-oeuvres">
                            Œuvres
                        </h3>

                        <p className="mt-3 leading-7 text-ink-soft">
                            Les films, courts métrages et créations où les
                            imaginaires Disney prennent forme.
                        </p>

                        <p className="mt-6 font-medium text-famille-oeuvres transition-[filter] group-hover:brightness-125">
                            Explorer les œuvres →
                        </p>
                    </PixieLink>

                    <PixieLink
                        href="/epoques"
                        variant="surface"
                        color="vert-cellulo"
                        data-famille="epoques"
                        className="codex-door group border border-line p-6"
                    >
                        <PixieSymbol
                            registry="codex"
                            collection="index"
                            slug="epoques"
                            size="lg"
                            className="mb-5"
                        />
                        <p className="text-sm text-muted">
                            {epoques.length}{" "}
                            {epoques.length > 1 ? "époques" : "époque"}
                        </p>

                        <h3 className="mt-3 text-2xl text-famille-epoques">
                            Époques
                        </h3>

                        <p className="mt-3 leading-7 text-ink-soft">
                            Les grandes périodes qui permettent de suivre les
                            transformations de Disney dans le temps.
                        </p>

                        <p className="mt-6 font-medium text-famille-epoques transition-[filter] group-hover:brightness-125">
                            Explorer les époques →
                        </p>
                    </PixieLink>
                </div>
            </section>

            <section className="mt-20 border-t border-line pt-12">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Aux origines
                </p>

                <h2 className="mt-3 text-3xl text-ink">
                    Un homme, deux souris et un bateau
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                    Le premier réseau du Codex se noue autour de quelques
                    figures fondatrices : Walt Disney et Ub Iwerks imaginent,
                    Mickey et Minnie prennent forme, puis
                    <em> Steamboat Willie</em> les rassemble dans l’une des
                    scènes d’origine les plus célèbres de l’histoire de Disney.
                    À partir de ces quelques liens, le Codex commence déjà à
                    raconter comment un imaginaire se fabrique, circule et
                    devient mémoire.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                    <PixieLink
                        href="/contributeurs/walt-disney"
                        variant="action"
                        color="jaune-lampe"
                        indicator="arrow"
                    >
                        Walt Disney
                    </PixieLink>

                    <PixieLink
                        href="/contributeurs/ub-iwerks"
                        variant="action"
                        color="jaune-lampe"
                        indicator="arrow"
                    >
                        Ub Iwerks
                    </PixieLink>

                    <PixieLink
                        href="/personnages/mickey-mouse"
                        variant="action"
                        color="rouge-crayon"
                        indicator="arrow"
                    >
                        Mickey Mouse
                    </PixieLink>

                    <PixieLink
                        href="/personnages/minnie-mouse"
                        variant="action"
                        color="rouge-crayon"
                        indicator="arrow"
                    >
                        Minnie Mouse
                    </PixieLink>

                    <PixieLink
                        href="/oeuvres/steamboat-willie"
                        variant="action"
                        color="gouache"
                        indicator="arrow"
                    >
                        Steamboat Willie
                    </PixieLink>
                </div>
            </section>

            <footer className="mt-24 border-t border-line pt-8">
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-medium text-ink-soft">
                        Un projet de{" "}
                        <a
                            href="https://julienjulien.fr"
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent underline underline-offset-4 hover:text-accent-hover"
                        >
                            Julien Julien
                        </a>
                        .
                    </p>

                    <p className="max-w-2xl text-sm leading-6 text-muted">
                        Le Disneyiste est un projet éditorial personnel,
                        indépendant et non officiel. Il n’est affilié ni à The
                        Walt Disney Company ni à ses filiales, et n’est ni
                        approuvé ni sponsorisé par celles-ci.
                    </p>
                </div>
            </footer>
        </main>
    );
}
