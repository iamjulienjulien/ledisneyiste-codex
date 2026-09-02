import type { SymbolCollectionName, SymbolSlug } from "@/registry/symbols";

export type ParagrapheEditorialCodexStructure = {
    id: string;
    texte: string;
    sources: string[];
    reserve?: string;
};

export type ParagrapheEditorialCodex =
    string | ParagrapheEditorialCodexStructure;

export type EntreeCartePreuvesEditorialeCodex = Readonly<{
    id: string;
    titre: string;
    question?: string;
    nombreParagraphes: number;
    sourceIds: readonly string[];
    reserves: readonly Readonly<{
        paragrapheId: string;
        texte: string;
    }>[];
}>;

export type BlocEditorialCodex<
    Collection extends SymbolCollectionName<"index">,
> = {
    id?: string;
    type: Exclude<SymbolSlug<"index", Collection>, "principal">;
    eyebrow?: string;
    titre: string;
    question?: string;
    paragraphes: ParagrapheEditorialCodex[];
    sources?: string[];
};

export type FicheCodexBase<Collection extends SymbolCollectionName<"index">> = {
    slug: string;
    introduction: string;
    blocsEditoriaux?: BlocEditorialCodex<Collection>[];
    sources: string[];
};
