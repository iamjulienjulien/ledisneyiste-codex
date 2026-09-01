import type {
    FichePersonnageDisney,
    PersonnageDisney,
} from "@/types/personnage";

export type CodexIndexPersonnageCardProps = Readonly<{
    personnage: PersonnageDisney;
    fiche: FichePersonnageDisney;
}>;
