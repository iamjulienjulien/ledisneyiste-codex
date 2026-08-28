import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexIndexView = "list" | "cards";

export type CodexIndexViewSwitchProps = Readonly<{
    pathname: `/${string}`;
    currentView: CodexIndexView;
}>;

export type CodexIndexListItemProps = Readonly<{
    href: `/${string}`;
    index: number;
    famille: CodexFamily;
    titre: string;
    sousTitre: string;
    children?: ReactNode;
}>;
