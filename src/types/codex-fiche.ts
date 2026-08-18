import type { ReactNode } from "react";

export type CodexFicheFamily =
    "personnages" | "createurs" | "oeuvres" | "epoques";

export type CodexFicheProps = Readonly<{
    family: CodexFicheFamily;
    children: ReactNode;
}>;

export type CodexFicheHeaderProps = Readonly<{
    family: CodexFicheFamily;
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
