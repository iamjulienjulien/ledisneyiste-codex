import type { FicheChansonDisney } from "@/types/chanson";
import type { SourceCodex } from "@/types/source";

export type CodexFicheChansonDetailsProps = Readonly<{
    fiche: FicheChansonDisney;
    sources: readonly SourceCodex[];
}>;
