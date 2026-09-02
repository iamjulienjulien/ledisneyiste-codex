export type TypeReferenceCodex =
    "personnage" | "contributeur" | "oeuvre" | "epoque" | "chanson";

export type ReferenceCodex =
    | {
          nom: string;
          type: TypeReferenceCodex;
          slug: string;
      }
    | {
          nom: string;
          type?: never;
          slug?: never;
      };
