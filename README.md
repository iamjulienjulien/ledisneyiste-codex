# 🐭 Le Codex du Disneyiste

> Explorer, relier et raconter les imaginaires Disney.

**Le Codex du Disneyiste** est l’espace numérique du projet éditorial
**Le Disneyiste**.

Il documente Disney à travers ses personnages, ses créateurs, ses œuvres, ses
époques, ses chansons et les relations qui les relient, avec l’ambition de
construire progressivement un atlas éditorial de cet imaginaire culturel.

Le projet est personnel, indépendant et non officiel.

Son histoire de fabrication, des premiers Actes à leurs raccords, est conservée
dans le [`Journal de projection`](./CHANGELOG.md).

---

## État du projet

🚧 **En construction**

Le Codex est développé progressivement à partir d’objets réels plutôt qu’à
partir d’une architecture encyclopédique définie à l’avance.

Le catalogue actuel réunit **109 fiches documentaires** réparties dans cinq
familles :

- 33 Personnages, des précurseurs au cercle de Mickey, aux figures de
  _Blanche-Neige et les Sept Nains_ et à la troupe de _Pinocchio_ ;
- 41 Créateurs, des fondateurs aux artistes, techniciens, voix et auteurs des
  deux premiers longs métrages ;
- 24 Œuvres qui racontent les origines du studio, la fabrication de
  _Blanche-Neige et les Sept Nains_, puis l’entrée de _Pinocchio_ dans le
  monde ;
- 2 Époques qui couvrent les années 1923 à 1942.
- 9 Chansons qui ouvrent leur vie publique, de la création aux interprétations
  documentées.

Ces fiches sont reliées entre elles et développées à partir de sources
centralisées ; les archives concernées sont également rattachées
automatiquement à leur Époque. Leurs 208 blocs éditoriaux emploient une
première collection de symboles illustrés. Le registre central réunit désormais
432 symboles dans 6 registres et 30 collections. Quarante-cinq récompenses
documentent également les premières distinctions du studio et les vingt-neuf
Disney Legends déjà présents dans l’index des Créateurs.

Les cinq index proposent une vue Cartes par défaut et une vue Liste
partageable par son URL. Les fiches héritent de l'identité de leur famille,
leurs métadonnées sont matérialisées par des badges et une première recherche
globale interroge directement les catalogues.

L’interface possède également deux coulisses locales : l’Atelier, où les
fondations visuelles et les primitives passent de l’esquisse à leur version
prête à projeter, et le Guidebook, qui met la documentation transmissible en
lecture sans l’ouvrir au site de production.

L’Acte VI a donné aux œuvres une vie publique documentée : identités, œuvres
sources, versions, circulations, réceptions, chansons, récompenses et mesures
économiques possèdent désormais des contrats distincts. Son noyau consacré à
_Pinocchio_ ajoute 26 Archives, 31 contributions qualifiées, cinq Chansons,
deux Oscars, huit chapitres et 29 unités de preuve. Le
`PlanGeneriqueVivant` v1.0.0 révèle cette fabrication sur la fiche de l’œuvre
sans remplacer son générique textuel. Les Œuvres sources, les Musiques, les
droits média et les enquêtes économiques non publiables restent internes.

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
docs/
├── agents/                 # Guidebook destiné aux agents IA
└── studio/                 # onboarding, courriers et registre d'équipe

public/
└── symbols/
    ├── diffusion/
    ├── general/
    ├── index/
    ├── recompenses/
    ├── sources/
    └── techniques/

