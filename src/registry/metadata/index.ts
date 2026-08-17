import { metadataContributeurs } from "./metadata-contributeurs";
import { metadataOeuvres } from "./metadata-oeuvres";
import { metadataPersonnages } from "./metadata-personnages";
import { metadataRecompenses } from "./metadata-recompenses";
import type {
    MetadataCollectionName,
    MetadataDefinition,
    MetadataRegistryName,
    MetadataSelection,
    MetadataSlug,
} from "@/types/metadata";

export const metadataRegistry = {
    personnages: metadataPersonnages,
    contributeurs: metadataContributeurs,
    oeuvres: metadataOeuvres,
    recompenses: metadataRecompenses,
} as const;

export function getMetadata(selection: MetadataSelection): MetadataDefinition;
export function getMetadata<
    Registry extends MetadataRegistryName,
    Collection extends MetadataCollectionName<Registry>,
    Slug extends MetadataSlug<Registry, Collection>,
>(registry: Registry, collection: Collection, slug: Slug): MetadataDefinition;
export function getMetadata(
    selectionOrRegistry: MetadataSelection | MetadataRegistryName,
    collection?: string,
    slug?: string,
): MetadataDefinition {
    const selection =
        typeof selectionOrRegistry === "string"
            ? {
                  registry: selectionOrRegistry,
                  collection: collection as string,
                  slug: slug as string,
              }
            : selectionOrRegistry;
    const collections = metadataRegistry[selection.registry] as Record<
        string,
        Record<string, MetadataDefinition>
    >;

    return collections[selection.collection][selection.slug];
}

export function getMetadataSlugs<
    Registry extends MetadataRegistryName,
    Collection extends MetadataCollectionName<Registry>,
>(registry: Registry, collection: Collection) {
    const collections = metadataRegistry[registry] as Record<
        string,
        Record<string, MetadataDefinition>
    >;

    return Object.keys(collections[collection]) as MetadataSlug<
        Registry,
        Collection
    >[];
}

export type {
    MetadataCollectionName,
    MetadataDefinition,
    MetadataRegistryName,
    MetadataSelection,
    MetadataSlug,
} from "@/types/metadata";
