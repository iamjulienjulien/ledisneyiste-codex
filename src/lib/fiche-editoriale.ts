import type {
    BlocEditorialCodex,
    EntreeCartePreuvesEditorialeCodex,
    ParagrapheEditorialCodex,
    ParagrapheEditorialCodexStructure,
} from "@/types/fiche";
import type { SymbolCollectionName } from "@/registry/symbols";

type BlocSourcesEditorialesCodex = Readonly<{
    sources?: readonly string[];
    paragraphes: readonly ParagrapheEditorialCodex[];
}>;

export function isParagrapheEditorialStructure(
    paragraphe: ParagrapheEditorialCodex,
): paragraphe is ParagrapheEditorialCodexStructure {
    return typeof paragraphe !== "string";
}

export function getParagrapheEditorialSourceIds(
    paragraphe: ParagrapheEditorialCodex,
) {
    return isParagrapheEditorialStructure(paragraphe) ? paragraphe.sources : [];
}

export function getBlocEditorialSourceIds(bloc: BlocSourcesEditorialesCodex) {
    return [
        ...new Set([
            ...(bloc.sources ?? []),
            ...bloc.paragraphes.flatMap(getParagrapheEditorialSourceIds),
        ]),
    ];
}

export function getBlocEditorialSourceIdsNonProjetes(
    bloc: BlocSourcesEditorialesCodex,
) {
    const sourcesParagraphes = new Set(
        bloc.paragraphes.flatMap(getParagrapheEditorialSourceIds),
    );

    return (bloc.sources ?? []).filter(
        (sourceId) => !sourcesParagraphes.has(sourceId),
    );
}

export function deriveCartePreuvesEditoriale<
    Collection extends SymbolCollectionName<"index">,
>(blocs: readonly BlocEditorialCodex<Collection>[]) {
    return blocs.map((bloc, blocIndex) => {
        const blocId = bloc.id ?? `bloc-editorial-${blocIndex + 1}`;
        const reserves = bloc.paragraphes.flatMap((paragraphe) => {
            if (
                !isParagrapheEditorialStructure(paragraphe) ||
                !paragraphe.reserve
            ) {
                return [];
            }

            return [
                {
                    paragrapheId: paragraphe.id,
                    texte: paragraphe.reserve,
                },
            ];
        });

        return {
            id: blocId,
            titre: bloc.titre,
            question: bloc.question,
            nombreParagraphes: bloc.paragraphes.length,
            sourceIds: getBlocEditorialSourceIds(bloc),
            reserves,
        } satisfies EntreeCartePreuvesEditorialeCodex;
    });
}
