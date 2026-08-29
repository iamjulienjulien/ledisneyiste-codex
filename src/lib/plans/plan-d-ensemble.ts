import { derivePlanEvidence } from "@/lib/plans/evidence";
import { derivePlanLinks } from "@/lib/plans/links";
import { derivePlanNodes } from "@/lib/plans/nodes";
import type {
    CodexPlanAngleSlug,
    CodexPlanConfiguration,
    CodexPlanDEnsembleDirection,
    CodexPlanDEnsembleEvidence,
    CodexPlanDEnsembleGroup,
    CodexPlanDEnsembleGroupSlug,
    CodexPlanDEnsembleItem,
    CodexPlanDEnsembleMatterSource,
    CodexPlanDEnsembleModel,
    CodexPlanDEnsembleOptions,
    CodexPlanDEnsembleRelation,
    CodexPlanDerivationNotice,
    CodexPlanDerivationSelection,
    CodexPlanEntityReference,
    CodexPlanEvidence,
    CodexPlanLink,
    CodexPlanLinkKind,
    CodexPlanMatter,
    CodexPlanNode,
    CodexPlanProvenance,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";

type EnsembleLink = Readonly<{
    id: string;
    kind: CodexPlanLinkKind | "evidence-of";
    label: string;
    from: CodexPlanEntityReference;
    to: CodexPlanEntityReference;
    provenance: readonly CodexPlanProvenance[];
    evidence: readonly CodexPlanDEnsembleEvidence[];
}>;

type Discovery = Readonly<{
    parentId: string;
    link: EnsembleLink;
}>;

const subjectKinds = {
    personnages: "personnage",
    createurs: "contributeur",
    oeuvres: "oeuvre",
    epoques: "epoque",
} as const;

const groupDefinitions = {
    characters: { label: "Personnages", order: 0 },
    people: { label: "Créateurs", order: 1 },
    works: { label: "Œuvres", order: 2 },
    epochs: { label: "Époques", order: 3 },
    rewards: { label: "Récompenses", order: 4 },
    sources: { label: "Sources", order: 5 },
} as const satisfies Record<
    CodexPlanDEnsembleGroupSlug,
    Readonly<{ label: string; order: number }>
>;

const angleGroups: Partial<
    Record<CodexPlanAngleSlug, CodexPlanDEnsembleGroupSlug>
> = {
    characters: "characters",
    people: "people",
    works: "works",
    rewards: "rewards",
    sources: "sources",
};

const relationLabels: Readonly<Record<string, string>> = {
    source: "Est une source de",
    preparation: "Prépare",
    adaptation: "Adapte",
    influence: "Influence",
    filiation: "Prolonge",
};

function deduplicateById<Item extends Readonly<{ id: string }>>(
    items: readonly Item[],
) {
    return items.filter(
        (item, index) =>
            items.findIndex((candidate) => candidate.id === item.id) === index,
    );
}

function deduplicateNotices(
    notices: readonly (CodexPlanDerivationNotice | undefined)[],
) {
    return notices
        .filter(
            (notice): notice is CodexPlanDerivationNotice =>
                notice !== undefined,
        )
        .filter(
            (notice, index, all) =>
                all.findIndex(
                    (candidate) =>
                        candidate.code === notice.code &&
                        candidate.message === notice.message &&
                        candidate.itemId === notice.itemId,
                ) === index,
        );
}

function createMissingNode(
    reference: CodexPlanEntityReference,
    provenance: readonly CodexPlanProvenance[],
): CodexPlanNode {
    return {
        ...reference,
        publishedSubject: false,
        metadata: {},
        provenance,
    };
}

function createHref(node: CodexPlanNode) {
    if (!node.resolved || !node.slug) {
        return undefined;
    }

    const routes = {
        personnage: "personnages",
        contributeur: "contributeurs",
        oeuvre: "oeuvres",
        epoque: "epoques",
    } as const;
    const route =
        node.kind in routes
            ? routes[node.kind as keyof typeof routes]
            : undefined;

    if (route) {
        return `/${route}/${node.slug}`;
    }

    const sourceUrl = node.kind === "source" ? node.metadata.url : undefined;
    return typeof sourceUrl === "string" ? sourceUrl : undefined;
}

function groupForNode(
    node: CodexPlanNode,
    relationKind?: EnsembleLink["kind"],
): CodexPlanDEnsembleGroupSlug {
    switch (node.kind) {
        case "personnage":
            return "characters";
        case "contributeur":
            return "people";
        case "oeuvre":
        case "oeuvre-exterieure":
            return "works";
        case "epoque":
            return "epochs";
        case "recompense":
            return "rewards";
        case "source":
            return "sources";
        case "reference-non-resolue":
            if (
                relationKind === "created-by" ||
                relationKind === "contributed-to" ||
                relationKind === "reward-beneficiary"
            ) {
                return "people";
            }
            if (relationKind === "features") {
                return "characters";
            }
            if (relationKind === "belongs-to-era") {
                return "epochs";
            }
            if (relationKind === "evidence-of") {
                return "sources";
            }
            return "works";
    }
}

function normalizePlanLink(link: CodexPlanLink): EnsembleLink {
    const reverseRelation =
        link.kind === "work-relation" &&
        (link.label === "source" || link.label === "preparation");

    return {
        id: link.id,
        kind: link.kind,
        label: relationLabels[link.label] ?? link.label,
        from: reverseRelation ? link.to : link.from,
        to: reverseRelation ? link.from : link.to,
        provenance: link.provenance,
        evidence: [],
    };
}

function evidenceFromSource(
    source: CodexPlanEntityReference,
    nodeById: ReadonlyMap<string, CodexPlanNode>,
): CodexPlanDEnsembleEvidence {
    const node = nodeById.get(source.id);
    const url = node?.kind === "source" ? node.metadata.url : undefined;

    return {
        id: source.id,
        label: source.label,
        ...(typeof url === "string" ? { url } : {}),
    };
}

function sourceIdsFromProvenance(provenance: readonly CodexPlanProvenance[]) {
    return [
        ...new Set(
            provenance.flatMap((item) => item.sourceIds ?? []).filter(Boolean),
        ),
    ];
}

function addProvenanceEvidence(
    links: readonly EnsembleLink[],
    nodeById: ReadonlyMap<string, CodexPlanNode>,
) {
    return links.map((link) => ({
        ...link,
        evidence: sourceIdsFromProvenance(link.provenance).map((sourceId) => {
            const node = nodeById.get(`source:${sourceId}`);

            return {
                id: sourceId,
                label: node?.label ?? sourceId,
                ...(typeof node?.metadata.url === "string"
                    ? { url: node.metadata.url }
                    : {}),
            };
        }),
    }));
}

function createEvidenceLinks(
    evidence: readonly CodexPlanEvidence[],
    nodeById: Map<string, CodexPlanNode>,
): readonly EnsembleLink[] {
    const links: EnsembleLink[] = [];

    for (const item of evidence) {
        const sources: CodexPlanEntityReference[] = [
            ...item.sources,
            ...item.unresolvedSourceIds.map((sourceId) => ({
                id: `source:${sourceId}`,
                kind: "source" as const,
                label: sourceId,
                slug: sourceId,
                resolved: false,
            })),
        ];

        for (const source of sources) {
            if (!nodeById.has(source.id)) {
                nodeById.set(
                    source.id,
                    createMissingNode(source, item.provenance),
                );
            }
            if (!nodeById.has(item.owner.id)) {
                nodeById.set(
                    item.owner.id,
                    createMissingNode(item.owner, item.provenance),
                );
            }

            links.push({
                id: `evidence-of:${item.id}:${source.id}`,
                kind: "evidence-of",
                label: "Documente",
                from: source,
                to: item.owner,
                provenance: item.provenance,
                evidence: [evidenceFromSource(source, nodeById)],
            });
        }
    }

    return links;
}

function ensureLinkNodes(
    links: readonly EnsembleLink[],
    nodeById: Map<string, CodexPlanNode>,
) {
    for (const link of links) {
        if (!nodeById.has(link.from.id)) {
            nodeById.set(
                link.from.id,
                createMissingNode(link.from, link.provenance),
            );
        }
        if (!nodeById.has(link.to.id)) {
            nodeById.set(
                link.to.id,
                createMissingNode(link.to, link.provenance),
            );
        }
    }
}

function angleAcceptsGroup(
    angle: CodexPlanAngleSlug,
    group: CodexPlanDEnsembleGroupSlug,
) {
    return angle === "relations" || angleGroups[angle] === group;
}

function nextNodeForDirection(
    currentId: string,
    link: EnsembleLink,
    direction: CodexPlanDEnsembleDirection,
) {
    if (
        (direction === "all" || direction === "outgoing") &&
        link.from.id === currentId
    ) {
        return link.to.id;
    }
    if (
        (direction === "all" || direction === "incoming") &&
        link.to.id === currentId
    ) {
        return link.from.id;
    }
    return undefined;
}

function collectNeighbourhood(
    focusId: string,
    links: readonly EnsembleLink[],
    nodeById: ReadonlyMap<string, CodexPlanNode>,
    depth: number,
    direction: CodexPlanDEnsembleDirection,
    angle: CodexPlanAngleSlug,
) {
    const depths = new Map<string, number>([[focusId, 0]]);
    const discoveries = new Map<string, Discovery>();
    const queue = [focusId];

    while (queue.length > 0) {
        const currentId = queue.shift();
        if (!currentId) {
            continue;
        }
        const currentDepth = depths.get(currentId) ?? 0;
        if (currentDepth >= depth) {
            continue;
        }

        for (const link of links) {
            const nextId = nextNodeForDirection(currentId, link, direction);
            if (!nextId || depths.has(nextId)) {
                continue;
            }
            const node = nodeById.get(nextId);
            if (
                !node ||
                !angleAcceptsGroup(angle, groupForNode(node, link.kind))
            ) {
                continue;
            }

            depths.set(nextId, currentDepth + 1);
            discoveries.set(nextId, { parentId: currentId, link });
            queue.push(nextId);
        }
    }

    return { depths, discoveries };
}

function selectBalancedNodes(
    nodeIds: readonly string[],
    nodeById: ReadonlyMap<string, CodexPlanNode>,
    discoveries: ReadonlyMap<string, Discovery>,
    depths: ReadonlyMap<string, number>,
    limit: number,
) {
    const groupOrder = Object.entries(groupDefinitions)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([group]) => group as CodexPlanDEnsembleGroupSlug);
    const grouped = new Map<CodexPlanDEnsembleGroupSlug, string[]>();

    for (const nodeId of nodeIds) {
        const node = nodeById.get(nodeId);
        if (!node) {
            continue;
        }
        const group = groupForNode(node, discoveries.get(nodeId)?.link.kind);
        const items = grouped.get(group) ?? [];
        items.push(nodeId);
        grouped.set(group, items);
    }

    for (const items of grouped.values()) {
        items.sort((a, b) => {
            const depthDifference = (depths.get(a) ?? 1) - (depths.get(b) ?? 1);
            if (depthDifference !== 0) {
                return depthDifference;
            }
            const labelDifference =
                nodeById
                    .get(a)
                    ?.label.localeCompare(nodeById.get(b)?.label ?? "", "fr") ??
                0;
            return labelDifference || a.localeCompare(b);
        });
    }

    const selected: string[] = [];
    let position = 0;
    while (selected.length < limit) {
        let added = false;
        for (const group of groupOrder) {
            const nodeId = grouped.get(group)?.[position];
            if (!nodeId || selected.length >= limit) {
                continue;
            }
            selected.push(nodeId);
            added = true;
        }
        if (!added) {
            break;
        }
        position += 1;
    }

    return selected;
}

