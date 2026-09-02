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
        "train-7c.md",
        "train-7d.md",
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

function verifierTrain7C(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chapitre = fiche.blocsEditoriaux?.[2];
    const attendu = {
        id: "donner-une-conscience-a-une-marionnette",
        titre: "Donner une conscience à une marionnette",
        question:
            "Comment le film construit-il ses personnages, son ton et son monde ?",
    };

    assert.ok(chapitre, "Train 7C : le troisième chapitre est absent");
    assert.equal(chapitre.id, attendu.id);
    assert.equal(chapitre.titre, attendu.titre);
    assert.equal(chapitre.question, attendu.question);
    assert.equal(
        chapitre.paragraphes.length,
        5,
        "Train 7C : cinq décisions de fabrication sont attendues",
    );
    assert.ok(
        chapitre.paragraphes.every(
            (paragraphe) => paragraphe && typeof paragraphe === "object",
        ),
        "Train 7C : tous les paragraphes doivent être structurés",
    );

    const preuves = new Set(
        chapitre.paragraphes.flatMap(({ sources }) => sources),
    );
    for (const sourceId of [
        "us-afi-catalog-pinocchio",
        "us-loc-pinocchio-essay",
        "us-wdfm-pool-hall",
        "us-d23-ken-anderson",
        "us-d23-dick-jones",
        "d23-marge-champion",
        "d23-leigh-harline",
        "d23-paul-smith",
    ]) {
        assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
        assert.ok(
            preuves.has(sourceId),
            `Train 7C : preuve attendue absente ${sourceId}`,
        );
    }

    const contributeursSelectionnes = [
        "fred-moore",
        "ward-kimball",
        "milt-kahl",
        "joe-grant",
        "kenneth-anderson",
        "dickie-jones",
        "marge-champion",
        "joshua-meador",
        "leigh-harline",
        "paul-j-smith",
    ];
    const slugsGenerique = new Set(
        fiche.contributions
            .map(({ contributeur }) => contributeur.slug)
            .filter(Boolean),
    );
    contributeursSelectionnes.forEach((slug) => {
        assert.ok(
            slugsGenerique.has(slug),
            `Train 7C : la personne racontée doit rester créditée dans le générique (${slug})`,
        );
    });
    assert.ok(
        contributeursSelectionnes.length < slugsGenerique.size,
        "Train 7C : le récit doit rester une sélection du générique",
    );
    assert.equal(
        fiche.contributions.length,
        31,
        "Train 7C : le générique structuré reste l’état de vérité",
    );

    const chapitreSerialise = JSON.stringify(chapitre);
    assert.doesNotMatch(
        chapitreSerialise,
        /us-wdfm-art-of-pinocchio/,
        "Train 7C : la source d’exposition privée ne doit pas être projetée",
    );
    assert.doesNotMatch(
        chapitreSerialise,
        /Générique vivant/,
        "Train 7C : le chapitre ne doit pas promouvoir le Plan de la Phase 8",
    );
    assert.match(
        chapitre.paragraphes.at(-1).reserve,
        /trente et une contributions qualifiées/,
        "Train 7C : la transmission vers le générique complet doit rester visible",
    );
}

