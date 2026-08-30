"use client";

import {
    useDeferredValue,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type MouseEvent,
} from "react";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieInput } from "@/components/ui/PixieInput";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import type {
    GuidebookDocumentState,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";
import styles from "./PixieDocs.module.css";
import type {
    PixieDocsDensity,
    PixieDocsDestination,
    PixieDocsHeadingLevel,
    PixieDocsNavigationItem,
    PixieDocsNavigationWidth,
    PixieDocsProps,
} from "./PixieDocs.types";

const densityClasses = {
    compact: styles.densityCompact,
    comfortable: styles.densityComfortable,
    airy: styles.densityAiry,
} as const satisfies Record<PixieDocsDensity, string>;

const navigationWidthClasses = {
    sm: styles.navigationSmall,
    md: styles.navigationMedium,
    lg: styles.navigationLarge,
} as const satisfies Record<PixieDocsNavigationWidth, string>;

const stateLabels = {
    ready: "Prêt à lire",
    empty: "Document vide",
    missing: "Document introuvable",
    partial: "Lecture partielle",
    restricted: "Accès réservé",
    stale: "Mise à jour attendue",
    unavailable: "Projection indisponible",
    deferred: "Projection différée",
} as const satisfies Record<GuidebookDocumentState, string>;

const stateMessages = {
    ready: null,
    empty: "Ce document ne contient encore aucune matière transmissible.",
    missing:
        "La bibliothèque connaît cette place, mais aucun document ne peut y être résolu.",
    partial:
        "Une partie de la matière ne peut pas encore recevoir sa mise en scène complète.",
    restricted:
        "Ce document appartient aux coulisses et ne peut pas entrer dans cette projection.",
    stale: "Cette lecture reste disponible, mais sa source demande une nouvelle synchronisation.",
    unavailable: "La source autorisée ne peut pas être jointe pour le moment.",
    deferred:
        "Cette destination est prévue par le manifeste, mais son adaptateur n’est pas encore projeté.",
} as const satisfies Record<GuidebookDocumentState, string | null>;

function containsActive(
    item: PixieDocsNavigationItem,
    activeSlug: string,
): boolean {
    return (
        item.slug === activeSlug ||
        (item.children ?? []).some((child) => containsActive(child, activeSlug))
    );
}

function filterNavigation(
    items: readonly PixieDocsNavigationItem[],
    query: string,
    activeSlug: string,
): PixieDocsNavigationItem[] {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");

    if (!normalizedQuery) {
        return [...items];
    }

    return items.flatMap((item) => {
        const children = filterNavigation(
            item.children ?? [],
            normalizedQuery,
            activeSlug,
        );
        const matches = item.title
            .toLocaleLowerCase("fr")
            .includes(normalizedQuery);

        if (
            matches ||
            children.length > 0 ||
            containsActive(item, activeSlug)
        ) {
            return [{ ...item, children }];
        }

        return [];
    });
}

function NavigationTree({
    items,
    activeSlug,
    onNavigate,
    level = 0,
}: Readonly<{
    items: readonly PixieDocsNavigationItem[];
    activeSlug: string;
    onNavigate?: (slug: string) => void;
    level?: number;
}>) {
    return (
        <ul className={styles.navigationList} data-level={level}>
            {items.map((item) => {
                const state = item.state ?? "available";
                const isActive = item.slug === activeSlug;
                const children = item.children ?? [];
                const unavailable = state !== "available" || !item.href;
                const label = (
                    <>
                        <span
                            className={styles.navigationMarker}
                            aria-hidden="true"
                        >
                            {children.length > 0 ? "◇" : "·"}
                        </span>
                        <span className={styles.navigationText}>
                            {item.title}
                        </span>
                        {state === "restricted" ? (
                            <span className={styles.navigationState}>
                                Privé
                            </span>
                        ) : state === "unavailable" ? (
                            <span className={styles.navigationState}>
                                Indisponible
                            </span>
                        ) : null}
                    </>
                );

                const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
                    if (!onNavigate) {
                        return;
                    }

                    event.preventDefault();
                    onNavigate(item.slug);
                };

                return (
                    <li className={styles.navigationItem} key={item.slug}>
                        {unavailable ? (
                            <span
                                className={styles.navigationLink}
                                data-state={state}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {label}
                            </span>
                        ) : (
                            <PixieLink
                                href={item.href}
                                variant="surface"
                                indicator="none"
                                className={styles.navigationLink}
                                data-state={state}
                                aria-current={isActive ? "page" : undefined}
                                onClick={handleClick}
                            >
                                {label}
                            </PixieLink>
                        )}

                        {children.length > 0 ? (
                            <NavigationTree
                                items={children}
                                activeSlug={activeSlug}
                                onNavigate={onNavigate}
                                level={level + 1}
                            />
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
}

function TableOfContentsTree({
    items,
    activeId,
    level = 0,
}: Readonly<{
    items: readonly GuidebookTableOfContentsItem[];
    activeId: string;
    level?: number;
}>) {
    return (
        <ol className={styles.tocList} data-level={level}>
            {items.map((item) => (
                <li key={item.id}>
                    <a
                        href={`#${item.id}`}
                        className={styles.tocLink}
                        aria-current={
                            activeId === item.id ? "location" : undefined
                        }
                    >
                        {item.text}
                    </a>
                    {item.children.length > 0 ? (
                        <TableOfContentsTree
                            items={item.children}
                            activeId={activeId}
                            level={level + 1}
                        />
                    ) : null}
                </li>
            ))}
        </ol>
    );
}

function flattenTableOfContents(
    items: readonly GuidebookTableOfContentsItem[],
): GuidebookTableOfContentsItem[] {
    return items.flatMap((item) => [
        item,
        ...flattenTableOfContents(item.children),
    ]);
}

function LibraryNavigation({
    title,
    navigation,
    activeSlug,
    query,
    onQueryChange,
    onNavigate,
    filterable,
    filterLabel,
    filterPlaceholder,
}: Readonly<{
    title: string;
    navigation: readonly PixieDocsNavigationItem[];
    activeSlug: string;
    query: string;
    onQueryChange: (query: string) => void;
    onNavigate?: (slug: string) => void;
    filterable: boolean;
    filterLabel: string;
    filterPlaceholder: string;
}>) {
    const deferredQuery = useDeferredValue(query);
    const filteredNavigation = useMemo(
        () => filterNavigation(navigation, deferredQuery, activeSlug),
        [activeSlug, deferredQuery, navigation],
    );

    return (
        <div className={styles.libraryPanel}>
            <div className={styles.libraryHeader}>
                <p className={styles.eyebrow}>Bibliothèque</p>
                <h2 className={styles.libraryTitle}>{title}</h2>
            </div>

            {filterable ? (
                <label className={styles.filterField}>
                    <span className={styles.filterLabel}>{filterLabel}</span>
                    <PixieInput
                        type="search"
                        size="sm"
                        variant="filled"
                        placeholder={filterPlaceholder}
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        startAdornment="⌕"
                        aria-label={filterLabel}
                    />
                </label>
            ) : null}

            <nav aria-label={title} className={styles.navigationViewport}>
                {filteredNavigation.length > 0 ? (
                    <NavigationTree
                        items={filteredNavigation}
                        activeSlug={activeSlug}
                        onNavigate={onNavigate}
                    />
                ) : (
                    <p className={styles.noResult}>
                        Aucun titre ne correspond à ce repère.
                    </p>
                )}
            </nav>
        </div>
    );
}

function DocumentDestination({
    destination,
    direction,
    onNavigate,
}: Readonly<{
    destination: PixieDocsDestination | null | undefined;
    direction: "previous" | "next";
    onNavigate?: (slug: string) => void;
}>) {
    const label =
        direction === "previous" ? "Document précédent" : "Document suivant";
    const indicator = direction === "previous" ? "back" : "arrow";

    if (!destination?.href) {
        return <span className={styles.destinationUnavailable}>{label}</span>;
    }

    return (
        <PixieLink
            href={destination.href}
            variant="action"
            indicator={indicator}
            className={styles.destination}
            onClick={(event) => {
                if (!onNavigate) {
                    return;
                }

                event.preventDefault();
                onNavigate(destination.slug);
            }}
        >
            <span>
                <span className={styles.destinationLabel}>{label}</span>
                <span className={styles.destinationTitle}>
                    {destination.title}
                </span>
            </span>
        </PixieLink>
    );
}

export function PixieDocs({
    title,
    navigation,
    activeSlug,
    documentTitle,
    document: documentContent,
    tableOfContents = [],
    documentState = "ready",
    documentEyebrow = "Guidebook",
    documentSummary,
    documentMeta,
    stateMessage,
    previous,
    next,
    density = "comfortable",
    navigationWidth = "md",
    navigationMode = "inline",
    toc = "visible",
    sticky = true,
    filterable = true,
    filterLabel = "Filtrer les titres",
    filterPlaceholder = "Nom d’un chapitre…",
    navigationLabel = "Parcourir la bibliothèque",
    tableOfContentsLabel = "Dans ce document",
    headingLevel = 1,
    onNavigate,
    className = "",
    style,
}: PixieDocsProps) {
    const [query, setQuery] = useState("");
    const [observedHeadingId, setObservedHeadingId] = useState("");
    const [floatingLibraryOpen, setFloatingLibraryOpen] = useState(false);
    const rootRef = useRef<HTMLElement>(null);
    const floatingLibraryRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const floatingLibraryTriggerRef = useRef<HTMLButtonElement>(null);
    const previousSlugRef = useRef(activeSlug);
    const navigationDetailsId = useId();
    const floatingLibraryId = useId();
    const tocDetailsId = useId();
    const flatTableOfContents = useMemo(
        () => flattenTableOfContents(tableOfContents),
        [tableOfContents],
    );
    const activeHeadingId = flatTableOfContents.some(
        (item) => item.id === observedHeadingId,
    )
        ? observedHeadingId
        : (flatTableOfContents[0]?.id ?? "");
    const Heading = `h${headingLevel}` as `h${PixieDocsHeadingLevel}`;
    const resolvedStateMessage = stateMessage ?? stateMessages[documentState];
    const displaysDocument =
        documentState === "ready" ||
        documentState === "partial" ||
        documentState === "stale";
    const controlledNavigate = onNavigate
        ? (slug: string) => {
              setQuery("");
              setFloatingLibraryOpen(false);
              onNavigate(slug);
          }
        : undefined;

    useEffect(() => {
        if (navigationMode !== "floating") {
            return;
        }

        const root = rootRef.current;
        const floatingLibrary = floatingLibraryRef.current;

        if (!root || !floatingLibrary) {
            return;
        }

        let animationFrame = 0;
        const updateFloatingPosition = () => {
            animationFrame = 0;
            const rootRect = root.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const boundaryInset = 24;
            const availableHeight = Math.max(
                1,
                rootRect.height - boundaryInset * 2,
            );

            root.style.setProperty(
                "--pixie-docs-floating-left",
                `${rootRect.left}px`,
            );
            root.style.setProperty(
                "--pixie-docs-floating-max-height",
                `${availableHeight}px`,
            );

            const floatingHeight = floatingLibrary.offsetHeight;
            const preferredTop = (viewportHeight - floatingHeight) / 2;
            const componentTop = rootRect.top + boundaryInset;
            const componentBottom = rootRect.bottom - boundaryInset;
            const minimumTop = Math.max(boundaryInset, componentTop);
            const maximumTop = Math.min(
                viewportHeight - boundaryInset - floatingHeight,
                componentBottom - floatingHeight,
            );
            let floatingTop: number;

            if (maximumTop >= minimumTop) {
                floatingTop = Math.min(
                    Math.max(preferredTop, minimumTop),
                    maximumTop,
                );
            } else if (componentBottom <= boundaryInset) {
                floatingTop = componentBottom - floatingHeight;
            } else {
                floatingTop = componentTop;
            }

            root.style.setProperty(
                "--pixie-docs-floating-top",
                `${floatingTop}px`,
            );
        };
        const scheduleFloatingPositionUpdate = () => {
            if (animationFrame !== 0) {
                return;
            }

            animationFrame = window.requestAnimationFrame(
                updateFloatingPosition,
            );
        };
        const resizeObserver = new ResizeObserver(
            scheduleFloatingPositionUpdate,
        );

        updateFloatingPosition();
        resizeObserver.observe(root);
        resizeObserver.observe(floatingLibrary);
        window.addEventListener("resize", scheduleFloatingPositionUpdate);
        window.addEventListener("scroll", scheduleFloatingPositionUpdate, {
            capture: true,
            passive: true,
        });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener(
                "resize",
                scheduleFloatingPositionUpdate,
            );
            window.removeEventListener(
                "scroll",
                scheduleFloatingPositionUpdate,
                true,
            );
            window.cancelAnimationFrame(animationFrame);
            root.style.removeProperty("--pixie-docs-floating-left");
            root.style.removeProperty("--pixie-docs-floating-max-height");
            root.style.removeProperty("--pixie-docs-floating-top");
        };
    }, [navigationMode]);

    useEffect(() => {
        if (previousSlugRef.current === activeSlug) {
            return;
        }

        previousSlugRef.current = activeSlug;
        titleRef.current?.focus({ preventScroll: true });
    }, [activeSlug]);

    useEffect(() => {
        if (flatTableOfContents.length === 0) {
            return;
        }

        const existingHeadings = flatTableOfContents.flatMap((item) => {
            const element = document.getElementById(item.id);
            return element ? [element] : [];
        });

        if (existingHeadings.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            first.boundingClientRect.top -
                            second.boundingClientRect.top,
                    );

                if (visible[0]) {
                    setObservedHeadingId(visible[0].target.id);
                }
            },
            { rootMargin: "-12% 0px -72% 0px" },
        );

        existingHeadings.forEach((heading) => observer.observe(heading));
        return () => observer.disconnect();
    }, [activeSlug, flatTableOfContents]);

    const library = (
        <LibraryNavigation
            title={title}
            navigation={navigation}
            activeSlug={activeSlug}
            query={query}
            onQueryChange={setQuery}
            onNavigate={controlledNavigate}
            filterable={filterable}
            filterLabel={filterLabel}
            filterPlaceholder={filterPlaceholder}
        />
    );
    const tableOfContentsContent =
        tableOfContents.length > 0 ? (
            <nav aria-label={tableOfContentsLabel} className={styles.tocPanel}>
                <p className={styles.eyebrow}>Sommaire</p>
                <h2 className={styles.tocTitle}>{tableOfContentsLabel}</h2>
                <TableOfContentsTree
                    items={tableOfContents}
                    activeId={activeHeadingId}
                />
            </nav>
        ) : null;

    return (
        <section
            ref={rootRef}
            className={`${styles.root} ${densityClasses[density]} ${navigationWidthClasses[navigationWidth]} ${className}`.trim()}
            style={style}
            data-pixie-docs-density={density}
            data-pixie-docs-navigation-width={navigationWidth}
            data-pixie-docs-navigation-mode={navigationMode}
            data-pixie-docs-sticky={sticky || undefined}
            data-pixie-docs-toc={toc}
            data-pixie-docs-has-toc={tableOfContentsContent ? true : undefined}
            aria-label={title}
        >
            <div className={styles.layout}>
                <details
                    className={styles.mobileLibrary}
                    id={navigationDetailsId}
                >
                    <summary>{navigationLabel}</summary>
                    {library}
                </details>

                <aside
                    className={styles.desktopLibrary}
                    aria-label={navigationLabel}
                >
                    <div className={styles.stickyRegion}>{library}</div>
                </aside>

                <aside
                    ref={floatingLibraryRef}
                    className={styles.floatingLibrary}
                    data-open={floatingLibraryOpen || undefined}
                    aria-label={navigationLabel}
                    onPointerEnter={() => setFloatingLibraryOpen(true)}
                    onPointerLeave={(event) => {
                        if (
                            !event.currentTarget.contains(
                                document.activeElement,
                            )
                        ) {
                            setFloatingLibraryOpen(false);
                        }
                    }}
                    onBlur={(event) => {
                        if (
                            !event.currentTarget.contains(
                                event.relatedTarget as Node | null,
                            )
                        ) {
                            setFloatingLibraryOpen(false);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            event.preventDefault();
                            setFloatingLibraryOpen(false);
                            floatingLibraryTriggerRef.current?.focus();
                        }
                    }}
                >
                    <div className={styles.floatingLibraryPanel}>
                        <button
                            ref={floatingLibraryTriggerRef}
                            type="button"
                            className={styles.floatingLibraryTrigger}
                            aria-controls={floatingLibraryId}
                            aria-expanded={floatingLibraryOpen}
                            onClick={() =>
                                setFloatingLibraryOpen((open) => !open)
                            }
                        >
                            <span aria-hidden="true">
                                {floatingLibraryOpen ? "‹" : "›"}
                            </span>
                            <span className={styles.visuallyHidden}>
                                {floatingLibraryOpen
                                    ? "Fermer la bibliothèque"
                                    : navigationLabel}
                            </span>
                        </button>
                        <PixiePanel
                            as="div"
                            variant="accent"
                            padding="none"
                            radius="large"
                            color="violet-ombre-portee"
                            accentPosition="end"
                            elevation="strong"
                            scroll="body"
                            id={floatingLibraryId}
                            className={styles.floatingLibraryViewport}
                            aria-hidden={!floatingLibraryOpen}
                            inert={floatingLibraryOpen ? undefined : true}
                        >
                            {library}
                        </PixiePanel>
                    </div>
                </aside>

                <article className={styles.documentColumn}>
                    <header className={styles.documentHeader}>
                        <div className={styles.documentHeadingRow}>
                            <div className={styles.documentHeading}>
                                <p className={styles.eyebrow}>
                                    {documentEyebrow}
                                </p>
                                <Heading
                                    ref={titleRef}
                                    tabIndex={-1}
                                    className={styles.documentTitle}
                                >
                                    {documentTitle}
                                </Heading>
                            </div>
                            <PixieBadge
                                variant="outline"
                                size="sm"
                                tone="neutral"
                            >
                                {stateLabels[documentState]}
                            </PixieBadge>
                        </div>
                        {documentSummary ? (
                            <div className={styles.documentSummary}>
                                {documentSummary}
                            </div>
                        ) : null}
                        {documentMeta ? (
                            <div className={styles.documentMeta}>
                                {documentMeta}
                            </div>
                        ) : null}
                    </header>

                    {toc !== "hidden" && tableOfContentsContent ? (
                        <details className={styles.inlineToc} id={tocDetailsId}>
                            <summary>{tableOfContentsLabel}</summary>
                            {tableOfContentsContent}
                        </details>
                    ) : null}

                    {resolvedStateMessage && documentState !== "ready" ? (
                        <div
                            className={styles.stateMessage}
                            data-state={documentState}
                            role={
                                documentState === "unavailable"
                                    ? "status"
                                    : undefined
                            }
                        >
                            <p className={styles.stateTitle}>
                                {stateLabels[documentState]}
                            </p>
                            <div>{resolvedStateMessage}</div>
                        </div>
                    ) : null}

                    <div className={styles.documentViewport}>
                        {displaysDocument ? documentContent : null}
                    </div>

                    <footer className={styles.documentFooter}>
                        <DocumentDestination
                            destination={previous}
                            direction="previous"
                            onNavigate={controlledNavigate}
                        />
                        <DocumentDestination
                            destination={next}
                            direction="next"
                            onNavigate={controlledNavigate}
                        />
                    </footer>
                </article>

                {toc !== "hidden" && tableOfContentsContent ? (
                    <aside className={styles.desktopToc}>
                        <div className={styles.stickyRegion}>
                            {tableOfContentsContent}
                        </div>
                    </aside>
                ) : null}

                <p className={styles.visuallyHidden} aria-live="polite">
                    Document affiché : {documentTitle}. État :{" "}
                    {stateLabels[documentState]}.
                </p>
            </div>
        </section>
    );
}
