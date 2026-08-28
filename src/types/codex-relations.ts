import type { ReferenceCodex } from "@/types/reference";
import type { CodexFamily } from "@/types/codex";

export type CodexRelationsGroup = Readonly<{
    family: CodexFamily;
    titre: string;
    references: ReferenceCodex[];
}>;

export type CodexRelationsProps = Readonly<{
    groupes: CodexRelationsGroup[];
}>;
