import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { CodexFicheSourceCitations } from "@/components/codex/CodexFiche/CodexFicheSourceCitations";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
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
                key={bloc.titre}
                eyebrow={bloc.eyebrow}
                titre={bloc.titre}
                symbole={<PixieSymbol {...symbolSelection} size="lg" />}
            >
                <div className={styles.body}>
                    {bloc.paragraphes.map((paragraphe, index) => (
                        <p
                            key={index}
                            className="text-lg leading-8 text-ink-soft"
                        >
                            {paragraphe}
                        </p>
                    ))}

                    <CodexFicheSourceCitations
                        sourceIds={bloc.sources}
                        sources={sources}
                        label="Sources du chapitre"
                    />
                </div>
            </CodexFicheSection>
        );
    });
}
