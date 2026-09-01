import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const familles = new Set(["personnages", "createurs", "oeuvres", "epoques"]);
const natures = new Set([
    "original",
    "localise",
    "alias",
    "ancien",
    "international",
    "sortie-territoriale",
]);

async function lireJson(chemin) {
    return JSON.parse(await readFile(path.join(racine, chemin), "utf8"));
}

async function chargerModuleTypeScript(cheminRelatif) {
    const chemin = path.join(racine, cheminRelatif);
    const source = await readFile(chemin, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
        },
        fileName: chemin,
    });
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;

    return import(moduleUrl);
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

let normaliserIdentite = (valeur) => {
    return valeur
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replaceAll("œ", "oe")
        .replaceAll("æ", "ae")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
};

function verifierDefinition(definition, contexte, erreurs) {
    if (!chaineNonVide(definition?.label)) {
        erreurs.push(`${contexte} : libellé accessible absent`);
    }
}

function verifierSources(liste, contexte, idsSources, erreurs) {
    if (!Array.isArray(liste) || liste.length === 0) {
        erreurs.push(`${contexte} : au moins une source est obligatoire`);
        return;
    }

    const uniques = new Set();
    for (const source of liste) {
        if (!idsSources.has(source)) {
            erreurs.push(`${contexte} : source inconnue « ${source} »`);
        }
        if (uniques.has(source)) {
            erreurs.push(`${contexte} : source dupliquée « ${source} »`);
        }
        uniques.add(source);
    }
}

function verifierIdentiteDocumentee(
    identite,
    contexte,
    champ,
    langues,
    territoires,
    idsSources,
    erreurs,
) {
    if (!chaineNonVide(identite?.[champ])) {
        erreurs.push(`${contexte} : ${champ} absent`);
    }
    if (!natures.has(identite?.nature)) {
        erreurs.push(`${contexte} : nature inconnue « ${identite?.nature} »`);
    }
    if (identite?.langue !== undefined && !langues.has(identite.langue)) {
        erreurs.push(`${contexte} : langue inconnue « ${identite.langue} »`);
    }
    if (
        identite?.territoire !== undefined &&
        !territoires.has(identite.territoire)
    ) {
        erreurs.push(
            `${contexte} : territoire inconnu « ${identite.territoire} »`,
        );
    }
    verifierSources(identite?.sources, contexte, idsSources, erreurs);
}

async function verifierFiches(
    dossier,
    catalogue,
    champListe,
    champIdentite,
    langues,
    territoires,
    idsSources,
    erreurs,
) {
    const entrees = await lireJson(catalogue);
    const entreesParSlug = new Map(
        entrees.map((entree) => [entree.slug, entree]),
    );
    const fichiers = (await readdir(path.join(racine, dossier)))
        .filter((fichier) => fichier.endsWith(".json"))
        .sort();
    let identitesVerifiees = 0;

    for (const fichier of fichiers) {
        const chemin = `${dossier}/${fichier}`;
        const fiche = await lireJson(chemin);
        const identites = fiche[champListe];

        if (identites === undefined) {
            continue;
        }
        if (!Array.isArray(identites) || identites.length === 0) {
            erreurs.push(
                `${chemin} : ${champListe} doit être un tableau non vide`,
            );
            continue;
        }

        const principale = entreesParSlug.get(fiche.slug)?.nom;
        const cles = new Set(
            chaineNonVide(principale) ? [normaliserIdentite(principale)] : [],
        );

        identites.forEach((identite, index) => {
            const contexte = `${chemin} · ${champListe} ${index + 1}`;
            verifierIdentiteDocumentee(
                identite,
                contexte,
                champIdentite,
                langues,
                territoires,
                idsSources,
                erreurs,
            );

            const valeur = identite?.[champIdentite];
            if (chaineNonVide(valeur)) {
                const cle = normaliserIdentite(valeur);
                if (cles.has(cle)) {
                    erreurs.push(
                        `${chemin} : identité normalisée dupliquée « ${valeur} »`,
                    );
                }
                cles.add(cle);
            }
            identitesVerifiees += 1;
        });
    }

    return identitesVerifiees;
}

