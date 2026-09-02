# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> **Chapitre 02 — Les coulisses de la machine à raconter**<br>
> Écrit pour l’IA par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

Le Codex ne possède pas une grosse base de données au milieu du plateau. Il
assemble plusieurs sources de vérité volontairement séparées : des catalogues
pour annoncer les entrées publiées, des fiches pour conserver leur matière
documentaire, des registres pour partager des vocabulaires communs et des
fonctions pour calculer les chemins de lecture qui ne doivent pas être stockés
deux fois.

Ce chapitre explique où vit chaque responsabilité, comment une information
traverse le dépôt et quel fichier modifier sans provoquer un raccord invisible
ailleurs.

---

## Transmission prioritaire

Si tu arrives avec peu de mémoire disponible, retiens ces huit règles :

1. **Le catalogue publie l’entrée ; la fiche la documente.** Les deux portent
   le même `slug`, mais ne jouent pas le même rôle.
2. **Une donnée s’écrit dans sa source de vérité.** Une page, une Card ou un
   Plan ne doit pas devenir un second registre documentaire.
3. **Les relations inverses et temporelles se calculent.** Ne recopie pas dans
   une fiche ce que le Codex peut déduire honnêtement d’une relation déjà
   déclarée ou d’une date documentée.
4. **Une source est enregistrée une fois puis référencée par identifiant.** Ses
   métadonnées ne se répètent jamais dans les fiches.
5. **Une référence résolue doit correspondre exactement au catalogue.** Son
   type, son `slug` et son nom voyagent ensemble.
6. **Les composants projettent la matière ; ils ne la fabriquent pas.** La
   connaissance métier reste dans `src/data`, `src/registry`, `src/lib` et
   `src/types` selon sa nature.
7. **Les Plans dérivent des lectures sans réécrire les Archives.** Une Bobine
   témoin reste une fixture d’essai, jamais une donnée publiée.
8. **Un contrat interne n’est pas encore une famille publique.** Œuvres
   sources, Musiques et enquêtes économiques peuvent être typées et vérifiées
   sans posséder de catalogue, de route ni de place dans `CodexFamily`. Les
   Chansons ont franchi cette frontière au Train 5B : leur contrat spécialisé
   alimente désormais une cinquième famille publique.

---

## Carte d’identité de l’architecture

| Repère                 | Réponse actuelle                                                |
| ---------------------- | --------------------------------------------------------------- |
| Modèle de contenu      | Fichiers JSON versionnés                                        |
| Familles publiées      | Personnages, Créateurs, Œuvres, Époques et Chansons             |
| Routage                | Next.js App Router, pages statiques par `slug`                  |
| Contrats métier        | Types partagés dans [`src/types`](../../src/types/)             |
| Archives               | [`src/data`](../../src/data/)                                   |
| Vocabulaires partagés  | [`src/registry`](../../src/registry/)                           |
| Calculs et projections | [`src/lib`](../../src/lib/)                                     |
| Montage du Codex       | [`src/components/codex`](../../src/components/codex/)           |
| Primitives visuelles   | [`src/components/ui`](../../src/components/ui/)                 |
| Garde-fous             | [`scripts`](../../scripts/) et les commandes `pnpm check:*`     |
| Laboratoire            | Atelier et fixtures, toujours séparés des données de production |

Le mot **registre** ne signifie pas automatiquement « base documentaire ».
Un registre peut porter une taxonomie métier, un vocabulaire de Plan, une
palette ou une collection de symboles. Il faut donc regarder sa responsabilité
avant de décider qu’il est la source de vérité d’une information.

---

## Le modèle mental

```text
                         ARCHIVES VERSIONNÉES

  catalogues ────────────────┐
  identité légère            │
  publication et indexation  ├──→ routes d’index ──→ Liste / Cards
                             │
  fiches ────────────────────┤
  matière détaillée          │
  dates, récits, références  ├──→ route de fiche ──→ sections du Codex
                             │
  sources ───────────────────┤
  bibliographie centrale     │
                             │
  récompenses ───────────────┤
  distinctions transversales │
                             │
  registres ─────────────────┘
  métadonnées et vocabulaires

            ↓ résolution, calculs inverses et dérivations

      relations · époques · recherche · matière des Plans

            ↓ composition, jamais création d’un nouveau fait

        composants Codex ──→ primitives Pixie ──→ interface
```

Une route assemble donc plusieurs couches. Elle ne possède pas les données
qu’elle affiche ; elle orchestre leur résolution et choisit la bonne
projection.

---

## Le plan des coulisses

### `src/app` — les portes publiques et privées

Les routes publiques des cinq familles se trouvent dans :

```text
src/app/personnages/
src/app/contributeurs/
src/app/oeuvres/
src/app/epoques/
src/app/chansons/
```

Chaque dossier possède une page d’index et une route `[slug]` pour les fiches.
Les pages décident quelles données réunir, quels calculs appeler et dans quel
ordre monter les composants communs.

[`src/app/atelier`](../../src/app/atelier/) est un espace privé de conception.
Il documente les composants et les Plans, mais ne devient jamais une source de
vérité publique par simple proximité avec le Codex.

### `src/data` — les Archives

[`src/data`](../../src/data/) conserve la matière documentaire :

```text
catalogues/      identités légères des entrées publiées
personnages/     fiches détaillées des personnages
contributeurs/   fiches détaillées des créateurs
oeuvres/         fiches détaillées des œuvres
epoques/         fiches détaillées des périodes
chansons/        fiches détaillées des chansons
sources/         registre bibliographique central
recompenses/     registre transversal des distinctions
relations.ts     relations inverses calculées depuis les fiches
```

