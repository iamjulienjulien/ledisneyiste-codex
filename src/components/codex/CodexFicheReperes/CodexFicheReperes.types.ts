import type { ReactNode } from "react";

export type CodexFicheRepereWidth = "default" | "full";

export type CodexFicheRepere = Readonly<{
    label: string;
    value: ReactNode;
    width?: CodexFicheRepereWidth;
}>;

export type CodexFicheReperesProps = Readonly<{
    reperes: readonly CodexFicheRepere[];
}>;
