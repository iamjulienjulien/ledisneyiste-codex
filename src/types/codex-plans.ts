import type { CodexFamily } from "@/types/codex";
import type {
    ContributeurDisney,
    FicheContributeurDisney,
} from "@/types/contributeur";
import type { DateHistorique } from "@/types/date";
import type { EpoqueDisney, FicheEpoqueDisney } from "@/types/epoque";
import type { FicheOeuvreDisney, OeuvreDisney } from "@/types/oeuvre";
import type {
    FichePersonnageDisney,
    PersonnageDisney,
} from "@/types/personnage";
import type { RecompenseDisney } from "@/types/recompense";
import type { SourceCodex } from "@/types/source";

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

export const CODEX_PLAN_BOBINE_TEMOIN_SLUGS = [
    "corpus-vide",
    "corpus-reduit",
    "corpus-dense",
    "cycles-et-orphelins",
    "dates-partielles-et-contradictoires",
    "grand-generique",
    "preuves-contrastees",
    "accessibilite-sous-contrainte",
] as const;

export type CodexPlanBobineTemoinSlug =
    (typeof CODEX_PLAN_BOBINE_TEMOIN_SLUGS)[number];

export type CodexPlanMatterKind = "archives" | "bobine-temoin";

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
    | "bobine-temoin";

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
          kind: "bobine-temoin";
          fixture: CodexPlanBobineTemoinSlug;
      }>;

export type CodexPlanProvenance = Readonly<{
    kind: CodexPlanProvenanceKind;
    sourceIds?: readonly string[];
    explanation?: string;
}>;

export type CodexPlanEntityKind =
    | "personnage"
    | "contributeur"
    | "oeuvre"
    | "epoque"
    | "recompense"
    | "source"
    | "oeuvre-exterieure"
    | "reference-non-resolue";

export type CodexPlanEntityReference = Readonly<{
    id: string;
    kind: CodexPlanEntityKind;
    label: string;
    slug?: string;
    resolved: boolean;
}>;

export type CodexPlanNodeMetadataValue =
    string | number | boolean | readonly string[];

export type CodexPlanNode = CodexPlanEntityReference &
    Readonly<{
        subtitle?: string;
        publishedSubject: boolean;
        metadata: Readonly<Record<string, CodexPlanNodeMetadataValue>>;
        provenance: readonly CodexPlanProvenance[];
    }>;

export type CodexPlanLinkKind =
    | "created-by"
    | "first-appeared-in"
    | "features"
    | "contributed-to"
    | "work-relation"
    | "belongs-to-era"
    | "rewarded-work"
    | "reward-beneficiary";

export type CodexPlanLink = Readonly<{
    id: string;
    kind: CodexPlanLinkKind;
    label: string;
    from: CodexPlanEntityReference;
    to: CodexPlanEntityReference;
    direction: "directed";
    provenance: readonly CodexPlanProvenance[];
}>;

export type CodexPlanEventKind =
    | "character-creation"
    | "first-appearance"
    | "birth"
    | "death"
    | "activity"
    | "work-release"
    | "release-event"
    | "production"
    | "era"
    | "reward";

export type CodexPlanEvent = Readonly<{
    id: string;
    kind: CodexPlanEventKind;
    label: string;
    subject: CodexPlanEntityReference;
    start: DateHistorique;
    end?: DateHistorique;
    endExclusive?: boolean;
    territory?: string;
    place?: string;
    provenance: readonly CodexPlanProvenance[];
}>;

export type CodexPlanCredit = Readonly<{
    id: string;
    work: CodexPlanEntityReference;
    contributor: CodexPlanEntityReference;
    roles: readonly string[];
    domain?: string;
    provenance: readonly CodexPlanProvenance[];
}>;

export type CodexPlanEvidenceScope =
    | "fiche"
    | "editorial-block"
    | "alternate-name"
    | "character-form"
    | "alternate-title"
    | "duration"
    | "production"
    | "release-event"
    | "economic-data"
    | "work-relation"
    | "reward";

export type CodexPlanEvidenceStatus =
    "documented" | "partially-resolved" | "undocumented";

export type CodexPlanEvidencePosition =
    "supports" | "nuances" | "contradicts" | "inconclusive" | "unclassified";

export type CodexPlanSourceClassification =
    | "primary"
    | "secondary"
    | "database"
    | "editorial-interpretation"
    | "unclassified";

export type CodexPlanEvidence = Readonly<{
    id: string;
    owner: CodexPlanEntityReference;
    scope: CodexPlanEvidenceScope;
    label: string;
    sourceIds: readonly string[];
    sources: readonly CodexPlanEntityReference[];
    unresolvedSourceIds: readonly string[];
    status: CodexPlanEvidenceStatus;
    position: CodexPlanEvidencePosition;
    sourceClassification: CodexPlanSourceClassification;
    provenance: readonly CodexPlanProvenance[];
}>;

export type CodexPlanBobineTemoinStress =
    | "empty-corpus"
    | "reduced-corpus"
    | "dense-corpus"
    | "relational-cycle"
    | "orphan-node"
    | "partial-date"
    | "contradictory-date"
    | "large-credits"
    | "long-label"
    | "convergent-evidence"
    | "divergent-evidence"
    | "missing-evidence"
    | "keyboard"
    | "reduced-motion"
    | "small-screen"
    | "performance";

export type CodexPlanBobineTemoin = Readonly<{
    slug: CodexPlanBobineTemoinSlug;
    label: string;
    description: string;
    matter: Readonly<{
        kind: "bobine-temoin";
        fixture: CodexPlanBobineTemoinSlug;
    }>;
    plans: readonly CodexPlanSlug[];
    runtimeState: CodexPlanRuntimeState;
    stresses: readonly CodexPlanBobineTemoinStress[];
    nodes: readonly CodexPlanNode[];
    links: readonly CodexPlanLink[];
    events: readonly CodexPlanEvent[];
    credits: readonly CodexPlanCredit[];
    evidence: readonly CodexPlanEvidence[];
}>;

export type CodexPlanDerivationNoticeCode =
    | "limit-applied"
    | "unresolved-reference"
    | "unresolved-source"
    | "missing-sources"
    | "source-classification-unavailable";

export type CodexPlanDerivationNotice = Readonly<{
    code: CodexPlanDerivationNoticeCode;
    message: string;
    itemId?: string;
}>;

export type CodexPlanDerivationSelection = Readonly<{
    total: number;
    returned: number;
    limit?: number;
    truncated: boolean;
}>;

export type CodexPlanDerivationResult<Item> = Readonly<{
    matter: Readonly<{ kind: "archives" }>;
    items: readonly Item[];
    selection: CodexPlanDerivationSelection;
    notices: readonly CodexPlanDerivationNotice[];
}>;

export type CodexPlanDerivationOptions = Readonly<{
    limit?: number;
}>;

export type CodexPlanArchives = Readonly<{
    catalogues: Readonly<{
        personnages: readonly PersonnageDisney[];
        contributeurs: readonly ContributeurDisney[];
        oeuvres: readonly OeuvreDisney[];
        epoques: readonly EpoqueDisney[];
    }>;
    fiches: Readonly<{
        personnages: readonly FichePersonnageDisney[];
        contributeurs: readonly FicheContributeurDisney[];
        oeuvres: readonly FicheOeuvreDisney[];
        epoques: readonly FicheEpoqueDisney[];
    }>;
    recompenses: readonly RecompenseDisney[];
    sources: readonly SourceCodex[];
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
