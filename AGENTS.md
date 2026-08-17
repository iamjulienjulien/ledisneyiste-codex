<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` (resolved from this file's directory; in
monorepos the `next` package may not be visible from the repo root) before
writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at
`node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a
diff only re-creates the uncommitted change; committing it with your work keeps
the tree clean.

<!-- END:nextjs-agent-rules -->

# Règles impératives

Les règles suivantes s'appliquent à toute intervention sur le dépôt. Elles ont
priorité sur les préférences de mise en œuvre ponctuelles.

1. Respecter l'architecture, les conventions et le vocabulaire déjà en place.
   Ne pas créer de nouvelle abstraction sans besoin réel et démontré.
2. Préserver les modifications existantes, y compris lorsqu'elles ne sont pas
   encore commitées. Ne jamais les écraser, les retirer ou les inclure dans un
   autre chantier sans accord explicite.
3. Ne jamais créer un commit sans validation explicite préalable. Avant chaque
   commit :
    - lancer `pnpm check` et corriger toute erreur ;
    - présenter le périmètre exact du commit ;
    - proposer son titre complet conforme au format canonique ;
    - attendre l'accord avant d'exécuter `git commit`.
4. Rédiger tous les commits en français et conserver la signature exacte
   `🐭 Julien`.
5. Utiliser `Acte` et `Entracte` uniquement pour des commits vides d'ouverture
   ou de clôture. Ces commits temporels sont strictement réservés à Julien et
   doivent impérativement être exécutés par lui-même. Un agent ne doit jamais
   les créer ; il peut uniquement en proposer la commande lorsque Julien la
   demande. Pendant un Entracte, ne jamais utiliser le domaine `Scène`.
6. Vérifier le domaine, son emoji et l'intitulé final dans `git log` après chaque
   commit.
7. Respecter la convention de structure et de nommage des composants définie
   ci-dessous pour toute création ou migration sous `src/components`.

> [!WARNING]
> **L'emoji et le nom du domaine forment une paire indissociable.** L'emoji
> identifie le domaine ; il ne sert pas d'illustration libre pour l'intitulé.
> Il est interdit d'associer l'emoji d'un domaine au nom d'un autre. Par
> exemple, `🏗️ Décor` et `🎨 Mise en scène` sont les seules associations
> valides pour ces deux domaines. Toujours vérifier la table officielle avant
> de proposer ou de créer un commit.

# Convention des composants

Cette convention est impérative pour tous les composants placés sous
`src/components`. Les composants existants qui ne la respectent pas encore
constituent une dette de migration connue. Ils seront déplacés et renommés dans
des chantiers dédiés ; ne pas mélanger leur migration à un autre chantier sans
accord explicite.

## Structure obligatoire

Chaque composant doit être isolé dans son propre sous-dossier. Le nom du
dossier et celui du composant utilisent le `PascalCase` et doivent être
strictement identiques.

```text
src/components/<famille>/<NomComposant>/
├── <NomComposant>.tsx
├── <NomComposant>.module.css
└── index.ts
```

Les trois fichiers sont obligatoires :

- `<NomComposant>.tsx` contient l'implémentation et les types propres au
  composant ;
- `<NomComposant>.module.css` contient ses styles encapsulés et doit être
  présent dès la création du composant ;
- `index.ts` est le barrel public du composant et réexporte son API autorisée.

Les consommateurs importent le composant depuis son dossier, jamais depuis son
fichier d'implémentation :

```ts
import { PixieSymbol } from "@/components/ui/PixieSymbol";
```

Il est interdit d'ajouter directement un fichier de composant à la racine d'un
dossier de famille comme `components/ui`, `components/atelier` ou
`components/codex`.

## Convention `PixieDust` et `Pixie` pour `components/ui`

Les composants de `src/components/ui` suivent un cycle de maturation visible
dans leur nom :

- `PixieDust` préfixe obligatoirement une esquisse qui n'est pas encore
  validée, par exemple `PixieDustButton` ;
