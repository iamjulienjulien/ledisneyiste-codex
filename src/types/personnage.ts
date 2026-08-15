import type { EntreeCatalogueBase } from "@/types/codex";
import type { FicheCodexBase } from "@/types/fiche";

export type PersonnageDisney = EntreeCatalogueBase & {
    type: "personnage";
};

export type FichePersonnageDisney = FicheCodexBase & {
    type: "personnage";

    creation: {
        date: string;
        createurs: string[];
    };

    premiereApparition: {
        titre: string;
        date: string;
    };

    espece: string;
};
