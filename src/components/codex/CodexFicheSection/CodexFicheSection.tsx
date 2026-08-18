import type { CodexFicheSectionProps } from "@/types/codex-fiche";
import styles from "./CodexFicheSection.module.css";

export function CodexFicheSection({
    eyebrow,
    titre,
    description,
    symbole,
    children,
}: CodexFicheSectionProps) {
    const hasHeader = Boolean(symbole || eyebrow || titre || description);

    return (
        <section className={styles.root}>
            {hasHeader && (
                <header
                    className={
                        symbole ? styles.headerWithSymbol : styles.header
                    }
                >
                    {symbole ? (
                        <div className={styles.symbol}>{symbole}</div>
                    ) : null}

                    <div>
                        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

                        {titre && (
                            <h2 className="mt-3 text-3xl text-ink">{titre}</h2>
                        )}

                        {description && (
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        )}
                    </div>
                </header>
            )}

            <div className={hasHeader ? "mt-8" : ""}>{children}</div>
        </section>
    );
}
