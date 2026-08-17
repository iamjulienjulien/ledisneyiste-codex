export type SymbolDefinition = Readonly<{
    src: `/symbols/${string}.png`;
    label: string;
    accent: `var(--${string})`;
}>;
