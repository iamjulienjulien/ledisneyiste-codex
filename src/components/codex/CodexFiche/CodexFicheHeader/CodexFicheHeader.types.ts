import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexFicheHeaderProps = Readonly<{
    family: CodexFamily;
    eyebrow: string;
    titre: string;
    sousTitre?: string;
    introduction?: string;
    badges?: ReactNode;
}>;
