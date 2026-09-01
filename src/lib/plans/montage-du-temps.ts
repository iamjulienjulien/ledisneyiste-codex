import { derivePlanEvents } from "@/lib/plans/events";
import { createRewardReference } from "@/lib/plans/utils";
import type { DateHistorique } from "@/types/date";
import type {
    CodexMontageDuTempsBounds,
    CodexMontageDuTempsContradiction,
    CodexMontageDuTempsDocumentaryState,
    CodexMontageDuTempsEvent,
    CodexMontageDuTempsEvidence,
    CodexMontageDuTempsMatterSource,
    CodexMontageDuTempsModel,
    CodexMontageDuTempsTrack,
    CodexMontageDuTempsTrackSlug,
    CodexPlanArchives,
    CodexPlanConfiguration,
    CodexPlanDerivationNotice,
    CodexPlanEntityReference,
    CodexPlanEvent,
    CodexPlanProvenance,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";
import type { RecompenseDisney } from "@/types/recompense";

const trackDefinitions = [
    {
        id: "production",
        label: "Fabrication",
        actionLabel: "Fabriquer",
        description: "Le temps long pendant lequel l’œuvre prend forme.",
    },
    {
        id: "distribution",
        label: "Diffusion",
        actionLabel: "Projeter",
        description: "Les premières et sorties qui déploient l’œuvre.",
    },
    {
        id: "reception",
        label: "Reconnaissance",
        actionLabel: "Distinguer",
        description: "Les distinctions qui prolongent sa réception.",
    },
    {
        id: "legacy",
        label: "Postérité",
        actionLabel: "Transmettre",
        description: "Les prolongements documentés après sa première vie.",
    },
    {
        id: "transformation",
        label: "Transformations",
        actionLabel: "Transformer",
        description: "Les changements de forme explicitement documentés.",
    },
] as const satisfies readonly Omit<CodexMontageDuTempsTrack, "events">[];

const trackOrder = new Map(
    trackDefinitions.map((track, index) => [track.id, index]),
);

function getSubject(
    configuration: CodexPlanConfiguration,
    archives: CodexPlanArchives,
): CodexPlanEntityReference {
    const { family, slug } = configuration.subject;
    const definitions = {
        personnages: {
            kind: "personnage",
            collection: archives.catalogues.personnages,
        },
        createurs: {
            kind: "contributeur",
            collection: archives.catalogues.contributeurs,
        },
        oeuvres: {
            kind: "oeuvre",
            collection: archives.catalogues.oeuvres,
        },
        epoques: {
            kind: "epoque",
            collection: archives.catalogues.epoques,
        },
    } as const;
    const definition = definitions[family];
    const entry = definition.collection.find((item) => item.slug === slug);

    return {
        id: `${definition.kind}:${slug}`,
        kind: definition.kind,
        label: entry?.nom ?? slug,
        slug,
        resolved: entry !== undefined,
    };
}

function createHref(reference: CodexPlanEntityReference) {
    if (!reference.resolved || !reference.slug) {
        return undefined;
    }

    const routes = {
        personnage: "personnages",
        contributeur: "contributeurs",
        oeuvre: "oeuvres",
        epoque: "epoques",
    } as const;
    const route = routes[reference.kind as keyof typeof routes];

    return route ? `/${route}/${reference.slug}` : undefined;
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
): readonly CodexMontageDuTempsEvidence[] {
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
    event: CodexPlanEvent,
    source: Extract<CodexMontageDuTempsMatterSource, { kind: "bobine-temoin" }>,
) {
    return source.bobine.evidence
        .filter((item) => item.owner.id === event.subject.id)
        .flatMap((item) =>
            item.sources.length > 0
                ? item.sources.map((evidenceSource) => ({
                      id: evidenceSource.id,
                      label: evidenceSource.label,
                  }))
                : [{ id: item.id, label: item.label }],
        );
}

function documentaryState(
    start: DateHistorique,
    end?: DateHistorique,
): CodexMontageDuTempsDocumentaryState {
    return start.precision === "jour" && (!end || end.precision === "jour")
        ? "documented"
        : "partial";
}

function asDateBounds(date: DateHistorique) {
    const [yearValue, monthValue = "01", dayValue = "01"] =
        date.valeur.split("-");
    const year = Number(yearValue);
    const month = Number(monthValue);
    const day = Number(dayValue);
    const lastMonth = date.precision === "annee" ? 12 : month;
    const lastDay =
        date.precision === "jour"
            ? day
            : new Date(Date.UTC(year, lastMonth, 0)).getUTCDate();
    const start = Date.UTC(year, month - 1, day);
    const end = Date.UTC(year, lastMonth - 1, lastDay);

    return { start, end };
}

function toIsoDate(timestamp: number) {
    return new Date(timestamp).toISOString().slice(0, 10);
}

function createBounds(
    events: readonly CodexMontageDuTempsEvent[],
): CodexMontageDuTempsBounds | undefined {
    if (events.length === 0) {
        return undefined;
    }

    const starts = events.map((event) => asDateBounds(event.start).start);
    const ends = events.map((event) =>
        event.end ? asDateBounds(event.end).end : asDateBounds(event.start).end,
    );

    return {
        start: toIsoDate(Math.min(...starts)),
        end: toIsoDate(Math.max(...ends)),
    };
}

function sortEvents(events: readonly CodexMontageDuTempsEvent[]) {
    return [...events].sort((a, b) => {
        const dateDifference =
            asDateBounds(a.start).start - asDateBounds(b.start).start;

        return (
            dateDifference ||
            (trackOrder.get(a.track) ?? 99) - (trackOrder.get(b.track) ?? 99) ||
            a.label.localeCompare(b.label, "fr")
        );
    });
}

function createTracks(
    events: readonly CodexMontageDuTempsEvent[],
): readonly CodexMontageDuTempsTrack[] {
    return trackDefinitions.map((definition) => ({
        ...definition,
        events: events.filter((event) => event.track === definition.id),
    }));
}

function archiveTrack(
    kind: CodexPlanEvent["kind"],
): CodexMontageDuTempsTrackSlug {
    switch (kind) {
        case "production":
            return "production";
        case "work-release":
        case "release-event":
        case "work-exploitation":
            return "distribution";
        case "work-reception":
        case "reward":
            return "reception";
        default:
            return "transformation";
    }
}

function rewardLocation(reward: RecompenseDisney) {
    if (reward.id.startsWith("venice-film-festival")) {
        return { territory: "International", place: "Venise" };
    }
    if (reward.id.startsWith("nyfcc")) {
        return { territory: "États-Unis", place: "New York" };
    }
    if (reward.id.startsWith("academy-awards")) {
        return { territory: "États-Unis", place: "Los Angeles" };
    }

    return {};
}

function deriveArchiveEvents(
    archives: CodexPlanArchives,
    subject: CodexPlanEntityReference,
) {
    const eventResult = derivePlanEvents(archives);
    const subjectEvents = eventResult.items.filter(
        (event) =>
            event.subject.slug === subject.slug &&
            [
                "production",
                "work-release",
                "release-event",
                "work-exploitation",
                "work-reception",
            ].includes(event.kind),
    );
    const hasDetailedReleaseEvents = subjectEvents.some(
        (event) =>
            event.kind === "release-event" ||
            event.kind === "work-exploitation",
    );
    const href = createHref(subject);
    const events: CodexMontageDuTempsEvent[] = subjectEvents
        .filter(
            (event) =>
                event.kind !== "work-release" || !hasDetailedReleaseEvents,
        )
        .map((event) => ({
            ...event,
            track: archiveTrack(event.kind),
            ...(href ? { href } : {}),
            evidence: createArchiveEvidence(event.provenance, archives),
            documentaryState: documentaryState(event.start, event.end),
        }));

    for (const reward of archives.recompenses.filter(
        (item) => item.oeuvreConcernee?.slug === subject.slug,
    )) {
        const provenance: readonly CodexPlanProvenance[] = [
            {
                kind: "sourced-fact",
                sourceIds: reward.sources,
                explanation:
                    "Distinction jointe explicitement à l’œuvre concernée dans le registre des récompenses.",
            },
        ];
        const rewardReference = createRewardReference(
            reward.id,
            reward.categorie ?? reward.motif,
        );

        events.push({
            id: `reward:${reward.id}`,
            kind: "reward",
            track: "reception",
            label: rewardReference.label,
            subject,
            start: reward.dateAttribution,
            ...rewardLocation(reward),
            ...(href ? { href } : {}),
            evidence: createArchiveEvidence(provenance, archives),
            provenance,
            documentaryState: documentaryState(reward.dateAttribution),
        });
    }

    const selectedIds = new Set(events.map((event) => event.id));

    return {
        events: sortEvents(events),
        notices: eventResult.notices.filter(
            (notice) =>
                notice.itemId === undefined || selectedIds.has(notice.itemId),
        ),
    };
}

function createConflict(
    events: readonly CodexMontageDuTempsEvent[],
): CodexMontageDuTempsContradiction | undefined {
    const eventIds = events
        .filter((event) => event.conflictGroupId === "release-date")
        .map((event) => event.id);

    return eventIds.length > 1
        ? {
              id: "release-date",
              eventIds,
              message:
                  "Deux propositions documentaires datent différemment le même événement ; le Montage les conserve sans arbitrer.",
          }
        : undefined;
}

function deriveBobineEvents(
    source: Extract<CodexMontageDuTempsMatterSource, { kind: "bobine-temoin" }>,
) {
    const contradictory =
        source.bobine.slug === "dates-partielles-et-contradictoires";
    const events = sortEvents(
        source.bobine.events.map((event) => {
            const belongsToConflict =
                contradictory &&
                event.kind === "release-event" &&
                event.id.includes("contradictoire");

            return {
                ...event,
                track: archiveTrack(event.kind),
                evidence: createBobineEvidence(event, source),
                documentaryState: belongsToConflict
                    ? "contradictory"
                    : documentaryState(event.start, event.end),
                ...(belongsToConflict
                    ? { conflictGroupId: "release-date" }
                    : {}),
            } satisfies CodexMontageDuTempsEvent;
        }),
    );
    const contradiction = createConflict(events);
    const notices: CodexPlanDerivationNotice[] = [
        {
            code: "bobine-temoin-active",
            message: `La projection utilise la Bobine témoin « ${source.bobine.label} » ; aucune de ses données ne rejoint les Archives.`,
        },
        ...(contradiction
            ? [
                  {
                      code: "date-conflict" as const,
                      message: contradiction.message,
                      itemId: contradiction.id,
                  },
              ]
            : []),
    ];

    return {
        events,
        notices,
        contradictions: contradiction ? [contradiction] : [],
    };
}

function runtimeStateForArchives(
    subject: CodexPlanEntityReference,
    events: readonly CodexMontageDuTempsEvent[],
): CodexPlanRuntimeState {
    if (!subject.resolved) {
        return "error";
    }
    if (events.length === 0) {
        return "empty";
    }

    return new Set(events.map((event) => event.track)).size === 1
        ? "sparse"
        : "ready";
}

export function deriveMontageDuTemps(
    configuration: CodexPlanConfiguration,
    source: CodexMontageDuTempsMatterSource,
): CodexMontageDuTempsModel {
    const subject = getSubject(configuration, source.archives);
    const archiveResult =
        source.kind === "archives"
            ? deriveArchiveEvents(source.archives, subject)
            : undefined;
    const bobineResult =
        source.kind === "bobine-temoin"
            ? deriveBobineEvents(source)
            : undefined;
    const events = archiveResult?.events ?? bobineResult?.events ?? [];
    const focus =
        source.kind === "bobine-temoin"
            ? (source.bobine.nodes.find(
                  (node) => node.id === events[0]?.subject.id,
              ) ?? subject)
            : subject;
    const notices = archiveResult?.notices ?? bobineResult?.notices ?? [];
    const contradictions = bobineResult?.contradictions ?? [];

    return {
        configuration,
        subject,
        focus,
        matter:
            source.kind === "archives"
                ? { kind: "archives" }
                : source.bobine.matter,
        runtimeState:
            source.kind === "archives"
                ? runtimeStateForArchives(subject, events)
                : source.bobine.runtimeState,
        ...(createBounds(events) ? { bounds: createBounds(events) } : {}),
        tracks: createTracks(events),
        events,
        excludedEvents: [],
        selection: {
            total: events.length,
            returned: events.length,
            truncated: false,
        },
        notices,
        contradictions,
    };
}