Les fichiers `index.ts` chargent les JSON, exposent les collections typées et
fournissent les résolveurs `get…BySlug` ou `get…ById`.

### `src/registry` — les vocabulaires fermés

[`src/registry`](../../src/registry/) centralise les ensembles qui doivent être
nommés et réutilisés de façon cohérente :

- `metadata` définit les catégories, collections, formats et autres valeurs
  autorisées par les métadonnées ;
- `plans` définit la grammaire neutre des Plans, de leurs Angles et de leurs
  Objectifs ;
- `colors` et `symbols` appartiennent au système de projection visuelle et
  seront détaillés dans les chapitres suivants.

Quand une valeur doit être choisie dans un vocabulaire fini, vérifie le
registre avant d’ajouter une chaîne libre dans un JSON.

### `src/types` — les contrats partagés

[`src/types`](../../src/types/) décrit les formes globales et métier : entrée
de catalogue, fiche, date historique, référence, source, récompense, famille,
matière d’un Plan ou résultat de recherche.

Un type propre à un composant reste près de ce composant. Un type utilisé par
plusieurs familles, registres ou couches appartient ici. La convention
complète est impérative dans [`AGENTS.md`](../../AGENTS.md).

### `src/lib` — les calculs sans propriété éditoriale

[`src/lib`](../../src/lib/) transforme une matière existante sans devenir sa
propriétaire : formatage des dates, résolution de la vue d’index, recherche,
collecte des sources et dérivations des Plans.

Une fonction de cette couche peut dire « cette œuvre tombe dans cette époque
selon les bornes publiées ». Elle ne peut pas décider que l’œuvre appartient à
une période parce que ce raccord serait narrativement séduisant.

### `src/components/codex` — le montage documentaire

[`src/components/codex`](../../src/components/codex/) compose les structures
propres au produit : index, en-têtes de fiches, repères, chapitres, relations,
récompenses, détails d’œuvre, citations et bibliographie.

Le montage est réparti en quatre territoires explicites :

```text
src/components/codex/
├── CodexIndex/
│   ├── CodexIndexPage/
│   ├── CodexIndexListItem/
│   ├── CodexIndexViewSwitch/
│   ├── CodexIndexPersonnageCard/
│   ├── CodexIndexCreateurCard/
│   ├── CodexIndexOeuvreCard/
│   ├── CodexIndexEpoqueCard/
│   └── CodexIndexChansonCard/
├── CodexFiche/
│   ├── CodexFiche/
│   ├── CodexFicheHeader/
│   ├── CodexFicheReperes/
│   ├── CodexFicheSection/
│   └── sections métier spécialisées
├── CodexLayout/
│   └── CodexLayoutFooter/
└── CodexCommon/
    └── CodexCommonReferenceLink/
```

Les Cards restent dans `CodexIndex` parce qu’elles représentent une entrée au
sein d’une collection ; la Recherche peut les réutiliser sans devenir leur
propriétaire. Chaque composant commence par le nom exact de son territoire.
Les territoires n’exposent pas de barrel global : un import pointe directement
vers le dossier canonique du composant.

`CodexIndex` et `CodexFiche` peuvent utiliser `CodexCommon`, `CodexLayout` et
les primitives Pixie, mais ne se connaissent jamais directement.
`CodexCommon` ne dépend d’aucun montage de page. Cette direction conserve une
frontière lisible entre l’affichage des collections et le récit détaillé d’une
entrée.

Ces composants connaissent la manière de **présenter** une donnée du Codex.
Ils ne doivent pas contenir une liste cachée de créateurs, une date canonique
ou une nouvelle relation métier.

### `src/components/ui` — la projection Pixie

[`src/components/ui`](../../src/components/ui/) contient les primitives
visuelles réutilisables. Une `PixieCard` connaît ses variantes, sa surface et
ses états ; elle ne connaît pas Blanche-Neige, un type de récompense ou la
chronologie du studio.

---

## Les cinq familles et leurs trois dialectes

Une même famille n’utilise pas toujours le même mot dans les routes, les
références et le thème UI. Cette différence est historique et intentionnelle ;
ne la « corrige » pas localement.

| Famille affichée | Route et dossier de données | `ReferenceCodex.type` | `CodexFamily` |
| ---------------- | --------------------------- | --------------------- | ------------- |
| Personnages      | `personnages`               | `personnage`          | `personnages` |
| Créateurs        | `contributeurs`             | `contributeur`        | `createurs`   |
| Œuvres           | `oeuvres`                   | `oeuvre`              | `oeuvres`     |
| Époques          | `epoques`                   | `epoque`              | `epoques`     |
| Chansons         | `chansons`                  | `chanson`             | `chansons`    |

`CodexFamily` pilote notamment la couleur et le symbole d’une famille dans les
composants communs. Le type singulier d’une référence permet de construire sa
route. Le nom du dossier indique où vivent ses fichiers. Mélanger ces trois
dialectes produit des liens, des thèmes ou des résolutions incorrects.

---

## Catalogue et fiche : les deux moitiés d’une entrée

### Le catalogue annonce

Les cinq JSON de [`src/data/catalogues`](../../src/data/catalogues/)
contiennent les informations nécessaires pour identifier, lister, rechercher
et présenter rapidement une entrée :

```text
slug
nom
sousTitre
type
métadonnées légères éventuelles
```

Le catalogue alimente :

- les pages d’index ;
- la génération des routes statiques ;
- les résultats de recherche ;
- la résolution des noms et des liens ;
- les sujets publiés disponibles pour les Plans lorsque leur famille appartient
  au périmètre volontairement limité de cette projection.

Une entrée absente du catalogue n’est pas publiée, même si un fichier de fiche
existe quelque part dans `src/data`.

### La fiche documente

