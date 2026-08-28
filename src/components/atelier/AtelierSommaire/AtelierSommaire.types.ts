export type AtelierSommaireItem = Readonly<{
    nom: string;
    href: `#${string}`;
}>;

export type AtelierSommairePlateau = Readonly<{
    numero: string;
    nom: string;
    href: `#${string}`;
    items: readonly AtelierSommaireItem[];
}>;

export type AtelierSommaireProps = Readonly<{
    plateaux: readonly AtelierSommairePlateau[];
}>;
