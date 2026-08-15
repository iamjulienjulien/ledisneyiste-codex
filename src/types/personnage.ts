import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";

export type PersonnageDisney = EntreeCatalogueBase & {
    type: "personnage";
};

export type FichePersonnageDisney = FicheCodexBase & {
    type: "personnage";

    creation: {
        date: DateHistorique;
        createurs: string[];
    };

    premiereApparition: {
        titre: string;
        date: DateHistorique;
    };

    espece: string;
};