function hasDirectedCycle(links: readonly EnsembleLink[]) {
    const successors = new Map<string, string[]>();
    const visiting = new Set<string>();
    const visited = new Set<string>();

    for (const link of links) {
        const targets = successors.get(link.from.id) ?? [];
        targets.push(link.to.id);
        successors.set(link.from.id, targets);
    }

    function visit(nodeId: string): boolean {
        if (visiting.has(nodeId)) {
            return true;
        }
        if (visited.has(nodeId)) {
            return false;
        }

        visiting.add(nodeId);
        const cycle = (successors.get(nodeId) ?? []).some(visit);
        visiting.delete(nodeId);
        visited.add(nodeId);
        return cycle;
    }

    return [...successors.keys()].some(visit);
}

function relationRelativeTo(
    link: EnsembleLink,
    depths: ReadonlyMap<string, number>,
    discovery?: Discovery,
): CodexPlanDEnsembleRelation {
    const fromDepth = depths.get(link.from.id) ?? Number.MAX_SAFE_INTEGER;
    const toDepth = depths.get(link.to.id) ?? Number.MAX_SAFE_INTEGER;
    const relativeToId =
        discovery?.link.id === link.id
            ? discovery.parentId
            : fromDepth < toDepth
              ? link.from.id
              : toDepth < fromDepth
                ? link.to.id
                : [link.from.id, link.to.id].sort()[0];

    return {
        id: `ensemble:${link.id}`,
        kind: link.kind,
        label: link.label,
        direction: link.from.id === relativeToId ? "outgoing" : "incoming",
        relativeToId,
        fromId: link.from.id,
        toId: link.to.id,
        depth: Math.max(
            depths.get(link.from.id) ?? 0,
            depths.get(link.to.id) ?? 0,
        ),
        evidence: link.evidence,
        provenance: link.provenance,
    };
}

