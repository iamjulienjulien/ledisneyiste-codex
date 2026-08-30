import "server-only";
import type { ReactNode } from "react";
import type { PixieDocsNavigationItem } from "@/components/ui/PixieDocs";
import { PixieMarkdown } from "@/components/ui/PixieMarkdown";
import { loadLocalGuidebookDocument } from "@/lib/guidebook/server/load-local-document";
import { guidebookProjection } from "@/registry/guidebook";
import type {
    GuidebookDocumentState,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";

export type PixieDocsFixture = Readonly<{
    slug: string;
    title: string;
    summary: string;
    sourceLabel: string;
    state: GuidebookDocumentState;
    updatedAt?: string;
    document: ReactNode;
    tableOfContents: readonly GuidebookTableOfContentsItem[];
}>;

const summaries = {
    bienvenue:
        "Le clap d’ouverture : identité, ordre de lecture et premiers réflexes avant de toucher au Codex.",
    "esprit-du-projet":
        "La philosophie documentaire, la voix du projet et les limites qui protègent sa magie.",
    "architecture-du-codex":
        "Les catalogues, les relations et les sources qui composent la machine à raconter.",
    "direction-artistique-et-ui":
        "La salle, ses lumières, ses palettes et ses règles de composition communes.",
    "design-system-pixie":
        "Le registre vivant des composants Pixie prêts à entrer dans la projection.",
    "symboles-registres-et-collections":
        "Les signes originaux, leurs collections et le chemin sûr qui les mène à l’interface.",
    "plans-et-lectures-derivees":
        "Les cinq grammaires documentaires qui donnent aux Archives de nouvelles manières d’être regardées.",
} as const;

function withoutDocumentTitle(
    document: Awaited<ReturnType<typeof loadLocalGuidebookDocument>>,
) {
    const blocks = document.analysis?.blocks ?? [];
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

function hrefFor(slug: string, anchor: string) {
    return `#${anchor}-${slug}`;
}

export function getPixieDocsNavigation(
    anchor: string,
): readonly PixieDocsNavigationItem[] {
    const document = (slug: keyof typeof summaries) => {
        const node = guidebookProjection.nodes.find(
            (candidate) => candidate.slug === slug,
        );

        return {
            slug,
            title: node?.title ?? slug,
            href: hrefFor(slug, anchor),
        } satisfies PixieDocsNavigationItem;
    };

    return [
        document("bienvenue"),
        {
            slug: "fondations",
            title: "I · Les fondations du Codex",
            href: null,
            children: [
                document("esprit-du-projet"),
                document("architecture-du-codex"),
            ],
        },
        {
            slug: "mise-en-scene",
            title: "II · Mettre la matière en scène",
            href: null,
            children: [
                document("direction-artistique-et-ui"),
                document("design-system-pixie"),
                document("symboles-registres-et-collections"),
            ],
        },
        {
            slug: "regarder-autrement",
            title: "III · Regarder autrement",
            href: null,
            children: [document("plans-et-lectures-derivees")],
        },
        {
            slug: "coulisses-du-studio",
            title: "Coulisses de Guru Éditions",
            href: null,
            state: "restricted",
            children: [],
        },
    ];
}

export function getPixieDocsDenseNavigation(
    anchor: string,
): readonly PixieDocsNavigationItem[] {
    const published = guidebookProjection.nodes.map((node) => ({
        slug: node.slug,
        title: node.title,
        href: hrefFor(node.slug, anchor),
    }));
    const unavailableTitles = [
        "Manuel très long des raccords, contrechamps et décisions qui doivent rester lisibles même lorsque la bobine déborde",
        "Registre des projections anciennes",
        "Carnet des essais chromatiques",
        "Inventaire des scènes différées",
        "Correspondances documentaires",
        "Lexique des gestes du studio",
        "Chronologie des arbitrages",
        "Atlas des sources consultées",
    ];
    let publishedIndex = 0;

    return Array.from({ length: 5 }, (_, groupIndex) => ({
        slug: `bobine-${groupIndex + 1}`,
        title: `${String(groupIndex + 1).padStart(2, "0")} · Bobine témoin`,
        href: null,
        children: Array.from({ length: 8 }, (_, itemIndex) => {
            const publishedItem = published[publishedIndex];

            if (publishedItem) {
                publishedIndex += 1;
                return publishedItem;
            }

            const fixtureIndex = groupIndex * 8 + itemIndex;
            return {
                slug: `fixture-${fixtureIndex + 1}`,
                title:
                    unavailableTitles[
                        fixtureIndex % unavailableTitles.length
                    ] ?? `Document témoin ${fixtureIndex + 1}`,
                href: null,
                state: "unavailable" as const,
            };
        }),
    }));
}

export async function getPixieDocsFixtures(
    anchor: string,
): Promise<readonly PixieDocsFixture[]> {
    return Promise.all(
        guidebookProjection.nodes.map(async (node) => {
            const document = await loadLocalGuidebookDocument(node.slug);
            const anchorPrefix = `${anchor}-${node.slug}`;
            const blocks = withoutDocumentTitle(document);
            const tableOfContents = prefixTableOfContents(
                withoutDocumentTitleInToc(
                    document.analysis?.tableOfContents ?? [],
                ),
                anchorPrefix,
            );

            return {
                slug: node.slug,
                title: node.title,
                summary:
                    summaries[node.slug as keyof typeof summaries] ??
                    "Un chapitre transmissible du Guidebook.",
                sourceLabel: "docs/agents",
                state: document.state,
                updatedAt: document.updatedAt,
                document: (
                    <PixieMarkdown
                        blocks={blocks}
                        headingOffset={3}
                        headingScale="reading"
                        anchorPrefix={anchorPrefix}
                        measure="wide"
                    />
                ),
                tableOfContents,
            };
        }),
    );
}
