import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const familles = [
    { collection: "personnages", dossier: "src/data/personnages" },
    { collection: "contributeurs", dossier: "src/data/contributeurs" },
    { collection: "oeuvres", dossier: "src/data/oeuvres" },
    { collection: "epoques", dossier: "src/data/epoques" },
];

async function chargerRegistre() {
    const chemin = path.join(racine, "src/registry/symbols/symbols-blocs.ts");
    const source = await readFile(chemin, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
        },
        fileName: chemin,
    });
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
    const { symbolsBlocs } = await import(moduleUrl);

    return symbolsBlocs;
}

async function verifierImage(src, contexte, erreurs) {
    if (!src.startsWith("/symbols/blocs/")) {
        erreurs.push(`${contexte} : chemin d’image invalide « ${src} »`);
        return;
    }

    const chemin = path.join(racine, "public", src.slice(1));

    try {
        await access(chemin);
    } catch {
        erreurs.push(`${contexte} : image introuvable « ${src} »`);
    }
}

async function verifier() {
    const registre = await chargerRegistre();
    const erreurs = [];
    const symbolesVerifies = new Set();
    let blocsVerifies = 0;
    let fichesVerifiees = 0;

    for (const { collection, dossier } of familles) {
        const symboles = registre[collection];

        if (!symboles) {
            erreurs.push(`Registre : collection « ${collection} » absente`);
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
                const contexte = `${dossier}/${fichier} · bloc ${index + 1}`;
                blocsVerifies += 1;

                if (typeof bloc.type !== "string" || bloc.type.length === 0) {
                    erreurs.push(`${contexte} : type absent`);
                    continue;
                }

                const symbole = symboles[bloc.type];

                if (!symbole) {
                    erreurs.push(
                        `${contexte} : symbole « ${collection}.${bloc.type} » absent du registre`,
                    );
                    continue;
                }

                symbolesVerifies.add(`${collection}.${bloc.type}`);
                await verifierImage(symbole.src, contexte, erreurs);
            }
        }
    }

    for (const [collection, symboles] of Object.entries(registre)) {
        for (const [slug, symbole] of Object.entries(symboles)) {
            await verifierImage(
                symbole.src,
                `Registre · ${collection}.${slug}`,
                erreurs,
            );
        }
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des symboles éditoriaux :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Symboles éditoriaux vérifiés : ${blocsVerifies} blocs dans ${fichesVerifiees} fiches, ${symbolesVerifies.size} symboles référencés.`,
    );
}

await verifier();
