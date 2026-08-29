import type { CodexFamily } from "@/types/codex";

export const CODEX_PLAN_SLUGS = [
    "travelling-documentaire",
    "plan-d-ensemble",
    "montage-du-temps",
    "generique-vivant",
    "table-lumineuse",
] as const;

export type CodexPlanSlug = (typeof CODEX_PLAN_SLUGS)[number];

export type CodexPlanAngleSlug =
    | "filiation"
    | "adaptation"
    | "influence"
    | "reception"
    | "transmission"
    | "people"
    | "works"
    | "characters"
    | "rewards"
    | "sources"
    | "relations"
    | "production"
    | "distribution"
    | "legacy"
    | "transformation"
    | "roles"
    | "departments"
    | "responsibilities"
    | "collaborations"
    | "recurrences"
    | "provenance"
    | "contradiction"
    | "geography"
    | "uncertainty";

export type CodexPlanObjectiveSlug =
    | "follow"
    | "understand"
    | "discover"
    | "situate"
    | "compare"
    | "find"
    | "verify";

export type CodexPlanMatterKind = "archives" | "test-reel";

export type CodexPlanRuntimeState =
    | "idle"
    | "loading"
    | "ready"
    | "empty"
    | "sparse"
    | "dense"
    | "incomplete"
    | "error";

export type CodexPlanVerdict = "pursue" | "transform" | "defer" | "abandon";

export type CodexPlanProvenanceKind =
    | "sourced-fact"
    | "editorial-relation"
    | "derived-aggregation"
    | "uncertainty"
    | "test-reel";

export type CodexPlanSubject = Readonly<{
    family: CodexFamily;
    slug: string;
}>;

export type CodexPlanFrame = Readonly<{
    label: string;
    description: string;
    depth?: number;
    limit?: number;
}>;

export type CodexPlanMatter =
    | Readonly<{
          kind: "archives";
      }>
    | Readonly<{
          kind: "test-reel";
          fixture: string;
      }>;

export type CodexPlanProvenance = Readonly<{
    kind: CodexPlanProvenanceKind;
    sourceIds?: readonly string[];
    explanation?: string;
}>;

export type CodexPlanConfiguration = Readonly<{
    plan: CodexPlanSlug;
    subject: CodexPlanSubject;
    angle: CodexPlanAngleSlug;
    objective: CodexPlanObjectiveSlug;
    frame: CodexPlanFrame;
    matter: CodexPlanMatter;
}>;

export type CodexPlanVocabularyDefinition = Readonly<{
    label: string;
    description: string;
}>;

export type CodexPlanDefinition = Readonly<{
    label: string;
    description: string;
    question: string;
    actionLabel: string;
    textAlternativeLabel: string;
    angles: readonly [CodexPlanAngleSlug, ...CodexPlanAngleSlug[]];
    objectives: readonly [CodexPlanObjectiveSlug, ...CodexPlanObjectiveSlug[]];
    frameDescription: string;
    matterDescription: string;
}>;
