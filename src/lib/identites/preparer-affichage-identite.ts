import { languesCodex } from "@/registry/identites/langues";
import { territoiresCodex } from "@/registry/identites/territoires";
import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export function preparerAffichageIdentiteCodex<Famille extends CodexFamily>(
    identite: ProjectionIdentiteCodex<Famille>,
) {
    const originale = identite.originale;

    if (!originale) {
        return {
            principale: identite.principale,
            originale: null,
        } as const;
    }

    const qualification = [
        identite.famille === "oeuvres" ? "Titre original" : "Nom original",
        originale.langue ? languesCodex[originale.langue].label : null,
        originale.territoire
            ? territoiresCodex[originale.territoire].label
            : null,
    ].filter((valeur): valeur is string => valeur !== null);

    return {
        principale: identite.principale,
        originale: {
            libelle: originale.libelle,
            langue: originale.langue ?? null,
            territoire: originale.territoire ?? null,
            qualification: qualification.join(" · "),
        },
    } as const;
}
