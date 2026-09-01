import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";

export type CodexIndexListItemProps = Readonly<{
    href: `/${string}`;
    index: number;
    famille: CodexFamily;
    titre: string;
    sousTitre: string;
    children?: ReactNode;
}>;
