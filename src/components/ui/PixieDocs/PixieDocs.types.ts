import type { CSSProperties, ReactNode } from "react";
import type {
    GuidebookDocumentState,
    GuidebookTableOfContentsItem,
} from "@/types/guidebook";

export type PixieDocsNavigationState =
    "available" | "restricted" | "unavailable";

export type PixieDocsNavigationItem = Readonly<{
    slug: string;
    title: string;
    href: string | null;
    state?: PixieDocsNavigationState;
    children?: readonly PixieDocsNavigationItem[];
}>;

export type PixieDocsDestination = Readonly<{
    slug: string;
    title: string;
    href: string | null;
}>;

export type PixieDocsDensity = "compact" | "comfortable" | "airy";

export type PixieDocsNavigationWidth = "sm" | "md" | "lg";

export type PixieDocsNavigationMode = "inline" | "floating";

export type PixieDocsTocMode = "visible" | "collapsible" | "hidden";

export type PixieDocsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type PixieDocsStyle = CSSProperties & {
    "--pixie-docs-navigation-width"?: string;
    "--pixie-docs-toc-width"?: string;
};

export type PixieDocsProps = Readonly<{
    title: string;
    navigation: readonly PixieDocsNavigationItem[];
    activeSlug: string;
    documentTitle: string;
    document: ReactNode;
    tableOfContents?: readonly GuidebookTableOfContentsItem[];
    documentState?: GuidebookDocumentState;
    documentEyebrow?: ReactNode;
    documentSummary?: ReactNode;
    documentMeta?: ReactNode;
    stateMessage?: ReactNode;
    previous?: PixieDocsDestination | null;
    next?: PixieDocsDestination | null;
    density?: PixieDocsDensity;
    navigationWidth?: PixieDocsNavigationWidth;
    navigationMode?: PixieDocsNavigationMode;
    toc?: PixieDocsTocMode;
    sticky?: boolean;
    filterable?: boolean;
    filterLabel?: string;
    filterPlaceholder?: string;
    navigationLabel?: string;
    tableOfContentsLabel?: string;
    headingLevel?: PixieDocsHeadingLevel;
    onNavigate?: (slug: string) => void;
    className?: string;
    style?: PixieDocsStyle;
}>;
