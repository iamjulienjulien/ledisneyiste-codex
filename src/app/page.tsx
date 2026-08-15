import Link from "next/link";
import { contributeurs, personnages } from "@/data/catalogues";

export default function Home() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 sm:py-24">
            <header className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
                    Le Disneyiste
                </p>

                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-7xl">
                    Le Codex du Disneyiste
                </h1>

                <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-600">
                    Un atlas éditorial pour explorer, relier et raconter les
                    imaginaires Disney.
                </p>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-700">
                    Œuvres, personnages, créateurs, lieux et histoires se
                    croisent ici pour documenter Disney comme phénomène
                    culturel, mémoire collective et fabrique d’imaginaires.
                </p>
            </header>

            <section className="mt-20">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                        Explorer
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                        Deux premières portes
                    </h2>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Link
                        href="/personnages"
                        className="group border border-neutral-200 p-6 transition-colors hover:border-neutral-400"
                    >
                        <p className="text-sm text-neutral-500">
                            {personnages.length}{" "}
                            {personnages.length > 1
                                ? "personnages"
                                : "personnage"}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Personnages
                        </h3>

                        <p className="mt-3 leading-7 text-neutral-600">
                            Les figures fictives qui peuplent les récits et les
                            imaginaires Disney.
                        </p>

                        <p className="mt-6 font-medium group-hover:underline group-hover:underline-offset-4">
                            Explorer les personnages →
                        </p>
                    </Link>

                    <Link
                        href="/contributeurs"
                        className="group border border-neutral-200 p-6 transition-colors hover:border-neutral-400"
                    >
                        <p className="text-sm text-neutral-500">
                            {contributeurs.length}{" "}
                            {contributeurs.length > 1
                                ? "contributeurs"
                                : "contributeur"}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                            Contributeurs
                        </h3>

                        <p className="mt-3 leading-7 text-neutral-600">
                            Les femmes et les hommes qui ont imaginé, construit
                            et transformé Disney.
                        </p>

                        <p className="mt-6 font-medium group-hover:underline group-hover:underline-offset-4">
                            Explorer les contributeurs →
                        </p>
                    </Link>
                </div>
            </section>

            <section className="mt-20 border-t border-neutral-200 pt-12">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                    Aux origines
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    Un homme et une souris
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
                    Le Codex s’ouvre avec deux figures qui se répondent : Walt
                    Disney et Mickey Mouse, le créateur et la créature, l’homme
                    historique et le personnage devenu symbole.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                    <Link
                        href="/contributeurs/walt-disney"
                        className="font-medium underline underline-offset-4"
                    >
                        Walt Disney →
                    </Link>

                    <Link
                        href="/personnages/mickey-mouse"
                        className="font-medium underline underline-offset-4"
                    >
                        Mickey Mouse →
                    </Link>
                </div>
            </section>

            <footer className="mt-24 border-t border-neutral-200 pt-8">
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-medium text-neutral-700">
                        Un projet de{" "}
                        <a
                            href="https://julienjulien.fr"
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4"
                        >
                            Julien Julien
                        </a>
                        .
                    </p>

                    <p className="max-w-2xl text-sm leading-6 text-neutral-500">
                        Le Disneyiste est un projet éditorial personnel,
                        indépendant et non officiel. Il n’est ni affilié, ni
                        approuvé, ni sponsorisé par The Walt Disney Company ou
                        ses filiales.
                    </p>
                </div>
            </footer>
        </main>
    );
}
