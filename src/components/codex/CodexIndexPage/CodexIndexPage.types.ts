import type { ReactNode } from "react";
import type { CodexIndexFamily } from "@/types/index-view";

export type CodexIndexPageCompteur = Readonly<{
    valeur: number;
    singulier: string;
    pluriel: string;
}>;

export type CodexIndexPageProps = Readonly<{
    famille: CodexIndexFamily;
    eyebrow: string;
    titre: string;
    introduction: string;
    compteur: CodexIndexPageCompteur;
    commandes: ReactNode;
    children: ReactNode;
}>;
