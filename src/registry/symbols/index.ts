import { symbolsCodex } from "./symbols-codex";
import type { SymbolDefinition } from "@/types/symbols";

export const symbolsRegistry = {
    codex: symbolsCodex,
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

export function getSymbol<
    Registry extends SymbolRegistryName,
    Collection extends SymbolCollectionName<Registry>,
    Slug extends SymbolSlug<Registry, Collection>,
>(registry: Registry, collection: Collection, slug: Slug): SymbolDefinition {
    const collections = symbolsRegistry[registry] as Record<
        string,
        Record<string, SymbolDefinition>
    >;

    return collections[collection][slug];
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
