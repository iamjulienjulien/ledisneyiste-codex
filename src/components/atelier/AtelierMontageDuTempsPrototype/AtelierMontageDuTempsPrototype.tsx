"use client";

import { useMemo, useRef, useState } from "react";
import { formatDateHistorique } from "@/lib/date";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSelect } from "@/components/ui/PixieSelect";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { DateHistorique } from "@/types/date";
import type {
    CodexMontageDuTempsEvent,
    CodexMontageDuTempsTrack,
    CodexMontageDuTempsTrackSlug,
    CodexPlanRuntimeState,
} from "@/types/codex-plans";
import type {
    AtelierMontageDuTempsAngle,
    AtelierMontageDuTempsCountershotMode,
    AtelierMontageDuTempsEvidenceMode,
    AtelierMontageDuTempsGranularity,
    AtelierMontageDuTempsLightMode,
    AtelierMontageDuTempsMatterKey,
    AtelierMontageDuTempsPrototypeProps,
    AtelierMontageDuTempsTerritory,
    AtelierMontageDuTempsWindow,
} from "./AtelierMontageDuTempsPrototype.types";
import styles from "./AtelierMontageDuTempsPrototype.module.css";

const precisionLabels = {
    jour: "date connue au jour",
    mois: "date connue au mois",
    annee: "date connue à l’année",
} as const;

const runtimeLabels = {
    idle: "En attente",
    loading: "La matière rejoint le plateau",
    ready: "Prêt à comparer",
    empty: "Aucun repère dans le Cadre",
    sparse: "Chronologie réduite",
    dense: "Chronologie dense",
    incomplete: "Chronologie incomplète",
    error: "Projection impossible",
} as const satisfies Record<CodexPlanRuntimeState, string>;

const trackPresentation = {
    production: {
        color: "orange-banc-titre",
        shortLabel: "Fabriquer",
    },
    distribution: { color: "bleu-reperage", shortLabel: "Projeter" },
    reception: { color: "jaune-lampe", shortLabel: "Distinguer" },
    legacy: { color: "vert-cellulo", shortLabel: "Transmettre" },
    transformation: {
        color: "violet-ombre-portee",
        shortLabel: "Transformer",
    },
} as const satisfies Record<
    CodexMontageDuTempsTrackSlug,
    Readonly<{
        color: AtelierAnimationColorSlug;
        shortLabel: string;
    }>
>;

const angleOptions = [
    ["production", "Fabrication"],
    ["distribution", "Diffusion"],
    ["reception", "Réception"],
    ["legacy", "Postérité"],
    ["transformation", "Transformations"],
] as const satisfies readonly (readonly [AtelierMontageDuTempsAngle, string])[];

const windowDefinitions = {
    full: {
        label: "Toute la bobine",
        shortLabel: "1934–1939",
        start: "1934-01-01",
        end: "1939-12-31",
    },
    production: {
        label: "Mise en chantier",
        shortLabel: "1934–1937",
        start: "1934-01-01",
        end: "1937-12-31",
    },
    release: {
        label: "Autour de la première",
        shortLabel: "déc. 1937–mai 1938",
        start: "1937-12-01",
        end: "1938-05-31",
    },
    recognition: {
        label: "Temps des distinctions",
        shortLabel: "1938–fév. 1939",
        start: "1938-01-01",
        end: "1939-02-28",
    },
} as const satisfies Record<
    AtelierMontageDuTempsWindow,
    Readonly<{
        label: string;
        shortLabel: string;
        start: string;
        end: string;
    }>
>;

const territoryOptions = [
    ["all", "Tous les territoires"],
    ["us", "États-Unis"],
    ["france", "France"],
    ["international", "International"],
] as const satisfies readonly (readonly [
    AtelierMontageDuTempsTerritory,
    string,
])[];

function Setting({
    label,
    hint,
    children,
}: Readonly<{
    label: string;
    hint?: string;
    children: React.ReactNode;
}>) {
    return (
        <label className={styles.setting}>
            <span>{label}</span>
            {children}
            {hint ? <small>{hint}</small> : null}
        </label>
    );
}