function createSelection(
    total: number,
    returned: number,
    limit: number,
): CodexPlanDerivationSelection {
    return {
        total,
        returned,
        limit,
        truncated: returned < total,
    };
}

function createLimitNotice(
    selection: CodexPlanDerivationSelection,
): CodexPlanDerivationNotice | undefined {
    return selection.truncated
        ? {
              code: "limit-applied",
              message: `Le Cadre montre ${selection.returned} voisins sur ${selection.total}.`,
          }
        : undefined;
}

function runtimeStateForProjection(
    subject: CodexPlanNode,
    items: readonly CodexPlanDEnsembleItem[],
    selection: CodexPlanDerivationSelection,
    sourceState?: CodexPlanRuntimeState,
) {
    if (!subject.resolved || sourceState === "error") {
        return "error" as const;
    }
    if (items.length === 0) {
        return "empty" as const;
    }
    if (sourceState && sourceState !== "ready") {
        return sourceState;
    }
    if (items.some((item) => !item.resolved)) {
        return "incomplete" as const;
    }
    if (selection.truncated) {
        return "dense" as const;
    }
    return items.length <= 2 ? ("sparse" as const) : ("ready" as const);
}

function deriveProjection({
    configuration,
    matter,
    subject,
    focus,
    nodeById,
    links,
    direction,
    baseNotices,
    orphanNodeIds,
    sourceState,
}: Readonly<{
    configuration: CodexPlanConfiguration;
    matter: CodexPlanMatter;
    subject: CodexPlanNode;
    focus: CodexPlanNode;
    nodeById: ReadonlyMap<string, CodexPlanNode>;
    links: readonly EnsembleLink[];
    direction: CodexPlanDEnsembleDirection;
    baseNotices: readonly CodexPlanDerivationNotice[];
    orphanNodeIds: readonly string[];
    sourceState?: CodexPlanRuntimeState;
}>): CodexPlanDEnsembleModel {
    const depth = Math.max(1, Math.floor(configuration.frame.depth ?? 1));
    const limit = Math.max(0, Math.floor(configuration.frame.limit ?? 24));
    const { depths, discoveries } = collectNeighbourhood(
        focus.id,
        links,
        nodeById,
        depth,
        direction,
        configuration.angle,
    );
    const candidateNodeIds = [...depths.keys()].filter(
        (nodeId) => nodeId !== focus.id,
    );
    const selectedNodeIds = selectBalancedNodes(
        candidateNodeIds,
        nodeById,
        discoveries,
        depths,
        limit,
    );
    const selectedIds = new Set([focus.id, ...selectedNodeIds]);
    const selectedLinks = deduplicateById([
        ...links.filter(
            (link) =>
                selectedIds.has(link.from.id) && selectedIds.has(link.to.id),
        ),
        ...selectedNodeIds.flatMap((nodeId) => {
            const discovery = discoveries.get(nodeId);
            return discovery ? [discovery.link] : [];
        }),
    ]);
    const relations = selectedLinks.map((link) => {
        const discoveredNodeId = selectedNodeIds.find(
            (nodeId) => discoveries.get(nodeId)?.link.id === link.id,
        );
        return relationRelativeTo(
            link,
            depths,
            discoveredNodeId ? discoveries.get(discoveredNodeId) : undefined,
        );
    });
    const items = selectedNodeIds.flatMap((nodeId) => {
        const node = nodeById.get(nodeId);
        if (!node) {
            return [];
        }
        const itemRelations = relations.filter(
            (relation) =>
                relation.fromId === nodeId || relation.toId === nodeId,
        );
        const evidence = deduplicateById(
            itemRelations.flatMap((relation) => relation.evidence),
        );
        const href = createHref(node);

        return [
            {
                id: `ensemble-item:${node.id}`,
                node,
                depth: depths.get(nodeId) ?? 1,
                resolved: node.resolved,
                ...(href ? { href } : {}),
                relations: itemRelations,
                evidence,
            } satisfies CodexPlanDEnsembleItem,
        ];
    });
    const selection = createSelection(
        candidateNodeIds.length,
        items.length,
        limit,
    );
    const groups = Object.entries(groupDefinitions)
        .sort((a, b) => a[1].order - b[1].order)
        .flatMap(([groupId, definition]) => {
            const id = groupId as CodexPlanDEnsembleGroupSlug;
            const allInGroup = candidateNodeIds.filter((nodeId) => {
                const node = nodeById.get(nodeId);
                return (
                    node &&
                    groupForNode(node, discoveries.get(nodeId)?.link.kind) ===
                        id
                );
            });
            const groupItems = items.filter(
                (item) =>
                    groupForNode(
                        item.node,
                        discoveries.get(item.node.id)?.link.kind,
                    ) === id,
            );
            if (allInGroup.length === 0) {
                return [];
            }

            return [
                {
                    id,
                    label: definition.label,
                    items: groupItems,
                    selection: {
                        total: allInGroup.length,
                        returned: groupItems.length,
                        limit,
                        truncated: groupItems.length < allInGroup.length,
                    },
                } satisfies CodexPlanDEnsembleGroup,
            ];
        });
    const cycleDetected = hasDirectedCycle(
        links.filter(
            (link) => depths.has(link.from.id) && depths.has(link.to.id),
        ),
    );
    const selectedLinkIds = new Set(selectedLinks.map((link) => link.id));
    const notices = deduplicateNotices([
        ...baseNotices.filter(
            (notice) =>
                notice.itemId === undefined ||
                selectedLinkIds.has(notice.itemId) ||
                selectedNodeIds.includes(notice.itemId),
        ),
        createLimitNotice(selection),
        ...(cycleDetected
            ? [
                  {
                      code: "cycle-detected" as const,
                      message:
                          "Le voisinage contient un cycle ; le Plan d’ensemble le conserve sans créer de hiérarchie artificielle.",
                  },
              ]
            : []),
        ...orphanNodeIds.map((nodeId) => ({
            code: "orphan-node" as const,
            message: `Le nœud « ${nodeId} » reste hors du voisinage faute de raccord.`,
            itemId: nodeId,
        })),
        ...items
            .filter((item) => !item.resolved)
            .map((item) => ({
                code: "unresolved-reference" as const,
                message: `La référence « ${item.node.label} » ne possède pas de fiche publiée dans le Codex.`,
                itemId: item.node.id,
            })),
        ...(matter.kind === "bobine-temoin"
            ? [
                  {
                      code: "bobine-temoin-active" as const,
                      message:
                          "Cette projection emploie une Bobine témoin explicitement séparée des Archives publiées.",
                  },
              ]
            : []),
    ]);

    return {
        configuration,
        subject,
        focus,
        matter,
        direction,
        runtimeState: runtimeStateForProjection(
            subject,
            items,
            selection,
            sourceState,
        ),
        groups,
        relations,
        selection,
        notices,
        cycleDetected,
        orphanNodeIds,
    };
}