scripts/
├── verifier-chansons.mjs
├── verifier-donnees-economiques.mjs
├── verifier-focale.mjs
├── verifier-guidebook.mjs
├── verifier-identites.mjs
├── verifier-interlude-disney-legends.mjs
├── verifier-metadonnees.mjs
├── verifier-matiere-plans.mjs
├── verifier-oeuvres.mjs
├── verifier-oeuvres-sources.mjs
├── verifier-phase-4.mjs
├── verifier-phase-5.mjs
├── verifier-phase-6.mjs
├── verifier-phase-7.mjs
├── verifier-phase-8.mjs
├── verifier-phase-9.mjs
├── verifier-plans.mjs
├── verifier-personnages.mjs
├── verifier-recompenses.mjs
├── verifier-relations.mjs
└── verifier-symboles.mjs

src/
├── app/
│   ├── atelier/
│   ├── chansons/
│   ├── contributeurs/
│   ├── epoques/
│   ├── guidebook/
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
│   │   ├── CodexCommon/
│   │   ├── CodexFiche/
│   │   ├── CodexIndex/
│   │   └── CodexLayout/
│   ├── focale/
│   ├── plans/
│   └── ui/
│
├── data/
│   ├── catalogues/
│   ├── chansons/
│   ├── contributeurs/
│   ├── epoques/
│   ├── oeuvres/
│   ├── personnages/
│   ├── recompenses/
│   ├── sources/
│   └── relations.ts
│
├── fixtures/
│   ├── focale/
│   └── plans/
│
├── lib/
│   ├── guidebook/
│   └── plans/
├── registry/
│   ├── colors/
│   ├── credits/
│   ├── guidebook/
│   ├── metadata/
│   ├── plans/
│   └── symbols/
│
├── styles/
│   └── palettes/
│
└── types/
```

Chaque composant de `src/components` possède son sous-dossier `PascalCase`,
son fichier TSX, son module CSS, ses types locaux et son barrel public. Les
composants métier héritent du préfixe de leur territoire Codex. Les conventions
complètes restent centralisées dans [`AGENTS.md`](./AGENTS.md).

---

## Montage partagé des index et des fiches

### Une même ossature pour les cinq index

`CodexIndexPage` compose le cadre commun des index Personnages, Créateurs,
Œuvres, Époques et Chansons. À partir d'une famille issue du type global
`CodexFamily`, il règle :

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
rythme visuel demeurent communs aux cinq familles.

---

## Données

Le contenu du Codex repose actuellement sur des fichiers JSON versionnés dans
le dépôt.

### Catalogues

Les catalogues décrivent les entrées disponibles :

```text
src/data/catalogues/
├── chansons.json
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
src/data/chansons/
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

`CodexFicheOeuvreDetails` transforme uniquement les groupes présents en chapitres de
fiche. Les champs restent optionnels : les courts métrages plus simples ne sont
pas contraints de simuler la richesse documentaire d'un long métrage.

Chaque groupe est projeté dans une `PixieCard` et reçoit un symbole choisi dans
les registres généraux ou techniques. Les catégories du générique disposent
elles aussi de leur propre outil illustré, sans faire descendre la connaissance
des métiers dans les primitives Pixie.

La fiche de _Pinocchio_ prolonge ce contrat avec quatre événements de sortie,
quatre versions, trois exploitations, six réceptions territoriales et une
mesure économique structurée. Le cumul français de 7,84 millions de
spectateurs conserve ainsi sa période 1946–2010, sa méthode CNC et sa réserve ;
il n’est jamais présenté comme le seul résultat de la sortie de 1946.

### Contrats documentaires internes

Les enrichissements documentaires sont préparés dans des contrats spécialisés :

```text
src/types/circulation-oeuvre.ts
src/types/oeuvre-source.ts
src/types/chanson.ts
src/types/musique.ts
src/types/projection-media.ts
src/types/donnee-economique.ts
```

Ils distinguent notamment sortie, version, exploitation et réception ; œuvre
Disney et œuvre source ; composition, occurrence, interprétation et
enregistrement ; donnée économique originale et dérivation calculée.

Leurs cas d’essai restent sous `scripts/fixtures`. Les Chansons possèdent
désormais leur catalogue, leurs neuf fiches et leurs routes publiques ; les
Œuvres sources et les Musiques restent internes. Les dossiers de droits et
d’enquête demeurent privés ; leurs projections recopient uniquement la matière
explicitement autorisée.

