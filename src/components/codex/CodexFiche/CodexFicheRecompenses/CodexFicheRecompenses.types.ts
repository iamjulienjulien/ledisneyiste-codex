import type { RecompenseDisney } from "@/types/recompense";

export type CodexFicheRecompensesProps = Readonly<{
    recompenses: RecompenseDisney[];
    showWork?: boolean;
}>;
