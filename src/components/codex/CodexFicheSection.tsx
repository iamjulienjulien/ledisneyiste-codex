import type { ReactNode } from "react";

type CodexFicheSectionProps = {
    eyebrow?: string;
    titre?: string;
    description?: string;
    children: ReactNode;
};

export default function CodexFicheSection({
    eyebrow,
    titre,
    description,
    children,
}: CodexFicheSectionProps) {
    return (
        <section className="mt-16 border-t border-line pt-8">
            {(eyebrow || titre || description) && (
                <header className="max-w-2xl">
                    {eyebrow && (
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                            {eyebrow}
                        </p>
                    )}

                    {titre && (
                        <h2 className="mt-3 text-3xl text-ink">{titre}</h2>
                    )}

                    {description && (
                        <p className="mt-3 leading-7 text-ink-soft">
                            {description}
                        </p>
                    )}
                </header>
            )}

            <div className={titre || eyebrow || description ? "mt-8" : ""}>
                {children}
            </div>
        </section>
    );
}
