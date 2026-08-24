import alicesWonderlandJson from "@/data/oeuvres/alices-wonderland.json";
import boneTroubleJson from "@/data/oeuvres/bone-trouble.json";
import clockCleanersJson from "@/data/oeuvres/clock-cleaners.json";
import ferdinandTheBullJson from "@/data/oeuvres/ferdinand-the-bull.json";
import flowersAndTreesJson from "@/data/oeuvres/flowers-and-trees.json";
import mickeysRevueJson from "@/data/oeuvres/mickeys-revue.json";
import mrDuckStepsOutJson from "@/data/oeuvres/mr-duck-steps-out.json";
import orphansBenefitJson from "@/data/oeuvres/orphans-benefit.json";
import planeCrazyJson from "@/data/oeuvres/plane-crazy.json";
import snowWhiteAndTheSevenDwarfsJson from "@/data/oeuvres/snow-white-and-the-seven-dwarfs.json";
import steamboatWillieJson from "@/data/oeuvres/steamboat-willie.json";
import theBandConcertJson from "@/data/oeuvres/the-band-concert.json";
import theChainGangJson from "@/data/oeuvres/the-chain-gang.json";
import theCountryCousinJson from "@/data/oeuvres/the-country-cousin.json";
import theGallopinGauchoJson from "@/data/oeuvres/the-gallopin-gaucho.json";
import theGoddessOfSpringJson from "@/data/oeuvres/the-goddess-of-spring.json";
import theOldMillJson from "@/data/oeuvres/the-old-mill.json";
import theSkeletonDanceJson from "@/data/oeuvres/the-skeleton-dance.json";
import theTortoiseAndTheHareJson from "@/data/oeuvres/the-tortoise-and-the-hare.json";
import threeLittlePigsJson from "@/data/oeuvres/three-little-pigs.json";
import theWiseLittleHenJson from "@/data/oeuvres/the-wise-little-hen.json";
import trolleyTroublesJson from "@/data/oeuvres/trolley-troubles.json";
import threeOrphanKittensJson from "@/data/oeuvres/three-orphan-kittens.json";
import type { FicheOeuvreDisney } from "@/types/oeuvre";

export const fichesOeuvres = [
    alicesWonderlandJson as FicheOeuvreDisney,
    trolleyTroublesJson as FicheOeuvreDisney,
    steamboatWillieJson as FicheOeuvreDisney,
    theGallopinGauchoJson as FicheOeuvreDisney,
    planeCrazyJson as FicheOeuvreDisney,
    theSkeletonDanceJson as FicheOeuvreDisney,
    theChainGangJson as FicheOeuvreDisney,
    mickeysRevueJson as FicheOeuvreDisney,
    flowersAndTreesJson as FicheOeuvreDisney,
    threeLittlePigsJson as FicheOeuvreDisney,
    theWiseLittleHenJson as FicheOeuvreDisney,
    orphansBenefitJson as FicheOeuvreDisney,
    theGoddessOfSpringJson as FicheOeuvreDisney,
    theTortoiseAndTheHareJson as FicheOeuvreDisney,
    theBandConcertJson as FicheOeuvreDisney,
    threeOrphanKittensJson as FicheOeuvreDisney,
    theCountryCousinJson as FicheOeuvreDisney,
    clockCleanersJson as FicheOeuvreDisney,
    theOldMillJson as FicheOeuvreDisney,
    snowWhiteAndTheSevenDwarfsJson as FicheOeuvreDisney,
    ferdinandTheBullJson as FicheOeuvreDisney,
    mrDuckStepsOutJson as FicheOeuvreDisney,
    boneTroubleJson as FicheOeuvreDisney,
];

export function getFicheOeuvreBySlug(slug: string) {
    return fichesOeuvres.find((fiche) => fiche.slug === slug);
}
