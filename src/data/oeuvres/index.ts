import steamboatWillieJson from "@/data/oeuvres/steamboat-willie.json";
import theWiseLittleHenJson from "@/data/oeuvres/the-wise-little-hen.json";
import type { FicheOeuvreDisney } from "@/types/oeuvre";

export const fichesOeuvres = [
    steamboatWillieJson as FicheOeuvreDisney,
    theWiseLittleHenJson as FicheOeuvreDisney,
];

export function getFicheOeuvreBySlug(slug: string) {
    return fichesOeuvres.find((fiche) => fiche.slug === slug);
}