function subjectIdFromConfiguration(configuration: CodexPlanConfiguration) {
    return `${subjectKinds[configuration.subject.family]}:${configuration.subject.slug}`;
}

function createUnresolvedSubject(
    configuration: CodexPlanConfiguration,
): CodexPlanNode {
    const kind = subjectKinds[configuration.subject.family];

    return {
        id: `${kind}:${configuration.subject.slug}`,
        kind,
        label: configuration.subject.slug,
        slug: configuration.subject.slug,
        resolved: false,
        publishedSubject: false,
        metadata: {},
        provenance: [
            {
                kind: "uncertainty",
                explanation:
                    "Le Sujet demandé ne correspond à aucune entrée publiée dans les catalogues.",
            },
        ],
    };
}

function deriveFromArchives(
    configuration: CodexPlanConfiguration,
    source: Extract<CodexPlanDEnsembleMatterSource, { kind: "archives" }>,
    direction: CodexPlanDEnsembleDirection,
) {
    const nodesResult = derivePlanNodes(source.archives);
    const linksResult = derivePlanLinks(source.archives);
    const evidenceResult = derivePlanEvidence(source.archives);
    const nodeById = new Map(
        nodesResult.items.map((node) => [node.id, node] as const),
    );
    const normalizedLinks = linksResult.items.map(normalizePlanLink);
    ensureLinkNodes(normalizedLinks, nodeById);
    const links = addProvenanceEvidence(
        [
            ...normalizedLinks,
            ...createEvidenceLinks(evidenceResult.items, nodeById),
        ],
        nodeById,
    );
    const subject =
        nodeById.get(subjectIdFromConfiguration(configuration)) ??
        createUnresolvedSubject(configuration);

    return deriveProjection({
        configuration,
        matter: { kind: "archives" },
        subject,
        focus: subject,
        nodeById,
        links,
        direction,
        baseNotices: [
            ...linksResult.notices,
            ...evidenceResult.notices,
            ...(configuration.angle === "sources" ? nodesResult.notices : []),
        ],
        orphanNodeIds: [],
    });
}