- `Pixie` préfixe obligatoirement un composant validé et prêt à être utilisé,
  par exemple `PixieSymbol`.

La promotion d'une esquisse vers un composant validé implique de renommer de
façon cohérente le composant, son dossier, ses fichiers, ses exports, ses
imports et sa documentation. Ne jamais conserver simultanément les deux noms
pour une même primitive sans besoin explicite de compatibilité.

## Convention des autres familles de composants

Dans tout autre dossier de famille sous `src/components`, le nom du composant
doit commencer par le nom de cette famille converti en `PascalCase` :

- `src/components/atelier/AtelierCodePanel/` expose `AtelierCodePanel` ;
- `src/components/codex/CodexFicheHeader/` expose `CodexFicheHeader`.

Cette règle rend immédiatement visible l'appartenance d'un composant et évite
les noms génériques ou ambigus.

# Convention des commits

Le dépôt du **Codex du Disneyiste** utilise une convention de commits narrative,
en français, inspirée des champs lexicaux du cinéma, de la création et de la
magie.

L'objectif est double :

1. permettre de comprendre immédiatement la nature d'un changement ;
2. faire du `git log` une petite chronique de la construction du Codex.

La narration est encouragée, mais ne doit jamais nuire à la compréhension du
commit.

---

## Format canonique

```text
<emoji> <Domaine> > <Intitulé> > 🐭 Julien
```

Exemple :

```text
✨ Étincelle > Il était une fois Le Codex du Disneyiste... > 🐭 Julien
```

### Règles générales

- Tous les commits sont rédigés en **français**.
- Aucun préfixe de projet entre crochets n'est utilisé.
- Le domaine doit être choisi dans la liste officielle ci-dessous.
- L'intitulé doit rester court, compréhensible et, si possible, narratif.
- La narration est facultative lorsque le changement est purement technique.
- La signature est toujours :

```text
🐭 Julien
```

- Ne pas inventer un nouveau domaine pour une nuance mineure.
- En cas de doute, choisir le domaine décrivant le mieux **l'intention
  principale du commit**.
- Un commit doit idéalement correspondre à une unité logique de changement.
- Éviter les commits mélangeant plusieurs domaines indépendants.
- `Acte` et `Entracte` sont des marqueurs temporels. Ils sont réservés aux
  commits vides d'ouverture ou de clôture d'une période.
- Les commits réels effectués pendant un Acte ou un Entracte utilisent toujours
  leur domaine fonctionnel ou technique normal.

---

## Les domaines de développement

| Emoji | Domaine         | Usage                                                                                                                                  |
| ----- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ✨    | `Étincelle`     | Naissance d'une idée structurante, initialisation, première apparition d'un système ou d'un territoire important                       |
| 🏗️    | `Décor`         | Architecture, scaffolding, structure de dossiers, configuration TypeScript/Next.js, alias, dépendances majeures, fondations techniques |
| 🎨    | `Mise en scène` | UI, composants visuels, CSS, Tailwind, responsive, animations, design tokens, layouts                                                  |
| 🎬    | `Scène`         | Nouvelle fonctionnalité, nouveau comportement ou capacité concrète du produit                                                          |
| 🩹    | `Raccord`       | Correction de bug, régression, incohérence fonctionnelle ou visuelle                                                                   |
| 🗄️    | `Archives`      | Données, modèles, schémas, taxonomies, index, fichiers JSON, relations, registres et transformations de données                        |
| 🔌    | `Passerelle`    | API, intégrations externes, SDK, services et échanges avec d'autres systèmes                                                           |
| 🛡️    | `Garde-fou`     | Sécurité, permissions, authentification, validation, headers et règles de protection                                                   |
| ✍️    | `Scénario`      | Documentation, README, AGENTS.md, conventions, JSDoc, commentaires structurants et guides                                              |
| 🧹    | `Coulisses`     | Nettoyage, refactorisation sans changement fonctionnel, lint, formatage, maintenance et dépendances mineures                           |
| ⚡    | `Accéléré`      | Performance, bundle, chargement, cache, rendu et autres optimisations                                                                  |
| 🧪    | `Répétition`    | Tests unitaires, intégration, e2e, fixtures et validation automatisée                                                                  |
| 🚀    | `Première`      | Déploiement, release, CI/CD, Vercel, mise en production et livraison d'une version                                                     |
| 🎞️    | `Acte`          | Marqueur temporel utilisé uniquement pour ouvrir ou clôturer un grand cycle de développement                                           |
| 🍿    | `Entracte`      | Marqueur temporel utilisé uniquement pour ouvrir ou clôturer une période de respiration et de peaufinage entre deux Actes              |

