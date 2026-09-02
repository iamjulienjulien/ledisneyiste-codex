import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const cheminProduction =
    "docs/studio/production/acte-vi/phase-6/production.json";
const cheminSourcesPhase2 =
    "docs/studio/production/acte-vi/phase-2/sources.json";
const cheminMigrationPhase5 =
    "docs/studio/production/acte-vi/phase-5/migration.json";
const cheminRetroapplication =
    "docs/studio/production/acte-vi/phase-2/retroapplication.json";

const famillesPubliques = {
    personnages: {
        catalogue: "personnages",
        dossier: "personnages",
        attendu: 22,
    },
    createurs: {
        catalogue: "contributeurs",
        dossier: "contributeurs",
        attendu: 32,
    },
    oeuvres: {
        catalogue: "oeuvres",
        dossier: "oeuvres",
        attendu: 23,
    },
    epoques: {
        catalogue: "epoques",
        dossier: "epoques",
        attendu: 2,
    },
    chansons: {
        catalogue: "chansons",
        dossier: "chansons",
        attendu: 4,
    },
};

const ciblesPubliques = {
    oeuvres: ["pinocchio"],
    personnages: [
        "pinocchio",
        "jiminy-cricket",
        "geppetto",
        "la-fee-bleue",
        "grand-coquin",
        "gedeon",
        "stromboli",
        "le-cocher",
        "monstro",
        "crapule",
        "figaro",
    ],
    createurs: [
        "carlo-collodi",
        "ben-sharpsteen",
        "cliff-edwards",
        "dickie-jones",
        "ned-washington",
        "jack-kinney",
        "t-hee",
        "joshua-meador",
        "kenneth-anderson",
    ],
    chansons: [
        "when-you-wish-upon-a-star",
        "little-wooden-head",
        "give-a-little-whistle",
        "hi-diddle-dee-dee",
        "ive-got-no-strings",
    ],
};

const profilsAttendus = {
    "oeuvres/pinocchio": "fiche-complete",
    "personnages/pinocchio": "fiche-complete",
    "personnages/jiminy-cricket": "fiche-complete",
    "personnages/geppetto": "fiche-complete",
    "personnages/la-fee-bleue": "fiche-complete",
    "personnages/grand-coquin": "fiche-complete",
    "personnages/gedeon": "fiche-legere",
    "personnages/stromboli": "fiche-complete",
    "personnages/le-cocher": "fiche-legere",
    "personnages/monstro": "fiche-legere",
    "personnages/crapule": "fiche-legere",
    "personnages/figaro": "fiche-legere",
    "createurs/carlo-collodi": "fiche-complete",
    "createurs/ben-sharpsteen": "fiche-complete",
    "createurs/cliff-edwards": "fiche-complete",
    "createurs/dickie-jones": "fiche-complete",
    "createurs/ned-washington": "fiche-complete",
    "createurs/jack-kinney": "fiche-complete",
    "createurs/t-hee": "fiche-legere",
    "createurs/joshua-meador": "fiche-legere",
    "createurs/kenneth-anderson": "fiche-legere",
    "chansons/when-you-wish-upon-a-star": "fiche-complete",
    "chansons/little-wooden-head": "fiche-legere",
    "chansons/give-a-little-whistle": "fiche-legere",
    "chansons/hi-diddle-dee-dee": "fiche-legere",
    "chansons/ive-got-no-strings": "fiche-legere",
};

const reprisesAttendues = [
    "createurs/walt-disney",
    "createurs/hamilton-luske",
    "createurs/wilfred-jackson",
    "createurs/norman-ferguson",
    "createurs/ward-kimball",
    "createurs/fred-moore",
    "createurs/milt-kahl",
    "createurs/frank-thomas",
    "createurs/eric-larson",
    "createurs/ollie-johnston",
    "createurs/john-lounsbery",
    "createurs/wolfgang-reitherman",
    "createurs/vladimir-bill-tytla",
    "createurs/joe-grant",
    "createurs/gustaf-tenggren",
    "createurs/leigh-harline",
    "createurs/paul-j-smith",
    "createurs/marge-champion",
    "epoques/temps-des-chefs-d-oeuvre",
].sort();