Les dossiers de familles contiennent un JSON détaillé par entrée. Une fiche
porte au minimum son `slug`, son `type`, son introduction, ses sources et sa
matière propre : création et première apparition d’un personnage, activité
d’un créateur, production d’une œuvre, bornes d’une époque ou vie publique
d’une chanson.

Les fichiers d’index de chaque famille importent explicitement ces JSON dans
une collection `fiches…` et exposent un résolveur par `slug`.

```text
catalogue/oeuvres.json
        │
        ├── identité et publication
        │
oeuvres/snow-white-and-the-seven-dwarfs.json
        │
        └── matière documentaire détaillée

même slug ──→ une seule fiche publique cohérente
```

Sur une route de détail, l’entrée de catalogue **et** sa fiche doivent être
résolues. Si l’une manque, la page appelle `notFound()`. Les paramètres
statiques viennent du catalogue et `dynamicParams` est désactivé : le
catalogue demeure donc la porte d’entrée officielle.

### L’identité voyage sans déplacer la route

Le catalogue conserve le nom ou titre principal qui publie l’entrée. La fiche
possède les formes documentées : originale, localisée, territoriale, ancienne
ou alternative, avec leur langue, leur territoire éventuel et leurs sources.

Pour les Chansons, le catalogue porte ainsi le titre français destiné aux
surfaces publiques, tandis que la fiche conserve le titre original dans son
identité documentée. Le projecteur commun écarte une répétition lorsque les
deux formes sont identiques : _Heigh-Ho_ ne s’affiche donc pas deux fois, alors
que _Siffler en travaillant_ conserve _Whistle While You Work_ en sous-titre.

[`resoudreIdentiteCodex`](../../src/lib/identites/server/resoudre-identites.ts)
joint ces deux moitiés côté serveur et produit une
`ProjectionIdentiteCodex`. Cette projection distingue :

- la forme principale actuellement choisie pour l’interface française ;
- la forme originale lorsqu’elle est documentée ;
- les autres identités documentées ;
- le slug canonique, qui ne change pas avec le libellé ;
- les éventuels aliases de navigation, déclarés séparément et jamais déduits
  d’un nom.

Les routes restent responsables de la résolution. Cards, listes et en-têtes
reçoivent une identité déjà préparée ; aucun composant ne relit directement
les Archives pour recomposer un titre.

```text
catalogue + fiche
       │
       └── résolution serveur ──→ ProjectionIdentiteCodex
                                      ├── recherche identitaire
                                      ├── CodexCommonIdentite
                                      └── route canonique inchangée
```

Langue et territoire sont deux données différentes. Leurs codes et libellés
vivent dans `src/registry/identites`. Un drapeau peut devenir un repère
graphique complémentaire, jamais la valeur métier ni le seul nom accessible.

### La recherche identitaire reste une projection serveur

[`src/lib/recherche.ts`](../../src/lib/recherche.ts) joint désormais les cinq
catalogues à leurs fiches par le résolveur commun. Son index réunit l’identité
principale, les formes documentées, le sous-titre et les métadonnées légères
déjà prévues pour la recherche.

Une forme alternative enrichit l’entrée canonique existante : elle ne crée ni
nouveau résultat ni nouvelle URL. Les résultats sont dédupliqués par famille
et slug. Paragraphes éditoriaux, relations et notices de sources restent hors
de l’index ; les y faire entrer demanderait toujours un chantier explicite de
recherche plein texte.

---

## Le montage commun des index

Les cinq routes d’index partagent
[`CodexIndexPage`](../../src/components/codex/CodexIndex/CodexIndexPage/). Le composant
reçoit une famille, une identité éditoriale, un compteur, les commandes de vue
et la collection à projeter. Il règle le fond de scène, le symbole, la couleur,
la largeur, le rythme et le footer.

Chaque route garde les responsabilités métier :

1. lire son catalogue ;
2. résoudre `?view=` avec `resolveCodexIndexView` ;
3. choisir la liste ou la grille ;
4. réunir la fiche et les données dérivées nécessaires à chaque Card ;
5. rendre `CodexIndexListItem` ou la Card spécialisée.

```text
catalogue de famille
        │
        ├── vue Liste ──→ CodexIndexListItem
        │
        └── vue Cards ──→ fiche + dérivations ──→ Card métier
                                      │
                                      └── grille Pixie
```

`CodexIndexPage` ne doit pas recevoir de branches spéciales pour une œuvre ou
une époque particulière. Une singularité appartient à la route, à la Card
métier ou à la donnée qui la justifie.

---

## Le montage commun des fiches

Une fiche publique suit généralement cette séquence :

```text
CodexFiche
├── CodexFicheHeader
├── CodexFicheReperes
├── sections métier spécialisées éventuelles
├── CodexFicheBlocsEditoriaux
├── CodexFicheRecompenses éventuelles
├── CodexFicheRelations éventuelles
└── CodexFicheSources
```

- `CodexFiche` porte le thème de famille et le footer ;
- `CodexFicheHeader` monte l’identité, l’introduction et les badges ;
- `CodexFicheReperes` projette les faits synthétiques dans une liste de
  description ;
- `CodexFicheSection` fournit le rythme partagé des chapitres ;
- `CodexFicheBlocsEditoriaux` transforme les blocs narratifs en chapitres sourcés ;
- les composants spécialisés conservent leurs structures métier ;
- `CodexFicheSources` ferme la fiche avec la bibliographie résolue.

La route reste le **chef de montage**. Elle décide de l’ordre des sections et
réunit les données, tandis que les composants garantissent une présentation
commune. Ne déplace pas toute l’orchestration dans un composant générique au
premier cas particulier.

### Les Œuvres montrent la règle d’extension

