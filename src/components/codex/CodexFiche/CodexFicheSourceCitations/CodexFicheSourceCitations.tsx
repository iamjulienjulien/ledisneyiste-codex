import { PixieLink } from "@/components/ui/PixieLink";
import { getSourceAnchorId } from "@/lib/source";
import styles from "./CodexFicheSourceCitations.module.css";
import type { CodexFicheSourceCitationsProps } from "./CodexFicheSourceCitations.types";

export function CodexFicheSourceCitations({
    sourceIds,
    sources,
    label = "Sources",
}: CodexFicheSourceCitationsProps) {
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
                        <PixieLink
                            href={`#${getSourceAnchorId(source.id)}`}
                            className={styles.link}
                            aria-label={`Source ${number} : ${source.titre}`}
                            title={source.titre}
                        >
                            {number}
                        </PixieLink>
                    </li>
                ))}
            </ol>
        </aside>
    );
}