const unitesInternesAttendues = [
    "createurs/evelyn-venable",
    "oeuvres-sources/le-avventure-di-pinocchio",
    "personnages/cleo",
    "recompenses/academy-awards-1941-pinocchio-original-score",
    "recompenses/academy-awards-1941-when-you-wish-upon-a-star",
].sort();

const statuts = new Set(["a-faire", "en-cours", "publiee", "reportee"]);
const profils = new Set(["fiche-complete", "fiche-legere"]);
const priorites = new Set(["P0", "P1"]);
const trains = new Set(["6B", "6C", "6D", "6F"]);

function chemin(...segments) {
    return path.join(racine, ...segments);
}

function lireTexte(fichier) {
    return readFileSync(chemin(fichier), "utf8");
}

function lireJson(fichier) {
    return JSON.parse(lireTexte(fichier));
}

function sha256(contenu) {
    return createHash("sha256").update(contenu).digest("hex");
}

function cle(famille, slug) {
    return `${famille}/${slug}`;
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function verifierDocuments() {
    for (const document of [
        "etat-reference.md",
        "production.json",
        "train-6a.md",
    ]) {
        assert.ok(
            existsSync(
                chemin("docs/studio/production/acte-vi/phase-6", document),
            ),
            `Phase 6 : document absent ${document}`,
        );
    }
}

function verifierPhotographie(production) {
    let nombreEntrees = 0;

    for (const [famille, configuration] of Object.entries(famillesPubliques)) {
        const catalogue = lireJson(
            `src/data/catalogues/${configuration.catalogue}.json`,
        );
        const slugs = new Set(catalogue.map((entree) => entree.slug));

        assert.equal(
            catalogue.length,
            configuration.attendu,
            `${famille} : la référence du Train 6A a dérivé`,
        );
        assert.equal(
            slugs.size,
            catalogue.length,
            `${famille} : slug public dupliqué`,
        );

        for (const entree of catalogue) {
            assert.ok(
                existsSync(
                    chemin(
                        "src/data",
                        configuration.dossier,
                        `${entree.slug}.json`,
                    ),
                ),
                `${famille}/${entree.slug} : fiche publique absente`,
            );
        }

        for (const slug of ciblesPubliques[famille] ?? []) {
            assert.ok(
                !slugs.has(slug),
                `${famille}/${slug} : Archive créée avant son Train`,
            );
            assert.ok(
                !existsSync(
                    chemin("src/data", configuration.dossier, `${slug}.json`),
                ),
                `${famille}/${slug} : fichier produit prématuré`,
            );
        }

        nombreEntrees += catalogue.length;
    }

    assert.equal(nombreEntrees, 83);
    assert.deepEqual(production.baseline, {
        publicFamilies: 5,
        publicEntries: 83,
        publicRoutes: 83,
        works: 23,
        characters: 22,
        creators: 32,
        songs: 4,
        eras: 2,
        rewards: 14,
        centralSources: 208,
        protectedLegacyRoutes: 45,
    });

    const recompenses = lireJson("src/data/recompenses/recompenses.json");
    assert.equal(recompenses.length, 14);

    const retroapplication = lireJson(cheminRetroapplication);
    assert.equal(
        retroapplication.expectedTotals.legacyDetailRoutesToPreserve,
        45,
    );
    const anciennesRoutes = retroapplication.entries.filter((entree) =>
        ["oeuvres", "personnages"].includes(entree.family),
    );
    assert.equal(anciennesRoutes.length, 45);

    for (const entree of anciennesRoutes) {
        const configuration = famillesPubliques[entree.family];
        const catalogue = lireJson(
            `src/data/catalogues/${configuration.catalogue}.json`,
        );
        assert.ok(
            catalogue.some((candidate) => candidate.slug === entree.slug),
            `${cle(entree.family, entree.slug)} : route historique perdue`,
        );
    }
}

function verifierSources(production) {
    const sourcesPhase2 = lireJson(cheminSourcesPhase2).sources;
    const sourcesCentrales = lireJson("src/data/sources/sources.json");
    const idsPhase2 = new Set(sourcesPhase2.map((source) => source.id));
    const idsCentraux = new Set(sourcesCentrales.map((source) => source.id));
    const recouvrement = [...idsPhase2]
        .filter((id) => idsCentraux.has(id))
        .sort();

    assert.equal(sourcesPhase2.length, 32);
    assert.equal(idsPhase2.size, 32);
    assert.equal(sourcesCentrales.length, 208);
    assert.deepEqual(recouvrement, [
        "fr-bnf-big-bad-wolf-song",
        "fr-bnf-snow-white-songs",
    ]);
    assert.deepEqual(production.sourceInventory, {
        candidateCount: 32,
        alreadyCentral: ["fr-bnf-snow-white-songs", "fr-bnf-big-bad-wolf-song"],
        remainingPrivateAtOpening: 30,
        promotionPolicy: "usage-only",
    });

    for (const sourceManifeste of production.sourceManifests) {
        assert.equal(
            sha256(lireTexte(sourceManifeste.path)),
            sourceManifeste.sha256,
            `${sourceManifeste.path} : empreinte altérée`,
        );
    }

    return { idsPhase2, idsCentraux };
}

function verifierManifeste(production, sources) {
    assert.equal(production.schemaVersion, "1.0.0");
    assert.equal(production.status, "in-progress");
    assert.equal(production.owner, "R2-D2");
    assert.equal(production.productionPersona, "Geppetto");
    assert.equal(production.entries.length, 26);
    assert.equal(Object.keys(profilsAttendus).length, 26);

    assert.deepEqual(production.target, {
        publicFamilies: 5,
        publicEntries: 109,
        publicRoutes: 109,
        newPublicEntries: 26,
        works: 24,
        characters: 33,
        creators: 41,
        songs: 9,
        eras: 2,
        rewards: 16,
        internalSourceWorks: 1,
        relationOnlyCharacters: 1,
        creditOnlyCreators: 1,
    });
    assert.equal(
        production.baseline.publicEntries + production.entries.length,
        production.target.publicEntries,
    );

    const repartition = {
        oeuvres: 0,
        personnages: 0,
        createurs: 0,
        chansons: 0,
    };
    const progression = {
        "a-faire": 0,
        "en-cours": 0,
        publiee: 0,
        reportee: 0,
        verdicts: 0,
    };
    const cles = new Set();

    for (const entree of production.entries) {
        const id = cle(entree.family, entree.slug);

        assert.ok(famillesPubliques[entree.family], `${id} : famille inconnue`);
        assert.ok(chaineNonVide(entree.label), `${id} : libellé absent`);
        assert.equal(
            entree.profile,
            profilsAttendus[id],
            `${id} : profil inattendu`,
        );
        assert.ok(profils.has(entree.profile), `${id} : profil invalide`);
        assert.ok(priorites.has(entree.priority), `${id} : priorité invalide`);
        assert.ok(trains.has(entree.train), `${id} : Train invalide`);
        assert.ok(statuts.has(entree.status), `${id} : statut invalide`);
        assert.ok(!cles.has(id), `${id} : cible dupliquée`);
        assert.ok(
            Array.isArray(entree.sources.required) &&
                entree.sources.required.length > 0,
            `${id} : sources requises absentes`,
        );
        assert.ok(
            entree.sources.required.every((source) =>
                sources.idsPhase2.has(source),
            ),
            `${id} : source requise étrangère à la matrice`,
        );
        assert.ok(Array.isArray(entree.sources.promoted));
        assert.ok(
            entree.sources.promoted.every(
                (source) =>
                    entree.sources.required.includes(source) &&
                    sources.idsCentraux.has(source),
            ),
            `${id} : source déclarée promue sans preuve centrale`,
        );
        assert.ok(Array.isArray(entree.files));
        assert.ok(Array.isArray(entree.relations));
        assert.ok(
            entree.checks.includes("pnpm check:phase-6"),
            `${id} : contrôle Phase 6 absent`,
        );
        assert.ok(
            Array.isArray(entree.reservations) &&
                entree.reservations.every(chaineNonVide),
            `${id} : réserves invalides`,
        );

        if (entree.status === "a-faire") {
            assert.deepEqual(entree.files, [], `${id} : fichier prématuré`);
            assert.deepEqual(
                entree.relations,
                [],
                `${id} : relation prématurée`,
            );
            assert.deepEqual(
                entree.sources.promoted,
                [],
                `${id} : source promue avant son Train`,
            );
        } else if (!new Set(["en-cours"]).has(entree.status)) {
            progression.verdicts += 1;
        }

        cles.add(id);
        repartition[entree.family] += 1;
        progression[entree.status] += 1;
    }

    assert.deepEqual([...cles].sort(), Object.keys(profilsAttendus).sort());
    assert.deepEqual(repartition, {
        oeuvres: 1,
        personnages: 11,
        createurs: 9,
        chansons: 5,
    });
    assert.deepEqual(progression, production.progress);
}

function verifierUnitesInternes(production, sources) {
    assert.equal(production.internalUnits.length, 5);
    assert.deepEqual(
        production.internalUnits
            .map((entree) => cle(entree.domain, entree.slug))
            .sort(),
        unitesInternesAttendues,
    );

    for (const entree of production.internalUnits) {
        const id = cle(entree.domain, entree.slug);
        assert.equal(entree.route, null, `${id} : route interne interdite`);
        assert.ok(
            entree.sources.required.every((source) =>
                sources.idsPhase2.has(source),
            ),
            `${id} : source interne inconnue`,
        );
        assert.deepEqual(entree.sources.promoted, []);
        assert.ok(
            Array.isArray(entree.reservations) &&
                entree.reservations.every(chaineNonVide),
            `${id} : frontière interne absente`,
        );
    }

    const recompenses = lireJson("src/data/recompenses/recompenses.json");
    for (const entree of production.internalUnits.filter(
        (candidate) => candidate.domain === "recompenses",
    )) {
        assert.ok(
            !recompenses.some((recompense) => recompense.id === entree.slug),
            `${entree.slug} : Récompense créée avant le Train 6F`,
        );
    }
}

function verifierReprises(production) {
    const migration = lireJson(cheminMigrationPhase5);
    const reports = migration.entries.filter(
        (entree) => entree.status === "reportee",
    );
    const reportsParCle = new Map(
        reports.map((entree) => [cle(entree.family, entree.slug), entree]),
    );
    const reprises = production.relays
        .map((entree) => cle(entree.family, entree.slug))
        .sort();

    assert.equal(migration.status, "complete");
    assert.equal(reports.length, 19);
    assert.deepEqual(reprises, reprisesAttendues);
    assert.ok(!reprises.includes("createurs/david-hand"));

    for (const entree of production.relays) {
        const id = cle(entree.family, entree.slug);
        assert.equal(
            entree.sourceStatus,
            "reportee",
            `${id} : statut source altéré`,
        );
        assert.ok(
            reportsParCle.has(id),
            `${id} : report de Phase 5 introuvable`,
        );
    }
}

function verifierSymboles(production) {
    assert.equal(production.symbolInventory.collections.length, 5);
    assert.deepEqual(production.symbolInventory.missing, []);
    assert.equal(production.symbolInventory.huyangHandoffRequired, false);

    for (const collection of production.symbolInventory.collections) {
        const fichiers = readdirSync(chemin(collection.path)).filter(
            (fichier) => fichier.endsWith(".png"),
        );
        assert.equal(
            fichiers.length,
            collection.pngCount,
            `${collection.registry}/${collection.collection} : inventaire de Symboles altéré`,
        );
        assert.ok(
            fichiers.includes("principal.png"),
            `${collection.registry}/${collection.collection} : Symbole principal absent`,
        );
        assert.equal(collection.status, "ready");
    }
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");

    assert.equal(
        packageJson.scripts["check:phase-6"],
        "node scripts/verifier-phase-6.mjs",
    );
    for (const script of ["check", "check:ci"]) {
        assert.match(
            packageJson.scripts[script],
            /pnpm check:phase-5 && pnpm check:phase-6/,
            `${script} : la Phase 6 doit suivre la Phase 5`,
        );
    }
}

verifierDocuments();
const production = lireJson(cheminProduction);
verifierPhotographie(production);
const sources = verifierSources(production);
verifierManifeste(production, sources);
verifierUnitesInternes(production, sources);
verifierReprises(production);
verifierSymboles(production);
verifierBranchement();

console.log(
    `Phase 6 ouverte : ${production.baseline.publicEntries} Archives protégées, ${production.entries.length} créations fermées, ${production.relays.length} reprises et ${production.sourceInventory.candidateCount} sources sous contrôle.`,
);
