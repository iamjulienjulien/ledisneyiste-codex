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
8. Ranger les types TypeScript selon leur portée : les types propres à un
   composant restent dans son dossier sous le nom
   `<NomComposant>.types.ts` ; les types globaux, métier ou partagés restent
   centralisés dans `src/types`.
9. Respecter le rôle, la structure et le parcours d'ajout de l'Atelier définis
   ci-dessous pour toute fondation ou tout composant qui y est documenté.
10. Respecter la convention de publication des tags, des Releases, de leurs
    notes et du Journal de projection. Ne jamais créer ni publier un tag ou une
    Release sans validation explicite de Julien.

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
├── <NomComposant>.types.ts
└── index.ts
```

Les quatre fichiers sont obligatoires :

- `<NomComposant>.tsx` contient uniquement l'implémentation du composant et
  importe ses types spécifiques depuis le fichier voisin
  `<NomComposant>.types.ts` ;
- `<NomComposant>.module.css` contient ses styles encapsulés et doit être
  présent dès la création du composant ;
- `<NomComposant>.types.ts` déclare les propriétés et tous les types propres au
  composant ; son nom reprend obligatoirement et exactement celui du composant
  en `PascalCase`, suivi du suffixe `.types.ts` ;
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

# Convention des types TypeScript

Les types TypeScript sont rangés selon leur portée afin de garder leur
responsabilité immédiatement lisible.

Les types propres à un composant, notamment ses propriétés, ses variantes et
ses unions internes, doivent être déclarés dans son dossier sous le nom exact
`<NomComposant>.types.ts`. Ils ne doivent être placés ni dans le fichier `.tsx`,
ni dans `src/types`, ni dans un fichier générique au nom différent.

```ts
import type { PixieCardProps } from "./PixieCard.types";
```

Le barrel du composant réexporte les types nécessaires à son API publique.

`src/types` reste réservé aux types globaux, métier ou réellement partagés par
plusieurs composants, registres ou couches du projet. Ces types sont regroupés
par domaine ou responsabilité et importés avec `import type` lorsqu'ils ne sont
utilisés qu'au niveau du typage.

Les déclarations existantes qui ne respectent pas encore cette répartition
constituent une dette de migration connue. Elles seront déplacées dans des
chantiers dédiés ; ne pas mélanger leur migration à un autre chantier sans
accord explicite.

# L'Atelier

L'Atelier est l'espace local de conception, d'essai et de documentation du
système d'interface. Il permet de faire passer une fondation ou un composant de
l'inventaire à l'esquisse, puis de l'esquisse à une version prête à projeter
avant son usage généralisé dans le Codex.

Il est accessible en développement à l'adresse `/atelier`. Son layout appelle
`notFound()` en production et ses métadonnées interdisent l'indexation. Ne
jamais rendre l'Atelier disponible en production sans demande explicite.

## Structure et responsabilités

```text
src/app/atelier/
├── layout.tsx
├── page.tsx
└── _components/
    ├── <Nom>Dossier.tsx
    └── <Nom>Playground.tsx

src/components/atelier/
└── <AtelierComposantPartage>/
    ├── <AtelierComposantPartage>.tsx
    ├── <AtelierComposantPartage>.module.css
    ├── <AtelierComposantPartage>.types.ts
    └── index.ts

src/components/ui/
└── <PixieDustOuPixieComposant>/
    ├── <PixieDustOuPixieComposant>.tsx
    ├── <PixieDustOuPixieComposant>.module.css
    ├── <PixieDustOuPixieComposant>.types.ts
    └── index.ts
