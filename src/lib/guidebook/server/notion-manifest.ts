import "server-only";
import type { GuidebookNotionManifest } from "./manifest-types";

export const notionGuidebookManifest = {
    authorizedRootPageId: "343092fa3223806ea370cfe30eab948a",
    entries: [],
} satisfies GuidebookNotionManifest;

export const notionGuidebookStatus = "deferred" as const;
