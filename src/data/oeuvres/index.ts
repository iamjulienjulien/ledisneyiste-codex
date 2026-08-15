import steamboatWillieJson from "@/data/oeuvres/steamboat-willie.json";
import type { FicheOeuvreDisney } from "@/types/oeuvre";

export const fichesOeuvres = [steamboatWillieJson as FicheOeuvreDisney];

export function getFicheOeuvreBySlug(slug: string) {
    return fichesOeuvres.find((fiche) => fiche.slug === slug);
}
