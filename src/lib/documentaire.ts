import { territoiresCodex } from "@/registry/identites";
import type { PorteeTerritorialeDocumentaireCodex } from "@/types/documentaire";

export function formatPorteeTerritorialeDocumentaire(
    portee: PorteeTerritorialeDocumentaireCodex,
) {
    switch (portee.nature) {
        case "territoire":
            return territoiresCodex[portee.code].label;
        case "monde":
            return "Monde";
        case "zone":
            return portee.libelle;
        case "non-precisee":
            return portee.libelleSource ?? "Territoire non précisé";
    }
}
