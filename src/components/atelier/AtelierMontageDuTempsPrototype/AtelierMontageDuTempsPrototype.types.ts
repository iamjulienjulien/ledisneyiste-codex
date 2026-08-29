import type {
    CodexMontageDuTempsGranularity,
    CodexMontageDuTempsModel,
    CodexMontageDuTempsTerritory,
    CodexMontageDuTempsTrackSlug,
    CodexMontageDuTempsWindowSlug,
    CodexPlanBobineTemoinSlug,
} from "@/types/codex-plans";

export type AtelierMontageDuTempsMatterKey =
    | "archives"
    | Extract<
          CodexPlanBobineTemoinSlug,
          | "corpus-vide"
          | "corpus-reduit"
          | "dates-partielles-et-contradictoires"
      >;

export type AtelierMontageDuTempsAngle = CodexMontageDuTempsTrackSlug;

export type AtelierMontageDuTempsWindow = CodexMontageDuTempsWindowSlug;

export type AtelierMontageDuTempsGranularity = CodexMontageDuTempsGranularity;

export type AtelierMontageDuTempsTerritory = CodexMontageDuTempsTerritory;

export type AtelierMontageDuTempsEvidenceMode = "summary" | "developed";

export type AtelierMontageDuTempsCountershotMode = "visible" | "collapsed";

export type AtelierMontageDuTempsLightMode = "sombre" | "claire";

export type AtelierMontageDuTempsProjection = Readonly<{
    matterKey: AtelierMontageDuTempsMatterKey;
    matterLabel: string;
    model: CodexMontageDuTempsModel;
}>;

export type AtelierMontageDuTempsPrototypeProps = Readonly<{
    projections: readonly AtelierMontageDuTempsProjection[];
}>;