function verifierProjection(
    projection,
    contexte,
    langues,
    territoires,
    idsSources,
    identifiants,
    erreurs,
) {
    if (
        !chaineNonVide(projection?.identifiant) ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projection.identifiant)
    ) {
        erreurs.push(`${contexte} : identifiant permanent invalide`);
    } else if (identifiants.has(projection.identifiant)) {
        erreurs.push(
            `${contexte} : identifiant permanent dupliqué « ${projection.identifiant} »`,
        );
    } else {
        identifiants.add(projection.identifiant);
    }

    if (!familles.has(projection?.famille)) {
        erreurs.push(
            `${contexte} : famille inconnue « ${projection?.famille} »`,
        );
    }
    if (
        !chaineNonVide(projection?.slugCanonique) ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projection.slugCanonique)
    ) {
        erreurs.push(`${contexte} : slug canonique invalide`);
    }
    if (!chaineNonVide(projection?.principale?.libelle)) {
        erreurs.push(`${contexte} : identité principale absente`);
    }
    if (!langues.has(projection?.principale?.langue)) {
        erreurs.push(
            `${contexte} : langue principale inconnue « ${projection?.principale?.langue} »`,
        );
    }

    if (!Array.isArray(projection?.documentees)) {
        erreurs.push(`${contexte} : identités documentées absentes`);
    } else {
        const cles = new Set([
            normaliserIdentite(projection.principale?.libelle ?? ""),
        ]);
        projection.documentees.forEach((identite, index) => {
            const contexteIdentite = `${contexte} · identité documentée ${index + 1}`;
            verifierIdentiteDocumentee(
                identite,
                contexteIdentite,
                "libelle",
                langues,
                territoires,
                idsSources,
                erreurs,
            );
            const cle = normaliserIdentite(identite?.libelle ?? "");
            if (cles.has(cle)) {
                erreurs.push(
                    `${contexte} : identité normalisée dupliquée « ${identite?.libelle} »`,
                );
            }
            cles.add(cle);
        });

        const originales = projection.documentees.filter(
            (identite) => identite.nature === "original",
        );
        if (originales.length > 1) {
            erreurs.push(`${contexte} : plusieurs identités originales`);
        }
        if (
            JSON.stringify(projection.originale ?? null) !==
            JSON.stringify(originales[0] ?? null)
        ) {
            erreurs.push(
                `${contexte} : projection de l’identité originale incohérente`,
            );
        }
    }

    if (!Array.isArray(projection?.aliasesNavigation)) {
        erreurs.push(`${contexte} : aliases de navigation absents`);
    } else {
        const chemins = new Set();
        projection.aliasesNavigation.forEach((alias, index) => {
            const contexteAlias = `${contexte} · alias de navigation ${index + 1}`;
            if (
                !chaineNonVide(alias?.chemin) ||
                !alias.chemin.startsWith("/fixture/")
            ) {
                erreurs.push(
                    `${contexteAlias} : seule une ancienne route de fixture est autorisée au Train 3A`,
                );
            }
            if (alias?.nature !== "route-historique") {
                erreurs.push(`${contexteAlias} : nature d’alias invalide`);
            }
            if (chemins.has(alias?.chemin)) {
                erreurs.push(`${contexteAlias} : chemin dupliqué`);
            }
            chemins.add(alias?.chemin);
        });
    }
}

function restaurerIdentiteDocumentee(identite, champ) {
    const { libelle, ...proprietes } = identite;

    return {
        [champ]: libelle,
        ...proprietes,
    };
}

function verifierProjectionsTemoins(fixture, projeterIdentiteCodex, erreurs) {
    for (const [index, attendue] of fixture.projections.entries()) {
        const estOeuvre = attendue.famille === "oeuvres";
        const champ = estOeuvre ? "titre" : "nom";
        const champListe = estOeuvre ? "titresAlternatifs" : "nomsAlternatifs";
        const obtenue = projeterIdentiteCodex({
            famille: attendue.famille,
            entree: {
                slug: attendue.slugCanonique,
                nom: attendue.principale.libelle,
            },
            fiche: {
                slug: attendue.slugCanonique,
                [champListe]: attendue.documentees.map((identite) =>
                    restaurerIdentiteDocumentee(identite, champ),
                ),
            },
            identifiant: attendue.identifiant,
            languePrincipale: attendue.principale.langue,
            aliasesNavigation: attendue.aliasesNavigation,
        });

        if (JSON.stringify(obtenue) !== JSON.stringify(attendue)) {
            erreurs.push(
                `Fixture · projection ${index + 1} : le résolveur ne reproduit pas la bobine attendue`,
            );
        }
    }
}

