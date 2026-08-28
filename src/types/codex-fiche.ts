import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexFicheProps = Readonly<{
    family: CodexFamily;
    children: ReactNode;
}>;

export type CodexFicheHeaderProps = Readonly<{
    family: CodexFamily;
    eyebrow: string;
    titre: string;
    sousTitre?: string;
    introduction?: string;
    badges?: ReactNode;
}>;

export type CodexFicheSectionProps = Readonly<{
    eyebrow?: string;
    titre?: string;
    description?: string;
    symbole?: ReactNode;
    children: ReactNode;
}>;
