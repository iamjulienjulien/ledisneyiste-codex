import type { EntreeCatalogueBase } from "@/types/codex";
import type { CategoriePersonnageDisney } from "@/types/metadata";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type { ReferenceCodex } from "@/types/reference";

export type PersonnageDisney = EntreeCatalogueBase & {
    type: "personnage";
    metadata: {
        categories: CategoriePersonnageDisney[];
    };
};

export type FichePersonnageDisney = FicheCodexBase<"personnages"> & {
    type: "personnage";

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