async function verifierJointuresArchives(projeterIdentiteCodex, erreurs) {
    const configurations = [
        {
            famille: "personnages",
            catalogue: "src/data/catalogues/personnages.json",
            dossier: "src/data/personnages",
        },
        {
            famille: "createurs",
            catalogue: "src/data/catalogues/contributeurs.json",
            dossier: "src/data/contributeurs",
        },
        {
            famille: "oeuvres",
            catalogue: "src/data/catalogues/oeuvres.json",
            dossier: "src/data/oeuvres",
        },
        {
            famille: "epoques",
            catalogue: "src/data/catalogues/epoques.json",
            dossier: "src/data/epoques",
        },
    ];
    const projections = new Map();

    for (const configuration of configurations) {
        const catalogue = await lireJson(configuration.catalogue);
        const fichiers = (
            await readdir(path.join(racine, configuration.dossier))
        )
            .filter((fichier) => fichier.endsWith(".json"))
            .sort();
        const fiches = await Promise.all(
            fichiers.map((fichier) =>
                lireJson(`${configuration.dossier}/${fichier}`),
            ),
        );
        const fichesParSlug = new Map(
            fiches.map((fiche) => [fiche.slug, fiche]),
        );

        for (const entree of catalogue) {
            const fiche = fichesParSlug.get(entree.slug);
            let projection = null;

            try {
                projection = projeterIdentiteCodex({
                    famille: configuration.famille,
                    entree,
                    fiche,
                });
            } catch (erreur) {
                erreurs.push(
                    `${configuration.famille}/${entree.slug} : ${erreur.message}`,
                );
                continue;
            }

            if (!projection) {
                erreurs.push(
                    `${configuration.famille}/${entree.slug} : jointure catalogue–fiche absente`,
                );
                continue;
            }
            if (
                projection.identifiant !== null ||
                projection.principale.langue !== null
            ) {
                erreurs.push(
                    `${configuration.famille}/${entree.slug} : le résolveur invente une identité permanente ou une langue principale`,
                );
            }

            projections.set(
                `${configuration.famille}/${entree.slug}`,
                projection,
            );
        }
    }

    const attentes = [
        ["personnages/atchoum", "Sneezy", "original"],
        ["personnages/blanche-neige", "Snow White", "original"],
        ["personnages/la-reine", "The Evil Queen", "alias"],
        ["personnages/le-chasseur", "Humbert", "alias"],
        [
            "oeuvres/snow-white-and-the-seven-dwarfs",
            "Blanche-Neige et les Sept Nains",
            "sortie-territoriale",
        ],
    ];

    for (const [cle, libelle, nature] of attentes) {
        const identite = projections
            .get(cle)
            ?.documentees.find((candidate) => candidate.libelle === libelle);
        if (identite?.nature !== nature) {
            erreurs.push(
                `${cle} : identité représentative « ${libelle} » non résolue`,
            );
        }
    }

    const humbert = projections
        .get("personnages/le-chasseur")
        ?.documentees.find((identite) => identite.libelle === "Humbert");
    if (humbert && "langue" in humbert) {
        erreurs.push(
            "personnages/le-chasseur : le résolveur invente une langue pour Humbert",
        );
    }

    return projections;
}

