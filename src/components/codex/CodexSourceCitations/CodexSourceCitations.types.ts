import type { SourceCodex } from "@/types/source";

export type CodexSourceCitationsProps = Readonly<{
    sourceIds?: readonly string[];
    sources: readonly SourceCodex[];
}>;
