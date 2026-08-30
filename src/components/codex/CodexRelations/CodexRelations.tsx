import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { CodexFamily } from "@/types/codex";
import type { CodexRelationsProps } from "@/types/codex-relations";
import type { TypeReferenceCodex } from "@/types/reference";
import styles from "./CodexRelations.module.css";

const referenceFamilies = {
    personnage: "personnages",
    contributeur: "createurs",
    oeuvre: "oeuvres",
    epoque: "epoques",
} as const satisfies Record<TypeReferenceCodex, CodexFamily>;

const familyOrder = {
    personnages: 0,
    createurs: 1,
    oeuvres: 2,
    epoques: 3,
} as const satisfies Record<CodexFamily, number>;

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
        <CodexFicheSection
            eyebrow="Relations"
            titre="Dans le Codex"
            description="Les entrées du Codex directement liées à celle-ci."
        >
            <div className={styles.groups}>
                {groupesVisibles.map((groupe) => (
                    <section key={groupe.titre} className={styles.group}>
                        <h3 className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
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
                                                registry="index"
                                                collection={family}
                                                slug="principal"
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
        </CodexFicheSection>
    );
}
