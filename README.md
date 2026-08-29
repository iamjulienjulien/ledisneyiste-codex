# 🐭 Le Codex du Disneyiste

> Explorer, relier et raconter les imaginaires Disney.

**Le Codex du Disneyiste** est l’espace numérique du projet éditorial
**Le Disneyiste**.

Il documente Disney à travers ses personnages, ses créateurs, ses œuvres et les
relations qui les relient, avec l’ambition de construire progressivement un
atlas éditorial de cet imaginaire culturel.

Le projet est personnel, indépendant et non officiel.

Son histoire de fabrication, des premiers Actes à leurs raccords, est conservée
dans le [`Journal de projection`](./CHANGELOG.md).

---

## État du projet

🚧 **En construction**

Le Codex est développé progressivement à partir d’objets réels plutôt qu’à
partir d’une architecture encyclopédique définie à l’avance.

Le catalogue actuel réunit **79 fiches documentaires** réparties dans quatre
familles :

- 22 Personnages, des précurseurs au cercle de Mickey et aux figures de
  _Blanche-Neige et les Sept Nains_ ;
- 32 Créateurs, des fondateurs aux artistes et techniciens du premier long
  métrage ;
- 23 Œuvres qui racontent les origines du studio, la fabrication de
  _Blanche-Neige et les Sept Nains_ et ses premiers prolongements ;
- 2 Époques qui couvrent les années 1923 à 1942.

Ces fiches sont reliées entre elles, rattachées automatiquement à leur Époque
et développées à partir de sources centralisées. Leurs 176 blocs éditoriaux
emploient une première collection de symboles illustrés. Le registre central
réunit désormais 248 symboles dans 21 collections. Quatorze récompenses
documentent également les premières distinctions du studio.

Les quatre index proposent une vue Cartes par défaut et une vue Liste
partageable par son URL. Les fiches héritent de l'identité de leur famille,
leurs métadonnées sont matérialisées par des badges et une première recherche
globale interroge directement les catalogues.

L’interface possède également son Atelier local : un espace hors production où
les fondations visuelles et les primitives passent de l’esquisse à leur version
prête à projeter.

---

## Principes

### Le terrain corrige le plan

L’architecture du Codex évolue à partir des besoins rencontrés dans les fiches
réelles.

Une abstraction n’est introduite que lorsqu’un besoin concret la justifie.

### Une seule source de vérité, plusieurs chemins de lecture

Les relations sont enregistrées là où elles possèdent un sens documentaire.

Le Codex peut ensuite calculer certains chemins inverses sans recopier les mêmes
relations dans plusieurs fichiers.

Par exemple :

```text
Mickey Mouse
└── créé par → Walt Disney
```

permet au Codex de faire apparaître automatiquement :

```text
Walt Disney
└── personnages → Mickey Mouse
```

### Documenter avant d’orner

Le système distingue plusieurs couches :

```text
Catalogue
→ indique qu’une entrée existe

Fiche
→ porte ses données documentaires

Sources
→ indiquent les documents utilisés

Relations
→ relient les entrées entre elles

Interface
→ donne à voir l’ensemble
```

---

## Architecture actuelle

```text
public/
└── symbols/
    ├── blocs/
    ├── codex/
    ├── general/
    │   ├── archives/
    │   ├── atelier/
    │   ├── cinema/
    │   ├── communication/
    │   ├── ecriture/
    │   ├── evenements/
    │   ├── exploration/
    │   ├── logos/
    │   └── temps/
    ├── recompenses/
    └── techniques/
        ├── animation/
        ├── couleur/
        ├── effets/
        ├── images/
        ├── imagineering/
        └── son/

scripts/
├── verifier-metadonnees.mjs
├── verifier-oeuvres.mjs
├── verifier-personnages.mjs
├── verifier-recompenses.mjs
├── verifier-relations.mjs
└── verifier-symboles.mjs

src/
├── app/
│   ├── atelier/
│   ├── contributeurs/
│   ├── epoques/
│   ├── oeuvres/
│   ├── personnages/
│   ├── recherche/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── atelier/
│   ├── codex/
│   └── ui/
│
├── data/
│   ├── catalogues/
│   ├── contributeurs/
│   ├── epoques/
│   ├── oeuvres/
│   ├── personnages/
│   ├── recompenses/
│   ├── sources/
│   └── relations.ts
│
├── lib/
├── registry/
│   ├── colors/
│   ├── metadata/
│   └── symbols/
│
├── styles/
│   └── palettes/
│
└── types/
```

