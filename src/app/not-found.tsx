import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex items-center justify-center px-6 py-16">
            <section className="w-full max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted">
                    Erreur 404
                </p>

                <h1 className="mt-3 text-5xl text-ink sm:text-6xl">
                    Cette page s’est égarée hors du Codex.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
                    L’entrée que vous cherchez n’existe pas encore ou a été
                    déplacée. Elle s’est peut-être aventurée un peu trop loin
                    dans les archives.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/"
                        className="font-medium underline underline-offset-4"
                    >
                        Revenir à l’accueil
                    </Link>

                    <Link
                        href="/personnages"
                        className="font-medium underline underline-offset-4"
                    >
                        Explorer les personnages
                    </Link>

                    <Link
                        href="/contributeurs"
                        className="font-medium underline underline-offset-4"
                    >
                        Explorer les créateurs
                    </Link>

                    <Link
                        href="/oeuvres"
                        className="font-medium underline underline-offset-4"
                    >
                        Explorer les œuvres
                    </Link>
                </div>
            </section>
        </main>
    );
}