function verifierTrain7D(idsSources, sources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chapitreExploitation = fiche.blocsEditoriaux?.[3];
    const chapitreTerritoires = fiche.blocsEditoriaux?.[4];

    assert.ok(
        chapitreExploitation && chapitreTerritoires,
        "Train 7D : les chapitres 4 et 5 sont absents",
    );
    assert.deepEqual(
        {
            id: chapitreExploitation.id,
            titre: chapitreExploitation.titre,
            question: chapitreExploitation.question,
            type: chapitreExploitation.type,
        },
        {
            id: "une-premiere-confrontee-au-monde-reel",
            titre: "Une première confrontée au monde réel",
            question:
                "Que signifie sortir un film dans ce contexte économique et géopolitique ?",
            type: "diffusion",
        },
    );
    assert.deepEqual(
        {
            id: chapitreTerritoires.id,
            titre: chapitreTerritoires.titre,
            question: chapitreTerritoires.question,
            type: chapitreTerritoires.type,
        },
        {
            id: "le-film-vu-depuis-plusieurs-territoires",
            titre: "Le film vu depuis plusieurs territoires",
            question:
                "Que révèlent les regards américain, français et italien ?",
            type: "reception",
        },
    );
    assert.equal(
        chapitreExploitation.paragraphes.length,
        3,
        "Train 7D : le chapitre 4 doit distinguer trois temps de lecture",
    );
    assert.equal(
        chapitreTerritoires.paragraphes.length,
        4,
        "Train 7D : le chapitre 5 doit préserver quatre regards territoriaux",
    );

    const preuves = new Set(
        [
            ...chapitreExploitation.paragraphes,
            ...chapitreTerritoires.paragraphes,
        ].flatMap(({ sources: sourceIds }) => sourceIds),
    );
    for (const sourceId of [
        "us-afi-catalog-pinocchio",
        "fr-cinematheque-pinocchio",
        "fr-cnc-visa-pinocchio",
        "fr-cnc-palmares-1946",
        "fr-retronews-pinocchio",
        "it-treccani-1940-pinocchio",
        "it-roma-tre-mazzei-pinocchio",
    ]) {
        assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
        assert.ok(
            preuves.has(sourceId),
            `Train 7D : preuve attendue absente ${sourceId}`,
        );
    }

    const evenements = new Map(
        fiche.sortie.evenements.map((evenement) => [evenement.id, evenement]),
    );
    assert.deepEqual(
        [
            "premiere-mondiale-us-1940",
            "sortie-nationale-us-1940",
            "sortie-nationale-fr-1946",
            "sortie-nationale-it-1947",
        ].map((id) => ({
            id,
            date: evenements.get(id)?.date,
            territoire: evenements.get(id)?.porteeTerritoriale?.code,
        })),
        [
            {
                id: "premiere-mondiale-us-1940",
                date: { valeur: "1940-02-07", precision: "jour" },
                territoire: "US",
            },
            {
                id: "sortie-nationale-us-1940",
                date: { valeur: "1940-02-23", precision: "jour" },
                territoire: "US",
            },
            {
                id: "sortie-nationale-fr-1946",
                date: { valeur: "1946-05-22", precision: "jour" },
                territoire: "FR",
            },
            {
                id: "sortie-nationale-it-1947",
                date: { valeur: "1947", precision: "annee" },
                territoire: "IT",
            },
        ],
        "Train 7D : les dates et territoires validés doivent rester stables",
    );

    const sourceVisa = sources.find(({ id }) => id === "fr-cnc-visa-pinocchio");
    assert.equal(sourceVisa?.datePublication, "1946-05-17");
    assert.equal(
        fiche.sortie.evenements.some(
            ({ date }) => date.valeur === sourceVisa.datePublication,
        ),
        false,
        "Train 7D : le visa administratif ne doit pas devenir une séance",
    );

    const texteExploitation = JSON.stringify(chapitreExploitation);
    assert.match(texteExploitation, /Sortir, être exploité, être reçu/);
    assert.match(texteExploitation, /périmètres et leurs méthodes divergent/);
    assert.doesNotMatch(
        texteExploitation,
        /(?:\$|€|dollars?|bénéfice de|perte de)\s*\d/i,
        "Train 7D : les résultats financiers initiaux restent hors publication",
    );

    const texteTerritoires = JSON.stringify(chapitreTerritoires);
    assert.match(
        texteTerritoires,
        /17 mai 1946 n’est pas un événement de projection/,
    );
    assert.match(texteTerritoires, /96 minutes/);
    assert.match(texteTerritoires, /87 minutes/);
    assert.match(texteTerritoires, /7,84 millions/);
    assert.match(texteTerritoires, /1946 à 2010/);
    assert.match(texteTerritoires, /et non les seules entrées/);
    assert.match(texteTerritoires, /admiration/);
    assert.match(texteTerritoires, /américanisation/);
    assert.match(texteTerritoires, /réappropriation affective/);
    assert.match(texteTerritoires, /réception italienne unique/);
    assert.doesNotMatch(
        texteTerritoires,
        /1984|it-cinematografo-pinocchio/,
        "Train 7D : la réévaluation tardive appartient au Train 7E",
    );
    assert.doesNotMatch(
        texteTerritoires,
        /[«»]/,
        "Train 7D : aucune citation longue ne doit être reconstruite sans original",
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
verifierTrain7C(idsSources);
verifierTrain7D(idsSources, sources);
verifierBranchement();

console.log(
    `Phase 7D vérifiée : ${resultat.blocs} blocs compatibles, première exploitation et regards américain, français et italien raccordés sans confondre leurs mesures.`,
);
