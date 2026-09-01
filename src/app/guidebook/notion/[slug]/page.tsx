import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadNotionGuidebookDocument } from "@/lib/guidebook/server/load-notion-document";
import { GuidebookProjection } from "../../_components/GuidebookProjection";
import {
    getGuidebookNode,
    getGuidebookSlugs,
} from "../../_lib/guidebook-routing";

type NotionGuidebookPageProps = Readonly<{
    params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
    return getGuidebookSlugs("notion").map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: NotionGuidebookPageProps): Promise<Metadata> {
    const { slug } = await params;
    const node = getGuidebookNode("notion", slug);

    return {
        title: node?.title ?? "Document introuvable",
        robots: { index: false, follow: false },
    };
}

export default async function NotionGuidebookDocumentPage({
    params,
}: NotionGuidebookPageProps) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const { slug } = await params;

    if (!getGuidebookNode("notion", slug)) {
        notFound();
    }

    const document = await loadNotionGuidebookDocument(slug);

    return <GuidebookProjection source="notion" document={document} />;
}
