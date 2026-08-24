import type { SymbolCollectionName, SymbolSlug } from "@/registry/symbols";

export type BlocEditorialCodex<
    Collection extends SymbolCollectionName<"blocs">,
> = {
    type: SymbolSlug<"blocs", Collection>;
    eyebrow?: string;
    titre: string;
    paragraphes: string[];
    sources?: string[];
};

export type FicheCodexBase<Collection extends SymbolCollectionName<"blocs">> = {
    slug: string;
    introduction: string;
    blocsEditoriaux?: BlocEditorialCodex<Collection>[];
    sources: string[];
};
