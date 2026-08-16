export type BlocEditorialCodex = {
    eyebrow?: string;
    titre: string;
    paragraphes: string[];
};

export type FicheCodexBase = {
    slug: string;
    introduction: string;
    blocsEditoriaux?: BlocEditorialCodex[];
    sources: string[];
};
