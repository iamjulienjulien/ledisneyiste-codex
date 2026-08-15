import type { EntreeCatalogueBase } from "@/types/codex";
import type { FicheCodexBase } from "@/types/fiche";

export type ContributeurDisney = EntreeCatalogueBase & {
    type: "contributeur";
};

export type FicheContributeurDisney = FicheCodexBase & {
    type: "contributeur";

    naissance: {
        date: string;
        lieu: string;
    };

    deces?: {
        date: string;
        lieu: string;
    };

    roles: string[];
};
