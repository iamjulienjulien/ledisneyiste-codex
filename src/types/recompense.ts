import type { DateHistorique } from "@/types/date";
import type { NatureRecompenseDisney } from "@/types/metadata";
import type { ReferenceCodex } from "@/types/reference";

export type InstitutionRecompenseDisney = {
    nom: string;
    abreviation?: string;
};

export type EditionRecompenseDisney = {
    nom: string;
    numero?: number;
};

type QualificationRecompenseDisney =
    | {
          categorie: string;
          motif?: string;
      }
    | {
          categorie?: never;
          motif: string;
      };

export type RecompenseDisney = QualificationRecompenseDisney & {
    id: string;
    institution: InstitutionRecompenseDisney;
    edition: EditionRecompenseDisney;
    dateAttribution: DateHistorique;
    nature: NatureRecompenseDisney;
    beneficiaires: ReferenceCodex[];
    oeuvreConcernee?: ReferenceCodex;
    sources: string[];
};