```

- `layout.tsx` porte le cadre hors production et la navigation générale de
  l'Atelier.
- `page.tsx` porte le programme, l'inventaire des catégories, les tables
  d'items et l'ordre de projection des dossiers.
- `_components` contient uniquement les dossiers documentaires et leurs
  playgrounds propres à la route Atelier. Ces fichiers ne constituent pas
  l'API publique des composants testés.
- `src/components/atelier` contient les briques documentaires réutilisables par
  plusieurs dossiers.
- `src/components/ui` contient les primitives réellement destinées à
  l'interface du Codex et suit la convention `PixieDust` ou `Pixie`.
- `src/app/atelier/plans/[slug]` projette les dossiers préparatoires des Plans à
  partir du registre central ; ces routes ne sont ni des playgrounds Pixie ni
  des pages publiques du Codex.
- `src/registry/plans` porte la définition neutre des Plans, des Angles et des
  Objectifs ; leurs types métier partagés restent dans `src/types/codex-plans.ts`.
- Les types spécifiques de chaque composant restent dans son dossier sous le
  nom `<NomComposant>.types.ts` ; seuls les types globaux, métier ou partagés
  restent centralisés dans `src/types`.

Les fichiers existants qui ne suivent pas encore cette arborescence canonique
seront migrés dans un chantier dédié. Toute nouvelle création doit en revanche
la respecter immédiatement.

## Les sept plateaux

| Numéro | Catégorie         | Domaine                    | Contenu                                                                 |
| ------ | ----------------- | -------------------------- | ----------------------------------------------------------------------- |
| `01`   | `La Pellicule`    | Fondations                 | Couleurs, typographies, formes, rayons, rythmes et autres design tokens |
| `02`   | `Les Accessoires` | Primitives                 | Éléments simples et réutilisables de l'interface                        |
| `03`   | `Les Décors`      | Surfaces                   | Cartes, panneaux, cadres et conteneurs éditoriaux                       |
| `04`   | `Les Dialogues`   | Formulaires                | Champs, choix, contrôles et interactions de saisie                      |
| `05`   | `Le Montage`      | Composition                | Assemblages, séquences et rythmes de mise en page                       |
| `06`   | `Les Effets`      | Retours système            | États, alertes, transitions et réactions visibles de l'interface        |
| `07`   | `Les Plans`       | Explorations documentaires | Compositions métier qui donnent de nouvelles lectures aux Archives      |

Ne pas créer une huitième catégorie pour une nuance mineure. Choisir le
plateau qui décrit la responsabilité principale de l'item. Toute modification
de cette taxonomie demande un accord explicite.

`Les Plans` constituent une exception volontaire à la taxonomie des composants
UI. Un Plan est une composition métier du Codex : il part d'un Sujet publié,
choisit un Angle et un Objectif, fixe un Cadre, puis projette une Matière
documentaire. Il ne reçoit jamais de préfixe `PixieDust` ou `Pixie` et ne doit
pas être rangé dans `Le Montage`.

Les catégories utilisent trois états :

- `Hors champ` : la catégorie est inventoriée mais son plateau n'est pas encore
  ouvert ;
- `Plateau prêt` : la structure peut recevoir ses premiers items ;
- `En projection` : la catégorie contient une matière active et documentée.

## États et versions des items

- `À inventorier` : l'item est nommé dans la table, mais ne possède pas encore
  de dossier ni d'implémentation ;
- `Esquisse` : l'item est activement expérimenté, conserve une version `0.x`
  et utilise le préfixe `PixieDust` s'il appartient à `components/ui` ;
- `Prêt à projeter` : l'API, le rendu et l'accessibilité ont été validés, la
  version passe en `1.x` et le composant UI utilise le préfixe `Pixie`.

Une promotion doit mettre à jour dans le même chantier le nom, la version,
l'état, le dossier, les exemples, les imports et l'entrée d'inventaire.

## Ajouter un item dans l'Atelier

1. Choisir l'un des sept plateaux selon la responsabilité principale de
   l'item. Pour un Plan, appliquer le parcours spécifique décrit ci-dessous.
2. Ajouter l'item à l'inventaire de la catégorie dans `page.tsx` avec un nom,
   un rôle, un état et un `href` lorsque son dossier existe.
3. Créer ou déplacer l'implémentation réelle dans la famille appropriée de
   `src/components`, en respectant son sous-dossier `PascalCase`, son module
   CSS, son barrel, son préfixe de famille et la convention `PixieDust` ou
   `Pixie` pour les primitives UI.
4. Déclarer ses types spécifiques dans
   `<NomComposant>/<NomComposant>.types.ts`. Réserver `src/types` aux types
   globaux, métier ou partagés, et utiliser `import type` pour les imports
   exclusivement employés au niveau du typage.
5. Créer `<Nom>Dossier.tsx` dans `src/app/atelier/_components`. Ajouter
   `<Nom>Playground.tsx` uniquement lorsque des propriétés ou des états doivent
   être manipulés en direct.
6. Donner au dossier un identifiant stable en `kebab-case` et utiliser
   exactement ce même identifiant dans le `href` de l'inventaire.
7. Importer et projeter le dossier dans la section de sa catégorie, dans le
   même ordre que l'inventaire.
8. Mettre à jour le nombre de plateaux ouverts et la navigation de l'Atelier si
   une catégorie jusque-là hors champ devient accessible.
9. Vérifier le dossier dans l'Atelier local, puis lancer `pnpm check`.

## Ajouter ou faire évoluer un Plan

1. Définir d'abord la question documentaire, l'action de lecture et le
   contrechamp textuel du Plan.
2. Ajouter son slug et ses types partagés dans `src/types/codex-plans.ts`, puis
   sa définition neutre dans `src/registry/plans/plans.ts`.
3. Limiter le `Sujet` à une entrée publiée dans les catalogues `personnages`,
   `contributeurs`, `oeuvres` ou `epoques`. Ne pas accepter un objet libre ou
   une référence uniquement inventée par le prototype.
4. Déclarer explicitement les Angles et Objectifs admis. La proximité visuelle
   ne doit jamais créer à elle seule une relation documentaire.
5. Conserver les verdicts `pursue`, `transform`, `defer` et `abandon` dans le
   journal d'essai : ils ne doivent jamais entrer dans le registre neutre.
6. Utiliser la route canonique `/atelier/plans/<slug>`, générée depuis le
   registre par `src/app/atelier/plans/[slug]/page.tsx`, et le modèle partagé
   `AtelierPlanDossier`.
7. Lorsqu'un prototype nécessite une matière absente des Archives, employer
   une bobine témoin explicitement typée `test-reel`. Elle ne doit jamais être
   présentée comme une donnée publiée.
8. Une implémentation destinée au Codex appartient à `src/components/codex`,
   commence par `Codex` et ne peut être intégrée aux pages publiques qu'après
   validation de son dossier. Une esquisse de Plan n'est jamais projetée dans
   le Codex.
9. Vérifier les cinq routes, les états de matière, le clavier, le focus, le
   mouvement réduit, les deux Lumières et l'alternative textuelle, puis lancer
   `pnpm check`.

## Contenu obligatoire d'un dossier de Plan

Le dossier d'un Plan suit un modèle distinct de celui des composants Pixie :

1. un carton d'ouverture avec nom, identifiant, état et programme ;
2. le contrat de lecture : question, action et contrechamp textuel ;
3. le Plan maître qui expose la promesse documentaire ;
4. le champ, qui décrit le Cadre et la Matière effectivement montrés ;
5. le hors-champ, qui nomme ce que le Plan refuse d'inventer ;
6. la Régie : Sujet, Angle, Objectif et limites du Cadre ;
7. le contrechamp textuel équivalent à la composition visuelle ;
8. les Plans de coupe pour les états vides, légers, denses, incomplets et en
   erreur ;
9. la bobine témoin lorsqu'une matière d'essai est nécessaire ;
10. les garanties d'accessibilité et de continuité ;
11. le générique technique de la configuration partagée ;
12. le journal d'essai et la dernière image, dont le verdict reste extérieur
    au registre.

## Contenu obligatoire d'un dossier

Chaque dossier raconte le composant comme une production et conserve le même
ordre général :

1. un clap d'ouverture avec numéro d'item, nom, version et état ;
2. une fiche de rôle décrivant mission, usages, limites, dépendances et
   accessibilité ;
3. un exemple principal accompagné du code minimal ;
4. des séries d'exemples couvrant les variantes, tailles, couleurs, états ou
   autres propriétés pertinentes ;
5. un playground lorsque le composant possède des réglages interactifs ;
6. une section d'accessibilité montrant les usages décoratifs, informatifs et
   les états clavier nécessaires ;
7. un générique technique présentant les types utiles et la table complète des
   propriétés ;
8. pour une esquisse, un journal de production listant les décisions encore à
   prendre avant sa promotion.

Le vocabulaire cinématographique sert la narration, mais les titres et les
descriptions doivent rester compréhensibles sans connaître cette convention.

## Composants partagés à utiliser

Les dossiers et playgrounds doivent réutiliser les composants de
`src/components/atelier` au lieu de recréer localement le même motif :

- `AtelierOptionRadio` pour une option radio typée et cohérente ;
- `AtelierCodePanel` pour afficher le code généré, le copier et annoncer le
  résultat aux technologies d'assistance ;
- `AtelierPropertiesTable` pour la table canonique dont les colonnes sont
  toujours `Propriété`, `Type`, `Défaut` et `Rôle`.
- `AtelierPlanDossier` pour le montage documentaire commun des cinq Plans ; ses
  sections peuvent évoluer ensemble, sans dupliquer leur structure dans les
  pages de route.

Un nouveau composant partagé de l'Atelier ne doit être créé que lorsqu'au moins
deux dossiers ont réellement besoin du même motif. Il suit la convention de
structure des composants et commence obligatoirement par `Atelier`.

## Règles des playgrounds

- Limiter `"use client"` au playground et aux briques qui nécessitent vraiment
  un état ou un accès au navigateur ; le dossier documentaire reste un
  composant serveur.
- Reprendre la régie canonique : contrôles dans la colonne de gauche, aperçu
  dans la colonne de droite et code copiable sous l'aperçu.
- Utiliser des contrôles HTML natifs correctement étiquetés et entièrement
  utilisables au clavier.
- Mettre à jour en direct le rendu, les attributs d'accessibilité et le code à
  copier à chaque changement de réglage.
- Lorsque le rendu le justifie, proposer les contrôles `Lumière du plateau` et
  `Cadre` déjà employés par les playgrounds existants.
- Vérifier au minimum les lumières sombre et claire, les largeurs compactes et
  larges, le responsive, le focus visible et la synchronisation entre les
  contrôles, l'aperçu et le code généré.

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

## Tags, Releases et Journal de projection

Les tags, les Releases GitHub et le fichier `CHANGELOG.md` prolongent la
chronologie narrative du dépôt sans modifier l'historique des commits.

### Tags de clôture

Chaque Acte et chaque Entracte terminé reçoit un tag Git annoté placé
exclusivement sur son commit vide de clôture :

- `acte-i`, `acte-ii`, `acte-iii`, etc. pour les Actes ;
- `entracte-i`, `entracte-ii`, `entracte-iii`, etc. pour les Entractes ;
- le numéro d'un Entracte correspond à celui de l'Acte qu'il suit.

Ne jamais taguer le commit d'ouverture ni un commit de travail intermédiaire.
Un tag déjà publié ne doit pas être déplacé ou remplacé sans accord explicite.

Le message du tag commence par l'emoji temporel, indique le numéro de la
période et lui donne un titre descriptif :

```text
🎞️ Acte III · Le Codex apprend à raconter le temps
```

```text
🍿 Entracte III · Le Codex ouvre son Atelier et façonne son langage visuel
```

Le titre d'un Acte reprend son intitulé canonique d'ouverture. Celui d'un
Entracte résume les raccords réellement accomplis ; il ne reprend pas
automatiquement le texte de son commit d'ouverture ou de clôture.

Créer un tag annoté en ciblant explicitement le SHA de clôture :

```bash
git tag -a acte-iii <sha-cloture> \
  -m "🎞️ Acte III · Le Codex apprend à raconter le temps"
