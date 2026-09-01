import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadLocalGuidebookDocument } from "@/lib/guidebook/server/load-local-document";
import { GuidebookProjection } from "../_components/GuidebookProjection";
import { getGuidebookNode, getGuidebookSlugs } from "../_lib/guidebook-routing";

type GuidebookPageProps = Readonly<{
    params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
    return getGuidebookSlugs("local").map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: GuidebookPageProps): Promise<Metadata> {
    const { slug } = await params;
    const node = getGuidebookNode("local", slug);

    return {
        title: node?.title ?? "Document introuvable",
        robots: { index: false, follow: false },
    };
}

export default async function LocalGuidebookPage({
    params,
}: GuidebookPageProps) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const { slug } = await params;

    if (!getGuidebookNode("local", slug)) {
        notFound();
    }

    const document = await loadLocalGuidebookDocument(slug);

    return <GuidebookProjection source="local" document={document} />;
}
