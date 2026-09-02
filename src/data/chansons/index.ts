import whistleWhileYouWorkJson from "@/data/chansons/whistle-while-you-work.json";
import heighHoJson from "@/data/chansons/heigh-ho.json";
import somedayMyPrinceWillComeJson from "@/data/chansons/someday-my-prince-will-come.json";
import whosAfraidOfTheBigBadWolfJson from "@/data/chansons/whos-afraid-of-the-big-bad-wolf.json";
import type { FicheChansonDisney } from "@/types/chanson";

export const fichesChansons = [
    whistleWhileYouWorkJson,
    heighHoJson,
    somedayMyPrinceWillComeJson,
    whosAfraidOfTheBigBadWolfJson,
] as FicheChansonDisney[];

export function getFicheChansonBySlug(slug: string) {
    return fichesChansons.find((fiche) => fiche.slug === slug);
}
