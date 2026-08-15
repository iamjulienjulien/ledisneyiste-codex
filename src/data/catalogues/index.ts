import contributeursJson from "@/data/catalogues/contributeurs.json";
import personnagesJson from "@/data/catalogues/personnages.json";
import type { ContributeurDisney } from "@/types/contributeur";
import type { PersonnageDisney } from "@/types/personnage";

export const personnages = personnagesJson as PersonnageDisney[];

export const contributeurs = contributeursJson as ContributeurDisney[];

export function getPersonnageBySlug(slug: string) {
    return personnages.find((personnage) => personnage.slug === slug);
}

export function getContributeurBySlug(slug: string) {
    return contributeurs.find((contributeur) => contributeur.slug === slug);
}
