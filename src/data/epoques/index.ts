import tempsDesPionniersJson from "@/data/epoques/temps-des-pionniers.json";
import type { FicheEpoqueDisney } from "@/types/epoque";

export const fichesEpoques = [tempsDesPionniersJson as FicheEpoqueDisney];

export function getFicheEpoqueBySlug(slug: string) {
    return fichesEpoques.find((fiche) => fiche.slug === slug);
}
