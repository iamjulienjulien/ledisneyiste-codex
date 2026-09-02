import type {
    CodexPlanArchives,
    CodexPlanConfiguration,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanEntityKind,
    CodexPlanEntityReference,
    CodexPlanProvenance,
} from "@/types/codex-plans";
import { resoudreOeuvreSource } from "@/lib/oeuvres-sources";
import { construireRouteCanoniqueCodex } from "@/lib/navigation/routes-codex";
import type { ReferenceOeuvreLiee } from "@/types/oeuvre";
import type { ReferenceCodex, TypeReferenceCodex } from "@/types/reference";
import { projeterIdentiteCodex } from "@/lib/identites/projeter-identite";

function normaliserIdentifiant(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function createEntityId(kind: CodexPlanEntityKind, value: string) {
    return `${kind}:${value}`;
}

export function createPublishedReference(
    kind: Exclude<TypeReferenceCodex, "chanson">,
    slug: string,
    archives: CodexPlanArchives,
    fallbackLabel = slug,
): CodexPlanEntityReference {
    const definitions = {
        personnage: {
            family: "personnages",
            entries: archives.catalogues.personnages,
            fiches: archives.fiches.personnages,
        },
        contributeur: {
            family: "createurs",
            entries: archives.catalogues.contributeurs,
            fiches: archives.fiches.contributeurs,
        },
        oeuvre: {
            family: "oeuvres",
            entries: archives.catalogues.oeuvres,
            fiches: archives.fiches.oeuvres,
        },
        epoque: {
            family: "epoques",
            entries: archives.catalogues.epoques,
            fiches: archives.fiches.epoques,
        },
    } as const;
    const definition = definitions[kind];
    const entree = definition.entries.find((entry) => entry.slug === slug);
    const fiche = definition.fiches.find((entry) => entry.slug === slug);
    const identity = projeterIdentiteCodex({
        famille: definition.family,
        entree,
        fiche,
    });

    return {
        id: createEntityId(kind, slug),
        kind,
        label: identity?.principale.libelle ?? fallbackLabel,
        slug,
        resolved: identity !== null,
    };
}

export function createReference(
    reference: ReferenceCodex,
    archives: CodexPlanArchives,
): CodexPlanEntityReference {
    if (!reference.type || !reference.slug) {
        return {
            id: createEntityId(
                "reference-non-resolue",
                normaliserIdentifiant(reference.nom),
            ),
            kind: "reference-non-resolue",
            label: reference.nom,
            resolved: false,
        };
    }

    if (reference.type === "chanson") {
        return {
            id: createEntityId("reference-non-resolue", reference.slug),
            kind: "reference-non-resolue",
            label: reference.nom,
            slug: reference.slug,
            resolved: false,
        };
    }

    return createPublishedReference(
        reference.type,
        reference.slug,
        archives,
        reference.nom,
    );
}

export function createPlanSubjectReference(
    configuration: CodexPlanConfiguration,
    archives: CodexPlanArchives,
) {
    const definitions = {
        personnages: "personnage",
        createurs: "contributeur",
        oeuvres: "oeuvre",
        epoques: "epoque",
    } as const;

    return createPublishedReference(
        definitions[configuration.subject.family],
        configuration.subject.slug,
        archives,
    );
}

export function createPlanReferenceHref(reference: CodexPlanEntityReference) {
    if (!reference.resolved || !reference.slug) {
        return undefined;
    }

    const families = {
        personnage: "personnages",
        contributeur: "createurs",
        oeuvre: "oeuvres",
        epoque: "epoques",
    } as const;
    const family = families[reference.kind as keyof typeof families];

    return family
        ? construireRouteCanoniqueCodex(family, reference.slug)
        : undefined;
}

export function createWorkReference(
    reference: ReferenceOeuvreLiee,
    archives: CodexPlanArchives,
): CodexPlanEntityReference {
    if (reference.type === "oeuvre") {
        return createReference(reference, archives);
    }

    if (reference.type === "oeuvre-source") {
        const resolution = resoudreOeuvreSource(
            reference,
            archives.oeuvresSources,
        );

        return {
            id: createEntityId("oeuvre-source", reference.id),
            kind: "oeuvre-source",
            label: resolution.entree?.titre ?? reference.nom,
            slug: resolution.entree?.slug ?? reference.slug,
            resolved: resolution.resolved,
        };
    }

    return {
        id: createEntityId(
            "oeuvre-exterieure",
            normaliserIdentifiant(
                [reference.nom, reference.date?.valeur]
                    .filter(Boolean)
                    .join("-"),
            ),
        ),
        kind: "oeuvre-exterieure",
        label: reference.nom,
        resolved: false,
    };
}

export function createRewardReference(
    id: string,
    label: string,
): CodexPlanEntityReference {
    return {
        id: createEntityId("recompense", id),
        kind: "recompense",
        label,
        slug: id,
        resolved: true,
    };
}

export function createSourceReference(
    id: string,
    label: string,
): CodexPlanEntityReference {
    return {
        id: createEntityId("source", id),
        kind: "source",
        label,
        slug: id,
        resolved: true,
    };
}

export function sourcedProvenance(
    sourceIds: readonly string[],
    explanation?: string,
): CodexPlanProvenance {
    return {
        kind: sourceIds.length > 0 ? "sourced-fact" : "uncertainty",
        ...(sourceIds.length > 0 ? { sourceIds: [...sourceIds] } : {}),
        ...(explanation ? { explanation } : {}),
    };
}

export function derivedProvenance(explanation: string): CodexPlanProvenance {
    return {
        kind: "derived-aggregation",
        explanation,
    };
}

export function editorialProvenance(
    sourceIds: readonly string[],
    explanation: string,
): CodexPlanProvenance {
    return {
        kind: "editorial-relation",
        ...(sourceIds.length > 0 ? { sourceIds: [...sourceIds] } : {}),
        explanation,
    };
}

export function unresolvedReferenceNotice(
    reference: CodexPlanEntityReference,
    itemId: string,
): CodexPlanDerivationNotice | undefined {
    if (reference.resolved) {
        return undefined;
    }

    return {
        code: "unresolved-reference",
        message: `La référence « ${reference.label} » ne possède pas de fiche publiée dans le Codex.`,
        itemId,
    };
}

function deduplicateNotices(notices: readonly CodexPlanDerivationNotice[]) {
    return notices.filter(
        (notice, index) =>
            notices.findIndex(
                (candidate) =>
                    candidate.code === notice.code &&
                    candidate.message === notice.message &&
                    candidate.itemId === notice.itemId,
            ) === index,
    );
}

export function createDerivationResult<Item>(
    items: readonly Item[],
    options: CodexPlanDerivationOptions = {},
    notices: readonly (CodexPlanDerivationNotice | undefined)[] = [],
): CodexPlanDerivationResult<Item> {
    const normalizedLimit =
        options.limit === undefined
            ? undefined
            : Math.max(0, Math.floor(options.limit));
    const selectedItems =
        normalizedLimit === undefined
            ? [...items]
            : items.slice(0, normalizedLimit);
    const truncated = selectedItems.length < items.length;
    const selectionNotice: CodexPlanDerivationNotice | undefined = truncated
        ? {
              code: "limit-applied",
              message: `Le Cadre limite la matière à ${selectedItems.length} éléments sur ${items.length}.`,
          }
        : undefined;

    return {
        matter: { kind: "archives" },
        items: selectedItems,
        selection: {
            total: items.length,
            returned: selectedItems.length,
            ...(normalizedLimit === undefined
                ? {}
                : { limit: normalizedLimit }),
            truncated,
        },
        notices: deduplicateNotices(
            [...notices, selectionNotice].filter(
                (notice): notice is CodexPlanDerivationNotice =>
                    notice !== undefined,
            ),
        ),
    };
}
