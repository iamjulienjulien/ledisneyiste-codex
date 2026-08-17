import type { Metadata } from "next";
import Link from "next/link";
import { personnages } from "@/data/catalogues";

export const metadata: Metadata = {
    title: "Personnages",
    description:
        "Explorer les figures fictives qui peuplent les récits et les imaginaires Disney.",
};

export default function PersonnagesPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <header className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-famille-personnages">
                    Explorer le Codex
                </p>

                <h1 className="mt-3 text-5xl text-famille-personnages">
                    Personnages
                </h1>

                <p className="mt-6 text-lg leading-8 text-ink-soft">
                    Les figures fictives qui peuplent les récits et les
                    imaginaires Disney.
                </p>
            </header>

            <section className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-muted">
                    {personnages.length}{" "}
                    {personnages.length > 1 ? "personnages" : "personnage"}
                </p>

                <ul className="mt-6 divide-y divide-line">
                    {personnages.map((personnage) => (
                        <li key={personnage.slug}>
                            <Link
                                href={`/personnages/${personnage.slug}`}
                                className="group block py-6"
                            >
                                <h2 className="text-2xl text-ink transition-colors group-hover:text-famille-personnages">
                                    {personnage.nom}
                                </h2>

                                {personnage.sousTitre && (
                                    <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                                        {personnage.sousTitre}
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
