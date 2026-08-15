import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";

export type ContributeurDisney = EntreeCatalogueBase & {
    type: "contributeur";
};

export type FicheContributeurDisney = FicheCodexBase & {
    type: "contributeur";

    naissance: {
        date: DateHistorique;
        lieu: string;
    };

    deces?: {
        date: DateHistorique;
        lieu: string;
    };

    roles: string[];
};
