import { derivePlanLinks } from "@/lib/plans/links";
import {
    createPlanReferenceHref,
    createPlanSubjectReference,
} from "@/lib/plans/utils";
import type { DateHistorique } from "@/types/date";
import type {
    CodexPlanArchives,
    CodexPlanBobineTemoin,
    CodexPlanConfiguration,
    CodexPlanDerivationNotice,
    CodexPlanDerivationSelection,
    CodexPlanEntityReference,
    CodexPlanLink,
    CodexPlanMatter,
    CodexPlanProvenance,
    CodexPlanRuntimeState,
    CodexTravellingDocumentaireConnection,
    CodexTravellingDocumentaireEvidence,
    CodexTravellingDocumentaireMatterSource,
    CodexTravellingDocumentaireModel,
    CodexTravellingDocumentaireStage,
    CodexTravellingDocumentaireZone,
} from "@/types/codex-plans";

type Neighbourhood = Readonly<{
    orderedNodeIds: readonly string[];
    links: readonly CodexPlanLink[];
}>;

const relationLabels: Readonly<Record<string, string>> = {
    source: "est une source de",
    preparation: "prépare",
    adaptation: "est adapté par",
    influence: "influence",
    inspiration: "inspire",
    filiation: "se prolonge dans",
};

function getReferenceDate(
    reference: CodexPlanEntityReference,
    subject: CodexPlanEntityReference,
    archives: CodexPlanArchives,
): DateHistorique | undefined {
    if (reference.kind === "oeuvre" && reference.slug) {
        return archives.fiches.oeuvres.find(
            (work) => work.slug === reference.slug,
        )?.sortie.date;
    }

    if (reference.kind === "oeuvre-source") {
        const sourceId = reference.id.replace(/^oeuvre-source:/, "");

        return archives.oeuvresSources?.fiches.find(
            (work) => work.id === sourceId,
        )?.date;
    }

    if (reference.kind === "personnage" && reference.slug) {
        return archives.fiches.personnages.find(
            (character) => character.slug === reference.slug,
        )?.premiereApparition.date;
    }

    if (reference.kind === "oeuvre-exterieure" && subject.slug) {
        const relation = archives.fiches.oeuvres
            .find((work) => work.slug === subject.slug)
            ?.relationsOeuvres?.find(
                (item) => item.oeuvre.nom === reference.label,
            );

        return relation?.oeuvre.type === "oeuvre-exterieure"
            ? relation.oeuvre.date
            : undefined;
    }

    return undefined;
}

function sourceIdsFromProvenance(provenance: readonly CodexPlanProvenance[]) {
    return [
        ...new Set(
            provenance.flatMap((item) => item.sourceIds ?? []).filter(Boolean),
        ),
    ];
}

function createArchiveEvidence(
    provenance: readonly CodexPlanProvenance[],
    archives: CodexPlanArchives,
): readonly CodexTravellingDocumentaireEvidence[] {
    return sourceIdsFromProvenance(provenance).map((sourceId) => {
        const source = archives.sources.find((item) => item.id === sourceId);

        return {
            id: sourceId,
            label: source?.titre ?? sourceId,
            ...(source?.url ? { url: source.url } : {}),
        };
    });
}

function createBobineEvidence(
    nodeId: string,
    bobine: CodexPlanBobineTemoin,
): readonly CodexTravellingDocumentaireEvidence[] {
    return bobine.evidence
        .filter((item) => item.owner.id === nodeId)
        .flatMap((item) =>
            item.sources.length > 0
                ? item.sources.map((source) => ({
                      id: source.id,
                      label: source.label,
                  }))
                : [{ id: item.id, label: item.label }],
        );
}

function normalizeRelationLabel(label: string) {
    return relationLabels[label] ?? label;
}

function zoneForRelation(label: string): CodexTravellingDocumentaireZone {
    return label === "source" || label === "adaptation"
        ? "origin"
        : "laboratory";
}

function createAdjacency(
    links: readonly CodexPlanLink[],
    traversal: "both" | "forward",
) {
    const adjacency = new Map<string, CodexPlanLink[]>();

    for (const link of links) {
        const nodeIds =
            traversal === "forward"
                ? [link.from.id]
                : [link.from.id, link.to.id];
        for (const nodeId of nodeIds) {
            const neighbours = adjacency.get(nodeId) ?? [];
            neighbours.push(link);
            adjacency.set(nodeId, neighbours);
        }
    }

    return adjacency;
}

function collectNeighbourhood(
    anchorId: string,
    links: readonly CodexPlanLink[],
    depth: number,
    traversal: "both" | "forward" = "both",
): Neighbourhood {
    const adjacency = createAdjacency(links, traversal);
    const visited = new Set([anchorId]);
    const orderedNodeIds: string[] = [];
    const queue = [{ id: anchorId, depth: 0 }];

    while (queue.length > 0) {
        const current = queue.shift();
        if (!current || current.depth >= depth) {
            continue;
        }

        for (const link of adjacency.get(current.id) ?? []) {
            const neighbourId =
                traversal === "forward"
                    ? link.to.id
                    : link.from.id === current.id
                      ? link.to.id
                      : link.from.id;
            if (visited.has(neighbourId)) {
                continue;
            }

            visited.add(neighbourId);
            orderedNodeIds.push(neighbourId);
            queue.push({ id: neighbourId, depth: current.depth + 1 });
        }
    }

    return {
        orderedNodeIds,
        links: links.filter(
            (link) => visited.has(link.from.id) && visited.has(link.to.id),
        ),
    };
}

