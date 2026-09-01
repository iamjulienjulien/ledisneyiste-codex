import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexFicheProps = Readonly<{
    family: CodexFamily;
    children: ReactNode;
}>;
