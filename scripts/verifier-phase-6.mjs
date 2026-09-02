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
        baseline: "characters",
    },
    createurs: {
        catalogue: "contributeurs",
        dossier: "contributeurs",
        baseline: "creators",
    },
    oeuvres: {
        catalogue: "oeuvres",
        dossier: "oeuvres",
        baseline: "works",
    },
    epoques: {
        catalogue: "epoques",
        dossier: "epoques",
        baseline: "eras",
    },
    chansons: {
        catalogue: "chansons",
        dossier: "chansons",
        baseline: "songs",
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
        "train-6b.md",
        "train-6c.md",
        "train-6d.md",
        "train-6e.md",
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
    const publications = production.entries.filter(
        (entree) => entree.status === "publiee",
    );

    for (const [famille, configuration] of Object.entries(famillesPubliques)) {
        const catalogue = lireJson(
            `src/data/catalogues/${configuration.catalogue}.json`,
        );
        const slugs = new Set(catalogue.map((entree) => entree.slug));

        const ajouts = publications.filter(
            (entree) => entree.family === famille,
        );
        const totalAttendu =
            production.baseline[configuration.baseline] + ajouts.length;
        assert.equal(
            catalogue.length,
            totalAttendu,
            `${famille} : le socle et les publications autorisées ne correspondent plus au catalogue`,
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
            const entree = production.entries.find(
                (candidate) =>
                    candidate.family === famille && candidate.slug === slug,
            );
            const doitEtrePubliee = entree?.status === "publiee";
            assert.equal(
                slugs.has(slug),
                doitEtrePubliee,
                doitEtrePubliee
                    ? `${famille}/${slug} : Archive publiée absente du catalogue`
                    : `${famille}/${slug} : Archive créée avant son Train`,
            );
            assert.equal(
                existsSync(
                    chemin("src/data", configuration.dossier, `${slug}.json`),
                ),
                doitEtrePubliee,
                doitEtrePubliee
                    ? `${famille}/${slug} : fiche publiée absente`
                    : `${famille}/${slug} : fichier produit prématuré`,
            );
        }

        nombreEntrees += catalogue.length;
    }

    assert.equal(
        nombreEntrees,
        production.baseline.publicEntries + publications.length,
    );
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
    const promotions = production.sourceInventory.promoted;
    const recouvrementAttendu = [
        ...production.sourceInventory.alreadyCentral,
        ...promotions,
    ].sort();
    assert.equal(
        sourcesCentrales.length,
        production.baseline.centralSources + promotions.length,
    );
    assert.deepEqual(recouvrement, recouvrementAttendu);
    assert.equal(production.sourceInventory.candidateCount, 32);
    assert.equal(production.sourceInventory.remainingPrivateAtOpening, 30);
    assert.equal(
        production.sourceInventory.remainingPrivateCurrent,
        production.sourceInventory.remainingPrivateAtOpening -
            promotions.length,
    );
    assert.equal(production.sourceInventory.promotionPolicy, "usage-only");
    assert.equal(new Set(promotions).size, promotions.length);
    assert.ok(promotions.every((source) => idsPhase2.has(source)));

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
        } else if (entree.status === "publiee") {
            assert.deepEqual(
                [...entree.sources.promoted].sort(),
                [...entree.sources.required].sort(),
                `${id} : une source requise n’est pas promue`,
            );
            assert.ok(entree.files.length > 0, `${id} : fichier livré absent`);
            assert.ok(
                entree.files.every((fichier) => existsSync(chemin(fichier))),
                `${id} : un fichier déclaré n’existe pas`,
            );
            assert.ok(
                entree.relations.length > 0,
                `${id} : relation livrée absente`,
            );
            progression.verdicts += 1;
        } else if (entree.status !== "en-cours") {
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
        assert.ok(
            entree.sources.promoted.every(
                (source) =>
                    entree.sources.required.includes(source) &&
                    sources.idsCentraux.has(source),
            ),
            `${id} : source interne déclarée promue sans preuve centrale`,
        );
        assert.ok(
            Array.isArray(entree.reservations) &&
                entree.reservations.every(chaineNonVide),
            `${id} : frontière interne absente`,
        );

        if (entree.status === "a-faire") {
            assert.deepEqual(entree.sources.promoted, []);
        }

        if (entree.status === "publiee") {
            assert.deepEqual(
                [...entree.sources.promoted].sort(),
                [...entree.sources.required].sort(),
                `${id} : une source interne requise n’est pas promue`,
            );
            assert.ok(
                entree.files?.length > 0 &&
                    entree.files.every((fichier) =>
                        existsSync(chemin(fichier)),
                    ),
                `${id} : fichiers internes livrés invalides`,
            );
            assert.ok(
                entree.relations?.length > 0,
                `${id} : relations absentes`,
            );
            assert.ok(
                entree.checks?.includes("pnpm check:phase-6"),
                `${id} : contrôle Phase 6 absent`,
            );
        }
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

        if (entree.status === "raccordee") {
            assert.ok(chaineNonVide(entree.verdict), `${id} : verdict absent`);
            assert.ok(
                entree.files?.length > 0 &&
                    entree.files.every((fichier) =>
                        existsSync(chemin(fichier)),
                    ),
                `${id} : raccord sans fichier`,
            );
            assert.ok(
                entree.sources?.every((source) =>
                    lireJson("src/data/sources/sources.json").some(
                        (candidate) => candidate.id === source,
                    ),
                ),
                `${id} : source du raccord absente`,
            );
            assert.ok(
                entree.checks?.includes("pnpm check:phase-6"),
                `${id} : contrôle Phase 6 absent`,
            );
        }
    }
}