[`CodexFicheOeuvreDetails`](../../src/components/codex/CodexFiche/CodexFicheOeuvreDetails/) projette
seulement les groupes structurés présents dans la fiche : titres alternatifs,
durées, production, sorties, données économiques, filiations ou générique
regroupé.

Les champs restent optionnels. Un court métrage n’a pas à simuler la densité
d’un long métrage pour satisfaire le composant. Le modèle accepte une richesse
progressive et l’interface rend uniquement ce que les Archives établissent.

---

## Sources : une bibliographie, plusieurs points de preuve

### La source de vérité

[`src/data/sources/sources.json`](../../src/data/sources/sources.json) contient
une entrée unique par document : identifiant, titre, auteur, éditeur, URL et
dates éventuelles. Les fiches et les registres transversaux conservent
seulement des identifiants de sources.

```text
source centrale
id: "afi-snow-white"
        ↑
        ├── fiche.sources
        ├── blocEditorial.sources
        ├── sortie.sources
        ├── donnéeEconomique.sources
        └── récompense.sources
```

### La collecte d’une fiche

[`getFicheSourceIds`](../../src/lib/source.ts) part des sources générales de la
fiche, parcourt récursivement ses structures, récupère chaque tableau nommé
`sources`, puis déduplique les identifiants. `getSourcesByIds` les résout
ensuite dans le registre central.

Cette collecte permet à une citation locale et à la bibliographie finale de
partager la même numérotation. `CodexFicheSourceCitations` pointe vers l’ancre créée
par `CodexFicheSources` au bas de la fiche.

Attention : une donnée transversale résolue **en dehors** de la fiche n’entre
pas automatiquement dans ce parcours. Les pages Œuvres et Créateurs ajoutent
par exemple les sources des récompenses avant de résoudre et de dédupliquer la
bibliographie complète.

### Règle d’ajout

1. enregistrer le document dans `sources.json` ;
2. choisir un identifiant stable et unique ;
3. rattacher cet identifiant au fait précis qu’il documente ;
4. conserver aussi les sources générales exigées par le modèle de fiche ;
5. vérifier que la route réunit les sources transversales éventuelles ;
6. laisser les garde-fous signaler tout identifiant inconnu ou dupliqué.

Ne copie jamais le titre et l’URL d’une source dans une fiche pour éviter de
modifier le registre. Ce raccourci crée immédiatement deux bibliographies.

---

## Relations : déclarer une fois, lire dans plusieurs directions

### La référence commune

[`ReferenceCodex`](../../src/types/reference.ts) accepte deux états :

- une référence résolue avec `nom`, `type` et `slug` ;
- une mention non résolue avec son `nom` seulement.

Une référence résolue doit utiliser le nom exact du catalogue. Le vérificateur
des relations contrôle le type, l’existence du `slug`, la concordance du nom
et l’absence de doublons. Une mention non résolue reste visible comme texte,
sans faux lien créé par l’interface.

```ts
// Référence publiée
{
    "nom": "Walt Disney",
    "type": "contributeur",
    "slug": "walt-disney"
}

// Mention conservée sans inventer de fiche
{
    "nom": "Schneewittchen"
}
```

### Relations directes

Une relation directe appartient à la donnée qui l’établit naturellement :

- les créateurs dans la création d’un personnage ;
- l’œuvre de première apparition d’un personnage ;
- les contributions et personnages dans une œuvre ;
- les filiations qualifiées entre œuvres ;
- les bénéficiaires et l’œuvre concernée dans une récompense.

### Relations inverses et calculées

[`src/data/relations.ts`](../../src/data/relations.ts) lit les fiches pour
retrouver, par exemple, les personnages créés par un contributeur ou les
œuvres auxquelles il participe. Le lien inverse n’est pas recopié dans sa
fiche.

[`src/data/epoques/relations.ts`](../../src/data/epoques/relations.ts) rattache
les dates et périodes aux Époques. Les bornes de fin des Époques sont
exclusives : une période `1923 → 1937` couvre 1923 à 1936 inclus.

[`src/data/recompenses/relations.ts`](../../src/data/recompenses/relations.ts)
filtre le registre des distinctions par œuvre, bénéficiaire ou époque.

Avant d’ajouter une relation, pose cette question :

> Est-ce un fait directement documenté, ou une autre lecture fiable d’un fait
> déjà stocké ?

Dans le premier cas, enrichis la source de vérité. Dans le second, ajoute une
fonction de lecture testable et ne duplique pas le fait.

---

## Récompenses et métadonnées : des Archives transversales

Les récompenses ne sont pas enfouies dans chaque fiche. Le registre
[`src/data/recompenses`](../../src/data/recompenses/) porte les institutions,
éditions, dates, catégories ou motifs, trophées, bénéficiaires, œuvres et
sources. Les routes les récupèrent par relation.

Les métadonnées suivent un autre modèle : les définitions vivent dans
[`src/registry/metadata`](../../src/registry/metadata/) et leurs types sont
dérivés du registre. Ajouter un `slug` à la main dans un catalogue sans sa
définition produit une valeur hors vocabulaire et doit échouer aux contrôles.

```text
registre de métadonnées
        ↓ type dérivé
catalogue JSON
        ↓ sélection valide
PixieBadge et recherche
```

Un registre transversal évite les copies, mais il ne dispense pas de rattacher
explicitement chaque occurrence à la bonne entrée du Codex.

---

## Les contrats documentaires spécialisés et leur frontière de publication

La Phase 4 de l’Acte VI a ouvert plusieurs domaines internes afin de décrire la
vie publique d’une œuvre sans commencer prématurément la production éditoriale
de _Pinocchio_. Leurs types vivent dans [`src/types`](../../src/types/), leurs
fonctions de résolution ou de projection dans [`src/lib`](../../src/lib/) et
leurs cas d’essai dans [`scripts/fixtures`](../../scripts/fixtures/).

