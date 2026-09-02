import "server-only";

import {
    contributeurs,
    epoques,
    oeuvres,
    personnages,
    chansons,
} from "@/data/catalogues";
import { fichesChansons } from "@/data/chansons";
import { fichesContributeurs } from "@/data/contributeurs";
import { fichesEpoques } from "@/data/epoques";
import { fichesOeuvres } from "@/data/oeuvres";
import { fichesPersonnages } from "@/data/personnages";
import {
    projeterIdentiteCodex,
    type EntreeIdentitaireCodex,
    type FicheIdentitaireCodex,
} from "@/lib/identites/projeter-identite";
import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";

type ArchivesIdentitairesCodex = Readonly<{
    catalogue: readonly EntreeIdentitaireCodex[];
    fiches: readonly FicheIdentitaireCodex[];
}>;

const archivesIdentitaires: Record<CodexFamily, ArchivesIdentitairesCodex> = {
    personnages: {
        catalogue: personnages,
        fiches: fichesPersonnages,
    },
    createurs: {
        catalogue: contributeurs,
        fiches: fichesContributeurs,
    },
    oeuvres: {
        catalogue: oeuvres,
        fiches: fichesOeuvres,
    },
    epoques: {
        catalogue: epoques,
        fiches: fichesEpoques,
    },
    chansons: {
        catalogue: chansons,
        fiches: fichesChansons,
    },
};

export function resoudreIdentiteCodex<Famille extends CodexFamily>(
    famille: Famille,
    slug: string,
): ProjectionIdentiteCodex<Famille> | null {
    const archives = archivesIdentitaires[famille];
    const entree = archives.catalogue.find(
        (candidate) => candidate.slug === slug,
    );
    const fiche = archives.fiches.find((candidate) => candidate.slug === slug);

    return projeterIdentiteCodex({
        famille,
        entree,
        fiche,
    });
}

export function listerIdentitesCodex<Famille extends CodexFamily>(
    famille: Famille,
): readonly ProjectionIdentiteCodex<Famille>[] {
    return archivesIdentitaires[famille].catalogue.map((entree) => {
        const projection = resoudreIdentiteCodex(famille, entree.slug);

        if (!projection) {
            throw new Error(
                `L’Archive « ${famille}/${entree.slug} » ne possède pas ses deux moitiés catalogue–fiche.`,
            );
        }

        return projection;
    });
}
