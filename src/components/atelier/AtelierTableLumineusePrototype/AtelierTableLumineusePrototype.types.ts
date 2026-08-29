import type {
    CodexPlanBobineTemoinSlug,
    CodexPlanEvidencePosition,
    CodexPlanEvidenceScope,
    CodexPlanEvidenceStatus,
    CodexPlanObjectiveSlug,
    CodexPlanSourceClassification,
    CodexTableLumineuseAngle,
    CodexTableLumineuseModel,
} from "@/types/codex-plans";

export type AtelierTableLumineuseMatterKey =
    | "archives"
    | Extract<
          CodexPlanBobineTemoinSlug,
          | "corpus-vide"
          | "corpus-reduit"
          | "preuves-contrastees"
          | "dates-partielles-et-contradictoires"
          | "accessibilite-sous-contrainte"
      >;

export type AtelierTableLumineuseObjective = Extract<
    CodexPlanObjectiveSlug,
    "verify" | "understand" | "compare"
>;

export type AtelierTableLumineuseScope = "all" | CodexPlanEvidenceScope;
export type AtelierTableLumineuseStatus = "all" | CodexPlanEvidenceStatus;
export type AtelierTableLumineusePosition = "all" | CodexPlanEvidencePosition;
export type AtelierTableLumineuseClassification =
    "all" | CodexPlanSourceClassification;
export type AtelierTableLumineuseLayout = "table" | "comparison" | "register";
export type AtelierTableLumineuseDensity = "comfortable" | "compact";
export type AtelierTableLumineuseEvidence = "summary" | "developed";
export type AtelierTableLumineuseCountershot = "visible" | "collapsed";
export type AtelierTableLumineuseLight = "sombre" | "claire";

export type AtelierTableLumineuseProjection = Readonly<{
    matterKey: AtelierTableLumineuseMatterKey;
    matterLabel: string;
    model: CodexTableLumineuseModel;
}>;

export type AtelierTableLumineusePrototypeProps = Readonly<{
    projections: readonly AtelierTableLumineuseProjection[];
}>;

export type AtelierTableLumineuseView = CodexTableLumineuseAngle;
