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
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
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

                    <div className="flex items-center gap-3 self-start border border-line bg-surface px-4 py-3 text-sm text-ink-soft lg:self-auto">
                        <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-accent"
                        />
                        Atelier local · Hors production
                    </div>
                </div>

                <nav
                    aria-label="Navigation de l’Atelier"
                    className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
                >
                    <a
                        href="#programme"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Programme
                    </a>
                    <a
                        href="#pellicule"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        La Pellicule
                    </a>
                    <a
                        href="#accessoires"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Accessoires
                    </a>
                    <a
                        href="#decors"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Décors
                    </a>
                    <a
                        href="#dialogues"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Les Dialogues
                    </a>
                    <a
                        href="#montage"
                        className="font-medium text-ink-soft underline-offset-4 hover:text-accent hover:underline"
                    >
                        Le Montage
                    </a>
                </nav>
            </header>

            {children}
        </main>
    );
}
