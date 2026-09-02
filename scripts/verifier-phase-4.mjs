import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const famillesPubliques = [
    ["personnages", "personnage"],
    ["contributeurs", "contributeur"],
    ["oeuvres", "oeuvre"],
    ["epoques", "epoque"],
];

const verificateursPhase4 = [
    "pnpm check:oeuvres",
    "pnpm check:oeuvres-sources",
    "pnpm check:chansons",
    "pnpm check:donnees-economiques",
];

const domainesInternes = [
    "chansons",
    "musiques",
    "oeuvres-sources",
    "donnees-economiques",
];

const documentsPhase4 = [
    "etat-reference.md",
    "matrice-contrats.md",
    "bobines.md",
    "contrat-circulation-reception.md",
    "contrat-oeuvres-sources.md",
    "contrat-chansons-musiques.md",
    "contrat-donnees-economiques.md",
    "migration.md",
    "train-4a.md",
    "train-4b.md",
    "train-4c.md",
    "train-4d.md",
    "train-4e.md",
    "train-4f.md",
    "cloture.md",
];

function lireJson(chemin) {
    return JSON.parse(readFileSync(path.join(racine, chemin), "utf8"));
}

function lireTexte(chemin) {
    return readFileSync(path.join(racine, chemin), "utf8");
}

function etapesCommande(packageJson, nom) {
    return (packageJson.scripts?.[nom] ?? "")
        .split("&&")
        .map((etape) => etape.trim())
        .filter(Boolean);
}

function verifierCorpusPublic() {
    const routes = new Set();
    let nombreEntrees = 0;
    let nombreFiches = 0;

    for (const [famille, type] of famillesPubliques) {
        const catalogue = lireJson(`src/data/catalogues/${famille}.json`);
        const fichiersFiches = readdirSync(
            path.join(racine, "src/data", famille),
        ).filter((fichier) => fichier.endsWith(".json"));

        assert.equal(
            catalogue.length,
            fichiersFiches.length,
            `${famille} : catalogue et fiches ne possèdent plus la même taille`,
        );

        for (const entree of catalogue) {
            assert.equal(
                entree.type,
                type,
                `${famille}/${entree.slug} : type de catalogue inattendu`,
            );

            const route = `/${famille}/${entree.slug}`;
            assert.ok(
                !routes.has(route),
                `Route canonique dupliquée : ${route}`,
            );
            routes.add(route);

            assert.ok(
                fichiersFiches.includes(`${entree.slug}.json`),
                `${route} : fiche correspondante absente`,
            );
        }

        nombreEntrees += catalogue.length;
        nombreFiches += fichiersFiches.length;
    }

    assert.equal(nombreEntrees, 79, "Le Codex ne publie plus 79 entrées");
    assert.equal(nombreFiches, 79, "Le Codex ne possède plus 79 fiches");
    assert.equal(
        routes.size,
        79,
        "Le Codex ne possède plus 79 routes canoniques",
    );

    return { nombreEntrees, nombreFiches, nombreRoutes: routes.size };
}

function verifierDomainesInternes() {
    for (const domaine of domainesInternes) {
        assert.equal(
            existsSync(
                path.join(racine, `src/data/catalogues/${domaine}.json`),
            ),
            false,
            `Le domaine interne ${domaine} possède désormais un catalogue public`,
        );
        assert.equal(
            existsSync(path.join(racine, `src/app/${domaine}`)),
            false,
            `Le domaine interne ${domaine} possède désormais une route publique`,
        );
    }

    const contratFamilles = lireTexte("src/types/codex.ts");
    for (const domaine of domainesInternes) {
        assert.ok(
            !contratFamilles.includes(`"${domaine}"`),
            `CodexFamily contient prématurément ${domaine}`,
        );
    }
}