function dateBounds(date: DateHistorique) {
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

    return {
        start: Date.UTC(year, month - 1, day),
        end: Date.UTC(year, lastMonth - 1, lastDay, 23, 59, 59),
    };
}

function timestamp(value: string) {
    return Date.parse(`${value}T00:00:00Z`);
}

function eventBounds(event: CodexMontageDuTempsEvent) {
    const start = dateBounds(event.start);
    const end = event.end ? dateBounds(event.end) : start;

    return { start: start.start, end: end.end };
}

function intersectsWindow(
    event: CodexMontageDuTempsEvent,
    window: (typeof windowDefinitions)[AtelierMontageDuTempsWindow],
) {
    const bounds = eventBounds(event);

    return (
        bounds.end >= timestamp(window.start) &&
        bounds.start <= timestamp(window.end)
    );
}

function matchesTerritory(
    event: CodexMontageDuTempsEvent,
    territory: AtelierMontageDuTempsTerritory,
) {
    if (territory === "all" || !event.territory) {
        return true;
    }
    if (territory === "us") {
        return event.territory === "États-Unis";
    }
    if (territory === "france") {
        return event.territory === "France";
    }

    return !["États-Unis", "France"].includes(event.territory);
}

function positionOnTimeline(
    value: number,
    start: number,
    end: number,
    clamp = false,
) {
    const raw = ((value - start) / Math.max(1, end - start)) * 100;
    const bounded = Math.max(0, Math.min(100, raw));

    return clamp ? Math.max(7, Math.min(93, bounded)) : bounded;
}

function eventPosition(
    event: CodexMontageDuTempsEvent,
    start: number,
    end: number,
    clamp = false,
) {
    const bounds = eventBounds(event);
    return positionOnTimeline(
        bounds.start + (bounds.end - bounds.start) / 2,
        start,
        end,
        clamp,
    );
}

function eventDateLabel(event: CodexMontageDuTempsEvent) {
    if (event.end) {
        return `De ${formatDateHistorique(event.start)} à ${formatDateHistorique(event.end)}`;
    }

    return formatDateHistorique(event.start);
}

function eventPrecisionLabel(event: CodexMontageDuTempsEvent) {
    if (!event.end) {
        return precisionLabels[event.start.precision];
    }

    return `bornes connues ${event.start.precision === event.end.precision ? `à ${event.start.precision === "annee" ? "l’année" : event.start.precision === "mois" ? "au mois" : "au jour"}` : "avec des précisions différentes"}${event.endExclusive ? " · fin exclusive" : ""}`;
}

function createTicks(
    start: number,
    end: number,
    granularity: AtelierMontageDuTempsGranularity,
) {
    const durationInDays = (end - start) / 86_400_000;
    const resolvedGranularity =
        granularity === "adaptive"
            ? durationInDays > 900
                ? "year"
                : "month"
            : granularity;
    const ticks: Readonly<{ id: string; label: string; value: number }>[] = [];
    const cursor = new Date(start);

    cursor.setUTCDate(1);
    if (resolvedGranularity === "year") {
        cursor.setUTCMonth(0);
    }

    while (cursor.getTime() <= end) {
        const value = cursor.getTime();
        ticks.push({
            id: cursor.toISOString(),
            label:
                resolvedGranularity === "year"
                    ? String(cursor.getUTCFullYear())
                    : new Intl.DateTimeFormat("fr-FR", {
                          month: "short",
                          year:
                              cursor.getUTCMonth() === 0
                                  ? "numeric"
                                  : undefined,
                          timeZone: "UTC",
                      }).format(cursor),
            value,
        });
        if (resolvedGranularity === "year") {
            cursor.setUTCFullYear(cursor.getUTCFullYear() + 1);
        } else {
            cursor.setUTCMonth(cursor.getUTCMonth() + 1);
        }
    }

    return { ticks, resolvedGranularity };
}

function eventSummary(event: CodexMontageDuTempsEvent) {
    const location = [event.territory, event.place].filter(Boolean).join(" · ");
    const reservation =
        event.documentaryState === "contradictory"
            ? "Cette datation appartient à un désaccord documentaire conservé sans arbitrage."
            : event.documentaryState === "partial"
              ? `La précision reste limitée : ${eventPrecisionLabel(event)}.`
              : undefined;

    return [eventDateLabel(event), location, reservation]
        .filter(Boolean)
        .join(" — ");
}

