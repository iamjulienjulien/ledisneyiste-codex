import { symbolsBlocs } from "./symbols-blocs";
import { symbolsCodex } from "./symbols-codex";
import { symbolsGeneral } from "./symbols-general";
import { symbolsRecompenses } from "./symbols-recompenses";
import type { SymbolDefinition } from "@/types/symbols";

export const symbolsRegistry = {
    blocs: symbolsBlocs,
    codex: symbolsCodex,
    general: symbolsGeneral,
    recompenses: symbolsRecompenses,
} as const;

export type SymbolRegistryName = keyof typeof symbolsRegistry;

export type SymbolCollectionName<Registry extends SymbolRegistryName> = Extract<
    keyof (typeof symbolsRegistry)[Registry],
    string
>;

export type SymbolSlug<
    Registry extends SymbolRegistryName,
    Collection extends SymbolCollectionName<Registry>,
> = Extract<keyof (typeof symbolsRegistry)[Registry][Collection], string>;

export type SymbolSelection = {
    [Registry in SymbolRegistryName]: {
        [Collection in SymbolCollectionName<Registry>]: {
            registry: Registry;
            collection: Collection;
            slug: SymbolSlug<Registry, Collection>;
        };
    }[SymbolCollectionName<Registry>];
}[SymbolRegistryName];

export function getSymbol(selection: SymbolSelection): SymbolDefinition;
export function getSymbol<
    Registry extends SymbolRegistryName,
    Collection extends SymbolCollectionName<Registry>,
    Slug extends SymbolSlug<Registry, Collection>,
>(registry: Registry, collection: Collection, slug: Slug): SymbolDefinition;
export function getSymbol(
    selectionOrRegistry: SymbolSelection | SymbolRegistryName,
    collection?: string,
    slug?: string,
): SymbolDefinition {
    const selection =
        typeof selectionOrRegistry === "string"
            ? {
                  registry: selectionOrRegistry,
                  collection: collection as string,
                  slug: slug as string,
              }
            : selectionOrRegistry;
    const collections = symbolsRegistry[selection.registry] as Record<
        string,
        Record<string, SymbolDefinition>
    >;

    return collections[selection.collection][selection.slug];
}

export function getSymbolSlugs<
    Registry extends SymbolRegistryName,
    Collection extends SymbolCollectionName<Registry>,
>(registry: Registry, collection: Collection) {
    const collections = symbolsRegistry[registry] as Record<
        string,
        Record<string, SymbolDefinition>
    >;

    return Object.keys(collections[collection]) as SymbolSlug<
        Registry,
        Collection
    >[];
}

export type { SymbolDefinition } from "@/types/symbols";
