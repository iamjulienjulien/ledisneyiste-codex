import {
    contributeurs,
    epoques,
    oeuvres,
    personnages,
} from "@/data/catalogues";
import { fichesContributeurs } from "@/data/contributeurs";
import { fichesEpoques } from "@/data/epoques";
import { fichesOeuvres } from "@/data/oeuvres";
import { fichesPersonnages } from "@/data/personnages";
import { recompenses } from "@/data/recompenses";
import { sources } from "@/data/sources";
import { creerRegistreOeuvresSources } from "@/lib/oeuvres-sources";
import { fichesOeuvresSources } from "@/registry/oeuvres-sources";
import type { CodexPlanArchives } from "@/types/codex-plans";

export const codexPlanArchives = {
    catalogues: {
        personnages,
        contributeurs,
        oeuvres,
        epoques,
    },
    fiches: {
        personnages: fichesPersonnages,
        contributeurs: fichesContributeurs,
        oeuvres: fichesOeuvres,
        epoques: fichesEpoques,
    },
    recompenses,
    sources,
    oeuvresSources: creerRegistreOeuvresSources(fichesOeuvresSources),
} satisfies CodexPlanArchives;