| Domaine                  | Source de vérité actuelle                      | Statut de projection                                               |
| ------------------------ | ---------------------------------------------- | ------------------------------------------------------------------ |
| Circulation et réception | `circulation-oeuvre.ts` puis les fiches Œuvres | Contrat utilisable progressivement par les Œuvres publiées.        |
| Œuvres sources           | `oeuvre-source.ts` et registre interne         | Résoluble dans les Plans, sans catalogue ni route publique.        |
| Chansons                 | `chanson.ts`, catalogue et fiches publiques    | Cinquième famille publique en mode `metadata-first`.               |
| Musiques                 | `musique.ts` et registre interne               | Domaine frère réservé à l’Acte VII.                                |
| Droits média             | `projection-media.ts` et dossiers privés       | Seuls le statut et la matière autorisée franchissent la frontière. |
| Données économiques      | `donnee-economique.ts` et dossiers d’enquête   | Publication conditionnée par la complétude de la mesure.           |

Ces contrats réutilisent les dates, identités, territoires, références et
sources communes, mais ils restent spécialisés. Une sortie, une interprétation
et un chiffre peuvent partager une provenance sans devenir trois variantes
d’un même objet universel.

### Les bobines privées ne publient rien

Les fixtures de circulation, Collodi, Chansons et données économiques servent
à vérifier les contrats et leurs contre-exemples. Elles restent privées et ne
se confondent jamais avec les neuf fiches Chansons publiées sous `src/data`.

Le contrôle agrégé [`verifier-phase-4.mjs`](../../scripts/verifier-phase-4.mjs)
surveille ensemble :

- les 83 fiches et leurs 83 routes canoniques ;
- les cinq familles publiques, dont les quatre Chansons du Train 5B ;
- l’absence de catalogue et de route pour les domaines encore internes ;
- le raccord entre les quatre bobines de Phase 4 ;
- les 69 entrées du manifeste Phase 5, dont quatre portent un verdict de
  migration ;
- le branchement des vérificateurs spécialisés dans les contrôles locaux et
  CI.

Le contrôle [`verifier-phase-5.mjs`](../../scripts/verifier-phase-5.mjs)
prolonge cette photographie par le journal d’exécution complet. Il protège les
69 verdicts de rétroapplication — 30 migrations, 20 préservations et 19
raccords reportés avec leur condition de reprise — ainsi que les 83 routes
canoniques et les 45 routes historiques du périmètre migré. Un report n’est
donc ni une Archive partielle ni une dette silencieuse : il nomme la Phase qui
possède la prochaine écriture.

Le contrôle [`verifier-phase-6.mjs`](../../scripts/verifier-phase-6.mjs)
ferme la photographie suivante : **109 Archives et 109 routes canoniques**,
dont 24 Œuvres, 33 Personnages, 41 Créateurs, 9 Chansons et 2 Époques. Il
conserve les 45 routes historiques, 16 Récompenses, 351 relations, 26 verdicts
de production et l’absence de route pour l’Œuvre source de Collodi, Cléo,
Evelyn Venable ou les deux Oscars.

Vingt-neuf des trente sources candidates encore privées à l’ouverture ont
rejoint le registre central uniquement parce qu’une Archive les cite. La
notice d’exposition `us-wdfm-art-of-pinocchio` reste privée jusqu’à ce qu’un
usage produit et ses droits de reproduction soient établis.

Le Train 6H ferme cette photographie avec les contrôles spécialisés, la
répétition générale, la revue des surfaces publiques, le rapport local et la
transmission vers la Phase 7. Il ne transforme ni le Guidebook ni le manifeste
en nouvelle source de vérité : tous deux décrivent les invariants que le code
et les Archives continuent de posséder.

L’Interlude précédant la Phase 7 complète ensuite le registre transversal avec
les **29 Disney Legends** déjà publiés dans l’index des Créateurs. Chaque
distinction conserve son année d’intronisation, la statuette Disney Legends,
un bénéficiaire résolu et sa notice officielle D23. Le registre atteint ainsi
45 récompenses sans modifier la photographie fermée de la Phase 6.

### Pinocchio éprouve la vie publique d’une Œuvre

La fiche de _Pinocchio_ emploie maintenant les contrats spécialisés au lieu de
les laisser dans les seules Bobines : quatre événements de sortie, quatre
versions, trois exploitations et six réceptions conservent séparément temps,
territoire, provenance et réserve. Les regards américain, français et italien
ne sont jamais fusionnés en une réception moyenne.

Sa mesure économique publique garde son unité, son territoire français, sa
période cumulée 1946–2010, sa méthode CNC et le statut
`comparable-sous-reserve`. Les résultats financiers initiaux divergents restent
dans l’enquête privée. La présentation peut donc afficher un chiffre sans
faire disparaître les conditions qui lui donnent son sens.

### Les chiffres possèdent une frontière supplémentaire

Une donnée économique structurée conserve mesure, valeur ou fourchette
originale, unité, temps, territoire, base, méthode, certitude, comparabilité,
finalité et sources. Le dossier d’enquête privé peut en plus porter des lacunes,
un verdict et une note interne ; sa projection publique recopie explicitement
la seule déclaration complète autorisée.

La forme économique historique demeure lisible pour Blanche-Neige. Le verdict
R3 de la Phase 5 la conserve volontairement parce que les quatre déclarations
ne franchissent pas encore toutes le contrat structuré. Elle ne pourra être
retirée qu’après qualification de ces mesures et migration de tous leurs
consommateurs ; fermer un manifeste ne transforme pas une donnée incomplète en
preuve publiable.

