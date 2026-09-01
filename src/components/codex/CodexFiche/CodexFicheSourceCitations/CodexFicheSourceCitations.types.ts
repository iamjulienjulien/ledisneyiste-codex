import type { SourceCodex } from "@/types/source";

export type CodexFicheSourceCitationsProps = Readonly<{
    sourceIds?: readonly string[];
    sources: readonly SourceCodex[];
    label?: string;
}>;