function TimelineEvent({
    event,
    row,
    timelineStart,
    timelineEnd,
    selected,
    onSelect,
    onKeyDown,
}: Readonly<{
    event: CodexMontageDuTempsEvent;
    row: number;
    timelineStart: number;
    timelineEnd: number;
    selected: boolean;
    onSelect: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}>) {
    const presentation = trackPresentation[event.track];
    const bounds = eventBounds(event);
    const markerPosition = eventPosition(event, timelineStart, timelineEnd);
    const cardPosition = eventPosition(event, timelineStart, timelineEnd, true);
    const rangeStart = positionOnTimeline(
        bounds.start,
        timelineStart,
        timelineEnd,
    );
    const rangeEnd = positionOnTimeline(bounds.end, timelineStart, timelineEnd);
    const isRange = event.end !== undefined || event.start.precision !== "jour";
    const connectorStart = Math.min(markerPosition, cardPosition);
    const connectorWidth = Math.abs(markerPosition - cardPosition);

    return (
        <div className={styles.eventSlot}>
            {isRange ? (
                <span
                    className={styles.rangeMarker}
                    data-state={event.documentaryState}
                    aria-hidden="true"
                    style={{
                        left: `${rangeStart}%`,
                        width: `${Math.max(0.8, rangeEnd - rangeStart)}%`,
                    }}
                />
            ) : (
                <span
                    className={styles.pointMarker}
                    data-state={event.documentaryState}
                    aria-hidden="true"
                    style={{ left: `${markerPosition}%` }}
                />
            )}
            <span
                className={styles.eventStem}
                aria-hidden="true"
                style={{
                    left: `${markerPosition}%`,
                    height: `${3.2 + row * 5.7}rem`,
                }}
            />
            {connectorWidth > 0.2 ? (
                <span
                    className={styles.eventConnector}
                    aria-hidden="true"
                    style={{
                        left: `${connectorStart}%`,
                        top: `${3.05 + row * 5.7}rem`,
                        width: `${connectorWidth}%`,
                    }}
                />
            ) : null}
            <button
                type="button"
                id={`montage-event-${event.id.replace(/[^a-z0-9-]/gi, "-")}`}
                className={styles.eventCard}
                data-selected={selected || undefined}
                data-state={event.documentaryState}
                aria-pressed={selected}
                aria-label={`${event.label}, ${eventSummary(event)}`}
                onClick={onSelect}
                onKeyDown={onKeyDown}
                style={{
                    left: `${cardPosition}%`,
                    top: `${3.45 + row * 5.7}rem`,
                    borderColor: `var(--atelier-animation-${presentation.color})`,
                }}
            >
                <span className={styles.eventDate}>
                    {eventDateLabel(event)}
                </span>
                <strong>{event.label}</strong>
                <span className={styles.eventPrecision}>
                    {eventPrecisionLabel(event)}
                </span>
            </button>
        </div>
    );
}