La recette complète est conservée dans
[`docs/studio/production/acte-vi/phase-4/migration.md`](../studio/production/acte-vi/phase-4/migration.md),
hors de la bibliothèque transmissible du Guidebook.

---

## Les Plans : une couche de lecture dérivée

Les Plans observent les Archives ; ils ne les prolongent pas silencieusement.

[`codexPlanArchives`](../../src/lib/plans/archives.ts) rassemble les quatre
catalogues, leurs fiches, les récompenses et les sources dans une vue de
travail typée. Les fonctions de [`src/lib/plans`](../../src/lib/plans/)
dérivent ensuite des nœuds, relations, événements, crédits et preuves avec une
provenance explicite.

```text
Archives publiées ──→ codexPlanArchives ──→ dérivations pures
                                                │
                                                ├── Travelling documentaire
                                                ├── Plan d’ensemble
                                                ├── Montage du temps
                                                ├── Générique vivant
                                                └── Table lumineuse

Bobines témoins ────────────────────────────────┘
   matière d’essai marquée, jamais fusionnée aux Archives
```

La grammaire commune vit dans
[`src/registry/plans`](../../src/registry/plans/) et les contrats partagés dans
[`src/types/codex-plans.ts`](../../src/types/codex-plans.ts). Les prototypes
interactifs reçoivent des modèles déjà calculés côté serveur.

Une observation, un verdict ou une incertitude révélée par un prototype reste
dans le dossier expérimental tant qu’un chantier éditorial distinct ne vient
pas modifier les Archives avec des sources et une validation appropriées.

---

## Le Guidebook : analyser une fois, projeter sans privilège

Le Guidebook possède son propre domaine neutre dans
[`src/types/guidebook.ts`](../../src/types/guidebook.ts). Il ne confond ni la
matière documentaire avec un composant Pixie, ni un fichier du dépôt avec une
route publique.

Ses deux adaptateurs suivent la même frontière stricte :

```text
Bibliothèque locale                    Bibliothèque Notion
manifeste serveur fermé                manifeste serveur + racine autorisée
→ fichier réel sous docs/agents/       → page dans l’arbre déclaré
→ chaîne Markdown                      → ascendance réelle vérifiée
                                       → Markdown Notion normalisé
                    │                  │
                    └──────┬───────────┘
                           ↓
                  analyse Markdown unique
                  → blocs + ancres + sommaire + liens résolus
                  → document Guidebook sérialisable
                  → projection Pixie
```

[`analyze-markdown.ts`](../../src/lib/guidebook/analyze-markdown.ts) parcourt
un seul arbre `mdast`, produit tous les blocs de lecture et dérive le sommaire
des mêmes titres. Il prend en charge les titres, paragraphes, emphases,
citations, listes imbriquées et listes de tâches, code, compositions ASCII,
tableaux GFM et séparateurs. Un nœud inconnu devient `unsupported` ; il n’est
jamais injecté comme HTML brut.

L’analyseur reste pur : il ne lit aucun fichier et ne connaît aucun secret.
L’adaptateur serveur
[`load-local-document.ts`](../../src/lib/guidebook/server/load-local-document.ts)
lui remet une chaîne déjà autorisée et un résolveur de liens. Ce dernier ne
rend navigables que :

- une ancre réellement produite par le document courant ;
- un document local explicitement inscrit au manifeste ;
- une destination externe en `http`, `https` ou `mailto`.

Les chemins privés, les fichiers de code hors bibliothèque et les protocoles
inconnus restent lisibles comme texte, mais perdent leur `href`. Aucun chemin
réel du dépôt ni identifiant Notion ne rejoint le contrat transmis à
l’interface.

La passerelle Notion emploie l’API officielle directement côté serveur. Son
manifeste fermé connaît la racine **Le Disneyiste**, les identifiants et la
version d’API ;
[`notion-projection.json`](../../src/registry/guidebook/notion-projection.json)
ne contient que les titres publics, slugs, ordres et relations parent-enfant.
Une page devient lisible uniquement si son slug figure dans les deux registres
et si la traversée bornée de ses parents confirme son appartenance réelle à la
racine autorisée. Le Markdown distant passe ensuite par
[`normalize-notion-markdown.ts`](../../src/lib/guidebook/server/normalize-notion-markdown.ts)
avant l’analyse commune : une extension inconnue devient un contrechamp
explicite et place le document en état `partial` au lieu d’injecter du HTML.

Les fixtures de `scripts/fixtures/guidebook/` permettent de vérifier cette
chaîne sans réseau ni secret. La lecture d’une page réelle exige
`NOTION_API_KEY` côté serveur ; son absence produit l’état `deferred` et ne
bloque pas la bibliothèque locale.

La route privée [`src/app/guidebook`](../../src/app/guidebook/) assemble ces
adaptateurs avec `PixieMarkdown` et `PixieDocs`. Next.js demeure propriétaire
des URLs, des métadonnées, des paramètres autorisés et des pages introuvables :

```text
/guidebook                 → premier chapitre local
/guidebook/[slug]          → document déclaré sous docs/agents/
/guidebook/notion          → racine Notion déclarée
/guidebook/notion/[slug]   → page doublement autorisée
```

Le layout et les pages appellent `notFound()` en production, interdisent
l’indexation et ne sont reliés qu’à l’Atelier. Les paramètres dynamiques sont
fermés par l’arborescence de projection. La garde de production précède le
chargement documentaire : une compilation publique ne lit donc aucun fichier
du Guidebook et ne joint jamais Notion.

---

## Choisir la source de vérité

