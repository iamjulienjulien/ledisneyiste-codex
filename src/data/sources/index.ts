import sourcesJson from "@/data/sources/sources.json";
import type { SourceCodex } from "@/types/source";

export const sources = sourcesJson as SourceCodex[];

export function getSourceById(id: string) {
    return sources.find((source) => source.id === id);
}

export function getSourcesByIds(ids: string[]) {
    return ids
        .map((id) => getSourceById(id))
        .filter((source): source is SourceCodex => Boolean(source));
}
