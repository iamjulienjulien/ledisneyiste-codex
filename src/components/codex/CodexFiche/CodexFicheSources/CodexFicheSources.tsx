import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { PixieLink } from "@/components/ui/PixieLink";
import { formatDateISO } from "@/lib/date";
import { getSourceAnchorId } from "@/lib/source";
import styles from "./CodexFicheSources.module.css";
import type { CodexFicheSourcesProps } from "./CodexFicheSources.types";

export function CodexFicheSources({ sources }: CodexFicheSourcesProps) {
    if (sources.length === 0) {
        return null;
    }

    return (
        <CodexFicheSection titre="Sources et références">
            <ol className={styles.list}>
                {sources.map((source, index) => (
                    <li
                        key={source.id}
                        id={getSourceAnchorId(source.id)}
                        className={styles.source}
                    >
                        <span className={styles.number} aria-hidden="true">
                            {index + 1}
                        </span>

                        <div>
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
                                <PixieLink
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 inline-block text-sm underline underline-offset-4"
                                >
                                    Consulter la source
                                </PixieLink>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </CodexFicheSection>
    );
}
