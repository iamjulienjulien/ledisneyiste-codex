import type { CodexPlanDefinition, CodexPlanSlug } from "@/types/codex-plans";

export type AtelierPlanDossierProps = Readonly<{
    slug: CodexPlanSlug;
    plan: CodexPlanDefinition;
}>;
