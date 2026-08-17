import type { metadataRegistry } from "@/registry/metadata";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type MetadataDefinition = Readonly<{
    label: string;
    description: string;
    color: AtelierAnimationColorSlug;
}>;

export type MetadataRegistryName = keyof typeof metadataRegistry;

export type MetadataCollectionName<Registry extends MetadataRegistryName> =
    Extract<keyof (typeof metadataRegistry)[Registry], string>;

export type MetadataSlug<
    Registry extends MetadataRegistryName,
    Collection extends MetadataCollectionName<Registry>,
> = Extract<keyof (typeof metadataRegistry)[Registry][Collection], string>;

export type MetadataSelection = {
    [Registry in MetadataRegistryName]: {
        [Collection in MetadataCollectionName<Registry>]: {
            registry: Registry;
            collection: Collection;
            slug: MetadataSlug<Registry, Collection>;
        };
    }[MetadataCollectionName<Registry>];
}[MetadataRegistryName];

export type CategoriePersonnageDisney = MetadataSlug<
    "personnages",
    "categories"
>;

export type CategorieContributeurDisney = MetadataSlug<
    "contributeurs",
    "categories"
>;

export type CollectionOeuvreDisney = MetadataSlug<"oeuvres", "collections">;

export type TypeOeuvreDisney = MetadataSlug<"oeuvres", "types">;

export type SonOeuvreDisney = MetadataSlug<"oeuvres", "sons">;

export type CouleurOeuvreDisney = MetadataSlug<"oeuvres", "couleurs">;

export type NatureRecompenseDisney = MetadataSlug<"recompenses", "natures">;
