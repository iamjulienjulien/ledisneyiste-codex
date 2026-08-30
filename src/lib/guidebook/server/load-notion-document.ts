import "server-only";
import type {
    GuidebookBlock,
    GuidebookDocument,
    GuidebookLink,
} from "@/types/guidebook";
import { analyzeGuidebookMarkdown } from "@/lib/guidebook/analyze-markdown";
import {
    flattenGuidebookNavigation,
    notionGuidebookProjection,
} from "@/registry/guidebook";
import { normalizeNotionMarkdown } from "./normalize-notion-markdown";
import { normalizeNotionPageId } from "./notion-identifiers";
import { notionGuidebookManifest } from "./notion-manifest";
import {
    GuidebookNotionResolutionError,
    resolveNotionGuidebookDocument,
} from "./resolve-notion-document";
import { resolveNotionGuidebookLink } from "./resolve-notion-link";

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

function getNotionGuidebookTitle(slug: string): string {
    return (
        flattenGuidebookNavigation(notionGuidebookProjection.nodes).find(
            (node) => node.slug === slug,
        )?.title ?? slug
    );
}

function getPageTitlesById(): Readonly<Record<string, string>> {
    const titlesBySlug = new Map(
        flattenGuidebookNavigation(notionGuidebookProjection.nodes).map(
            (node) => [node.slug, node.title],
        ),
    );

    return Object.fromEntries(
        notionGuidebookManifest.entries.flatMap((entry) => {
            const pageId = normalizeNotionPageId(entry.pageId);
            const title = titlesBySlug.get(entry.slug);

            return pageId && title ? [[pageId, title]] : [];
        }),
    );
}

export async function loadNotionGuidebookDocument(
    slug: string,
    {
        resolveLink = resolveNotionGuidebookLink,
    }: Readonly<{
        resolveLink?: (
            currentSlug: string,
            label: string,
            rawHref: string,
        ) => GuidebookLink;
    }> = {},
): Promise<GuidebookDocument> {
    const title = getNotionGuidebookTitle(slug);

    try {
        const resolved = await resolveNotionGuidebookDocument(slug);
        const normalized = normalizeNotionMarkdown(resolved.content, {
            pageTitlesById: getPageTitlesById(),
        });
        const analysis = analyzeGuidebookMarkdown({
            slug,
            markdown: normalized.markdown,
            resolveLink,
        });
        const warnings = [
            ...new Set([...normalized.warnings, ...analysis.warnings]),
        ];
        const containsUnsupported = analysis.blocks.some(
            containsUnsupportedBlock,
        );
        const isPartial =
            resolved.truncated ||
            resolved.unknownBlockCount > 0 ||
            normalized.warnings.length > 0 ||
            containsUnsupported;

        return {
            slug,
            title,
            source: "notion",
            state:
                normalized.markdown.length === 0
                    ? "empty"
                    : isPartial
                      ? "partial"
                      : "ready",
            analysis: { ...analysis, warnings },
            ...(resolved.updatedAt ? { updatedAt: resolved.updatedAt } : {}),
        };
    } catch (error) {
        if (error instanceof GuidebookNotionResolutionError) {
            return {
                slug,
                title,
                source: "notion",
                state: error.state,
                analysis: null,
            };
        }

        return {
            slug,
            title,
            source: "notion",
            state: "unavailable",
            analysis: null,
        };
    }
}
