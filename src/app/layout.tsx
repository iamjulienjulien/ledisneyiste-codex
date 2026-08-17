import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Le Codex du Disneyiste",
        template: "%s · Le Codex du Disneyiste",
    },
    description:
        "Un atlas éditorial pour explorer, relier et raconter les imaginaires Disney.",
    applicationName: "Le Codex du Disneyiste",
    authors: [
        {
            name: "Julien Julien",
            url: "https://julienjulien.fr",
        },
    ],
    creator: "Julien Julien",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" data-projection="originale" data-lumiere="sombre">
            <body className="grid grid-rows-[auto_1fr]">
                <header className="border-b border-line">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <Link href="/" className="group">
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                                Le Disneyiste
                            </p>

                            <p className="mt-1 font-display font-semibold tracking-tight text-ink group-hover:underline group-hover:underline-offset-4">
                                Le Codex
                            </p>
                        </Link>

                        <nav
                            aria-label="Navigation principale"
                            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                        >
                            <Link
                                href="/personnages"
                                className="text-ink-soft transition-colors hover:text-accent"
                            >
                                Personnages
                            </Link>

                            <Link
                                href="/contributeurs"
                                className="text-ink-soft transition-colors hover:text-accent"
                            >
                                Créateurs
                            </Link>

                            <Link
                                href="/oeuvres"
                                className="text-ink-soft transition-colors hover:text-accent"
                            >
                                Œuvres
                            </Link>

                            <Link
                                href="/epoques"
                                className="text-ink-soft transition-colors hover:text-accent"
                            >
                                Époques
                            </Link>
                        </nav>
                    </div>
                </header>

                {children}
            </body>
        </html>
    );
}
