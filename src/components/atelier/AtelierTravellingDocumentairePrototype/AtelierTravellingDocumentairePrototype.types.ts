import type {
    CodexPlanBobineTemoinSlug,
    CodexTravellingDocumentaireModel,
} from "@/types/codex-plans";

export type AtelierTravellingMatterKey =
    | "archives"
    | Extract<
          CodexPlanBobineTemoinSlug,
          | "corpus-vide"
          | "corpus-reduit"
          | "corpus-dense"
          | "cycles-et-orphelins"
      >;

export type AtelierTravellingDepth = 1 | 2;

export type AtelierTravellingLimit = 4 | 8;

export type AtelierTravellingProjection = Readonly<{
    matterKey: AtelierTravellingMatterKey;
    matterLabel: string;
    depth: AtelierTravellingDepth;
    limit: AtelierTravellingLimit;
    model: CodexTravellingDocumentaireModel;
}>;

export type AtelierTravellingDocumentairePrototypeProps = Readonly<{
    projections: readonly AtelierTravellingProjection[];
}>;
