import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const domainesCredits = new Set([
    "production-direction",
    "histoire-adaptation",
    "direction-artistique-conception",
    "animation-personnages",
    "decors-effets-photographie",
    "musique-chansons",
    "interpretation-vocale",
    "innovations-techniques",
    "reference-filmee",
]);
const naturesEvenements = new Set(["premiere-mondiale", "sortie-nationale"]);
const naturesDonneesEconomiques = new Set([
    "cout-production",
    "revenus",
    "entrees",
]);
const certitudes = new Set(["documente", "estimation", "conteste"]);
const naturesRelations = new Set([
    "source",
    "preparation",
    "adaptation",
    "suite",
    "remake",
    "derivee",
]);
const naturesTitres = new Set([
    "original",
    "international",
    "sortie-territoriale",
]);

async function lireJson(chemin) {
    return JSON.parse(await readFile(path.join(racine, chemin), "utf8"));
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function nombrePositif(valeur) {
    return typeof valeur === "number" && Number.isFinite(valeur) && valeur > 0;
}

function dateEstValide(date) {
    if (!date || !chaineNonVide(date.valeur)) {
        return false;
    }

    switch (date.precision) {
        case "annee":
            return /^\d{4}$/.test(date.valeur);

        case "mois": {
            if (!/^\d{4}-\d{2}$/.test(date.valeur)) {
                return false;
            }

            const mois = Number(date.valeur.slice(5, 7));
            return mois >= 1 && mois <= 12;
        }

        case "jour": {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date.valeur)) {
                return false;
            }

            const valeur = new Date(`${date.valeur}T00:00:00Z`);
            return (
                !Number.isNaN(valeur.getTime()) &&
                valeur.toISOString().slice(0, 10) === date.valeur
            );
        }

        default:
            return false;
    }
}

function verifierSources(liste, contexte, idsSources, erreurs) {
    if (!Array.isArray(liste) || liste.length === 0) {
        erreurs.push(`${contexte} : au moins une source est obligatoire`);
        return;
    }

    const sourcesUniques = new Set();
    for (const source of liste) {
        if (!chaineNonVide(source) || !idsSources.has(source)) {
            erreurs.push(`${contexte} : source inconnue « ${source} »`);
        }

        if (sourcesUniques.has(source)) {
            erreurs.push(`${contexte} : source dupliquée « ${source} »`);
        }
        sourcesUniques.add(source);
    }
}

function verifierPeriode(periode, contexte, erreurs) {
    if (!periode || !dateEstValide(periode.debut)) {
        erreurs.push(`${contexte} : date de début invalide`);
    }

    if (periode?.fin !== undefined && !dateEstValide(periode.fin)) {
        erreurs.push(`${contexte} : date de fin invalide`);
    }
}

function verifierTitres(fiche, contexte, idsSources, erreurs) {
    if (fiche.titresAlternatifs === undefined) {
        return;
    }

    if (!Array.isArray(fiche.titresAlternatifs)) {
        erreurs.push(`${contexte} · titres alternatifs : tableau attendu`);
        return;
    }

    fiche.titresAlternatifs.forEach((titre, index) => {
        const contexteTitre = `${contexte} · titre alternatif ${index + 1}`;
        if (!chaineNonVide(titre.titre)) {
            erreurs.push(`${contexteTitre} : titre absent`);
        }
        if (!naturesTitres.has(titre.nature)) {
            erreurs.push(
                `${contexteTitre} : nature inconnue « ${titre.nature} »`,
            );
        }
        if (titre.langue !== undefined && !chaineNonVide(titre.langue)) {
            erreurs.push(`${contexteTitre} : langue invalide`);
        }
        if (
            titre.territoire !== undefined &&
            !chaineNonVide(titre.territoire)
        ) {
            erreurs.push(`${contexteTitre} : territoire invalide`);
        }
        verifierSources(titre.sources, contexteTitre, idsSources, erreurs);
    });
}

