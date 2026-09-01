import type {
    ContributeurDisney,
    FicheContributeurDisney,
} from "@/types/contributeur";
import type { ReferenceCodex } from "@/types/reference";
import type { RecompenseDisney } from "@/types/recompense";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexCreateurCardProps = Readonly<{
    contributeur: ContributeurDisney;
    fiche: FicheContributeurDisney;
    identite: ProjectionIdentiteCodex<"createurs">;
    epoques: ReferenceCodex[];
    recompenses: RecompenseDisney[];
}>;
