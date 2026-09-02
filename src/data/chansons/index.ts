import whistleWhileYouWorkJson from "@/data/chansons/whistle-while-you-work.json";
import heighHoJson from "@/data/chansons/heigh-ho.json";
import somedayMyPrinceWillComeJson from "@/data/chansons/someday-my-prince-will-come.json";
import whosAfraidOfTheBigBadWolfJson from "@/data/chansons/whos-afraid-of-the-big-bad-wolf.json";
import whenYouWishUponAStarJson from "@/data/chansons/when-you-wish-upon-a-star.json";
import littleWoodenHeadJson from "@/data/chansons/little-wooden-head.json";
import giveALittleWhistleJson from "@/data/chansons/give-a-little-whistle.json";
import hiDiddleDeeDeeJson from "@/data/chansons/hi-diddle-dee-dee.json";
import iveGotNoStringsJson from "@/data/chansons/ive-got-no-strings.json";
import type { FicheChansonDisney } from "@/types/chanson";

export const fichesChansons = [
    whistleWhileYouWorkJson,
    heighHoJson,
    somedayMyPrinceWillComeJson,
    whosAfraidOfTheBigBadWolfJson,
    whenYouWishUponAStarJson,
    littleWoodenHeadJson,
    giveALittleWhistleJson,
    hiDiddleDeeDeeJson,
    iveGotNoStringsJson,
] as FicheChansonDisney[];

export function getFicheChansonBySlug(slug: string) {
    return fichesChansons.find((fiche) => fiche.slug === slug);
}
