import mickeyMouseJson from "@/data/personnages/mickey-mouse.json";
import type { FichePersonnageDisney } from "@/types/personnage";

export const fichesPersonnages = [mickeyMouseJson as FichePersonnageDisney];

export function getFichePersonnageBySlug(slug: string) {
    return fichesPersonnages.find((fiche) => fiche.slug === slug);
}
