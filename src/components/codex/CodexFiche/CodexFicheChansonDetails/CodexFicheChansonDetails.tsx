import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { PixieCard } from "@/components/ui/PixieCard";
import { formatDateHistorique } from "@/lib/date";
import styles from "./CodexFicheChansonDetails.module.css";
import type { CodexFicheChansonDetailsProps } from "./CodexFicheChansonDetails.types";

const roleLabels = {
    composition: "Composition",
    paroles: "Paroles",
    traduction: "Traduction",
    "adaptation-lyrique": "Adaptation lyrique",
} as const;

export function CodexFicheChansonDetails({
    fiche,
}: CodexFicheChansonDetailsProps) {
    return (
        <>
            <CodexFicheSection
                eyebrow="Générique"
                titre="La chanson et ses auteurs"
                description="Les attributions documentées qui donnent sa forme à la chanson."
            >
                <div className={styles.grid}>
                    {fiche.auteurs.map((auteur) => (
                        <PixieCard
                            key={`${auteur.personne.nom}-${auteur.roles.join("-")}`}
                            variant="tinted"
                            color="rose-aerographe"
                            padding="md"
                        >
                            <p className={styles.label}>
                                {auteur.roles
                                    .map((role) => roleLabels[role])
                                    .join(" · ")}
                            </p>
                            <p className="mt-3 text-lg font-semibold text-ink">
                                <CodexCommonReferenceLink
                                    reference={auteur.personne}
                                />
                            </p>
                        </PixieCard>
                    ))}
                </div>
            </CodexFicheSection>

            <CodexFicheSection
                eyebrow="Occurrences"
                titre="Dans les œuvres"
                description="Chaque apparition reste rattachée à une version, une date et une fonction documentée."
            >
                <div className={styles.list}>
                    {fiche.occurrences.map((occurrence) => (
                        <PixieCard
                            key={occurrence.id}
                            variant="outline"
                            color="rose-aerographe"
                            padding="md"
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-3">
                                <p className="text-xl font-semibold text-ink">
                                    {occurrence.oeuvre.type === "oeuvre" ? (
                                        <CodexCommonReferenceLink
                                            reference={occurrence.oeuvre}
                                        />
                                    ) : (
                                        occurrence.oeuvre.nom
                                    )}
                                </p>
                                {occurrence.date ? (
                                    <p className="text-sm text-muted">
                                        {formatDateHistorique(occurrence.date)}
                                    </p>
                                ) : null}
                            </div>
                            {occurrence.fonctionNarrative ? (
                                <p className="mt-4 leading-7 text-ink-soft">
                                    {occurrence.fonctionNarrative}
                                </p>
                            ) : null}
                        </PixieCard>
                    ))}
                </div>
            </CodexFicheSection>
        </>
    );
}