### Citations dans les chapitres et les repères

Un bloc éditorial ou une donnée structurée peut porter sa propre liste
`sources`. `getFicheSourceIds` parcourt la fiche, réunit ces identifiants avec
les sources générales et les déduplique avant leur résolution dans le registre
central.

`CodexFicheSourceCitations` projette ensuite les appels numérotés au plus près de ce
qu'ils documentent : au bas d'un chapitre éditorial, d'un titre alternatif,
d'une durée, d'une sortie, d'un chiffre ou d'une relation. Chaque numéro mène à
l'ancre correspondante dans `CodexFicheSources`, qui conserve le titre, l'auteur,
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
chanson
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

Les cinq familles possèdent ainsi leur propre repère :

```text
Personnages → rouge crayon
Créateurs   → jaune lampe
Œuvres      → gouache
Époques     → vert cellulo
Chansons    → rose aérographe
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
`PixieCard` et `PixieBackdrop`. Son récit se concentre ensuite sur les cinq
portes du Codex : leurs cartes Pixie partagent une même hauteur, alignent leurs
appels à l’action, affichent leur compteur dans un badge et font apparaître un
halo de projecteur au survol.

Son générique développé rassemble les chemins d’exploration, la mention
d’indépendance et la signature du projet. Un `CodexLayoutFooter` plus court prolonge
ce raccord sur les index, les fiches, la recherche et les pages égarées.

La recherche reprend désormais le même cadre de projection : son ouverture et
sa régie occupent toute la largeur disponible, tandis que ses résultats restent
regroupés par famille et réemploient les cartes métier.

---

## Symboles et composants Pixie

Les symboles illustrés sont résolus par un registre global composé de
sous-registres et de collections :

```text
diffusion.{salles,television,video,numerique,scene-et-parcs}
general.{logos,cinema,archives,ecriture,exploration,temps,atelier,evenements,communication}
index.{personnages,oeuvres,createurs,epoques,chansons}
recompenses.trophees
sources.{supports,documents,archives,conservation}
techniques.{animation,images,couleur,son,effets,imagineering}
```

Les six registres séparent les usages sans dupliquer les définitions : `index`
porte l’identité des catalogues et leurs chapitres, `general` le vocabulaire
transversal, `techniques` les métiers de fabrication, `diffusion` les modes de
projection, `sources` les supports de preuve et `recompenses` les trophées.
Les blocs éditoriaux choisissent leurs symboles dans ces mêmes collections.

`PixieSymbol` constitue la porte d’entrée unique vers ce registre. Son appel ne
dépend pas du chemin d’une image, mais d’une sélection typée :

```tsx
<PixieSymbol
    registry="index"
    collection="personnages"
    slug="principal"
    size="xl"
