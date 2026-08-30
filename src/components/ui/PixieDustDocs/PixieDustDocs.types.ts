import type { CSSProperties, ReactNode } from "react";
import type {
    GuidebookDocumentState,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";

export type PixieDustDocsNavigationState =
    "available" | "restricted" | "unavailable";

export type PixieDustDocsNavigationItem = Readonly<{
    slug: string;
    title: string;
    href: string | null;
    state?: PixieDustDocsNavigationState;
    children?: readonly PixieDustDocsNavigationItem[];
}>;

export type PixieDustDocsDestination = Readonly<{
    slug: string;
    title: string;
    href: string | null;
}>;

export type PixieDustDocsDensity = "compact" | "comfortable" | "airy";

export type PixieDustDocsNavigationWidth = "sm" | "md" | "lg";

export type PixieDustDocsTocMode = "visible" | "collapsible" | "hidden";

export type PixieDustDocsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type PixieDustDocsStyle = CSSProperties & {
    "--pixie-docs-navigation-width"?: string;
    "--pixie-docs-toc-width"?: string;
};

export type PixieDustDocsProps = Readonly<{
    title: string;
    navigation: readonly PixieDustDocsNavigationItem[];
    activeSlug: string;
    documentTitle: string;
    document: ReactNode;
    tableOfContents?: readonly GuidebookTableOfContentsItem[];
    documentState?: GuidebookDocumentState;
    documentEyebrow?: ReactNode;
    documentSummary?: ReactNode;
    documentMeta?: ReactNode;
    stateMessage?: ReactNode;
    previous?: PixieDustDocsDestination | null;
    next?: PixieDustDocsDestination | null;
    density?: PixieDustDocsDensity;
    navigationWidth?: PixieDustDocsNavigationWidth;
    toc?: PixieDustDocsTocMode;
    sticky?: boolean;
    filterable?: boolean;
    filterLabel?: string;
    filterPlaceholder?: string;
    navigationLabel?: string;
    tableOfContentsLabel?: string;
    headingLevel?: PixieDustDocsHeadingLevel;
    onNavigate?: (slug: string) => void;
    className?: string;
    style?: PixieDustDocsStyle;
}>;