function hasDirectedCycle(links: readonly CodexPlanLink[]) {
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

function normalizeLimit(configuration: CodexPlanConfiguration) {
    return Math.max(0, Math.floor(configuration.frame.limit ?? 8));
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
              message: `Le Cadre montre ${selection.returned} jalons sur ${selection.total}.`,
          }
        : undefined;
}

function runtimeStateForArchives(
    subject: CodexPlanEntityReference,
    stages: readonly CodexTravellingDocumentaireStage[],
): CodexPlanRuntimeState {
    if (!subject.resolved) {
        return "error";
    }

    const jalons = stages.filter((stage) => !stage.isSubject).length;
    if (jalons === 0) {
        return "empty";
    }

    return jalons === 1 ? "sparse" : "ready";
}

function deriveFromArchives(
    configuration: CodexPlanConfiguration,
    archives: CodexPlanArchives,
    subject: CodexPlanEntityReference,
): Omit<
    CodexTravellingDocumentaireModel,
    "configuration" | "matter" | "subject"
> {
    const linksResult = derivePlanLinks(archives);
    const workLinks = linksResult.items.filter(
        (link) => link.kind === "work-relation",
    );
    const depth = Math.max(1, Math.floor(configuration.frame.depth ?? 1));
    const neighbourhood = collectNeighbourhood(subject.id, workLinks, depth);
    const limit = normalizeLimit(configuration);
    const selectedNodeIds = neighbourhood.orderedNodeIds.slice(0, limit);
    const selectedIds = new Set([subject.id, ...selectedNodeIds]);
    const selectedLinks = neighbourhood.links.filter(
        (link) => selectedIds.has(link.from.id) && selectedIds.has(link.to.id),
    );
    const selection = createSelection(
        neighbourhood.orderedNodeIds.length,
        selectedNodeIds.length,
        limit,
    );
    const references = new Map<string, CodexPlanEntityReference>([
        [subject.id, subject],
    ]);

    for (const link of selectedLinks) {
        references.set(link.from.id, link.from);
        references.set(link.to.id, link.to);
    }

    const stageRelations = new Map<string, CodexPlanLink>();
    for (const nodeId of selectedNodeIds) {
        const relation = selectedLinks.find(
            (link) => link.from.id === nodeId || link.to.id === nodeId,
        );
        if (relation) {
            stageRelations.set(nodeId, relation);
        }
    }

    const relatedStages: CodexTravellingDocumentaireStage[] = [];
    for (const nodeId of selectedNodeIds) {
        const node = references.get(nodeId);
        const relation = stageRelations.get(nodeId);
        if (!node || !relation) {
            continue;
        }

        const date = getReferenceDate(node, subject, archives);
        const href = createPlanReferenceHref(node);
        relatedStages.push({
            id: `stage:${node.id}`,
            order: 0,
            zone: zoneForRelation(relation.label),
            node,
            isSubject: false,
            ...(date ? { date } : {}),
            ...(href ? { href } : {}),
            relationLabel: normalizeRelationLabel(relation.label),
            evidence: createArchiveEvidence(relation.provenance, archives),
        });
    }
    relatedStages.sort((a, b) => {
        const zones = { origin: 0, laboratory: 1, destination: 2 };
        return zones[a.zone] - zones[b.zone];
    });

    const subjectDate = getReferenceDate(subject, subject, archives);
    const subjectHref = createPlanReferenceHref(subject);
    const subjectStage: CodexTravellingDocumentaireStage = {
        id: `stage:${subject.id}`,
        order: relatedStages.length,
        zone: "destination",
        node: subject,
        isSubject: true,
        ...(subjectDate ? { date: subjectDate } : {}),
        ...(subjectHref ? { href: subjectHref } : {}),
        evidence: [],
    };
    const stages = [...relatedStages, subjectStage].map((stage, index) => ({
        ...stage,
        order: index,
    }));

    const connections = selectedLinks.map((link) => {
        const otherId = link.from.id === subject.id ? link.to.id : link.from.id;
        const destinationId =
            link.from.id === subject.id || link.to.id === subject.id
                ? subject.id
                : link.to.id;

        return {
            id: `travelling:${link.id}`,
            fromId: otherId,
            toId: destinationId,
            label: normalizeRelationLabel(link.label),
            evidence: createArchiveEvidence(link.provenance, archives),
            provenance: link.provenance,
        } satisfies CodexTravellingDocumentaireConnection;
    });
    const selectedLinkIds = new Set(selectedLinks.map((link) => link.id));
    const notices = [
        ...linksResult.notices.filter(
            (notice) =>
                notice.itemId === undefined ||
                selectedLinkIds.has(notice.itemId),
        ),
        createLimitNotice(selection),
    ].filter(
        (notice): notice is CodexPlanDerivationNotice => notice !== undefined,
    );

    return {
        runtimeState: runtimeStateForArchives(subject, stages),
        stages,
        connections,
        selection,
        notices,
        cycleDetected: hasDirectedCycle(selectedLinks),
        orphanNodeIds: [],
    };
}

