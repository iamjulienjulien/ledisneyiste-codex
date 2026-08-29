import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtelierPlanDossier } from "@/components/atelier/AtelierPlanDossier";
import { getCodexPlan, getCodexPlans, isCodexPlanSlug } from "@/registry/plans";

type AtelierPlanPageProps = Readonly<{
    params: Promise<{
        slug: string;
    }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
    return getCodexPlans().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: AtelierPlanPageProps): Promise<Metadata> {
    const { slug } = await params;

    if (!isCodexPlanSlug(slug)) {
        return {};
    }

    const plan = getCodexPlan(slug);

    return {
        title: `${plan.label} · Les Plans · L’Atelier`,
        description: plan.description,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function AtelierPlanPage({
    params,
}: AtelierPlanPageProps) {
    const { slug } = await params;

    if (!isCodexPlanSlug(slug)) {
        notFound();
    }

    return <AtelierPlanDossier slug={slug} plan={getCodexPlan(slug)} />;
}
