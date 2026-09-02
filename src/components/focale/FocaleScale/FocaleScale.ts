import type { FocaleOrdinalScale } from "./FocaleScale.types";

export function createFocaleOrdinalScale<Domain extends string, Range>(
    domain: readonly Domain[],
    range: readonly Range[],
): FocaleOrdinalScale<Domain, Range> {
    if (domain.length === 0) {
        throw new Error("Une échelle Focale requiert un domaine non vide.");
    }
    if (new Set(domain).size !== domain.length) {
        throw new Error("Le domaine d’une échelle Focale doit être unique.");
    }
    if (range.length === 0) {
        throw new Error("Une échelle Focale requiert une plage non vide.");
    }

    const entries = domain.map(
        (value, index) => [value, range[index % range.length]] as const,
    );
    const values = new Map<Domain, Range>(entries);

    return {
        domain: [...domain],
        range: [...range],
        get: (value) => values.get(value),
        has: (value): value is Domain => values.has(value as Domain),
        entries: () => entries.map(([key, value]) => [key, value] as const),
    };
}
