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

function normaliserIdentite(valeur) {
    return valeur
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replaceAll("œ", "oe")
        .replaceAll("æ", "ae")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

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

async function verifier() {
    const erreurs = [];
    const [moduleLangues, moduleTerritoires, sources, fixture] =
        await Promise.all([
            chargerModuleTypeScript("src/registry/identites/langues.ts"),
            chargerModuleTypeScript("src/registry/identites/territoires.ts"),
            lireJson("src/data/sources/sources.json"),
            lireJson("scripts/fixtures/identites-codex.json"),
        ]);
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

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des identités :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Identités vérifiées : ${langues.size} langues, ${territoires.size} territoires, ${identitesPersonnages + identitesOeuvres} formes documentées et ${fixture.projections.length} projections témoins.`,
    );
}

await verifier();
