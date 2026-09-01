import type {
    PixieDocsDestination,
    PixieDocsNavigationItem,
} from "@/components/ui/PixieDocs";
import {
    flattenGuidebookNavigation,
    guidebookProjection,
    notionGuidebookProjection,
} from "@/registry/guidebook";
import type {
    GuidebookNavigationNode,
    GuidebookProjectionTree,
} from "@/types/guidebook";

export type GuidebookRouteSource = "local" | "notion";

export function getGuidebookProjection(
    source: GuidebookRouteSource,
): GuidebookProjectionTree {
    return source === "notion"
        ? notionGuidebookProjection
        : guidebookProjection;
}

export function getGuidebookHref(
    source: GuidebookRouteSource,
    slug: string,
): string {
    return source === "notion"
        ? `/guidebook/notion/${slug}`
        : `/guidebook/${slug}`;
}

function toNavigationItem(
    source: GuidebookRouteSource,
    node: GuidebookNavigationNode,
): PixieDocsNavigationItem {
    return {
        slug: node.slug,
        title: node.title,
        href: getGuidebookHref(source, node.slug),
        children: [...node.children]
            .sort((first, second) => first.order - second.order)
            .map((child) => toNavigationItem(source, child)),
    };
}

export function getGuidebookNavigation(
    source: GuidebookRouteSource,
): PixieDocsNavigationItem[] {
    return [...getGuidebookProjection(source).nodes]
        .sort((first, second) => first.order - second.order)
        .map((node) => toNavigationItem(source, node));
}

export function getGuidebookSlugs(source: GuidebookRouteSource): string[] {
    const projection = getGuidebookProjection(source);

    return flattenGuidebookNavigation(projection.nodes).map(
        (node) => node.slug,
    );
}

export function getGuidebookNode(
    source: GuidebookRouteSource,
    slug: string,
): GuidebookNavigationNode | null {
    const projection = getGuidebookProjection(source);

    return (
        flattenGuidebookNavigation(projection.nodes).find(
            (node) => node.slug === slug,
        ) ?? null
    );
}

export function getGuidebookDestinations(
    source: GuidebookRouteSource,
    slug: string,
): Readonly<{
    previous: PixieDocsDestination | null;
    next: PixieDocsDestination | null;
}> {
    const projection = getGuidebookProjection(source);
    const nodes = flattenGuidebookNavigation(projection.nodes);
    const activeIndex = nodes.findIndex((node) => node.slug === slug);
    const toDestination = (
        node: GuidebookNavigationNode | undefined,
    ): PixieDocsDestination | null =>
        node
            ? {
                  slug: node.slug,
                  title: node.title,
                  href: getGuidebookHref(source, node.slug),
              }
            : null;

    return {
        previous: toDestination(nodes[activeIndex - 1]),
        next: toDestination(nodes[activeIndex + 1]),
    };
}
