import contributeursJson from "@/data/catalogues/contributeurs.json";
import personnagesJson from "@/data/catalogues/personnages.json";
import oeuvresJson from "@/data/catalogues/oeuvres.json";
import type { ContributeurDisney } from "@/types/contributeur";
import type { PersonnageDisney } from "@/types/personnage";
import type { OeuvreDisney } from "@/types/oeuvre";

export const personnages = personnagesJson as PersonnageDisney[];

export const contributeurs = contributeursJson as ContributeurDisney[];

export const oeuvres = oeuvresJson as OeuvreDisney[];

export function getPersonnageBySlug(slug: string) {
    return personnages.find((personnage) => personnage.slug === slug);
}

export function getContributeurBySlug(slug: string) {
    return contributeurs.find((contributeur) => contributeur.slug === slug);
}

export function getOeuvreBySlug(slug: string) {
    return oeuvres.find((oeuvre) => oeuvre.slug === slug);
}
