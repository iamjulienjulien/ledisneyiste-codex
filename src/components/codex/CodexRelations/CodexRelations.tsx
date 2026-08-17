import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import type { ReferenceCodex } from "@/types/reference";
import styles from "./CodexRelations.module.css";

type CodexRelationsGroup = {
    titre: string;
    references: ReferenceCodex[];
};

type CodexRelationsProps = {
    groupes: CodexRelationsGroup[];
};

export function CodexRelations({ groupes }: CodexRelationsProps) {
    const groupesVisibles = groupes.filter(
        (groupe) => groupe.references.length > 0,
    );

    if (groupesVisibles.length === 0) {
        return null;
    }

    return (
        <section className={styles.root}>
            <header className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Relations
                </p>

                <h2 className="mt-3 text-3xl text-ink">Dans le Codex</h2>

                <p className="mt-3 leading-7 text-ink-soft">
                    Les entrées du Codex directement liées à celle-ci.
                </p>
            </header>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {groupesVisibles.map((groupe) => (
                    <section
                        key={groupe.titre}
                        className="border-l border-line pl-5"
                    >
                        <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                            {groupe.titre}
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {groupe.references.map((reference) => (
                                <li
                                    key={`${reference.type ?? "mention"}-${reference.nom}`}
                                    className="text-lg"
                                >
                                    <CodexReferenceLink reference={reference} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    );
}
