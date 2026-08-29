import { codexPlans, planAngles, planObjectives } from "./plans";
import type {
    CodexPlanAngleSlug,
    CodexPlanObjectiveSlug,
    CodexPlanSlug,
} from "@/types/codex-plans";
import { CODEX_PLAN_SLUGS } from "@/types/codex-plans";

export { codexPlans, planAngles, planObjectives };
export { CODEX_PLAN_SLUGS };

export function isCodexPlanSlug(value: string): value is CodexPlanSlug {
    return CODEX_PLAN_SLUGS.includes(value as CodexPlanSlug);
}

export function getCodexPlan(slug: CodexPlanSlug) {
    return codexPlans[slug];
}

export function getCodexPlans() {
    return Object.entries(codexPlans).map(([slug, definition]) => ({
        slug: slug as CodexPlanSlug,
        ...definition,
    }));
}

export function getCodexPlanAngle(slug: CodexPlanAngleSlug) {
    return planAngles[slug];
}

export function getCodexPlanObjective(slug: CodexPlanObjectiveSlug) {
    return planObjectives[slug];
}

export type {
    CodexPlanAngleSlug,
    CodexPlanConfiguration,
    CodexPlanDefinition,
    CodexPlanFrame,
    CodexPlanMatter,
    CodexPlanMatterKind,
    CodexPlanObjectiveSlug,
    CodexPlanProvenance,
    CodexPlanProvenanceKind,
    CodexPlanRuntimeState,
    CodexPlanSlug,
    CodexPlanSubject,
    CodexPlanVerdict,
    CodexPlanVocabularyDefinition,
} from "@/types/codex-plans";
