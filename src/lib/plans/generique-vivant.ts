import { derivePlanCredits } from "@/lib/plans/credits";
import {
    creditDomainOrder,
    getCreditDomainDefinition,
} from "@/registry/credits";
import type {
    CodexGeneriqueVivantContribution,
    CodexGeneriqueVivantGroup,
    CodexGeneriqueVivantMatterSource,
    CodexGeneriqueVivantModel,
    CodexPlanArchives,
    CodexPlanConfiguration,
    CodexPlanCredit,
    CodexPlanDerivationNotice,
    CodexPlanEntityReference,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";

const domainOrder = new Map<string, number>(
    creditDomainOrder.map((domain, index) => [domain, index]),
);

function normalizeSearch(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr")
        .replace(/\s+/g, " ")
        .trim();
}

function humanizeDomain(domain: string) {
    return domain
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toLocaleUpperCase("fr") + word.slice(1))
        .join(" ");
}

function getSubject(
    configuration: CodexPlanConfiguration,
    archives: CodexPlanArchives,
): CodexPlanEntityReference {
    const { family, slug } = configuration.subject;
    const definitions = {
        personnages: {
            kind: "personnage",
            entries: archives.catalogues.personnages,
        },
        createurs: {
            kind: "contributeur",
            entries: archives.catalogues.contributeurs,
        },
        oeuvres: { kind: "oeuvre", entries: archives.catalogues.oeuvres },
        epoques: { kind: "epoque", entries: archives.catalogues.epoques },
    } as const;
    const definition = definitions[family];
    const entry = definition.entries.find((item) => item.slug === slug);

    return {
        id: `${definition.kind}:${slug}`,
        kind: definition.kind,
        label: entry?.nom ?? slug,
        slug,
        resolved: entry !== undefined,
    };
}

function sortCredits(credits: readonly CodexPlanCredit[]) {
    return [...credits].sort((a, b) => {
        const domainDifference =
            (domainOrder.get(a.domain ?? "") ?? 99) -
            (domainOrder.get(b.domain ?? "") ?? 99);

        return (
            domainDifference ||
            a.contributor.label.localeCompare(b.contributor.label, "fr") ||
            a.id.localeCompare(b.id, "fr")
        );
    });
}

function createContribution(
    credit: CodexPlanCredit,
    allCredits: readonly CodexPlanCredit[],
): CodexGeneriqueVivantContribution {
    const domain = credit.domain ?? "non-classe";
    const definition = getCreditDomainDefinition(domain);
    const recurrenceWorkLabels = [
        ...new Set(
            allCredits
                .filter(
                    (candidate) =>
                        candidate.contributor.id === credit.contributor.id,
                )
                .map((candidate) => candidate.work.label),
        ),
    ].sort((a, b) => a.localeCompare(b, "fr"));

    return {
        id: credit.id,
        contributor: credit.contributor,
        work: credit.work,
        roles: [...credit.roles],
        domain,
        domainLabel: definition?.label ?? humanizeDomain(domain),
        actionLabel: definition?.actionLabel ?? "Contribuer",
        searchKey: normalizeSearch(
            [
                credit.contributor.label,
                credit.work.label,
                domain,
                definition?.label,
                ...credit.roles,
            ]
                .filter(Boolean)
                .join(" "),
        ),
        recurrenceWorkLabels,
        provenance: credit.provenance.map((item) => ({ ...item })),
    };
}

function createGroups(
    contributions: readonly CodexGeneriqueVivantContribution[],
): readonly CodexGeneriqueVivantGroup[] {
    const domains = [...new Set(contributions.map((item) => item.domain))].sort(
        (a, b) =>
            (domainOrder.get(a) ?? 99) - (domainOrder.get(b) ?? 99) ||
            a.localeCompare(b, "fr"),
    );

    return domains.map((domain) => {
        const items = contributions.filter((item) => item.domain === domain);

        return {
            id: domain,
            label: items[0]?.domainLabel ?? humanizeDomain(domain),
            actionLabel: items[0]?.actionLabel ?? "Contribuer",
            contributionIds: items.map((item) => item.id),
        };
    });
}

function runtimeState(
    source: CodexGeneriqueVivantMatterSource,
    contributions: readonly CodexGeneriqueVivantContribution[],
): CodexPlanRuntimeState {
    if (source.kind === "bobine-temoin") {
        return source.bobine.runtimeState;
    }
    if (contributions.length === 0) {
        return "empty";
    }
    if (contributions.some((item) => !item.contributor.resolved)) {
        return "incomplete";
    }
    return contributions.length > 80
        ? "dense"
        : contributions.length < 4
          ? "sparse"
          : "ready";
}

export function deriveGeneriqueVivant(
    configuration: CodexPlanConfiguration,
    source: CodexGeneriqueVivantMatterSource,
): CodexGeneriqueVivantModel {
    if (configuration.plan !== "generique-vivant") {
        throw new Error(
            "Le dérivateur Générique vivant requiert le Plan correspondant.",
        );
    }

    const subject = getSubject(configuration, source.archives);
    const archiveResult = derivePlanCredits(source.archives);
    const sourceCredits =
        source.kind === "archives"
            ? archiveResult.items
            : source.bobine.credits;
    const allCredits =
        source.kind === "archives" ? archiveResult.items : sourceCredits;
    const subjectCredits = sortCredits(
        source.kind === "archives"
            ? sourceCredits.filter(
                  (credit) => credit.work.slug === subject.slug,
              )
            : sourceCredits,
    );
    const contributions = subjectCredits.map((credit) =>
        createContribution(credit, allCredits),
    );
    const ids = new Set(subjectCredits.map((credit) => credit.id));
    const notices: CodexPlanDerivationNotice[] =
        source.kind === "archives"
            ? archiveResult.notices.filter(
                  (notice) => !notice.itemId || ids.has(notice.itemId),
              )
            : [
                  {
                      code: "bobine-temoin-active",
                      message: `La bobine témoin « ${source.bobine.label} » remplace les Archives publiées.`,
                  },
                  ...contributions
                      .filter((item) => !item.contributor.resolved)
                      .map((item) => ({
                          code: "unresolved-reference" as const,
                          itemId: item.id,
                          message: `La référence « ${item.contributor.label} » ne possède pas de fiche publiée dans le Codex.`,
                      })),
              ];
    const groups = createGroups(contributions);

    return {
        configuration,
        subject,
        matter: configuration.matter,
        runtimeState: runtimeState(source, contributions),
        contributions,
        groups,
        selection: {
            total: contributions.length,
            returned: contributions.length,
            truncated: false,
        },
        notices,
        stats: {
            contributions: contributions.length,
            domains: groups.length,
            multiRole: contributions.filter((item) => item.roles.length > 1)
                .length,
            resolved: contributions.filter((item) => item.contributor.resolved)
                .length,
            unresolved: contributions.filter(
                (item) => !item.contributor.resolved,
            ).length,
        },
    };
}