/>
```

Les primitives UI suivent un cycle de maturation visible dans leur nom :

```text
PixieDust… → esquisse encore travaillée dans l’Atelier
Pixie…     → composant validé et prêt à projeter
```

---

## L’Atelier

L'Atelier documente les palettes, les composants, leurs variantes, leur
accessibilité et leur API. **32 composants Pixie** sont désormais prêts à
projeter. Ses cinq premiers accessoires — `PixieSymbol`,
`PixieButton`, `PixieLink`, `PixieBadge` et `PixieSeparator` —, ses six Décors
— `PixieCard`, `PixiePanel`, `PixieFrame`, `PixieCallout`, `PixieInset` et
`PixieBackdrop` — et les neuf composants validés du Montage,
`PixieContainer`, `PixieStack`, `PixieCluster`, `PixieSection`, `PixieGrid`,
`PixieSidebar`, `PixieSwitcher`, `PixieRail` et `PixieStickyRegion`, ainsi que
les six Dialogues `PixieField`, `PixieInput`, `PixieSelect`, `PixieSwitch`,
`PixieSearchField` et `PixieTextarea`, les trois Écrans `PixieAscii`,
`PixieMarkdown` et `PixieDocs`, ainsi que les trois premiers Effets
`PixieLoader`, `PixieSkeleton` et `PixieToast`, sont désormais prêts à projeter.
`PixieDocs` assemble une arborescence autorisée, un document rendu côté serveur
et son sommaire sans connaître leurs sources. Son contrat stable est éprouvé
avec la bibliothèque locale et une bobine Notion déclarée : manifeste fermé,
ascendance réelle, normalisation des extensions et neutralisation des pages
hors projection précèdent toujours l’interface.

Ses huit plateaux de travail sont maintenant actifs :

1. **La Pellicule** réunit les typographies et les palettes ;
2. **Les Accessoires** éprouvent les primitives avant leur entrée dans le
   Codex ;
3. **Les Décors** façonnent les surfaces et leurs profondeurs ;
4. **Les Écrans** restituent les documents et compositions spécialisées sans
   les modifier ;
5. **Les Dialogues** composent les champs et contrôles de formulaire ;
6. **Le Montage** règle la composition et le rythme des séquences ;
7. **Les Effets** rendent visibles les attentes et les retours du système ;
8. **Les Plans** composent de nouvelles lectures métier à partir des Archives.

Le huitième plateau rassemble cinq explorations documentaires : le
**Travelling documentaire**, le **Plan d’ensemble**, le **Montage du temps**,
le **Générique vivant** et la **Table lumineuse**. Chaque Plan possède un
dossier privé distinct des fiches Pixie. Il annonce sa question, son action de
lecture, son Cadre, sa Matière et son contrechamp textuel, puis propose une
régie et un prototype manipulable.

Quatre prototypes demeurent en version `v0.1.0` et observent
_Blanche-Neige et les Sept Nains_. Le Générique vivant a été éprouvé sur les
31 contributions de _Pinocchio_, puis appliqué à sa fiche en version `v1.0.0`
comme premier Plan public et réversible :

- le **Travelling documentaire** suit les sources et laboratoires qui
  convergent vers le premier long métrage sans fabriquer de causalité ;
- le **Plan d’ensemble** distribue son voisinage limité en constellations
  documentaires ;
- le **Montage du temps** aligne fabrication, diffusion et reconnaissance sur
  des pistes qui conservent la précision réelle de leurs dates ;
- le **Générique vivant** regroupe les contributions par domaines et rôles sans
  transformer une présence en hiérarchie ; sa projection publique conserve un
  repli vers le générique simple ;
- la **Table lumineuse** relie les affirmations à leurs sources et conserve
  explicitement les classifications et positions encore absentes des
  Archives.

Les Plans partagent une grammaire centrale dans `src/registry/plans` et
`src/types/codex-plans.ts`. Leur Sujet demeure volontairement limité à une
entrée publiée dans les catalogues Personnages, Créateurs, Œuvres ou Époques :
la nouvelle famille Chansons n’élargit pas implicitement ce contrat. Les
Bobines témoins et les verdicts expérimentaux restent explicitement séparés
des Archives.

La couche pure `src/lib/plans` dérive les nœuds, relations, événements,
crédits et preuves nécessaires aux cinq lectures. Les modèles propres à chaque
Plan sont calculés côté serveur puis transmis à leur régie interactive. Huit
Bobines témoins versionnées sous `src/fixtures/plans` éprouvent les corpus
vides, réduits ou denses, les cycles et nœuds orphelins, les dates partielles ou
contradictoires, les grands génériques, les preuves contrastées et les
contraintes d’accessibilité. Elles ne modifient jamais les Archives et restent
signalées comme matière de démonstration dans l’Atelier.

### Focale · la grammaire du regard

Focale est un noyau de visualisation parallèle à Pixie et distinct des Plans.
Pixie règle les surfaces et les contrôles ; Focale traduit un modèle déjà
dérivé en échelles, marques, légendes, annotations, viewport et contrechamp
tabulaire ; le Plan choisit la question documentaire.

Ses six primitives éprouvées vivent dans `src/components/focale` :

```text
FocaleScale
FocaleMark
FocaleLegend
FocaleAnnotation
FocaleViewport
FocaleTable
```

Elles ne connaissent aucun type métier du Disneyiste et n’inventent aucun
fait. Le noyau reste volontairement borné à ce premier usage ;
`FocaleTooltip` et toute extension attendent un second cas réel.

L’Atelier documente actuellement **32 composants validés** et **2 esquisses
PixieDust** :

- **Accessoires — 5 composants validés :** `PixieSymbol`, `PixieButton`,
  `PixieLink`, `PixieBadge` et `PixieSeparator` ;
- **Décors — 6 composants validés :** `PixieCard`, `PixiePanel`, `PixieFrame`,
  `PixieCallout`, `PixieInset` et `PixieBackdrop` ;
- **Écrans — 3 composants validés :** `PixieAscii`, `PixieMarkdown` et
  `PixieDocs` ;
- **Dialogues — 6 composants validés :** `PixieField`, `PixieInput`,
  `PixieSelect`, `PixieSwitch`, `PixieSearchField` et `PixieTextarea` ;
- **Montage — 9 composants validés et 2 esquisses :** `PixieContainer`,
  `PixieStack`, `PixieCluster`, `PixieSection`, `PixieGrid`, `PixieSidebar`,
  `PixieSwitcher`, `PixieRail`, `PixieStickyRegion`, `PixieDustSplit` et
  `PixieDustBleed` ;
- **Effets — 3 composants validés :** `PixieLoader`, `PixieSkeleton` et
  `PixieToast`.

Il est accessible uniquement en développement :

```text
http://ledisneyiste-codex.test/atelier
```

La route appelle `notFound()` en production et ses métadonnées interdisent son
indexation. Sa structure, ses huit plateaux et ses parcours d’ajout sont décrits
dans [`AGENTS.md`](./AGENTS.md#latelier).

---

## Le Guidebook

Le Guidebook met les documents transmissibles du projet en lecture dans une
interface privée composée avec `PixieDocs`, `PixieMarkdown` et `PixieAscii`.
Il expose deux bibliothèques uniquement en développement :

- les sept chapitres locaux déclarés sous `docs/agents/` ;
- la racine Notion **Le Disneyiste**, sa section **01 · Vision & Doctrine** et
  les pages enfants explicitement inscrites dans son arborescence de
  projection.

```text
http://ledisneyiste-codex.test/guidebook
http://ledisneyiste-codex.test/guidebook/notion
```

Next.js possède les routes et ne génère que les slugs déclarés. Les adaptateurs
servent un document déjà autorisé et analysé ; les composants clients ne
reçoivent ni chemin réel du dépôt, ni identifiant Notion, ni secret. Sans
`NOTION_API_KEY`, la bibliothèque distante conserve un état différé sans
empêcher la lecture locale.

Un contrôle de lecture permet de conserver la bibliothèque dans la grille ou
de la transformer en panneau flottant, et mémorise ce choix pendant la
navigation. Les cartes de service Guru Éditions reconnues par l’analyseur
reçoivent une présence ASCII dédiée sans modifier leur dessin monospacé.

Comme l’Atelier, `/guidebook` appelle `notFound()` en production, interdit son
indexation et ne figure pas dans la navigation publique. Le raccord entre les
deux coulisses reste disponible depuis leur navigation interne.

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
→ check:pixie
→ check:symbols
→ check:metadata
→ check:focale
→ check:plans
→ check:plan-matter
→ check:guidebook
→ check:identites
→ check:oeuvres
→ check:oeuvres-sources
→ check:chansons
→ check:donnees-economiques
→ check:phase-4
→ check:phase-5
→ check:phase-6
→ check:phase-7
→ check:phase-8
→ check:phase-9
→ check:interlude-disney-legends
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
pnpm check:pixie
pnpm check:symbols
pnpm check:metadata
pnpm check:focale
pnpm check:plans
pnpm check:plan-matter
pnpm check:guidebook
pnpm check:identites
pnpm check:oeuvres
pnpm check:oeuvres-sources
pnpm check:chansons
pnpm check:donnees-economiques
pnpm check:phase-4
pnpm check:phase-5
pnpm check:phase-6
pnpm check:phase-7
pnpm check:phase-8
pnpm check:phase-9
pnpm check:interlude-disney-legends
pnpm check:personnages
pnpm check:relations
pnpm check:recompenses
pnpm build
```

