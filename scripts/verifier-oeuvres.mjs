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
const naturesEvenements = new Set([
    "premiere-mondiale",
    "avant-premiere",
    "sortie-nationale",
    "ressortie",
    "presentation-festival",
    "mise-a-disposition",
]);
const naturesVersions = new Set([
    "originale",
    "doublage",
    "restauration",
    "edition",
    "montage-alternatif",
]);
const naturesExploitations = new Set([
    "premiere-exploitation",
    "exploitation-nationale",
    "ressortie",
    "festival",
    "restauration",
    "edition-video",
    "diffusion-televisuelle",
    "diffusion-numerique",
]);
const naturesReceptions = new Set([
    "critique-contemporaine",
    "professionnelle",
    "publique",
    "institutionnelle",
    "reevaluation",
]);
const naturesTemoinsReception = new Set([
    "personne",
    "publication",
    "institution",
    "industrie",
    "public",
]);
const qualificationsReception = new Set([
    "favorable",
    "partagee",
    "defavorable",
    "descriptive",
]);
const naturesPorteesTerritoriales = new Set([
    "territoire",
    "monde",
    "zone",
    "non-precisee",
]);
const codesLangues = new Set(["fr", "en", "it"]);
const codesTerritoires = new Set(["FR", "US", "IT"]);
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
    "inspiration",
    "influence",
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

function verifierPorteeTerritoriale(portee, contexte, erreurs) {
    if (!portee || !naturesPorteesTerritoriales.has(portee.nature)) {
        erreurs.push(`${contexte} : portée territoriale invalide`);
        return;
    }

    if (portee.nature === "territoire" && !codesTerritoires.has(portee.code)) {
        erreurs.push(
            `${contexte} : code territoire inconnu « ${portee.code} »`,
        );
    }
    if (portee.nature === "zone" && !chaineNonVide(portee.libelle)) {
        erreurs.push(`${contexte} : libellé de zone absent`);
    }
    if (
        portee.nature === "non-precisee" &&
        portee.libelleSource !== undefined &&
        !chaineNonVide(portee.libelleSource)
    ) {
        erreurs.push(`${contexte} : libellé source invalide`);
    }
}