---

## ✨ Étincelle

`Étincelle` est un domaine exceptionnel.

Il ne doit pas devenir un équivalent poétique de `Scène`.

Il est réservé aux moments où apparaît pour la première fois une idée, une
structure ou un élément particulièrement fondateur du Codex.

Exemple fondateur :

```text
✨ Étincelle > Il était une fois Le Codex du Disneyiste... > 🐭 Julien
```

Autres usages possibles :

```text
✨ Étincelle > Le regard personnel entre dans le Codex > 🐭 Julien
```

```text
✨ Étincelle > Les mondes Disney trouvent leur première cartographie > 🐭 Julien
```

Utiliser `Étincelle` avec parcimonie.

---

## 🏗️ Décor vs 🎬 Scène

### 🏗️ Décor

Le Décor prépare l'espace dans lequel les fonctionnalités pourront exister.

Exemples :

```text
🏗️ Décor > Poser les fondations du registre des personnages > 🐭 Julien
```

```text
🏗️ Décor > Préparer la structure des données du Codex > 🐭 Julien
```

Cela inclut notamment :

- création de dossiers ;
- architecture applicative ;
- configuration ;
- alias ;
- dépendances structurantes ;
- découpage des modules ;
- fondations techniques.

### 🎬 Scène

La Scène fait réellement quelque chose dans le produit.

Exemples :

```text
🎬 Scène > Walt entre dans le Codex > 🐭 Julien
```

```text
🎬 Scène > Tout commence avec une souris > 🐭 Julien
```

```text
🎬 Scène > Tisser le premier lien entre Mickey et Walt > 🐭 Julien
```

Règle pratique :

> **Le Décor construit la scène. La Scène y fait entrer les acteurs.**

---

## 🎨 Mise en scène vs 🩹 Raccord

### 🎨 Mise en scène

Utiliser pour créer ou transformer volontairement l'expérience visuelle.

Exemples :

```text
🎨 Mise en scène > Donner un visage aux premières fiches du Codex > 🐭 Julien
```

```text
🎨 Mise en scène > Faire apparaître les sources au pied des fiches > 🐭 Julien
```

```text
🎨 Mise en scène > Donner une porte de sortie aux pages égarées > 🐭 Julien
```

### 🩹 Raccord

Utiliser lorsqu'un comportement ou un rendu existant est incorrect et doit être
réparé.

Exemples :

```text
🩹 Raccord > Corriger le débordement des cartes sur mobile > 🐭 Julien
```

```text
🩹 Raccord > Réparer la navigation entre Walt et Mickey > 🐭 Julien
```

---

## 🗄️ Archives

`Archives` concerne la matière structurée du Codex.

Cela inclut :

- entrées du Codex ;
- catalogues ;
- fiches documentaires ;
- données JSON ou TypeScript ;
- modèles ;
- schémas ;
- taxonomies ;
- relations ;
- registres ;
- sources documentaires ;
- transformations et migrations de données.

Exemples :

```text
🗄️ Archives > Donner corps aux premières fiches de Walt et Mickey > 🐭 Julien
```

```text
🗄️ Archives > Ouvrir les premières sources du Codex > 🐭 Julien
```

```text
🗄️ Archives > Relier Mickey à ses premières apparitions > 🐭 Julien
```

---

## 🧹 Coulisses

