import type { DateHistorique } from "@/types/date";
import type { ProvenanceDocumentaireCodex } from "@/types/documentaire";
import type { IdentiteDocumenteeCodex } from "@/types/identite";
import type { ReferenceOeuvreChanson } from "@/types/chanson";
import type { ReferenceCodex } from "@/types/reference";

export type DomaineAttributionMusicale =
    | "partition"
    | "musique-additionnelle"
    | "orchestration"
    | "arrangement"
    | "direction-musicale";

type CibleAttributionMusicale =
    | {
          oeuvre: ReferenceOeuvreChanson;
          chansonId?: never;
      }
    | {
          chansonId: string;
          oeuvre?: never;
      };

export type AttributionMusicale = ProvenanceDocumentaireCodex &
    CibleAttributionMusicale & {
        personne: ReferenceCodex;
        domaines: DomaineAttributionMusicale[];
    };

export type EntreeMusique = Readonly<{
    id: string;
    slug: string;
    titre: string;
    oeuvre: ReferenceOeuvreChanson;
}>;

export type FicheMusique = ProvenanceDocumentaireCodex & {
    id: string;
    slug: string;
    identite: IdentiteDocumenteeCodex<"libelle">;
    oeuvre: ReferenceOeuvreChanson;
    date?: DateHistorique;
    attributions: AttributionMusicale[];
};

export type RegistreMusiques = Readonly<{
    entrees: readonly EntreeMusique[];
    fiches: readonly FicheMusique[];
}>;

export type ProjectionCreditMusicalExistant = Readonly<{
    personne: ReferenceCodex;
    roles: readonly string[];
    domaine: "musique-chansons";
    sources: readonly string[];
}>;
