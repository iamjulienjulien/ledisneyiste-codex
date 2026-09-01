import type {
    ContributeurDisney,
    FicheContributeurDisney,
} from "@/types/contributeur";
import type { ReferenceCodex } from "@/types/reference";
import type { RecompenseDisney } from "@/types/recompense";

export type CodexIndexCreateurCardProps = Readonly<{
    contributeur: ContributeurDisney;
    fiche: FicheContributeurDisney;
    epoques: ReferenceCodex[];
    recompenses: RecompenseDisney[];
}>;
