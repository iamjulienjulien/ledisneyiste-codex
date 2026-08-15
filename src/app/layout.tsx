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
        <html lang="fr">
            <body>
                <header className="border-b border-neutral-200">
                    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <Link href="/" className="group">
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                                Le Disneyiste
                            </p>

                            <p className="mt-1 font-semibold tracking-tight text-neutral-950 group-hover:underline group-hover:underline-offset-4">
                                Le Codex
                            </p>
                        </Link>

                        <nav
                            aria-label="Navigation principale"
                            className="flex items-center gap-6 text-sm"
                        >
                            <Link
                                href="/personnages"
                                className="text-neutral-600 hover:text-neutral-950"
                            >
                                Personnages
                            </Link>

                            <Link
                                href="/contributeurs"
                                className="text-neutral-600 hover:text-neutral-950"
                            >
                                Contributeurs
                            </Link>
                        </nav>
                    </div>
                </header>

                {children}
            </body>
        </html>
    );
}
