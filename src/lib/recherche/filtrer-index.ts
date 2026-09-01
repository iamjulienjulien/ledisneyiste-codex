export type EntreeIndexRecherche<Entree extends { slug: string }> = Readonly<{
    entree: Entree;
    texte: string;
}>;

export type NormalisateurRecherche = (valeur: string) => string;

export function creerTexteRecherche(
    champs: readonly string[],
    normaliser: NormalisateurRecherche,
) {
    return normaliser(champs.join(" "));
}

export function rechercherDansIndex<Entree extends { slug: string }>(
    index: readonly EntreeIndexRecherche<Entree>[],
    requeteBrute: string,
    normaliser: NormalisateurRecherche,
): Entree[] {
    const termes = normaliser(requeteBrute).split(" ").filter(Boolean);

    if (termes.length === 0) {
        return [];
    }

    const resultatsUniques = new Map<string, Entree>();

    for (const { entree, texte } of index) {
        if (
            termes.every((terme) => texte.includes(terme)) &&
            !resultatsUniques.has(entree.slug)
        ) {
            resultatsUniques.set(entree.slug, entree);
        }
    }

    return [...resultatsUniques.values()];
}