```

Toujours vérifier la cible avant publication :

```bash
git show acte-iii
```

Publier chaque tag individuellement :

```bash
git push origin acte-iii
```

Ne pas utiliser `git push --tags`, afin de ne jamais publier accidentellement
d'autres tags locaux.

### Releases des Actes

Seuls les Actes donnent lieu à une Release GitHub. Les Entractes restent
repérables par leur tag et leur entrée dans `CHANGELOG.md`, mais ne possèdent
pas de Release.

Une Release d'Acte respecte les règles suivantes :

- elle utilise le tag `acte-<numéro>` déjà publié ;
- son titre est strictement identique au message du tag ;
- elle n'est pas marquée comme préversion ;
- elle ne contient aucun fichier binaire, sauf demande explicite ;
- si GitHub demande un tag précédent pour générer une comparaison, choisir le
  tag de l'Entracte qui précède immédiatement l'Acte afin d'isoler son contenu ;
- ses notes sont relues et rédigées manuellement, même lorsqu'une génération
  automatique sert de point de départ.

Les notes d'une Release suivent cette structure :

1. un titre de niveau 1 identique à celui de la Release ;
2. une courte citation qui présente la promesse narrative de l'Acte ;
3. une section `✨ Dans ce ... Acte` résumant ses apports principaux ;
4. une section `🎬 Les scènes de l'Acte` listant tous ses commits dans l'ordre
   chronologique, de l'ouverture à la clôture ;
