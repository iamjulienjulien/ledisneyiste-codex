import waltDisneyJson from "@/data/contributeurs/walt-disney.json";
import type { FicheContributeurDisney } from "@/types/contributeur";

export const fichesContributeurs = [waltDisneyJson as FicheContributeurDisney];

export function getFicheContributeurBySlug(slug: string) {
    return fichesContributeurs.find((fiche) => fiche.slug === slug);
}