function verifierTrain6B(production) {
    const pinocchio = lireJson("src/data/oeuvres/pinocchio.json");
    const collodi = lireJson("src/data/contributeurs/carlo-collodi.json");
    const epoque = lireJson("src/data/epoques/temps-des-chefs-d-oeuvre.json");
    const registreOeuvresSources = lireTexte(
        "src/registry/oeuvres-sources/oeuvres-sources.ts",
    );

    assert.equal(pinocchio.slug, "pinocchio");
    assert.equal(pinocchio.sortie.date.valeur, "1940-02-07");
    assert.equal(pinocchio.sortie.date.precision, "jour");
    assert.equal(pinocchio.format, "long métrage d’animation");
    assert.equal(pinocchio.durees[0].valeur, 87);
    assert.equal(pinocchio.production.debut.valeur, "1937");
    assert.equal(pinocchio.production.fin.valeur, "1940");
    assert.ok(
        pinocchio.titresAlternatifs.some(
            (identite) =>
                identite.titre === "La Merveilleuse Aventure de Pinocchio" &&
                identite.nature === "sortie-territoriale" &&
                identite.territoire === "FR",
        ),
        "Pinocchio : titre de sortie français absent",
    );

    const adaptation = pinocchio.relationsOeuvres.find(
        (relation) => relation.nature === "adaptation",
    );
    assert.deepEqual(adaptation?.oeuvre, {
        nom: "Le avventure di Pinocchio",
        type: "oeuvre-source",
        id: "oeuvre-source-collodi-pinocchio",
        slug: "le-avventure-di-pinocchio",
    });
    assert.ok(
        pinocchio.contributions.some(
            (contribution) =>
                contribution.contributeur.slug === "carlo-collodi" &&
                contribution.domaine === "histoire-adaptation",
        ),
        "Pinocchio : contribution de Carlo Collodi absente",
    );
    assert.equal(
        pinocchio.personnages.length,
        12,
        "Pinocchio : la distribution préparée au Train 6B est incomplète",
    );

    assert.equal(collodi.slug, "carlo-collodi");
    assert.ok(
        collodi.nomsAlternatifs.some(
            (identite) => identite.nom === "Carlo Lorenzini",
        ),
        "Carlo Collodi : identité civile absente",
    );
    assert.ok(collodi.roles.includes("écrivain"));
    assert.ok(collodi.sources.includes("it-collodi-biography"));
    assert.match(
        registreOeuvresSources,
        /id:\s*"oeuvre-source-collodi-pinocchio"/,
    );
    assert.match(registreOeuvresSources, /slug:\s*"carlo-collodi"/);

    const anneePinocchio = Number(pinocchio.sortie.date.valeur.slice(0, 4));
    const debutEpoque = Number(epoque.periode.debut.valeur.slice(0, 4));
    const finEpoque = Number(epoque.periode.fin.valeur.slice(0, 4));
    assert.ok(
        anneePinocchio >= debutEpoque && anneePinocchio < finEpoque,
        "Pinocchio ne rejoint plus le Temps des chefs-d’œuvre",
    );

    const uniteSource = production.internalUnits.find(
        (entree) => entree.slug === "le-avventure-di-pinocchio",
    );
    assert.equal(uniteSource?.status, "publiee");
    assert.equal(
        existsSync(chemin("src/data/catalogues/oeuvres-sources.json")),
        false,
        "L’Œuvre source interne possède un catalogue public",
    );
    assert.equal(
        existsSync(chemin("src/app/oeuvres-sources")),
        false,
        "L’Œuvre source interne possède une route publique",
    );
}

