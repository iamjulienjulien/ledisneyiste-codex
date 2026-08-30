import "server-only";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { localGuidebookManifest } from "./local-manifest";

export type ResolvedLocalGuidebookDocument = {
    slug: string;
    content: string;
    updatedAt: string;
};

export class GuidebookDocumentResolutionError extends Error {
    constructor(
        public readonly state: "missing" | "restricted" | "unavailable",
        message: string,
    ) {
        super(message);
        this.name = "GuidebookDocumentResolutionError";
    }
}

export function isPathInsideDirectory(
    rootDirectory: string,
    candidatePath: string,
): boolean {
    const relativePath = path.relative(rootDirectory, candidatePath);

    return (
        relativePath.length > 0 &&
        !relativePath.startsWith(`..${path.sep}`) &&
        relativePath !== ".." &&
        !path.isAbsolute(relativePath)
    );
}

export async function resolveLocalGuidebookDocument(
    slug: string,
): Promise<ResolvedLocalGuidebookDocument> {
    const entry = localGuidebookManifest.entries.find(
        (candidate) => candidate.slug === slug,
    );

    if (!entry) {
        throw new GuidebookDocumentResolutionError(
            "missing",
            `Document Guidebook inconnu : ${slug}`,
        );
    }

    const declaredRoot = path.join(process.cwd(), "docs", "agents");

    if (
        path.normalize(localGuidebookManifest.rootDirectory) !==
        path.join("docs", "agents")
    ) {
        throw new GuidebookDocumentResolutionError(
            "unavailable",
            "La racine du manifeste Guidebook ne correspond plus à la frontière traçable",
        );
    }

    let resolvedRoot: string;
    let resolvedFile: string;

    try {
        resolvedRoot = await realpath(declaredRoot);
        resolvedFile = await realpath(
            path.join(resolvedRoot, entry.relativePath),
        );
    } catch {
        throw new GuidebookDocumentResolutionError(
            "missing",
            `Fichier Guidebook introuvable : ${slug}`,
        );
    }

    if (
        path.extname(resolvedFile).toLowerCase() !== ".md" ||
        !isPathInsideDirectory(resolvedRoot, resolvedFile)
    ) {
        throw new GuidebookDocumentResolutionError(
            "restricted",
            `Document Guidebook hors de la racine autorisée : ${slug}`,
        );
    }

    try {
        const [content, fileStats] = await Promise.all([
            readFile(resolvedFile, "utf8"),
            stat(resolvedFile),
        ]);

        return {
            slug,
            content,
            updatedAt: fileStats.mtime.toISOString(),
        };
    } catch {
        throw new GuidebookDocumentResolutionError(
            "unavailable",
            `Document Guidebook indisponible : ${slug}`,
        );
    }
}
