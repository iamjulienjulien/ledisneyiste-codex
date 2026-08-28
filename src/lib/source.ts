export function getSourceAnchorId(sourceId: string) {
    return `source-${sourceId}`;
}

function collectNestedSourceIds(value: unknown, sourceIds: string[]) {
    if (Array.isArray(value)) {
        value.forEach((item) => collectNestedSourceIds(item, sourceIds));
        return;
    }

    if (!value || typeof value !== "object") {
        return;
    }

    Object.entries(value).forEach(([key, nestedValue]) => {
        if (key === "sources" && Array.isArray(nestedValue)) {
            nestedValue.forEach((sourceId) => {
                if (typeof sourceId === "string") {
                    sourceIds.push(sourceId);
                }
            });
            return;
        }

        collectNestedSourceIds(nestedValue, sourceIds);
    });
}

export function getFicheSourceIds(fiche: {
    readonly sources: readonly string[];
}) {
    const sourceIds = [...fiche.sources];

    collectNestedSourceIds(fiche, sourceIds);

    return [...new Set(sourceIds)];
}
