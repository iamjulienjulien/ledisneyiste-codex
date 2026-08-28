import type { SymbolCollectionName } from "@/registry/symbols";
import type { BlocEditorialCodex } from "@/types/fiche";
import type { SourceCodex } from "@/types/source";

export type CodexBlocsEditoriauxProps<
    Collection extends SymbolCollectionName<"blocs">,
> = Readonly<{
    collection: Collection;
    blocs?: readonly BlocEditorialCodex<Collection>[];
    sources: readonly SourceCodex[];
}>;