`Coulisses` ne doit introduire aucune nouvelle capacité significative pour
l'utilisateur.

Il concerne notamment :

- nettoyage ;
- renommages internes ;
- refactorisation ;
- lint ;
- formatage ;
- suppression de code mort ;
- mise à jour mineure de dépendances ;
- réorganisation sans modification fonctionnelle.

Exemple :

```text
🧹 Coulisses > Nettoyer le plateau avant l'entrée en scène > 🐭 Julien
```

Règle pratique :

> **Si l'utilisateur peut faire quelque chose de nouveau après le commit, ce
> n'est probablement pas seulement des Coulisses.**

---

## 🎞️ Acte

`Acte` est un **marqueur narratif et temporel**.

Il est utilisé uniquement pour des commits vides servant à ouvrir ou à clôturer
un grand cycle de développement.

Un Acte peut correspondre à :

- un sprint ;
- une milestone ;
- une version cohérente ;
- un territoire fonctionnel ;
- une étape narrative importante du développement.

Les modifications réalisées à l'intérieur d'un Acte utilisent toujours leur
domaine normal : `Décor`, `Scène`, `Archives`, `Mise en scène`, etc.

### Ouvrir un Acte

Exemple :

```text
🎞️ Acte > Acte I · Walt rencontre Mickey > 🐭 Julien
```

Commande :

```bash
git commit --allow-empty \
  -m "🎞️ Acte > Acte I · Walt rencontre Mickey > 🐭 Julien"
```

### Clôturer un Acte

Exemple :

```text
🎞️ Acte > Fin de l'Acte I · Walt a rencontré Mickey > 🐭 Julien
```

Commande :

```bash
git commit --allow-empty \
  -m "🎞️ Acte > Fin de l'Acte I · Walt a rencontré Mickey > 🐭 Julien"
```

### Règle

`Acte` ne doit jamais être utilisé pour un commit contenant des changements de
fichiers.

> **L'Acte donne un cadre au développement. Il ne remplace jamais la nature du
> travail réalisé à l'intérieur.**

---

## 🍿 Entracte

`Entracte` est également un **marqueur narratif et temporel**.

Il est utilisé uniquement pour des commits vides servant à ouvrir ou à clôturer
une période de respiration entre deux Actes.

L'Entracte permet notamment de prendre le temps de :

- peaufiner l'accueil ;
- améliorer la navigation ;
- créer ou ajuster la page 404 ;
- travailler les métadonnées ;
- améliorer la micro-UX ;
- corriger des textes d'interface ;
- résoudre de petites incohérences révélées par l'Acte précédent ;
- effectuer des finitions avant l'ouverture du cycle suivant.

Ces modifications gardent toujours leur domaine réel.

Par exemple, pendant un Entracte :

```text
🎨 Mise en scène > Donner une porte de sortie aux pages égarées > 🐭 Julien
```

```text
🎬 Scène > Ouvrir le hall d'entrée du Codex > 🐭 Julien
```

```text
🧹 Coulisses > Nettoyer quelques traces laissées par l'Acte précédent > 🐭 Julien
```

### Ouvrir un Entracte

Exemple :

```text
🍿 Entracte > Les lumières restent allumées entre deux actes > 🐭 Julien
```

Commande :

```bash
git commit --allow-empty \
  -m "🍿 Entracte > Les lumières restent allumées entre deux actes > 🐭 Julien"
```

### Domaines pendant un Entracte

Les changements réalisés pendant un Entracte utilisent leur domaine réel.

Cependant, `🎬 Scène` n'est pas utilisé pendant un Entracte.

Une modification suffisamment importante pour constituer une nouvelle
fonctionnalité ou une nouvelle capacité du produit doit attendre l'ouverture de
l'Acte suivant.

Les domaines privilégiés pendant un Entracte sont notamment :

