import type { SourceCodex } from "@/types/source";
import { formatDateISO } from "@/lib/date";

type SourcesCodexProps = {
    sources: SourceCodex[];
};

export default function SourcesCodex({ sources }: SourcesCodexProps) {
    if (sources.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-line pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                Sources et références
            </h2>

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
