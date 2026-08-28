import { getSourceAnchorId } from "@/lib/source";
import styles from "./CodexSourceCitations.module.css";
import type { CodexSourceCitationsProps } from "./CodexSourceCitations.types";

export function CodexSourceCitations({
    sourceIds,
    sources,
    label = "Sources",
}: CodexSourceCitationsProps) {
    if (!sourceIds?.length) {
        return null;
    }

    const sourceEntries = new Map(
        sources.map((source, index) => [
            source.id,
            { source, number: index + 1 },
        ]),
    );
    const citations = [...new Set(sourceIds)].flatMap((sourceId) => {
        const entry = sourceEntries.get(sourceId);

        return entry ? [entry] : [];
    });

    if (citations.length === 0) {
        return null;
    }

    return (
        <aside className={styles.root} aria-label={label}>
            <p className={styles.label}>{label}</p>

            <ol className={styles.list}>
                {citations.map(({ source, number }) => (
                    <li key={source.id}>
                        <a
                            href={`#${getSourceAnchorId(source.id)}`}
                            className={styles.link}
                            aria-label={`Source ${number} : ${source.titre}`}
                            title={source.titre}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ol>
        </aside>
    );
}
