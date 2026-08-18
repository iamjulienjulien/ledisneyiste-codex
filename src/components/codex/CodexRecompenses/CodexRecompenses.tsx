import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { formatDateHistorique } from "@/lib/date";
import type { CodexRecompensesProps } from "@/types/codex-recompenses";
import styles from "./CodexRecompenses.module.css";

export function CodexRecompenses({
    recompenses,
    showWork = false,
}: CodexRecompensesProps) {
    if (recompenses.length === 0) {
        return null;
    }

    return (
        <section className={styles.root}>
            <header className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Palmarès
                </p>

                <h2 className="mt-3 text-3xl text-ink">Récompenses</h2>

                <p className="mt-3 leading-7 text-ink-soft">
                    Les distinctions attribuées par une institution à cette
                    œuvre ou à cette figure du Codex.
                </p>
            </header>

            <ul className={styles.list}>
                {recompenses.map((recompense) => (
                    <li key={recompense.id} className={styles.item}>
                        <div className={styles.heading}>
                            <div>
                                <p className="text-sm text-muted">
                                    {recompense.institution.nom}
                                    {recompense.institution.abreviation &&
                                        ` · ${recompense.institution.abreviation}`}
                                </p>

                                <h3 className="mt-2 text-2xl text-ink">
                                    {recompense.categorie ?? recompense.motif}
                                </h3>
                            </div>

                            <PixieBadge
                                registry="recompenses"
                                collection="natures"
                                slug={recompense.nature}
                                size="sm"
                                shape="pill"
                            />
                        </div>

                        {recompense.categorie && recompense.motif && (
                            <p className="mt-4 leading-7 text-ink-soft">
                                {recompense.motif}
                            </p>
                        )}

                        <dl className={styles.details}>
                            <div>
                                <dt>Édition</dt>
                                <dd>{recompense.edition.nom}</dd>
                            </div>

                            <div>
                                <dt>Attribution</dt>
                                <dd>
                                    {formatDateHistorique(
                                        recompense.dateAttribution,
                                    )}
                                </dd>
                            </div>

                            <div>
                                <dt>Bénéficiaires</dt>
                                <dd className={styles.references}>
                                    {recompense.beneficiaires.map(
                                        (beneficiaire) => (
                                            <CodexReferenceLink
                                                key={`${beneficiaire.type ?? "mention"}-${beneficiaire.nom}`}
                                                reference={beneficiaire}
                                            />
                                        ),
                                    )}
                                </dd>
                            </div>

                            {showWork && recompense.oeuvreConcernee && (
                                <div>
                                    <dt>Œuvre concernée</dt>
                                    <dd>
                                        <CodexReferenceLink
                                            reference={
                                                recompense.oeuvreConcernee
                                            }
                                        />
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </li>
                ))}
            </ul>
        </section>
    );
}
