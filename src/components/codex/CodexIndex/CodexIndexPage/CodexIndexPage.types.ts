import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexIndexPageCompteur = Readonly<{
    valeur: number;
    singulier: string;
    pluriel: string;
}>;

export type CodexIndexPageProps = Readonly<{
    famille: CodexFamily;
    eyebrow: string;
    titre: string;
    introduction: string;
    compteur: CodexIndexPageCompteur;
    commandes: ReactNode;
    children: ReactNode;
}>;
