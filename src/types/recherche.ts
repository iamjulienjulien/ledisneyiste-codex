import type { ContributeurDisney } from "@/types/contributeur";
import type { EpoqueDisney } from "@/types/epoque";
import type { OeuvreDisney } from "@/types/oeuvre";
import type { PersonnageDisney } from "@/types/personnage";

export type ResultatsRechercheCodex = Readonly<{
    personnages: PersonnageDisney[];
    contributeurs: ContributeurDisney[];
    oeuvres: OeuvreDisney[];
    epoques: EpoqueDisney[];
    total: number;
}>;
