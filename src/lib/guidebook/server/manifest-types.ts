import "server-only";

export type GuidebookLocalManifestEntry = {
    slug: string;
    relativePath: string;
};

export type GuidebookLocalManifest = {
    rootDirectory: string;
    entries: GuidebookLocalManifestEntry[];
};

export type GuidebookNotionManifestEntry = {
    slug: string;
    pageId: string;
};

export type GuidebookNotionManifest = {
    authorizedRootPageId: string;
    apiVersion: "2026-03-11";
    maxAncestorDepth: number;
    entries: GuidebookNotionManifestEntry[];
};
