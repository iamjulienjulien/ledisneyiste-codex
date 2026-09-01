import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./AtelierLayout.module.css";

export const metadata: Metadata = {
    title: "L’Atelier · Projection privée",
    description:
        "L’espace de travail où les composants du Codex passent de l’esquisse à la version projetable.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AtelierLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    return (
        <main
            className={`${styles.root} mx-auto w-full max-w-6xl px-6 py-10 sm:py-14`}
        >
            <header className="border-b border-line pb-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.24em] text-accent">
                            Projection privée
                        </p>

                        <Link
                            href="/atelier"
                            className="mt-2 inline-block font-display text-3xl font-semibold tracking-tight text-ink hover:text-accent sm:text-4xl"
                        >
                            L’Atelier
                        </Link>

                        <p className="mt-3 max-w-xl leading-7 text-ink-soft">
                            Là où les composants passent de l’esquisse à la
                            version projetable.
                        </p>
                    </div>
                </div>

                <nav
                    aria-label="Navigation de l’Atelier"
                    className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
                >
                    <Link
                        href="/atelier#programme"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Programme
                    </Link>
                    <Link
                        href="/atelier#pellicule"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        La Pellicule
                    </Link>
                    <Link
                        href="/atelier#accessoires"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Accessoires
                    </Link>
                    <Link
                        href="/atelier#decors"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Décors
                    </Link>
                    <Link
                        href="/atelier#dialogues"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Dialogues
                    </Link>
                    <Link
                        href="/atelier#montage"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Le Montage
                    </Link>
                    <Link
                        href="/atelier#effets"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Effets
                    </Link>
                    <Link
                        href="/atelier#plans"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Plans
                    </Link>
                    <Link
                        href="/guidebook/bienvenue"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Le Guidebook
                    </Link>
                </nav>
            </header>

            {children}
        </main>
    );
}
