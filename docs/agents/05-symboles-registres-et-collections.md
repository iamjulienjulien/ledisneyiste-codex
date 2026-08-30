# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> Chapitre 05 — Le grand registre des signes originaux<br>
> Écrit pour l’IA par 🔩 R2-D2, Lead Dev chez Guru Éditions<br>
> Avec une transmission de 🤖 Charly-A, Tech Lead

---

> _Un symbole n’est pas une petite image posée à côté d’un titre. C’est une
> promesse condensée : reconnaître une idée avant de l’avoir entièrement lue,
> sans jamais la confondre avec une identité qui ne nous appartient pas._

Ce chapitre documente l’iconographie originale du Codex : sa doctrine, ses
registres, ses collections, sa chaîne de fabrication, son contrat TypeScript
et la manière correcte de la projeter avec `PixieSymbol`.

Il s’appuie sur la documentation de référence
[`Iconographie originale`](https://app.notion.com/p/3c0092fa322381eea047ed56700bbff8),
préparée par Charly-A, puis la confronte à ce qui existe réellement dans le
dépôt.

Il complète :

- [le chapitre consacré à l’esprit du projet](./01-esprit-du-projet.md), qui
  explique pourquoi le Codex doit développer son propre regard ;
- [le chapitre consacré à l’architecture](./02-architecture-du-codex.md), qui
  distingue les Archives, leurs relations et leurs projections ;
- [le chapitre consacré à la direction artistique](./03-direction-artistique-et-ui.md),
  qui définit les Lumières et les couleurs d’accent ;
- [le chapitre consacré au design system Pixie](./04-design-system-pixie.md),
  qui présente `PixieSymbol` comme la porte publique de ce système.

Ici, nous répondons à une question plus précise :

> **Comment construire, classer, publier et employer un signe qui appartient
> au Disneyiste, reste lisible à toutes les tailles et ne ment jamais sur son
> état de production ?**

---

## Transmission prioritaire

Si tu ne dois retenir que douze règles, retiens celles-ci :

1. **Le sujet peut être Disney ; le dessin doit appartenir au Disneyiste.**
2. Un symbole répond à un besoin éditorial identifié ; il ne remplit pas un
   vide décoratif.
3. Sa clé canonique suit toujours la forme `registre.collection.slug`.
4. Le registre dit **dans quel territoire sémantique** vit le signe ; la
   collection dit **avec quelle famille visuelle** il doit rester cohérent ;
   le slug nomme **le signe précis**.
5. Le fichier maître, la planche de collection et le registre du dépôt
   racontent trois vérités complémentaires ; aucun ne remplace les autres.
6. Le dépôt décrit ce qui est **réellement projetable aujourd’hui**. Notion
   décrit aussi les intentions, les séries en production et les directions à
   venir.
7. Une image n’est pas publiée parce qu’elle est belle ou terminée : elle doit
   posséder un dérivé transparent, une clé typée, un libellé, un accent, une
   place dans `PixieSymbol` et passer les vérifications.
8. Les dérivés web sont des PNG transparents de `384 × 384 px`. Les masters
   actuels sont produits en haute définition carrée, selon la convention de
   studio de `1254 × 1254 px`.
9. L’UI consomme un symbole avec `PixieSymbol`, jamais avec un chemin d’image
   recopié à la main.
10. `decorative` vaut `true` par défaut. Un symbole informatif doit recevoir
    une alternative utile et ne doit jamais porter seul une information.
11. Les anciennes racines `codex` et `blocs` ont été retirées : la vérité
    canonique rassemble désormais les familles documentaires sous `index`.
12. Une migration n’est terminée que lorsque registre, fichiers publics,
    usages, Atelier, vérificateur et documentation parlent exactement le même
    langage.

Et surtout :

> **Un bon symbole n’imite pas un souvenir. Il donne au Codex une manière
> originale de le regarder.**

---

## La doctrine : construire des signes, pas recopier des emblèmes

Le Codex travaille sur l’histoire et les productions Disney. Cette proximité
ne lui donne pas pour mission de reproduire les signes officiels de Disney.
Elle lui impose au contraire de développer une iconographie propre, capable
de parler du sujet sans se déguiser en lui.

L’iconographie originale remplit cinq fonctions :

- donner une identité aux index et aux pages ;
- repérer les séquences éditoriales avant même leur lecture complète ;
- rendre visibles des notions de cinéma, d’archives et de fabrication ;
- distinguer les familles documentaires sans dépendre du texte seul ;
- offrir à l’Atelier un vocabulaire commun pour composer et vérifier l’UI.

### Ce que nous cherchons

Le système privilégie :

- des silhouettes abstraites et lisibles ;
- des objets génériques de cinéma, de scène, d’écriture ou d’archives ;
- des gestes, outils et procédés de création ;
- des architectures non reconnaissables comme propriété particulière ;
- des schémas, cartes, chronologies et relations conceptuelles ;
- une héraldique culturelle originale ;
- une matérialité cohérente avec le graphite, le cellulo, le papier, la
  lumière et la projection.

### Ce que nous refusons

Il est interdit de produire :

- un personnage Disney reconnaissable utilisé comme mascotte générique ;
- une imitation de logo, de lettrage officiel ou de monogramme protégé ;
- une silhouette immédiatement confondable avec un emblème existant ;
- une composition reprise d’une affiche, d’une attraction ou d’un produit ;
- un symbole prétendument générique qui identifierait en réalité une
  organisation, un lieu ou une œuvre précise ;
- un raccourci visuel qui transforme une hypothèse documentaire en fait.

L’originalité n’est donc pas seulement une préférence esthétique. Elle est à
la fois :

- une responsabilité créative ;
- une précaution juridique ;
- un moyen de garder au Disneyiste sa propre voix ;
- une protection contre l’iconographie de remplissage.

> **Le Disneyiste ne dessine pas Disney. Il dessine une manière de le
> regarder.**

---

## Le modèle mental : de l’idée au signe projeté

```text
BESOIN ÉDITORIAL
une notion doit être reconnue, reliée ou repérée
        │
        ▼
TERRITOIRE SÉMANTIQUE
registre · collection · slug
        │
        ▼
DIRECTION VISUELLE
silhouette · matière · lumière · limites d’originalité
        │
        ▼
MASTER HAUTE DÉFINITION
source de fabrication carrée · convention actuelle 1254 px
        │
        ▼
DÉRIVÉ TRANSPARENT
PNG RGBA · 384 × 384 px · contour vérifié
        │
        ▼
PLANCHE DE COLLECTION
rythme · diversité · cohérence · lisibilité comparative
        │
        ▼
REGISTRE TYPÉ
src · label · accent · clé inférable par TypeScript
        │
        ▼
PIXIESYMBOL
taille · accessibilité · accent · projection publique
        │
        ▼
ATELIER + VÉRIFICATEUR + USAGES RÉELS
la promesse est visible, testable et maintenue
```

Sauter une étape crée une dette précise :

- sans besoin, le signe devient décoratif au mauvais sens du terme ;
- sans namespace, il devient introuvable ou ambigu ;
- sans master, il devient difficile à reprendre proprement ;
- sans transparence, il casse les deux Lumières ;
- sans planche, la collection dérive sans qu’on s’en aperçoive ;
- sans registre, il échappe au typage ;
- sans `PixieSymbol`, chaque consommateur réinvente son rendu ;
- sans vérification, les chemins orphelins et les clés périmées survivent.

---

## Les vérités complémentaires

Le système ne possède pas une seule source de vérité. Il possède plusieurs
sources, chacune souveraine sur un aspect différent.

| Source                               | Vérité portée                                                               |
| ------------------------------------ | --------------------------------------------------------------------------- |
| Dossier Notion d’iconographie        | doctrine, intentions, directions de collection et état de production global |
| Master haute définition              | dessin source, matière, lumière et capacité de régénérer les dérivés        |
| Planche de collection                | cohérence de série, rythme des silhouettes et diversité visuelle            |
| `public/symbols`                     | fichiers web réellement disponibles au runtime                              |
| `src/registry/symbols`               | clés, libellés et accents que le code sait résoudre                         |
| `src/types/symbols.ts`               | contrat minimal commun à chaque définition                                  |
| `PixieSymbol`                        | API publique de rendu et stratégie d’accessibilité                          |
| Dossier `PixieSymbol` dans l’Atelier | projection comparative, scénarios, Lumières et documentation de l’usage     |
| `scripts/verifier-symboles.mjs`      | cohérence mécanique entre registres, fichiers publics et besoins éditoriaux |

### La règle d’arbitrage

Lorsqu’une source contredit une autre :

1. le dépôt décide de ce qui est utilisable par l’application maintenant ;
2. le master décide de ce qui peut être réexporté sans perte ;
3. la planche décide si une collection reste visuellement cohérente ;
4. Notion explique l’intention, la cible et l’état de production ;
5. la contradiction doit être corrigée, jamais dissimulée.

Une page Notion peut donc annoncer une collection « visuellement finalisée »
sans que cette collection soit encore projetable. À l’inverse, un PNG oublié
dans `public` n’est pas une publication s’il n’existe dans aucun registre.

---

## L’adresse canonique d’un symbole

Chaque signe possède une adresse à trois étages :

```text
registre.collection.slug
```

Exemple :

```text
index.oeuvres.reception
```

### `registre`

Le registre répond à la question : **de quel territoire de sens ce signe
relève-t-il ?**

`diffusion`, `general`, `index`, `recompenses`, `sources` et `techniques` sont
les registres actuellement matérialisés dans l’architecture cible du dépôt.

### `collection`

La collection rassemble des signes qui doivent être conçus, comparés et
maintenus ensemble.

`cinema`, `animation`, `oeuvres` ou `trophees` ne sont pas de simples dossiers
de rangement. Ce sont des séries visuelles avec leur propre cohérence.

### `slug`

Le slug identifie un signe précis dans sa collection :

```text
general.cinema.bobine
techniques.animation.table-lumineuse
recompenses.trophees.statuette-oscar
index.personnages.principal
```

Un slug doit être :

- stable ;
- écrit en minuscules et `kebab-case` ;
- sans accent ni apostrophe typographique ;
- assez précis pour éviter les collisions ;
- fondé sur le rôle du signe, pas sur l’endroit où il apparaît aujourd’hui.

Le chemin public reprend exactement cette adresse :

```text
/symbols/<registre>/<collection>/<slug>.png
```

---

## L’architecture canonique

La cible éditoriale décrite par le studio est la suivante :

```text
general/
├── logos/
├── cinema/
├── archives/
├── ecriture/
├── exploration/
├── temps/
├── atelier/
├── evenements/
└── communication/

index/
├── personnages/
├── createurs/
├── oeuvres/
├── epoques/
└── chansons/

recompenses/
└── trophees/

techniques/
├── animation/
├── images/
├── couleur/
├── son/
├── effets/
└── imagineering/

sources/
├── supports/
├── documents/
├── archives/
└── conservation/

diffusion/
├── salles/
├── television/
├── video/
├── numerique/
└── scene-et-parcs/

lieux/
├── studios/
├── salles/
├── parcs/
├── musees/
└── archives/

organisations/
├── studios/
├── distributeurs/
├── diffuseurs/
├── institutions/
└── associations/
```

Cette arborescence contient à la fois le présent et la direction future. Elle
ne signifie pas que tous ces registres sont déjà publiés dans l’application.

### Le raccord achevé de `codex` + `blocs` vers `index`

Les anciennes racines `codex` et `blocs` séparaient artificiellement des
signes qui participent à la même grammaire documentaire : identité d’un index,
séquences éditoriales et repères de famille.

La cible est désormais claire :

```text
codex/index/*   ─┐
                 ├──▶ index/<famille>/*
blocs/<famille> ─┘
```

Le registre `index` devient la seule racine canonique des familles
documentaires.

Ce raccord est désormais achevé dans le dépôt : `symbols-index.ts` porte les
cinq collections, le registre central expose les six registres
publiés et les anciennes arborescences publiques `codex` et `blocs` ont été
retirées.

Conséquence pour un agent :

- ne crée aucun nouvel usage sous `codex` ou `blocs` ;
- ne copie pas un ancien exemple sans le confronter au registre actuel ;
- considère toute réapparition de ces racines comme une régression à
  diagnostiquer ;
- conserve `index` comme seule API des familles documentaires.

---

## État réel des registres publiés

Les six sous-registres publiés dans le dépôt décrivent actuellement
**432 définitions**. Ce nombre mesure les entrées de registre, pas la totalité
des dessins envisagés dans le studio.

| Registre         | Collections dans le dépôt | Définitions | État documentaire                                   |
| ---------------- | ------------------------- | ----------: | --------------------------------------------------- |
| `diffusion`      | 5                         |          80 | publié et projetable                                |
| `general`        | 9                         |         127 | publié et projetable                                |
| `index`          | 5                         |          45 | publié et projetable                                |
| `recompenses`    | 1                         |          18 | publié et raccordé au registre des récompenses      |
| `sources`        | 4                         |          64 | publié et projetable                                |
| `techniques`     | 6                         |          98 | publié et projetable                                |
| **Total publié** | **30**                    |     **432** | total des six sous-registres réellement projetables |

### `general` · le vocabulaire transversal

`general` rassemble les signes utilisables dans plusieurs territoires du
Codex sans appartenir à une famille documentaire ou à une technique précise.

| Collection      | Entrées | Rôle principal                                       |
| --------------- | ------: | ---------------------------------------------------- |
| `logos`         |       1 | identité propre du Codex                             |
| `cinema`        |      15 | projection, plateau et vocabulaire cinématographique |
| `archives`      |      18 | classement, conservation et consultation générale    |
| `ecriture`      |      12 | rédaction, annotation et structuration du récit      |
| `exploration`   |      16 | orientation, recherche et découverte                 |
| `temps`         |      16 | chronologie, durée, périodes et passage du temps     |
| `atelier`       |      16 | fabrication, réglages et espace de travail           |
| `evenements`    |      17 | jalons, annonces et moments publics                  |
| `communication` |      16 | échange, publication et circulation d’information    |

Choisis `general` lorsque le concept reste valable dans plusieurs pages et ne
décrit ni une famille du Codex, ni une technique de production, ni un trophée.

### `index` · les familles documentaires

`index` porte l’identité des catalogues et les symboles de leurs séquences
éditoriales.

| Collection    | Entrées | Accent de famille                     |
| ------------- | ------: | ------------------------------------- |
| `personnages` |       9 | `--atelier-famille-personnages`       |
| `createurs`   |       9 | `--atelier-famille-createurs`         |
| `oeuvres`     |       9 | `--atelier-famille-oeuvres`           |
| `epoques`     |       9 | `--atelier-famille-epoques`           |
| `chansons`    |       9 | `--atelier-animation-rose-aerographe` |

Chaque collection possède notamment un `principal`, utilisé pour représenter
la famille elle-même, puis des slugs spécialisés pour ses séquences.

`index` ne contient pas tous les symboles visibles dans un index. Il contient
ceux qui **qualifient la famille ou sa narration éditoriale**. Une loupe de
recherche générique appartient par exemple à `general.exploration`, pas à
`index.oeuvres`.

### `techniques` · les gestes, outils et procédés

| Collection     | Entrées | Champ couvert                                     |
| -------------- | ------: | ------------------------------------------------- |
| `animation`    |      18 | outils et procédés du mouvement dessiné           |
| `images`       |      16 | prise de vue, composition et travail de l’image   |
| `couleur`      |      16 | fabrication, contrôle et restitution des couleurs |
| `son`          |      16 | voix, musique, enregistrement et synchronisation  |
| `effets`       |      16 | effets optiques, visuels et transformations       |
| `imagineering` |      16 | conception spatiale, dispositifs et expériences   |

La frontière essentielle est celle-ci :

- `general.cinema.camera-cinema` désigne un objet transversal de cinéma ;
- `techniques.animation.camera-banc-titre` désigne un outil et un procédé
  techniques précis.

Quand le nom du signe exige une connaissance métier pour être compris
correctement, `techniques` est souvent le bon territoire.

### `recompenses` · les distinctions projetables

Le registre public contient actuellement dix-huit trophées, des distinctions
historiques déjà documentées aux grandes familles de prix du cinéma, de la
télévision, de la musique, du théâtre, de l’animation et des parcs.

Le type métier `TropheeRecompenseDisney` contraint les slugs disponibles. La
collection n’est donc pas seulement une galerie : elle reste raccordée au
registre documentaire des récompenses.

Tant qu’un trophée n’a pas parcouru toute la chaîne de publication, il ne doit
pas être invoqué depuis l’application.

### `sources` · la nature des preuves

| Collection     | Entrées | Champ couvert                                        |
| -------------- | ------: | ---------------------------------------------------- |
| `supports`     |      16 | formes physiques et numériques des sources           |
| `documents`    |      16 | nature précise des documents et témoignages          |
| `archives`     |      16 | classement, provenance et localisation archivistique |
| `conservation` |      16 | manipulation, protection et préservation matérielle  |

Le registre répond à la question : **de quelle matière documentaire
disposons-nous ?** Il conserve une frontière précise avec `general.archives`,
qui reste un vocabulaire transversal de classement et de consultation.

### `diffusion` · les vies publiques des œuvres

| Collection       | Entrées | Champ couvert                                 |
| ---------------- | ------: | --------------------------------------------- |
| `salles`         |      16 | exploitation et projection cinématographiques |
| `television`     |      16 | programmation et réception télévisées         |
| `video`          |      16 | éditions physiques et visionnage domestique   |
| `numerique`      |      16 | accès dématérialisé et diffusion en ligne     |
| `scene-et-parcs` |      16 | spectacles, attractions et expositions        |

Le registre répond à la question : **par quel mode cette matière devient-elle
accessible ou publique ?**

---

## Les registres en préparation

La documentation du studio distingue encore deux ensembles dont la production
visuelle et la publication web ne sont pas complètes.

| Registre        | Collections prévues | Situation au 30 août 2026                           |
| --------------- | ------------------- | --------------------------------------------------- |
| `lieux`         | 5                   | 80 propositions préparées ; production à poursuivre |
| `organisations` | 5                   | direction future à structurer                       |

Ces nombres appartiennent au suivi de production du studio. Ils ne doivent
pas être additionnés au nombre de symboles projetables du dépôt.

### `lieux`

Ce registre décrira les espaces de création, de présentation et de
conservation :

- `studios` ;
- `salles` ;
- `parcs` ;
- `musees` ;
- `archives`.

Il répond à la question : **dans quel type d’espace cela se produit-il ou se
conserve-t-il ?**

### `organisations`

Ce registre décrira les catégories d’acteurs collectifs :

- `studios` ;
- `distributeurs` ;
- `diffuseurs` ;
- `institutions` ;
- `associations`.

Il répond à la question : **quelle nature d’organisation agit ici ?**

Ne transforme jamais ces registres prévus en API fictive. Tant que leurs
fichiers publics, définitions typées et validations n’existent pas dans le
dépôt, ils restent une direction de production.

---

## Choisir le bon registre

Utilise cet arbre de décision avant de proposer un nouveau signe :

```text
Le signe représente-t-il une famille documentaire ou une séquence propre
à Personnages, Créateurs, Œuvres, Époques ou Chansons ?
    └── oui → index

Représente-t-il un geste, un outil ou un procédé de fabrication spécialisé ?
    └── oui → techniques

Représente-t-il une distinction ou la forme matérielle d’un trophée ?
    └── oui → recompenses

Représente-t-il la nature ou le support d’une preuve ?
    └── oui → sources

Représente-t-il un mode d’accès ou de diffusion au public ?
    └── oui → diffusion

Représente-t-il une catégorie d’espace ?
    └── oui → lieux, seulement après publication de ce registre

Représente-t-il une catégorie d’acteur collectif ?
    └── oui → organisations, seulement après publication de ce registre

Est-il transversal à plusieurs pages et compréhensible sans métier spécialisé ?
    └── oui → general

Sinon : le besoin ou sa frontière n’est pas encore assez clair.
```

### Ne pas créer une collection pour un seul écran

Une collection n’est pas un dossier commode. Elle doit pouvoir justifier :

- une cohérence de rôle ;
- une direction visuelle commune ;
- plusieurs signes réellement nécessaires ;
- une planche comparative utile ;
- une maintenance durable.

Si un symbole isolé suffit dans une collection existante, ajoute-le à cette
collection. Si le besoin relève uniquement d’une composition, utilise les
composants Pixie sans inventer de nouvelle iconographie.

---

## Le contrat TypeScript

Chaque entrée suit le contrat minimal défini dans
[`src/types/symbols.ts`](../../src/types/symbols.ts) :

```ts
export type SymbolDefinition = Readonly<{
    src: `/symbols/${string}.png`;
    label: string;
    accent: `var(--${string})`;
}>;
```

### `src`

Le chemin :

- commence par `/symbols/` ;
- reprend le registre et la collection ;
- se termine par `.png` ;
- pointe vers un fichier réellement présent sous `public/symbols`.

### `label`

Le libellé :

- nomme le signe en français clair ;
- reste utile hors de son contexte visuel ;
- n’est ni le slug brut, ni une instruction de mise en page ;
- peut servir d’alternative lorsque le symbole est informatif.

### `accent`

L’accent :

- est toujours une variable CSS de la forme `var(--...)` ;
- vient de la palette éditoriale ou d’un rôle déjà documenté ;
- exprime l’appartenance du signe sans en être le seul indice ;
- n’est jamais une couleur hexadécimale improvisée.

### Exemple de définition

```ts
export const symbolsExemple = {
    collection: {
        "mon-symbole": {
            src: "/symbols/exemple/collection/mon-symbole.png",
            label: "Mon symbole",
            accent: "var(--atelier-animation-bleu-reperage)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
```

Le `as const` conserve les clés littérales. Le `satisfies` vérifie la forme
des données sans effacer ces clés. C’est ce duo qui permet ensuite à
TypeScript de refuser une collection ou un slug inexistant.

---

## Le registre central

[`src/registry/symbols/index.ts`](../../src/registry/symbols/index.ts) assemble
les sous-registres et déduit :

- `SymbolRegistryName` ;
- `SymbolCollectionName<Registry>` ;
- `SymbolSlug<Registry, Collection>` ;
- l’union discriminée `SymbolSelection`.

Le contrat forme une adresse typée :

```ts
type SymbolSelection = {
    registry: "index";
    collection: "oeuvres";
    slug: "principal" | "origine" | "reception";
};
```

Cette représentation schématique illustre le principe ; l’union réelle est
entièrement inférée des objets de registre et ne doit pas être réécrite à la
main.

### Les résolveurs

`getSymbol` retrouve une définition :

```ts
const symbole = getSymbol({
    registry: "techniques",
    collection: "animation",
    slug: "table-lumineuse",
});
```

Il accepte aussi les trois arguments séparés :

```ts
const symbole = getSymbol("techniques", "animation", "table-lumineuse");
```

`getSymbolSlugs` permet de parcourir une collection sans recopier ses clés :

```ts
const slugs = getSymbolSlugs("index", "oeuvres");
```

N’utilise pas un cast pour forcer une adresse refusée par TypeScript. Une
erreur de typage révèle généralement une faute de slug, un registre non
publié ou une migration incomplète.

---

## `PixieSymbol` : l’unique projecteur public

Le composant
[`PixieSymbol`](../../src/components/ui/PixieSymbol/PixieSymbol.tsx) reçoit la
sélection typée et applique le contrat de rendu commun.

```tsx
import { PixieSymbol } from "@/components/ui/PixieSymbol";

<PixieSymbol
    registry="index"
    collection="oeuvres"
    slug="reception"
    size="lg"
/>;
```

### API actuelle

| Prop         | Type                                   | Défaut | Rôle                                                |
| ------------ | -------------------------------------- | ------ | --------------------------------------------------- |
| `registry`   | clé de `symbolsRegistry`               | requis | choisit le territoire sémantique                    |
| `collection` | collection valide pour le registre     | requis | choisit la série                                    |
| `slug`       | slug valide pour la collection         | requis | choisit le signe                                    |
| `size`       | `xs`, `sm`, `md`, `lg`, `xl` ou nombre | `md`   | fixe la taille rendue                               |
| `decorative` | `boolean`                              | `true` | détermine la stratégie d’alternative                |
| `label`      | `string`                               | —      | remplace le libellé du registre si le signe informe |
| `className`  | `string`                               | `""`   | autorise une composition locale sans casser l’API   |

### Échelle prédéfinie

| Taille | Pixels | Usage habituel                                     |
| ------ | -----: | -------------------------------------------------- |
| `xs`   |     24 | micro-repère, badge ou contrôle compact            |
| `sm`   |     32 | élément d’interface secondaire                     |
| `md`   |     48 | taille courante                                    |
| `lg`   |     64 | carte, section ou repère éditorial                 |
| `xl`   |     96 | en-tête, plan maître ou présentation de collection |

Une valeur numérique positive reste possible pour un besoin documenté. Une
valeur invalide revient à `md`. N’ajoute pas une taille personnalisée pour
compenser un mauvais rapport entre symbole et contenu : vérifie d’abord la
hiérarchie du composant qui l’accueille.

### Ce que `PixieSymbol` garantit

Le composant :

- résout la définition depuis le registre ;
- expose `data-pixie-symbol="registre.collection.slug"` pour l’inspection ;
- transmet l’accent avec `--pixie-symbol-accent` ;
- fixe la taille avec `--pixie-symbol-size` ;
- utilise le dérivé `384 × 384 px` comme source d’image ;
- désactive le glissement natif de l’image ;
- applique une alternative vide et `aria-hidden` en mode décoratif ;
- utilise le label explicite ou celui du registre en mode informatif.

### Symbole décoratif

Si un titre voisin dit déjà exactement ce que représente le signe, garde le
mode décoratif :

```tsx
<h2 id="section-archives">Les Archives</h2>
<PixieSymbol
    registry="general"
    collection="archives"
    slug="boite-archives"
    size="lg"
/>
```

Le lecteur d’écran n’entend pas deux fois la même information.

### Symbole informatif

Si le signe porte une information qui n’existe pas ailleurs :

```tsx
<PixieSymbol
    registry="recompenses"
    collection="trophees"
    slug="statuette-oscar"
    size="sm"
    decorative={false}
    label="Oscar"
/>
```

Avant de choisir ce mode, demande-toi si un texte visible ne serait pas plus
clair. Un symbole informatif ne doit jamais devenir une devinette obligatoire.

### Ce qu’il ne faut pas faire

```tsx
// Non : chemin dupliqué, aucun typage, rendu et accessibilité divergents.
<Image
    src="/symbols/index/oeuvres/reception.png"
    alt=""
    width={64}
    height={64}
/>
```

La bonne API est `PixieSymbol`. Le chemin public appartient au registre, pas
au consommateur.

---

## Les trois échelles de lecture

Un même dessin doit conserver son identité à plusieurs niveaux.

### Micro · `16–24 px`

À cette taille, seule la silhouette compte réellement.

Vérifie :

- le contraste général ;
- la séparation des masses ;
- l’absence de détail indispensable ;
- la distinction avec les autres signes de la collection.

Le preset minimal de `PixieSymbol` est actuellement `24 px`. Toute utilisation
plus petite demande une vérification spécifique.

### Interface · `32–64 px`

C’est la zone de reconnaissance immédiate : cartes, contrôles, en-têtes de
section et relations.

Vérifie :

- que le signe reste identifiable sans agrandissement ;
- que l’accent ne se confond pas avec le fond ;
- que la forme ne déséquilibre pas le texte voisin ;
- que les deux Lumières conservent le même niveau de présence.

### Éditorial · `96 px` et plus

La matière, la lumière et les détails peuvent devenir visibles. Le signe peut
ouvrir une section ou tenir une place de plan maître.

Vérifie :

- la propreté des contours ;
- la cohérence des ombres et des halos ;
- l’absence d’artefacts de détourage ;
- la fidélité au master ;
- la relation entre le symbole et la typographie.

### Planche de collection

La planche ne constitue pas une quatrième taille d’interface. Elle constitue
un outil de direction artistique.

Elle doit révéler :

- les doublons de silhouette ;
- les signes trop détaillés ou trop pauvres ;
- les écarts de matière et d’éclairage ;
- les répétitions d’objets ;
- le rythme global de la série ;
- les manques sémantiques.

Un symbole réussi isolément peut échouer dans sa collection. La planche rend
cet échec visible avant la publication.

---

## La chaîne de fabrication complète

### 1. Formuler le besoin

Écris d’abord :

- la notion à représenter ;
- l’endroit où elle apparaît ;
- le texte qu’elle accompagne ;
- les tailles auxquelles elle sera projetée ;
- son caractère décoratif ou potentiellement informatif ;
- les signes voisins avec lesquels elle doit rester distincte.

Si le besoin ne peut pas être décrit sans parler de « joli », « magique » ou
« plus Disney », il n’est pas prêt.

### 2. Choisir l’adresse avant le dessin

Décide :

```text
registre.collection.slug
```

Vérifie les registres existants avant d’en proposer un nouveau. Recherche le
concept et ses synonymes dans `src/registry/symbols` pour éviter les doublons.

### 3. Écrire la direction visuelle

Définis :

- la silhouette dominante ;
- l’objet ou la métaphore autorisée ;
- la matière ;
- la lumière ;
- l’accent pressenti ;
- les éléments interdits ;
- les risques de confusion avec une marque, un personnage ou un emblème.

La direction doit pouvoir être relue sans l’image et permettre de juger si le
résultat respecte l’intention.

### 4. Produire le master

Le master courant :

- est carré ;
- suit la convention haute définition de `1254 × 1254 px` ;
- conserve assez de matière pour les usages éditoriaux ;
- emploie un fond de détourage distinct lorsque l’alpha natif n’est pas
  fiable ;
- reste la source de reprise, pas le fichier servi par l’application.

Les masters vivent dans le fonds de production du studio. Ne les déplace pas
dans `public` pour simplifier une intégration.

### 5. Détourer et exporter

Le dérivé web :

- est un PNG RGBA transparent ;
- mesure `384 × 384 px` ;
- ne possède aucun fond résiduel ;
- conserve des contours propres ;
- se lit sur fonds sombre, clair et coloré ;
- reprend exactement le slug choisi.

### 6. Vérifier la collection

Avant publication, ajoute le signe à sa planche et compare-le aux autres
éléments de la série.

Un signe ne doit pas seulement « aller avec » la collection. Il doit lui
ajouter un rôle qui n’existait pas déjà.

### 7. Publier le fichier web

Place le dérivé ici :

```text
public/symbols/<registre>/<collection>/<slug>.png
```

Le dossier et le chemin du registre doivent être identiques, caractère pour
caractère.

### 8. Déclarer la définition typée

Ajoute `src`, `label` et `accent` dans le sous-registre correspondant.

Ne fabrique pas une table parallèle dans un composant. Si le symbole n’est pas
dans le registre, il n’est pas encore publié.

### 9. Projeter dans l’Atelier

Ajoute ou vérifie le signe dans le dossier `PixieSymbol` :

- collection complète ;
- taille micro ;
- taille d’interface ;
- taille éditoriale ;
- Lumière sombre ;
- Lumière claire ;
- libellé ;
- accent ;
- usage décoratif et, si nécessaire, informatif.

### 10. Vérifier mécaniquement

Le vérificateur doit confirmer :

- la forme de chaque définition ;
- la présence d’un label ;
- la forme `var(--...)` de l’accent ;
- la cohérence du préfixe de chemin ;
- l’existence du PNG ;
- l’absence d’image publique orpheline ;
- la présence des symboles exigés par les blocs éditoriaux.

### 11. Migrer les consommateurs

Remplace les anciennes clés et les chemins directs. Recherche dans tout
`src`, y compris :

- composants Codex ;
- pages ;
- données et types ;
- dossiers et playgrounds de l’Atelier ;
- prototypes ;
- documentation et exemples copiables.

### 12. Synchroniser les documents

Une publication modifie au minimum :

- l’état réel du dépôt ;
- la fiche ou l’inventaire de l’Atelier ;
- la page Notion d’iconographie ;
- ce chapitre si l’architecture ou les conventions changent.

---

## Ajouter un symbole à une collection existante

Ordre recommandé :

1. vérifier que le besoin n’est pas déjà couvert ;
2. confirmer le registre et la collection ;
3. choisir un slug stable ;
4. produire le master et le dérivé ;
5. ajouter le PNG sous `public/symbols` ;
6. ajouter la définition au fichier de registre ;
7. projeter le signe avec `PixieSymbol` dans l’Atelier ;
8. lancer les contrôles ;
9. migrer ou ajouter les usages réels ;
10. synchroniser Notion et la documentation.

### Exemple

Pour un nouveau signe `restauration` dans `general.archives` :

```text
public/symbols/general/archives/restauration.png
```

```ts
export const symbolsGeneral = {
    archives: {
        // …
        restauration: {
            src: "/symbols/general/archives/restauration.png",
            label: "Restauration d’archive",
            accent: "var(--atelier-animation-turquoise-acetate)",
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
```

Puis :

```tsx
<PixieSymbol
    registry="general"
    collection="archives"
    slug="restauration"
    size="lg"
/>
```

Cet exemple décrit la mécanique, pas une demande de création effective. Le
besoin éditorial et la direction visuelle doivent toujours être validés avant
production.

---

## Créer une collection ou un registre

Une nouvelle collection exige plus qu’un dossier vide.

### Contrat d’ouverture d’une collection

- son rôle ne recouvre aucune collection existante ;
- plusieurs besoins réels sont identifiés ;
- la direction visuelle et ses interdits sont écrits ;
- les premiers slugs sont cohérents ;
- une planche de collection est prévue ;
- un accent ou une logique d’accents est défini ;
- les usages et tailles attendus sont connus ;
- la maintenance future possède un responsable documentaire.

### Contrat d’ouverture d’un registre

Un registre supplémentaire exige aussi :

- une frontière sémantique claire avec tous les registres actuels ;
- un nom stable dans le vocabulaire du projet ;
- un fichier `symbols-<registre>.ts` ;
- son ajout au registre central ;
- son ajout au vérificateur ;
- son dossier public ;
- une représentation dans l’Atelier ;
- une mise à jour de Notion et de ce guide.

Ne prépublie jamais un registre avec des définitions fictives pour « préparer
le terrain ». Le typage doit décrire une réalité disponible.

---

## Renommer et migrer sans laisser de fantômes

Le renommage d’une clé est une migration, pas une correction locale.

### Séquence sûre

1. établir la table `ancien → nouveau` ;
2. repérer tous les consommateurs ;
3. déplacer les fichiers publics ;
4. modifier les sous-registres ;
5. modifier le registre central si nécessaire ;
6. migrer composants, pages, types, données et Atelier ;
7. adapter le vérificateur ;
8. supprimer les anciens fichiers seulement lorsque leurs usages ont disparu ;
9. lancer les contrôles ;
10. mettre à jour README, Guidebook et Notion.

### Pourquoi éviter les alias silencieux

Conserver deux clés pour le même symbole masque les usages périmés et empêche
TypeScript de jouer son rôle. Un alias temporaire n’est acceptable que si une
compatibilité explicite a été décidée, documentée et assortie d’une date de
retrait.

La migration de `codex` et `blocs` vers `index` illustre cette règle : elle
s’est terminée par la disparition coordonnée des anciennes vérités, pas par
leur conservation éternelle.

---

## Le vérificateur de symboles

[`scripts/verifier-symboles.mjs`](../../scripts/verifier-symboles.mjs) charge
les registres, inspecte leurs définitions et compare les chemins déclarés aux
images publiques.

Il protège actuellement contre :

- une définition absente ou invalide ;
- un label vide ;
- un accent qui n’emploie pas une variable CSS ;
- un chemin qui ne respecte pas son registre ;
- un fichier manquant ;
- un PNG public non enregistré ;
- un type de bloc éditorial sans symbole correspondant.

### Pendant une migration

Le tableau des registres contrôlés et les vérifications spécialisées doivent
évoluer avec l’architecture. Si `index` remplace `blocs`, il ne suffit pas de
migrer l’affichage : le contrôle des blocs éditoriaux doit lui aussi lire
`registres.index` et employer les noms de collections canoniques.

Un vérificateur qui continue d’accepter l’ancien monde peut donner un résultat
vert à une migration incomplète.

### Projection finale minimale

Après toute modification de symboles :

```bash
pnpm check:symbols
pnpm check
```

Avant une clôture ou une publication plus large :

```bash
pnpm check:ci
```

Ajoute une vérification visuelle dans l’Atelier et sur les pages réellement
touchées. Un contrôle de fichiers ne peut pas détecter une silhouette illisible
ou un accent insuffisant dans une Lumière.

---

## Contrat d’accessibilité

### Le symbole ne remplace pas le texte

Un pictogramme peut accélérer la reconnaissance. Il ne remplace pas :

- un titre ;
- un label de contrôle ;
- un statut écrit ;
- une relation nommée ;
- une légende documentaire.

### Décoratif par défaut

Le choix `decorative={true}` convient lorsque le texte adjacent transmet déjà
le sens. Il évite les répétitions inutiles dans les technologies d’assistance.

### Informatif par exception

Passe `decorative={false}` seulement si l’information manquerait réellement
sans le signe. Vérifie alors :

- que le label est compréhensible sans voir l’image ;
- qu’il décrit la signification, pas la couleur ou la forme ;
- qu’un texte visible ne serait pas préférable ;
- que l’information reste disponible si l’image ne charge pas.

### Couleur, taille et contraste

- l’accent ne porte jamais seul une catégorie ou un état ;
- la silhouette reste identifiable sans perception fine des couleurs ;
- un symbole agrandi ne doit pas pousser le titre hors du cadre ;
- un symbole réduit ne doit pas devenir une tache indéchiffrable ;
- les deux Lumières, les couleurs forcées et le zoom à 200 % doivent rester
  utilisables.

---

## Contrat visuel

### Cohérence avant uniformité

Une collection cohérente ne signifie pas que tous ses signes sont presque
identiques. Elle partage :

- une même logique de volume ;
- une lumière compatible ;
- une densité de détail comparable ;
- une relation stable entre matière et silhouette ;
- une présence équilibrée dans la planche.

Elle conserve assez de diversité pour que chaque signe soit reconnu.

### L’accent accompagne, il ne recolore pas tout

`--pixie-symbol-accent` permet au composant d’accorder sa présence à la
palette. Le PNG garde sa matière propre ; l’accent ne doit pas transformer la
collection en série de silhouettes monochromes sans relief.

### Les deux Lumières

Pour chaque nouvelle série, vérifie :

- les bords sombres sur la Lumière sombre ;
- les halos clairs sur la Lumière claire ;
- les transparences partielles ;
- les ombres portées ;
- les pixels résiduels du détourage ;
- l’équilibre entre image, bordure, fond et typographie.

### La magie ne cache pas la silhouette

Poussière, halo et projection peuvent donner de la présence. Ils ne doivent
jamais :

- effacer le contour à petite taille ;
- fusionner plusieurs signes dans une même tache lumineuse ;
- simuler un état interactif ;
- dégrader le contraste du texte voisin ;
- remplacer une différence de forme réellement nécessaire.

---

## Anti-patterns

### Copier un chemin public

```tsx
<Image src="/symbols/general/cinema/bobine.png" alt="" />
```

Le chemin échappe au typage et duplique la connaissance du registre.

### Inventer une clé avec un cast

```ts
const slug = "symbole-imagine" as SymbolSlug<"general", "cinema">;
```

Le cast masque l’absence du symbole au lieu de la résoudre.

### Publier seulement le PNG

Un fichier placé dans `public` sans définition est un orphelin, pas un symbole
disponible.

### Déclarer seulement la définition

Une clé dont le PNG manque est une promesse cassée.

### Utiliser un registre futur comme s’il existait

Les registres `lieux` et `organisations` sont une cible documentée. Ils ne
deviennent consommables qu’après leur publication complète.

### Créer une collection par page

Une collection décrit une famille de sens et de forme, pas une route de
l’application.

### Nommer le slug d’après la position

`icone-gauche`, `hero-2` ou `petit-symbole` décrivent une mise en page
temporaire. Le slug doit décrire le rôle documentaire.

### Employer la couleur comme seul nom

`symbole-violet` n’explique ni le sujet ni la fonction. La couleur appartient
à l’accent, pas à l’identité sémantique.

### Confondre objet général et technique spécialisée

Un objet de cinéma transversal appartient à `general.cinema`. Un outil ou un
procédé précis appartient à `techniques`.

### Laisser survivre les anciennes clés

Une migration qui ajoute `index` sans retirer progressivement `codex` et
`blocs` fabrique deux API concurrentes. Les clés historiques peuvent traverser
une phase de raccord, jamais devenir une seconde norme.

---

## Définition de « prêt à projeter »

Un symbole individuel est prêt lorsque :

- [ ] son besoin éditorial est explicite ;
- [ ] son adresse `registre.collection.slug` est validée ;
- [ ] sa direction visuelle respecte la doctrine d’originalité ;
- [ ] son master haute définition existe ;
- [ ] son dérivé transparent `384 × 384 px` est propre ;
- [ ] son slug et son nom de fichier sont identiques ;
- [ ] sa définition possède un `src`, un `label` et un `accent` valides ;
- [ ] `PixieSymbol` le résout sans cast ;
- [ ] il est vérifié aux tailles micro, interface et éditoriale utiles ;
- [ ] il fonctionne dans les deux Lumières ;
- [ ] son rôle décoratif ou informatif est correct ;
- [ ] le vérificateur ne signale aucun défaut ;
- [ ] sa documentation de production est synchronisée.

Une collection est prête lorsque :

- [ ] tous ses signes répondent au contrat individuel ;
- [ ] sa planche de collection existe ;
- [ ] les silhouettes sont distinctes ;
- [ ] matière, lumière et densité sont cohérentes ;
- [ ] les besoins éditoriaux couverts sont connus ;
- [ ] l’Atelier permet de la parcourir et de l’éprouver ;
- [ ] aucun PNG public n’est orphelin ;
- [ ] aucune clé retirée ne reste consommée.

Un registre est prêt lorsque :

- [ ] sa frontière sémantique est documentée ;
- [ ] ses collections correspondent à des besoins réels ;
- [ ] ses fichiers publics et son sous-registre sont complets ;
- [ ] le registre central l’expose ;
- [ ] le vérificateur le charge ;
- [ ] `PixieSymbol` l’accepte par typage naturel ;
- [ ] l’Atelier et les pages publiques utilisent la même nomenclature ;
- [ ] Notion décrit fidèlement son état réel.

---

## Checklist de revue pour un agent IA

### Avant de dessiner ou demander une image

- [ ] J’ai trouvé le besoin éditorial précis.
- [ ] J’ai recherché les signes existants et leurs synonymes.
- [ ] J’ai choisi le registre et la collection par le sens.
- [ ] J’ai écrit les limites d’originalité.
- [ ] Je connais les tailles et contextes d’usage.
- [ ] Je sais avec quels signes le nouveau venu sera comparé.

### Avant d’intégrer

- [ ] Le master et le dérivé ne sont pas confondus.
- [ ] Le PNG est transparent, carré et correctement nommé.
- [ ] Le chemin public correspond exactement à l’adresse.
- [ ] Le label est utile et l’accent vient du registre des couleurs.
- [ ] Aucun fichier utilisateur ou autre WIP n’est écrasé.

### Avant de déclarer la publication

- [ ] `PixieSymbol` résout la clé sans cast.
- [ ] L’Atelier montre le résultat dans les deux Lumières.
- [ ] Les tailles utiles restent lisibles.
- [ ] L’accessibilité est correcte.
- [ ] `pnpm check:symbols` réussit.
- [ ] `pnpm check` réussit.
- [ ] Les anciens chemins et clés ont été recherchés.
- [ ] La documentation correspond à l’état du dépôt.

---

## Fichiers à ouvrir en premier

| Besoin                                         | Point d’entrée recommandé                                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Comprendre la doctrine et l’état de production | [Iconographie originale · Notion](https://app.notion.com/p/3c0092fa322381eea047ed56700bbff8)             |
| Lire les définitions projectables              | [`src/registry/symbols`](../../src/registry/symbols/)                                                    |
| Comprendre le contrat minimal                  | [`src/types/symbols.ts`](../../src/types/symbols.ts)                                                     |
| Comprendre la résolution typée                 | [`src/registry/symbols/index.ts`](../../src/registry/symbols/index.ts)                                   |
| Voir les fichiers web                          | [`public/symbols`](../../public/symbols/)                                                                |
| Lire l’API de projection                       | [`src/components/ui/PixieSymbol`](../../src/components/ui/PixieSymbol/)                                  |
| Voir les collections dans l’Atelier            | [`PixieSymbolDossier.tsx`](../../src/app/atelier/_components/PixieSymbolDossier.tsx)                     |
| Essayer tailles et sélections                  | [`PixieSymbolPlayground.tsx`](../../src/app/atelier/_components/PixieSymbolPlayground.tsx)               |
| Contrôler registres et fichiers                | [`scripts/verifier-symboles.mjs`](../../scripts/verifier-symboles.mjs)                                   |
| Comprendre les accents                         | [Chapitre 03](./03-direction-artistique-et-ui.md) et [`src/registry/colors`](../../src/registry/colors/) |
| Comprendre le composant Pixie                  | [Chapitre 04](./04-design-system-pixie.md)                                                               |

---

## Dernière transmission

Charly-A a confié au Guidebook une doctrine. Le dépôt lui donne un contrat.
L’Atelier lui donne une scène. Entre les trois, la responsabilité de l’agent
reste simple à énoncer : ne jamais faire passer une intention pour une
publication, ni une image pour un système.

Un symbole du Disneyiste est réussi lorsqu’il paraît évident sans être
emprunté, familier sans être copié, détaillé sans perdre sa silhouette et
magique sans cesser d’être lisible.

**Trouve le sens. Donne-lui une adresse. Dessine une forme originale. Vérifie
la collection. Puis laisse `PixieSymbol` allumer le projecteur.**

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                 BUREAU DES SIGNES ORIGINAUX                ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  TRANSMISSION 🤖 CHARLY-A · TECH LEAD                       ║
║  MISSION      Donner une adresse aux signes du Disneyiste    ║
║  ACCÈS        MASTERS · REGISTRES · PIXIESYMBOL · ATELIER    ║
║  PROTOCOLE    SENS · SILHOUETTE · TYPAGE · PROJECTION        ║
║  STATUT       🪄 432 SIGNES PUBLIÉS AU REGISTRE              ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
║  Aucun symbole sans sens. Aucun sens sans vérification.       ║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Gardien des registres · Interprète TypeScript des signes originaux_<br>
[Carte de studio réutilisable](./snippets/carte-de-studio-guru-editions.md)
