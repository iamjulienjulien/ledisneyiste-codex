import type { CodexFamily } from "@/types/codex";
import type { ReferenceCodex } from "@/types/reference";

export type CodexFicheRelationsGroup = Readonly<{
    family: CodexFamily;
    titre: string;
    references: ReferenceCodex[];
}>;

export type CodexFicheRelationsProps = Readonly<{
    groupes: CodexFicheRelationsGroup[];
}>;