function TimelineTrack({
    track,
    activeAngle,
    timelineStart,
    timelineEnd,
    selectedId,
    onSelect,
    onKeyDown,
}: Readonly<{
    track: CodexMontageDuTempsTrack;
    activeAngle: AtelierMontageDuTempsAngle;
    timelineStart: number;
    timelineEnd: number;
    selectedId?: string;
    onSelect: (event: CodexMontageDuTempsEvent) => void;
    onKeyDown: (
        event: React.KeyboardEvent<HTMLButtonElement>,
        selectedEvent: CodexMontageDuTempsEvent,
    ) => void;
}>) {
    const presentation = trackPresentation[track.id];
    const rowCount = Math.min(3, Math.max(1, track.events.length));

    return (
        <section
            className={styles.track}
            data-muted={activeAngle !== track.id || undefined}
            aria-labelledby={`montage-track-${track.id}`}
        >
            <header className={styles.trackHeader}>
                <span
                    className={styles.trackCue}
                    aria-hidden="true"
                    style={{
                        backgroundColor: `var(--atelier-animation-${presentation.color})`,
                    }}
                />
                <p className={styles.trackAction}>{track.actionLabel}</p>
                <h5 id={`montage-track-${track.id}`}>{track.label}</h5>
                <p>{track.description}</p>
                <PixieBadge
                    size="xs"
                    variant="soft"
                    tone="color"
                    color={presentation.color}
                >
                    {track.events.length} repère
                    {track.events.length > 1 ? "s" : ""}
                </PixieBadge>
            </header>
            <div
                className={styles.trackLane}
                style={{ minHeight: `${5.2 + rowCount * 5.7}rem` }}
            >
                <span className={styles.trackLine} aria-hidden="true" />
                {track.events.length === 0 ? (
                    <p className={styles.emptyTrack}>
                        Aucun repère dans ce Cadre
                    </p>
                ) : null}
                {track.events.map((event, index) => (
                    <TimelineEvent
                        key={event.id}
                        event={event}
                        row={index % 3}
                        timelineStart={timelineStart}
                        timelineEnd={timelineEnd}
                        selected={event.id === selectedId}
                        onSelect={() => onSelect(event)}
                        onKeyDown={(keyboardEvent) =>
                            onKeyDown(keyboardEvent, event)
                        }
                    />
                ))}
            </div>
        </section>
    );
}

