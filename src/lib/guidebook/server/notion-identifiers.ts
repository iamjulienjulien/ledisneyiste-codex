import "server-only";

const compactPageIdPattern = /^[0-9a-f]{32}$/iu;

export function normalizeNotionPageId(value: string): string | null {
    const normalized = value.replaceAll("-", "").toLocaleLowerCase("en");

    return compactPageIdPattern.test(normalized) ? normalized : null;
}
