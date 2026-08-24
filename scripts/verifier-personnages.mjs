import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const naturesNoms = new Set(["original", "localise", "alias", "ancien"]);

async function lireJson(chemin) {
    return JSON.parse(await readFile(path.join(racine, chemin), "utf8"));
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
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

function verifierNomsAlternatifs(fiche, contexte, idsSources, erreurs) {
    if (fiche.nomsAlternatifs === undefined) {
        return;
    }

    if (
        !Array.isArray(fiche.nomsAlternatifs) ||
        fiche.nomsAlternatifs.length === 0
    ) {
        erreurs.push(
            `${contexte} · noms alternatifs : au moins un nom attendu`,
        );
        return;
    }

    const noms = new Set();

    fiche.nomsAlternatifs.forEach((nom, index) => {
        const contexteNom = `${contexte} · nom alternatif ${index + 1}`;
        if (!chaineNonVide(nom.nom)) {
            erreurs.push(`${contexteNom} : nom absent`);
        }
        if (!naturesNoms.has(nom.nature)) {
            erreurs.push(`${contexteNom} : nature inconnue « ${nom.nature} »`);
        }
        if (nom.langue !== undefined && !chaineNonVide(nom.langue)) {
            erreurs.push(`${contexteNom} : langue invalide`);
        }
        if (nom.territoire !== undefined && !chaineNonVide(nom.territoire)) {
            erreurs.push(`${contexteNom} : territoire invalide`);
        }

        const cle = nom.nom.trim().toLocaleLowerCase("fr");
        if (noms.has(cle)) {
            erreurs.push(
                `${contexte} : nom alternatif dupliqué « ${nom.nom} »`,
            );
        }
        noms.add(cle);

        verifierSources(nom.sources, contexteNom, idsSources, erreurs);
    });
}

function verifierFormes(fiche, contexte, idsSources, erreurs) {
    if (fiche.formes === undefined) {
        return;
    }

    if (!Array.isArray(fiche.formes) || fiche.formes.length < 2) {
        erreurs.push(`${contexte} · formes : au moins deux formes attendues`);
        return;
    }

    const slugs = new Set();
    const noms = new Set();

    fiche.formes.forEach((forme, index) => {
        const contexteForme = `${contexte} · forme ${index + 1}`;
        if (
            !chaineNonVide(forme.slug) ||
            !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(forme.slug)
        ) {
            erreurs.push(`${contexteForme} : slug invalide`);
        }
        if (!chaineNonVide(forme.nom)) {
            erreurs.push(`${contexteForme} : nom absent`);
        }
        if (!chaineNonVide(forme.description)) {
            erreurs.push(`${contexteForme} : description absente`);
        }

        if (slugs.has(forme.slug)) {
            erreurs.push(
                `${contexte} : slug de forme dupliqué « ${forme.slug} »`,
            );
        }
        slugs.add(forme.slug);

        const cleNom = forme.nom?.trim().toLocaleLowerCase("fr");
        if (noms.has(cleNom)) {
            erreurs.push(
                `${contexte} : nom de forme dupliqué « ${forme.nom} »`,
            );
        }
        noms.add(cleNom);

        verifierSources(forme.sources, contexteForme, idsSources, erreurs);
    });
}

function verifierFiche(fiche, contexte, idsSources, erreurs) {
    if (fiche.type !== "personnage" || !chaineNonVide(fiche.slug)) {
        erreurs.push(`${contexte} : identité de personnage invalide`);
    }

    verifierNomsAlternatifs(fiche, contexte, idsSources, erreurs);
    verifierFormes(fiche, contexte, idsSources, erreurs);
}

async function verifier() {
    const erreurs = [];
    const sources = await lireJson("src/data/sources/sources.json");
    const idsSources = new Set(sources.map((source) => source.id));
    const fichiers = (await readdir(path.join(racine, "src/data/personnages")))
        .filter((fichier) => fichier.endsWith(".json"))
        .sort();

    for (const fichier of fichiers) {
        const chemin = `src/data/personnages/${fichier}`;
        verifierFiche(await lireJson(chemin), chemin, idsSources, erreurs);
    }

    const fixture = await lireJson("scripts/fixtures/personnage-formes.json");
    if (fixture.nomsAlternatifs === undefined) {
        erreurs.push("Fixture des personnages : noms alternatifs absents");
    }
    if (fixture.formes === undefined) {
        erreurs.push("Fixture des personnages : formes absentes");
    }

    verifierFiche(
        fixture,
        "Fixture des personnages",
        new Set(["fixture-source-a", "fixture-source-b"]),
        erreurs,
    );

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des Personnages :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Personnages vérifiés : ${fichiers.length} fiches et 1 fixture de formes.`,
    );
}

await verifier();