Chaque composant de `src/components` possède son sous-dossier `PascalCase`,
son fichier TSX, son module CSS et son barrel public. Les conventions complètes
restent centralisées dans [`AGENTS.md`](./AGENTS.md).

---

## Montage partagé des index et des fiches

### Une même ossature pour les quatre index

`CodexIndexPage` compose le cadre commun des index Personnages, Créateurs,
Œuvres et Époques. À partir d'une famille issue du type global `CodexFamily`,
il règle :

- le fond de scène et le symbole de l'en-tête ;
- la couleur d'identité de la famille ;
- la largeur et le rythme vertical de la page ;
- le compteur et l'emplacement des commandes de vue ;
- la surface dans laquelle la collection est projetée.

Chaque route reste responsable de ses données et de ses composants métier. Elle
choisit entre `CodexIndexListItem` et sa Card spécialisée, mais ne reconstruit
plus le décor qui les entoure :

```tsx
<CodexIndexPage famille="oeuvres" {...informationsIndex}>
    {currentView === "cards" ? <PixieGrid>…</PixieGrid> : <ul>…</ul>}
</CodexIndexPage>
```

### Un carton commun pour les repères

`CodexFicheReperes` reçoit une liste de couples `label` / `value` et les
projette dans une liste de description sémantique. Le composant fournit le
carton, son accent et sa grille ; chaque famille choisit les repères qui ont un
sens pour sa fiche :

```tsx
<CodexFicheReperes
    reperes={[
        { label: "Sortie", value: "21 décembre 1937" },
        { label: "Format", value: "long métrage d'animation" },
    ]}
/>
```

Une valeur peut être du texte ou une composition React, et un repère peut
occuper toute la largeur lorsque son contenu le demande. Le composant ne déduit
jamais une information depuis le texte de la fiche.

### Des chapitres montés au même rythme

`CodexFicheSection` fournit le montage commun des sections : largeur, espaces,
séparateur de séquence, en-tête optionnel, symbole, eyebrow, titre et
description. Les blocs éditoriaux, les détails structurés des œuvres, les
relations, les récompenses et les sources l'utilisent tous.

Leur contenu intérieur reste spécialisé — paragraphes, listes, définitions,
cartes de trophées ou références — tandis que la hiérarchie documentaire et le
rythme visuel demeurent communs aux quatre familles.

---

## Données

Le contenu du Codex repose actuellement sur des fichiers JSON versionnés dans
le dépôt.

### Catalogues

Les catalogues décrivent les entrées disponibles :

```text
src/data/catalogues/
├── contributeurs.json
├── epoques.json
├── oeuvres.json
└── personnages.json
```

Ils contiennent uniquement les informations nécessaires à l’indexation et à
l’identification d’une entrée.

### Fiches

Les données détaillées sont séparées des catalogues :

```text
src/data/contributeurs/
src/data/epoques/
src/data/oeuvres/
src/data/personnages/
```

Chaque famille possède son propre modèle métier.

### Projection des données structurées

La fiche de _Blanche-Neige et les Sept Nains_ constitue la première projection
complète du modèle enrichi des Œuvres. Son JSON conserve séparément :

```text
titres alternatifs
durées par version
période de production
événements de sortie
données économiques et degré de certitude
relations avec les œuvres sources ou préparatoires
contributions regroupées par domaine
```

