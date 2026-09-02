import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const cheminManifeste =
    "docs/studio/production/acte-vi/phase-2/retroapplication.json";
const cheminMigration = "docs/studio/production/acte-vi/phase-5/migration.json";

const famillesPubliques = {
    personnages: {
        catalogue: "personnages",
        dossier: "personnages",
        route: "personnages",
        type: "personnage",
    },
    createurs: {
        catalogue: "contributeurs",
        dossier: "contributeurs",
        route: "contributeurs",
        type: "contributeur",
    },
    oeuvres: {
        catalogue: "oeuvres",
        dossier: "oeuvres",
        route: "oeuvres",
        type: "oeuvre",
    },
    epoques: {
        catalogue: "epoques",
        dossier: "epoques",
        route: "epoques",
        type: "epoque",
    },
    chansons: {
        catalogue: "chansons",
        dossier: "chansons",
        route: "chansons",
        type: "chanson",
    },
};

const statuts = new Set([
    "a-faire",
    "en-cours",
    "migree",
    "inchangee",
    "reportee",
]);

const trains = new Set(["5B", "5C", "5D", "5E", "5F"]);

const documentsPhase5 = [
    "etat-reference.md",
    "migration.json",
    "train-5a.md",
    "train-5b.md",
];

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

function cleEntree(entree) {
    return `${entree.family}/${entree.slug}`;
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function etapesCommande(packageJson, nom) {
    return (packageJson.scripts?.[nom] ?? "")
        .split("&&")
        .map((etape) => etape.trim())
        .filter(Boolean);
}

function verifierManifeste(migration) {
    const contenu = lireTexte(cheminManifeste);
    const manifeste = JSON.parse(contenu);

    assert.equal(manifeste.status, "approved");
    assert.equal(manifeste.implementationPhase, 5);
    assert.equal(manifeste.entries.length, 69);
    assert.equal(manifeste.expectedTotals.entries, 69);
    assert.equal(manifeste.expectedTotals.legacyDetailRoutesToPreserve, 45);

    assert.equal(migration.sourceManifest.path, cheminManifeste);
    assert.equal(
        migration.sourceManifest.sha256,
        sha256(contenu),
        "Le manifeste de Phase 2 a changé sans nouvel arbitrage",
    );
    assert.equal(
        migration.sourceManifest.baselineCommit,
        manifeste.baselineCommit,
    );

    return manifeste;
}

function verifierInventairePublic(migration) {
    const routes = new Set();
    let nombreFamilles = 0;
    let nombreEntrees = 0;

    for (const [famille, contrat] of Object.entries(famillesPubliques)) {
        const cheminCatalogue = chemin(
            "src/data/catalogues",
            `${contrat.catalogue}.json`,
        );

        if (!existsSync(cheminCatalogue)) {
            assert.equal(
                famille,
                "chansons",
                `Le catalogue public ${famille} a disparu`,
            );
            continue;
        }

        const catalogue = JSON.parse(readFileSync(cheminCatalogue, "utf8"));
        const cheminFiches = chemin("src/data", contrat.dossier);
        assert.ok(
            existsSync(cheminFiches),
            `${famille} : dossier de fiches absent`,
        );

        const fiches = readdirSync(cheminFiches).filter((fichier) =>
            fichier.endsWith(".json"),
        );
        assert.equal(
            catalogue.length,
            fiches.length,
            `${famille} : catalogue et fiches ne possèdent pas la même taille`,
        );

        for (const entree of catalogue) {
            assert.equal(
                entree.type,
                contrat.type,
                `${famille}/${entree.slug} : type de catalogue inattendu`,
            );
            assert.ok(
                fiches.includes(`${entree.slug}.json`),
                `${famille}/${entree.slug} : fiche correspondante absente`,
            );

            const route = `/${contrat.route}/${entree.slug}`;
            assert.ok(
                !routes.has(route),
                `Route canonique dupliquée : ${route}`,
            );
            routes.add(route);
        }

        nombreFamilles += 1;
        nombreEntrees += catalogue.length;
    }

    assert.deepEqual(
        {
            publicFamilies: nombreFamilles,
            publicEntries: nombreEntrees,
            publicRoutes: routes.size,
        },
        migration.projection,
        "La projection publique réelle ne correspond pas au journal Phase 5",
    );

    assert.ok(
        nombreEntrees >= migration.baseline.publicEntries,
        "La Phase 5 a perdu une Archive publique historique",
    );
    assert.ok(
        nombreEntrees <= migration.target.publicEntries,
        "La Phase 5 publie plus d’Archives que son Cadre validé",
    );

    return { nombreFamilles, nombreEntrees, nombreRoutes: routes.size };
}

function verifierRoutesProtegees(manifeste) {
    const famillesProtegees = ["oeuvres", "personnages"];
    const routesProtegees = manifeste.entries.filter((entree) =>
        famillesProtegees.includes(entree.family),
    );

    assert.equal(routesProtegees.length, 45);

    for (const entree of routesProtegees) {
        const contrat = famillesPubliques[entree.family];
        const catalogue = lireJson(
            `src/data/catalogues/${contrat.catalogue}.json`,
        );
        assert.ok(
            catalogue.some((candidate) => candidate.slug === entree.slug),
            `Route historique perdue : /${contrat.route}/${entree.slug}`,
        );
    }
}

function verifierJournal(migration, manifeste) {
    assert.equal(migration.schemaVersion, "1.0.0");
    assert.ok(["in-progress", "complete"].includes(migration.status));
    assert.equal(migration.owner, "R2-D2");
    assert.equal(migration.target.trackedEntries, 69);
    assert.equal(migration.target.retrospectiveSongs, 4);
    assert.equal(migration.entries.length, 69);

    const manifestParCle = new Map(
        manifeste.entries.map((entree) => [cleEntree(entree), entree]),
    );
    const cles = new Set();
    const progression = {
        "a-faire": 0,
        "en-cours": 0,
        migree: 0,
        inchangee: 0,
        reportee: 0,
        verdicts: 0,
    };

    for (const entree of migration.entries) {
        const cle = cleEntree(entree);
        const source = manifestParCle.get(cle);

        assert.ok(source, `${cle} : entrée absente du manifeste de Phase 2`);
        assert.ok(!cles.has(cle), `${cle} : entrée dupliquée dans le journal`);
        cles.add(cle);

        assert.equal(entree.profile, source.profile, `${cle} : profil altéré`);
        assert.equal(entree.depth, source.depth, `${cle} : profondeur altérée`);
        assert.deepEqual(
            entree.sourceState,
            {
                archive: source.currentState,
                sources: source.sourcesState,
                exception: source.exception,
            },
            `${cle} : état de départ altéré`,
        );
        assert.ok(trains.has(entree.train), `${cle} : Train inconnu`);
        assert.ok(statuts.has(entree.status), `${cle} : statut inconnu`);
        assert.ok(Array.isArray(entree.files), `${cle} : fichiers invalides`);
        assert.ok(Array.isArray(entree.sources), `${cle} : sources invalides`);
        assert.ok(Array.isArray(entree.checks), `${cle} : contrôles invalides`);
        assert.ok(
            Array.isArray(entree.reservations),
            `${cle} : réserves invalides`,
        );

        progression[entree.status] += 1;

        if (entree.status === "a-faire" || entree.status === "en-cours") {
            assert.equal(entree.verdict, null, `${cle} : verdict prématuré`);
        } else {
            progression.verdicts += 1;
            assert.ok(
                chaineNonVide(entree.verdict),
                `${cle} : verdict final absent`,
            );
            assert.ok(
                entree.checks.length > 0,
                `${cle} : verdict final sans contrôle`,
            );
        }

        if (entree.status === "migree") {
            assert.ok(
                entree.files.length > 0,
                `${cle} : migration sans fichier`,
            );
            assert.ok(
                entree.sources.length > 0,
                `${cle} : migration R2/R3 sans source`,
            );
        }

        if (entree.status === "reportee") {
            assert.ok(
                entree.reservations.length > 0,
                `${cle} : report sans condition de reprise`,
            );
        }
    }

    assert.equal(cles.size, manifestParCle.size);
    assert.deepEqual(
        progression,
        migration.progress,
        "Les compteurs du journal ne correspondent pas aux 69 entrées",
    );

    if (migration.status === "complete") {
        assert.equal(progression.verdicts, 69);
        assert.equal(progression["a-faire"], 0);
        assert.equal(progression["en-cours"], 0);
        assert.deepEqual(migration.projection, {
            publicFamilies: 5,
            publicEntries: 83,
            publicRoutes: 83,
        });
    }

    return progression;
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");

    assert.equal(
        packageJson.scripts?.["check:phase-5"],
        "node scripts/verifier-phase-5.mjs",
        "check:phase-5 n’appelle pas le vérificateur canonique",
    );

    for (const nom of ["check", "check:ci"]) {
        const etapes = etapesCommande(packageJson, nom);
        assert.ok(
            etapes.includes("pnpm check:phase-5"),
            `${nom} ne contient pas la répétition agrégée de la Phase 5`,
        );
        assert.ok(
            etapes.indexOf("pnpm check:phase-5") >
                etapes.indexOf("pnpm check:phase-4"),
            `${nom} projette la Phase 5 avant son contrat de Phase 4`,
        );
    }
}

function verifierTransmission() {
    const dossier = chemin("docs/studio/production/acte-vi/phase-5");

    for (const document of documentsPhase5) {
        assert.ok(
            existsSync(path.join(dossier, document)),
            `Transmission de la Phase 5 absente : ${document}`,
        );
    }
}

const migration = lireJson(cheminMigration);
const manifeste = verifierManifeste(migration);
const corpus = verifierInventairePublic(migration);
verifierRoutesProtegees(manifeste);
const progression = verifierJournal(migration, manifeste);
verifierBranchement();
verifierTransmission();

console.log(
    `Phase 5 suivie : ${migration.entries.length} raccords, ${progression.verdicts} verdicts, ${corpus.nombreEntrees} Archives, ${corpus.nombreRoutes} routes et ${migration.baseline.protectedLegacyRoutes} routes historiques protégées.`,
);
