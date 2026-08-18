import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const configurations = [
    {
        type: "personnage",
        catalogue: "src/data/catalogues/personnages.json",
        registre: "personnages",
        champs: [
            {
                nom: "categories",
                collection: "categories",
                multiple: true,
            },
        ],
    },
    {
        type: "contributeur",
        catalogue: "src/data/catalogues/contributeurs.json",
        registre: "contributeurs",
        champs: [
            {
                nom: "categories",
                collection: "categories",
                multiple: true,
            },
        ],
    },
    {
        type: "oeuvre",
        catalogue: "src/data/catalogues/oeuvres.json",
        registre: "oeuvres",
        champs: [
            { nom: "collection", collection: "collections" },
            { nom: "type", collection: "types" },
            { nom: "son", collection: "sons" },
            { nom: "couleur", collection: "couleurs" },
        ],
    },
];

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

async function chargerRegistres() {
    const [personnages, contributeurs, oeuvres, recompenses, couleurs] =
        await Promise.all([
            chargerModuleTypeScript(
                "src/registry/metadata/metadata-personnages.ts",
            ),
            chargerModuleTypeScript(
                "src/registry/metadata/metadata-contributeurs.ts",
            ),
            chargerModuleTypeScript(
                "src/registry/metadata/metadata-oeuvres.ts",
            ),
            chargerModuleTypeScript(
                "src/registry/metadata/metadata-recompenses.ts",
            ),
            chargerModuleTypeScript(
                "src/registry/colors/colors-atelier-animation.ts",
            ),
        ]);

    return {
        registres: {
            personnages: personnages.metadataPersonnages,
            contributeurs: contributeurs.metadataContributeurs,
            oeuvres: oeuvres.metadataOeuvres,
            recompenses: recompenses.metadataRecompenses,
        },
        couleurs: new Set(Object.keys(couleurs.colorsAtelierAnimation)),
    };
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function verifierDefinition(definition, contexte, couleurs, erreurs) {
    if (!chaineNonVide(definition?.label)) {
        erreurs.push(`${contexte} : libellé absent`);
    }

    if (!chaineNonVide(definition?.description)) {
        erreurs.push(`${contexte} : description absente`);
    }

    if (!couleurs.has(definition?.color)) {
        erreurs.push(`${contexte} : couleur inconnue « ${definition?.color} »`);
    }
}

async function verifier() {
    const { registres, couleurs } = await chargerRegistres();
    const erreurs = [];
    let entreesVerifiees = 0;
    let valeursVerifiees = 0;

    for (const [nomRegistre, collections] of Object.entries(registres)) {
        for (const [nomCollection, definitions] of Object.entries(
            collections,
        )) {
            if (Object.keys(definitions).length === 0) {
                erreurs.push(
                    `Registre ${nomRegistre}.${nomCollection} : aucune valeur`,
                );
            }

            for (const [slug, definition] of Object.entries(definitions)) {
                verifierDefinition(
                    definition,
                    `Registre ${nomRegistre}.${nomCollection}.${slug}`,
                    couleurs,
                    erreurs,
                );
            }
        }
    }

    for (const configuration of configurations) {
        const entrees = await lireJson(configuration.catalogue);
        const slugs = new Set();

        if (!Array.isArray(entrees)) {
            erreurs.push(`${configuration.catalogue} : tableau attendu`);
            continue;
        }

        for (const [index, entree] of entrees.entries()) {
            const contexte = `${configuration.catalogue} · entrée ${index + 1}`;
            entreesVerifiees += 1;

            if (!chaineNonVide(entree.slug)) {
                erreurs.push(`${contexte} : slug absent`);
            } else if (slugs.has(entree.slug)) {
                erreurs.push(`${contexte} : slug dupliqué « ${entree.slug} »`);
            } else {
                slugs.add(entree.slug);
            }

            if (entree.type !== configuration.type) {
                erreurs.push(
                    `${contexte} : type « ${entree.type} » au lieu de « ${configuration.type} »`,
                );
            }

            if (
                !chaineNonVide(entree.nom) ||
                !chaineNonVide(entree.sousTitre)
            ) {
                erreurs.push(`${contexte} : nom ou sous-titre absent`);
            }

            if (!entree.metadata || typeof entree.metadata !== "object") {
                erreurs.push(`${contexte} : objet metadata absent`);
                continue;
            }

            for (const champ of configuration.champs) {
                const definitions =
                    registres[configuration.registre][champ.collection];
                const valeur = entree.metadata[champ.nom];
                const valeurs = champ.multiple ? valeur : [valeur];

                if (
                    (champ.multiple &&
                        (!Array.isArray(valeur) || valeur.length === 0)) ||
                    !Array.isArray(valeurs)
                ) {
                    erreurs.push(
                        `${contexte} : metadata.${champ.nom} doit contenir au moins une valeur`,
                    );
                    continue;
                }

                const valeursUniques = new Set();

                for (const slug of valeurs) {
                    valeursVerifiees += 1;

                    if (!chaineNonVide(slug) || !definitions[slug]) {
                        erreurs.push(
                            `${contexte} : metadata.${champ.nom} inconnue « ${slug} »`,
                        );
                    }

                    if (valeursUniques.has(slug)) {
                        erreurs.push(
                            `${contexte} : metadata.${champ.nom} dupliquée « ${slug} »`,
                        );
                    }

                    valeursUniques.add(slug);
                }
            }
        }
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des métadonnées :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Métadonnées vérifiées : ${entreesVerifiees} entrées et ${valeursVerifiees} valeurs de catalogue.`,
    );
}

await verifier();
