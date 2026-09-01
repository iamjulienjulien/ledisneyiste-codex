import type { EpoqueDisney, FicheEpoqueDisney } from "@/types/epoque";

export type CodexIndexEpoqueCardProps = Readonly<{
    epoque: EpoqueDisney;
    fiche: FicheEpoqueDisney;
    nombres: {
        oeuvres: number;
        personnages: number;
        createurs: number;
    };
}>;
