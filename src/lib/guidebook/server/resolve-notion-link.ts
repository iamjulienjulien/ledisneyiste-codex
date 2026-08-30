import "server-only";
import type { GuidebookLink } from "@/types/guidebook";
import {
    flattenGuidebookNavigation,
    notionGuidebookProjection,
} from "@/registry/guidebook";
import { normalizeNotionPageId } from "./notion-identifiers";
import { extractNotionPageId } from "./normalize-notion-markdown";
import { notionGuidebookManifest } from "./notion-manifest";

const externalProtocols = new Set(["http:", "https:", "mailto:"]);

export function resolveNotionGuidebookLink(
    _currentSlug: string,
    label: string,
    rawHref: string,
): GuidebookLink {
    if (rawHref.startsWith("#")) {
        return { label, href: rawHref, state: "anchor" };
    }

    const targetPageId = extractNotionPageId(rawHref);

    if (targetPageId) {
        const projectionSlugs = new Set(
            flattenGuidebookNavigation(notionGuidebookProjection.nodes).map(
                (node) => node.slug,
            ),
        );
        const targetEntry = notionGuidebookManifest.entries.find(
            (entry) => normalizeNotionPageId(entry.pageId) === targetPageId,
        );

        if (!targetEntry || !projectionSlugs.has(targetEntry.slug)) {
            return { label, href: null, state: "restricted" };
        }

        return {
            label,
            href: `/guidebook/notion/${targetEntry.slug}`,
            state: "internal",
            targetSlug: targetEntry.slug,
        };
    }

    try {
        const url = new URL(rawHref);

        return externalProtocols.has(url.protocol)
            ? { label, href: url.toString(), state: "external" }
            : { label, href: null, state: "invalid" };
    } catch {
        return { label, href: null, state: "restricted" };
    }
}
