import { bobinesTemoins } from "@/fixtures/plans/bobines-temoins";
import {
    CODEX_PLAN_BOBINE_TEMOIN_SLUGS,
    type CodexPlanBobineTemoinSlug,
} from "@/types/codex-plans";

export { bobinesTemoins };

export function isCodexPlanBobineTemoinSlug(
    value: string,
): value is CodexPlanBobineTemoinSlug {
    return CODEX_PLAN_BOBINE_TEMOIN_SLUGS.includes(
        value as CodexPlanBobineTemoinSlug,
    );
}

export function getCodexPlanBobineTemoin(slug: CodexPlanBobineTemoinSlug) {
    return bobinesTemoins[slug];
}

export function getCodexPlanBobinesTemoins() {
    return CODEX_PLAN_BOBINE_TEMOIN_SLUGS.map((slug) => bobinesTemoins[slug]);
}

export {
    CODEX_PLAN_BOBINE_TEMOIN_SLUGS,
    type CodexPlanBobineTemoin,
    type CodexPlanBobineTemoinSlug,
    type CodexPlanBobineTemoinStress,
} from "@/types/codex-plans";