function verifierIdentifiantsUniques(liste, contexte, erreurs) {
    const identifiants = new Set();

    liste.forEach((item, index) => {
        if (!chaineNonVide(item.id)) {
            erreurs.push(`${contexte} ${index + 1} : identifiant absent`);
            return;
        }
        if (identifiants.has(item.id)) {
            erreurs.push(`${contexte} : identifiant dupliqué « ${item.id} »`);
        }
        identifiants.add(item.id);
    });

    return identifiants;
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

    const evenementsStructures = evenements.filter(
        (evenement) => evenement.porteeTerritoriale !== undefined,
    );
    verifierIdentifiantsUniques(
        evenementsStructures,
        `${contexte} · événement de sortie`,
        erreurs,
    );

    evenements.forEach((evenement, index) => {
        const contexteEvenement = `${contexte} · événement de sortie ${index + 1}`;
        if (!dateEstValide(evenement.date)) {
            erreurs.push(`${contexteEvenement} : date invalide`);
        }
        if (evenement.porteeTerritoriale !== undefined) {
            verifierPorteeTerritoriale(
                evenement.porteeTerritoriale,
                contexteEvenement,
                erreurs,
            );
        } else if (!chaineNonVide(evenement.territoire)) {
            erreurs.push(`${contexteEvenement} : territoire historique absent`);
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
        if (
            evenement.noteDeReserve !== undefined &&
            !chaineNonVide(evenement.noteDeReserve)
        ) {
            erreurs.push(`${contexteEvenement} : note de réserve invalide`);
        }
    });
}

function verifierVersions(fiche, contexte, idsSources, erreurs) {
    if (fiche.versions === undefined) {
        return new Set();
    }
    if (!Array.isArray(fiche.versions) || fiche.versions.length === 0) {
        erreurs.push(`${contexte} · versions : au moins une version attendue`);
        return new Set();
    }

    const ids = verifierIdentifiantsUniques(
        fiche.versions,
        `${contexte} · version`,
        erreurs,
    );
    fiche.versions.forEach((version, index) => {
        const contexteVersion = `${contexte} · version ${index + 1}`;
        if (!naturesVersions.has(version.nature)) {
            erreurs.push(
                `${contexteVersion} : nature inconnue « ${version.nature} »`,
            );
        }
        if (
            !chaineNonVide(version.identite?.libelle) ||
            !chaineNonVide(version.identite?.nature)
        ) {
            erreurs.push(`${contexteVersion} : identité invalide`);
        }
        if (
            version.identite?.langue !== undefined &&
            !codesLangues.has(version.identite.langue)
        ) {
            erreurs.push(
                `${contexteVersion} : langue inconnue « ${version.identite.langue} »`,
            );
        }
        if (
            version.identite?.territoire !== undefined &&
            !codesTerritoires.has(version.identite.territoire)
        ) {
            erreurs.push(
                `${contexteVersion} : territoire inconnu « ${version.identite.territoire} »`,
            );
        }
        verifierSources(
            version.identite?.sources,
            `${contexteVersion} · identité`,
            idsSources,
            erreurs,
        );
        if (version.date !== undefined && !dateEstValide(version.date)) {
            erreurs.push(`${contexteVersion} : date invalide`);
        }
        if (
            version.distributeur !== undefined &&
            !chaineNonVide(version.distributeur)
        ) {
            erreurs.push(`${contexteVersion} : distributeur invalide`);
        }
        verifierSources(version.sources, contexteVersion, idsSources, erreurs);
    });

    return ids;
}

function verifierExploitations(fiche, contexte, idsSources, erreurs) {
    if (fiche.exploitations === undefined) {
        return new Set();
    }
    if (
        !Array.isArray(fiche.exploitations) ||
        fiche.exploitations.length === 0
    ) {
        erreurs.push(
            `${contexte} · exploitations : au moins une exploitation attendue`,
        );
        return new Set();
    }

    const ids = verifierIdentifiantsUniques(
        fiche.exploitations,
        `${contexte} · exploitation`,
        erreurs,
    );
    fiche.exploitations.forEach((exploitation, index) => {
        const contexteExploitation = `${contexte} · exploitation ${index + 1}`;
        if (!naturesExploitations.has(exploitation.nature)) {
            erreurs.push(
                `${contexteExploitation} : nature inconnue « ${exploitation.nature} »`,
            );
        }
        verifierPeriode(exploitation.periode, contexteExploitation, erreurs);
        verifierPorteeTerritoriale(
            exploitation.porteeTerritoriale,
            contexteExploitation,
            erreurs,
        );
        if (
            exploitation.versionIds !== undefined &&
            (!Array.isArray(exploitation.versionIds) ||
                exploitation.versionIds.length === 0 ||
                exploitation.versionIds.some((id) => !chaineNonVide(id)))
        ) {
            erreurs.push(`${contexteExploitation} : versions liées invalides`);
        }
        for (const champ of ["distributeur", "support"]) {
            if (
                exploitation[champ] !== undefined &&
                !chaineNonVide(exploitation[champ])
            ) {
                erreurs.push(`${contexteExploitation} : ${champ} invalide`);
            }
        }
        verifierSources(
            exploitation.sources,
            contexteExploitation,
            idsSources,
            erreurs,
        );
    });

    return ids;
}

function verifierReceptions(fiche, contexte, idsSources, erreurs) {
    if (fiche.receptions === undefined) {
        return new Set();
    }
    if (!Array.isArray(fiche.receptions) || fiche.receptions.length === 0) {
        erreurs.push(
            `${contexte} · réceptions : au moins une réception attendue`,
        );
        return new Set();
    }

    const ids = verifierIdentifiantsUniques(
        fiche.receptions,
        `${contexte} · réception`,
        erreurs,
    );
    fiche.receptions.forEach((reception, index) => {
        const contexteReception = `${contexte} · réception ${index + 1}`;
        if (!naturesReceptions.has(reception.nature)) {
            erreurs.push(
                `${contexteReception} : nature inconnue « ${reception.nature} »`,
            );
        }
        if (
            !chaineNonVide(reception.temoin?.nom) ||
            !naturesTemoinsReception.has(reception.temoin?.nature)
        ) {
            erreurs.push(`${contexteReception} : témoin invalide`);
        }
        if (
            (reception.date === undefined) ===
            (reception.periode === undefined)
        ) {
            erreurs.push(
                `${contexteReception} : une date ou une période exclusive est obligatoire`,
            );
        } else if (reception.date && !dateEstValide(reception.date)) {
            erreurs.push(`${contexteReception} : date invalide`);
        } else if (reception.periode) {
            verifierPeriode(reception.periode, contexteReception, erreurs);
        }
        verifierPorteeTerritoriale(
            reception.porteeTerritoriale,
            contexteReception,
            erreurs,
        );
        if (!chaineNonVide(reception.resume)) {
            erreurs.push(`${contexteReception} : résumé absent`);
        }
        if (
            reception.qualification !== undefined &&
            !qualificationsReception.has(reception.qualification)
        ) {
            erreurs.push(
                `${contexteReception} : qualification inconnue « ${reception.qualification} »`,
            );
        }
        if (
            reception.support !== undefined &&
            !chaineNonVide(reception.support)
        ) {
            erreurs.push(`${contexteReception} : support invalide`);
        }
        verifierSources(
            reception.sources,
            contexteReception,
            idsSources,
            erreurs,
        );
    });

    return ids;
}

function verifierRaccordsCirculation(
    fiche,
    contexte,
    idsVersions,
    idsExploitations,
    erreurs,
) {
    const evenements = fiche.sortie?.evenements ?? [];
    const idsEvenements = new Set(
        evenements.map((evenement) => evenement.id).filter(chaineNonVide),
    );

    evenements.forEach((evenement, index) => {
        const contexteEvenement = `${contexte} · événement de sortie ${index + 1}`;
        if (
            evenement.versionId !== undefined &&
            !idsVersions.has(evenement.versionId)
        ) {
            erreurs.push(
                `${contexteEvenement} : version inconnue « ${evenement.versionId} »`,
            );
        }
        if (
            evenement.exploitationId !== undefined &&
            !idsExploitations.has(evenement.exploitationId)
        ) {
            erreurs.push(
                `${contexteEvenement} : exploitation inconnue « ${evenement.exploitationId} »`,
            );
        }
    });

    fiche.exploitations?.forEach((exploitation, index) => {
        exploitation.versionIds?.forEach((versionId) => {
            if (!idsVersions.has(versionId)) {
                erreurs.push(
                    `${contexte} · exploitation ${index + 1} : version inconnue « ${versionId} »`,
                );
            }
        });
    });

    fiche.receptions?.forEach((reception, index) => {
        const contexteReception = `${contexte} · réception ${index + 1}`;
        for (const [champ, ids] of [
            ["evenementId", idsEvenements],
            ["exploitationId", idsExploitations],
            ["versionId", idsVersions],
        ]) {
            if (reception[champ] !== undefined && !ids.has(reception[champ])) {
                erreurs.push(
                    `${contexteReception} : ${champ} inconnu « ${reception[champ]} »`,
                );
            }
        }
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
        } else if (relation.oeuvre.type === "oeuvre-source") {
            if (
                !chaineNonVide(relation.oeuvre.id) ||
                !chaineNonVide(relation.oeuvre.slug)
            ) {
                erreurs.push(
                    `${contexteRelation} : identité de l’œuvre source absente`,
                );
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
    const idsVersions = verifierVersions(fiche, contexte, idsSources, erreurs);
    const idsExploitations = verifierExploitations(
        fiche,
        contexte,
        idsSources,
        erreurs,
    );
    verifierReceptions(fiche, contexte, idsSources, erreurs);
    verifierRaccordsCirculation(
        fiche,
        contexte,
        idsVersions,
        idsExploitations,
        erreurs,
    );
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

    const snowWhite = await lireJson(
        "src/data/oeuvres/snow-white-and-the-seven-dwarfs.json",
    );
    if (
        snowWhite.sortie.evenements.length !== 3 ||
        snowWhite.sortie.evenements.some(
            (evenement) =>
                !chaineNonVide(evenement.id) ||
                evenement.porteeTerritoriale === undefined ||
                evenement.territoire !== undefined,
        )
    ) {
        erreurs.push(
            "Échantillon R3 : les trois sorties structurées de Blanche-Neige sont incomplètes",
        );
    }
    if (snowWhite.versions?.length !== 1) {
        erreurs.push(
            "Échantillon R3 : seule la version originale documentée est attendue",
        );
    }
    if (snowWhite.exploitations?.length !== 2) {
        erreurs.push(
            "Échantillon R3 : les exploitations américaine et française sont attendues",
        );
    }
    if (snowWhite.receptions?.length !== 1) {
        erreurs.push(
            "Échantillon R3 : la réception publique initiale est absente",
        );
    }
    const relationSource = snowWhite.relationsOeuvres?.find(
        (relation) => relation.nature === "source",
    );
    if (
        relationSource?.oeuvre.type !== "oeuvre-source" ||
        relationSource.oeuvre.id !== "oeuvre-source-grimm-schneewittchen"
    ) {
        erreurs.push(
            "Échantillon R3 : Schneewittchen ne rejoint pas le registre interne",
        );
    }
    if (
        snowWhite.donneesEconomiques.some(
            (donnee) => donnee.schemaVersion !== undefined,
        )
    ) {
        erreurs.push(
            "Échantillon R3 : une donnée économique incomplète a franchi le contrat structuré",
        );
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

    const fixtureCirculation = await lireJson(
        "scripts/fixtures/oeuvre-circulation.json",
    );
    for (const champ of ["versions", "exploitations", "receptions"]) {
        if (fixtureCirculation[champ] === undefined) {
            erreurs.push(`Fixture de circulation : champ « ${champ} » absent`);
        }
    }
    if (
        !fixtureCirculation.sortie?.evenements?.every(
            (evenement) =>
                chaineNonVide(evenement.id) &&
                evenement.porteeTerritoriale !== undefined,
        )
    ) {
        erreurs.push("Fixture de circulation : événements structurés attendus");
    }
    verifierFiche(
        fixtureCirculation,
        "Fixture de circulation",
        new Set(["fixture-source-a", "fixture-source-b", "fixture-source-c"]),
        erreurs,
    );

    const fixtureOeuvresSources = await lireJson(
        "scripts/fixtures/oeuvres-sources.json",
    );
    verifierFiche(
        fixtureOeuvresSources.oeuvre,
        "Fixture des Œuvres sources",
        new Set(fixtureOeuvresSources.sources.map((source) => source.id)),
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
        `Œuvres vérifiées : ${fichiers.length} fiches et 3 fixtures privées.`,
    );
}

await verifier();
