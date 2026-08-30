import "server-only";
import path from "node:path";
import type { GuidebookLink } from "@/types/guidebook";
import { localGuidebookManifest } from "./local-manifest";

const externalProtocols = new Set(["http:", "https:", "mailto:"]);

export function resolveLocalGuidebookLink(
    currentSlug: string,
    label: string,
    rawHref: string,
): GuidebookLink {
    if (rawHref.startsWith("#")) {
        return { label, href: rawHref, state: "anchor" };
    }

    try {
        const url = new URL(rawHref);

        if (externalProtocols.has(url.protocol)) {
            return { label, href: url.toString(), state: "external" };
        }

        return { label, href: null, state: "invalid" };
    } catch {
        // Les chemins relatifs sont résolus uniquement contre le manifeste privé.
    }

    const currentEntry = localGuidebookManifest.entries.find(
        (entry) => entry.slug === currentSlug,
    );

    if (!currentEntry) {
        return { label, href: null, state: "invalid" };
    }

    const [pathPart, fragment] = rawHref.split("#", 2);
    const normalizedPath = path.posix.normalize(
        path.posix.join(
            path.posix.dirname(currentEntry.relativePath),
            pathPart,
        ),
    );
    const targetEntry = localGuidebookManifest.entries.find(
        (entry) => entry.relativePath === normalizedPath,
    );

    if (!targetEntry) {
        return { label, href: null, state: "restricted" };
    }

    const href = `/guidebook/${targetEntry.slug}${fragment ? `#${fragment}` : ""}`;

    return {
        label,
        href,
        state: "internal",
        targetSlug: targetEntry.slug,
    };
}
