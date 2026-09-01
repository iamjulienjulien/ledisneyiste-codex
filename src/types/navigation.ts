export type CheminCodex = `/${string}`;

export type AliasNavigationCodex = Readonly<{
    chemin: CheminCodex;
    cible: CheminCodex;
    nature: "route-historique";
    provenance: string;
}>;

export type RedirectionNavigationCodex = Readonly<{
    source: CheminCodex;
    destination: CheminCodex;
    permanent: true;
}>;