async function verifierFrontiereServeur(erreurs) {
    const chemins = [
        "src/lib/identites/server/resoudre-identites.ts",
        "src/lib/recherche.ts",
    ];

    for (const chemin of chemins) {
        const source = await readFile(path.join(racine, chemin), "utf8");

        if (!source.startsWith('import "server-only";')) {
            erreurs.push(`${chemin} : frontière server-only absente`);
        }
    }

    const recherche = await readFile(
        path.join(racine, "src/lib/recherche.ts"),
        "utf8",
    );

    if (!recherche.includes("listerIdentitesCodex")) {
        erreurs.push(
            "src/lib/recherche.ts : la recherche ne consomme pas la projection identitaire commune",
        );
    }
    if (
        recherche.includes("@/data/sources") ||
        recherche.includes("@/data/relations") ||
        recherche.includes(".introduction")
    ) {
        erreurs.push(
            "src/lib/recherche.ts : une matière éditoriale ou bibliographique entre dans l’index identitaire",
        );
    }
}

function verifierRechercheIdentitaire(projections, moduleRecherche, erreurs) {
    const indexParFamille = new Map();

    for (const [cle, projection] of projections) {
        const [famille] = cle.split("/");
        const index = indexParFamille.get(famille) ?? [];

        index.push({
            entree: {
                famille,
                slug: projection.slugCanonique,
                nom: projection.principale.libelle,
            },
            texte: moduleRecherche.creerTexteRecherche(
                [
                    projection.principale.libelle,
                    ...projection.documentees.map(
                        (identite) => identite.libelle,
                    ),
                ],
                normaliserIdentite,
            ),
        });
        indexParFamille.set(famille, index);
    }

    const scenarios = [
        ["Sneezy", "personnages", "atchoum"],
        ["Snow White", "personnages", "blanche-neige"],
        ["The Evil Queen", "personnages", "la-reine"],
        ["Humbert", "personnages", "le-chasseur"],
        [
            "Blanche-Neige et les Sept Nains",
            "oeuvres",
            "snow-white-and-the-seven-dwarfs",
        ],
        ["the-evil, queen!", "personnages", "la-reine"],
        [
            "blanche neige et les sept nains",
            "oeuvres",
            "snow-white-and-the-seven-dwarfs",
        ],
    ];

    for (const [requete, famille, slugAttendu] of scenarios) {
        const resultats = moduleRecherche.rechercherDansIndex(
            indexParFamille.get(famille) ?? [],
            requete,
            normaliserIdentite,
        );

        if (!resultats.some((entree) => entree.slug === slugAttendu)) {
            erreurs.push(
                `Recherche « ${requete} » : l’Archive canonique ${famille}/${slugAttendu} est introuvable`,
            );
        }
    }

    const indexPersonnages = indexParFamille.get("personnages") ?? [];
    const atchoum = indexPersonnages.find(
        ({ entree }) => entree.slug === "atchoum",
    );
    const indexAvecDoublon = atchoum
        ? [...indexPersonnages, atchoum]
        : indexPersonnages;
    const resultatsSneezy = moduleRecherche.rechercherDansIndex(
        indexAvecDoublon,
        "Sneezy",
        normaliserIdentite,
    );

    if (
        resultatsSneezy.filter((entree) => entree.slug === "atchoum").length !==
        1
    ) {
        erreurs.push(
            "Recherche « Sneezy » : une identité alternative crée un doublon de résultat",
        );
    }

    const indexOeuvres = indexParFamille.get("oeuvres") ?? [];
    const resultatsEditorial = moduleRecherche.rechercherDansIndex(
        indexOeuvres,
        "pari industriel",
        normaliserIdentite,
    );
    const resultatsSource = moduleRecherche.rechercherDansIndex(
        indexOeuvres,
        "d23 seven dwarfs personality",
        normaliserIdentite,
    );

    if (resultatsEditorial.length > 0 || resultatsSource.length > 0) {
        erreurs.push(
            "Recherche identitaire : un paragraphe éditorial ou une référence de source est indexé",
        );
    }

    return scenarios.length;
}

