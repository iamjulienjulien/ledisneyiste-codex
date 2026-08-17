import type { ReactNode } from "react";

export type CodexIndexView = "list" | "cards";

export type CodexIndexFamily =
    "personnages" | "createurs" | "oeuvres" | "epoques";

export type CodexIndexViewSwitchProps = Readonly<{
    pathname: `/${string}`;
    currentView: CodexIndexView;
}>;

export type CodexIndexListItemProps = Readonly<{
    href: `/${string}`;
    index: number;
    famille: CodexIndexFamily;
    titre: string;
    sousTitre: string;
    children?: ReactNode;
}>;