function verifierBobinesIntegrees() {
    const circulation = lireJson("scripts/fixtures/oeuvre-circulation.json");
    const oeuvresSources = lireJson("scripts/fixtures/oeuvres-sources.json");
    const chansons = lireJson("scripts/fixtures/chansons.json");
    const economie = lireJson("scripts/fixtures/donnees-economiques.json");

    assert.ok(circulation.slug.startsWith("fixture-"));
    assert.equal(circulation.versions.length, 3);
    assert.equal(circulation.exploitations.length, 3);
    assert.equal(circulation.receptions.length, 3);

    const oeuvreSourceIds = new Set(
        oeuvresSources.fiches.map((fiche) => fiche.id),
    );
    const chansonIds = new Set(chansons.fiches.map((fiche) => fiche.id));
    const oeuvreSourcePinocchio =
        economie.bobinesIntegrees.oeuvreSourcePinocchio;
    const chansonPinocchio = economie.bobinesIntegrees.chansonPinocchio;

    assert.equal(
        economie.bobinesIntegrees.circulationPinocchio,
        circulation.slug,
        "La bobine économique a perdu la circulation de Pinocchio",
    );
    assert.ok(
        oeuvreSourceIds.has(oeuvreSourcePinocchio),
        "La bobine économique référence une Œuvre source absente",
    );
    assert.ok(
        chansonIds.has(chansonPinocchio),
        "La bobine économique référence une Chanson absente",
    );
    assert.equal(
        economie.bobinesIntegrees.oeuvrePubliee,
        "snow-white-and-the-seven-dwarfs",
        "La bobine intégrée a perdu son échantillon public de compatibilité",
    );

    assert.equal(oeuvresSources.fiches.length, 2);
    assert.equal(chansons.fiches.length, 2);
    assert.equal(chansons.musiques.length, 1);
    assert.equal(chansons.dossiersMedia.length, 4);
    assert.equal(economie.dossiers.length, 5);
    assert.equal(economie.donneesDerivees.length, 1);

    return {
        circulation: 1,
        oeuvresSources: oeuvresSources.fiches.length,
        chansons: chansons.fiches.length,
        musiques: chansons.musiques.length,
        dossiersMedia: chansons.dossiersMedia.length,
        dossiersEconomiques: economie.dossiers.length,
    };
}

function verifierManifestePhase5() {
    const manifeste = lireJson(
        "docs/studio/production/acte-vi/phase-2/retroapplication.json",
    );

    assert.equal(manifeste.implementationPhase, 5);
    assert.equal(manifeste.constraints.writesProductData, false);
    assert.equal(manifeste.constraints.changesRoutes, false);
    assert.equal(manifeste.constraints.createsCatalogues, false);
    assert.equal(manifeste.entries.length, 69);
    assert.equal(manifeste.expectedTotals.entries, 69);
    assert.equal(manifeste.expectedTotals.legacyDetailRoutesToPreserve, 45);

    for (const entree of manifeste.entries) {
        assert.ok(
            entree.currentState === "partiel" ||
                entree.currentState === "absent",
            `${entree.family}/${entree.slug} : état de migration prématuré`,
        );
        for (const cle of ["migratedAt", "migrationStatus", "implementedAt"]) {
            assert.equal(
                Object.hasOwn(entree, cle),
                false,
                `${entree.family}/${entree.slug} : ${cle} annonce une migration prématurée`,
            );
        }
    }

    return manifeste.entries.length;
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");

    assert.equal(
        packageJson.scripts?.["check:phase-4"],
        "node scripts/verifier-phase-4.mjs",
        "check:phase-4 n’appelle pas le vérificateur canonique",
    );

    for (const nom of ["check", "check:ci"]) {
        const etapes = etapesCommande(packageJson, nom);
        for (const verificateur of verificateursPhase4) {
            assert.ok(
                etapes.includes(verificateur),
                `${nom} ne contient plus ${verificateur}`,
            );
        }
        assert.ok(
            etapes.includes("pnpm check:phase-4"),
            `${nom} ne contient pas la répétition agrégée de la Phase 4`,
        );
    }
}

function verifierTransmission() {
    const dossier = path.join(racine, "docs/studio/production/acte-vi/phase-4");

    for (const document of documentsPhase4) {
        assert.ok(
            existsSync(path.join(dossier, document)),
            `Transmission Phase 4 absente : ${document}`,
        );
    }
}

const corpus = verifierCorpusPublic();
verifierDomainesInternes();
const bobines = verifierBobinesIntegrees();
const manifeste = verifierManifestePhase5();
verifierBranchement();
verifierTransmission();

console.log(
    `Phase 4 vérifiée : ${corpus.nombreFiches} Archives, ${corpus.nombreRoutes} routes, ${manifeste} entrées Phase 5 non migrées, ${bobines.oeuvresSources} Œuvres sources, ${bobines.chansons} Chansons, ${bobines.musiques} Musique, ${bobines.dossiersMedia} dossiers média et ${bobines.dossiersEconomiques} dossiers économiques privés.`,
);
