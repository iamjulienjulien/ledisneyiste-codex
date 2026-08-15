import Link from "next/link";
import { contributeurs } from "@/data/catalogues";

export default function ContributeursPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
            <header>
                <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
                    Le Codex du Disneyiste
                </p>

                <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                    Contributeurs
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                    Les femmes et les hommes qui ont imaginé, construit et
                    transformé Disney.
                </p>
            </header>

            <ul className="mt-12 space-y-4">
                {contributeurs.map((contributeur) => (
                    <li key={contributeur.slug}>
                        <Link
                            href={`/contributeurs/${contributeur.slug}`}
                            className="text-xl font-medium hover:underline"
                        >
                            {contributeur.nom}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
