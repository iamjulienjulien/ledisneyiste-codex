import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sousRegistres = [
    {
        registry: "blocs",
        fichier: "symbols-blocs.ts",
        exportName: "symbolsBlocs",
    },
    {
        registry: "codex",
        fichier: "symbols-codex.ts",
        exportName: "symbolsCodex",
    },
    {
        registry: "general",
        fichier: "symbols-general.ts",
        exportName: "symbolsGeneral",
    },
    {
        registry: "recompenses",
        fichier: "symbols-recompenses.ts",
        exportName: "symbolsRecompenses",
    },
    {
        registry: "techniques",
        fichier: "symbols-techniques.ts",
        exportName: "symbolsTechniques",
    },
];

const famillesBlocs = [
    { collection: "personnages", dossier: "src/data/personnages" },
    { collection: "contributeurs", dossier: "src/data/contributeurs" },
    { collection: "oeuvres", dossier: "src/data/oeuvres" },
    { collection: "epoques", dossier: "src/data/epoques" },
];

async function chargerSousRegistre(definition) {
    const chemin = path.join(
        racine,
        "src/registry/symbols",
        definition.fichier,
    );
    const source = await readFile(chemin, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
        },
        fileName: chemin,
    });
    const moduleUrl =
        "data:text/javascript;base64," +
        Buffer.from(outputText).toString("base64");
    const moduleCharge = await import(moduleUrl);

    return moduleCharge[definition.exportName];
}

async function chargerRegistres() {
    const registres = {};

    for (const definition of sousRegistres) {
        registres[definition.registry] = await chargerSousRegistre(definition);
    }

    return registres;
}

function estTexteNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

async function verifierImage(
    symbole,
    registry,
    contexte,
    sourcesEnregistrees,
    erreurs,
) {
    if (!symbole || typeof symbole !== "object") {
        erreurs.push(contexte + " : définition absente ou invalide");
        return;
    }

    if (!estTexteNonVide(symbole.label)) {
        erreurs.push(contexte + " : label absent");
    }

    if (
        !estTexteNonVide(symbole.accent) ||
        !symbole.accent.startsWith("var(--")
    ) {
        erreurs.push(contexte + " : accent CSS invalide");
    }

    if (!estTexteNonVide(symbole.src)) {
        erreurs.push(contexte + " : chemin d’image absent");
        return;
    }

    const prefixeAttendu = "/symbols/" + registry + "/";

    if (
        !symbole.src.startsWith(prefixeAttendu) ||
        !symbole.src.endsWith(".png")
    ) {
        erreurs.push(
            contexte + " : chemin d’image invalide « " + symbole.src + " »",
        );
        return;
    }

    sourcesEnregistrees.add(symbole.src);
    const chemin = path.join(racine, "public", symbole.src.slice(1));

    try {
        await access(chemin);
    } catch {
        erreurs.push(contexte + " : image introuvable « " + symbole.src + " »");
    }
}

async function listerImages(dossier, prefixe = "") {
    const images = [];
    const entrees = await readdir(dossier, { withFileTypes: true });

    for (const entree of entrees) {
        const cheminRelatif = path.posix.join(prefixe, entree.name);
        const cheminAbsolu = path.join(dossier, entree.name);

        if (entree.isDirectory()) {
            images.push(...(await listerImages(cheminAbsolu, cheminRelatif)));
        } else if (entree.isFile() && entree.name.endsWith(".png")) {
            images.push("/symbols/" + cheminRelatif);
        }
    }

    return images;
}

async function verifierTousLesRegistres(registres, erreurs) {
    const sourcesEnregistrees = new Set();
    let collectionsVerifiees = 0;
    let symbolesVerifies = 0;

    for (const definition of sousRegistres) {
        const registre = registres[definition.registry];

        if (!registre || typeof registre !== "object") {
            erreurs.push(
                "Registre « " + definition.registry + " » absent ou invalide",
            );
            continue;
        }

        for (const [collection, symboles] of Object.entries(registre)) {
            const contexteCollection =
                "Registre · " + definition.registry + "." + collection;
            collectionsVerifiees += 1;

            if (
                !symboles ||
                typeof symboles !== "object" ||
                Object.keys(symboles).length === 0
            ) {
                erreurs.push(contexteCollection + " : collection vide");
                continue;
            }

            for (const [slug, symbole] of Object.entries(symboles)) {
                symbolesVerifies += 1;
                await verifierImage(
                    symbole,
                    definition.registry,
                    contexteCollection + "." + slug,
                    sourcesEnregistrees,
                    erreurs,
                );
            }
        }
    }

    const imagesPubliques = await listerImages(
        path.join(racine, "public/symbols"),
    );

    for (const image of imagesPubliques) {
        if (!sourcesEnregistrees.has(image)) {
            erreurs.push(
                "Fichier public · image absente du registre « " + image + " »",
            );
        }
    }

    return {
        collectionsVerifiees,
        imagesPubliques: imagesPubliques.length,
        symbolesVerifies,
    };
}

async function verifierBlocsEditoriaux(registreBlocs, erreurs) {
    const typesReferencies = new Set();
    let blocsVerifies = 0;
    let fichesVerifiees = 0;

    for (const { collection, dossier } of famillesBlocs) {
        const symboles = registreBlocs[collection];

        if (!symboles) {
            erreurs.push(
                "Registre · collection de blocs « " + collection + " » absente",
            );
            continue;
        }

        const cheminDossier = path.join(racine, dossier);
        const fichiers = (await readdir(cheminDossier))
            .filter((fichier) => fichier.endsWith(".json"))
            .sort();

        for (const fichier of fichiers) {
            const chemin = path.join(cheminDossier, fichier);
            const fiche = JSON.parse(await readFile(chemin, "utf8"));
            const blocs = fiche.blocsEditoriaux ?? [];
            fichesVerifiees += 1;

            for (const [index, bloc] of blocs.entries()) {
                const contexte =
                    dossier + "/" + fichier + " · bloc " + (index + 1);
                blocsVerifies += 1;

                if (!estTexteNonVide(bloc.type)) {
                    erreurs.push(contexte + " : type absent");
                    continue;
                }

                if (!symboles[bloc.type]) {
                    erreurs.push(
                        contexte +
                            " : symbole « " +
                            collection +
                            "." +
                            bloc.type +
                            " » absent du registre",
                    );
                    continue;
                }

                typesReferencies.add(collection + "." + bloc.type);
            }
        }
    }

    return {
        blocsVerifies,
        fichesVerifiees,
        typesReferencies: typesReferencies.size,
    };
}

async function verifier() {
    const registres = await chargerRegistres();
    const erreurs = [];
    const bilanRegistres = await verifierTousLesRegistres(registres, erreurs);
    const bilanBlocs = await verifierBlocsEditoriaux(registres.blocs, erreurs);

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des symboles :");
        for (const erreur of erreurs) {
            console.error("- " + erreur);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        "Symboles vérifiés : " +
            bilanRegistres.symbolesVerifies +
            " entrées dans " +
            sousRegistres.length +
            " registres et " +
            bilanRegistres.collectionsVerifiees +
            " collections, " +
            bilanRegistres.imagesPubliques +
            " images publiques.",
    );
    console.log(
        "Blocs éditoriaux vérifiés : " +
            bilanBlocs.blocsVerifies +
            " blocs dans " +
            bilanBlocs.fichesVerifiees +
            " fiches, " +
            bilanBlocs.typesReferencies +
            " types référencés.",
    );
}

await verifier();
