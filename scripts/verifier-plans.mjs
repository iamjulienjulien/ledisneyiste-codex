import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const plansAttendus = [
    "travelling-documentaire",
    "plan-d-ensemble",
    "montage-du-temps",
    "generique-vivant",
    "table-lumineuse",
];

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

function verifierVocabulaire(vocabulaire, nom, erreurs) {
    for (const [slug, definition] of Object.entries(vocabulaire)) {
        if (!chaineNonVide(definition?.label)) {
            erreurs.push(`${nom}.${slug} : libellé absent`);
        }

        if (!chaineNonVide(definition?.description)) {
            erreurs.push(`${nom}.${slug} : description absente`);
        }
    }
}

function verifierReferences(
    valeurs,
    vocabulaire,
    contexte,
    referencesUtilisees,
    erreurs,
) {
    if (!Array.isArray(valeurs) || valeurs.length === 0) {
        erreurs.push(`${contexte} : au moins une valeur est attendue`);
        return;
    }

    const valeursUniques = new Set();

    for (const valeur of valeurs) {
        if (!chaineNonVide(valeur) || !Object.hasOwn(vocabulaire, valeur)) {
            erreurs.push(`${contexte} : valeur inconnue « ${valeur} »`);
        }

        if (valeursUniques.has(valeur)) {
            erreurs.push(`${contexte} : valeur dupliquée « ${valeur} »`);
        }

        valeursUniques.add(valeur);
        referencesUtilisees.add(valeur);
    }
}

async function verifier() {
    const { codexPlans, planAngles, planObjectives } =
        await chargerModuleTypeScript("src/registry/plans/plans.ts");
    const erreurs = [];
    const anglesUtilises = new Set();
    const objectifsUtilises = new Set();
    const slugs = Object.keys(codexPlans);

    verifierVocabulaire(planAngles, "Angles", erreurs);
    verifierVocabulaire(planObjectives, "Objectifs", erreurs);

    if (
        slugs.length !== plansAttendus.length ||
        plansAttendus.some((slug) => !Object.hasOwn(codexPlans, slug))
    ) {
        erreurs.push(
            `Registre des Plans : ${plansAttendus.length} Plans attendus (${plansAttendus.join(", ")})`,
        );
    }

    for (const [slug, definition] of Object.entries(codexPlans)) {
        const contexte = `Plan ${slug}`;

        for (const champ of [
            "label",
            "description",
            "question",
            "actionLabel",
            "textAlternativeLabel",
            "frameDescription",
            "matterDescription",
        ]) {
            if (!chaineNonVide(definition?.[champ])) {
                erreurs.push(`${contexte} : ${champ} absent`);
            }
        }

        verifierReferences(
            definition?.angles,
            planAngles,
            `${contexte}.angles`,
            anglesUtilises,
            erreurs,
        );
        verifierReferences(
            definition?.objectives,
            planObjectives,
            `${contexte}.objectives`,
            objectifsUtilises,
            erreurs,
        );

        if (Object.hasOwn(definition, "verdict")) {
            erreurs.push(
                `${contexte} : le verdict expérimental ne doit pas appartenir au registre`,
            );
        }
    }

    for (const slug of Object.keys(planAngles)) {
        if (!anglesUtilises.has(slug)) {
            erreurs.push(`Angles.${slug} : angle inutilisé`);
        }
    }

    for (const slug of Object.keys(planObjectives)) {
        if (!objectifsUtilises.has(slug)) {
            erreurs.push(`Objectifs.${slug} : objectif inutilisé`);
        }
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des Plans :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Plans vérifiés : ${slugs.length} Plans, ${Object.keys(planAngles).length} Angles et ${Object.keys(planObjectives).length} Objectifs.`,
    );
}

await verifier();
