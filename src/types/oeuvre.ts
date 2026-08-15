import type { EntreeCatalogueBase } from "@/types/codex";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type { ReferenceCodex } from "@/types/reference";

export type OeuvreDisney = EntreeCatalogueBase & {
    type: "oeuvre";
};

export type FicheOeuvreDisney = FicheCodexBase & {
    type: "oeuvre";

    sortie: {
        date: DateHistorique;
    };

    format: string;

    contributeurs: ReferenceCodex[];

    personnages: ReferenceCodex[];
};
