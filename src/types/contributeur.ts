import type { EntreeCatalogueBase } from "@/types/codex";
import type { CategorieContributeurDisney } from "@/types/metadata";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";

export type ContributeurDisney = EntreeCatalogueBase & {
    type: "contributeur";
    metadata: {
        categories: CategorieContributeurDisney[];
    };
};

export type PeriodeActiviteDisney = {
    debut: DateHistorique;
    fin?: DateHistorique;
};

export type FicheContributeurDisney = FicheCodexBase<"contributeurs"> & {
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

    periodesActivite: PeriodeActiviteDisney[];
};
