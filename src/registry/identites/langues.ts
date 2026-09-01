import type { LangueCodexDefinition } from "@/types/identite";

export const languesCodex = {
    fr: {
        label: "Français",
        labelNatif: "Français",
    },
    en: {
        label: "Anglais",
        labelNatif: "English",
    },
    it: {
        label: "Italien",
        labelNatif: "Italiano",
    },
} as const satisfies Record<string, LangueCodexDefinition>;
