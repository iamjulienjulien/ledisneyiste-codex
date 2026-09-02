import type { DateHistorique, PeriodeHistorique } from "@/types/date";
import type { EntreeCatalogueBase } from "@/types/codex";
import type {
    PorteeTerritorialeDocumentaireCodex,
    ProvenanceDocumentaireCodex,
} from "@/types/documentaire";
import type { IdentiteDocumenteeCodex } from "@/types/identite";
import type { ReferenceCodex } from "@/types/reference";
import type { FicheCodexBase } from "@/types/fiche";

export type ReferenceOeuvreChanson =
    | Readonly<{
          nom: string;
          slug: string;
          type: "oeuvre";
      }>
    | Readonly<{
          id: string;
          nom: string;
          slug: string;
          type: "oeuvre-privee";
      }>;

export type RoleAuteurChanson =
    "composition" | "paroles" | "traduction" | "adaptation-lyrique";

export type AttributionAuteurChanson = ProvenanceDocumentaireCodex & {
    personne: ReferenceCodex;
    roles: RoleAuteurChanson[];
};

export type EntreeChanson = Readonly<{
    id: string;
    slug: string;
    titre: string;
    oeuvreOrigine: ReferenceOeuvreChanson;
}>;

export type ChansonDisney = EntreeCatalogueBase & {
    type: "chanson";
    oeuvreOrigine: ReferenceOeuvreChanson;
};

type VersionChansonBase = ProvenanceDocumentaireCodex & {
    id: string;
    identite: IdentiteDocumenteeCodex<"libelle">;
    date?: DateHistorique;
    porteeTerritoriale?: PorteeTerritorialeDocumentaireCodex;
};

export type VersionChanson =
    | (VersionChansonBase & {
          nature: "originale";
          adaptateurs?: never;
      })
    | (VersionChansonBase & {
          nature: "traduction" | "adaptation-lyrique";
          adaptateurs: AttributionAuteurChanson[];
      });

export type NatureOccurrenceChanson = "origine" | "reemploi";

export type OccurrenceChanson = ProvenanceDocumentaireCodex & {
    id: string;
    nature: NatureOccurrenceChanson;
    oeuvre: ReferenceOeuvreChanson;
    versionId: string;
    date?: DateHistorique;
    fonctionNarrative?: string;
};

export type NatureInterpretationChanson = "originale" | "reprise";

export type RoleInterpreteChanson =
    "chant" | "voix" | "choeur" | "direction-musicale";

export type AttributionInterpreteChanson = ProvenanceDocumentaireCodex & {
    personne: ReferenceCodex;
    roles: RoleInterpreteChanson[];
};

export type InterpretationChanson = ProvenanceDocumentaireCodex & {
    id: string;
    nature: NatureInterpretationChanson;
    versionId: string;
    interpretes: AttributionInterpreteChanson[];
    occurrenceId?: string;
    date?: DateHistorique;
};

export type EnregistrementChanson = ProvenanceDocumentaireCodex & {
    id: string;
    interpretationId: string;
    date?: DateHistorique;
    edition?: string;
};

export type NatureRelationChanson = "inspiration" | "derivee" | "heritage";

export type RelationChanson = ProvenanceDocumentaireCodex & {
    nature: NatureRelationChanson;
    chansonId: string;
};

export type NatureReceptionChanson =
    "publique" | "critique" | "institutionnelle" | "patrimoniale";

export type TemporaliteReceptionChanson =
    | {
          date: DateHistorique;
          periode?: never;
      }
    | {
          periode: PeriodeHistorique;
          date?: never;
      };

export type ReceptionChanson = ProvenanceDocumentaireCodex &
    TemporaliteReceptionChanson & {
        id: string;
        nature: NatureReceptionChanson;
        resume: string;
        porteeTerritoriale: PorteeTerritorialeDocumentaireCodex;
    };

export type ReferenceRecompenseChanson = ProvenanceDocumentaireCodex & {
    id: string;
};

export type FicheChanson = ProvenanceDocumentaireCodex & {
    id: string;
    slug: string;
    identite: IdentiteDocumenteeCodex<"libelle">;
    identitesAlternatives?: IdentiteDocumenteeCodex<"libelle">[];
    oeuvreOrigine: ReferenceOeuvreChanson;
    auteurs: AttributionAuteurChanson[];
    versions: VersionChanson[];
    occurrences: OccurrenceChanson[];
    interpretations: InterpretationChanson[];
    enregistrements?: EnregistrementChanson[];
    receptions?: ReceptionChanson[];
    relations?: RelationChanson[];
    recompenses?: ReferenceRecompenseChanson[];
};

export type FicheChansonDisney = FicheChanson &
    FicheCodexBase<"chansons"> & {
        type: "chanson";
    };

export type RegistreChansons = Readonly<{
    entrees: readonly EntreeChanson[];
    fiches: readonly FicheChanson[];
}>;

export type ResolutionChanson = Readonly<{
    referenceId: string;
    resolved: boolean;
    entree?: EntreeChanson;
    fiche?: FicheChanson;
    href?: never;
}>;
