import type { Metadata } from "next";
import Link from "next/link";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    fontBody,
    fontBrand,
    fontDisplay,
    fontEyebrow,
    fontMono,
} from "./fonts";
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
        <html
            lang="fr"
            data-projection="originale"
            data-lumiere="sombre"
            className={`${fontBrand.variable} ${fontDisplay.variable} ${fontBody.variable} ${fontEyebrow.variable} ${fontMono.variable}`}
        >
            <body className="grid grid-rows-[auto_1fr]">
                <header className="border-b border-line">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="group flex items-center gap-5"
                        >
                            <PixieSymbol
                                registry="general"
                                collection="logos"
                                slug="le-codex-du-disneyiste"
                                size="lg"
                                className="-my-1"
                            />

                            <span>
                                <span className="block text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                                    Le Disneyiste
                                </span>

                                <span className="mt-1 block font-brand font-semibold tracking-tight text-ink group-hover:underline group-hover:underline-offset-4">
                                    Le Codex
                                </span>
                            </span>
                        </Link>

                        <nav
                            aria-label="Navigation principale"
                            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                        >
                            <PixieLink
                                href="/personnages"
                                variant="action"
                                color="rouge-crayon"
                            >
                                Personnages
                            </PixieLink>

                            <PixieLink
                                href="/contributeurs"
                                variant="action"
                                color="jaune-lampe"
                            >
                                Créateurs
                            </PixieLink>

                            <PixieLink
                                href="/oeuvres"
                                variant="action"
                                color="gouache"
                            >
                                Œuvres
                            </PixieLink>

                            <PixieLink
                                href="/epoques"
                                variant="action"
                                color="vert-cellulo"
                            >
                                Époques
                            </PixieLink>

                            <PixieLink href="/recherche" variant="action">
                                Recherche
                            </PixieLink>
                        </nav>
                    </div>
                </header>

                {children}
            </body>
        </html>
    );
}
