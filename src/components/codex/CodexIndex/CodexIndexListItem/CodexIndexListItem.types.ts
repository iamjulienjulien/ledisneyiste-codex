import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexListItemProps<Famille extends CodexFamily = CodexFamily> =
    Readonly<{
        href: `/${string}`;
        index: number;
        famille: Famille;
        identite: ProjectionIdentiteCodex<Famille>;
        sousTitre: string;
        children?: ReactNode;
    }>;
