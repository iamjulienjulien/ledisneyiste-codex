import "server-only";
import { analyzeGuidebookMarkdown } from "@/lib/guidebook/analyze-markdown";
import { resolveGuidebookLink } from "@/lib/guidebook/resolve-link";
import { loadLocalGuidebookDocument } from "@/lib/guidebook/server/load-local-document";
import type { GuidebookBlock } from "@/types/guidebook";

export type PixieMarkdownFixture = {
    slug: string;
    label: string;
    description: string;
    blocks: GuidebookBlock[];
};

const fixtureEntries = [
    { slug: "projection-riche", relativePath: "projection-riche.md" },
    { slug: "chapitre-voisin", relativePath: "chapitre-voisin.md" },
] as const;

const richMarkdown = `# Une bobine prête à être lue

Le **Guidebook** transmet les décisions du studio avec de l’_emphase_, du
\`code en ligne\` et des [raccords internes](chapitre-voisin.md).

> La projection reste lisible avant même que la lumière et les décors ne
> rejoignent la salle.<br>
> Sa structure porte déjà le sens.

## Ordre de projection

- [x] Autoriser la matière côté serveur
    1. analyser une seule fois
    2. résoudre les destinations
- [ ] Ouvrir la bibliothèque complète

| État | Lecture | Navigation |
| :--- | :------ | ---------: |
| prêt | complète | active |
| privé | conservée | neutralisée |

\`\`\`tsx
const document = await loadLocalGuidebookDocument("bienvenue");
const blocks = document.analysis?.blocks ?? [];
return <PixieMarkdown blocks={blocks} headingScale="reading" codeLineNumbers color="violet-ombre-portee" />;
\`\`\`

\`\`\`text
┌──────────────────────────────┐
│  GUIDEBOOK · PROJECTION 0D   │
└──────────────────────────────┘
\`\`\`

---

[Revenir au début](#une-bobine-prete-a-etre-lue) ·
[ouvrir une source](https://example.com/guidebook) ·
[consulter les coulisses](../studio/onboarding.md).
`;

const partialMarkdown = `## Une matière encore partielle

Le texte sûr reste disponible même lorsqu’un bloc ne peut pas recevoir sa
mise en scène.

<script>projectionInterdite()</script>
`;

function analyzeFixture(slug: string, markdown: string): GuidebookBlock[] {
    return analyzeGuidebookMarkdown({
        slug,
        markdown,
        resolveLink: (currentSlug, label, href) =>
            resolveGuidebookLink(fixtureEntries, currentSlug, label, href),
    }).blocks;
}

export async function getPixieMarkdownFixtures(): Promise<
    PixieMarkdownFixture[]
> {
    const guidebook = await loadLocalGuidebookDocument("bienvenue");

    return [
        {
            slug: "guidebook",
            label: "Vrai chapitre du Guidebook",
            description:
                "La salle de briefing locale, résolue et analysée côté serveur.",
            blocks: guidebook.analysis?.blocks ?? [],
        },
        {
            slug: "rich",
            label: "Projection riche",
            description:
                "Titres, citations, tâches, tableaux, code, ASCII et liens dans une même bobine.",
            blocks: analyzeFixture("projection-riche", richMarkdown),
        },
        {
            slug: "partial",
            label: "Matière partielle",
            description:
                "Un fragment HTML reste visible comme contenu non mis en forme.",
            blocks: analyzeFixture("projection-riche", partialMarkdown),
        },
        {
            slug: "empty",
            label: "Document vide",
            description: "Aucun bloc ne rejoint encore la projection.",
            blocks: [],
        },
    ];
}
