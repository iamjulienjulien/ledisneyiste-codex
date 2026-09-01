import type {
    FichePersonnageDisney,
    PersonnageDisney,
} from "@/types/personnage";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexPersonnageCardProps = Readonly<{
    personnage: PersonnageDisney;
    fiche: FichePersonnageDisney;
    identite: ProjectionIdentiteCodex<"personnages">;
}>;
