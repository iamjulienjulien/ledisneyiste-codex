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
    let executableSource = outputText.replace(
        /^import\s+["']server-only["'];?\s*$/gm,
        "",
    );

    for (const dependency of ["remark-gfm", "remark-parse", "unified"]) {
        executableSource = executableSource.replace(
            new RegExp(`from\\s+["']${dependency}["']`, "g"),
            `from ${JSON.stringify(import.meta.resolve(dependency))}`,
        );
    }

    const moduleUrl = `data:text/javascript;base64,${Buffer.from(executableSource).toString("base64")}`;

    return import(moduleUrl);
}

function flattenTableOfContents(items) {
    return items.flatMap((item) => [
        item,
        ...flattenTableOfContents(item.children ?? []),
    ]);
}

function collectListItemBlocks(item) {
    return [
        ...item.blocks.flatMap(collectBlocks),
        ...item.children.flatMap(collectBlocks),
    ];
}

function collectBlocks(block) {
    if (block.kind === "blockquote") {
        return [block, ...block.blocks.flatMap(collectBlocks)];
    }

    if (block.kind === "list") {
        return [block, ...block.items.flatMap(collectListItemBlocks)];
    }

    return [block];
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

async function verifyMarkdownAnalysis(errors) {
    const [{ analyzeGuidebookMarkdown }, { resolveGuidebookLink }] =
        await Promise.all([
            loadTypeScriptModule("src/lib/guidebook/analyze-markdown.ts"),
            loadTypeScriptModule("src/lib/guidebook/resolve-link.ts"),
        ]);
    const { localGuidebookManifest } = await loadTypeScriptModule(
        "src/lib/guidebook/server/local-manifest.ts",
    );
    const fixtureEntries = [
        { slug: "fixture", relativePath: "fixture.md" },
        { slug: "cible", relativePath: "cible.md" },
    ];
    const fixture = await readFile(
        path.join(
            repositoryRoot,
            "scripts/fixtures/guidebook/markdown-analysis.fixture.md",
        ),
        "utf8",
    );
    const fixtureAnalysis = analyzeGuidebookMarkdown({
        slug: "fixture",
        markdown: fixture,
        resolveLink: (slug, label, rawHref) =>
            resolveGuidebookLink(fixtureEntries, slug, label, rawHref),
    });
    const fixtureBlocks = fixtureAnalysis.blocks.flatMap(collectBlocks);
    const fixtureBlockKinds = new Set(fixtureBlocks.map((block) => block.kind));
    const expectedBlockKinds = [
        "heading",
        "paragraph",
        "blockquote",
        "list",
        "table",
        "thematic-break",
        "code",
        "unsupported",
    ];

    for (const kind of expectedBlockKinds) {
        if (!fixtureBlockKinds.has(kind)) {
            errors.push(`La fixture Markdown ne produit aucun bloc ${kind}`);
        }
    }

    if (
        !fixtureBlocks.some(
            (block) => block.kind === "code" && block.presentation === "ascii",
        )
    ) {
        errors.push("La carte témoin n’est pas reconnue comme ASCII");
    }

    if (
        !fixtureBlocks.some(
            (block) =>
                block.kind === "code" &&
                block.presentation === "ascii" &&
                block.alternative === "CARTE DE PROJECTION",
        )
    ) {
        errors.push("La carte témoin ne produit pas d’alternative accessible");
    }

    if (
        !fixtureBlocks.some(
            (block) => block.kind === "code" && block.presentation === "code",
        )
    ) {
        errors.push(
            "Le code TypeScript témoin est confondu avec une carte ASCII",
        );
    }

    if (
        !fixtureBlocks.some(
            (block) =>
                block.kind === "list" &&
                block.items.some((item) =>
                    item.children.some((child) => child.ordered),
                ),
        )
    ) {
        errors.push("La liste ordonnée imbriquée perd sa propre sémantique");
    }

    if (
        !fixtureAnalysis.headings.some((heading) => heading.id === "raccord-2")
    ) {
        errors.push(
            "Les ancres de titres dupliqués ne sont pas désambiguïsées",
        );
    }

    const fixtureLinkStates = new Set(
        fixtureAnalysis.links.map((link) => link.state),
    );
    for (const state of [
        "anchor",
        "internal",
        "external",
        "restricted",
        "invalid",
    ]) {
        if (!fixtureLinkStates.has(state)) {
            errors.push(`La fixture Markdown n’éprouve aucun lien ${state}`);
        }
    }

    if (
        !fixtureAnalysis.links.some(
            (link) =>
                link.label === "ancre absente" &&
                link.state === "invalid" &&
                link.href === null,
        )
    ) {
        errors.push("Une ancre absente n’est pas neutralisée");
    }

    if (
        !fixtureBlocks.some(
            (block) =>
                block.kind === "paragraph" &&
                block.content.some((inline) => inline.kind === "break"),
        )
    ) {
        errors.push("Le saut de ligne HTML autorisé n’est pas normalisé");
    }

    const resolvedRoot = await realpath(
        path.join(repositoryRoot, localGuidebookManifest.rootDirectory),
    );
    const realStatistics = {
        blocks: 0,
        headings: 0,
        links: 0,
        ascii: 0,
        restricted: 0,
    };

    for (const entry of localGuidebookManifest.entries) {
        const markdown = await readFile(
            path.join(resolvedRoot, entry.relativePath),
            "utf8",
        );
        const analysis = analyzeGuidebookMarkdown({
            slug: entry.slug,
            markdown,
            resolveLink: (slug, label, rawHref) =>
                resolveGuidebookLink(
                    localGuidebookManifest.entries,
                    slug,
                    label,
                    rawHref,
                ),
        });
        const blocks = analysis.blocks.flatMap(collectBlocks);
        const blockIds = blocks.map((block) => block.id);
        const headingIds = analysis.headings.map((heading) => heading.id);
        const tableOfContentsItems = flattenTableOfContents(
            analysis.tableOfContents,
        );
        const serializedAnalysis = JSON.stringify(analysis);

        if (analysis.blocks.length === 0 || analysis.headings.length === 0) {
            errors.push(`${entry.slug} ne produit aucune matière lisible`);
        }

        if (new Set(blockIds).size !== blockIds.length) {
            errors.push(
                `${entry.slug} produit des identifiants de blocs dupliqués`,
            );
        }

        if (new Set(headingIds).size !== headingIds.length) {
            errors.push(
                `${entry.slug} produit des ancres de titres dupliquées`,
            );
        }

        if (tableOfContentsItems.length !== analysis.headings.length) {
            errors.push(`${entry.slug} perd des titres dans son sommaire`);
        }

        if (blocks.some((block) => block.kind === "unsupported")) {
            errors.push(
                `${entry.slug} contient un bloc réel non pris en charge`,
            );
        }

        if (
            blocks.some(
                (block) =>
                    block.kind === "code" &&
                    block.presentation === "ascii" &&
                    !block.alternative?.trim(),
            )
        ) {
            errors.push(
                `${entry.slug} contient une carte ASCII sans alternative accessible`,
            );
        }

        if (
            serializedAnalysis.includes('"position"') ||
            serializedAnalysis.includes('"relativePath"') ||
            serializedAnalysis.includes('"filePath"')
        ) {
            errors.push(
                `${entry.slug} expose des détails techniques de l’AST ou du dépôt`,
            );
        }

        if (
            analysis.links.some(
                (link) => link.state === "restricted" && link.href !== null,
            )
        ) {
            errors.push(`${entry.slug} rend navigable un lien restreint`);
        }

        realStatistics.blocks += blocks.length;
        realStatistics.headings += analysis.headings.length;
        realStatistics.links += analysis.links.length;
        realStatistics.ascii += blocks.filter(
            (block) => block.kind === "code" && block.presentation === "ascii",
        ).length;
        realStatistics.restricted += analysis.links.filter(
            (link) => link.state === "restricted",
        ).length;
    }

    if (realStatistics.ascii === 0) {
        errors.push(
            "Aucune carte ASCII réelle n’est reconnue dans le Guidebook",
        );
    }

    if (realStatistics.restricted === 0) {
        errors.push("Aucun lien privé réel n’est neutralisé dans le Guidebook");
    }

    return realStatistics;
}

async function verify() {
    const errors = [];
    let localDocumentCount = 0;
    let markdownStatistics = null;

    try {
        localDocumentCount = await verifyLocalLibrary(errors);
        await verifyNotionAuthorization(errors);
        markdownStatistics = await verifyMarkdownAnalysis(errors);
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
        `Guidebook vérifié : ${localDocumentCount} documents locaux, ${markdownStatistics.blocks} blocs, ${markdownStatistics.headings} titres, ${markdownStatistics.links} liens et ${markdownStatistics.ascii} compositions ASCII ; frontière studio fermée et double autorisation Notion éprouvée.`,
    );
}

await verify();
