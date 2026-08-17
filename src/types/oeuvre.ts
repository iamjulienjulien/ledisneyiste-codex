import type { EntreeCatalogueBase } from "@/types/codex";
import type {
    CollectionOeuvreDisney,
    CouleurOeuvreDisney,
    SonOeuvreDisney,
    TypeOeuvreDisney,
} from "@/types/metadata";
import type { DateHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type { ReferenceCodex } from "@/types/reference";

export type OeuvreDisney = EntreeCatalogueBase & {
    type: "oeuvre";
    metadata: {
        collection: CollectionOeuvreDisney;
        type: TypeOeuvreDisney;
        son: SonOeuvreDisney;
        couleur: CouleurOeuvreDisney;
    };
};

export type ContributionOeuvre = {
    contributeur: ReferenceCodex;
    roles: string[];
};

export type FicheOeuvreDisney = FicheCodexBase<"oeuvres"> & {
    type: "oeuvre";

    sortie: {
        date: DateHistorique;
    };

    format: string;

    contributions: ContributionOeuvre[];

    personnages: ReferenceCodex[];
};