`check:symbols` parcourt les six registres, valide leurs collections,
leurs définitions et leurs chemins, vérifie que chaque image publique est
enregistrée et que chaque symbole possède bien son fichier. Il conserve
également le contrôle métier qui impose à chaque bloc éditorial un type présent
dans la bonne collection. `check:plans` valide la grammaire des cinq Plans,
leurs Angles et leurs Objectifs. `check:focale` ferme le noyau aux six
primitives éprouvées et vérifie leur indépendance vis-à-vis des types métier.
`check:plan-matter` éprouve les cinq familles
de matière dérivée, les huit Bobines témoins et les projections propres aux
cinq prototypes. Les contrôles suivants vérifient les métadonnées des
catalogues, le modèle des Œuvres et sa fixture de long métrage, les Œuvres
sources privées, les Chansons et les droits média, les mesures économiques et
leur frontière de publication. `check:phase-4` confirme désormais les 83
Archives et routes des cinq familles, protège les domaines encore internes et
conserve le manifeste de rétroapplication. `check:phase-5` vérifie désormais
ses 69 verdicts finaux : 30 migrations, 20 préservations et 19 raccords
explicitement transmis à la production de _Pinocchio_. Il protège également
les 83 routes canoniques et les 45 routes historiques du périmètre migré.
`check:phase-6` ferme 26 verdicts de production, contrôle 109 Archives et
routes canoniques, 29 sources promues, les frontières internes et les trois
regards territoriaux de _Pinocchio_.
`check:phase-7` protège ses huit chapitres, ses 29 unités de preuve et leur
ordre documentaire. `check:phase-8` conserve les 31 contributions, les cinq
angles du Générique vivant, son contrechamp et la frontière entre Plan, Pixie
et Focale. `check:phase-9` rejoue enfin la photographie complète de l’Acte VI
et ses reports non bloquants.
`check:interlude-disney-legends` protège les 29 attributions Disney Legends,
leurs années, leurs bénéficiaires uniques et leurs notices officielles D23.
Les derniers contrôles couvrent les
variantes de noms et les formes des
Personnages, la cohérence des références et des relations, puis les
récompenses, leurs bénéficiaires, leurs sources et leurs trophées illustrés.

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

Le [Guidebook pour agents IA](./docs/agents/README.md) transmet l’esprit du
projet, son architecture, sa direction artistique, le système Pixie, les
registres de symboles, la grammaire des Plans et le premier noyau Focale. Les
documents de [`docs/studio`](./docs/studio/) complètent ce clap par
l’onboarding et le registre d’équipe de Guru Éditions.

La chronologie des Actes, des Entractes, des Interludes et de leurs génériques
est consignée dans le [`Journal de projection`](./CHANGELOG.md).

Le développement est notamment rythmé par des **Actes**, des **Entractes** et
de courts **Interludes**.

```text
🎞️ Acte
→ cycle de construction et d’expérimentation

🍿 Entracte
→ période de relecture, correction et finition

🎠 Interlude
→ petit divertissement de transition à l’intérieur de la période courante
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
📡 Transmission
📼 Bobine
🏢 Production
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
