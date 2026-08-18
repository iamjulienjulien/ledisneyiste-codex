import type { ReferenceCodex } from "@/types/reference";
import type { CodexFicheFamily } from "@/types/codex-fiche";

export type CodexRelationsGroup = Readonly<{
    family: CodexFicheFamily;
    titre: string;
    references: ReferenceCodex[];
}>;

export type CodexRelationsProps = Readonly<{
    groupes: CodexRelationsGroup[];
}>;