| Je veux modifier…                          | Je commence par…                                                  |
| ------------------------------------------ | ----------------------------------------------------------------- |
| Nom principal, sous-titre ou publication   | `src/data/catalogues/<famille>.json`                              |
| Forme originale, localisée ou alternative  | `src/data/<famille>/<slug>.json`                                  |
| Langue ou territoire fermé                 | `src/registry/identites`                                          |
| Projection commune d’une identité          | `src/lib/identites`                                               |
| Introduction ou fait détaillé              | `src/data/<famille>/<slug>.json`                                  |
| Métadonnées bibliographiques d’un document | `src/data/sources/sources.json`                                   |
| Distinction ou bénéficiaire                | `src/data/recompenses/recompenses.json`                           |
| Catégorie ou libellé de métadonnée         | `src/registry/metadata`                                           |
| Relation inverse                           | `src/data/relations.ts` ou le résolveur spécialisé                |
| Rattachement chronologique calculé         | `src/data/epoques/relations.ts`                                   |
| Forme et contrat d’une donnée partagée     | `src/types`                                                       |
| Circulation ou réception d’une Œuvre       | `src/types/circulation-oeuvre.ts`                                 |
| Œuvre source interne                       | `src/types/oeuvre-source.ts` et `src/lib/oeuvres-sources`         |
| Chanson, Musique ou droits média           | `src/types/chanson.ts`, `musique.ts`, `projection-media.ts`       |
| Mesure économique et sa publication        | `src/types/donnee-economique.ts` et `src/lib/donnees-economiques` |
| Grammaire d’un Plan                        | `src/registry/plans` et `src/types/codex-plans.ts`                |
| Dérivation d’une matière de Plan           | `src/lib/plans`                                                   |
| Montage d’une fiche ou d’un index          | `src/components/codex` et sa route                                |
| Surface, rythme ou interaction générique   | `src/components/ui`                                               |

Si deux lignes semblent possibles, cherche d’abord laquelle **possède le
fait**, puis laquelle se contente de le présenter ou de le calculer.

---

## Procédures de chantier

### Ajouter une entrée publiée

1. identifier sa famille et son type exact ;
2. ajouter son identité légère au catalogue correspondant ;
3. créer sa fiche JSON détaillée avec le même `slug` ;
4. importer la fiche dans le `src/data/<famille>/index.ts` correspondant ;
5. enregistrer d’abord toute nouvelle source dans le registre central ;
6. utiliser des références exactes pour les entrées déjà publiées et des
   mentions non résolues pour les autres ;
7. vérifier les métadonnées dans leur registre ;
8. laisser les composants communs projeter la nouvelle entrée ;
9. lancer les contrôles spécialisés puis la projection complète.

Une nouvelle entrée ne devrait pas nécessiter une nouvelle route. Si elle en
demande une, vérifie que tu n’es pas en train de confondre singularité de
données et singularité d’interface.

### Ajouter un champ documentaire

1. choisir le type métier propriétaire dans `src/types` ;
2. décider si le champ est obligatoire ou progressif ;
3. rattacher ses sources au niveau le plus précis ;
4. l’ajouter d’abord à une vraie fiche représentative ;
5. créer ou étendre son contrôle automatisé ;
6. le projeter dans un composant Codex spécialisé ;
7. vérifier les fiches plus simples, les absences et les valeurs limites.

Le modèle enrichi des Œuvres illustre cette stratégie : les groupes complexes
sont optionnels et n’apparaissent que lorsque la matière existe.

### Ajouter une relation

1. nommer le sens documentaire du lien ;
2. déterminer son propriétaire naturel ;
3. confirmer qu’elle n’est pas déjà calculable ;
4. choisir une référence résolue ou une mention honnêtement non résolue ;
5. joindre les sources si le modèle de la relation les accepte ;
6. tester les lectures directes, inverses et les éventuels cycles ;
7. ne créer un nouveau groupe d’interface que si le lien a une lecture utile.

### Modifier une projection UI

1. conserver les faits hors du composant ;
2. partir du composant Codex partagé le plus proche ;
3. réutiliser uniquement des composants `Pixie…` validés sur les pages
   publiques ;
4. laisser les `PixieDust…` dans l’Atelier ;
5. vérifier les cinq familles avant de généraliser un raccord ;
6. contrôler les deux Lumières, le responsive, le clavier et le zoom.

---

## Les garde-fous

Le contrôle complet reste :

```bash
pnpm check
```

Il formate, relit, analyse et construit le projet, puis exécute les
vérificateurs métier. Pour isoler un chantier documentaire, les commandes les
plus utiles sont :

| Commande                              | Ce qu’elle protège principalement                                   |
| ------------------------------------- | ------------------------------------------------------------------- |
| `pnpm check:metadata`                 | Slugs et définitions des métadonnées                                |
| `pnpm check:oeuvres`                  | Modèle enrichi des œuvres, dates, sources et fixture représentative |
| `pnpm check:personnages`              | Noms alternatifs, formes et sources                                 |
| `pnpm check:relations`                | Catalogues, fiches, références, noms, slugs et sources              |
| `pnpm check:recompenses`              | Distinctions, bénéficiaires, sources et trophées                    |
| `pnpm check:plans`                    | Grammaire commune des cinq Plans                                    |
| `pnpm check:plan-matter`              | Dérivations, Bobines témoins et projections des Plans               |
| `pnpm check:guidebook`                | Manifestes, frontières privées et analyse Markdown du Guidebook     |
| `pnpm check:identites`                | Langues, territoires, jointures et routes canoniques                |
| `pnpm check:oeuvres-sources`          | Registre privé, relations et absence de routes                      |
| `pnpm check:chansons`                 | Chansons, Musiques, droits média et frontière navigateur            |
| `pnpm check:donnees-economiques`      | Mesures, conflits, enquêtes et projection publique                  |
| `pnpm check:phase-4`                  | Corpus, routes, bobines et manifeste de migration                   |
| `pnpm check:phase-5`                  | 69 verdicts de rétroapplication et 45 routes historiques            |
| `pnpm check:phase-6`                  | Noyau Pinocchio, 109 routes, sources et frontières internes         |
| `pnpm check:interlude-disney-legends` | 29 Disney Legends, années, bénéficiaires et sources officielles     |
| `pnpm build`                          | Assemblage statique et contrats TypeScript                          |