async function verifier() {
    const erreurs = [];
    const [
        moduleLangues,
        moduleTerritoires,
        moduleProjection,
        moduleRecherche,
        sources,
        fixture,
    ] = await Promise.all([
        chargerModuleTypeScript("src/registry/identites/langues.ts"),
        chargerModuleTypeScript("src/registry/identites/territoires.ts"),
        chargerModuleTypeScript("src/lib/identites/projeter-identite.ts"),
        chargerModuleTypeScript("src/lib/recherche/filtrer-index.ts"),
        lireJson("src/data/sources/sources.json"),
        lireJson("scripts/fixtures/identites-codex.json"),
    ]);
    normaliserIdentite = moduleProjection.normaliserIdentiteCodex;
    const registreLangues = moduleLangues.languesCodex;
    const registreTerritoires = moduleTerritoires.territoiresCodex;
    const langues = new Set(Object.keys(registreLangues));
    const territoires = new Set(Object.keys(registreTerritoires));
    const idsSources = new Set(sources.map((source) => source.id));

    for (const [code, definition] of Object.entries(registreLangues)) {
        verifierDefinition(definition, `Langue ${code}`, erreurs);
        if (!chaineNonVide(definition?.labelNatif)) {
            erreurs.push(`Langue ${code} : libellé natif absent`);
        }
    }
    for (const [code, definition] of Object.entries(registreTerritoires)) {
        verifierDefinition(definition, `Territoire ${code}`, erreurs);
    }

    const identitesPersonnages = await verifierFiches(
        "src/data/personnages",
        "src/data/catalogues/personnages.json",
        "nomsAlternatifs",
        "nom",
        langues,
        territoires,
        idsSources,
        erreurs,
    );
    const identitesOeuvres = await verifierFiches(
        "src/data/oeuvres",
        "src/data/catalogues/oeuvres.json",
        "titresAlternatifs",
        "titre",
        langues,
        territoires,
        idsSources,
        erreurs,
    );

    if (!Array.isArray(fixture.projections) || fixture.projections.length < 3) {
        erreurs.push(
            "Fixture des identités : au moins trois projections attendues",
        );
    } else {
        const identifiants = new Set();
        fixture.projections.forEach((projection, index) =>
            verifierProjection(
                projection,
                `Fixture · projection ${index + 1}`,
                langues,
                territoires,
                idsSources,
                identifiants,
                erreurs,
            ),
        );
        verifierProjectionsTemoins(
            fixture,
            moduleProjection.projeterIdentiteCodex,
            erreurs,
        );
    }

    const projections = await verifierJointuresArchives(
        moduleProjection.projeterIdentiteCodex,
        erreurs,
    );
    const scenariosRecherche = verifierRechercheIdentitaire(
        projections,
        moduleRecherche,
        erreurs,
    );
    await verifierFrontiereServeur(erreurs);

    if (
        moduleProjection.projeterIdentiteCodex({
            famille: "personnages",
            entree: { slug: "absente", nom: "Absente" },
            fiche: null,
        }) !== null
    ) {
        erreurs.push("Résolveur : une fiche absente doit produire null");
    }

    const valeursCollision = fixture.collisionNormalisee?.valeurs;
    if (
        !Array.isArray(valeursCollision) ||
        valeursCollision.length !== 2 ||
        normaliserIdentite(valeursCollision[0]) !==
            fixture.collisionNormalisee?.cleAttendue ||
        normaliserIdentite(valeursCollision[1]) !==
            fixture.collisionNormalisee?.cleAttendue
    ) {
        erreurs.push(
            "Fixture des identités : collision normalisée attendue non reproduite",
        );
    }

    let collisionSignalee = false;
    try {
        moduleProjection.projeterIdentiteCodex({
            famille: "personnages",
            entree: {
                slug: "collision",
                nom: valeursCollision?.[0] ?? "La Reine",
            },
            fiche: {
                slug: "collision",
                nomsAlternatifs: [
                    {
                        nom: valeursCollision?.[1] ?? "La-Reine",
                        nature: "alias",
                        sources: ["afi-snow-white"],
                    },
                ],
            },
        });
    } catch {
        collisionSignalee = true;
    }
    if (!collisionSignalee) {
        erreurs.push(
            "Résolveur : la collision normalisée témoin doit être signalée",
        );
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des identités :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Identités vérifiées : ${langues.size} langues, ${territoires.size} territoires, ${identitesPersonnages + identitesOeuvres} formes documentées, ${projections.size} jointures catalogue–fiche, ${fixture.projections.length} projections témoins et ${scenariosRecherche} requêtes identitaires.`,
    );
}

await verifier();
