import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Le Codex du Disneyiste",
    description:
        "Un atlas éditorial pour explorer, relier et raconter les imaginaires Disney.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