Un contrôle vert signifie que les invariants connus tiennent. Il ne prouve
pas qu’une relation est historiquement juste ni qu’une source soutient
réellement la phrase écrite. Cette vérification reste éditoriale.

---

## Anti-patterns à laisser hors champ

- ajouter une fiche sans son entrée de catalogue, ou l’inverse ;
- recopier les métadonnées complètes d’une source dans plusieurs JSON ;
- stocker sur un créateur la liste des œuvres déjà déductible des génériques ;
- inventer un `slug` pour rendre cliquable une mention non publiée ;
- corriger le nom d’une référence sans mettre à jour sa source de vérité ;
- mettre une date, une récompense ou une relation directement dans un
  composant React ;
- faire dépendre une primitive Pixie d’un type métier du Disneyiste ;
- enregistrer le résultat d’un Plan dans les Archives comme s’il s’agissait
  d’un nouveau fait ;
- transformer une Bobine témoin en contenu public ;
- élargir un type global pour résoudre une singularité locale non démontrée ;
- contourner un vérificateur au lieu de comprendre l’invariant qu’il protège.

---

## Checklist avant de rendre la bobine

### Données

- [ ] Le catalogue et la fiche partagent le même `slug` et le bon `type`.
- [ ] Chaque fait nouveau vit dans une source de vérité identifiable.
- [ ] Les valeurs fermées existent dans leur registre.
- [ ] Les sources sont centrales, stables et rattachées au bon niveau.

### Relations

- [ ] Les références publiées possèdent un nom exact, un type et un `slug`.
- [ ] Les mentions non publiées ne fabriquent pas de faux lien.
- [ ] Les relations inverses ne sont pas dupliquées.
- [ ] Les dates respectent leur précision et les bornes exclusives des Époques.

### Projection

- [ ] La route orchestre ; le composant présente ; la primitive Pixie reste
      générique.
- [ ] Les champs optionnels disparaissent proprement lorsqu’ils sont absents.
- [ ] Les citations locales mènent à la bibliographie finale.
- [ ] La recherche et les index reflètent le niveau de donnée réellement
      indexé.

### Vérification

- [ ] Les contrôles spécialisés du chantier sont verts.
- [ ] `pnpm check` est vert avant toute proposition de commit.
- [ ] Le diff ne capture aucun WIP voisin.
- [ ] Un regard humain confirme encore la vérité documentaire et le rendu.

---

## Fichiers à ouvrir en premier

| Besoin                          | Point d’entrée recommandé                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comprendre une entrée légère    | [`src/data/catalogues/index.ts`](../../src/data/catalogues/index.ts)                                                                                       |
| Comprendre une fiche            | [`src/types/fiche.ts`](../../src/types/fiche.ts) puis le type de sa famille                                                                                |
| Résoudre une référence          | [`src/types/reference.ts`](../../src/types/reference.ts) et [`CodexCommonReferenceLink`](../../src/components/codex/CodexCommon/CodexCommonReferenceLink/) |
| Suivre les sources d’une fiche  | [`src/lib/source.ts`](../../src/lib/source.ts)                                                                                                             |
| Comprendre un index             | [`CodexIndexPage`](../../src/components/codex/CodexIndex/CodexIndexPage/) puis sa route                                                                    |
| Comprendre une fiche publique   | la route `[slug]` de sa famille puis [`src/components/codex`](../../src/components/codex/)                                                                 |
| Comprendre une relation dérivée | [`src/data/relations.ts`](../../src/data/relations.ts) et les résolveurs spécialisés                                                                       |
| Comprendre la matière des Plans | [`src/lib/plans/archives.ts`](../../src/lib/plans/archives.ts) puis [`src/lib/plans`](../../src/lib/plans/)                                                |
| Comprendre le Guidebook         | [`src/types/guidebook.ts`](../../src/types/guidebook.ts) puis [`src/lib/guidebook`](../../src/lib/guidebook/)                                              |
| Comprendre les garde-fous       | [`package.json`](../../package.json) et [`scripts`](../../scripts/)                                                                                        |

Ce chapitre décrit les responsabilités. Les règles impératives demeurent dans
[`AGENTS.md`](../../AGENTS.md), et l’état fonctionnel du projet dans
[`README.md`](../../README.md).

---

## Dernière transmission

Le Codex tient debout parce que chaque couche accepte de ne pas tout savoir.
Le catalogue annonce. La fiche documente. Le registre nomme. La fonction
calcule. Le composant compose. La Projection éclaire.

Quand ces responsabilités restent nettes, une nouvelle archive peut entrer en
scène sans obliger tout le studio à réécrire son rôle.

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                    UNITÉ D’ARCHITECTURE                     ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  MISSION      Relier la matière sans la dupliquer            ║
║  ACCÈS        CATALOGUES · FICHES · SOURCES · RELATIONS      ║
║  PROTOCOLE    UNE SOURCE DE VÉRITÉ · PLUSIEURS LECTURES      ║
║  STATUT       ● ARCHITECTURE SOUS SURVEILLANCE               ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Architecture documentaire · Bip-boup à responsabilité unique_<br>
[Carte de studio réutilisable](../studio/snippets/carte-de-studio-guru-editions.md)
