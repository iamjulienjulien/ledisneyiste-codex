import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { SymbolCollectionName, SymbolSelection } from "@/registry/symbols";
import type { BlocEditorialCodex } from "@/types/fiche";
import styles from "./CodexBlocsEditoriaux.module.css";

type CodexBlocsEditoriauxProps<
    Collection extends SymbolCollectionName<"blocs">,
> = {
    collection: Collection;
    blocs?: BlocEditorialCodex<Collection>[];
};

export function CodexBlocsEditoriaux<
    Collection extends SymbolCollectionName<"blocs">,
>({ collection, blocs }: CodexBlocsEditoriauxProps<Collection>) {
    if (!blocs?.length) {
        return null;
    }

    return blocs.map((bloc) => {
        const symbolSelection = bloc.type
            ? ({
                  registry: "blocs",
                  collection,
                  slug: bloc.type,
              } as SymbolSelection)
            : undefined;

        return (
            <CodexFicheSection
                key={bloc.titre}
                eyebrow={bloc.eyebrow}
                titre={bloc.titre}
                symbole={
                    symbolSelection ? (
                        <PixieSymbol {...symbolSelection} size="lg" />
                    ) : undefined
                }
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
                </div>
            </CodexFicheSection>
        );
    });
}
