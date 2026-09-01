import { PixieMarkdown } from "@/components/ui/PixieMarkdown";
import type {
    GuidebookBlock,
    GuidebookDocument,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";
import {
    getGuidebookDestinations,
    getGuidebookNavigation,
    getGuidebookProjection,
    type GuidebookRouteSource,
} from "../_lib/guidebook-routing";
import { GuidebookReader } from "./GuidebookReader";

function removeDocumentTitle(blocks: readonly GuidebookBlock[]) {
    const firstBlock = blocks[0];

    return firstBlock?.kind === "heading" && firstBlock.heading.depth === 1
        ? blocks.slice(1)
        : blocks;
}

function removeDocumentTitleFromTableOfContents(
    tableOfContents: readonly GuidebookTableOfContentsItem[],
): GuidebookTableOfContentsItem[] {
    const firstItem = tableOfContents[0];

    if (firstItem?.depth !== 1) {
        return [...tableOfContents];
    }

    return [...firstItem.children, ...tableOfContents.slice(1)];
}

function formatUpdatedAt(updatedAt: string | undefined): string | null {
    if (!updatedAt) {
        return null;
    }

    const date = new Date(updatedAt);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
        timeZone: "Europe/Paris",
    }).format(date);
}

export function GuidebookProjection({
    source,
    document,
}: Readonly<{
    source: GuidebookRouteSource;
    document: GuidebookDocument;
}>) {
    const projection = getGuidebookProjection(source);
    const navigation = getGuidebookNavigation(source);
    const destinations = getGuidebookDestinations(source, document.slug);
    const analysis = document.analysis;
    const updatedAt = formatUpdatedAt(document.updatedAt);
    const sourceLabel = source === "notion" ? "Dossier Notion" : "Guide local";

    return (
        <GuidebookReader
            title={projection.title}
            navigation={navigation}
            activeSlug={document.slug}
            documentTitle={document.title}
            document={
                analysis ? (
                    <PixieMarkdown
                        blocks={removeDocumentTitle(analysis.blocks)}
                        measure="wide"
                        density="comfortable"
                        headingOffset={0}
                        headingScale="reading"
                        headingAnchors
                        anchorPrefix=""
                        wideBlocks="frame"
                        codeOverflow="scroll"
                        tableLayout="auto"
                        asciiCopyable
                    />
                ) : null
            }
            tableOfContents={
                analysis
                    ? removeDocumentTitleFromTableOfContents(
                          analysis.tableOfContents,
                      )
                    : []
            }
            documentState={document.state}
            documentEyebrow={sourceLabel}
            documentSummary={
                source === "notion"
                    ? "Une page déclarée dans l’arborescence transmissible du Disneyiste."
                    : "Un chapitre du guide de transmission destiné aux agents du Codex."
            }
            documentMeta={
                updatedAt ? `Source mise à jour le ${updatedAt}` : sourceLabel
            }
            previous={destinations.previous}
            next={destinations.next}
            density="comfortable"
            navigationWidth="lg"
            toc="visible"
            sticky
            filterable
            filterLabel="Filtrer cette bibliothèque"
            filterPlaceholder="Nom d’un chapitre…"
            navigationLabel="Parcourir le Guidebook"
            tableOfContentsLabel="Dans ce document"
            headingLevel={1}
        />
    );
}
