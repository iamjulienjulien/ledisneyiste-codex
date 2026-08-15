import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
            <section className="w-full max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
                    Le Codex du Disneyiste
                </p>

                <p className="mt-8 text-sm font-medium text-neutral-500">
                    Erreur 404
                </p>

                <h1 className="mt-3 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
                    Cette page s’est égarée hors du Codex.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                    L’entrée que vous cherchez n’existe pas encore, a été
                    déplacée ou s’est aventurée un peu trop loin dans les
                    archives.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                        href="/"
                        className="font-medium underline underline-offset-4"
                    >
                        Retourner à l’accueil
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
                        Explorer les contributeurs
                    </Link>
                </div>
            </section>
        </main>
    );
}
