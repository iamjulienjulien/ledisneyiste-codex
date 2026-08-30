import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PixieDustDocsNavigationItem } from "@/components/ui/PixieDustDocs";
import { PixieDustMarkdown } from "@/components/ui/PixieDustMarkdown";
import { analyzeGuidebookMarkdown } from "@/lib/guidebook/analyze-markdown";
import { loadNotionGuidebookDocument } from "@/lib/guidebook/server/load-notion-document";
import { normalizeNotionMarkdown } from "@/lib/guidebook/server/normalize-notion-markdown";
import { isNotionGuidebookConfigured } from "@/lib/guidebook/server/notion-client";
import { normalizeNotionPageId } from "@/lib/guidebook/server/notion-identifiers";
import { notionGuidebookManifest } from "@/lib/guidebook/server/notion-manifest";
import { resolveNotionGuidebookLink } from "@/lib/guidebook/server/resolve-notion-link";
import {
    flattenGuidebookNavigation,
    notionGuidebookProjection,
} from "@/registry/guidebook";
import type {
    GuidebookDocument,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";
import type { PixieDustDocsFixture } from "./PixieDustDocs.fixtures.server";

const summaries = {
    "le-disneyiste":
        "La racine autorisée du projet et le premier contrôle de son appartenance documentaire.",
    "vision-doctrine":
        "La salle des fondations réunit le regard, les principes et les limites qui doivent survivre aux changements de forme.",
    manifeste:
        "La raison d’être du Disneyiste et le texte de référence qui donne son cap au projet.",
    "disneyisme-hypothese-sociologique":
        "Le Disneyisme comme hypothèse sociologique, running-joke et méthode d’enquête.",
    "positionnement-editorial":
        "Le périmètre éditorial et le test qui transforme un sujet Disney en sujet Disneyiste.",
    "le-disneyiste-persona-regard":
        "La posture d’auteur : observateur impliqué, voix analytique et poussière d’étoiles.",
    "le-je-signe-julien-julien":
        "La voix personnelle de Julien, séparée du corpus et assumée par une signature réelle.",
    "parole-enfant-louise-enfance-transmission":
        "Une parole enfantine réelle, protégée et distinguée de l’interprétation adulte.",
    "doctrine-independance":
        "L’indépendance envers l’entreprise, le fandom, la nostalgie et le désir de reconnaissance.",
    "boussole-personnelle":
        "Les motifs intérieurs qui orientent le projet sans devenir une obligation éditoriale.",
    "pistes-a-eprouver-apres-fondations":
        "Une réserve active d’hypothèses que seul le terrain pourra promouvoir.",
} as const;

function withoutDocumentTitle(
    blocks: ReturnType<typeof analyzeGuidebookMarkdown>["blocks"],
) {
    const firstBlock = blocks[0];

    return firstBlock?.kind === "heading" && firstBlock.heading.depth === 1
        ? blocks.slice(1)
        : blocks;
}

function withoutDocumentTitleInToc(
    tableOfContents: readonly GuidebookTableOfContentsItem[],
) {
    const firstItem = tableOfContents[0];

    return firstItem?.depth === 1 && tableOfContents.length === 1
        ? firstItem.children
        : tableOfContents.filter((item) => item.depth > 1);
}

function prefixTableOfContents(
    items: readonly GuidebookTableOfContentsItem[],
    prefix: string,
): GuidebookTableOfContentsItem[] {
    return items.map((item) => ({
        ...item,
        id: `${prefix}-${item.id}`,
        children: prefixTableOfContents(item.children, prefix),
    }));
}

function pageTitlesById(): Readonly<Record<string, string>> {
    const titleBySlug = new Map(
        flattenGuidebookNavigation(notionGuidebookProjection.nodes).map(
            (node) => [node.slug, node.title],
        ),
    );

    return Object.fromEntries(
        notionGuidebookManifest.entries.flatMap((entry) => {
            const pageId = normalizeNotionPageId(entry.pageId);
            const title = titleBySlug.get(entry.slug);

            return pageId && title ? [[pageId, title]] : [];
        }),
    );
}

function navigationItems(
    anchor: string,
    nodes = notionGuidebookProjection.nodes,
): readonly PixieDustDocsNavigationItem[] {
    return nodes.map((node) => ({
        slug: node.slug,
        title: node.title,
        href: `#${anchor}-${node.slug}`,
        children: navigationItems(anchor, node.children),
    }));
}

export function getPixieDustDocsNotionNavigation(
    anchor: string,
): readonly PixieDustDocsNavigationItem[] {
    return navigationItems(anchor);
}

export function getPixieDustDocsNotionConnectionState() {
    return isNotionGuidebookConfigured() ? "configured" : "deferred";
}

export async function getPixieDustDocsNotionFixtures(
    anchor: string,
): Promise<readonly PixieDustDocsFixture[]> {
    const nodes = flattenGuidebookNavigation(notionGuidebookProjection.nodes);
    const resolveFixtureLink = (
        slug: string,
        label: string,
        rawHref: string,
    ) => {
        const resolved = resolveNotionGuidebookLink(slug, label, rawHref);

        return resolved.state === "internal" && resolved.targetSlug
            ? {
                  ...resolved,
                  href: `#${anchor}-${resolved.targetSlug}`,
              }
            : resolved;
    };
    const useLiveSource =
        process.env.NODE_ENV === "development" && isNotionGuidebookConfigured();
    const liveDocument: GuidebookDocument | null = useLiveSource
        ? await loadNotionGuidebookDocument("le-disneyiste", {
              resolveLink: resolveFixtureLink,
          })
        : null;
    const normalizedFixture = normalizeNotionMarkdown(
        await readFile(
            path.join(
                process.cwd(),
                "scripts/fixtures/guidebook/notion-markdown.fixture.md",
            ),
            "utf8",
        ),
        { pageTitlesById: pageTitlesById() },
    );

    return nodes.map((node) => {
        const anchorPrefix = `${anchor}-${node.slug}`;
        const currentLiveDocument =
            liveDocument?.slug === node.slug ? liveDocument : null;
        const analysis = currentLiveDocument
            ? currentLiveDocument.analysis
            : analyzeGuidebookMarkdown({
                  slug: node.slug,
                  markdown: normalizedFixture.markdown,
                  resolveLink: resolveFixtureLink,
              });
        const blocks = analysis?.blocks ?? [];
        const tableOfContents = analysis?.tableOfContents ?? [];

        return {
            slug: node.slug,
            title: node.title,
            summary:
                summaries[node.slug as keyof typeof summaries] ??
                "Une page Notion explicitement déclarée pour la projection.",
            sourceLabel: currentLiveDocument
                ? "Notion · API serveur"
                : "Notion · bobine hors ligne",
            state: currentLiveDocument?.state ?? "partial",
            ...(currentLiveDocument?.updatedAt
                ? { updatedAt: currentLiveDocument.updatedAt }
                : {}),
            document: (
                <PixieDustMarkdown
                    blocks={withoutDocumentTitle(blocks)}
                    headingOffset={3}
                    anchorPrefix={anchorPrefix}
                    measure="wide"
                />
            ),
            tableOfContents: prefixTableOfContents(
                withoutDocumentTitleInToc(tableOfContents),
                anchorPrefix,
            ),
        } satisfies PixieDustDocsFixture;
    });
}
