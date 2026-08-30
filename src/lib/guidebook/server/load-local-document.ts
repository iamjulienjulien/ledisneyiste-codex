import "server-only";
import type { GuidebookBlock, GuidebookDocument } from "@/types/guidebook";
import { analyzeGuidebookMarkdown } from "@/lib/guidebook/analyze-markdown";
import {
    flattenGuidebookNavigation,
    guidebookProjection,
} from "@/registry/guidebook";
import { resolveLocalGuidebookLink } from "./resolve-link";
import {
    GuidebookDocumentResolutionError,
    resolveLocalGuidebookDocument,
} from "./resolve-local-document";

function getGuidebookTitle(slug: string): string {
    return (
        flattenGuidebookNavigation(guidebookProjection.nodes).find(
            (node) => node.slug === slug,
        )?.title ?? slug
    );
}

function containsUnsupportedBlock(block: GuidebookBlock): boolean {
    if (block.kind === "unsupported") {
        return true;
    }

    if (block.kind === "blockquote") {
        return block.blocks.some(containsUnsupportedBlock);
    }

    if (block.kind === "list") {
        return block.items.some(
            (item) =>
                item.blocks.some(containsUnsupportedBlock) ||
                item.children.some(containsUnsupportedBlock),
        );
    }

    return false;
}

export async function loadLocalGuidebookDocument(
    slug: string,
): Promise<GuidebookDocument> {
    const title = getGuidebookTitle(slug);

    try {
        const resolved = await resolveLocalGuidebookDocument(slug);
        const analysis = analyzeGuidebookMarkdown({
            slug,
            markdown: resolved.content,
            resolveLink: resolveLocalGuidebookLink,
        });
        const isPartial = analysis.blocks.some(containsUnsupportedBlock);

        return {
            slug,
            title,
            source: "local",
            state:
                resolved.content.trim().length === 0
                    ? "empty"
                    : isPartial
                      ? "partial"
                      : "ready",
            analysis,
            updatedAt: resolved.updatedAt,
        };
    } catch (error) {
        if (error instanceof GuidebookDocumentResolutionError) {
            return {
                slug,
                title,
                source: "local",
                state: error.state,
                analysis: null,
            };
        }

        return {
            slug,
            title,
            source: "local",
            state: "unavailable",
            analysis: null,
        };
    }
}
