import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { CodexFicheFamily } from "@/types/codex-fiche";
import type { CodexRelationsProps } from "@/types/codex-relations";
import type { TypeReferenceCodex } from "@/types/reference";
import styles from "./CodexRelations.module.css";

const referenceFamilies = {
    personnage: "personnages",
    contributeur: "createurs",
    oeuvre: "oeuvres",
    epoque: "epoques",
} as const satisfies Record<TypeReferenceCodex, CodexFicheFamily>;

const familyOrder = {
    personnages: 0,
    createurs: 1,
    oeuvres: 2,
    epoques: 3,
} as const satisfies Record<CodexFicheFamily, number>;

export function CodexRelations({ groupes }: CodexRelationsProps) {
    const groupesVisibles = groupes.filter(
        (groupe) => groupe.references.length > 0,
    );

    groupesVisibles.sort(
        (premier, second) =>
            familyOrder[premier.family] - familyOrder[second.family],
    );

    if (groupesVisibles.length === 0) {
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

            <header className="mt-8 max-w-2xl">
                <p className={styles.eyebrow}>Relations</p>

                <h2 className="mt-3 text-3xl text-ink">Dans le Codex</h2>

                <p className="mt-3 leading-7 text-ink-soft">
                    Les entrées du Codex directement liées à celle-ci.
                </p>
            </header>

            <div className={styles.groups}>
                {groupesVisibles.map((groupe) => (
                    <section key={groupe.titre} className={styles.group}>
                        <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                            {groupe.titre}
                        </h3>

                        <ul className={styles.references}>
                            {groupe.references.map((reference) => {
                                const family = reference.type
                                    ? referenceFamilies[reference.type]
                                    : null;

                                return (
                                    <li
                                        key={`${reference.type ?? "mention"}-${reference.nom}`}
                                        className={styles.reference}
                                        data-reference-type={
                                            reference.type ?? "mention"
                                        }
                                    >
                                        {family ? (
                                            <PixieSymbol
                                                registry="codex"
                                                collection="index"
                                                slug={family}
                                                size="sm"
                                            />
                                        ) : null}

                                        <span className={styles.referenceLabel}>
                                            <CodexReferenceLink
                                                reference={reference}
                                            />
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    );
}
