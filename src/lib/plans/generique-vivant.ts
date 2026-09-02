import { derivePlanCredits } from "@/lib/plans/credits";
import { createPlanSubjectReference } from "@/lib/plans/utils";
import {
    creditDomainOrder,
    getCreditDomainDefinition,
} from "@/registry/credits";
import type {
    CodexGeneriqueVivantAngle,
    CodexGeneriqueVivantAngleView,
    CodexGeneriqueVivantContribution,
    CodexGeneriqueVivantGroup,
    CodexGeneriqueVivantMatterSource,
    CodexGeneriqueVivantModel,
    CodexPlanConfiguration,
    CodexPlanCredit,
    CodexPlanDerivationNotice,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";

const angleDefinitions = {
    departments: {
        label: "Domaines",
        question: "Quels grands gestes composent la production ?",
        emptyLabel: "Aucun domaine ne répond au Cadre actuel.",
    },
    roles: {
        label: "Rôles exacts",
        question: "Qui accomplit quel geste documenté ?",
        emptyLabel: "Aucun rôle documenté ne répond au Cadre actuel.",
    },
    responsibilities: {
        label: "Responsabilités multiples",
        question: "Quelles contributions réunissent plusieurs rôles ?",
        emptyLabel:
            "Aucune contribution de ce Sujet ne réunit plusieurs rôles documentés.",
    },
    collaborations: {
        label: "Co-présences",
        question: "Quelles personnes figurent dans un même domaine ?",
        emptyLabel: "Aucune co-présence ne répond au Cadre actuel.",
    },
    recurrences: {
        label: "Récurrences",
        question: "Qui réapparaît dans plusieurs œuvres documentées ?",
        emptyLabel:
            "Aucune présence récurrente n’est documentée pour ce Sujet.",
    },
} as const satisfies Record<
    CodexGeneriqueVivantAngle,
    Readonly<{ label: string; question: string; emptyLabel: string }>
>;

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
                ...recurrenceWorkLabels,
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

function createRoleGroups(
    contributions: readonly CodexGeneriqueVivantContribution[],
) {
    const roles = [
        ...new Set(contributions.flatMap((item) => item.roles)),
    ].sort((a, b) => a.localeCompare(b, "fr"));

    return roles.map((role) => ({
        id: `role:${role}`,
        label: role,
        actionLabel: "Rôle documenté",
        contributionIds: contributions
            .filter((item) => item.roles.includes(role))
            .map((item) => item.id),
    }));
}

function createAngleViews(
    contributions: readonly CodexGeneriqueVivantContribution[],
    domainGroups: readonly CodexGeneriqueVivantGroup[],
): Readonly<Record<CodexGeneriqueVivantAngle, CodexGeneriqueVivantAngleView>> {
    const groupsByAngle = {
        departments: domainGroups,
        roles: createRoleGroups(contributions),
        responsibilities: [
            {
                id: "multi-role",
                label: "Responsabilités multiples",
                actionLabel: "Plusieurs rôles documentés",
                contributionIds: contributions
                    .filter((item) => item.roles.length > 1)
                    .map((item) => item.id),
            },
        ].filter((group) => group.contributionIds.length > 0),
        collaborations: domainGroups
            .filter((group) => group.contributionIds.length > 1)
            .map((group) => ({
                ...group,
                label: `Co-présences · ${group.label}`,
                actionLabel: "Même domaine, sans collaboration directe déduite",
            })),
        recurrences: [
            {
                id: "recurring",
                label: "Présences récurrentes",
                actionLabel: "Retrouvé dans plusieurs œuvres documentées",
                contributionIds: contributions
                    .filter((item) => item.recurrenceWorkLabels.length > 1)
                    .map((item) => item.id),
            },
        ].filter((group) => group.contributionIds.length > 0),
    } as const satisfies Record<
        CodexGeneriqueVivantAngle,
        readonly CodexGeneriqueVivantGroup[]
    >;

    return {
        departments: {
            angle: "departments",
            ...angleDefinitions.departments,
            groups: groupsByAngle.departments,
        },
        roles: {
            angle: "roles",
            ...angleDefinitions.roles,
            groups: groupsByAngle.roles,
        },
        responsibilities: {
            angle: "responsibilities",
            ...angleDefinitions.responsibilities,
            groups: groupsByAngle.responsibilities,
        },
        collaborations: {
            angle: "collaborations",
            ...angleDefinitions.collaborations,
            groups: groupsByAngle.collaborations,
        },
        recurrences: {
            angle: "recurrences",
            ...angleDefinitions.recurrences,
            groups: groupsByAngle.recurrences,
        },
    };
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

    const subject = createPlanSubjectReference(configuration, source.archives);
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
    const views = createAngleViews(contributions, groups);

    return {
        configuration,
        subject,
        matter: configuration.matter,
        runtimeState: runtimeState(source, contributions),
        contributions,
        groups,
        views,
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
