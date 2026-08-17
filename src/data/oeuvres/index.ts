import alicesWonderlandJson from "@/data/oeuvres/alices-wonderland.json";
import boneTroubleJson from "@/data/oeuvres/bone-trouble.json";
import clockCleanersJson from "@/data/oeuvres/clock-cleaners.json";
import mrDuckStepsOutJson from "@/data/oeuvres/mr-duck-steps-out.json";
import steamboatWillieJson from "@/data/oeuvres/steamboat-willie.json";
import theBandConcertJson from "@/data/oeuvres/the-band-concert.json";
import theWiseLittleHenJson from "@/data/oeuvres/the-wise-little-hen.json";
import trolleyTroublesJson from "@/data/oeuvres/trolley-troubles.json";
import type { FicheOeuvreDisney } from "@/types/oeuvre";

export const fichesOeuvres = [
    alicesWonderlandJson as FicheOeuvreDisney,
    trolleyTroublesJson as FicheOeuvreDisney,
    steamboatWillieJson as FicheOeuvreDisney,
    theWiseLittleHenJson as FicheOeuvreDisney,
    theBandConcertJson as FicheOeuvreDisney,
    clockCleanersJson as FicheOeuvreDisney,
    mrDuckStepsOutJson as FicheOeuvreDisney,
    boneTroubleJson as FicheOeuvreDisney,
];

export function getFicheOeuvreBySlug(slug: string) {
    return fichesOeuvres.find((fiche) => fiche.slug === slug);
}
