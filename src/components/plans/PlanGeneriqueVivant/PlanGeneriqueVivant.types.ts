import type { ReactNode } from "react";
import type { CodexGeneriqueVivantModel } from "@/types/codex-plans";

export type PlanGeneriqueVivantVersion = "1.0.0";

export type PlanGeneriqueVivantProps = Readonly<{
    model: CodexGeneriqueVivantModel;
    simpleCredits: ReactNode;
}>;
