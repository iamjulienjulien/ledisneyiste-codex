import "server-only";
import {
    flattenGuidebookNavigation,
    notionGuidebookProjection,
} from "@/registry/guidebook";
import type { GuidebookDocumentState } from "@/types/guidebook";
import { isNotionGuidebookPageAuthorized } from "./authorize-notion-page";
import {
    NotionGuidebookClientError,
    retrieveNotionPageMarkdown,
    retrieveNotionPageMetadata,
} from "./notion-client";
import { normalizeNotionPageId } from "./notion-identifiers";
import { notionGuidebookManifest } from "./notion-manifest";

export type ResolvedNotionGuidebookDocument = Readonly<{
    slug: string;
    content: string;
    updatedAt?: string;
    truncated: boolean;
    unknownBlockCount: number;
}>;

export class GuidebookNotionResolutionError extends Error {
    constructor(
        public readonly state: Extract<
            GuidebookDocumentState,
            "deferred" | "missing" | "restricted" | "unavailable"
        >,
        message: string,
    ) {
        super(message);
        this.name = "GuidebookNotionResolutionError";
    }
}

function forwardClientError(error: unknown): never {
    if (error instanceof NotionGuidebookClientError) {
        throw new GuidebookNotionResolutionError(error.state, error.message);
    }

    throw new GuidebookNotionResolutionError(
        "unavailable",
        "La passerelle Notion n’a pas pu résoudre le document.",
    );
}

export async function resolveNotionGuidebookDocument(
    slug: string,
): Promise<ResolvedNotionGuidebookDocument> {
    const entry = notionGuidebookManifest.entries.find(
        (candidate) => candidate.slug === slug,
    );

    if (!entry) {
        throw new GuidebookNotionResolutionError(
            "missing",
            `Document Notion inconnu : ${slug}`,
        );
    }

    const declaredProjectionSlugs = new Set(
        flattenGuidebookNavigation(notionGuidebookProjection.nodes).map(
            (node) => node.slug,
        ),
    );
    const pageId = normalizeNotionPageId(entry.pageId);
    const authorizedRootPageId = normalizeNotionPageId(
        notionGuidebookManifest.authorizedRootPageId,
    );

    if (!pageId || !authorizedRootPageId) {
        throw new GuidebookNotionResolutionError(
            "unavailable",
            "Le manifeste serveur Notion contient un identifiant invalide.",
        );
    }

    try {
        const page = await retrieveNotionPageMetadata(pageId);
        const ancestorPageIds: string[] = [];
        let parentPageId = page.parentPageId;

        for (
            let depth = 0;
            parentPageId && depth < notionGuidebookManifest.maxAncestorDepth;
            depth += 1
        ) {
            ancestorPageIds.push(parentPageId);

            if (parentPageId === authorizedRootPageId) {
                break;
            }

            const parent = await retrieveNotionPageMetadata(parentPageId);
            parentPageId = parent.parentPageId;
        }

        const authorized = isNotionGuidebookPageAuthorized({
            manifest: notionGuidebookManifest,
            declaredProjectionSlugs,
            slug,
            pageId,
            ancestorPageIds,
        });

        if (!authorized) {
            throw new GuidebookNotionResolutionError(
                "restricted",
                "La page Notion reste hors de la projection déclarée.",
            );
        }

        const remoteDocument = await retrieveNotionPageMarkdown(pageId);

        return {
            slug,
            content: remoteDocument.markdown,
            truncated: remoteDocument.truncated,
            unknownBlockCount: remoteDocument.unknownBlockCount,
            ...(page.updatedAt ? { updatedAt: page.updatedAt } : {}),
        };
    } catch (error) {
        if (error instanceof GuidebookNotionResolutionError) {
            throw error;
        }

        return forwardClientError(error);
    }
}
