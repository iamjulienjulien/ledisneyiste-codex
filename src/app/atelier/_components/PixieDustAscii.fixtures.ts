export const r2d2ServiceCard = `╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                          ║
║                      UNITÉ GUIDEBOOK                         ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                            ║
║  MISSION      Relier le prompt à la magie                    ║
║  ACCÈS        ARCHITECTURE · PIXIE · PROJECTION              ║
║  PROTOCOLE    UNE SOURCE DE VÉRITÉ · PLUSIEURS LECTURES      ║
║  STATUT       ● EN PRODUCTION                                ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
╚══════════════════════════════════════════════════════════════╝`;

export const guidebookTree = `docs/agents/
├── README.md
├── 01-esprit-du-projet.md
├── 02-architecture-du-codex.md
├── 03-direction-artistique-et-ui.md
├── 04-design-system-pixie.md
├── 05-symboles-registres-et-collections.md
└── 06-plans-et-lectures-derivees.md`;

export const unicodeCard = `┌──────────────────────────────────────────────┐
│  ✨ Poussière prête · Lumière allumée        │
│  Édition française · Cœur du studio : Paris  │
│  Signal reçu par R2-D2 : bip-boup ✓          │
└──────────────────────────────────────────────┘`;

export const wideProjection = `SOURCE LOCALE ──→ ANALYSE MARKDOWN UNIQUE ──→ BLOCS NORMALISÉS ──→ PIXIE MARKDOWN ──→ SOMMAIRE + LECTURE + ANCRES ──→ GUIDEBOOK`;

export const tallRegister = Array.from(
    { length: 24 },
    (_, index) =>
        `${String(index + 1).padStart(2, "0")} · bobine-${String(index + 1).padStart(2, "0")} · ${index % 3 === 0 ? "prête" : "en repérage"}`,
).join("\n");

export const decorativeSpark = `·  ✦  ·  ✧  ·  ✦  ·  ✧  ·`;

export const asciiFixtures = {
    service: {
        label: "Carte de service",
        content: r2d2ServiceCard,
    },
    tree: {
        label: "Arborescence du Guidebook",
        content: guidebookTree,
    },
    unicode: {
        label: "Carte Unicode",
        content: unicodeCard,
    },
    wide: {
        label: "Chaîne de projection très large",
        content: wideProjection,
    },
    tall: {
        label: "Registre vertical de vingt-quatre bobines",
        content: tallRegister,
    },
    empty: {
        label: "Composition vide",
        content: "",
    },
} as const;

export type PixieDustAsciiFixtureSlug = keyof typeof asciiFixtures;
