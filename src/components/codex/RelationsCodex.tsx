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
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Relations
            </p>

            <h2 className="mt-3 text-3xl text-ink">Dans le Codex</h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {groupesVisibles.map((groupe) => (
                    <div key={groupe.titre}>
                        <h3 className="text-sm font-medium text-muted">
                            {groupe.titre}
                        </h3>

                        <ul className="mt-3 space-y-2">
                            {groupe.references.map((reference) => (
                                <li
                                    key={`${reference.type ?? "mention"}-${reference.nom}`}
                                    className="text-lg"
                                >
                                    <ReferenceCodexLink reference={reference} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
