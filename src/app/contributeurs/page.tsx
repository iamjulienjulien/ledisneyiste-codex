import type { Metadata } from "next";
import Link from "next/link";
import { contributeurs } from "@/data/catalogues";

export const metadata: Metadata = {
    title: "Contributeurs",
    description:
        "Explorer les femmes et les hommes qui ont imaginé, construit et transformé Disney.",
};

export default function ContributeursPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 sm:py-20">
            <header className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Explorer le Codex
                </p>

                <h1 className="mt-3 text-5xl text-ink">Contributeurs</h1>

                <p className="mt-6 text-lg leading-8 text-ink-soft">
                    Les femmes et les hommes qui ont imaginé, construit et
                    transformé Disney.
                </p>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-muted">
                    {contributeurs.length}{" "}
                    {contributeurs.length > 1
                        ? "contributeurs"
                        : "contributeur"}
                </p>

                <ul className="mt-6 divide-y divide-line">
                    {contributeurs.map((contributeur) => (
                        <li key={contributeur.slug}>
                            <Link
                                href={`/contributeurs/${contributeur.slug}`}
                                className="group block py-6"
                            >
                                <h2 className="text-2xl text-ink transition-colors group-hover:text-accent">
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
            </section>
        </main>
    );
}
