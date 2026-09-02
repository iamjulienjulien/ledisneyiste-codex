import type {
    CodexPlanArchives,
    CodexPlanDerivationNotice,
    CodexPlanDerivationOptions,
    CodexPlanDerivationResult,
    CodexPlanEntityKind,
    CodexPlanEntityReference,
    CodexPlanProvenance,
} from "@/types/codex-plans";
import { resoudreOeuvreSource } from "@/lib/oeuvres-sources";
import type { ReferenceOeuvreLiee } from "@/types/oeuvre";
import type { ReferenceCodex, TypeReferenceCodex } from "@/types/reference";

const REFERENCE_COLLECTIONS = {
    personnage: "personnages",
    contributeur: "contributeurs",
    oeuvre: "oeuvres",
    epoque: "epoques",
} as const;

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
    label: string,
): CodexPlanEntityReference {
    return {
        id: createEntityId(kind, slug),
        kind,
        label,
        slug,
        resolved: true,
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

    const collection = REFERENCE_COLLECTIONS[reference.type];
    const resolved = archives.catalogues[collection].some(
        (entry) => entry.slug === reference.slug,
    );

    return {
        id: createEntityId(reference.type, reference.slug),
        kind: reference.type,
        label: reference.nom,
        slug: reference.slug,
        resolved,
    };
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
