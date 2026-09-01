import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
);
const codexComponentsRoot = path.join(repositoryRoot, "src/components/codex");
const sourceTypesRoot = path.join(repositoryRoot, "src/types");
const territories = new Map([
    ["CodexIndex", new Set(["CodexIndex", "CodexCommon", "CodexLayout"])],
    ["CodexFiche", new Set(["CodexFiche", "CodexCommon", "CodexLayout"])],
    ["CodexLayout", new Set(["CodexLayout", "CodexCommon"])],
    ["CodexCommon", new Set(["CodexCommon"])],
]);
const requiredComponentFiles = (componentName) => [
    `${componentName}.tsx`,
    `${componentName}.module.css`,
    `${componentName}.types.ts`,
    "index.ts",
];

async function collectSourceFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await collectSourceFiles(entryPath)));
            continue;
        }

        if (/\.(?:ts|tsx)$/u.test(entry.name)) {
            files.push(entryPath);
        }
    }

    return files;
}

function relative(filePath) {
    return path.relative(repositoryRoot, filePath);
}

async function verifyCodexArchitecture(errors) {
    const territoryEntries = await readdir(codexComponentsRoot, {
        withFileTypes: true,
    });
    let componentCount = 0;

    for (const entry of territoryEntries) {
        if (!entry.isDirectory() || !territories.has(entry.name)) {
            errors.push(
                `${relative(path.join(codexComponentsRoot, entry.name))} ne correspond pas à un territoire Codex autorisé`,
            );
            continue;
        }

        const territoryName = entry.name;
        const territoryPath = path.join(codexComponentsRoot, territoryName);
        const componentEntries = await readdir(territoryPath, {
            withFileTypes: true,
        });

        for (const componentEntry of componentEntries) {
            const componentPath = path.join(territoryPath, componentEntry.name);

            if (!componentEntry.isDirectory()) {
                errors.push(
                    `${relative(componentPath)} doit appartenir au dossier d’un composant`,
                );
                continue;
            }

            const componentName = componentEntry.name;
            componentCount += 1;

            if (!componentName.startsWith(territoryName)) {
                errors.push(
                    `${relative(componentPath)} doit commencer par ${territoryName}`,
                );
            }

            const componentFiles = new Set(await readdir(componentPath));
            for (const requiredFile of requiredComponentFiles(componentName)) {
                if (!componentFiles.has(requiredFile)) {
                    errors.push(
                        `${relative(componentPath)} ne contient pas ${requiredFile}`,
                    );
                }
            }
        }

        const allowedDependencies = territories.get(territoryName);
        const territorySourceFiles = await collectSourceFiles(territoryPath);

        for (const sourceFile of territorySourceFiles) {
            const source = await readFile(sourceFile, "utf8");
            const dependencyPattern =
                /@\/components\/codex\/(Codex(?:Index|Fiche|Layout|Common))\//gu;

            for (const match of source.matchAll(dependencyPattern)) {
                const dependency = match[1];

                if (!allowedDependencies.has(dependency)) {
                    errors.push(
                        `${relative(sourceFile)} ne peut pas dépendre de ${dependency}`,
                    );
                }
            }
        }
    }

    return componentCount;
}

async function verifySharedTypes(errors) {
    const typeFiles = await collectSourceFiles(sourceTypesRoot);

    for (const typeFile of typeFiles) {
        const source = await readFile(typeFile, "utf8");

        if (/from\s+["']react["']/u.test(source)) {
            errors.push(
                `${relative(typeFile)} conserve un contrat React qui doit rejoindre son composant propriétaire`,
            );
        }
    }

    return typeFiles.length;
}

async function verifyPublicProjection(errors) {
    const applicationFiles = await collectSourceFiles(
        path.join(repositoryRoot, "src/app"),
    );
    const codexFiles = await collectSourceFiles(codexComponentsRoot);
    const publicFiles = [
        ...applicationFiles.filter((filePath) => {
            const file = relative(filePath);

            return (
                !file.startsWith("src/app/atelier/") &&
                !file.startsWith("src/app/guidebook/")
            );
        }),
        ...codexFiles,
    ];
    const rawInteractiveElementPattern =
        /<(?:a|button|form|input|select|textarea)\b/gu;

    for (const publicFile of publicFiles) {
        const source = await readFile(publicFile, "utf8");

        if (/\bPixieDust[A-Z][A-Za-z0-9]*/u.test(source)) {
            errors.push(
                `${relative(publicFile)} projette une esquisse PixieDust dans le Codex public`,
            );
        }

        const rawElements = [
            ...source.matchAll(rawInteractiveElementPattern),
        ].map((match) => match[0]);

        if (rawElements.length > 0) {
            errors.push(
                `${relative(publicFile)} recrée des contrôles interactifs disponibles dans Pixie : ${[...new Set(rawElements)].join(", ")}`,
            );
        }
    }

    return publicFiles.length;
}

async function verify() {
    const errors = [];
    let componentCount = 0;
    let typeFileCount = 0;
    let publicFileCount = 0;

    try {
        componentCount = await verifyCodexArchitecture(errors);
        typeFileCount = await verifySharedTypes(errors);
        publicFileCount = await verifyPublicProjection(errors);
    } catch (error) {
        errors.push(
            error instanceof Error
                ? error.message
                : "Erreur inconnue de projection Pixie",
        );
    }

    if (errors.length > 0) {
        console.error("Échec de la vérification de la projection Pixie :");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Projection Pixie vérifiée : ${componentCount} composants Codex dans 4 territoires, ${typeFileCount} contrats métier partagés sans dépendance React et ${publicFileCount} fichiers publics sans esquisse ni contrôle interactif recréé.`,
    );
}

await verify();
