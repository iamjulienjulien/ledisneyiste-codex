export function getSourceAnchorId(sourceId: string) {
    return `source-${sourceId}`;
}

export function getFicheSourceIds(fiche: {
    readonly sources: readonly string[];
    readonly blocsEditoriaux?: readonly {
        readonly sources?: readonly string[];
    }[];
}) {
    return [
        ...new Set([
            ...fiche.sources,
            ...(fiche.blocsEditoriaux?.flatMap((bloc) => bloc.sources ?? []) ??
                []),
        ]),
    ];
}
