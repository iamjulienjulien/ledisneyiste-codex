import type { DateHistorique, PeriodeHistorique } from "@/types/date";
import type {
    PorteeTerritorialeDocumentaireCodex,
    ProvenanceDocumentaireCodex,
} from "@/types/documentaire";
import type { IdentiteDocumenteeCodex } from "@/types/identite";

export type NatureVersionOeuvre =
    | "originale"
    | "doublage"
    | "restauration"
    | "edition"
    | "montage-alternatif";

export type VersionOeuvre = ProvenanceDocumentaireCodex & {
    id: string;
    nature: NatureVersionOeuvre;
    identite: IdentiteDocumenteeCodex<"libelle">;
    date?: DateHistorique;
    distributeur?: string;
};

export type NatureEvenementSortieOeuvre =
    | "premiere-mondiale"
    | "avant-premiere"
    | "sortie-nationale"
    | "ressortie"
    | "presentation-festival"
    | "mise-a-disposition";

type EvenementSortieOeuvreBase = ProvenanceDocumentaireCodex & {
    date: DateHistorique;
    nature: NatureEvenementSortieOeuvre;
    lieu?: string;
    versionId?: string;
    exploitationId?: string;
};

export type EvenementSortieOeuvre = EvenementSortieOeuvreBase &
    (
        | {
              id: string;
              porteeTerritoriale: PorteeTerritorialeDocumentaireCodex;
              territoire?: never;
          }
        | {
              id?: string;
              territoire: string;
              porteeTerritoriale?: never;
          }
    );

export type NatureExploitationOeuvre =
    | "premiere-exploitation"
    | "exploitation-nationale"
    | "ressortie"
    | "festival"
    | "restauration"
    | "edition-video"
    | "diffusion-televisuelle"
    | "diffusion-numerique";

export type ExploitationOeuvre = ProvenanceDocumentaireCodex & {
    id: string;
    nature: NatureExploitationOeuvre;
    periode: PeriodeHistorique;
    porteeTerritoriale: PorteeTerritorialeDocumentaireCodex;
    versionIds?: string[];
    distributeur?: string;
    support?: string;
};

export type NatureTemoinReceptionOeuvre =
    "personne" | "publication" | "institution" | "industrie" | "public";

export type TemoinReceptionOeuvre = {
    nom: string;
    nature: NatureTemoinReceptionOeuvre;
};

export type NatureReceptionOeuvre =
    | "critique-contemporaine"
    | "professionnelle"
    | "publique"
    | "institutionnelle"
    | "reevaluation";

export type QualificationReceptionOeuvre =
    "favorable" | "partagee" | "defavorable" | "descriptive";

export type TemporaliteReceptionOeuvre =
    | {
          date: DateHistorique;
          periode?: never;
      }
    | {
          periode: PeriodeHistorique;
          date?: never;
      };

export type ReceptionOeuvre = ProvenanceDocumentaireCodex &
    TemporaliteReceptionOeuvre & {
        id: string;
        nature: NatureReceptionOeuvre;
        temoin: TemoinReceptionOeuvre;
        porteeTerritoriale: PorteeTerritorialeDocumentaireCodex;
        resume: string;
        qualification?: QualificationReceptionOeuvre;
        support?: string;
        evenementId?: string;
        exploitationId?: string;
        versionId?: string;
    };
