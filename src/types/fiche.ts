import type { SymbolCollectionName, SymbolSlug } from "@/registry/symbols";

export type BlocEditorialCodex<
    Collection extends SymbolCollectionName<"index">,
> = {
    type: Exclude<SymbolSlug<"index", Collection>, "principal">;
    eyebrow?: string;
    titre: string;
    paragraphes: string[];
    sources?: string[];
};

export type FicheCodexBase<Collection extends SymbolCollectionName<"index">> = {
    slug: string;
    introduction: string;
    blocsEditoriaux?: BlocEditorialCodex<Collection>[];
    sources: string[];
};
