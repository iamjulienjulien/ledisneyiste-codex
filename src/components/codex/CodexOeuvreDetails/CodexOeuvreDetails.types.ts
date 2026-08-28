import type { FicheOeuvreDisney } from "@/types/oeuvre";
import type { SourceCodex } from "@/types/source";

export type CodexOeuvreDetailsProps = Readonly<{
    fiche: FicheOeuvreDisney;
    sources: readonly SourceCodex[];
}>;
