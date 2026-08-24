import carlStallingJson from "@/data/contributeurs/carl-stalling.json";
import clarenceNashJson from "@/data/contributeurs/clarence-nash.json";
import albertHurterJson from "@/data/contributeurs/albert-hurter.json";
import davidHandJson from "@/data/contributeurs/david-hand.json";
import ericLarsonJson from "@/data/contributeurs/eric-larson.json";
import frankChurchillJson from "@/data/contributeurs/frank-churchill.json";
import frankThomasJson from "@/data/contributeurs/frank-thomas.json";
import fredMooreJson from "@/data/contributeurs/fred-moore.json";
import grimNatwickJson from "@/data/contributeurs/grim-natwick.json";
import gustafTenggrenJson from "@/data/contributeurs/gustaf-tenggren.json";
import hamiltonLuskeJson from "@/data/contributeurs/hamilton-luske.json";
import hazelSewellJson from "@/data/contributeurs/hazel-sewell.json";
import johnLounsberyJson from "@/data/contributeurs/john-lounsbery.json";
import joeGrantJson from "@/data/contributeurs/joe-grant.json";
import lesClarkJson from "@/data/contributeurs/les-clark.json";
import leighHarlineJson from "@/data/contributeurs/leigh-harline.json";
import marcDavisJson from "@/data/contributeurs/marc-davis.json";
import miltKahlJson from "@/data/contributeurs/milt-kahl.json";
import normanFergusonJson from "@/data/contributeurs/norman-ferguson.json";
import ollieJohnstonJson from "@/data/contributeurs/ollie-johnston.json";
import pintoColvigJson from "@/data/contributeurs/pinto-colvig.json";
import paulJSmithJson from "@/data/contributeurs/paul-j-smith.json";
import royODisneyJson from "@/data/contributeurs/roy-o-disney.json";
import ubIwerksJson from "@/data/contributeurs/ub-iwerks.json";
import wardKimballJson from "@/data/contributeurs/ward-kimball.json";
import waltDisneyJson from "@/data/contributeurs/walt-disney.json";
import wilfredJacksonJson from "@/data/contributeurs/wilfred-jackson.json";
import wolfgangReithermanJson from "@/data/contributeurs/wolfgang-reitherman.json";
import vladimirBillTytlaJson from "@/data/contributeurs/vladimir-bill-tytla.json";
import type { FicheContributeurDisney } from "@/types/contributeur";

export const fichesContributeurs = [
    waltDisneyJson as FicheContributeurDisney,
    royODisneyJson as FicheContributeurDisney,
    ubIwerksJson as FicheContributeurDisney,
    carlStallingJson as FicheContributeurDisney,
    wilfredJacksonJson as FicheContributeurDisney,
    clarenceNashJson as FicheContributeurDisney,
    pintoColvigJson as FicheContributeurDisney,
    lesClarkJson as FicheContributeurDisney,
    ericLarsonJson as FicheContributeurDisney,
    wolfgangReithermanJson as FicheContributeurDisney,
    miltKahlJson as FicheContributeurDisney,
    wardKimballJson as FicheContributeurDisney,
    frankThomasJson as FicheContributeurDisney,
    ollieJohnstonJson as FicheContributeurDisney,
    marcDavisJson as FicheContributeurDisney,
    johnLounsberyJson as FicheContributeurDisney,
    davidHandJson as FicheContributeurDisney,
    hamiltonLuskeJson as FicheContributeurDisney,
    fredMooreJson as FicheContributeurDisney,
    vladimirBillTytlaJson as FicheContributeurDisney,
    normanFergusonJson as FicheContributeurDisney,
    grimNatwickJson as FicheContributeurDisney,
    albertHurterJson as FicheContributeurDisney,
    joeGrantJson as FicheContributeurDisney,
    gustafTenggrenJson as FicheContributeurDisney,
    hazelSewellJson as FicheContributeurDisney,
    frankChurchillJson as FicheContributeurDisney,
    leighHarlineJson as FicheContributeurDisney,
    paulJSmithJson as FicheContributeurDisney,
];

export function getFicheContributeurBySlug(slug: string) {
    return fichesContributeurs.find((fiche) => fiche.slug === slug);
}
