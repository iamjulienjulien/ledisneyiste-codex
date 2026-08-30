import "server-only";
import type { GuidebookNotionManifest } from "./manifest-types";

type AuthorizeNotionPageOptions = {
    manifest: GuidebookNotionManifest;
    declaredProjectionSlugs: ReadonlySet<string>;
    slug: string;
    pageId: string;
    ancestorPageIds: readonly string[];
};

export function isNotionGuidebookPageAuthorized({
    manifest,
    declaredProjectionSlugs,
    slug,
    pageId,
    ancestorPageIds,
}: AuthorizeNotionPageOptions): boolean {
    const manifestEntry = manifest.entries.find((entry) => entry.slug === slug);
    const belongsToAuthorizedRoot =
        pageId === manifest.authorizedRootPageId ||
        ancestorPageIds.includes(manifest.authorizedRootPageId);

    return Boolean(
        manifestEntry &&
        manifestEntry.pageId === pageId &&
        declaredProjectionSlugs.has(slug) &&
        belongsToAuthorizedRoot,
    );
}
