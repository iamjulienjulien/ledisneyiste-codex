import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type { ReferenceCodex } from "@/types/reference";

export type PersonnageDisney = EntreeCatalogueBase & {
    type: "personnage";
};

export type FichePersonnageDisney = FicheCodexBase & {
    type: "personnage";

    creation: {
        date: DateHistorique;
        createurs: ReferenceCodex[];
    };

    premiereApparition: {
        titre: string;
        date: DateHistorique;
    };

    espece: string;
};
