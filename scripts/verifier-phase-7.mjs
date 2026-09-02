import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dossierPhase = "docs/studio/production/acte-vi/phase-7";
const dossiersFiches = [
    "oeuvres",
    "personnages",
    "contributeurs",
    "epoques",
    "chansons",
];
const motifIdentifiant = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function chemin(...segments) {
    return path.join(racine, ...segments);
}

function lireJson(fichier) {
    return JSON.parse(readFileSync(chemin(fichier), "utf8"));
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function verifierSources(sourceIds, contexte, idsSources) {
    assert.ok(Array.isArray(sourceIds), `${contexte} : sources invalides`);
    assert.equal(
        new Set(sourceIds).size,
        sourceIds.length,
        `${contexte} : source dupliquée`,
    );

    for (const sourceId of sourceIds) {
        assert.ok(
            chaineNonVide(sourceId) && idsSources.has(sourceId),
            `${contexte} : source inconnue « ${sourceId} »`,
        );
    }
}

function verifierAncre(id, contexte, idsAncres) {
    assert.match(id, motifIdentifiant, `${contexte} : id invalide`);
    assert.equal(idsAncres.has(id), false, `${contexte} : ancre dupliquée`);
    idsAncres.add(id);
}

function verifierBloc(bloc, contexte, idsSources, idsAncres) {
    assert.ok(bloc && typeof bloc === "object", `${contexte} : bloc invalide`);
    assert.ok(chaineNonVide(bloc.type), `${contexte} : type absent`);
    assert.ok(chaineNonVide(bloc.titre), `${contexte} : titre absent`);
    assert.ok(
        Array.isArray(bloc.paragraphes) && bloc.paragraphes.length > 0,
        `${contexte} : paragraphes absents`,
    );

    if (bloc.id !== undefined) {
        verifierAncre(bloc.id, contexte, idsAncres);
    }
    if (bloc.question !== undefined) {
        assert.ok(chaineNonVide(bloc.question), `${contexte} : question vide`);
    }
    if (bloc.sources !== undefined) {
        verifierSources(bloc.sources, contexte, idsSources);
    }

    bloc.paragraphes.forEach((paragraphe, index) => {
        const contexteParagraphe = `${contexte} · paragraphe ${index + 1}`;

        if (typeof paragraphe === "string") {
            assert.ok(
                chaineNonVide(paragraphe),
                `${contexteParagraphe} : texte vide`,
            );
            return;
        }

        assert.ok(
            paragraphe && typeof paragraphe === "object",
            `${contexteParagraphe} : structure invalide`,
        );
        verifierAncre(paragraphe.id, contexteParagraphe, idsAncres);
        assert.ok(
            chaineNonVide(paragraphe.texte),
            `${contexteParagraphe} : texte absent`,
        );
        verifierSources(paragraphe.sources, contexteParagraphe, idsSources);
        assert.ok(
            paragraphe.sources.length > 0,
            `${contexteParagraphe} : aucune preuve`,
        );

        if (paragraphe.reserve !== undefined) {
            assert.ok(
                chaineNonVide(paragraphe.reserve),
                `${contexteParagraphe} : réserve vide`,
            );
        }
    });
}

function verifierDocuments() {
    for (const document of [
        "etat-reference.md",
        "recit-et-preuves.md",
        "train-7a.md",
        "train-7b.md",
    ]) {
        assert.ok(
            existsSync(chemin(dossierPhase, document)),
            `Phase 7 : document absent ${document}`,
        );
    }
}

function verifierTrain7B(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chapitres = fiche.blocsEditoriaux ?? [];
    const attendus = [
        {
            id: "apres-blanche-neige-ne-pas-simplement-recommencer",
            titre: "Après Blanche-Neige, ne pas simplement recommencer",
            question:
                "Pourquoi le deuxième long métrage est-il une nouvelle épreuve ?",
            preuves: [
                "us-afi-catalog-pinocchio",
                "us-loc-pinocchio-essay",
                "us-wdfm-milt-kahl-puppeteer",
            ],
        },
        {
            id: "de-collodi-a-disney",
            titre: "De Collodi à Disney",
            question:
                "Pourquoi une histoire change-t-elle lorsqu’elle traverse une époque et un studio ?",
            preuves: [
                "it-treccani-pinocchio",
                "it-collodi-critical-text",
                "us-wdfm-milt-kahl-puppeteer",
                "us-wdfm-reimagining-jiminy",
            ],
        },
    ];

    assert.ok(
        chapitres.length >= attendus.length,
        "Train 7B : les deux premiers chapitres sont absents",
    );

    attendus.forEach((attendu, index) => {
        const chapitre = chapitres[index];
        assert.equal(
            chapitre.id,
            attendu.id,
            `Train 7B · chapitre ${index + 1}`,
        );
        assert.equal(chapitre.titre, attendu.titre, attendu.id);
        assert.equal(chapitre.question, attendu.question, attendu.id);
        assert.equal(
            chapitre.paragraphes.length,
            3,
            `${attendu.id} : trois mouvements attendus`,
        );
        assert.ok(
            chapitre.paragraphes.every(
                (paragraphe) => paragraphe && typeof paragraphe === "object",
            ),
            `${attendu.id} : tous les paragraphes doivent être structurés`,
        );

        const preuves = new Set(
            chapitre.paragraphes.flatMap(({ sources }) => sources),
        );
        attendu.preuves.forEach((sourceId) => {
            assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
            assert.ok(
                preuves.has(sourceId),
                `${attendu.id} : preuve attendue absente ${sourceId}`,
            );
        });
    });

    const chapitreEpreuve = JSON.stringify(chapitres[0]);
    assert.doesNotMatch(
        chapitreEpreuve,
        /(?:\$|€|\b(?:dollars?|millions?)\b\s*\d|\d\s*(?:dollars?|millions?)\b)/i,
        "Train 7B : aucun montant financier ne doit entrer dans le récit",
    );
    assert.match(
        chapitreEpreuve,
        /périmètres divergents/,
        "Train 7B : la réserve économique doit rester visible",
    );

    const chapitreAdaptation = JSON.stringify(chapitres[1]);
    assert.match(chapitreAdaptation, /Le avventure di Pinocchio/);
    assert.match(chapitreAdaptation, /aucune route publique/);

    const relationCollodi = fiche.relationsOeuvres?.find(
        ({ oeuvre }) => oeuvre.id === "oeuvre-source-collodi-pinocchio",
    );
    assert.equal(relationCollodi?.nature, "adaptation");
    assert.equal(relationCollodi?.oeuvre.type, "oeuvre-source");
    assert.equal(
        existsSync(chemin("src/app/oeuvres-sources")),
        false,
        "Train 7B : le registre des Œuvres sources ne doit pas ouvrir de route publique",
    );
}

function verifierFiches(idsSources) {
    let blocs = 0;
    let paragraphesStructures = 0;

    for (const dossier of dossiersFiches) {
        const fichiers = readdirSync(chemin("src/data", dossier)).filter(
            (fichier) => fichier.endsWith(".json"),
        );

        for (const fichier of fichiers) {
            const fiche = lireJson(`src/data/${dossier}/${fichier}`);
            const idsAncres = new Set();

            for (const [index, bloc] of (
                fiche.blocsEditoriaux ?? []
            ).entries()) {
                const contexte = `${dossier}/${fichier} · bloc ${index + 1}`;
                verifierBloc(bloc, contexte, idsSources, idsAncres);
                blocs += 1;
                paragraphesStructures += bloc.paragraphes.filter(
                    (paragraphe) =>
                        paragraphe && typeof paragraphe === "object",
                ).length;
            }
        }
    }

    return { blocs, paragraphesStructures };
}

function verifierFixture(idsSources) {
    const fixture = lireJson("scripts/fixtures/blocs-editoriaux-phase-7.json");
    const idsAncres = new Set();
    verifierBloc(fixture.legacy, "fixture historique", idsSources, idsAncres);
    verifierBloc(
        fixture.structure,
        "fixture structurée",
        idsSources,
        idsAncres,
    );
    assert.equal(typeof fixture.legacy.paragraphes[0], "string");
    assert.equal(typeof fixture.structure.paragraphes[0], "object");
    assert.ok(fixture.structure.paragraphes.some(({ reserve }) => reserve));
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");
    assert.equal(
        packageJson.scripts["check:phase-7"],
        "node scripts/verifier-phase-7.mjs",
    );
    for (const script of ["check", "check:ci"]) {
        assert.match(
            packageJson.scripts[script],
            /pnpm check:phase-6 && pnpm check:phase-7/,
            `${script} : la Phase 7 doit suivre la Phase 6`,
        );
    }
}

verifierDocuments();
const sources = lireJson("src/data/sources/sources.json");
const idsSources = new Set(sources.map((source) => source.id));
const resultat = verifierFiches(idsSources);
verifierFixture(idsSources);
verifierTrain7B(idsSources);
verifierBranchement();

console.log(
    `Phase 7B vérifiée : ${resultat.blocs} blocs compatibles, contrat structuré et deux premiers chapitres de Pinocchio raccordés à leurs preuves.`,
);
