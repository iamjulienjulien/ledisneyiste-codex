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

# Convention des commits

Le dépôt du **Codex du Disneyiste** utilise une convention de commits narrative, en français, inspirée des champs lexicaux du cinéma, de la création et de la magie.

L'objectif est double :

1. permettre de comprendre immédiatement la nature technique d'un changement ;
2. faire du `git log` une petite chronique de la construction du Codex.

La narration est encouragée, mais ne doit jamais nuire à la compréhension du commit.

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
- L'intitulé doit rester court, compréhensible et si possible narratif.
- La narration est facultative lorsque le changement est purement technique.
- La signature est toujours :

```text
🐭 Julien
```

- Ne pas inventer un nouveau domaine pour une nuance mineure.
- En cas de doute, choisir le domaine décrivant le mieux **l'intention principale du commit**.
- Un commit doit idéalement correspondre à une unité logique de changement.
- Éviter les commits mélangeant plusieurs domaines indépendants.

---

## Les domaines de développement

| Emoji | Domaine         | Usage                                                                                                                                  |
| ----- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ✨    | `Étincelle`     | Naissance d'une idée structurante, initialisation, première apparition d'un système ou d'un territoire important                       |
| 🏗️    | `Décor`         | Architecture, scaffolding, structure de dossiers, configuration TypeScript/Next.js, alias, dépendances majeures, fondations techniques |
| 🎨    | `Mise en scène` | UI, composants visuels, CSS, Tailwind, responsive, animations, design tokens, layouts                                                  |
| 🎬    | `Scène`         | Nouvelle fonctionnalité, nouveau comportement ou capacité concrète du produit                                                          |
| 🩹    | `Raccord`       | Correction de bug, régression, incohérence fonctionnelle ou visuelle                                                                   |
| 🗄️    | `Archives`      | Données, modèles, schémas, taxonomies, index, fichiers JSON, transformations de données                                                |
| 🔌    | `Passerelle`    | API, intégrations externes, SDK, services et échanges avec d'autres systèmes                                                           |
| 🛡️    | `Garde-fou`     | Sécurité, permissions, authentification, validation, headers et règles de protection                                                   |
| ✍️    | `Scénario`      | Documentation, README, AGENTS.md, conventions, JSDoc, commentaires structurants et guides                                              |
| 🧹    | `Coulisses`     | Nettoyage, refactorisation sans changement fonctionnel, lint, formatting, maintenance et dépendances mineures                          |
| ⚡    | `Accéléré`      | Performance, bundle, chargement, cache, rendu et autres optimisations                                                                  |
| 🧪    | `Répétition`    | Tests unitaires, intégration, e2e, fixtures et validation automatisée                                                                  |
| 🚀    | `Première`      | Déploiement, release, CI/CD, Vercel, mise en production et livraison d'une version                                                     |
| 🎞️    | `Acte`          | Ouverture ou clôture d'un cycle de développement, sprint, milestone ou étape cohérente du projet                                       |

---

## ✨ Étincelle

`Étincelle` est un domaine exceptionnel.

Il ne doit pas devenir un équivalent poétique de `feature`.

Il est réservé aux moments où apparaît pour la première fois une idée, une structure ou un élément particulièrement fondateur du Codex.

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
🎬 Scène > Relier chaque personnage à ses œuvres > 🐭 Julien
```

Règle pratique :

> **Le Décor construit la scène. La Scène y fait entrer les acteurs.**

---

## 🎨 Mise en scène vs 🩹 Raccord

### 🎨 Mise en scène

Utiliser pour créer ou transformer volontairement l'expérience visuelle.

```text
🎨 Mise en scène > Donner un visage aux premières fiches du Codex > 🐭 Julien
```

```text
🎨 Mise en scène > Installer le langage visuel des personnages > 🐭 Julien
```

### 🩹 Raccord

Utiliser lorsqu'un comportement ou un rendu existant est incorrect et doit être réparé.

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
- données JSON ou TypeScript ;
- modèles ;
- schémas ;
- taxonomies ;
- relations ;
- registres ;
- transformations et migrations de données.

Exemples :

```text
🗄️ Archives > Séparer les vivants des personnages de fiction > 🐭 Julien
```

```text
🗄️ Archives > Le registre accueille ses deux premiers noms > 🐭 Julien
```

```text
🗄️ Archives > Relier Mickey à ses premières apparitions > 🐭 Julien
```

---

## 🧹 Coulisses

`Coulisses` ne doit introduire aucune nouvelle capacité significative pour l'utilisateur.

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
🧹 Coulisses > Effacer les dernières traces du décor Next.js > 🐭 Julien
```

Règle pratique :

> **Si l'utilisateur peut faire quelque chose de nouveau après le commit, ce n'est probablement pas seulement des Coulisses.**

---

## 🎞️ Les Actes

`Acte` permet de rythmer les grands cycles du développement.

Il ne remplace pas les autres domaines. Il sert à marquer un début ou une fin de séquence importante.

Exemples :

```text
🎞️ Acte > Acte I · Les personnages entrent en scène > 🐭 Julien
```

```text
🎞️ Acte > Clap de fin pour l'Acte I > 🐭 Julien
```

```text
🎞️ Acte > Acte II · Les œuvres ouvrent leurs archives > 🐭 Julien
```

Les Actes peuvent correspondre à :

- un sprint ;
- une milestone ;
- une version ;
- un territoire fonctionnel ;
- une étape narrative importante du développement.

Ils doivent rester suffisamment rares pour conserver leur valeur.

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

## Exemples d'une chronologie de développement

```text
✨ Étincelle > Il était une fois Le Codex du Disneyiste... > 🐭 Julien

🧹 Coulisses > Effacer les dernières traces du décor Next.js > 🐭 Julien

🏗️ Décor > Préparer la scène pour les premiers habitants du Codex > 🐭 Julien

🗄️ Archives > Séparer les vivants des personnages de fiction > 🐭 Julien

🎬 Scène > Walt entre dans le Codex > 🐭 Julien

🎬 Scène > Tout commence avec une souris > 🐭 Julien

🎨 Mise en scène > Donner un visage aux premières fiches du Codex > 🐭 Julien

🎞️ Acte > Acte I · Walt rencontre Mickey > 🐭 Julien
```

Le `git log` doit ainsi rester à la fois :

- lisible techniquement ;
- cohérent dans le temps ;
- agréable à parcourir ;
- fidèle à l'identité narrative du Disneyiste.

---

## Principe final

> **Le commit raconte ce qui change. Le domaine explique pourquoi il change.**

La convention doit rester stable.

Si un cas nouveau apparaît, préférer d'abord le rattacher à un domaine existant plutôt que d'étendre immédiatement la taxonomie.

Un nouveau domaine ne doit être ajouté que lorsqu'un type de travail réellement distinct apparaît de manière récurrente.
