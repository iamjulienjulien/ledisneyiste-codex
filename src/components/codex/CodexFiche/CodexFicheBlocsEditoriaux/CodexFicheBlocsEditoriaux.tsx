import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { CodexFicheSourceCitations } from "@/components/codex/CodexFiche/CodexFicheSourceCitations";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    getBlocEditorialSourceIdsNonProjetes,
    isParagrapheEditorialStructure,
} from "@/lib/fiche-editoriale";
import type { SymbolCollectionName, SymbolSelection } from "@/registry/symbols";
import type { CodexFicheBlocsEditoriauxProps } from "./CodexFicheBlocsEditoriaux.types";
import styles from "./CodexFicheBlocsEditoriaux.module.css";

export function CodexFicheBlocsEditoriaux<
    Collection extends SymbolCollectionName<"index">,
>({ collection, blocs, sources }: CodexFicheBlocsEditoriauxProps<Collection>) {
    if (!blocs?.length) {
        return null;
    }

    return blocs.map((bloc) => {
        const symbolSelection = {
            registry: "index",
            collection,
            slug: bloc.type,
        } as SymbolSelection;

        return (
            <CodexFicheSection
                key={bloc.id ?? bloc.titre}
                id={bloc.id}
                eyebrow={bloc.eyebrow}
                titre={bloc.titre}
                description={bloc.question}
                symbole={<PixieSymbol {...symbolSelection} size="lg" />}
            >
                <div className={styles.body}>
                    {bloc.paragraphes.map((paragraphe, index) => {
                        if (!isParagrapheEditorialStructure(paragraphe)) {
                            return (
                                <p
                                    key={index}
                                    className="text-lg leading-8 text-ink-soft"
                                >
                                    {paragraphe}
                                </p>
                            );
                        }

                        return (
                            <div
                                key={paragraphe.id}
                                id={paragraphe.id}
                                className={styles.paragraphe}
                            >
                                <p className="text-lg leading-8 text-ink-soft">
                                    {paragraphe.texte}
                                </p>

                                {paragraphe.reserve ? (
                                    <PixieCallout
                                        variant="accent"
                                        padding="sm"
                                        color="violet-ombre-portee"
                                        eyebrow="Réserve documentaire"
                                        aria-label="Réserve documentaire"
                                    >
                                        <p>{paragraphe.reserve}</p>
                                    </PixieCallout>
                                ) : null}

                                <CodexFicheSourceCitations
                                    sourceIds={paragraphe.sources}
                                    sources={sources}
                                    label="Preuves du paragraphe"
                                />
                            </div>
                        );
                    })}

                    <CodexFicheSourceCitations
                        sourceIds={getBlocEditorialSourceIdsNonProjetes(bloc)}
                        sources={sources}
                        label="Sources du chapitre"
                    />
                </div>
            </CodexFicheSection>
        );
    });
}