function deriveFromBobine(
    configuration: CodexPlanConfiguration,
    bobine: CodexPlanBobineTemoin,
): Omit<
    CodexTravellingDocumentaireModel,
    "configuration" | "matter" | "subject"
> {
    const connectedIds = new Set(
        bobine.links.flatMap((link) => [link.from.id, link.to.id]),
    );
    const orphanNodeIds = bobine.nodes
        .filter((node) => !connectedIds.has(node.id))
        .map((node) => node.id);
    const anchorId = bobine.links[0]?.from.id;
    const anchor =
        bobine.nodes.find((node) => node.id === anchorId) ?? bobine.nodes[0];
    const depth = Math.max(1, Math.floor(configuration.frame.depth ?? 1));
    const neighbourhood = anchor
        ? collectNeighbourhood(anchor.id, bobine.links, depth, "forward")
        : { orderedNodeIds: [], links: [] };
    const allNodeIds = anchor
        ? [anchor.id, ...neighbourhood.orderedNodeIds]
        : [];
    const limit = normalizeLimit(configuration);
    const selectedNodeIds = allNodeIds.slice(0, limit);
    const selectedIds = new Set(selectedNodeIds);
    const selectedLinks = neighbourhood.links.filter(
        (link) => selectedIds.has(link.from.id) && selectedIds.has(link.to.id),
    );
    const selection = createSelection(
        allNodeIds.length,
        selectedNodeIds.length,
        limit,
    );
    const nodeById = new Map(bobine.nodes.map((node) => [node.id, node]));
    const outgoing = new Map<string, number>();

    for (const link of selectedLinks) {
        outgoing.set(link.from.id, (outgoing.get(link.from.id) ?? 0) + 1);
    }

    const stages: CodexTravellingDocumentaireStage[] = [];
    for (const [index, nodeId] of selectedNodeIds.entries()) {
        const node = nodeById.get(nodeId);
        if (!node) {
            continue;
        }
        const relation = selectedLinks.find(
            (link) => link.from.id === nodeId || link.to.id === nodeId,
        );
        const zone: CodexTravellingDocumentaireZone =
            index === 0
                ? "origin"
                : (outgoing.get(nodeId) ?? 0) === 0
                  ? "destination"
                  : "laboratory";

        stages.push({
            id: `stage:${node.id}`,
            order: index,
            zone,
            node,
            isSubject: false,
            ...(relation
                ? { relationLabel: normalizeRelationLabel(relation.label) }
                : {}),
            evidence: createBobineEvidence(nodeId, bobine),
        });
    }
    const connections = selectedLinks.map((link) => ({
        id: `travelling:${link.id}`,
        fromId: link.from.id,
        toId: link.to.id,
        label: normalizeRelationLabel(link.label),
        evidence: [],
        provenance: link.provenance,
    }));
    const cycleDetected = hasDirectedCycle(bobine.links);
    const notices: CodexPlanDerivationNotice[] = [
        {
            code: "bobine-temoin-active",
            message: `La Bobine témoin « ${bobine.label} » éprouve la forme sans décrire le Sujet publié.`,
        },
        ...(cycleDetected
            ? [
                  {
                      code: "cycle-detected" as const,
                      message:
                          "La matière contient un cycle ; le Travelling le signale sans répéter indéfiniment ses jalons.",
                  },
              ]
            : []),
        ...orphanNodeIds.map((nodeId) => ({
            code: "orphan-node" as const,
            message: `Le nœud « ${nodeById.get(nodeId)?.label ?? nodeId} » reste hors du parcours faute de raccord.`,
            itemId: nodeId,
        })),
        ...(createLimitNotice(selection)
            ? [createLimitNotice(selection)!]
            : []),
    ];

    return {
        runtimeState: bobine.runtimeState,
        stages,
        connections,
        selection,
        notices,
        cycleDetected,
        orphanNodeIds,
    };
}

export function deriveTravellingDocumentaire(
    configuration: CodexPlanConfiguration,
    source: CodexTravellingDocumentaireMatterSource,
): CodexTravellingDocumentaireModel {
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
    const subject = createPlanSubjectReference(
        normalizedConfiguration,
        source.archives,
    );
    const model =
        source.kind === "archives"
            ? deriveFromArchives(
                  normalizedConfiguration,
                  source.archives,
                  subject,
              )
            : deriveFromBobine(normalizedConfiguration, source.bobine);

    return {
        configuration: normalizedConfiguration,
        subject,
        matter,
        ...model,
    };
}
