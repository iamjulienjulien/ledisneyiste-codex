import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const cataloguesAttendus = {
    personnages: 33,
    contributeurs: 41,
    oeuvres: 24,
    epoques: 2,
    chansons: 9,
};

const cloturesAttendues = [
    "docs/studio/production/acte-vi/phase-0-cloture.md",
    "docs/studio/production/acte-vi/phase-1-cloture.md",
    ...Array.from(
        { length: 7 },
        (_, index) =>
            `docs/studio/production/acte-vi/phase-${index + 2}/cloture.md`,
    ),
];

const primitivesFocaleAttendues = [
    "FocaleAnnotation",
    "FocaleLegend",
    "FocaleMark",
    "FocaleScale",
    "FocaleTable",
    "FocaleViewport",
];

function chemin(...segments) {
    return path.join(racine, ...segments);
}

function lire(fichier) {
    return readFileSync(chemin(fichier), "utf8");
}

function lireJson(fichier) {
    return JSON.parse(lire(fichier));
}

function verifierTransmissions() {
    for (const cloture of cloturesAttendues) {
        assert.ok(existsSync(chemin(cloture)), `Clôture absente : ${cloture}`);
        assert.match(lire(cloture), /## Verdict/);
    }

    for (const document of [
        "docs/studio/production/acte-vi/phase-9/etat-reference.md",
        "docs/studio/production/acte-vi/phase-9/train-9a.md",
        "docs/studio/production/acte-vi/phase-9/train-9b.md",
    ]) {
        assert.ok(
            existsSync(chemin(document)),
            `Train 9A absent : ${document}`,
        );
    }

    const reference = lire(
        "docs/studio/production/acte-vi/phase-9/etat-reference.md",
    );
    for (const invariant of [
        "109 Archives",
        "31 contributions",
        "PlanGeneriqueVivant` v1.0.0",
        "six primitives Focale",
        "aucun défaut bloquant",
    ]) {
        assert.match(
            reference,
            new RegExp(invariant, "i"),
            `État de référence incomplet : ${invariant}`,
        );
    }
}

function verifierTrain9B() {
    const train = lire("docs/studio/production/acte-vi/phase-9/train-9b.md");

    for (const attendu of [
        "validé sans raccord produit",
        "Aucun défaut bloquant connu",
        "Reports non bloquants",
        "Workflow commun de maturation des Plans",
        "Corpus de _Fantasia_ et futur index Musiques",
        "Absence volontaire de diff produit",
        "Train 9C",
    ]) {
        assert.match(
            train,
            new RegExp(attendu, "i"),
            `Train 9B : décision absente « ${attendu} »`,
        );
    }
}

function verifierArchives() {
    let total = 0;

    for (const [catalogue, attendu] of Object.entries(cataloguesAttendus)) {
        const entrees = lireJson(`src/data/catalogues/${catalogue}.json`);
        assert.equal(
            entrees.length,
            attendu,
            `Phase 9 : dérive du catalogue ${catalogue}`,
        );
        total += entrees.length;
    }

    assert.equal(total, 109, "Phase 9 : 109 Archives publiques attendues");
}

function verifierPinocchio() {
    const pinocchio = lireJson("src/data/oeuvres/pinocchio.json");
    const contributions = pinocchio.contributions;

    assert.equal(contributions.length, 31);
    assert.equal(new Set(contributions.map(({ domaine }) => domaine)).size, 8);

    const nonResolues = contributions.filter(
        ({ contributeur }) => !contributeur.slug,
    );
    assert.deepEqual(
        nonResolues.map(({ contributeur }) => contributeur.nom),
        ["Evelyn Venable"],
    );
    assert.equal(contributions.length - nonResolues.length, 30);
}

function verifierPlanPublic() {
    const types = lire(
        "src/components/plans/PlanGeneriqueVivant/PlanGeneriqueVivant.types.ts",
    );
    const composant = lire(
        "src/components/plans/PlanGeneriqueVivant/PlanGeneriqueVivant.tsx",
    );
    const details = lire(
        "src/components/codex/CodexFiche/CodexFicheOeuvreDetails/CodexFicheOeuvreDetails.tsx",
    );
    const route = lire("src/app/oeuvres/[slug]/page.tsx");

    assert.match(types, /PlanGeneriqueVivantVersion = "1\.0\.0"/);
    assert.match(composant, /Afficher le générique simple/);
    assert.match(composant, /Revenir au Plan/);
    assert.match(route, /slug === "pinocchio"/);
    assert.match(route, /generiqueVivant=\{generiqueVivant\}/);
    assert.match(details, /<PlanGeneriqueVivant/);
    assert.equal(
        existsSync(chemin("src/components/ui/PixieGeneriqueVivant")),
        false,
        "Le Générique vivant ne doit pas devenir un composant Pixie",
    );
}

function verifierFocale() {
    const primitives = readdirSync(chemin("src/components/focale"), {
        withFileTypes: true,
    })
        .filter((entree) => entree.isDirectory())
        .map(({ name }) => name)
        .sort((a, b) => a.localeCompare(b));

    assert.deepEqual(
        primitives,
        primitivesFocaleAttendues,
        "Phase 9 : le noyau Focale doit rester borné à six primitives",
    );
}

function verifierBranchement() {
    const scripts = lireJson("package.json").scripts;

    assert.equal(scripts["check:phase-9"], "node scripts/verifier-phase-9.mjs");
    for (const script of ["check", "check:ci"]) {
        assert.match(
            scripts[script],
            /pnpm check:phase-8 && pnpm check:phase-9/,
            `${script} : la Phase 9 doit suivre la Phase 8`,
        );
    }
}

verifierTransmissions();
verifierTrain9B();
verifierArchives();
verifierPinocchio();
verifierPlanPublic();
verifierFocale();
verifierBranchement();

console.log(
    "Phase 9 · Train 9B validé : 9 transmissions raccordées, aucun défaut bloquant, 7 reports orientés.",
);
