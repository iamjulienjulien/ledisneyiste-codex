import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";

export type EpoqueDisney = EntreeCatalogueBase & {
    type: "epoque";
};

export type FicheEpoqueDisney = FicheCodexBase<"epoques"> & {
    type: "epoque";

    periode: {
        debut: DateHistorique;
        /**
         * Borne de fin exclusive.
         * Une époque 1923 → 1937 couvre 1923 à 1936 inclus.
         */
        fin?: DateHistorique;
    };

    description: string;
};