function verifierTrain6C(production) {
    const catalogue = lireJson("src/data/catalogues/personnages.json");
    const pinocchio = lireJson("src/data/oeuvres/pinocchio.json");
    const slugsComplets = new Set([
        "pinocchio",
        "jiminy-cricket",
        "geppetto",
        "la-fee-bleue",
        "grand-coquin",
        "stromboli",
    ]);
    const slugsLegers = new Set([
        "gedeon",
        "le-cocher",
        "monstro",
        "crapule",
        "figaro",
    ]);
    const slugsAttendus = [...slugsComplets, ...slugsLegers].sort();
    const entrees = production.entries.filter(
        (entree) => entree.train === "6C",
    );

    assert.equal(entrees.length, 11);
    assert.deepEqual(
        entrees.map((entree) => entree.slug).sort(),
        slugsAttendus,
    );
    assert.ok(
        entrees.every((entree) => entree.status === "publiee"),
        "Train 6C : les onze Personnages ne sont pas tous publiés",
    );
    assert.equal(catalogue.length, 33);

    for (const entree of entrees) {
        const fiche = lireJson(`src/data/personnages/${entree.slug}.json`);
        const identite = catalogue.find(
            (candidate) => candidate.slug === entree.slug,
        );

        assert.ok(identite, `${entree.slug} : identité catalogue absente`);
        assert.equal(fiche.slug, entree.slug);
        assert.equal(fiche.type, "personnage");
        assert.deepEqual(fiche.premiereApparition, {
            oeuvre: {
                nom: "Pinocchio",
                type: "oeuvre",
                slug: "pinocchio",
            },
            date: { valeur: "1940-02-07", precision: "jour" },
        });
        assert.ok(
            entree.sources.required.every((source) =>
                fiche.sources.includes(source),
            ),
            `${entree.slug} : une source requise manque à la fiche`,
        );

        const blocs = fiche.blocsEditoriaux ?? [];
        if (slugsComplets.has(entree.slug)) {
            assert.ok(
                blocs.length >= 2,
                `${entree.slug} : la fiche complète manque de profondeur`,
            );
        } else {
            assert.ok(
                blocs.length <= 1,
                `${entree.slug} : la fiche légère dépasse son profil`,
            );
        }
    }

    const distributionResolue = pinocchio.personnages.filter(
        (personnage) => personnage.type === "personnage",
    );
    const cleo = pinocchio.personnages.find(
        (personnage) => personnage.nom === "Cléo",
    );

    assert.equal(pinocchio.personnages.length, 12);
    assert.deepEqual(
        distributionResolue.map((personnage) => personnage.slug).sort(),
        slugsAttendus,
    );
    assert.deepEqual(cleo, { nom: "Cléo" });
    assert.ok(
        !catalogue.some((personnage) => personnage.slug === "cleo"),
        "Cléo : identité publiée malgré le verdict relation seulement",
    );
    assert.equal(
        existsSync(chemin("src/data/personnages/cleo.json")),
        false,
        "Cléo : fiche créée malgré le verdict relation seulement",
    );

    const crapule = lireJson("src/data/personnages/crapule.json");
    assert.ok(
        crapule.nomsAlternatifs.some(
            (identite) =>
                identite.nom === "Lampwick" &&
                identite.nature === "original" &&
                identite.langue === "en",
        ),
        "Crapule : identité originale Lampwick absente",
    );

    const stromboli = lireJson("src/data/personnages/stromboli.json");
    assert.ok(
        stromboli.nomsAlternatifs.some(
            (identite) =>
                identite.nom === "Mangiafuoco" &&
                identite.langue === "it" &&
                identite.territoire === "IT",
        ),
        "Stromboli : identité italienne Mangiafuoco absente",
    );

    const figaro = lireJson("src/data/personnages/figaro.json");
    assert.ok(
        figaro.sources.includes("us-d23-figaro-and-cleo"),
        "Figaro : relation documentée avec Cléo absente",
    );

    const cleoInterne = production.internalUnits.find(
        (entree) => entree.domain === "personnages" && entree.slug === "cleo",
    );
    assert.equal(cleoInterne?.status, "relation-seulement");
    assert.deepEqual(cleoInterne?.sources.promoted, ["us-d23-figaro-and-cleo"]);
    assert.ok(cleoInterne?.relations.includes("relation:figaro"));
}

