import type {
    CodexPlanArchives,
    CodexPlanCredit,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
} from "@/types/codex-plans";
import {
    createDerivationResult,
    createPublishedReference,
    createReference,
    editorialProvenance,
    unresolvedReferenceNotice,
} from "@/lib/plans/utils";

export function derivePlanCredits(
    archives: CodexPlanArchives,
    options: CodexPlanDerivationOptions = {},
): CodexPlanDerivationResult<CodexPlanCredit> {
    const credits: CodexPlanCredit[] = [];
    const notices: CodexPlanDerivationNotice[] = [];

    for (const work of archives.fiches.oeuvres) {
        const workReference = createPublishedReference(
            "oeuvre",
            work.slug,
            archives,
        );

        work.contributions.forEach((contribution, index) => {
            const contributor = createReference(
                contribution.contributeur,
                archives,
            );
            const id = `credit:${work.slug}:${contributor.id}:${index}`;
            const credit: CodexPlanCredit = {
                id,
                work: workReference,
                contributor,
                roles: [...contribution.roles],
                ...(contribution.domaine
                    ? { domain: contribution.domaine }
                    : {}),
                provenance: [
                    editorialProvenance(
                        work.sources,
                        "Crédit déclaré dans la fiche de l’œuvre ; les sources sont rattachées à la fiche complète et non à chaque ligne du générique.",
                    ),
                ],
            };

            credits.push(credit);

            const notice = unresolvedReferenceNotice(contributor, id);
            if (notice) {
                notices.push(notice);
            }
        });
    }

    return createDerivationResult(credits, options, notices);
}
