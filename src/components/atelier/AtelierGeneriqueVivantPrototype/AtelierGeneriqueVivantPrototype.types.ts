import type {
    CodexGeneriqueVivantAngle,
    CodexGeneriqueVivantModel,
    CodexPlanBobineTemoinSlug,
    CodexPlanObjectiveSlug,
} from "@/types/codex-plans";

export type AtelierGeneriqueVivantMatterKey =
    | "archives"
    | Extract<
          CodexPlanBobineTemoinSlug,
          "corpus-vide" | "corpus-reduit" | "grand-generique"
      >;

export type AtelierGeneriqueVivantObjective = Extract<
    CodexPlanObjectiveSlug,
    "understand" | "find" | "compare"
>;

export type AtelierGeneriqueVivantPresence = "all" | "published" | "unresolved";
export type AtelierGeneriqueVivantSort = "documentary" | "alphabetical";
export type AtelierGeneriqueVivantDensity = "comfortable" | "compact";
export type AtelierGeneriqueVivantEvidence = "summary" | "developed";
export type AtelierGeneriqueVivantCountershot = "visible" | "collapsed";
export type AtelierGeneriqueVivantLight = "sombre" | "claire";

export type AtelierGeneriqueVivantProjection = Readonly<{
    matterKey: AtelierGeneriqueVivantMatterKey;
    matterLabel: string;
    model: CodexGeneriqueVivantModel;
}>;

export type AtelierGeneriqueVivantPrototypeProps = Readonly<{
    projections: readonly AtelierGeneriqueVivantProjection[];
}>;

export type AtelierGeneriqueVivantView = CodexGeneriqueVivantAngle;
