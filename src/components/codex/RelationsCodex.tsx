import ReferenceCodexLink from "@/components/codex/ReferenceCodexLink";
import type { ReferenceCodex } from "@/types/reference";

type GroupeRelationsCodex = {
    titre: string;
    references: ReferenceCodex[];
};

type RelationsCodexProps = {
    groupes: GroupeRelationsCodex[];
};

export default function RelationsCodex({ groupes }: RelationsCodexProps) {
    const groupesVisibles = groupes.filter(
        (groupe) => groupe.references.length > 0,
    );

    if (groupesVisibles.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-line pt-8">
            <header className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Relations
                </p>

                <h2 className="mt-3 text-3xl text-ink">Dans le Codex</h2>

                <p className="mt-3 leading-7 text-ink-soft">
                    Les entrées qui se croisent avec celle-ci à travers les
                    données du Codex.
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
                                    <ReferenceCodexLink reference={reference} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    );
}
