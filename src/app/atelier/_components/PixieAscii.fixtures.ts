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

export const twoDimensionalRegister = Array.from(
    { length: 18 },
    (_, index) =>
        `${String(index + 1).padStart(2, "0")} │ GUIDEBOOK-${String(index + 1).padStart(3, "0")} │ SOURCE AUTORISÉE │ ANALYSE UNIQUE │ ALTERNATIVE CONSERVÉE │ PROJECTION PRÊTE`,
).join("\n");

export const decorativeSpark = `·  ✦  ·  ✧  ·  ✦  ·  ✧  ·`;

export const asciiFixtures = {
    service: {
        label: "Carte de service",
        alternative:
            "Carte de service de R2-D2, Lead Developer de l’unité Guidebook chez Guru Éditions. Mission : relier le prompt à la magie. Statut : en production.",
        content: r2d2ServiceCard,
    },
    tree: {
        label: "Arborescence du Guidebook",
        alternative:
            "Le dossier docs/agents contient un README et six chapitres numérotés consacrés à l’esprit, l’architecture, la direction artistique, Pixie, les symboles et les Plans.",
        content: guidebookTree,
    },
    unicode: {
        label: "Carte Unicode",
        alternative:
            "Poussière prête, lumière allumée. Édition française, cœur du studio à Paris. Signal reçu par R2-D2.",
        content: unicodeCard,
    },
    wide: {
        label: "Chaîne de projection très large",
        alternative:
            "La source locale traverse l’analyse Markdown, les blocs normalisés, PixieMarkdown, puis le sommaire, la lecture, les ancres et enfin le Guidebook.",
        content: wideProjection,
    },
    tall: {
        label: "Registre vertical de vingt-quatre bobines",
        alternative:
            "Registre de vingt-quatre bobines, alternativement prêtes ou en repérage.",
        content: tallRegister,
    },
    matrix: {
        label: "Registre débordant dans les deux directions",
        alternative:
            "Dix-huit entrées du Guidebook traversent une source autorisée, une analyse unique, une alternative conservée et une projection prête.",
        content: twoDimensionalRegister,
    },
    empty: {
        label: "Composition vide",
        alternative: "Aucune composition n’est disponible.",
        content: "",
    },
} as const;

export type PixieAsciiFixtureSlug = keyof typeof asciiFixtures;
