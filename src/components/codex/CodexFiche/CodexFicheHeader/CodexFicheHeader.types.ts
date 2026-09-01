import type { ReactNode } from "react";
import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexFicheHeaderProps<Famille extends CodexFamily = CodexFamily> =
    Readonly<{
        family: Famille;
        identite: ProjectionIdentiteCodex<Famille>;
        eyebrow: string;
        sousTitre?: string;
        introduction?: string;
        badges?: ReactNode;
    }>;