function verifierTrain6D(production) {
    const catalogue = lireJson("src/data/catalogues/contributeurs.json");
    const pinocchio = lireJson("src/data/oeuvres/pinocchio.json");
    const clockCleaners = lireJson("src/data/oeuvres/clock-cleaners.json");
    const boneTrouble = lireJson("src/data/oeuvres/bone-trouble.json");
    const slugsComplets = new Set([
        "ben-sharpsteen",
        "cliff-edwards",
        "dickie-jones",
        "ned-washington",
        "jack-kinney",
    ]);
    const slugsLegers = new Set(["t-hee", "joshua-meador", "kenneth-anderson"]);
    const slugsDuTrain = [...slugsComplets, ...slugsLegers].sort();
    const slugsCibles = ["carlo-collodi", ...slugsDuTrain].sort();
    const entrees = production.entries.filter(
        (entree) => entree.train === "6D",
    );

    assert.equal(entrees.length, 8);
    assert.deepEqual(entrees.map((entree) => entree.slug).sort(), slugsDuTrain);
    assert.ok(
        entrees.every((entree) => entree.status === "publiee"),
        "Train 6D : les huit nouveaux Créateurs ne sont pas tous publiés",
    );
    assert.equal(catalogue.length, 41);
    assert.ok(
        slugsCibles.every((slug) =>
            catalogue.some((candidate) => candidate.slug === slug),
        ),
        "Train 6D : une des neuf cibles Créateurs manque au catalogue",
    );

    for (const entree of entrees) {
        const fiche = lireJson(`src/data/contributeurs/${entree.slug}.json`);
        const identite = catalogue.find(
            (candidate) => candidate.slug === entree.slug,
        );

        assert.ok(identite, `${entree.slug} : identité catalogue absente`);
        assert.equal(fiche.slug, entree.slug);
        assert.equal(fiche.type, "contributeur");
        assert.ok(
            entree.sources.required.every((source) =>
                fiche.sources.includes(source),
            ),
            `${entree.slug} : une source requise manque à la fiche`,
        );

        const blocs = fiche.blocsEditoriaux ?? [];
        if (slugsComplets.has(entree.slug)) {
            assert.ok(
                blocs.length >= 2,
                `${entree.slug} : la fiche complète manque de profondeur`,
            );
        } else {
            assert.ok(
                blocs.length <= 1,
                `${entree.slug} : la fiche légère dépasse son profil`,
            );
        }
    }

    const contributions = pinocchio.contributions;
    const contribution = (slug, domaine) =>
        contributions.find(
            (candidate) =>
                candidate.contributeur.slug === slug &&
                candidate.domaine === domaine,
        );

    assert.ok(contribution("ben-sharpsteen", "production-direction"));
    assert.ok(contribution("cliff-edwards", "interpretation-vocale"));
    assert.ok(contribution("dickie-jones", "interpretation-vocale"));
    assert.ok(contribution("dickie-jones", "reference-filmee"));
    assert.ok(contribution("ned-washington", "musique-chansons"));
    assert.ok(contribution("jack-kinney", "production-direction"));
    assert.ok(contribution("t-hee", "production-direction"));
    assert.ok(contribution("t-hee", "reference-filmee"));
    assert.ok(contribution("joshua-meador", "decors-effets-photographie"));
    assert.ok(
        contribution("kenneth-anderson", "direction-artistique-conception"),
    );

    assert.ok(
        clockCleaners.contributions.some(
            (candidate) =>
                candidate.contributeur.slug === "ben-sharpsteen" &&
                candidate.contributeur.type === "contributeur",
        ),
        "Ben Sharpsteen : mention historique de Clock Cleaners non résolue",
    );
    assert.ok(
        boneTrouble.contributions.some(
            (candidate) =>
                candidate.contributeur.slug === "jack-kinney" &&
                candidate.contributeur.type === "contributeur",
        ),
        "Jack Kinney : mention historique de Bone Trouble non résolue",
    );

    const evelyn = contributions.find(
        (candidate) => candidate.contributeur.nom === "Evelyn Venable",
    );
    assert.deepEqual(evelyn, {
        contributeur: { nom: "Evelyn Venable" },
        roles: ["voix originale de la Fée Bleue"],
        domaine: "interpretation-vocale",
    });
    assert.ok(
        !catalogue.some((candidate) => candidate.slug === "evelyn-venable"),
        "Evelyn Venable : identité publiée malgré le verdict crédit seulement",
    );
    assert.equal(
        existsSync(chemin("src/data/contributeurs/evelyn-venable.json")),
        false,
        "Evelyn Venable : fiche créée malgré le verdict crédit seulement",
    );

    const evelynInterne = production.internalUnits.find(
        (entree) =>
            entree.domain === "createurs" && entree.slug === "evelyn-venable",
    );
    assert.equal(evelynInterne?.status, "credit-seulement");
    assert.deepEqual(evelynInterne?.sources.promoted, [
        "us-afi-catalog-pinocchio",
    ]);
    assert.ok(evelynInterne?.relations.includes("voix-originale:la-fee-bleue"));

    assert.equal(
        production.baseline.publicEntries + production.progress.publiee,
        104,
    );
    assert.equal(production.sourceInventory.promoted.length, 23);
}

