import type { EpoqueDisney, FicheEpoqueDisney } from "@/types/epoque";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexEpoqueCardProps = Readonly<{
    epoque: EpoqueDisney;
    fiche: FicheEpoqueDisney;
    identite: ProjectionIdentiteCodex<"epoques">;
    nombres: {
        oeuvres: number;
        personnages: number;
        createurs: number;
    };
}>;
