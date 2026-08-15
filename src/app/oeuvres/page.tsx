import type { Metadata } from "next";
import Link from "next/link";
import { oeuvres } from "@/data/catalogues";

export const metadata: Metadata = {
    title: "Œuvres",
    description:
        "Explorer les films, courts métrages et créations qui composent les imaginaires Disney.",
};

export default function OeuvresPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Le Codex du Disneyiste
                </p>

                <h1 className="mt-4 text-5xl text-ink">Œuvres</h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
                    Les films, courts métrages et créations qui donnent forme
                    aux récits et aux imaginaires Disney.
                </p>
            </header>

            <ul className="mt-12 space-y-4">
                {oeuvres.map((oeuvre) => (
                    <li key={oeuvre.slug}>
                        <Link
                            href={`/oeuvres/${oeuvre.slug}`}
                            className="text-xl font-medium text-ink hover:text-accent"
                        >
                            {oeuvre.nom}
                        </Link>

                        {oeuvre.sousTitre && (
                            <p className="mt-1 text-ink-soft">
                                {oeuvre.sousTitre}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}
