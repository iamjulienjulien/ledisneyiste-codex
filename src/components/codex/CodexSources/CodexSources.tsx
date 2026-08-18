import { PixieSeparator } from "@/components/ui/PixieSeparator";
import type { CodexSourcesProps } from "@/types/source";
import { formatDateISO } from "@/lib/date";
import styles from "./CodexSources.module.css";

export function CodexSources({ sources }: CodexSourcesProps) {
    if (sources.length === 0) {
        return null;
    }

    return (
        <section className={styles.root}>
            <PixieSeparator
                variant="beam"
                spacing="none"
                style={{
                    color: "var(--codex-fiche-color, var(--color-accent))",
                }}
                decorative
            />

            <h2 className={styles.title}>Sources et références</h2>

            <ol className="mt-6 space-y-4">
                {sources.map((source) => (
                    <li key={source.id}>
                        <p className="font-medium">{source.titre}</p>

                        <p className="mt-1 text-sm text-muted">
                            {[
                                source.auteur,
                                source.editeur,
                                source.datePublication &&
                                    formatDateISO(source.datePublication),
                            ]
                                .filter(Boolean)
                                .join(" · ")}
                        </p>

                        {source.url && (
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block text-sm underline underline-offset-4"
                            >
                                Consulter la source
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