export function AtelierMontageDuTempsPrototype({
    projections,
}: AtelierMontageDuTempsPrototypeProps) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [matterKey, setMatterKey] =
        useState<AtelierMontageDuTempsMatterKey>("archives");
    const [angle, setAngle] =
        useState<AtelierMontageDuTempsAngle>("production");
    const [windowKey, setWindowKey] =
        useState<AtelierMontageDuTempsWindow>("full");
    const [granularity, setGranularity] =
        useState<AtelierMontageDuTempsGranularity>("adaptive");
    const [territory, setTerritory] =
        useState<AtelierMontageDuTempsTerritory>("all");
    const [evidenceMode, setEvidenceMode] =
        useState<AtelierMontageDuTempsEvidenceMode>("summary");
    const [countershot, setCountershot] =
        useState<AtelierMontageDuTempsCountershotMode>("visible");
    const [light, setLight] =
        useState<AtelierMontageDuTempsLightMode>("sombre");
    const [selectedId, setSelectedId] = useState<string>();
    const [announcement, setAnnouncement] = useState("");
    const projection =
        projections.find((item) => item.matterKey === matterKey) ??
        projections[0];

    const view = useMemo(() => {
        if (!projection) {
            return undefined;
        }

        const window = windowDefinitions[windowKey];
        const timelineStart = timestamp(window.start);
        const timelineEnd = timestamp(window.end);
        const events = projection.model.events.filter(
            (event) =>
                intersectsWindow(event, window) &&
                matchesTerritory(event, territory),
        );
        const eventIds = new Set(events.map((event) => event.id));
        const tracks = projection.model.tracks
            .filter((track) =>
                ["production", "distribution", "reception"].includes(track.id),
            )
            .map((track) => ({
                ...track,
                events: track.events.filter((event) => eventIds.has(event.id)),
            }));
        const tickResult = createTicks(timelineStart, timelineEnd, granularity);

        return {
            events,
            tracks,
            timelineStart,
            timelineEnd,
            timelineWidth:
                tickResult.resolvedGranularity === "month"
                    ? Math.max(1080, tickResult.ticks.length * 72)
                    : 1080,
            ...tickResult,
        };
    }, [granularity, projection, territory, windowKey]);

    if (!projection || !view) {
        return null;
    }

    const activeEvent =
        view.events.find((event) => event.id === selectedId) ?? view.events[0];
    const selectedEventId = activeEvent?.id;
    const activePosition = activeEvent
        ? eventPosition(activeEvent, view.timelineStart, view.timelineEnd)
        : undefined;
    const activeTrackHasMatter =
        (view.tracks.find((track) => track.id === angle)?.events.length ?? 0) >
        0;
    const matterLabel =
        projections.find((item) => item.matterKey === matterKey)?.matterLabel ??
        projection.matterLabel;
    const isArchiveProjection = projection.model.matter.kind === "archives";
    const title = isArchiveProjection
        ? "De la mise en chantier aux honneurs de l’Academy"
        : `Bobine témoin · ${matterLabel}`;
    const description = isArchiveProjection
        ? "La production, les premières sorties et les récompenses de Blanche-Neige occupent des rythmes différents sur une même bobine documentaire."
        : "Cette matière synthétique éprouve la précision, les contradictions et les états limites sans rejoindre les Archives.";
    const visibleEvents = view.events;

    function selectEvent(event: CodexMontageDuTempsEvent) {
        setSelectedId(event.id);
        setAnnouncement(
            `${event.label} sélectionné. ${eventDateLabel(event)}. ${eventPrecisionLabel(event)}.`,
        );
    }

    function handleEventKeyDown(
        keyboardEvent: React.KeyboardEvent<HTMLButtonElement>,
        event: CodexMontageDuTempsEvent,
    ) {
        const keys = [
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
        ];
        if (!keys.includes(keyboardEvent.key)) {
            return;
        }

        keyboardEvent.preventDefault();
        const index = visibleEvents.findIndex((item) => item.id === event.id);
        const direction = ["ArrowRight", "ArrowDown"].includes(
            keyboardEvent.key,
        )
            ? 1
            : -1;
        const nextIndex =
            keyboardEvent.key === "Home"
                ? 0
                : keyboardEvent.key === "End"
                  ? visibleEvents.length - 1
                  : Math.max(
                        0,
                        Math.min(visibleEvents.length - 1, index + direction),
                    );
        const nextEvent = visibleEvents[nextIndex];
        if (!nextEvent) {
            return;
        }

        selectEvent(nextEvent);
        requestAnimationFrame(() => {
            timelineRef.current
                ?.querySelector<HTMLElement>(
                    `#montage-event-${nextEvent.id.replace(/[^a-z0-9-]/gi, "-")}`,
                )
                ?.focus({ preventScroll: true });
        });
    }

    return (
        <div
            className={styles.projection}
            data-projection="originale"
            data-lumiere={light}
        >
            <header className={styles.prototypeHeader}>
                <div>
                    <p className={styles.prototypeEyebrow}>
                        Prototype privé · v0.1.0
                    </p>
                    <h3 className={styles.prototypeTitle}>{title}</h3>
                    <p className={styles.prototypeDescription}>{description}</p>
                </div>
                <div className={styles.prototypeBadges}>
                    <PixieBadge
                        size="sm"
                        variant="soft"
                        tone="color"
                        color={trackPresentation[angle].color}
                    >
                        {angleOptions.find(([value]) => value === angle)?.[1]}
                    </PixieBadge>
                    <PixieBadge size="sm" variant="outline" tone="inherit">
                        Comparer
                    </PixieBadge>
                </div>
            </header>

            <PixiePanel
                as="aside"
                variant="muted"
                padding="lg"
                dividers="header"
                header={
                    <div>
                        <p className={styles.panelEyebrow}>Régie</p>
                        <h4 className={styles.panelTitle}>
                            Régler la bobine temporelle
                        </h4>
                    </div>
                }
            >
                <div className={styles.settings}>
                    <Setting label="Matière">
                        <PixieSelect
                            value={matterKey}
                            onChange={(event) => {
                                setMatterKey(
                                    event.target
                                        .value as AtelierMontageDuTempsMatterKey,
                                );
                                setSelectedId(undefined);
                            }}
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {projections.map((item) => (
                                <option
                                    key={item.matterKey}
                                    value={item.matterKey}
                                >
                                    {item.matterLabel}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Angle"
                        hint="Les autres pistes restent visibles comme contexte."
                    >
                        <PixieSelect
                            value={angle}
                            onChange={(event) =>
                                setAngle(
                                    event.target
                                        .value as AtelierMontageDuTempsAngle,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {angleOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Fenêtre temporelle">
                        <PixieSelect
                            value={windowKey}
                            onChange={(event) => {
                                setWindowKey(
                                    event.target
                                        .value as AtelierMontageDuTempsWindow,
                                );
                                setSelectedId(undefined);
                            }}
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {Object.entries(windowDefinitions).map(
                                ([value, definition]) => (
                                    <option key={value} value={value}>
                                        {definition.label} ·{" "}
                                        {definition.shortLabel}
                                    </option>
                                ),
                            )}
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Granularité"
                        hint="Elle change la règle, jamais la précision des Archives."
                    >
                        <PixieSelect
                            value={granularity}
                            onChange={(event) =>
                                setGranularity(
                                    event.target
                                        .value as AtelierMontageDuTempsGranularity,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="adaptive">Adaptative</option>
                            <option value="year">Années</option>
                            <option value="month">Mois</option>
                        </PixieSelect>
                    </Setting>
                    <Setting
                        label="Territoire"
                        hint="La fabrication non territorialisée reste en contexte."
                    >
                        <PixieSelect
                            value={territory}
                            onChange={(event) => {
                                setTerritory(
                                    event.target
                                        .value as AtelierMontageDuTempsTerritory,
                                );
                                setSelectedId(undefined);
                            }}
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            {territoryOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </PixieSelect>
                    </Setting>
                    <Setting label="Preuves">
                        <PixieSelect
                            value={evidenceMode}
                            onChange={(event) =>
                                setEvidenceMode(
                                    event.target
                                        .value as AtelierMontageDuTempsEvidenceMode,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="summary">Résumé</option>
                            <option value="developed">Développées</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Contrechamp">
                        <PixieSelect
                            value={countershot}
                            onChange={(event) =>
                                setCountershot(
                                    event.target
                                        .value as AtelierMontageDuTempsCountershotMode,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="visible">Visible</option>
                            <option value="collapsed">Replié</option>
                        </PixieSelect>
                    </Setting>
                    <Setting label="Lumière">
                        <PixieSelect
                            value={light}
                            onChange={(event) =>
                                setLight(
                                    event.target
                                        .value as AtelierMontageDuTempsLightMode,
                                )
                            }
                            mode="popover"
                            portal
                            size="sm"
                            color="violet-ombre-portee"
                        >
                            <option value="sombre">Sombre</option>
                            <option value="claire">Claire</option>
                        </PixieSelect>
                    </Setting>
                </div>
            </PixiePanel>

            {!activeTrackHasMatter ? (
                <PixieCallout
                    variant="tinted"
                    color={trackPresentation[angle].color}
                    padding="md"
                    eyebrow="Angle incomplet"
                    heading={`${angleOptions.find(([value]) => value === angle)?.[1]} reste hors de cette bobine`}
                >
                    Les Archives courantes ne contiennent aucun événement
                    spécifique pour cet Angle. Les temporalités documentées
                    demeurent visibles en contexte atténué.
                </PixieCallout>
            ) : null}

            <section
                className={styles.master}
                aria-labelledby="montage-master-title"
            >
                <header className={styles.masterHeader}>
                    <div>
                        <p className={styles.panelEyebrow}>Plan maître</p>
                        <h4
                            id="montage-master-title"
                            className={styles.masterTitle}
                        >
                            {projection.model.focus.label}
                        </h4>
                        <p className={styles.masterDescription}>
                            Entre 1934 et 1939, la fabrication forme une période
                            longue, la diffusion traverse plusieurs territoires
                            et la reconnaissance se poursuit après la première.
                        </p>
                    </div>
                    <div className={styles.stateBadges}>
                        <PixieBadge size="sm" variant="outline" tone="inherit">
                            {view.events.length} repère
                            {view.events.length > 1 ? "s" : ""}
                        </PixieBadge>
                        <PixieBadge
                            size="sm"
                            variant="soft"
                            tone="color"
                            color={
                                projection.model.runtimeState === "ready"
                                    ? "vert-cellulo"
                                    : "violet-ombre-portee"
                            }
                        >
                            {runtimeLabels[projection.model.runtimeState]}
                        </PixieBadge>
                        {projection.model.matter.kind === "bobine-temoin" ? (
                            <PixieBadge
                                size="sm"
                                variant="outline"
                                tone="color"
                                color="jaune-lampe"
                            >
                                Bobine témoin
                            </PixieBadge>
                        ) : null}
                    </div>
                </header>

                {view.events.length > 0 ? (
                    <div
                        ref={timelineRef}
                        className={styles.timelineViewport}
                        role="region"
                        aria-label="Chronologie interactive par pistes. La région peut défiler horizontalement sur petit écran."
                        tabIndex={0}
                    >
                        <div
                            className={styles.timeline}
                            style={{ minWidth: `${view.timelineWidth}px` }}
                        >
                            <div className={styles.ruler} aria-hidden="true">
                                <span className={styles.rulerCaption}>
                                    Règle commune ·{" "}
                                    {windowDefinitions[windowKey].shortLabel}
                                </span>
                                <div className={styles.rulerScale}>
                                    {view.ticks.map((tick) => (
                                        <span
                                            key={tick.id}
                                            className={styles.tick}
                                            style={{
                                                left: `${positionOnTimeline(
                                                    tick.value,
                                                    view.timelineStart,
                                                    view.timelineEnd,
                                                )}%`,
                                            }}
                                        >
                                            {tick.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.timelineBody}>
                                {activePosition !== undefined ? (
                                    <span
                                        className={styles.playhead}
                                        aria-hidden="true"
                                        style={{
                                            left: `calc(14.25rem + (100% - 15.5rem) * ${activePosition / 100})`,
                                        }}
                                    >
                                        <span />
                                    </span>
                                ) : null}
                                {view.tracks.map((track) => (
                                    <TimelineTrack
                                        key={track.id}
                                        track={track}
                                        activeAngle={angle}
                                        timelineStart={view.timelineStart}
                                        timelineEnd={view.timelineEnd}
                                        selectedId={selectedEventId}
                                        onSelect={selectEvent}
                                        onKeyDown={handleEventKeyDown}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <PixieCallout
                        variant="outline"
                        color="violet-ombre-portee"
                        padding="lg"
                        eyebrow="Plan de coupe"
                        heading="Aucun événement dans ce Cadre"
                    >
                        La règle reste identifiable, mais la Matière, la fenêtre
                        ou le territoire courant ne fournit aucun repère à
                        comparer.
                    </PixieCallout>
                )}

                <p className={styles.liveStatus} aria-live="polite">
                    {announcement}
                </p>

                {activeEvent ? (
                    <PixiePanel
                        as="section"
                        variant="tinted"
                        color={trackPresentation[activeEvent.track].color}
                        padding="none"
                        headerPadding="lg"
                        bodyPadding="lg"
                        dividers="header"
                        header={
                            <div className={styles.inspectorHeader}>
                                <div>
                                    <p className={styles.panelEyebrow}>
                                        Repère actif ·{" "}
                                        {
                                            trackPresentation[activeEvent.track]
                                                .shortLabel
                                        }
                                    </p>
                                    <h5 className={styles.inspectorTitle}>
                                        {activeEvent.label}
                                    </h5>
                                </div>
                                <PixieBadge
                                    size="sm"
                                    variant="soft"
                                    tone="color"
                                    color={
                                        trackPresentation[activeEvent.track]
                                            .color
                                    }
                                >
                                    {eventDateLabel(activeEvent)}
                                </PixieBadge>
                            </div>
                        }
                    >
                        <div className={styles.inspectorGrid}>
                            <div>
                                <span>Précision</span>
                                <strong>
                                    {eventPrecisionLabel(activeEvent)}
                                </strong>
                            </div>
                            <div>
                                <span>Territoire</span>
                                <strong>
                                    {activeEvent.territory ??
                                        "Territoire non renseigné"}
                                </strong>
                            </div>
                            <div>
                                <span>Lieu</span>
                                <strong>
                                    {activeEvent.place ?? "Non renseigné"}
                                </strong>
                            </div>
                            <div>
                                <span>Rattachement</span>
                                <strong>
                                    {activeEvent.href ? (
                                        <PixieLink
                                            href={activeEvent.href}
                                            color={
                                                trackPresentation[
                                                    activeEvent.track
                                                ].color
                                            }
                                            indicator="arrow"
                                        >
                                            {projection.model.subject.label}
                                        </PixieLink>
                                    ) : (
                                        projection.model.subject.label
                                    )}
                                </strong>
                            </div>
                        </div>

                        <div className={styles.inspectorEvidence}>
                            <p className={styles.evidenceEyebrow}>
                                Preuves · {activeEvent.evidence.length} source
                                {activeEvent.evidence.length > 1 ? "s" : ""}
                            </p>
                            {evidenceMode === "developed" ? (
                                activeEvent.evidence.length > 0 ? (
                                    <ul>
                                        {activeEvent.evidence.map(
                                            (evidence) => (
                                                <li key={evidence.id}>
                                                    {evidence.url ? (
                                                        <PixieLink
                                                            href={evidence.url}
                                                            indicator="external"
                                                            color={
                                                                trackPresentation[
                                                                    activeEvent
                                                                        .track
                                                                ].color
                                                            }
                                                        >
                                                            {evidence.label}
                                                        </PixieLink>
                                                    ) : (
                                                        evidence.label
                                                    )}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : (
                                    <p className={styles.missingEvidence}>
                                        Aucune preuve rattachée à ce repère.
                                    </p>
                                )
                            ) : (
                                <p className={styles.evidenceSummary}>
                                    {activeEvent.evidence.length > 0
                                        ? `${activeEvent.evidence.length} source${activeEvent.evidence.length > 1 ? "s conservent" : " conserve"} la provenance du repère.`
                                        : "La provenance reste décrite sans source rattachée."}
                                </p>
                            )}
                            {activeEvent.documentaryState !== "documented" ? (
                                <p className={styles.reservation}>
                                    {activeEvent.documentaryState ===
                                    "contradictory"
                                        ? "Datation contradictoire : le Montage conserve les propositions concurrentes sans choisir."
                                        : `Réserve documentaire : ${eventPrecisionLabel(activeEvent)}.`}
                                </p>
                            ) : null}
                        </div>
                    </PixiePanel>
                ) : null}
            </section>

            {projection.model.notices.length > 0 ? (
                <PixieCallout
                    variant="outline"
                    color="jaune-lampe"
                    padding="md"
                    eyebrow="Raccords à surveiller"
                    heading={`${projection.model.notices.length} indication${projection.model.notices.length > 1 ? "s conservées" : " conservée"}`}
                >
                    <ul className={styles.notices}>
                        {projection.model.notices.map((notice, index) => (
                            <li
                                key={`${notice.code}:${notice.itemId ?? index}`}
                            >
                                {notice.message}
                            </li>
                        ))}
                    </ul>
                </PixieCallout>
            ) : null}

            <details
                className={styles.countershot}
                open={countershot === "visible"}
                onToggle={(event) =>
                    setCountershot(
                        event.currentTarget.open ? "visible" : "collapsed",
                    )
                }
            >
                <summary>
                    <span>
                        <span className={styles.panelEyebrow}>
                            Contrechamp textuel
                        </span>
                        <strong>Chronologie structurée par pistes</strong>
                    </span>
                    <span className={styles.countershotMeta}>
                        <span>{view.events.length} repères</span>
                        <span
                            className={styles.countershotToggle}
                            aria-hidden="true"
                        />
                    </span>
                </summary>
                <div className={styles.countershotBody}>
                    {view.tracks.map((track) => (
                        <section key={track.id}>
                            <h5>{track.actionLabel}</h5>
                            {track.events.length > 0 ? (
                                <ol>
                                    {track.events.map((event) => (
                                        <li key={event.id}>
                                            <strong>
                                                {eventDateLabel(event)}
                                            </strong>
                                            {" — "}
                                            {event.label}.{" "}
                                            {eventPrecisionLabel(event)}
                                            {event.territory
                                                ? ` · ${event.territory}`
                                                : " · territoire non renseigné"}
                                            {event.place
                                                ? ` · ${event.place}`
                                                : ""}
                                            {event.documentaryState ===
                                            "contradictory"
                                                ? " · proposition contradictoire conservée"
                                                : ""}
                                            {evidenceMode === "developed" &&
                                            event.evidence.length > 0
                                                ? ` · Sources : ${event.evidence.map((item) => item.label).join(" ; ")}`
                                                : ""}
                                            .
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>Aucun repère dans le Cadre courant.</p>
                            )}
                        </section>
                    ))}
                </div>
            </details>
        </div>
    );
}