function verifierSorties(fiche, contexte, idsSources, erreurs) {
    if (!dateEstValide(fiche.sortie?.date)) {
        erreurs.push(`${contexte} · sortie : date canonique invalide`);
    }

    const evenements = fiche.sortie?.evenements;
    if (evenements === undefined) {
        return;
    }

    if (!Array.isArray(evenements) || evenements.length === 0) {
        erreurs.push(`${contexte} · sorties : au moins un événement attendu`);
        return;
    }

    evenements.forEach((evenement, index) => {
        const contexteEvenement = `${contexte} · événement de sortie ${index + 1}`;
        if (!dateEstValide(evenement.date)) {
            erreurs.push(`${contexteEvenement} : date invalide`);
        }
        if (!chaineNonVide(evenement.territoire)) {
            erreurs.push(`${contexteEvenement} : territoire absent`);
        }
        if (!naturesEvenements.has(evenement.nature)) {
            erreurs.push(
                `${contexteEvenement} : nature inconnue « ${evenement.nature} »`,
            );
        }
        if (evenement.lieu !== undefined && !chaineNonVide(evenement.lieu)) {
            erreurs.push(`${contexteEvenement} : lieu invalide`);
        }
        verifierSources(
            evenement.sources,
            contexteEvenement,
            idsSources,
            erreurs,
        );
    });
}

function verifierDurees(fiche, contexte, idsSources, erreurs) {
    if (fiche.durees === undefined) {
        return;
    }

    if (!Array.isArray(fiche.durees) || fiche.durees.length === 0) {
        erreurs.push(`${contexte} · durées : au moins une durée attendue`);
        return;
    }

    fiche.durees.forEach((duree, index) => {
        const contexteDuree = `${contexte} · durée ${index + 1}`;
        if (!nombrePositif(duree.valeur) || duree.unite !== "minutes") {
            erreurs.push(`${contexteDuree} : valeur ou unité invalide`);
        }
        if (!chaineNonVide(duree.version)) {
            erreurs.push(`${contexteDuree} : version absente`);
        }
        verifierSources(duree.sources, contexteDuree, idsSources, erreurs);
    });
}

function verifierProduction(fiche, contexte, idsSources, erreurs) {
    if (fiche.production === undefined) {
        return;
    }

    verifierPeriode(fiche.production, `${contexte} · production`, erreurs);
    verifierSources(
        fiche.production.sources,
        `${contexte} · production`,
        idsSources,
        erreurs,
    );
}

function verifierDonneesEconomiques(fiche, contexte, idsSources, erreurs) {
    if (fiche.donneesEconomiques === undefined) {
        return;
    }

    if (
        !Array.isArray(fiche.donneesEconomiques) ||
        fiche.donneesEconomiques.length === 0
    ) {
        erreurs.push(
            `${contexte} · données économiques : au moins une mesure attendue`,
        );
        return;
    }

    fiche.donneesEconomiques.forEach((donnee, index) => {
        const contexteDonnee = `${contexte} · donnée économique ${index + 1}`;
        if (!naturesDonneesEconomiques.has(donnee.nature)) {
            erreurs.push(
                `${contexteDonnee} : nature inconnue « ${donnee.nature} »`,
            );
        }
        if (!nombrePositif(donnee.valeur)) {
            erreurs.push(`${contexteDonnee} : valeur invalide`);
        }
        if (!chaineNonVide(donnee.territoire)) {
            erreurs.push(`${contexteDonnee} : territoire absent`);
        }
        if (!certitudes.has(donnee.certitude)) {
            erreurs.push(
                `${contexteDonnee} : certitude inconnue « ${donnee.certitude} »`,
            );
        }
        if (donnee.unite === "monetaire") {
            if (donnee.nature === "entrees") {
                erreurs.push(
                    `${contexteDonnee} : une mesure d’entrées doit utiliser l’unité « entrees »`,
                );
            }
            if (!chaineNonVide(donnee.devise)) {
                erreurs.push(`${contexteDonnee} : devise absente`);
            }
        } else if (donnee.unite === "entrees") {
            if (donnee.nature !== "entrees") {
                erreurs.push(
                    `${contexteDonnee} : une mesure monétaire doit utiliser l’unité « monetaire »`,
                );
            }
            if (donnee.devise !== undefined) {
                erreurs.push(
                    `${contexteDonnee} : une mesure d’entrées ne possède pas de devise`,
                );
            }
        } else {
            erreurs.push(
                `${contexteDonnee} : unité inconnue « ${donnee.unite} »`,
            );
        }

        verifierPeriode(donnee.periode, contexteDonnee, erreurs);
        verifierSources(donnee.sources, contexteDonnee, idsSources, erreurs);
    });
}

