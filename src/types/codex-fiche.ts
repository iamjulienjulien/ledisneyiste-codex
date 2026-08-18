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
