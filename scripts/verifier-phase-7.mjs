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
        "train-7e.md",
        "train-7f.md",
        "train-7g.md",
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

function verifierTrain7E(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chapitre = fiche.blocsEditoriaux?.[5];

    assert.ok(chapitre, "Train 7E : le sixième chapitre est absent");
    assert.deepEqual(
        {
            id: chapitre.id,
            titre: chapitre.titre,
            question: chapitre.question,
            type: chapitre.type,
        },
        {
            id: "les-ressorties-fabriquent-une-autre-reception",
            titre: "Les ressorties fabriquent une autre réception",
            question:
                "Comment de nouveaux publics reconstruisent-ils la valeur de l’œuvre ?",
            type: "heritage",
        },
    );
    assert.equal(
        chapitre.paragraphes.length,
        4,
        "Train 7E : quatre formes de vie successive sont attendues",
    );

    const preuves = new Set(
        chapitre.paragraphes.flatMap(({ sources: sourceIds }) => sourceIds),
    );
    for (const sourceId of [
        "fr-cinematheque-pinocchio",
        "fr-cnc-palmares-1946",
        "it-cinematografo-pinocchio",
        "us-academy-awards-1941",
        "us-loc-national-film-registry",
    ]) {
        assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
        assert.ok(
            preuves.has(sourceId),
            `Train 7E : preuve attendue absente ${sourceId}`,
        );
    }

    const version1975 = fiche.versions.find(
        ({ id }) => id === "doublage-francais-1975",
    );
    assert.deepEqual(version1975?.date, {
        valeur: "1975",
        precision: "annee",
    });
    assert.match(version1975?.noteDeReserve, /pas l’historique complet/);
    assert.equal(
        fiche.sortie.evenements.some(({ date }) => date.valeur === "1975"),
        false,
        "Train 7E : le doublage de 1975 ne doit pas créer une ressortie",
    );

    const reevaluation = fiche.receptions.find(
        ({ id }) => id === "reevaluation-italienne-1984",
    );
    assert.equal(reevaluation?.nature, "reevaluation");
    assert.deepEqual(reevaluation?.date, {
        valeur: "1984",
        precision: "annee",
    });
    assert.match(reevaluation?.resume, /sans remplacer les réactions de 1947/);

    const texte = JSON.stringify(chapitre);
    assert.match(texte, /1946 à 2010/);
    assert.match(texte, /chronologie complète des ressorties/);
    assert.match(texte, /ne suffit pas, à lui seul, à prouver une ressortie/);
    assert.match(texte, /réévaluation distincte/);
    assert.match(texte, /1941/);
    assert.match(texte, /1994/);
    assert.match(texte, /plus d’un demi-siècle/);
    assert.match(texte, /sélection patrimoniale/);
    assert.doesNotMatch(
        texte,
        /restaur(?:ation|é|ée)|DVD|Blu-ray|VHS|streaming/i,
        "Train 7E : aucun support ou restauration ne doit être inventé",
    );
    assert.ok(
        fiche.blocsEditoriaux.length >= 6,
        "Train 7E : les six premiers chapitres doivent rester présents",
    );
}

