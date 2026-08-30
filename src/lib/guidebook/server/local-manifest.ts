import "server-only";
import type { GuidebookLocalManifest } from "./manifest-types";

export const localGuidebookManifest = {
    rootDirectory: "docs/agents",
    entries: [
        { slug: "bienvenue", relativePath: "README.md" },
        {
            slug: "esprit-du-projet",
            relativePath: "01-esprit-du-projet.md",
        },
        {
            slug: "architecture-du-codex",
            relativePath: "02-architecture-du-codex.md",
        },
        {
            slug: "direction-artistique-et-ui",
            relativePath: "03-direction-artistique-et-ui.md",
        },
        {
            slug: "design-system-pixie",
            relativePath: "04-design-system-pixie.md",
        },
        {
            slug: "symboles-registres-et-collections",
            relativePath: "05-symboles-registres-et-collections.md",
        },
        {
            slug: "plans-et-lectures-derivees",
            relativePath: "06-plans-et-lectures-derivees.md",
        },
    ],
} satisfies GuidebookLocalManifest;
