import type { DateHistorique } from "@/types/date";
import type { ProvenanceDocumentaireCodex } from "@/types/documentaire";
import type { IdentiteDocumenteeCodex } from "@/types/identite";
import type { ReferenceCodex } from "@/types/reference";

export type NatureOeuvreSource =
    "roman" | "conte" | "nouvelle" | "piece-theatre" | "film" | "autre";

export type SupportOeuvreSource =
    "livre" | "publication-feuilleton" | "scene" | "film" | "autre";

export type RoleAuteurOeuvreSource =
    "auteur" | "co-auteur" | "adaptateur" | "illustrateur";

export type AuteurOeuvreSource = ProvenanceDocumentaireCodex & {
    role: RoleAuteurOeuvreSource;
} & (
        | {
              nom: string;
              personne?: never;
          }
        | {
              personne: ReferenceCodex;
              nom?: never;
          }
    );

export type EntreeOeuvreSource = Readonly<{
    id: string;
    slug: string;
    titre: string;
    nature: NatureOeuvreSource;
    date: DateHistorique;
}>;

export type FicheOeuvreSource = ProvenanceDocumentaireCodex & {
    id: string;
    slug: string;
    identite: IdentiteDocumenteeCodex<"libelle">;
    identitesAlternatives?: IdentiteDocumenteeCodex<"libelle">[];
    auteurs: AuteurOeuvreSource[];
    date: DateHistorique;
    nature: NatureOeuvreSource;
    support: SupportOeuvreSource;
};

export type RegistreOeuvresSources = Readonly<{
    entrees: readonly EntreeOeuvreSource[];
    fiches: readonly FicheOeuvreSource[];
}>;

export type ResolutionOeuvreSource = Readonly<{
    referenceId: string;
    resolved: boolean;
    entree?: EntreeOeuvreSource;
    fiche?: FicheOeuvreSource;
    href?: never;
}>;