function verifierRelations(fiche, contexte, idsSources, erreurs) {
    if (fiche.relationsOeuvres === undefined) {
        return;
    }

    if (!Array.isArray(fiche.relationsOeuvres)) {
        erreurs.push(`${contexte} · relations d’œuvres : tableau attendu`);
        return;
    }

    fiche.relationsOeuvres.forEach((relation, index) => {
        const contexteRelation = `${contexte} · relation d’œuvre ${index + 1}`;
        if (!naturesRelations.has(relation.nature)) {
            erreurs.push(
                `${contexteRelation} : nature inconnue « ${relation.nature} »`,
            );
        }
        if (!chaineNonVide(relation.oeuvre?.nom)) {
            erreurs.push(`${contexteRelation} : œuvre absente`);
        } else if (relation.oeuvre.type === "oeuvre") {
            if (!chaineNonVide(relation.oeuvre.slug)) {
                erreurs.push(`${contexteRelation} : slug interne absent`);
            }
        } else if (relation.oeuvre.type === "oeuvre-exterieure") {
            if (
                relation.oeuvre.auteurs !== undefined &&
                (!Array.isArray(relation.oeuvre.auteurs) ||
                    relation.oeuvre.auteurs.length === 0 ||
                    relation.oeuvre.auteurs.some(
                        (auteur) => !chaineNonVide(auteur),
                    ))
            ) {
                erreurs.push(`${contexteRelation} : auteurs invalides`);
            }
            if (
                relation.oeuvre.date !== undefined &&
                !dateEstValide(relation.oeuvre.date)
            ) {
                erreurs.push(`${contexteRelation} : date extérieure invalide`);
            }
        } else {
            erreurs.push(
                `${contexteRelation} : type d’œuvre inconnu « ${relation.oeuvre?.type} »`,
            );
        }
        verifierSources(
            relation.sources,
            contexteRelation,
            idsSources,
            erreurs,
        );
    });
}

function verifierCreditsEtChapitres(fiche, contexte, idsSources, erreurs) {
    if (Array.isArray(fiche.contributions)) {
        fiche.contributions.forEach((contribution, index) => {
            if (
                contribution.domaine !== undefined &&
                !domainesCredits.has(contribution.domaine)
            ) {
                erreurs.push(
                    `${contexte} · contribution ${index + 1} : domaine inconnu « ${contribution.domaine} »`,
                );
            }
        });
    }

    if (Array.isArray(fiche.blocsEditoriaux)) {
        fiche.blocsEditoriaux.forEach((bloc, index) => {
            if (bloc.sources !== undefined) {
                verifierSources(
                    bloc.sources,
                    `${contexte} · bloc éditorial ${index + 1}`,
                    idsSources,
                    erreurs,
                );
            }
        });
    }
}

function verifierFiche(fiche, contexte, idsSources, erreurs) {
    if (fiche.type !== "oeuvre" || !chaineNonVide(fiche.slug)) {
        erreurs.push(`${contexte} : identité d’œuvre invalide`);
    }
    if (!chaineNonVide(fiche.format)) {
        erreurs.push(`${contexte} : format absent`);
    }

    verifierTitres(fiche, contexte, idsSources, erreurs);
    verifierSorties(fiche, contexte, idsSources, erreurs);
    verifierDurees(fiche, contexte, idsSources, erreurs);
    verifierProduction(fiche, contexte, idsSources, erreurs);
    verifierDonneesEconomiques(fiche, contexte, idsSources, erreurs);
    verifierRelations(fiche, contexte, idsSources, erreurs);
    verifierCreditsEtChapitres(fiche, contexte, idsSources, erreurs);
}

async function verifier() {
    const erreurs = [];
    const sources = await lireJson("src/data/sources/sources.json");
    const idsSources = new Set(sources.map((source) => source.id));
    const fichiers = (await readdir(path.join(racine, "src/data/oeuvres")))
        .filter((fichier) => fichier.endsWith(".json"))
        .sort();

    for (const fichier of fichiers) {
        const chemin = `src/data/oeuvres/${fichier}`;
        verifierFiche(await lireJson(chemin), chemin, idsSources, erreurs);
    }

    const fixture = await lireJson("scripts/fixtures/oeuvre-long-metrage.json");
    const champsFixture = [
        "titresAlternatifs",
        "durees",
        "production",
        "donneesEconomiques",
        "relationsOeuvres",
    ];
    for (const champ of champsFixture) {
        if (fixture[champ] === undefined) {
            erreurs.push(`Fixture du long métrage : champ « ${champ} » absent`);
        }
    }
    if (fixture.sortie?.evenements === undefined) {
        erreurs.push("Fixture du long métrage : événements de sortie absents");
    }

    verifierFiche(
        fixture,
        "Fixture du long métrage",
        new Set(["fixture-source-a", "fixture-source-b"]),
        erreurs,
    );

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des Œuvres :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Œuvres vérifiées : ${fichiers.length} fiches et 1 fixture de long métrage.`,
    );
}

await verifier();
