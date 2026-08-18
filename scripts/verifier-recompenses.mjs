import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const catalogues = {
    personnage: "src/data/catalogues/personnages.json",
    contributeur: "src/data/catalogues/contributeurs.json",
    oeuvre: "src/data/catalogues/oeuvres.json",
    epoque: "src/data/catalogues/epoques.json",
};

async function lireJson(chemin) {
    return JSON.parse(await readFile(path.join(racine, chemin), "utf8"));
}

async function chargerNatures() {
    const chemin = path.join(
        racine,
        "src/registry/metadata/metadata-recompenses.ts",
    );
    const source = await readFile(chemin, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
        },
        fileName: chemin,
    });
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
    const { metadataRecompenses } = await import(moduleUrl);

    return new Set(Object.keys(metadataRecompenses.natures));
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
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

function verifierReference(reference, contexte, slugsParType, erreurs) {
    if (!reference || !chaineNonVide(reference.nom)) {
        erreurs.push(`${contexte} : nom absent`);
        return;
    }

    const aUnType = reference.type !== undefined;
    const aUnSlug = reference.slug !== undefined;

    if (aUnType !== aUnSlug) {
        erreurs.push(
            `${contexte} : type et slug doivent être fournis ensemble`,
        );
        return;
    }

    if (!aUnType) {
        return;
    }

    const slugs = slugsParType.get(reference.type);

    if (!slugs) {
        erreurs.push(`${contexte} : type inconnu « ${reference.type} »`);
        return;
    }

    if (!chaineNonVide(reference.slug) || !slugs.has(reference.slug)) {
        erreurs.push(
            `${contexte} : référence ${reference.type} « ${reference.slug} » introuvable`,
        );
    }
}

async function verifier() {
    const recompenses = await lireJson("src/data/recompenses/recompenses.json");
    const sources = await lireJson("src/data/sources/sources.json");
    const natures = await chargerNatures();
    const erreurs = [];
    const ids = new Set();
    const idsSources = new Set(sources.map((source) => source.id));
    const slugsParType = new Map();

    for (const [type, chemin] of Object.entries(catalogues)) {
        const entrees = await lireJson(chemin);
        slugsParType.set(type, new Set(entrees.map((entree) => entree.slug)));
    }

    if (!Array.isArray(recompenses)) {
        erreurs.push("Le registre des récompenses doit être un tableau");
    } else {
        for (const [index, recompense] of recompenses.entries()) {
            const contexte = `Récompense ${index + 1}`;

            if (!chaineNonVide(recompense.id)) {
                erreurs.push(`${contexte} : identifiant absent`);
            } else if (ids.has(recompense.id)) {
                erreurs.push(
                    `${contexte} : identifiant dupliqué « ${recompense.id} »`,
                );
            } else {
                ids.add(recompense.id);
            }

            if (!chaineNonVide(recompense.institution?.nom)) {
                erreurs.push(`${contexte} : institution absente`);
            }

            if (!chaineNonVide(recompense.edition?.nom)) {
                erreurs.push(`${contexte} : édition absente`);
            }

            if (
                recompense.edition?.numero !== undefined &&
                (!Number.isInteger(recompense.edition.numero) ||
                    recompense.edition.numero <= 0)
            ) {
                erreurs.push(`${contexte} : numéro d’édition invalide`);
            }

            if (!dateEstValide(recompense.dateAttribution)) {
                erreurs.push(`${contexte} : date d’attribution invalide`);
            }

            if (!natures.has(recompense.nature)) {
                erreurs.push(
                    `${contexte} : nature inconnue « ${recompense.nature} »`,
                );
            }

            if (
                !chaineNonVide(recompense.categorie) &&
                !chaineNonVide(recompense.motif)
            ) {
                erreurs.push(`${contexte} : catégorie ou motif obligatoire`);
            }

            if (
                !Array.isArray(recompense.beneficiaires) ||
                recompense.beneficiaires.length === 0
            ) {
                erreurs.push(`${contexte} : bénéficiaire obligatoire`);
            } else {
                recompense.beneficiaires.forEach((beneficiaire, position) =>
                    verifierReference(
                        beneficiaire,
                        `${contexte} · bénéficiaire ${position + 1}`,
                        slugsParType,
                        erreurs,
                    ),
                );
            }

            if (recompense.oeuvreConcernee !== undefined) {
                verifierReference(
                    recompense.oeuvreConcernee,
                    `${contexte} · œuvre concernée`,
                    slugsParType,
                    erreurs,
                );

                if (
                    recompense.oeuvreConcernee.type !== undefined &&
                    recompense.oeuvreConcernee.type !== "oeuvre"
                ) {
                    erreurs.push(
                        `${contexte} · œuvre concernée : le type doit être « oeuvre »`,
                    );
                }
            }

            if (
                !Array.isArray(recompense.sources) ||
                recompense.sources.length === 0
            ) {
                erreurs.push(`${contexte} : source obligatoire`);
            } else {
                for (const idSource of recompense.sources) {
                    if (!idsSources.has(idSource)) {
                        erreurs.push(
                            `${contexte} : source « ${idSource} » introuvable`,
                        );
                    }
                }
            }
        }
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des récompenses :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Récompenses vérifiées : ${recompenses.length} entrée${recompenses.length > 1 ? "s" : ""}.`,
    );
}

await verifier();
