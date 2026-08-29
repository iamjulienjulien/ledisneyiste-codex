import type { CodexPlanDefinition, CodexPlanSlug } from "@/types/codex-plans";
import type { ReactNode } from "react";

export type AtelierPlanDossierStatus =
    "À inventorier" | "À esquisser" | "Esquisse" | "Prêt à projeter";

export type AtelierPlanDossierProps = Readonly<{
    slug: CodexPlanSlug;
    plan: CodexPlanDefinition;
    status?: AtelierPlanDossierStatus;
    program?: string;
    version?: string;
    prototype?: ReactNode;
    prototypeTitle?: string;
    prototypeDescription?: string;
}>;