- `🎨 Mise en scène` pour les finitions d'interface et d'expérience ;
- `🩹 Raccord` pour les corrections ;
- `✍️ Scénario` pour les textes et la documentation ;
- `🧹 Coulisses` pour la maintenance et les refactorisations ;
- `🗄️ Archives` pour les ajustements documentaires ;
- `⚡ Accéléré` pour les optimisations ;
- `🧪 Répétition` pour les tests.

> **L'Entracte améliore ce qui est déjà sur scène. Les nouvelles scènes
> attendent le prochain Acte.**

### Clôturer un Entracte

Exemple :

```text
🍿 Entracte > Les lumières baissent, la suite peut commencer > 🐭 Julien
```

Commande :

```bash
git commit --allow-empty \
  -m "🍿 Entracte > Les lumières baissent, la suite peut commencer > 🐭 Julien"
```

### Règle

`Entracte` ne doit jamais être utilisé pour un commit contenant des changements
de fichiers.

> **Pendant l'Entracte, on peaufine ce qui existe déjà. Les changements gardent
> leur domaine propre, et le popcorn ne devient jamais une catégorie
> technique.**

---

## Style des intitulés

L'intitulé peut être narratif :

```text
🎬 Scène > Walt entre dans le Codex > 🐭 Julien
```

```text
🗄️ Archives > Le registre accueille ses deux premiers noms > 🐭 Julien
```

```text
🎨 Mise en scène > Les personnages trouvent leur portrait > 🐭 Julien
```

Mais il peut aussi rester pragmatique lorsque cela améliore la compréhension :

```text
🩹 Raccord > Corriger le layout mobile des fiches > 🐭 Julien
```

```text
🧹 Coulisses > Mettre à jour ESLint > 🐭 Julien
```

```text
⚡ Accéléré > Réduire le poids des images de couverture > 🐭 Julien
```

Ne jamais sacrifier la précision pour trouver une métaphore.

---

## Exemple d'une chronologie de développement

```text
✨ Étincelle > Il était une fois Le Codex du Disneyiste... > 🐭 Julien

🧹 Coulisses > Nettoyer le plateau avant l'entrée en scène > 🐭 Julien

🎞️ Acte > Acte I · Walt rencontre Mickey > 🐭 Julien

🏗️ Décor > Ouvrir deux portes aux habitants du Codex > 🐭 Julien

🎬 Scène > Ouvrir les premières fiches du Codex > 🐭 Julien

🗄️ Archives > Donner corps aux premières fiches de Walt et Mickey > 🐭 Julien

🗄️ Archives > Ouvrir les premières sources du Codex > 🐭 Julien

🎨 Mise en scène > Faire apparaître les sources au pied des fiches > 🐭 Julien

🎬 Scène > Tisser le premier lien entre Mickey et Walt > 🐭 Julien

🎞️ Acte > Fin de l'Acte I · Walt a rencontré Mickey > 🐭 Julien

🍿 Entracte > Les lumières restent allumées entre deux actes > 🐭 Julien

🎨 Mise en scène > Donner une porte de sortie aux pages égarées > 🐭 Julien

🎬 Scène > Ouvrir le hall d'entrée du Codex > 🐭 Julien

🍿 Entracte > Les lumières baissent, la suite peut commencer > 🐭 Julien

🎞️ Acte > Acte II · ... > 🐭 Julien
```

Le `git log` doit ainsi rester à la fois :

- lisible techniquement ;
- cohérent dans le temps ;
- agréable à parcourir ;
- fidèle à l'identité narrative du Disneyiste ;
- capable de raconter les grands cycles sans masquer la nature réelle des
  changements.

---

## Principe final

> **Le commit raconte ce qui change. Le domaine explique la nature du
> changement. L'Acte et l'Entracte racontent quand il s'inscrit dans
> l'histoire du projet.**

La convention doit rester stable.

Si un cas nouveau apparaît, préférer d'abord le rattacher à un domaine existant
plutôt que d'étendre immédiatement la taxonomie.

Un nouveau domaine ne doit être ajouté que lorsqu'un type de travail réellement
distinct apparaît de manière récurrente.
