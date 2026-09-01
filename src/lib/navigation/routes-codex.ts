import type { CodexFamily } from "@/types/codex";
import type {
    AliasNavigationCodex,
    CheminCodex,
    RedirectionNavigationCodex,
} from "@/types/navigation";

const segmentsRoutesCodex: Readonly<Record<CodexFamily, string>> = {
    personnages: "personnages",
    createurs: "contributeurs",
    oeuvres: "oeuvres",
    epoques: "epoques",
};

const motifCheminCodex =
    /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

function verifierChemin(chemin: string, contexte: string): CheminCodex {
    if (!motifCheminCodex.test(chemin)) {
        throw new Error(
            `${contexte} possède un chemin invalide « ${chemin} ».`,
        );
    }

    return chemin as CheminCodex;
}

export function construireRouteCanoniqueCodex(
    famille: CodexFamily,
    slug: string,
): CheminCodex {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`Le slug canonique « ${slug} » est invalide.`);
    }

    return `/${segmentsRoutesCodex[famille]}/${slug}`;
}

export function preparerRedirectionsNavigationCodex(
    aliases: readonly AliasNavigationCodex[],
    routesCanoniques: readonly CheminCodex[],
): readonly RedirectionNavigationCodex[] {
    const routes = new Set(routesCanoniques);

    if (routes.size !== routesCanoniques.length) {
        throw new Error("L’inventaire contient une route canonique dupliquée.");
    }

    const cheminsAliases = new Set<string>();

    return aliases.map((alias) => {
        const chemin = verifierChemin(alias.chemin, "L’alias");
        const cible = verifierChemin(alias.cible, "La cible de l’alias");

        if (alias.nature !== "route-historique") {
            throw new Error(
                `L’alias « ${chemin} » possède une nature invalide.`,
            );
        }
        if (alias.provenance.trim().length === 0) {
            throw new Error(
                `L’alias « ${chemin} » ne possède aucune provenance.`,
            );
        }
        if (routes.has(chemin)) {
            throw new Error(
                `L’alias « ${chemin} » entre en collision avec une route canonique.`,
            );
        }
        if (!routes.has(cible)) {
            throw new Error(
                `L’alias « ${chemin} » cible une route canonique inconnue « ${cible} ».`,
            );
        }
        if (cheminsAliases.has(chemin)) {
            throw new Error(
                `L’alias « ${chemin} » est déclaré plusieurs fois.`,
            );
        }

        cheminsAliases.add(chemin);

        return {
            source: chemin,
            destination: cible,
            permanent: true,
        };
    });
}
