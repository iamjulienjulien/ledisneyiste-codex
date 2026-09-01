import type { FicheOeuvreDisney, OeuvreDisney } from "@/types/oeuvre";
import type { RecompenseDisney } from "@/types/recompense";

export type CodexIndexOeuvreCardProps = Readonly<{
    oeuvre: OeuvreDisney;
    fiche: FicheOeuvreDisney;
    recompenses: RecompenseDisney[];
}>;