function verifierTrain7F(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chanson = lireJson(
        "src/data/chansons/when-you-wish-upon-a-star.json",
    );
    const chapitre = fiche.blocsEditoriaux?.[6];

    assert.ok(chapitre, "Train 7F : le septième chapitre est absent");
    assert.deepEqual(
        {
            id: chapitre.id,
            titre: chapitre.titre,
            question: chapitre.question,
            type: chapitre.type,
        },
        {
            id: "quand-les-images-et-les-chansons-quittent-le-film",
            titre: "Quand les images et les chansons quittent le film",
            question: "Quels éléments acquièrent une vie autonome ?",
            type: "heritage",
        },
    );
    assert.equal(
        chapitre.paragraphes.length,
        4,
        "Train 7F : quatre formes d’autonomie sont attendues",
    );

    const preuvesAttendues = [
        "us-d23-figaro",
        "us-d23-figaro-and-cleo",
        "us-d23-when-you-wish-upon-a-star",
        "us-d23-ned-washington",
        "us-loc-national-recording-registry-when-you-wish",
        "us-loc-national-film-registry",
        "us-d23-disney100-castle-intro",
        "d23-wish-animation-nods",
    ];
    const preuvesChapitre = new Set(
        chapitre.paragraphes.flatMap(({ sources: sourceIds }) => sourceIds),
    );
    for (const sourceId of preuvesAttendues) {
        assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
        assert.ok(
            preuvesChapitre.has(sourceId),
            `Train 7F : preuve du chapitre absente ${sourceId}`,
        );
    }

    assert.equal(
        chanson.blocsEditoriaux.length,
        3,
        "Train 7F : la chanson pilote doit porter trois chapitres",
    );
    assert.ok(
        chanson.blocsEditoriaux.every(
            (bloc) =>
                chaineNonVide(bloc.id) &&
                chaineNonVide(bloc.question) &&
                bloc.paragraphes.every(
                    (paragraphe) =>
                        paragraphe && typeof paragraphe === "object",
                ),
        ),
        "Train 7F : le récit pilote doit être entièrement structuré",
    );
    assert.equal(
        chanson.blocsEditoriaux.reduce(
            (total, bloc) => total + bloc.paragraphes.length,
            0,
        ),
        7,
        "Train 7F : sept unités de preuve sont attendues dans la chanson",
    );

    assert.equal(chanson.identite.libelle, "When You Wish Upon a Star");
    assert.equal(
        chanson.identitesAlternatives[0].libelle,
        "Quand on prie la bonne étoile",
    );
    const versionFrancaise = chanson.versions.find(
        ({ id }) => id === "when-you-wish-adaptation-fr-1995",
    );
    assert.deepEqual(versionFrancaise?.date, {
        valeur: "1995",
        precision: "annee",
    });
    assert.match(versionFrancaise?.noteDeReserve, /sans être antidatés/);

    const enregistrement = chanson.enregistrements.find(
        ({ id }) => id === "enregistrement-when-you-wish-film-1940",
    );
    assert.deepEqual(enregistrement?.date, {
        valeur: "1938",
        precision: "annee",
    });
    assert.match(enregistrement?.edition, /publié avec le film en 1940/);
    assert.equal(
        chanson.occurrences.length,
        1,
        "Train 7F : les usages culturels ne doivent pas devenir de fausses occurrences filmiques",
    );

    const receptionPatrimoniale = chanson.receptions.find(
        ({ id }) => id === "reception-national-recording-registry-2009",
    );
    assert.equal(receptionPatrimoniale?.nature, "patrimoniale");
    assert.deepEqual(receptionPatrimoniale?.date, {
        valeur: "2009",
        precision: "annee",
    });

    const texteChanson = JSON.stringify(chanson);
    assert.match(texteChanson, /émission télévisée Disneyland/);
    assert.match(texteChanson, /National Recording Registry/);
    assert.match(texteChanson, /Christophe Beck/);
    assert.match(texteChanson, /Wish/);
    assert.match(texteChanson, /1995/);
    assert.match(texteChanson, /pas par le seul qualificatif d’icône/);
    assert.doesNotMatch(
        texteChanson,
        /"(?:audio|audioUrl|lyrics|lyricsUrl|paroles|texteIntegral)"\s*:/,
        "Train 7F : aucune matière protégée ne doit entrer dans la chanson",
    );

    const texteChapitre = JSON.stringify(chapitre);
    assert.match(texteChapitre, /sept apparitions supplémentaires/);
    assert.match(texteChapitre, /autonomie concrète/);
    assert.match(texteChapitre, /aucun média, aucune parole/i);
    assert.ok(
        fiche.blocsEditoriaux.length >= 7,
        "Train 7F : les sept premiers chapitres doivent rester présents",
    );
}

