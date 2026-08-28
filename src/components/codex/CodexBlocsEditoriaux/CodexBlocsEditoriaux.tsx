import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import { CodexSourceCitations } from "@/components/codex/CodexSourceCitations";
import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { SymbolCollectionName, SymbolSelection } from "@/registry/symbols";
import type { CodexBlocsEditoriauxProps } from "./CodexBlocsEditoriaux.types";
import styles from "./CodexBlocsEditoriaux.module.css";

export function CodexBlocsEditoriaux<
    Collection extends SymbolCollectionName<"blocs">,
>({ collection, blocs, sources }: CodexBlocsEditoriauxProps<Collection>) {
    if (!blocs?.length) {
        return null;
    }

    return blocs.map((bloc) => {
        const symbolSelection = {
            registry: "blocs",
            collection,
            slug: bloc.type,
        } as SymbolSelection;

        return (
            <PixieContainer key={bloc.titre} width="56" gutter="none">
                <CodexFicheSection
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

                        <CodexSourceCitations
                            sourceIds={bloc.sources}
                            sources={sources}
                            label="Sources du chapitre"
                        />
                    </div>
                </CodexFicheSection>
            </PixieContainer>
        );
    });
}