5. une section finale `🎞️ Fin de l'Acte ...` reprenant sa dernière image.

Chaque ligne du générique conserve le SHA court et le message complet du
commit, sans le réécrire :

```text
1. `51f19b1` — 🎞️ Acte > Acte III · Le Codex apprend à raconter le temps > 🐭 Julien
```

### Journal de projection

Le fichier racine `CHANGELOG.md`, intitulé `Journal de projection`, constitue
la chronologie complète du projet :

- les Actes y possèdent une entrée synthétique en complément de leur Release ;
- les Entractes y documentent les travaux de relecture, d'expérimentation et
  de raccord qui ne font pas l'objet d'une Release ;
- les entrées sont classées de la plus récente à la plus ancienne ;
- une nouvelle entrée est ajoutée après la clôture et la création du tag, sans
  réécrire le commit vide de clôture.

Une entrée d'Acte contient, dans cet ordre :

1. `🎞️ Acte <numéro> · <titre>` ;
2. le tag, le SHA d'ouverture et le SHA de clôture ;
3. `La projection` ;
4. `À l'écran` ;
5. `Générique des commits` dans l'ordre chronologique ;
6. `Dernière image`.

Une entrée d'Entracte contient, dans cet ordre :

1. `🍿 Entracte <numéro> · <titre descriptif>` ;
2. le tag, les SHA d'ouverture et de clôture, puis les deux Actes qu'il relie ;
3. `Le raccord` ;
4. `Pendant l'Entracte` ;
5. `Générique des commits` dans l'ordre chronologique ;
6. `Dernière image`.

Le Journal doit rester factuel, narratif et fidèle aux commits. Il résume les
changements sans inventer de capacité absente de la période concernée. Les
titres de films et d'œuvres sont écrits en italique dans la prose, tandis que
les messages de commits sont reproduits exactement.

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