function verifierTrain6E(production) {
    const pinocchio = lireJson("src/data/oeuvres/pinocchio.json");
    const relays = production.relays.filter((entree) => entree.train === "6E");
    const slugsAttendus = [
        "walt-disney",
        "hamilton-luske",
        "wilfred-jackson",
        "norman-ferguson",
        "ward-kimball",
        "fred-moore",
        "milt-kahl",
        "frank-thomas",
        "eric-larson",
        "ollie-johnston",
        "john-lounsbery",
        "wolfgang-reitherman",
        "vladimir-bill-tytla",
        "joe-grant",
        "gustaf-tenggren",
        "leigh-harline",
        "paul-j-smith",
        "marge-champion",
    ].sort();
    const contributionsAttendues = [
        ["walt-disney", "production-direction", ["production"]],
        ["hamilton-luske", "production-direction", ["réalisation"]],
        [
            "wilfred-jackson",
            "production-direction",
            ["réalisation de séquences"],
        ],
        [
            "norman-ferguson",
            "production-direction",
            ["réalisation de séquences"],
        ],
        [
            "norman-ferguson",
            "animation-personnages",
            ["animation de Grand Coquin et Gédéon"],
        ],
        [
            "ward-kimball",
            "animation-personnages",
            ["supervision de l’animation de Jiminy Cricket"],
        ],
        [
            "fred-moore",
            "animation-personnages",
            ["supervision de l’animation de Crapule"],
        ],
        [
            "milt-kahl",
            "animation-personnages",
            ["supervision de l’animation de Pinocchio"],
        ],
        [
            "frank-thomas",
            "animation-personnages",
            ["supervision de l’animation de Pinocchio"],
        ],
        [
            "eric-larson",
            "animation-personnages",
            ["supervision de l’animation de Cléo et Figaro"],
        ],
        ["ollie-johnston", "animation-personnages", ["animation de Pinocchio"]],
        [
            "john-lounsbery",
            "animation-personnages",
            ["animation de Grand Coquin et Gédéon"],
        ],
        [
            "wolfgang-reitherman",
            "animation-personnages",
            ["supervision de l’animation de Jiminy Cricket et Monstro"],
        ],
        [
            "vladimir-bill-tytla",
            "animation-personnages",
            ["supervision de l’animation de Stromboli et Monstro"],
        ],
        [
            "joe-grant",
            "direction-artistique-conception",
            ["conception de personnages"],
        ],
        [
            "gustaf-tenggren",
            "direction-artistique-conception",
            ["développement visuel"],
        ],
        [
            "leigh-harline",
            "musique-chansons",
            ["composition de la musique et des chansons"],
        ],
        ["paul-j-smith", "musique-chansons", ["composition de la musique"]],
        [
            "marge-champion",
            "reference-filmee",
            ["référence filmée de la Fée Bleue"],
        ],
    ];

    assert.equal(relays.length, 18);
    assert.deepEqual(relays.map((entree) => entree.slug).sort(), slugsAttendus);
    assert.ok(
        relays.every((entree) => entree.status === "raccordee"),
        "Train 6E : les dix-huit reports Créateurs ne sont pas tous fermés",
    );
    assert.equal(
        pinocchio.contributions.length,
        31,
        "Train 6E : le générique de Pinocchio ne possède plus ses 31 contributions",
    );

    for (const [slug, domaine, roles] of contributionsAttendues) {
        const contribution = pinocchio.contributions.find(
            (candidate) =>
                candidate.contributeur.slug === slug &&
                candidate.domaine === domaine,
        );

        assert.ok(
            contribution,
            `Train 6E : contribution absente pour ${slug}/${domaine}`,
        );
        assert.deepEqual(
            contribution.roles,
            roles,
            `Train 6E : rôle altéré pour ${slug}/${domaine}`,
        );
    }

    assert.equal(
        pinocchio.contributions.some(
            (contribution) => contribution.contributeur.slug === "david-hand",
        ),
        false,
        "David Hand : crédit ajouté malgré l’arbitrage de Phase 6",
    );
    assert.equal(
        production.baseline.publicEntries + production.progress.publiee,
        104,
    );
    assert.equal(production.sourceInventory.promoted.length, 23);
    assert.equal(production.sourceInventory.remainingPrivateCurrent, 7);
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
verifierTrain6B(production);
verifierTrain6C(production);
verifierTrain6D(production);
verifierTrain6E(production);
verifierSymboles(production);
verifierBranchement();

console.log(
    `Phase 6 · Train 6E vérifié : ${production.baseline.publicEntries + production.progress.publiee} Archives publiques, 18 raccords Créateurs fermés, 31 contributions dans le générique de Pinocchio, David Hand sans crédit et ${production.sourceInventory.promoted.length} sources promues.`,
);