function deriveFromBobine(
    configuration: CodexPlanConfiguration,
    source: Extract<CodexPlanDEnsembleMatterSource, { kind: "bobine-temoin" }>,
    direction: CodexPlanDEnsembleDirection,
) {
    const archiveNodes = derivePlanNodes(source.archives);
    const archiveNodeById = new Map(
        archiveNodes.items.map((node) => [node.id, node] as const),
    );
    const subject =
        archiveNodeById.get(subjectIdFromConfiguration(configuration)) ??
        createUnresolvedSubject(configuration);
    const nodeById = new Map(
        source.bobine.nodes.map((node) => [node.id, node] as const),
    );
    const normalizedLinks = source.bobine.links.map(normalizePlanLink);
    ensureLinkNodes(normalizedLinks, nodeById);
    const links = addProvenanceEvidence(
        [
            ...normalizedLinks,
            ...createEvidenceLinks(source.bobine.evidence, nodeById),
        ],
        nodeById,
    );
    const connectedIds = new Set(
        links.flatMap((link) => [link.from.id, link.to.id]),
    );
    const orphanNodeIds = source.bobine.nodes
        .filter((node) => !connectedIds.has(node.id))
        .map((node) => node.id);
    const focus = source.bobine.nodes[0] ?? subject;

    return deriveProjection({
        configuration,
        matter: {
            kind: "bobine-temoin",
            fixture: source.bobine.slug,
        },
        subject,
        focus,
        nodeById,
        links,
        direction,
        baseNotices: [],
        orphanNodeIds,
        sourceState: source.bobine.runtimeState,
    });
}

export function derivePlanDEnsemble(
    configuration: CodexPlanConfiguration,
    source: CodexPlanDEnsembleMatterSource,
    options: CodexPlanDEnsembleOptions = {},
): CodexPlanDEnsembleModel {
    const direction = options.direction ?? "all";
    const matter: CodexPlanMatter =
        source.kind === "archives"
            ? { kind: "archives" }
            : {
                  kind: "bobine-temoin",
                  fixture: source.bobine.slug,
              };
    const normalizedConfiguration = {
        ...configuration,
        matter,
    };

    return source.kind === "archives"
        ? deriveFromArchives(normalizedConfiguration, source, direction)
        : deriveFromBobine(normalizedConfiguration, source, direction);
}
