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

export type TropheeRecompenseDisney =
    | "statuette-oscar"
    | "plaque-technique-multiplane"
    | "medaille-societe-des-nations"
    | "medaille-or-venise"
    | "grand-trophee-art-venise"
    | "rouleau-nyfcc"
    | "globe-dore"
    | "gramophone-grammy"
    | "grand-prix-animation-cannes"
    | "masque-bafta"
    | "medaille-peabody"
    | "medaillon-tony"
    | "oscar-honorifique-blanche-neige"
    | "ours-or-berlin"
    | "statuette-disney-legends"
    | "statuette-emmy"
    | "trophee-annie"
    | "trophee-thea";

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
    trophee: TropheeRecompenseDisney;
    beneficiaires: ReferenceCodex[];
    oeuvreConcernee?: ReferenceCodex;
    sources: string[];
};
