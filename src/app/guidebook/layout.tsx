import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PixieLink } from "@/components/ui/PixieLink";
import styles from "./GuidebookLayout.module.css";

export const metadata: Metadata = {
    title: {
        default: "Le Guidebook",
        template: "%s · Le Guidebook",
    },
    description:
        "La bibliothèque de transmission privée du Codex du Disneyiste.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function GuidebookLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    return (
        <main className={styles.root}>
            <header className={styles.header}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>Transmission privée</p>
                    <p className={styles.title}>Le Guidebook</p>
                    <p className={styles.summary}>
                        Du prompt à la magie : les doctrines, les gestes et les
                        registres qui permettent aux agents de poursuivre le
                        Codex sans perdre son esprit.
                    </p>
                </div>

                <nav
                    aria-label="Navigation du Guidebook"
                    className={styles.navigation}
                >
                    <PixieLink
                        href="/guidebook/bienvenue"
                        variant="action"
                        indicator="arrow"
                    >
                        Guide local
                    </PixieLink>
                    <PixieLink
                        href="/guidebook/notion/le-disneyiste"
                        variant="action"
                        indicator="arrow"
                    >
                        Dossiers Notion
                    </PixieLink>
                    <PixieLink
                        href="/atelier"
                        variant="action"
                        indicator="back"
                    >
                        Retour à l’Atelier
                    </PixieLink>
                </nav>
            </header>

            <div className={styles.projection}>{children}</div>
        </main>
    );
}
