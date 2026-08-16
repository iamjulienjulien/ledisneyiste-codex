import ericLarsonJson from "@/data/contributeurs/eric-larson.json";
import frankThomasJson from "@/data/contributeurs/frank-thomas.json";
import lesClarkJson from "@/data/contributeurs/les-clark.json";
import miltKahlJson from "@/data/contributeurs/milt-kahl.json";
import ubIwerksJson from "@/data/contributeurs/ub-iwerks.json";
import wardKimballJson from "@/data/contributeurs/ward-kimball.json";
import waltDisneyJson from "@/data/contributeurs/walt-disney.json";
import wolfgangReithermanJson from "@/data/contributeurs/wolfgang-reitherman.json";
import type { FicheContributeurDisney } from "@/types/contributeur";

export const fichesContributeurs = [
    waltDisneyJson as FicheContributeurDisney,
    ubIwerksJson as FicheContributeurDisney,
    lesClarkJson as FicheContributeurDisney,
    ericLarsonJson as FicheContributeurDisney,
    wolfgangReithermanJson as FicheContributeurDisney,
    miltKahlJson as FicheContributeurDisney,
    wardKimballJson as FicheContributeurDisney,
    frankThomasJson as FicheContributeurDisney,
];

export function getFicheContributeurBySlug(slug: string) {
    return fichesContributeurs.find((fiche) => fiche.slug === slug);
}