`CodexOeuvreDetails` transforme uniquement les groupes présents en chapitres de
fiche. Les champs restent optionnels : les courts métrages plus simples ne sont
pas contraints de simuler la richesse documentaire d'un long métrage.

Chaque groupe est projeté dans une `PixieCard` et reçoit un symbole choisi dans
les registres généraux ou techniques. Les catégories du générique disposent
elles aussi de leur propre outil illustré, sans faire descendre la connaissance
des métiers dans les primitives Pixie.

### Citations dans les chapitres et les repères

Un bloc éditorial ou une donnée structurée peut porter sa propre liste
`sources`. `getFicheSourceIds` parcourt la fiche, réunit ces identifiants avec
les sources générales et les déduplique avant leur résolution dans le registre
central.

`CodexSourceCitations` projette ensuite les appels numérotés au plus près de ce
qu'ils documentent : au bas d'un chapitre éditorial, d'un titre alternatif,
d'une durée, d'une sortie, d'un chiffre ou d'une relation. Chaque numéro mène à
l'ancre correspondante dans `CodexSources`, qui conserve le titre, l'auteur,
l'éditeur, la date et le lien de consultation de la source.

Ainsi, la bibliographie reste centralisée sans détacher la preuve du passage ou
du repère auquel elle se rapporte.

### Sources

Les sources sont centralisées dans :

```text
src/data/sources/
```

Les fiches référencent les sources par identifiant plutôt que de recopier leurs
métadonnées.

Une source institutionnelle, historique ou éditoriale est considérée comme un
matériau documentaire, jamais comme une vérité absolue du Codex.

---

## Relations

Les entrées peuvent se référencer à l’aide de `ReferenceCodex`.

Une référence peut pointer vers :

```text
personnage
contributeur
oeuvre
epoque
```

Certaines relations plus riches possèdent leur propre structure métier.

Par exemple, une contribution à une œuvre contient à la fois :

```text
contributeur
+
rôle(s)
```

Le Codex calcule également certaines relations inverses à partir des données
existantes. Les dates de création, de sortie ou d’activité permettent aussi de
rattacher automatiquement une entrée aux Époques dont les bornes de fin sont
exclusives.

---

## Projection Originale

L’interface utilise un système appelé **Projection**.

Une Projection définit la manière dont le même contenu est donné à voir sans
modifier les données du Codex.

La première est :

```text
Projection Originale
```

Elle possède actuellement deux Lumières :

```text
sombre
claire
```

La lumière sombre est utilisée par défaut.

Les composants utilisent exclusivement des tokens sémantiques tels que :

```text
canvas
surface
ink
muted
line
accent
```

et ne dépendent pas directement des couleurs d’une Projection.

Cette architecture permettra plus tard de créer d’autres Projections sans
réécrire les composants.

### L’Atelier d’animation

Une seconde palette complète la Projection Originale. Elle ne colore pas les
surfaces générales : elle qualifie les familles éditoriales, les métadonnées,
les badges et les symboles.

Les quatre familles possèdent ainsi leur propre repère :

```text
Personnages → rouge crayon
Créateurs   → jaune lampe
Œuvres      → gouache
Époques     → vert cellulo
```

Les tokens de référence sont séparés par palette dans :

```text
src/styles/palettes/projection-originale.css
src/styles/palettes/atelier-animation.css
```

---

## Typographies et hall du Codex

Cinq familles typographiques donnent désormais un rôle distinct à chaque voix
de l’interface :

```text
Grandstander  → marque et grand titre de la page d’accueil
Fraunces      → titres éditoriaux et sous-titre d’ouverture
Source Sans 3 → textes courants
League Spartan → eyebrows et repères de navigation
IBM Plex Mono → code, types et tokens de l’Atelier
```

La page d’accueil ouvre la projection dans un grand carton composé par
`PixieCard` et `PixieBackdrop`. Son récit se concentre ensuite sur les quatre
portes du Codex : leurs cartes Pixie partagent une même hauteur, alignent leurs
appels à l’action, affichent leur compteur dans un badge et font apparaître un
halo de projecteur au survol.

