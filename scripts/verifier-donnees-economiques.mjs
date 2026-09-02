import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const resolutionOriginale = Module._resolveFilename;
const extensionTypeScriptOriginale = Module._extensions[".ts"];

const mesures = new Set([
    "budget-annonce",
    "cout-production",
    "recette-brute-guichet",
    "location-distributeur",
    "revenu-studio",
    "benefice",
    "perte",
    "entrees",
    "classement",
]);
const unites = new Set(["monetaire", "entrees", "rang"]);
const certitudes = new Set(["documente", "estimation", "conteste"]);
const verdicts = new Set([
    "publishable",
    "publishable-with-reserve",
    "investigation-only",
    "excluded",
]);
const statutsEnquete = new Set(["factuel", "hypothetique", "incomplet"]);

function lireJson(chemin) {
    return JSON.parse(readFileSync(path.join(racine, chemin), "utf8"));
}

function chargerModuleTypeScript() {
    Module._resolveFilename = function resoudreAlias(
        demande,
        parent,
        estModulePrincipal,
        options,
    ) {
        const demandeResolue = demande.startsWith("@/")
            ? path.join(racine, "src", demande.slice(2))
            : demande;

        return resolutionOriginale.call(
            this,
            demandeResolue,
            parent,
            estModulePrincipal,
            options,
        );
    };

    Module._extensions[".ts"] = function chargerTypeScript(module, fichier) {
        const source = readFileSync(fichier, "utf8");
        const { outputText } = ts.transpileModule(source, {
            compilerOptions: {
                esModuleInterop: true,
                module: ts.ModuleKind.CommonJS,
                target: ts.ScriptTarget.ES2022,
            },
            fileName: fichier,
        });

        module._compile(outputText, fichier);
    };

    try {
        return require(
            path.join(racine, "src/lib/donnees-economiques/index.ts"),
        );
    } finally {
        Module._resolveFilename = resolutionOriginale;

        if (extensionTypeScriptOriginale) {
            Module._extensions[".ts"] = extensionTypeScriptOriginale;
        } else {
            delete Module._extensions[".ts"];
        }
    }
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function nombrePositif(valeur) {
    return typeof valeur === "number" && Number.isFinite(valeur) && valeur > 0;
}

function verifierValeurOriginale(valeur, contexte) {
    assert.ok(valeur, `${contexte} : valeur originale absente`);

    if (valeur.nature === "valeur") {
        assert.ok(
            nombrePositif(valeur.valeur),
            `${contexte} : valeur invalide`,
        );
        return;
    }

    assert.equal(
        valeur.nature,
        "fourchette",
        `${contexte} : nature de valeur inconnue`,
    );
    assert.ok(
        nombrePositif(valeur.minimum) &&
            nombrePositif(valeur.maximum) &&
            valeur.maximum >= valeur.minimum,
        `${contexte} : fourchette invalide`,
    );
}

function verifierDeclaration(declaration, sourcesConnues, contexte) {
    assert.equal(declaration.schemaVersion, "1.0.0");
    assert.ok(chaineNonVide(declaration.id), `${contexte} : id absent`);
    assert.ok(
        declaration.mesure === undefined || mesures.has(declaration.mesure),
        `${contexte} : mesure inconnue`,
    );
    assert.ok(
        declaration.unite === undefined || unites.has(declaration.unite),
        `${contexte} : unité inconnue`,
    );
    assert.ok(
        declaration.certitude === undefined ||
            certitudes.has(declaration.certitude),
        `${contexte} : certitude inconnue`,
    );
    if (declaration.valeurOriginale) {
        verifierValeurOriginale(declaration.valeurOriginale, contexte);
    }
    for (const sourceId of declaration.sources ?? []) {
        assert.ok(
            sourcesConnues.has(sourceId),
            `${contexte} : source inconnue ${sourceId}`,
        );
    }
    assert.equal(
        new Set(declaration.sources ?? []).size,
        (declaration.sources ?? []).length,
        `${contexte} : source dupliquée`,
    );
    for (const sourceId of declaration.methode?.sourceIds ?? []) {
        assert.ok(
            sourcesConnues.has(sourceId),
            `${contexte} : source de méthode inconnue ${sourceId}`,
        );
    }
}

const fixture = lireJson("scripts/fixtures/donnees-economiques.json");
const sourcesPhaseDeux = lireJson(
    "docs/studio/production/acte-vi/phase-2/sources.json",
).sources;
const sourcesPubliques = lireJson("src/data/sources/sources.json");
const sourcesConnues = new Set([
    ...sourcesPhaseDeux.map((source) => source.id),
    ...sourcesPubliques.map((source) => source.id),
]);

assert.equal(fixture.schemaVersion, "1.0.0");
assert.equal(new Set(fixture.sourceIds).size, fixture.sourceIds.length);
fixture.sourceIds.forEach((sourceId) =>
    assert.ok(sourcesConnues.has(sourceId), `Source inconnue ${sourceId}`),
);

const idsDossiers = new Set();
for (const dossier of fixture.dossiers) {
    assert.ok(!idsDossiers.has(dossier.id), `Dossier dupliqué ${dossier.id}`);
    idsDossiers.add(dossier.id);
    assert.ok(statutsEnquete.has(dossier.statutEnquete));
    assert.ok(verdicts.has(dossier.verdict));
    assert.ok(chaineNonVide(dossier.oeuvre?.nom));
    assert.ok(chaineNonVide(dossier.oeuvre?.slug));
    assert.ok(Array.isArray(dossier.dimensionsManquantes));
    assert.ok(Array.isArray(dossier.sourceIdsEvalues));
    for (const sourceId of dossier.sourceIdsEvalues) {
        assert.ok(
            sourcesConnues.has(sourceId),
            `Dossier ${dossier.id} : source évaluée inconnue ${sourceId}`,
        );
    }
    assert.ok(chaineNonVide(dossier.noteInterne));
    verifierDeclaration(
        dossier.declaration,
        sourcesConnues,
        `Dossier ${dossier.id}`,
    );
}

const circulation = lireJson("scripts/fixtures/oeuvre-circulation.json");
const oeuvresSources = lireJson("scripts/fixtures/oeuvres-sources.json");
const chansons = lireJson("scripts/fixtures/chansons.json");
const snowWhite = lireJson(
    "src/data/oeuvres/snow-white-and-the-seven-dwarfs.json",
);
assert.equal(
    fixture.bobinesIntegrees.circulationPinocchio,
    circulation.slug,
    "La bobine économique perd la circulation privée de Pinocchio",
);
assert.ok(
    oeuvresSources.fiches.some(
        (fiche) => fiche.id === fixture.bobinesIntegrees.oeuvreSourcePinocchio,
    ),
    "La bobine économique perd l’œuvre source de Pinocchio",
);
assert.ok(
    chansons.fiches.some(
        (fiche) => fiche.id === fixture.bobinesIntegrees.chansonPinocchio,
    ),
    "La bobine économique perd la Chanson pilote",
);
assert.equal(fixture.bobinesIntegrees.oeuvrePubliee, snowWhite.slug);

const {
    adapterDonneeEconomiqueHistorique,
    lireDonneeEconomiqueOeuvre,
    projeterDossierEconomiquePublic,
} = chargerModuleTypeScript();

const projections = new Map(
    fixture.dossiers.map((dossier) => [
        dossier.id,
        projeterDossierEconomiquePublic(dossier),
    ]),
);
const cumulPinocchio = projections.get(
    "enquete-pinocchio-entrees-france-cumul-1946-2010",
);
assert.equal(cumulPinocchio.statut, "publiee-avec-reserve");
assert.equal(cumulPinocchio.donnee.temporalite.nature, "cumul");
assert.deepEqual(cumulPinocchio.donnee.temporalite.periode, {
    debut: { valeur: "1946", precision: "annee" },
    fin: { valeur: "2010", precision: "annee" },
});
assert.match(cumulPinocchio.donnee.noteDeReserve, /1946 à 2010/);
assert.equal(cumulPinocchio.donnee.unite, "entrees");
assert.equal(cumulPinocchio.donnee.devise, undefined);

const dossierCumul = fixture.dossiers.find(
    (dossier) =>
        dossier.id === "enquete-pinocchio-entrees-france-cumul-1946-2010",
);
assert.deepEqual(
    projeterDossierEconomiquePublic({
        ...dossierCumul,
        verdict: "publishable",
        declaration: {
            ...dossierCumul.declaration,
            conflit: {
                groupeId: "conflit-sans-reserve",
                nature: "valeurs-divergentes",
                note: "Un conflit doit passer par une publication avec réserve.",
            },
        },
    }),
    { statut: "non-publiee", donnee: null },
    "Un conflit est publié sans réserve",
);
assert.deepEqual(
    projeterDossierEconomiquePublic({
        ...dossierCumul,
        declaration: {
            ...dossierCumul.declaration,
            porteeTerritoriale: { nature: "non-precisee" },
        },
    }),
    { statut: "non-publiee", donnee: null },
    "Une portée non précisée est traitée comme complète",
);
assert.deepEqual(
    projeterDossierEconomiquePublic({
        ...dossierCumul,
        declaration: {
            ...dossierCumul.declaration,
            temporalite: {
                nature: "cumul",
                periode: {
                    debut: { valeur: "1946", precision: "annee" },
                },
            },
        },
    }),
    { statut: "non-publiee", donnee: null },
    "Un cumul sans borne finale est traité comme complet",
);

const coutsSnowWhite = fixture.dossiers.filter((dossier) =>
    ["enquete-snow-white-cout-d23", "enquete-snow-white-cout-afi"].includes(
        dossier.id,
    ),
);
assert.deepEqual(
    coutsSnowWhite.map((dossier) => dossier.declaration.valeurOriginale.valeur),
    [1400000, 1488423],
    "Les déclarations divergentes ne restent pas distinctes",
);
assert.ok(
    coutsSnowWhite.every(
        (dossier) =>
            dossier.declaration.conflit.groupeId ===
                "snow-white-couts-production-divergents" &&
            projections.get(dossier.id).statut === "non-publiee",
    ),
    "Le conflit de coûts perd son attribution ou franchit la publication",
);
assert.ok(
    !coutsSnowWhite.some(
        (dossier) =>
            dossier.declaration.valeurOriginale.nature === "fourchette",
    ),
    "Deux déclarations ont été transformées en fourchette artificielle",
);
assert.ok(
    !fixture.dossiers.some(
        (dossier) => dossier.declaration.valeurOriginale?.valeur === 1444211.5,
    ),
    "Une moyenne des coûts divergents a été fabriquée",
);
assert.deepEqual(projections.get("contre-exemple-publication-incomplete"), {
    statut: "non-publiee",
    donnee: null,
});
assert.deepEqual(
    projections.get("enquete-snow-white-entrees-territoire-inconnu"),
    { statut: "non-publiee", donnee: null },
    "Une fréquentation sans territoire franchit la frontière publique",
);

const projectionSerialisee = JSON.stringify([...projections.values()]);
for (const clePrivee of [
    "noteInterne",
    "dimensionsManquantes",
    "sourceIdsEvalues",
    "verifiePar",
    "verifieLe",
    "statutEnquete",
    "formulationSource",
]) {
    assert.ok(
        !projectionSerialisee.includes(clePrivee),
        `La projection expose la clé privée ${clePrivee}`,
    );
}

const dossiersHistoriques = snowWhite.donneesEconomiques.map((donnee, index) =>
    adapterDonneeEconomiqueHistorique(donnee, {
        id: `snow-white-historique-${index + 1}`,
        oeuvre: {
            nom: "Snow White and the Seven Dwarfs",
            type: "oeuvre",
            slug: snowWhite.slug,
        },
    }),
);
assert.equal(dossiersHistoriques.length, 4);
assert.ok(
    dossiersHistoriques.every(
        (dossier) =>
            dossier.verdict === "investigation-only" &&
            projeterDossierEconomiquePublic(dossier).donnee === null,
    ),
    "L’adaptateur historique invente une complétude publique",
);
assert.deepEqual(
    dossiersHistoriques.map(
        (dossier) => dossier.declaration.valeurOriginale.valeur,
    ),
    snowWhite.donneesEconomiques.map((donnee) => donnee.valeur),
    "L’adaptateur historique altère les quatre déclarations de Blanche-Neige",
);
assert.equal(
    snowWhite.donneesEconomiques.map(lireDonneeEconomiqueOeuvre).length,
    4,
    "Les consommateurs historiques ne lisent plus les quatre mesures",
);

assert.equal(fixture.donneesDerivees.length, 1);
const hypothese = fixture.donneesDerivees[0];
assert.equal(hypothese.statutEnquete, "hypothetique");
assert.equal(hypothese.calcul.sourceMethodologiqueIds.length, 0);
assert.ok(
    !projectionSerialisee.includes(hypothese.id),
    "Une conversion hypothétique remplace la valeur nominale",
);

const nombreFiches = [
    "personnages",
    "contributeurs",
    "oeuvres",
    "epoques",
    "chansons",
]
    .map(
        (famille) =>
            readdirSync(path.join(racine, "src/data", famille)).filter(
                (fichier) => fichier.endsWith(".json"),
            ).length,
    )
    .reduce((total, nombre) => total + nombre, 0);
const publicationsPhase6 = lireJson(
    "docs/studio/production/acte-vi/phase-6/production.json",
).entries.filter((entree) => entree.status === "publiee");
assert.equal(
    nombreFiches,
    83 + publicationsPhase6.length,
    "Le corpus public doit conserver le socle de 83 fiches et les seules publications autorisées en Phase 6",
);
assert.equal(
    existsSync(
        path.join(racine, "src/data/catalogues/donnees-economiques.json"),
    ),
    false,
    "Un catalogue économique public a été créé pendant la Phase 4",
);

console.log(
    "✓ Données économiques : métriques, cumul, conflits, frontière privée et compatibilité vérifiés.",
);
