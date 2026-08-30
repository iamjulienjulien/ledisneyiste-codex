import "server-only";
import type { GuidebookLink } from "@/types/guidebook";
import { resolveGuidebookLink } from "@/lib/guidebook/resolve-link";
import { localGuidebookManifest } from "./local-manifest";

export function resolveLocalGuidebookLink(
    currentSlug: string,
    label: string,
    rawHref: string,
): GuidebookLink {
    return resolveGuidebookLink(
        localGuidebookManifest.entries,
        currentSlug,
        label,
        rawHref,
    );
}
