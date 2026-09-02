import type { ChansonDisney, FicheChansonDisney } from "@/types/chanson";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexChansonCardProps = Readonly<{
    chanson: ChansonDisney;
    fiche: FicheChansonDisney;
    identite: ProjectionIdentiteCodex<"chansons">;
}>;
