import type { CodeTerritoireCodex } from "@/types/identite";

export type ProvenanceDocumentaireCodex = {
    sources: string[];
    noteDeReserve?: string;
};

export type PorteeTerritorialeDocumentaireCodex =
    | {
          nature: "territoire";
          code: CodeTerritoireCodex;
      }
    | {
          nature: "monde";
      }
    | {
          nature: "zone";
          libelle: string;
      }
    | {
          nature: "non-precisee";
          libelleSource?: string;
      };
