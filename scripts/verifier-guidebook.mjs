import { access, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repositoryRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
);
const forbiddenProjectionKeys = new Set([
    "pageId",
    "rootPageId",
    "authorizedRootPageId",
    "relativePath",
    "absolutePath",
    "filePath",
]);

async function loadTypeScriptModule(relativePath) {
    const filePath = path.join(repositoryRoot, relativePath);
    const source = await readFile(filePath, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
        },
        fileName: filePath,
    });
    const executableSource = outputText.replace(
        /^import\s+["']server-only["'];?\s*$/gm,
        "",
    );
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(executableSource).toString("base64")}`;

    return import(moduleUrl);
}

function flattenNavigation(nodes) {
    return nodes.flatMap((node) => [
        node,
        ...flattenNavigation(node.children ?? []),
    ]);
}

function collectForbiddenKeys(value, location = "projection", errors = []) {
    if (!value || typeof value !== "object") {
        return errors;
    }

    for (const [key, child] of Object.entries(value)) {
        if (forbiddenProjectionKeys.has(key)) {
            errors.push(
                `${location}.${key} ne doit pas rejoindre la projection`,
            );
        }

        collectForbiddenKeys(child, `${location}.${key}`, errors);
    }

    return errors;
}

function isPathInsideDirectory(rootDirectory, candidatePath) {
    const relativePath = path.relative(rootDirectory, candidatePath);

    return (
        relativePath.length > 0 &&
        !relativePath.startsWith(`..${path.sep}`) &&
        relativePath !== ".." &&
        !path.isAbsolute(relativePath)
    );
}

async function verifyLocalLibrary(errors) {
    const { localGuidebookManifest } = await loadTypeScriptModule(
        "src/lib/guidebook/server/local-manifest.ts",
    );
    const projection = JSON.parse(
        await readFile(
            path.join(
                repositoryRoot,
                "src/registry/guidebook/guidebook-projection.json",
            ),
            "utf8",
        ),
    );
    const resolvedRoot = await realpath(
        path.join(repositoryRoot, localGuidebookManifest.rootDirectory),
    );
    const projectionNodes = flattenNavigation(projection.nodes);
    const manifestSlugs = localGuidebookManifest.entries.map(
        (entry) => entry.slug,
    );
    const projectionSlugs = projectionNodes.map((node) => node.slug);

    for (const error of collectForbiddenKeys(projection)) {
        errors.push(error);
    }

    if (new Set(manifestSlugs).size !== manifestSlugs.length) {
        errors.push("Le manifeste local contient des slugs dupliqués");
    }

    if (new Set(projectionSlugs).size !== projectionSlugs.length) {
        errors.push("L’arborescence publique contient des slugs dupliqués");
    }

    if (
        manifestSlugs.length !== projectionSlugs.length ||
        manifestSlugs.some((slug) => !projectionSlugs.includes(slug))
    ) {
        errors.push(
            "Le manifeste local et l’arborescence de projection ne décrivent pas les mêmes documents",
        );
    }

    for (const entry of localGuidebookManifest.entries) {
        const resolvedFile = await realpath(
            path.resolve(resolvedRoot, entry.relativePath),
        );

        if (
            path.extname(resolvedFile).toLowerCase() !== ".md" ||
            !isPathInsideDirectory(resolvedRoot, resolvedFile)
        ) {
            errors.push(
                `${entry.slug} sort de la racine locale autorisée après résolution réelle`,
            );
        }
    }

    const privateDocument = await realpath(
        path.join(repositoryRoot, "docs/studio/onboarding.md"),
    );

    if (isPathInsideDirectory(resolvedRoot, privateDocument)) {
        errors.push(
            "Le document privé témoin appartient à la racine publiable",
        );
    }

    if (
        localGuidebookManifest.entries.some((entry) =>
            entry.relativePath.includes("studio"),
        )
    ) {
        errors.push("Le manifeste local référence docs/studio");
    }

    await access(
        path.join(
            repositoryRoot,
            "docs/studio/snippets/carte-de-studio-guru-editions.md",
        ),
    );

    try {
        await access(
            path.join(
                repositoryRoot,
                "docs/agents/snippets/carte-de-studio-guru-editions.md",
            ),
        );
        errors.push("L’ancien modèle public de carte de studio existe encore");
    } catch {
        // L’absence de l’ancien chemin public est le résultat attendu.
    }

    return localGuidebookManifest.entries.length;
}

async function verifyNotionAuthorization(errors) {
    const { isNotionGuidebookPageAuthorized } = await loadTypeScriptModule(
        "src/lib/guidebook/server/authorize-notion-page.ts",
    );
    const manifest = JSON.parse(
        await readFile(
            path.join(
                repositoryRoot,
                "scripts/fixtures/guidebook/notion-manifest.fixture.json",
            ),
            "utf8",
        ),
    );
    const projection = JSON.parse(
        await readFile(
            path.join(
                repositoryRoot,
                "scripts/fixtures/guidebook/notion-projection.fixture.json",
            ),
            "utf8",
        ),
    );
    const declaredProjectionSlugs = new Set(
        flattenNavigation(projection.nodes).map((node) => node.slug),
    );
    const authorize = (overrides = {}) =>
        isNotionGuidebookPageAuthorized({
            manifest,
            declaredProjectionSlugs,
            slug: "page-autorisee",
            pageId: "notion-page-autorisee",
            ancestorPageIds: ["root-le-disneyiste"],
            ...overrides,
        });

    if (!authorize()) {
        errors.push("La page Notion doublement autorisée est refusée");
    }

    if (
        authorize({
            slug: "page-non-declaree",
            pageId: "notion-page-non-declaree",
        })
    ) {
        errors.push("Une page Notion absente de la projection est autorisée");
    }

    if (authorize({ ancestorPageIds: ["racine-etrangere"] })) {
        errors.push("Une page Notion hors de la racine autorisée est acceptée");
    }

    if (authorize({ pageId: "identifiant-usurpe" })) {
        errors.push(
            "Une page Notion absente du manifeste serveur est acceptée",
        );
    }

    for (const error of collectForbiddenKeys(projection, "fixtureNotion")) {
        errors.push(error);
    }
}

async function verify() {
    const errors = [];
    let localDocumentCount = 0;

    try {
        localDocumentCount = await verifyLocalLibrary(errors);
        await verifyNotionAuthorization(errors);
    } catch (error) {
        errors.push(
            error instanceof Error
                ? error.message
                : "Erreur Guidebook inconnue",
        );
    }

    if (errors.length > 0) {
        console.error("Échec de la vérification du Guidebook :");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Guidebook vérifié : ${localDocumentCount} documents locaux, frontière studio fermée et double autorisation Notion éprouvée.`,
    );
}

await verify();
