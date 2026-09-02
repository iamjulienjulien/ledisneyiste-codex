export type FocaleOrdinalScale<Domain extends string, Range> = Readonly<{
    domain: readonly Domain[];
    range: readonly Range[];
    get: (value: Domain) => Range | undefined;
    has: (value: string) => value is Domain;
    entries: () => readonly (readonly [Domain, Range])[];
}>;