function verifierTrain7G(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chapitres = fiche.blocsEditoriaux ?? [];
    const programme = [
        [
            "apres-blanche-neige-ne-pas-simplement-recommencer",
            "Après Blanche-Neige, ne pas simplement recommencer",
            "Pourquoi le deuxième long métrage est-il une nouvelle épreuve ?",
        ],
        [
            "de-collodi-a-disney",
            "De Collodi à Disney",
            "Pourquoi une histoire change-t-elle lorsqu’elle traverse une époque et un studio ?",
        ],
        [
            "donner-une-conscience-a-une-marionnette",
            "Donner une conscience à une marionnette",
            "Comment le film construit-il ses personnages, son ton et son monde ?",
        ],
        [
            "une-premiere-confrontee-au-monde-reel",
            "Une première confrontée au monde réel",
            "Que signifie sortir un film dans ce contexte économique et géopolitique ?",
        ],
        [
            "le-film-vu-depuis-plusieurs-territoires",
            "Le film vu depuis plusieurs territoires",
            "Que révèlent les regards américain, français et italien ?",
        ],
        [
            "les-ressorties-fabriquent-une-autre-reception",
            "Les ressorties fabriquent une autre réception",
            "Comment de nouveaux publics reconstruisent-ils la valeur de l’œuvre ?",
        ],
        [
            "quand-les-images-et-les-chansons-quittent-le-film",
            "Quand les images et les chansons quittent le film",
            "Quels éléments acquièrent une vie autonome ?",
        ],
        [
            "le-prochain-vertige-fantasia",
            "Le prochain vertige : Fantasia",
            "Pourquoi le studio ne se stabilise-t-il toujours pas ?",
        ],
    ];

    assert.equal(
        chapitres.length,
        programme.length,
        "Train 7G : le récit doit compter exactement huit chapitres",
    );
    assert.deepEqual(
        chapitres.map(({ id, titre, question }) => [id, titre, question]),
        programme,
        "Train 7G : l’ordre du récit doit rester celui du programme",
    );

    const chapitre = chapitres.at(-1);
    assert.equal(chapitre.type, "repere");
    assert.equal(chapitre.eyebrow, "Dernière image");
    assert.equal(
        chapitre.paragraphes.length,
        3,
        "Train 7G : le raccord vers Fantasia doit rester une dernière image en trois mouvements",
    );
    const preuves = new Set(
        chapitre.paragraphes.flatMap(({ sources: sourceIds }) => sourceIds),
    );
    for (const sourceId of [
        "us-d23-fantasia-film",
        "us-d23-fantasia-at-80",
        "wdfm-fantasia-pastoral",
    ]) {
        assert.ok(idsSources.has(sourceId), `source inconnue ${sourceId}`);
        assert.ok(
            preuves.has(sourceId),
            `Train 7G : preuve du raccord absente ${sourceId}`,
        );
    }

    const texteChapitre = JSON.stringify(chapitre);
    assert.match(texteChapitre, /13 novembre 1940/);
    assert.match(texteChapitre, /huit séquences/);
    assert.match(texteChapitre, /Fantasound/);
    assert.match(texteChapitre, /futur index des Musiques/);
    assert.match(texteChapitre, /aucune fiche/);
    assert.equal(
        existsSync(chemin("src/data/oeuvres/fantasia.json")),
        false,
        "Train 7G : Fantasia ne doit pas devenir une fiche anticipée",
    );

    const composantRecit = readFileSync(
        chemin(
            "src/components/codex/CodexFiche/CodexFicheRecit/CodexFicheRecit.tsx",
        ),
        "utf8",
    );
    assert.match(composantRecit, /deriveCartePreuvesEditoriale\(blocs\)/);
    assert.match(composantRecit, /<nav aria-label=/);
    assert.match(composantRecit, /<table/);
    assert.match(composantRecit, /reserve\.texte/);
    assert.match(composantRecit, /getSourceAnchorId\(source\.id\)/);
    assert.doesNotMatch(
        composantRecit,
        /["']use client["']/,
        "Train 7G : la lecture complète ne doit dépendre d’aucun état client",
    );

    const pageOeuvre = readFileSync(
        chemin("src/app/oeuvres/[slug]/page.tsx"),
        "utf8",
    );
    assert.match(
        pageOeuvre,
        /withEvidenceMap=\{fiche\.slug === "pinocchio"\}/,
        "Train 7G : la carte doit rester explicitement limitée à Pinocchio",
    );

    const pageChanson = readFileSync(
        chemin("src/app/chansons/[slug]/page.tsx"),
        "utf8",
    );
    assert.match(pageChanson, /collection="chansons"/);
    assert.match(pageChanson, /blocs=\{fiche\.blocsEditoriaux\}/);
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

function verifierCloturePhase7(idsSources) {
    const fiche = lireJson("src/data/oeuvres/pinocchio.json");
    const chanson = lireJson(
        "src/data/chansons/when-you-wish-upon-a-star.json",
    );
    const catalogues = {
        oeuvres: 24,
        personnages: 33,
        contributeurs: 41,
        chansons: 9,
        epoques: 2,
    };

    function mesurerRecit(blocs) {
        const paragraphes = blocs.flatMap((bloc) => bloc.paragraphes);
        const structures = paragraphes.filter(
            (paragraphe) => paragraphe && typeof paragraphe === "object",
        );

        return {
            chapitres: blocs.length,
            paragraphes: paragraphes.length,
            structures: structures.length,
            questions: blocs.filter(({ question }) => chaineNonVide(question))
                .length,
            sources: new Set(
                structures.flatMap(({ sources: sourceIds }) => sourceIds),
            ).size,
            reserves: structures.filter(({ reserve }) => chaineNonVide(reserve))
                .length,
        };
    }

    assert.deepEqual(mesurerRecit(fiche.blocsEditoriaux ?? []), {
        chapitres: 8,
        paragraphes: 29,
        structures: 29,
        questions: 8,
        sources: 31,
        reserves: 14,
    });
    assert.deepEqual(mesurerRecit(chanson.blocsEditoriaux ?? []), {
        chapitres: 3,
        paragraphes: 7,
        structures: 7,
        questions: 3,
        sources: 11,
        reserves: 2,
    });

    const matierePublique = JSON.stringify({ fiche, chanson });
    assert.doesNotMatch(
        matierePublique,
        /us-wdfm-art-of-pinocchio/,
        "Train 7H : la notice d’exposition privée ne doit pas traverser la projection",
    );
    assert.doesNotMatch(
        JSON.stringify(chanson),
        /"(?:audio|audioUrl|lyrics|lyricsUrl|paroles|texteIntegral)"\s*:/,
        "Train 7H : aucun média ni paroles protégées ne doivent entrer dans la chanson",
    );

    let totalArchives = 0;
    for (const [catalogue, totalAttendu] of Object.entries(catalogues)) {
        const entrees = lireJson(`src/data/catalogues/${catalogue}.json`);
        assert.equal(
            entrees.length,
            totalAttendu,
            `Train 7H : dérive du catalogue ${catalogue}`,
        );
        totalArchives += entrees.length;
    }
    assert.equal(totalArchives, 109, "Train 7H : 109 Archives attendues");
    assert.equal(
        fiche.contributions.length,
        31,
        "Train 7H : la Phase 8 doit recevoir les 31 contributions qualifiées",
    );

    assert.ok(
        idsSources.size >= 242,
        "Train 7H : le registre de preuves a reculé",
    );
}

verifierDocuments();
const sources = lireJson("src/data/sources/sources.json");
const idsSources = new Set(sources.map((source) => source.id));
const resultat = verifierFiches(idsSources);
verifierFixture(idsSources);
verifierTrain7B(idsSources);
verifierTrain7C(idsSources);
verifierTrain7D(idsSources, sources);
verifierTrain7E(idsSources);
verifierTrain7F(idsSources);
verifierTrain7G(idsSources);
verifierBranchement();
verifierCloturePhase7(idsSources);

console.log(
    `Phase 7 clôturée : ${resultat.blocs} blocs compatibles, huit chapitres ordonnés, 29 unités de preuve et 109 Archives préservées.`,
);
