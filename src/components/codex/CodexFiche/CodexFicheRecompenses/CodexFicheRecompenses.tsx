import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import styles from "./CodexFicheRecompenses.module.css";
import type { CodexFicheRecompensesProps } from "./CodexFicheRecompenses.types";

export function CodexFicheRecompenses({
    recompenses,
    showWork = false,
}: CodexFicheRecompensesProps) {
    if (recompenses.length === 0) {
        return null;
    }

    return (
        <CodexFicheSection
            eyebrow="Palmarès"
            titre="Récompenses"
            description="Les distinctions attribuées par une institution à cette œuvre ou à cette figure du Codex."
            symbole={
                <PixieSymbol
                    registry="general"
                    collection="evenements"
                    slug="trophee-generique"
                    size={96}
                />
            }
        >
            <ul className={styles.list}>
                {recompenses.map((recompense) => (
                    <li key={recompense.id} className={styles.item}>
                        <div className={styles.heading}>
                            <div className={styles.identity}>
                                <PixieSymbol
                                    registry="recompenses"
                                    collection="trophees"
                                    slug={recompense.trophee}
                                    size="lg"
                                />

                                <div>
                                    <p className="text-sm text-muted">
                                        {recompense.institution.nom}
                                        {recompense.institution.abreviation &&
                                            ` · ${recompense.institution.abreviation}`}
                                    </p>

                                    <h3 className="mt-2 text-2xl text-ink">
                                        {recompense.categorie ??
                                            recompense.motif}
                                    </h3>
                                </div>
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

                        <div className={styles.detailsBoundary}>
                            <PixieSeparator
                                variant="fade"
                                position="start"
                                spacing="none"
                                decorative
                            />
                        </div>

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
                                            <CodexCommonReferenceLink
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
                                        <CodexCommonReferenceLink
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
        </CodexFicheSection>
    );
}
