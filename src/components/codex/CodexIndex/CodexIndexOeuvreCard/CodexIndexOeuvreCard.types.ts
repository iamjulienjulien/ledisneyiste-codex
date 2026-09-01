import type { FicheOeuvreDisney, OeuvreDisney } from "@/types/oeuvre";
import type { RecompenseDisney } from "@/types/recompense";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexIndexOeuvreCardProps = Readonly<{
    oeuvre: OeuvreDisney;
    fiche: FicheOeuvreDisney;
    identite: ProjectionIdentiteCodex<"oeuvres">;
    recompenses: RecompenseDisney[];
}>;
