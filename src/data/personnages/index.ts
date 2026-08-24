import atchoumJson from "@/data/personnages/atchoum.json";
import blancheNeigeJson from "@/data/personnages/blanche-neige.json";
import clarabelleCowJson from "@/data/personnages/clarabelle-cow.json";
import daisyDuckJson from "@/data/personnages/daisy-duck.json";
import donaldDuckJson from "@/data/personnages/donald-duck.json";
import dingoJson from "@/data/personnages/dingo.json";
import dormeurJson from "@/data/personnages/dormeur.json";
import grincheuxJson from "@/data/personnages/grincheux.json";
import horaceHorsecollarJson from "@/data/personnages/horace-horsecollar.json";
import joyeuxJson from "@/data/personnages/joyeux.json";
import laReineJson from "@/data/personnages/la-reine.json";
import leChasseurJson from "@/data/personnages/le-chasseur.json";
import leMiroirMagiqueJson from "@/data/personnages/le-miroir-magique.json";
import lePrinceJson from "@/data/personnages/le-prince.json";
import mickeyMouseJson from "@/data/personnages/mickey-mouse.json";
import minnieMouseJson from "@/data/personnages/minnie-mouse.json";
import oswaldLeLapinChanceuxJson from "@/data/personnages/oswald-le-lapin-chanceux.json";
import patHibulaireJson from "@/data/personnages/pat-hibulaire.json";
import plutoJson from "@/data/personnages/pluto.json";
import profJson from "@/data/personnages/prof.json";
import simpletJson from "@/data/personnages/simplet.json";
import timideJson from "@/data/personnages/timide.json";
import type { FichePersonnageDisney } from "@/types/personnage";

export const fichesPersonnages = [
    oswaldLeLapinChanceuxJson as FichePersonnageDisney,
    patHibulaireJson as FichePersonnageDisney,
    mickeyMouseJson as FichePersonnageDisney,
    minnieMouseJson as FichePersonnageDisney,
    clarabelleCowJson as FichePersonnageDisney,
    horaceHorsecollarJson as FichePersonnageDisney,
    donaldDuckJson as FichePersonnageDisney,
    dingoJson as FichePersonnageDisney,
    daisyDuckJson as FichePersonnageDisney,
    plutoJson as FichePersonnageDisney,
    blancheNeigeJson as FichePersonnageDisney,
    laReineJson as FichePersonnageDisney,
    lePrinceJson as FichePersonnageDisney,
    leChasseurJson as FichePersonnageDisney,
    leMiroirMagiqueJson as FichePersonnageDisney,
    profJson as FichePersonnageDisney,
    grincheuxJson as FichePersonnageDisney,
    joyeuxJson as FichePersonnageDisney,
    dormeurJson as FichePersonnageDisney,
    timideJson as FichePersonnageDisney,
    atchoumJson as FichePersonnageDisney,
    simpletJson as FichePersonnageDisney,
];

export function getFichePersonnageBySlug(slug: string) {
    return fichesPersonnages.find((fiche) => fiche.slug === slug);
}
