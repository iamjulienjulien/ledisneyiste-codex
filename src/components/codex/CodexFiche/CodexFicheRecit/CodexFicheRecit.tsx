import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { deriveCartePreuvesEditoriale } from "@/lib/fiche-editoriale";
import { getSourceAnchorId } from "@/lib/source";
import type { SymbolCollectionName } from "@/registry/symbols";
import type { SourceCodex } from "@/types/source";
import styles from "./CodexFicheRecit.module.css";
import type { CodexFicheRecitProps } from "./CodexFicheRecit.types";

function getSourceEntries(sources: readonly SourceCodex[]) {
    return new Map(
        sources.map((source, index) => [
            source.id,
            { source, number: index + 1 },
        ]),
    );
}

export function CodexFicheRecit<
    Collection extends SymbolCollectionName<"index">,
>({ blocs, sources, children }: CodexFicheRecitProps<Collection>) {
    const cartePreuves = deriveCartePreuvesEditoriale(blocs);
    const sourceEntries = getSourceEntries(sources);

    return (
        <>
            <CodexFicheSection
                id="sommaire-du-recit"
                eyebrow="Parcours éditorial"
                titre="Le récit en huit chapitres"
                description="Chaque chapitre pose sa question, mène à ses preuves et conserve ses réserves documentaires."
            >
                <PixiePanel
                    variant="tinted"
                    padding="lg"
                    color="violet-ombre-portee"
                    className={styles.navigationPanel}
                >
                    <nav aria-label="Les huit chapitres du récit de Pinocchio">
                        <div className={styles.navigationHeader}>
                            <div>
                                <p className={styles.navigationEyebrow}>
                                    Programme du récit
                                </p>
                                <p className={styles.navigationTitle}>
                                    De la nouvelle épreuve au prochain vertige
                                </p>
                            </div>

                            <p className={styles.navigationCount}>
                                {cartePreuves.length} chapitres ·{" "}
                                {cartePreuves.reduce(
                                    (total, entree) =>
                                        total + entree.nombreParagraphes,
                                    0,
                                )}{" "}
                                unités de preuve
                            </p>
                        </div>

                        <ol className={styles.chapterList}>
                            {cartePreuves.map((entree, index) => (
                                <li key={entree.id}>
                                    <PixieLink
                                        href={`#${entree.id}`}
                                        indicator="none"
                                        className={styles.chapterLink}
                                    >
                                        <span className={styles.chapterNumber}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className={styles.chapterCopy}>
                                            <span
                                                className={styles.chapterTitle}
                                            >
                                                {entree.titre}
                                            </span>
                                            {entree.question ? (
                                                <span
                                                    className={
                                                        styles.chapterQuestion
                                                    }
                                                >
                                                    {entree.question}
                                                </span>
                                            ) : null}
                                        </span>
                                    </PixieLink>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </PixiePanel>
            </CodexFicheSection>

            {children}

            <CodexFicheSection
                id="carte-des-preuves"
                eyebrow="Lecture synthétique"
                titre="La carte des preuves"
                description="Le récit complet reste vérifiable sous une forme tabulaire, sans dépendre de sa mise en scène ni d’une interaction."
            >
                <PixiePanel
                    variant="outline"
                    padding="lg"
                    color="violet-ombre-portee"
                    className={styles.tablePanel}
                >
                    <div
                        className={styles.tableViewport}
                        role="region"
                        aria-label="Carte des preuves du récit de Pinocchio"
                        tabIndex={0}
                    >
                        <table className={styles.table}>
                            <caption className={styles.tableCaption}>
                                Huit chapitres, leurs questions, leurs preuves
                                et leurs réserves
                            </caption>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th scope="col">Chapitre</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Preuves</th>
                                    <th scope="col">Réserves</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartePreuves.map((entree, index) => {
                                    const preuves = entree.sourceIds.flatMap(
                                        (sourceId) => {
                                            const entry =
                                                sourceEntries.get(sourceId);
                                            return entry ? [entry] : [];
                                        },
                                    );

                                    return (
                                        <tr key={entree.id}>
                                            <td className={styles.chapterCell}>
                                                <PixieLink
                                                    href={`#${entree.id}`}
                                                    indicator="anchor"
                                                    className={
                                                        styles.chapterCellLink
                                                    }
                                                >
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                    . {entree.titre}
                                                </PixieLink>
                                                <span
                                                    className={
                                                        styles.chapterMeta
                                                    }
                                                >
                                                    {entree.nombreParagraphes}{" "}
                                                    unités de preuve
                                                </span>
                                            </td>
                                            <td className={styles.questionCell}>
                                                {entree.question ?? "—"}
                                            </td>
                                            <td className={styles.proofCell}>
                                                {preuves.length > 0 ? (
                                                    <ol
                                                        className={
                                                            styles.proofList
                                                        }
                                                    >
                                                        {preuves.map(
                                                            ({
                                                                source,
                                                                number,
                                                            }) => (
                                                                <li
                                                                    key={
                                                                        source.id
                                                                    }
                                                                >
                                                                    <PixieLink
                                                                        href={`#${getSourceAnchorId(source.id)}`}
                                                                        indicator="anchor"
                                                                        className={
                                                                            styles.proofLink
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={
                                                                                styles.proofNumber
                                                                            }
                                                                        >
                                                                            [
                                                                            {
                                                                                number
                                                                            }
                                                                            ]
                                                                        </span>
                                                                        {
                                                                            source.titre
                                                                        }
                                                                    </PixieLink>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ol>
                                                ) : (
                                                    <span
                                                        className={styles.empty}
                                                    >
                                                        Aucune preuve reliée
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                {entree.reserves.length > 0 ? (
                                                    <ul
                                                        className={
                                                            styles.reserveList
                                                        }
                                                    >
                                                        {entree.reserves.map(
                                                            (reserve) => (
                                                                <li
                                                                    key={
                                                                        reserve.paragrapheId
                                                                    }
                                                                >
                                                                    <PixieLink
                                                                        href={`#${reserve.paragrapheId}`}
                                                                        indicator="anchor"
                                                                        className={
                                                                            styles.reserveLink
                                                                        }
                                                                    >
                                                                        Relire
                                                                        la
                                                                        réserve
                                                                    </PixieLink>
                                                                    <span
                                                                        className={
                                                                            styles.reserveText
                                                                        }
                                                                    >
                                                                        {
                                                                            reserve.texte
                                                                        }
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <span
                                                        className={styles.empty}
                                                    >
                                                        Aucune réserve
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </PixiePanel>
            </CodexFicheSection>
        </>
    );
}
