import type { EntreeCatalogueBase, CodexFamily } from "@/types/codex";
import type {
    CodeLangueCodex,
    IdentiteDocumenteeCodex,
    NomAlternatifCodex,
    ProjectionIdentiteCodex,
    TitreAlternatifCodex,
} from "@/types/identite";
import type { AliasNavigationCodex } from "@/types/navigation";

export type EntreeIdentitaireCodex = Readonly<
    Pick<EntreeCatalogueBase, "slug" | "nom">
>;

export type FicheIdentitaireCodex = Readonly<{
    slug: string;
    identite?: IdentiteDocumenteeCodex<"libelle">;
    nomsAlternatifs?: readonly NomAlternatifCodex[];
    titresAlternatifs?: readonly TitreAlternatifCodex[];
    identitesAlternatives?: readonly IdentiteDocumenteeCodex<"libelle">[];
}>;

export type ParametresProjectionIdentiteCodex<
    Famille extends CodexFamily = CodexFamily,
> = Readonly<{
    famille: Famille;
    entree: EntreeIdentitaireCodex | null | undefined;
    fiche: FicheIdentitaireCodex | null | undefined;
    identifiant?: string | null;
    languePrincipale?: CodeLangueCodex | null;
    aliasesNavigation?: readonly AliasNavigationCodex[];
}>;

export function normaliserIdentiteCodex(valeur: string) {
    return valeur
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replaceAll("œ", "oe")
        .replaceAll("æ", "ae")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function convertirIdentiteDocumentee(
    identite: NomAlternatifCodex | TitreAlternatifCodex,
): IdentiteDocumenteeCodex<"libelle"> {
    const libelle = "nom" in identite ? identite.nom : identite.titre;

    return {
        libelle,
        nature: identite.nature,
        ...(identite.langue === undefined ? {} : { langue: identite.langue }),
        ...(identite.territoire === undefined
            ? {}
            : { territoire: identite.territoire }),
        sources: [...identite.sources],
    };
}

function collecterIdentitesDocumentees(
    fiche: FicheIdentitaireCodex,
    libellePrincipal: string,
) {
    const groupes = [
        fiche.nomsAlternatifs,
        fiche.titresAlternatifs,
        fiche.identitesAlternatives,
    ].filter(Boolean);

    if (groupes.length > 1) {
        throw new Error(
            `La fiche « ${fiche.slug} » mélange plusieurs contrats d’identités alternatives.`,
        );
    }

    if (fiche.identitesAlternatives) {
        const identitesAlternatives = fiche.identite
            ? fiche.identitesAlternatives.filter(
                  (identite) =>
                      normaliserIdentiteCodex(identite.libelle) !==
                      normaliserIdentiteCodex(libellePrincipal),
              )
            : fiche.identitesAlternatives;

        return [
            ...(fiche.identite &&
            normaliserIdentiteCodex(fiche.identite.libelle) !==
                normaliserIdentiteCodex(libellePrincipal)
                ? [fiche.identite]
                : []),
            ...identitesAlternatives,
        ];
    }

    const identites = fiche.nomsAlternatifs ?? fiche.titresAlternatifs ?? [];

    return [
        ...(fiche.identite &&
        normaliserIdentiteCodex(fiche.identite.libelle) !==
            normaliserIdentiteCodex(libellePrincipal)
            ? [fiche.identite]
            : []),
        ...identites.map(convertirIdentiteDocumentee),
    ];
}

function verifierUniciteIdentites(
    slug: string,
    libellePrincipal: string,
    documentees: readonly IdentiteDocumenteeCodex<"libelle">[],
) {
    const cles = new Map([
        [normaliserIdentiteCodex(libellePrincipal), libellePrincipal],
    ]);

    for (const identite of documentees) {
        const cle = normaliserIdentiteCodex(identite.libelle);
        const existante = cles.get(cle);

        if (existante !== undefined) {
            throw new Error(
                `La fiche « ${slug} » projette deux identités équivalentes : « ${existante} » et « ${identite.libelle} ».`,
            );
        }

        cles.set(cle, identite.libelle);
    }
}

export function projeterIdentiteCodex<Famille extends CodexFamily>({
    famille,
    entree,
    fiche,
    identifiant = null,
    languePrincipale = null,
    aliasesNavigation = [],
}: ParametresProjectionIdentiteCodex<Famille>): ProjectionIdentiteCodex<Famille> | null {
    if (!entree || !fiche) {
        return null;
    }

    if (entree.slug !== fiche.slug) {
        throw new Error(
            `Impossible de joindre l’entrée « ${entree.slug} » à la fiche « ${fiche.slug} ».`,
        );
    }

    const documentees = collecterIdentitesDocumentees(fiche, entree.nom);
    verifierUniciteIdentites(fiche.slug, entree.nom, documentees);

    const originales = documentees.filter(
        (identite) => identite.nature === "original",
    );

    if (originales.length > 1) {
        throw new Error(
            `La fiche « ${fiche.slug} » possède plusieurs identités originales sans arbitrage.`,
        );
    }

    return {
        identifiant,
        famille,
        slugCanonique: entree.slug,
        principale: {
            libelle: entree.nom,
            langue: languePrincipale,
        },
        originale: originales[0] ?? null,
        documentees,
        aliasesNavigation: [...aliasesNavigation],
    };
}
