import type { languesCodex } from "@/registry/identites/langues";
import type { territoiresCodex } from "@/registry/identites/territoires";
import type { CodexFamily } from "@/types/codex";

export type LangueCodexDefinition = Readonly<{
    label: string;
    labelNatif: string;
}>;

export type TerritoireCodexDefinition = Readonly<{
    label: string;
}>;

export type CodeLangueCodex = keyof typeof languesCodex;

export type CodeTerritoireCodex = keyof typeof territoiresCodex;

export type NatureIdentiteCodex =
    | "original"
    | "localise"
    | "alias"
    | "ancien"
    | "international"
    | "sortie-territoriale";

export type NatureNomAlternatifCodex = Extract<
    NatureIdentiteCodex,
    "original" | "localise" | "alias" | "ancien"
>;

export type NatureTitreAlternatifCodex = Extract<
    NatureIdentiteCodex,
    "original" | "international" | "sortie-territoriale"
>;

export type IdentiteDocumenteeCodex<
    Champ extends "nom" | "titre" | "libelle",
    Nature extends NatureIdentiteCodex = NatureIdentiteCodex,
> = Record<Champ, string> & {
    nature: Nature;
    langue?: CodeLangueCodex;
    territoire?: CodeTerritoireCodex;
    sources: string[];
};

export type NomAlternatifCodex = IdentiteDocumenteeCodex<
    "nom",
    NatureNomAlternatifCodex
>;

export type TitreAlternatifCodex = IdentiteDocumenteeCodex<
    "titre",
    NatureTitreAlternatifCodex
>;

export type IdentitePrincipaleCodex = {
    libelle: string;
    langue: CodeLangueCodex;
};

export type AliasNavigationCodex = {
    chemin: string;
    nature: "route-historique";
};

export type ProjectionIdentiteCodex<Famille extends string = CodexFamily> =
    Readonly<{
        identifiant: string;
        famille: Famille;
        slugCanonique: string;
        principale: IdentitePrincipaleCodex;
        documentees: IdentiteDocumenteeCodex<"libelle">[];
        aliasesNavigation: AliasNavigationCodex[];
    }>;
