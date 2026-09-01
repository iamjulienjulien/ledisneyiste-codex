import type { EntreeCatalogueBase } from "@/types/codex";
import type { CategoriePersonnageDisney } from "@/types/metadata";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type {
    NatureNomAlternatifCodex,
    NomAlternatifCodex,
} from "@/types/identite";
import type { ReferenceCodex } from "@/types/reference";

export type PersonnageDisney = EntreeCatalogueBase & {
    type: "personnage";
    metadata: {
        categories: CategoriePersonnageDisney[];
    };
};

export type NatureNomAlternatifPersonnage = NatureNomAlternatifCodex;

export type NomAlternatifPersonnage = NomAlternatifCodex;

export type FormePersonnage = {
    slug: string;
    nom: string;
    description: string;
    sources: string[];
};

export type FichePersonnageDisney = FicheCodexBase<"personnages"> & {
    type: "personnage";

    nomsAlternatifs?: NomAlternatifPersonnage[];

    formes?: FormePersonnage[];

    creation: {
        date: DateHistorique;
        createurs: ReferenceCodex[];
    };

    premiereApparition: {
        oeuvre: ReferenceCodex;
        date: DateHistorique;
    };

    espece: string;
};
