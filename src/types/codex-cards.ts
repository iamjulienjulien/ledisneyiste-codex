import type {
    ContributeurDisney,
    FicheContributeurDisney,
} from "@/types/contributeur";
import type { EpoqueDisney, FicheEpoqueDisney } from "@/types/epoque";
import type { FicheOeuvreDisney, OeuvreDisney } from "@/types/oeuvre";
import type {
    FichePersonnageDisney,
    PersonnageDisney,
} from "@/types/personnage";
import type { ReferenceCodex } from "@/types/reference";

export type CodexPersonnageCardProps = Readonly<{
    personnage: PersonnageDisney;
    fiche: FichePersonnageDisney;
}>;

export type CodexCreateurCardProps = Readonly<{
    contributeur: ContributeurDisney;
    fiche: FicheContributeurDisney;
    epoques: ReferenceCodex[];
}>;

export type CodexOeuvreCardProps = Readonly<{
    oeuvre: OeuvreDisney;
    fiche: FicheOeuvreDisney;
}>;

export type CodexEpoqueCardProps = Readonly<{
    epoque: EpoqueDisney;
    fiche: FicheEpoqueDisney;
    nombres: {
        oeuvres: number;
        personnages: number;
        createurs: number;
    };
}>;
