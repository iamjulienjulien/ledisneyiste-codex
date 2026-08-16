import daisyDuckJson from "@/data/personnages/daisy-duck.json";
import donaldDuckJson from "@/data/personnages/donald-duck.json";
import dingoJson from "@/data/personnages/dingo.json";
import mickeyMouseJson from "@/data/personnages/mickey-mouse.json";
import minnieMouseJson from "@/data/personnages/minnie-mouse.json";
import type { FichePersonnageDisney } from "@/types/personnage";

export const fichesPersonnages = [
    mickeyMouseJson as FichePersonnageDisney,
    minnieMouseJson as FichePersonnageDisney,
    donaldDuckJson as FichePersonnageDisney,
    dingoJson as FichePersonnageDisney,
    daisyDuckJson as FichePersonnageDisney,
];

export function getFichePersonnageBySlug(slug: string) {
    return fichesPersonnages.find((fiche) => fiche.slug === slug);
}
