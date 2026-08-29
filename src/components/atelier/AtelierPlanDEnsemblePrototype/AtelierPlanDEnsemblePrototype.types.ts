import type {
    CodexPlanBobineTemoinSlug,
    CodexPlanDEnsembleGroupSlug,
    CodexPlanDEnsembleModel,
} from "@/types/codex-plans";

export type AtelierPlanDEnsembleMatterKey =
    | "archives"
    | Extract<
          CodexPlanBobineTemoinSlug,
          | "corpus-vide"
          | "corpus-reduit"
          | "corpus-dense"
          | "cycles-et-orphelins"
      >;

export type AtelierPlanDEnsembleDepth = 1 | 2;

export type AtelierPlanDEnsembleLimit = 12 | 24;

export type AtelierPlanDEnsembleAngle =
    CodexPlanDEnsembleGroupSlug | "relations";

export type AtelierPlanDEnsembleProjection = Readonly<{
    matterKey: AtelierPlanDEnsembleMatterKey;
    matterLabel: string;
    depth: AtelierPlanDEnsembleDepth;
    model: CodexPlanDEnsembleModel;
}>;

export type AtelierPlanDEnsemblePrototypeProps = Readonly<{
    projections: readonly AtelierPlanDEnsembleProjection[];
}>;
