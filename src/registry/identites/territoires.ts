import type { TerritoireCodexDefinition } from "@/types/identite";

export const territoiresCodex = {
    FR: {
        label: "France",
    },
    US: {
        label: "États-Unis",
    },
    IT: {
        label: "Italie",
    },
} as const satisfies Record<string, TerritoireCodexDefinition>;
