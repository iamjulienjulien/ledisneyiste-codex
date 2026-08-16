import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";

export type EpoqueDisney = EntreeCatalogueBase & {
    type: "epoque";
};

export type FicheEpoqueDisney = FicheCodexBase & {
    type: "epoque";

    periode: {
        debut: DateHistorique;
        fin?: DateHistorique;
    };

    description: string;
};
