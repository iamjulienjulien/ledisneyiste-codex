# Acte VI · Phase 0 · Transmission du Train 0C

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Verdict

Le Markdown local du Guidebook possède désormais une chaîne d’analyse unique,
typée et éprouvée sur les sept chapitres transmissibles. Elle transforme une
chaîne déjà autorisée en matière sérialisable sans rendre de HTML arbitraire,
sans connaître le système de fichiers et sans ouvrir de route `/guidebook`.

Le Train 0C est techniquement prêt à recevoir la première projection Markdown.

## Une seule lecture de la bobine

Le pipeline repose sur `unified`, `remark-parse` et `remark-gfm` :

```text
Markdown autorisé
→ arbre mdast unique
→ blocs Guidebook
→ titres et ancres uniques
→ sommaire hiérarchique
→ liens résolus
→ avertissements
```

Les blocs, les ancres et le sommaire ne résultent donc jamais de plusieurs
parses susceptibles de diverger. L’analyseur pur reçoit un slug, une chaîne
Markdown et une fonction de résolution des liens ; il ne lit aucun fichier et
ne dépend pas de Next.js.

## Matière prise en charge

La première grammaire couvre :

- titres avec ancres déterministes et suffixes pour les doublons ;
- paragraphes, emphases, texte fort, texte barré et code en ligne ;
- sauts de ligne Markdown et balises `<br>` normalisées ;
- citations composées de blocs ;
- listes ordonnées, non ordonnées, imbriquées et listes de tâches ;
- blocs de code avec langage conservé ;
- compositions ASCII reconnues par leur langage ou leur dessin réel ;
- tableaux GFM et alignements déclarés ;
- séparateurs thématiques ;
- blocs inconnus neutralisés sous la forme `unsupported`.

Les images, notes et fragments HTML arbitraires ne sont pas interprétés. Leur
présence produit une alternative textuelle et un avertissement, jamais une
injection dans le DOM.

## Cartes ASCII et code

Un bloc `ascii` est toujours une composition ASCII. Pour les blocs `text` ou
sans langage, la détection exige un dessin significatif — traits de boîte,
branches d’arborescence ou structure équivalente. Un simple extrait technique
ne devient donc pas une carte par commodité.

Cette distinction prépare `PixieDustAscii` sans lui transmettre la
responsabilité d’analyser le Markdown.

## Liens sous contrôle

Le résolveur pur et son adaptateur serveur séparent désormais la politique de
la lecture :

- une ancre est d’abord reconnue, puis validée contre les titres réellement
  produits ;
- un lien local n’est actif que si sa cible appartient au manifeste fermé ;
- les protocoles `http`, `https` et `mailto` sont externes ;
- un chemin privé ou hors bibliothèque devient `restricted` avec `href: null` ;
- un protocole inconnu devient `invalid` avec `href: null`.

Le libellé demeure lisible dans tous les cas. Une restriction retire la
navigation, pas la matière.

## Adaptateur local

L’adaptateur `loadGuidebookLocalDocument` orchestre les responsabilités
serveur : il résout un slug déclaré, lit sa chaîne, lance l’analyse et produit
un `GuidebookDocument` prêt à sérialiser. Les erreurs de résolution deviennent
des états documentaires (`missing`, `restricted`, `unavailable`) au lieu de
faire porter les chemins ou exceptions techniques à l’interface.

## Épreuve du corpus

`check:guidebook` analyse une fixture volontairement hostile et les sept
chapitres réels. Au moment de cette transmission, le corpus produit :

- **2 816 blocs** ;
- **473 titres** et autant d’entrées de sommaire ;
- **223 liens** résolus ou neutralisés ;
- **19 compositions ASCII**.

Le contrôle vérifie notamment :

- chaque famille de blocs attendue ;
- la différence entre code TypeScript et ASCII ;
- les ancres dupliquées et les ancres absentes ;
- les cinq états de lien ;
- l’unicité de tous les identifiants de blocs et de titres ;
- la parité entre titres et sommaire ;
- l’absence de blocs inconnus dans le corpus réel ;
- l’absence de positions AST, chemins locaux et identifiants techniques dans
  la matière sérialisée ;
- la neutralisation effective des liens privés ;
- la détection réelle des cartes de service.

## Fichiers de référence

- `src/lib/guidebook/analyze-markdown.ts` — analyse pure ;
- `src/lib/guidebook/resolve-link.ts` — politique pure des liens ;
- `src/lib/guidebook/server/resolve-link.ts` — raccord au manifeste local ;
- `src/lib/guidebook/server/load-local-document.ts` — adaptateur fichier ;
- `scripts/fixtures/guidebook/markdown-analysis.fixture.md` — bobine d’épreuve ;
- `scripts/verifier-guidebook.mjs` — garde-fou local et documentaire.

## Hors champ conservé

Ce train ne crée :

- aucun composant de lecture Markdown ;
- aucune bibliothèque arborescente ;
- aucune route `/guidebook` ;
- aucun appel Notion ;
- aucun renderer HTML générique ;
- aucun lien public depuis le Codex.

La prochaine projection pourra recevoir les blocs déjà résolus sans rouvrir le
fichier, recalculer les ancres ou décider elle-même de la confidentialité.

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Analyse documentaire · Une seule bobine, plusieurs lectures sûres_
