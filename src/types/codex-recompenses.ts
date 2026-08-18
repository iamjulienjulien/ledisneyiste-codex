import type { RecompenseDisney } from "@/types/recompense";

export type CodexRecompensesProps = Readonly<{
    recompenses: RecompenseDisney[];
    showWork?: boolean;
}>;
