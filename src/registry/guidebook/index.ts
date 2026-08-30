import projection from "./guidebook-projection.json";
import notionProjection from "./notion-projection.json";
import type {
    GuidebookNavigationNode,
    GuidebookProjectionTree,
} from "@/types/guidebook";

function isNavigationNode(value: unknown): value is GuidebookNavigationNode {
    if (!value || typeof value !== "object") {
        return false;
    }

    const node = value as Partial<GuidebookNavigationNode>;

    return (
        typeof node.slug === "string" &&
        typeof node.title === "string" &&
        typeof node.order === "number" &&
        Array.isArray(node.children) &&
        node.children.every(isNavigationNode)
    );
}

function isProjectionTree(value: unknown): value is GuidebookProjectionTree {
    if (!value || typeof value !== "object") {
        return false;
    }

    const tree = value as Partial<GuidebookProjectionTree>;

    return (
        tree.version === 1 &&
        typeof tree.title === "string" &&
        Array.isArray(tree.nodes) &&
        tree.nodes.every(isNavigationNode)
    );
}

if (!isProjectionTree(projection)) {
    throw new Error("L’arborescence de projection du Guidebook est invalide.");
}

if (!isProjectionTree(notionProjection)) {
    throw new Error(
        "L’arborescence de projection Notion du Guidebook est invalide.",
    );
}

export const guidebookProjection: GuidebookProjectionTree = projection;
export const notionGuidebookProjection: GuidebookProjectionTree =
    notionProjection;

export function flattenGuidebookNavigation(
    nodes: GuidebookNavigationNode[] = guidebookProjection.nodes,
): GuidebookNavigationNode[] {
    return nodes.flatMap((node) => [
        node,
        ...flattenGuidebookNavigation(node.children),
    ]);
}
