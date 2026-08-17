import type { Metadata } from "next";
import Link from "next/link";
import { contributeurs } from "@/data/catalogues";

export const metadata: Metadata = {
    title: "Créateurs",
    description:
        "Explorer celles et ceux qui ont imaginé, construit et transformé Disney.",
};

export default function ContributeursPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="max-w-2xl">
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
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-muted">
                    {contributeurs.length}{" "}
                    {contributeurs.length > 1 ? "créateurs" : "créateur"}
                </p>

                <ul className="mt-6 divide-y divide-line">
                    {contributeurs.map((contributeur) => (
                        <li key={contributeur.slug}>
                            <Link
                                href={`/contributeurs/${contributeur.slug}`}
                                className="group block py-6"
                            >
                                <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-createurs">
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