Son générique développé rassemble les chemins d’exploration, la mention
d’indépendance et la signature du projet. Un `CodexFooter` plus court prolonge
ce raccord sur les index, les fiches, la recherche et les pages égarées.

La recherche reprend désormais le même cadre de projection : son ouverture et
sa régie occupent toute la largeur disponible, tandis que ses résultats restent
regroupés par famille et réemploient les cartes métier.

---

## Symboles et composants Pixie

Les symboles illustrés sont résolus par un registre global composé de
sous-registres et de collections :

```text
blocs.personnages
blocs.contributeurs
blocs.oeuvres
blocs.epoques
codex.index
general.logos
general.cinema
general.archives
general.ecriture
general.exploration
general.temps
general.atelier
general.evenements
general.communication
recompenses.trophees
techniques.animation
techniques.images
techniques.couleur
techniques.son
techniques.effets
techniques.imagineering
```

Les collections `general` rassemblent le logo, la salle de cinéma, les
archives, l’écriture, l’exploration, le temps, l’atelier, les événements et la
communication. Les collections `techniques` couvrent l’animation, l’image, la
couleur, le son, les effets et l’Imagineering. Elles complètent les quatre
index, les blocs éditoriaux et les trophées déjà illustrés.

`PixieSymbol` constitue la porte d’entrée unique vers ce registre. Son appel ne
dépend pas du chemin d’une image, mais d’une sélection typée :

```tsx
<PixieSymbol registry="codex" collection="index" slug="personnages" size="xl" />
```

Les primitives UI suivent un cycle de maturation visible dans leur nom :

```text
PixieDust… → esquisse encore travaillée dans l’Atelier
Pixie…     → composant validé et prêt à projeter
```

---

## L’Atelier

L'Atelier documente les palettes, les composants, leurs variantes, leur
accessibilité et leur API. Ses cinq premiers accessoires — `PixieSymbol`,
`PixieButton`, `PixieLink`, `PixieBadge` et `PixieSeparator` —, ses six Décors
— `PixieCard`, `PixiePanel`, `PixieFrame`, `PixieCallout`, `PixieInset` et
`PixieBackdrop` — et les neuf composants validés du Montage,
`PixieContainer`, `PixieStack`, `PixieCluster`, `PixieSection`, `PixieGrid`,
`PixieSidebar`, `PixieSwitcher`, `PixieRail` et `PixieStickyRegion`, ainsi que
les trois premiers Dialogues `PixieField`, `PixieInput` et `PixieSelect`,
sont désormais prêts à projeter.

Ses six plateaux de travail sont maintenant actifs :

1. **La Pellicule** réunit les typographies, les palettes et les formes ;
2. **Les Accessoires** éprouvent les primitives avant leur entrée dans le
   Codex ;
3. **Les Décors** façonnent les surfaces et leurs profondeurs ;
4. **Les Dialogues** composent les champs et contrôles de formulaire ;
5. **Le Montage** règle la composition et le rythme des séquences ;
6. **Les Effets** rendent visibles les attentes et les retours du système.

L’Atelier documente actuellement **8 esquisses PixieDust**, auxquelles
s’ajoutent les six Décors, les neuf composants du Montage et les trois premiers
Dialogues prêts à projeter :

- **Décors — 6 composants validés :** `PixieCard`, `PixiePanel`, `PixieFrame`,
  `PixieCallout`, `PixieInset` et `PixieBackdrop` ;
- **Dialogues — 3 composants validés et 3 esquisses :** `PixieField`,
  `PixieInput`, `PixieSelect`, `PixieDustTextarea`, `PixieDustSwitch` et
  `PixieDustSearchField` ;
- **Montage — 9 composants validés et 2 esquisses :** `PixieContainer`,
  `PixieStack`, `PixieCluster`, `PixieSection`, `PixieGrid`, `PixieSidebar`,
  `PixieSwitcher`, `PixieRail`, `PixieStickyRegion`, `PixieDustSplit` et
  `PixieDustBleed` ;
- **Effets — 3 :** `PixieDustToast`, `PixieDustLoader` et
  `PixieDustSkeleton`.

Il est accessible uniquement en développement :

```text
http://ledisneyiste-codex.test/atelier
```

La route appelle `notFound()` en production et ses métadonnées interdisent son
indexation. Sa structure, ses six plateaux et son parcours d’ajout sont décrits
dans [`AGENTS.md`](./AGENTS.md#latelier).

---

## Développement

### Prérequis

- Node.js 22+
- pnpm 11+

### Installation

```bash
pnpm install
```

### Développement local

```bash
pnpm dev
```

L’application est disponible sur :

```text
http://ledisneyiste-codex.test/
```

Le serveur Next.js reste également accessible par défaut sur
`http://localhost:3000` lorsque le domaine local n’est pas configuré.

---

## Vérifications

### Contrôle local complet

```bash
pnpm check
```

Cette commande exécute :

```text
format
→ format:check
→ lint
→ check:symbols
→ check:metadata
→ check:oeuvres
→ check:personnages
→ check:relations
→ check:recompenses
→ build
```

### Contrôle non destructif

```bash
pnpm check:ci
```

Destiné notamment aux environnements automatisés.

Les commandes individuelles restent disponibles :

```bash
pnpm format
pnpm format:check
pnpm lint
pnpm check:symbols
pnpm check:metadata
pnpm check:oeuvres
pnpm check:personnages
pnpm check:relations
pnpm check:recompenses
pnpm build
```

`check:symbols` parcourt les cinq sous-registres, valide leurs collections,
leurs définitions et leurs chemins, vérifie que chaque image publique est
enregistrée et que chaque symbole possède bien son fichier. Il conserve
également le contrôle métier qui impose à chaque bloc éditorial un type présent
dans la bonne collection. Les contrôles suivants éprouvent les métadonnées des
catalogues, le modèle des Œuvres et sa fixture de long métrage, les variantes de
noms et les formes des Personnages, la cohérence des références et des
relations, puis les récompenses, leurs bénéficiaires, leurs sources et leurs
trophées illustrés.

---

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Prettier
- pnpm 11

---

## Conventions de développement

Les règles de contribution et la convention narrative des commits sont
documentées dans :

[`AGENTS.md`](./AGENTS.md)

La chronologie des Actes, des Entractes, de leurs tags et de leurs génériques
est consignée dans le [`Journal de projection`](./CHANGELOG.md).

Le développement est notamment rythmé par des **Actes** et des **Entractes**.

```text
🎞️ Acte
→ cycle de construction et d’expérimentation

🍿 Entracte
→ période de relecture, correction et finition
```

Les véritables changements utilisent toujours leur domaine propre :

```text
✨ Étincelle
🏗️ Décor
🎨 Mise en scène
🎬 Scène
🩹 Raccord
🗄️ Archives
🔌 Passerelle
🛡️ Garde-fou
✍️ Scénario
🧹 Coulisses
⚡ Accéléré
🧪 Répétition
🚀 Première
```

---

## Indépendance

Le Disneyiste est un projet éditorial personnel, indépendant et non officiel,
créé par **Julien Julien**.

Il n’est ni affilié, ni approuvé, ni sponsorisé par The Walt Disney Company ou
ses filiales.

Les marques, personnages, œuvres et noms cités appartiennent à leurs titulaires
respectifs.

---

## 👋 À propos du développeur

**Julien Julien**<br />
_Développeur web & créateur de projets narratifs._

Je conçois des applications et des outils numériques durables, où le code, la
structure et le récit avancent ensemble.<br />
J'aime les projets clairs, évolutifs, pensés pour le temps long plutôt que pour
l'instantané.

📍 Angers, France 🇫🇷<br />
🌍 <https://julienjulien.fr>
