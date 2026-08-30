# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> Chapitre 04 — Pixie, ou l’art de rendre la poussière projetable<br>
> Écrit pour l’IA par 🔩 R2-D2, Lead Dev chez Guru Éditions

---

> _Une pincée de poussière peut faire décoller une idée. Pour qu’elle tienne en
> vol dans toute l’interface, il lui faut aussi un rôle, une API, des garanties
> et un endroit où atterrir._

Ce chapitre raconte le design system **Pixie** : la grammaire de composants qui
donne au Codex des formes communes sans lui retirer sa singularité.

Il complète :

- [le chapitre consacré à l’esprit du projet](./01-esprit-du-projet.md), qui
  explique pourquoi nous construisons ;
- [le chapitre consacré à l’architecture](./02-architecture-du-codex.md), qui
  décrit où vivent les données et les compositions métier ;
- [le chapitre consacré à la direction artistique](./03-direction-artistique-et-ui.md),
  qui fixe la lumière, les couleurs, les typographies et le rythme global.

Ici, nous répondons à une autre question :

> **Comment transformer une intention d’interface en composant assez juste,
> assez robuste et assez documenté pour être projeté partout dans le Codex ?**

---

## Transmission prioritaire

Si le projecteur chauffe déjà, retiens ceci :

1. un composant Pixie répond d’abord à **un verbe et un besoin**, jamais à une
   simple envie de style ;
2. `PixieDust` désigne une esquisse expérimentale en version `0.x` ;
3. `Pixie` désigne un composant validé, documenté et prêt à projeter en
   version `1.x` ;
4. la présence d’un fichier ou d’un dossier ne suffit pas à prouver la
   stabilité d’un composant ;
5. l’état et la version de référence se lisent dans
   [`src/app/atelier/page.tsx`](../../src/app/atelier/page.tsx), puis se
   vérifient dans le dossier public du composant et sa fiche d’Atelier ;
6. les consommateurs importent toujours depuis le barrel du dossier :
   `@/components/ui/PixieCard`, jamais depuis le fichier `.tsx` ;
7. les couleurs viennent des rôles de thème ou du registre éditorial, pas de
   valeurs improvisées ;
8. les primitives de Montage règlent la disposition avant toute collection de
   classes locales ;
9. un effet ne doit jamais porter seul le sens, masquer le contenu ou ignorer
   le mouvement réduit ;
10. une promotion met à jour **ensemble** le nom, l’API, la version, les
    fichiers, les imports, le dossier d’Atelier et l’inventaire.

Et surtout :

> **N’importe qui peut lancer de la poussière. Le travail du design system est
> de savoir pourquoi elle brille, comment elle retombe et ce qui demeure quand
> on éteint l’effet.**

---

## Le pacte Pixie

Pixie n’est ni une bibliothèque de décorations, ni une galerie de composants
génériques repeints en violet.

C’est un pacte entre quatre responsabilités :

```text
INTENTION
    ↓
un verbe clair et une limite explicite
    ↓
COMPOSANT PIXIE
    ↓
une API typée, une structure sémantique et des états prévus
    ↓
PROJECTION
    ↓
un rendu cohérent dans les deux Lumières, au clavier et à toutes les largeurs
```

Un bon composant Pixie :

- porte une responsabilité assez précise pour être nommée en une phrase ;
- reste assez neutre pour accueillir plusieurs matières du Codex ;
- compose avec les autres sans connaître leur contenu métier ;
- expose des choix sémantiques plutôt que des réglages arbitraires ;
- conserve les attributs natifs utiles de l’élément qu’il représente ;
- rend ses états perceptibles autrement que par la couleur seule ;
- documente ses limites aussi soigneusement que ses possibilités.

### Le test du verbe

Chaque primitive stable possède un verbe principal :

| Composant       | Verbe principal |
| --------------- | --------------- |
| `PixieButton`   | déclencher      |
| `PixieLink`     | conduire        |
| `PixieCard`     | accueillir      |
| `PixiePanel`    | regrouper       |
| `PixieField`    | associer        |
| `PixieStack`    | rythmer         |
| `PixieGrid`     | distribuer      |
| `PixieToast`    | signaler        |
| `PixieSkeleton` | préserver       |

Si la phrase commence par « rendre plus joli », « ajouter une boîte » ou
« donner un peu de magie », le besoin n’est pas encore assez bien défini.

---

## De `PixieDust` à `Pixie`

La poussière de fée n’est pas une version inférieure de Pixie. C’est son
laboratoire assumé.

```text
À ESQUISSER
item nommé, rôle pressenti, aucune API promise
        │
        ▼
PIXIEDUST · v0.1.0
première hypothèse rendue et documentée
        │
        ▼
PIXIEDUST · v0.2.0
API enrichie, scénarios variés, états et limites éprouvés
        │
        ▼
VALIDATION
revue visuelle, responsive, clavier, accessibilité, deux Lumières
        │
        ▼
PIXIE · v1.0.0
contrat public stable et autorisé dans le Codex
```

### `À esquisser`

L’item existe dans le programme de l’Atelier, avec un nom et un rôle, mais ne
constitue encore aucune promesse technique.

Il peut changer de nom, fusionner avec un autre besoin ou disparaître avant le
premier prototype.

### `PixieDust` · version `0.x`

L’esquisse possède une implémentation réelle et un dossier d’essai. Son API
reste révisable.

Elle sert à :

- explorer plusieurs variantes ;
- confronter l’idée à du contenu court, long, vide ou dense ;
- identifier les états et les interactions ;
- éprouver les deux Lumières ;
- découvrir ce qui relève vraiment de la primitive ;
- consigner les décisions encore ouvertes.

Une esquisse ne doit pas être intégrée aux pages publiques du Codex. La
réutiliser trop tôt transforme une hypothèse en dépendance.

### `Pixie` · version `1.x`

La promotion signifie que le contrat peut être consommé dans le Codex.

Elle ne signifie pas que le composant est figé pour toujours. Elle signifie
que ses évolutions doivent désormais respecter ses usages existants, annoncer
leurs ruptures et proposer une migration lorsqu’elles modifient l’API.

### Une promotion est une métamorphose complète

Pour une même primitive, ne conserve pas simultanément un ancien nom
`PixieDust…` et un nouveau nom `Pixie…` comme deux vérités concurrentes.

La promotion doit raccorder :

- le dossier sous `src/components/ui` ;
- les quatre fichiers canoniques ;
- les exports et les types publics ;
- tous les imports ;
- le dossier et le playground de l’Atelier ;
- le nom, l’état et la version dans l’inventaire ;
- les exemples de projection réelle ;
- la documentation du dépôt lorsqu’elle inventorie le composant.

Les conventions de commit et la période courante restent gouvernées par
[`AGENTS.md`](../../AGENTS.md). Une promotion technique ne permet jamais de
contourner les règles d’un Acte ou d’un Entracte.

---

## Les sources de vérité

Un agent ne doit pas déclarer un composant disponible après avoir seulement
aperçu son nom dans une recherche.

### 1. L’inventaire de l’Atelier

[`src/app/atelier/page.tsx`](../../src/app/atelier/page.tsx) porte le programme
des plateaux, le rôle, l’état, la version et l’ancre documentaire de chaque
item.

C’est le premier endroit où vérifier si un composant est :

- `À esquisser` ;
- une `Esquisse` ;
- `Prêt à projeter`.

### 2. Le dossier public du composant

La présence d’un dossier complet sous [`src/components/ui`](../../src/components/ui/)
confirme l’existence de l’implémentation :

```text
src/components/ui/<NomComposant>/
├── <NomComposant>.tsx
├── <NomComposant>.module.css
├── <NomComposant>.types.ts
└── index.ts
```

Le fichier `.types.ts` décrit le contrat. Le fichier `.tsx` le réalise. Le
module CSS le met en scène. Le barrel `index.ts` déclare ce qui peut sortir du
dossier.

Un dossier vide, un ancien nom résiduel ou un fichier isolé ne constitue pas
une API publique.

### 3. Le dossier de l’Atelier

[`src/app/atelier/_components`](../../src/app/atelier/_components/) contient les
fiches documentaires et les playgrounds.

Le dossier montre :

- la mission ;
- les usages et les limites ;
- les variantes et les états ;
- le comportement dans les deux Lumières ;
- l’accessibilité ;
- l’API et ses types spécifiques ;
- les scénarios qui ont justifié la promotion.

### 4. Les usages publics

Enfin, rechercher le composant dans `src/app` et `src/components/codex` permet
de comprendre les conventions qui se sont formées en situation réelle.

Ces usages ne remplacent pas l’API : ils révèlent son histoire et les coûts
d’une évolution.

### Ordre de lecture recommandé

```text
inventaire Atelier
    → barrel public
        → fichier de types
            → implémentation
                → CSS
                    → dossier Atelier
                        → usages dans le Codex
```

---

## Anatomie d’une primitive

### Le composant

Le fichier `.tsx` doit rester centré sur la responsabilité de la primitive.

Il peut :

- choisir un élément HTML pertinent ;
- composer les classes correspondant aux variantes typées ;
- résoudre une couleur du registre ;
- transmettre les attributs natifs ;
- matérialiser les états et les attributs `data-*` utiles ;
- implémenter l’interaction lorsqu’elle appartient réellement au contrat.

Il ne doit pas embarquer un récit métier, une fiche Disney ou une décision de
page publique.

### Les types

Le fichier `<NomComposant>.types.ts` contient :

- les propriétés publiques ;
- les unions de variantes, tailles, états et comportements ;
- les styles CSS personnalisés nécessaires au composant ;
- les types spécifiques qui méritent d’être exportés.

Les types globaux — couleurs, métadonnées, symboles ou matière métier — restent
dans `src/types` ou leur registre dédié.

### Le module CSS

Le CSS traduit l’API en rendu. Il consomme les tokens sémantiques et les
variables du composant.

Il doit prévoir, selon le besoin :

- les deux Lumières ;
- `:hover`, `:focus-visible`, `:active` et `:disabled` ;
- les contenus longs ;
- les largeurs étroites ;
- `prefers-reduced-motion` ;
- les couleurs forcées ;
- l’impression lorsque le composant y apparaît.

### Le barrel

Le fichier `index.ts` est la porte officielle :

```ts
export { PixieCard } from "./PixieCard";
export type { PixieCardProps, PixieCardVariant } from "./PixieCard.types";
```

Le consommateur importe ainsi :

```ts
import { PixieCard, type PixieCardProps } from "@/components/ui/PixieCard";
```

Il ne traverse jamais la porte de service :

```ts
// À éviter
import { PixieCard } from "@/components/ui/PixieCard/PixieCard";
```

---

## Les plateaux du système

L’Atelier possède huit plateaux. Six accueillent directement les composants
Pixie stables.

| Plateau         | Responsabilité Pixie                          |
| --------------- | --------------------------------------------- |
| Les Accessoires | primitives simples, actions et repères        |
| Les Décors      | surfaces, cadres et atmosphères               |
| Les Écrans      | restitution, lecture et visionnage            |
| Les Dialogues   | saisie, choix et interaction avec la personne |
| Le Montage      | disposition, rythme et comportement spatial   |
| Les Effets      | attente, chargement et retour du système      |

Les deux autres jouent un rôle différent :

- **La Pellicule** expose les fondations visuelles et les tokens ;
- **Les Plans** accueillent des compositions documentaires métier qui ne
  prennent jamais les préfixes `PixieDust` ou `Pixie`.

Au moment de cette édition, l’inventaire de l’Atelier déclare **31 composants
Pixie en version `1.0.0` prêts à projeter**.

Ce nombre est un instantané documentaire. Lorsqu’un composant est promu ou
retiré, mets à jour l’inventaire de l’Atelier avant ce chapitre.

---

## Les Accessoires · 5 composants prêts

Les Accessoires sont les objets que l’on prend en main. Ils portent une action,
un déplacement, une qualification, un symbole ou une articulation.

| Composant        | Mission                           | Fichiers de référence                                                                                                  |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `PixieSymbol`    | Projeter un symbole du registre   | [UI](../../src/components/ui/PixieSymbol/) · [Dossier](../../src/app/atelier/_components/PixieSymbolDossier.tsx)       |
| `PixieButton`    | Déclencher une action             | [UI](../../src/components/ui/PixieButton/) · [Dossier](../../src/app/atelier/_components/PixieButtonDossier.tsx)       |
| `PixieLink`      | Conduire vers une autre scène     | [UI](../../src/components/ui/PixieLink/) · [Dossier](../../src/app/atelier/_components/PixieLinkDossier.tsx)           |
| `PixieBadge`     | Qualifier une information brève   | [UI](../../src/components/ui/PixieBadge/) · [Dossier](../../src/app/atelier/_components/PixieBadgeDossier.tsx)         |
| `PixieSeparator` | Marquer un changement de séquence | [UI](../../src/components/ui/PixieSeparator/) · [Dossier](../../src/app/atelier/_components/PixieSeparatorDossier.tsx) |

### Choisir le bon Accessoire

#### `PixieSymbol`

Utilise-le pour afficher une entrée des registres de symboles. Il résout la
source, l’accent et le libellé depuis la sélection `registry`, `collection` et
`slug`.

Il est décoratif par défaut. Lorsqu’il transmet une information absente du
texte voisin, passe `decorative={false}` et fournis un `label` pertinent.

#### `PixieButton`

Un bouton déclenche une action dans la scène courante : enregistrer, ouvrir,
fermer, lancer, confirmer.

Il ne conduit pas vers une autre URL. Son état `loading` le désactive et expose
l’attente ; ne recrée pas ce comportement autour de lui.

#### `PixieLink`

Un lien change de scène ou de position documentaire. Ses indicateurs
`arrow`, `chevron`, `back`, `external` et `anchor` sont décoratifs ; le libellé
doit conserver le sens du déplacement.

#### `PixieBadge`

Un badge qualifie une donnée brève : famille, statut, format, version ou
métadonnée. Il peut recevoir une valeur libre ou une sélection du registre de
métadonnées.

Il ne remplace ni un bouton, ni un message d’erreur, ni une phrase importante.

#### `PixieSeparator`

Un séparateur rend visible une articulation déjà présente dans la structure.
Ses variantes cinématographiques donnent du caractère au rythme, mais ne
doivent pas fabriquer seules un changement de sujet.

---

## Les Décors · 6 composants prêts

Les Décors donnent une surface et une profondeur au contenu. Leur proximité
visuelle ne les rend pas interchangeables.

| Composant       | Mission                                           | Fichiers de référence                                                                                                |
| --------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `PixieCard`     | Accueillir une unité de contenu répétable         | [UI](../../src/components/ui/PixieCard/) · [Dossier](../../src/app/atelier/_components/PixieCardDossier.tsx)         |
| `PixiePanel`    | Regrouper une section dans une surface structurée | [UI](../../src/components/ui/PixiePanel/) · [Dossier](../../src/app/atelier/_components/PixiePanelDossier.tsx)       |
| `PixieFrame`    | Encadrer un visuel ou un aperçu                   | [UI](../../src/components/ui/PixieFrame/) · [Dossier](../../src/app/atelier/_components/PixieFrameDossier.tsx)       |
| `PixieCallout`  | Mettre en lumière une annotation éditoriale       | [UI](../../src/components/ui/PixieCallout/) · [Dossier](../../src/app/atelier/_components/PixieCalloutDossier.tsx)   |
| `PixieInset`    | Creuser une zone d’information secondaire         | [UI](../../src/components/ui/PixieInset/) · [Dossier](../../src/app/atelier/_components/PixieInsetDossier.tsx)       |
| `PixieBackdrop` | Installer un fond de scène atmosphérique          | [UI](../../src/components/ui/PixieBackdrop/) · [Dossier](../../src/app/atelier/_components/PixieBackdropDossier.tsx) |

### La matrice des surfaces

| Besoin                                                  | Primitive       | Ce qu’elle ne doit pas devenir          |
| ------------------------------------------------------- | --------------- | --------------------------------------- |
| répéter une unité dans une collection                   | `PixieCard`     | une section de page complète            |
| structurer un ensemble avec header, corps ou footer     | `PixiePanel`    | une simple carte répétée trente fois    |
| contenir une image, un ratio, un cadrage ou une légende | `PixieFrame`    | un conteneur éditorial générique        |
| attirer l’attention sur une annotation                  | `PixieCallout`  | une alerte système éphémère             |
| placer une matière secondaire en retrait                | `PixieInset`    | la surface principale de la page        |
| colorer l’atmosphère derrière une composition           | `PixieBackdrop` | un substitut à la hiérarchie du contenu |

### La règle des poupées russes

Avant d’imbriquer plusieurs Décors, nomme le niveau porté par chacun.

Une structure comme :

```text
Backdrop
└── Panel
    └── Card
        └── Inset
```

peut être juste si elle représente réellement une scène, une section, une
unité répétable et une note secondaire.

Si chaque couche ne fait qu’ajouter une bordure, une ombre et du padding, le
montage raconte trop de choses pour trop peu de sens.

### La couleur et les effets

Les Décors acceptent des couleurs issues de l’Atelier d’animation et, selon
leur rôle, des variantes, intensités, textures ou effets.

Commence toujours par le rendu sans effet. Ajoute ensuite un seul signal
expressif dominant : accent, halo, grain, projecteur ou élévation.

---

## Les Écrans · 2 composants prêts et 1 esquisse

Les Écrans restituent une matière déjà préparée. Ils peuvent la cadrer, la
faire défiler ou lui donner une alternative accessible, mais ils ne la
réécrivent pas et ne décident pas de sa provenance.

| Composant       | Mission                              | Fichiers de référence                                                                                                |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `PixieAscii`    | Préserver une composition monospacée | [UI](../../src/components/ui/PixieAscii/) · [Dossier](../../src/app/atelier/_components/PixieAsciiDossier.tsx)       |
| `PixieMarkdown` | Restituer un document déjà analysé   | [UI](../../src/components/ui/PixieMarkdown/) · [Dossier](../../src/app/atelier/_components/PixieMarkdownDossier.tsx) |
| `PixieDustDocs` | Parcourir une bibliothèque résolue   | [UI](../../src/components/ui/PixieDustDocs/) · [Dossier](../../src/app/atelier/_components/PixieDustDocsDossier.tsx) |

### `PixieAscii` · composant `1.0.0`

Cette primitive reçoit uniquement une chaîne déjà autorisée. Elle préserve ses
espaces, tabulations et retours à la ligne, maîtrise ses débordements et exige
un nom accessible lorsque la composition informe. Une alternative détaillée
peut compléter ce nom sans faire épeler la grille. Elle ne lit aucun fichier
et ne connaît ni Markdown, ni Notion : ces responsabilités appartiennent au
domaine `Guidebook*` côté serveur.

La grille ASCII utilise une pile dédiée — Menlo, Monaco, Cascadia Mono,
DejaVu Sans Mono puis Courier New — distincte d’IBM Plex Mono. Les cartes
doivent malgré tout employer une largeur de ligne constante et considérer les
emojis comme des glyphes potentiellement larges.

Le contrat stable distingue le `label` court de l’`alternative` détaillée, mesure le
débordement réel avant d’ajouter le viewport au parcours clavier et indique les
directions qui demeurent hors champ. L’action de copie passe par `PixieButton`,
conserve la chaîne exacte et peut transmettre son état à la régie. À
l’impression, les contrôles et textures disparaissent afin que la grille soit
restituée sans bornes artificielles.

### `PixieMarkdown` · composant `1.0.0`

Cet Écran reçoit uniquement des `GuidebookBlock` déjà analysés, autorisés et
résolus côté serveur. Il restitue titres, paragraphes, citations, listes,
tâches, tableaux, code et séparateurs sans rouvrir la chaîne Markdown ni
injecter de HTML brut. Les compositions reconnues comme ASCII sont confiées à
`PixieAscii` avec l’alternative textuelle préparée par l’analyseur.

La mesure (`reading`, `wide`, `full`) et la densité (`compact`, `comfortable`,
`airy`) règlent son rythme général. Le contrat stable sépare
`headingOffset`, qui adapte la hiérarchie HTML au contexte d’insertion, de
`headingScale`, qui choisit seulement la présence visuelle `display`,
`reading` ou `compact`. Un chapitre enchâssé peut ainsi rester sémantiquement
juste sans réduire tous ses intertitres à des repères minuscules.

Les blocs techniques peuvent occuper tout le cadre ou rejoindre la mesure du
texte. Le code choisit entre défilement fidèle et repli, avec des numéros de
ligne purement visuels ; les tableaux conservent leur largeur naturelle ou
partagent le cadre en colonnes fixes. L’accent du registre éditorial traverse
citations, listes, tâches, séparateurs et `PixieAscii` sans porter seul le
sens. `anchorPrefix` évite les collisions lorsque plusieurs extraits partagent
une page. Un lien restreint ou invalide reste lisible, mais ne devient jamais
une cible interactive.

`PixieMarkdown` reste un composant serveur. Il ne connaît ni fichier, ni
Notion, ni arborescence, ni sommaire global, ni route : la bibliothèque et ses
contrôles appartiennent à `PixieDustDocs`.

### `PixieDustDocs` · esquisse `0.2.0`

Cet Écran compose une navigation hiérarchique, un document déjà rendu et le
sommaire issu de la même analyse. Son filtre ne porte que sur les titres déjà
transmis ; ses états, raccords précédent/suivant et régions sticky ne lui
donnent aucun accès aux sources.

La bibliothèque peut rester `inline` dans la grille ou devenir `floating` :
une languette ancrée au bord gauche du conteneur `PixieDustDocs` révèle alors
un `PixiePanel` fixe au pointeur et au clavier, tandis que le document récupère
la largeur qu’occupait sa colonne. Au repos, le panneau est entièrement
escamoté et seule sa languette droite demeure visible. Son déplacement reste
borné par les bords supérieur et inférieur du composant. `navigationWidth`
règle réellement les trois largeurs bornées dans les deux modes.

La v0.2.0 éprouve le même contrat sur `docs/agents/` et sur onze pages Notion
déclarées : la home du Disneyiste, le portail Vision & Doctrine et ses neuf
sous-pages. Les deux adaptateurs restent entièrement côté serveur : ils
autorisent, lisent, normalisent et résolvent avant de transmettre à Pixie une
navigation sans chemin local, identifiant Notion ni secret. `PixieDustDocs` ne
devient donc ni lecteur de fichier, ni client Notion, ni routeur Next.js.

---

## Les Dialogues · 6 composants prêts

Les Dialogues recueillent une intention humaine. Leur beauté ne vaut rien si
le libellé, la saisie, l’erreur ou l’état clavier se perdent.

| Composant          | Mission                                  | Fichiers de référence                                                                                                      |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `PixieField`       | Associer un contrôle à ses indications   | [UI](../../src/components/ui/PixieField/) · [Dossier](../../src/app/atelier/_components/PixieFieldDossier.tsx)             |
| `PixieInput`       | Recueillir une saisie courte             | [UI](../../src/components/ui/PixieInput/) · [Dossier](../../src/app/atelier/_components/PixieInputDossier.tsx)             |
| `PixieTextarea`    | Recueillir une réponse développée        | [UI](../../src/components/ui/PixieTextarea/) · [Dossier](../../src/app/atelier/_components/PixieTextareaDossier.tsx)       |
| `PixieSelect`      | Choisir une valeur dans une liste fermée | [UI](../../src/components/ui/PixieSelect/) · [Dossier](../../src/app/atelier/_components/PixieSelectDossier.tsx)           |
| `PixieSwitch`      | Activer ou désactiver une préférence     | [UI](../../src/components/ui/PixieSwitch/) · [Dossier](../../src/app/atelier/_components/PixieSwitchDossier.tsx)           |
| `PixieSearchField` | Composer une recherche complète          | [UI](../../src/components/ui/PixieSearchField/) · [Dossier](../../src/app/atelier/_components/PixieSearchFieldDossier.tsx) |

### `PixieField` est le chef de dialogue

`PixieField` relie le contrôle à :

- son label ;
- sa description ;
- son caractère obligatoire ou facultatif ;
- son méta-contenu ;
- son retour positif ou son avertissement ;
- son erreur et les attributs ARIA correspondants.

Il clone son unique contrôle enfant pour raccorder automatiquement les
identifiants et les descriptions.

```tsx
<PixieField
    controlId="titre"
    label="Titre de la fiche"
    description="Un titre documentaire, précis et sans effet d’annonce."
    required
>
    <PixieInput name="titre" autoComplete="off" />
</PixieField>
```

N’ajoute pas manuellement un second label visible autour du contrôle.

### Choisir le contrôle

| Question                                                          | Composant          |
| ----------------------------------------------------------------- | ------------------ |
| La réponse tient-elle sur une ligne ?                             | `PixieInput`       |
| La personne doit-elle développer une réponse ?                    | `PixieTextarea`    |
| Les options sont-elles connues et fermées ?                       | `PixieSelect`      |
| S’agit-il d’une préférence binaire à effet immédiat ?             | `PixieSwitch`      |
| Faut-il une recherche avec formulaire, soumission et effacement ? | `PixieSearchField` |

`PixieSelect` propose un mode `native` et un mode `popover`. Le mode natif
garde la plateforme au premier plan ; le popover permet une mise en scène plus
riche. Lorsque le popover risque d’être coupé par un conteneur, `portal` le
projette hors de cette limite.

`PixieSwitch` reste un vrai contrôle de formulaire. Son apparence de
commutateur ne dispense jamais d’un label accessible ni d’un état désactivé,
invalide ou en attente correctement annoncé.

`PixieTextarea` sait compter, s’agrandir et limiter ses lignes. Ces capacités
ne doivent être activées que lorsqu’elles servent le scénario de saisie.

---

## Le Montage · 9 composants prêts et 2 esquisses

Le Montage détermine comment les éléments se rencontrent. Il doit régler le
cadre avant que les composants métier n’inventent leurs propres marges.

| Composant           | Mission                                              | Fichiers de référence                                                                                                        |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `PixieContainer`    | Centrer et contenir une séquence                     | [UI](../../src/components/ui/PixieContainer/) · [Dossier](../../src/app/atelier/_components/PixieContainerDossier.tsx)       |
| `PixieStack`        | Régler le rythme d’une séquence verticale            | [UI](../../src/components/ui/PixieStack/) · [Dossier](../../src/app/atelier/_components/PixieStackDossier.tsx)               |
| `PixieCluster`      | Rassembler des éléments avec retour à la ligne       | [UI](../../src/components/ui/PixieCluster/) · [Dossier](../../src/app/atelier/_components/PixieClusterDossier.tsx)           |
| `PixieSection`      | Composer une séquence éditoriale complète            | [UI](../../src/components/ui/PixieSection/) · [Dossier](../../src/app/atelier/_components/PixieSectionDossier.tsx)           |
| `PixieGrid`         | Distribuer une collection sur une grille responsive  | [UI](../../src/components/ui/PixieGrid/) · [Dossier](../../src/app/atelier/_components/PixieGridDossier.tsx)                 |
| `PixieSidebar`      | Associer un contenu principal à une régie latérale   | [UI](../../src/components/ui/PixieSidebar/) · [Dossier](../../src/app/atelier/_components/PixieSidebarDossier.tsx)           |
| `PixieSwitcher`     | Changer de disposition selon l’espace disponible     | [UI](../../src/components/ui/PixieSwitcher/) · [Dossier](../../src/app/atelier/_components/PixieSwitcherDossier.tsx)         |
| `PixieRail`         | Dérouler une collection sur un travelling horizontal | [UI](../../src/components/ui/PixieRail/) · [Dossier](../../src/app/atelier/_components/PixieRailDossier.tsx)                 |
| `PixieStickyRegion` | Maintenir une région visible pendant le défilement   | [UI](../../src/components/ui/PixieStickyRegion/) · [Dossier](../../src/app/atelier/_components/PixieStickyRegionDossier.tsx) |

### La matrice du Montage

| Besoin spatial                                                    | Primitive           |
| ----------------------------------------------------------------- | ------------------- |
| fixer la largeur de lecture et les gouttières                     | `PixieContainer`    |
| espacer verticalement des éléments                                | `PixieStack`        |
| aligner des éléments qui peuvent revenir à la ligne               | `PixieCluster`      |
| réunir cadre, gouttière, rythme vertical et élément sémantique    | `PixieSection`      |
| distribuer des items selon une largeur minimale                   | `PixieGrid`         |
| préserver un contenu principal avec une zone latérale             | `PixieSidebar`      |
| basculer entre ligne et pile selon l’espace réellement disponible | `PixieSwitcher`     |
| conserver un déplacement horizontal intentionnel                  | `PixieRail`         |
| maintenir une régie ou un sommaire dans le viewport               | `PixieStickyRegion` |

### `PixieSection` est une composition, pas un doublon

`PixieSection` compose déjà `PixieContainer` et `PixieStack`. Ne les ajoute pas
autour d’elle sans besoin supplémentaire.

```tsx
<PixieSection width="72" gutter="lg" spacing="lg" gap="lg">
    <header>
        <p className="font-eyebrow">Archives</p>
        <h2>Les premières images retrouvent leur contexte</h2>
    </header>
    <CodexBlocsEditoriaux blocs={blocs} />
</PixieSection>
```

### `Grid`, `Switcher` ou `Rail` ?

- choisis `PixieGrid` quand tous les items appartiennent à une collection
  comparable qui doit se redistribuer ;
- choisis `PixieSwitcher` quand la relation ligne/pile dépend de l’espace, pas
  d’un breakpoint de page arbitraire ;
- choisis `PixieRail` lorsque le parcours horizontal fait partie de
  l’expérience et que les items doivent conserver une largeur lisible.

Ne transforme pas une grille trop large en rail uniquement pour éviter de
résoudre son responsive.

---

## Les Effets · 3 composants prêts

Les Effets rendent le système perceptible pendant qu’il travaille ou après
qu’il a agi.

| Composant       | Mission                                        | Fichiers de référence                                                                                                |
| --------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `PixieToast`    | Signaler brièvement le résultat d’une action   | [UI](../../src/components/ui/PixieToast/) · [Dossier](../../src/app/atelier/_components/PixieToastDossier.tsx)       |
| `PixieLoader`   | Matérialiser une attente de durée indéterminée | [UI](../../src/components/ui/PixieLoader/) · [Dossier](../../src/app/atelier/_components/PixieLoaderDossier.tsx)     |
| `PixieSkeleton` | Préserver la structure pendant le chargement   | [UI](../../src/components/ui/PixieSkeleton/) · [Dossier](../../src/app/atelier/_components/PixieSkeletonDossier.tsx) |

### Choisir le bon retour

| Situation                                                              | Primitive       | Contrat essentiel                                     |
| ---------------------------------------------------------------------- | --------------- | ----------------------------------------------------- |
| une action vient de réussir, échouer ou demander de l’attention        | `PixieToast`    | message bref, priorité juste, fermeture maîtrisée     |
| la durée est inconnue et aucune structure précise ne peut être montrée | `PixieLoader`   | attente nommée, mouvement non essentiel               |
| la forme du contenu à venir est connue                                 | `PixieSkeleton` | géométrie fidèle, espace réservé, pas de faux contenu |

Un Loader n’est pas une décoration d’attente permanente. Un Skeleton ne doit
pas inventer une page qui changera complètement à l’arrivée des données. Un
Toast ne doit pas contenir une décision indispensable que la personne pourrait
manquer.

Les variantes les plus magiques — poussière, projecteur, développement,
pellicule — restent subordonnées à trois garanties :

- un label ou une annonce pertinente ;
- un état statique ou simplifié sous mouvement réduit ;
- aucune perte d’information lorsque l’animation disparaît.

---

## Ce qui reste dans l’Atelier

Le programme contient aussi des hypothèses qui ne sont pas autorisées dans les
pages publiques.

### Esquisses actives

| Esquisse         | Version | Mission                                              | Fichiers                                                                                                               |
| ---------------- | ------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `PixieDustDocs`  | `0.2.0` | Parcourir une bibliothèque documentaire déjà résolue | [UI](../../src/components/ui/PixieDustDocs/) · [Dossier](../../src/app/atelier/_components/PixieDustDocsDossier.tsx)   |
| `PixieDustSplit` | `0.1.0` | Répartir deux zones en champ et contrechamp          | [UI](../../src/components/ui/PixieDustSplit/) · [Dossier](../../src/app/atelier/_components/PixieDustSplitDossier.tsx) |
| `PixieDustBleed` | `0.1.0` | Faire sortir une séquence de son cadre de lecture    | [UI](../../src/components/ui/PixieDustBleed/) · [Dossier](../../src/app/atelier/_components/PixieDustBleedDossier.tsx) |

Ces composants peuvent être étudiés, modifiés et comparés. Ils ne doivent pas
être projetés dans le Codex tant que leur promotion n’a pas été validée.

### Items encore à esquisser

**Dialogues** :

- `PixieDustCheckbox` ;
- `PixieDustRadioGroup` ;
- `PixieDustFilterChip` ;
- `PixieDustCombobox` ;
- `PixieDustRange`.

**Effets** :

- `PixieDustAlert` ;
- `PixieDustStatus` ;
- `PixieDustProgress` ;
- `PixieDustEmptyState` ;
- `PixieDustErrorSummary` ;
- `PixieDustLiveMessage` ;
- `PixieDustPresence` ;
- `PixieDustHighlight`.

Un nom dans cette liste exprime une intention de programme, pas une
autorisation de créer immédiatement le composant. Avant toute implémentation,
vérifie que le besoin n’est pas déjà couvert par une primitive stable ou par
une composition de primitives.

---

## Les motifs communs de l’API

Pixie évite une super-API universelle. Chaque composant expose ce dont son rôle
a besoin. Plusieurs motifs communs rendent néanmoins la famille prévisible.

### `as` : choisir la sémantique sans réécrire le rendu

Les composants structurels acceptent souvent un ensemble limité d’éléments
HTML : `section`, `article`, `aside`, `nav`, `ul` ou `ol` selon leur rôle.

Choisis `as` d’après le document, pas d’après le style désiré.

```tsx
<PixieStack as="ul" gap="md">
    {items.map((item) => (
        <li key={item.slug}>{item.label}</li>
    ))}
</PixieStack>
```

### `asChild` : transmettre la surface à un élément existant

`PixieCard` peut habiller son unique enfant sans ajouter un conteneur grâce à
`asChild`.

```tsx
<PixieCard asChild variant="tinted" color="gouache" padding="lg" effect="lift">
    <Link href="/oeuvres/snow-white-and-the-seven-dwarfs">
        <h3>Snow White and the Seven Dwarfs</h3>
        <p>Ouvrir la fiche</p>
    </Link>
</PixieCard>
```

L’enfant doit rester sémantiquement capable de porter la surface et ses
attributs.

### Les échelles nommées

Tailles, espacements, intensités, rayons et largeurs utilisent des unions
fermées comme `sm`, `md`, `lg` ou des choix métier explicites.

Ces échelles :

- empêchent la dérive des valeurs ;
- simplifient les playgrounds ;
- rendent l’intention lisible dans le JSX ;
- permettent de faire évoluer le rendu sans migrer chaque consommateur.

N’ajoute une valeur numérique libre que lorsque la primitive documente
explicitement cette possibilité, comme certains réglages de `PixieRail`,
`PixieLoader`, `PixieSkeleton` ou `PixieStickyRegion`.

### `color={false}` : laisser parler la Projection

Plusieurs primitives utilisent par défaut les couleurs sémantiques du thème.
Une couleur éditoriale n’est appliquée que lorsqu’un scénario de contenu la
justifie.

```tsx
<PixieBadge variant="soft" tone="neutral">
    En préparation
</PixieBadge>

<PixieBadge variant="solid" tone="color" color="gouache">
    Œuvre
</PixieBadge>
```

Ne passe pas une couleur à chaque composant par réflexe. L’absence de couleur
explicite est un choix de design valide.

### Les attributs natifs restent disponibles

Quand cela est pertinent, les props étendent les attributs de l’élément HTML
natif. Utilise-les : `name`, `autoComplete`, `disabled`, `required`,
`aria-*`, `type`, `id`, `href`.

Ne recrée pas un attribut natif sous un nouveau nom poétique.

### Les `data-*` rendent le contrat observable

Les composants exposent souvent leur variante, leur couleur ou leur état via
des attributs `data-pixie-*`.

Ils servent au diagnostic, à la mise en scène encapsulée et aux scénarios de
test. Ils ne constituent pas une base de données métier et ne doivent pas être
lus pour reconstruire l’état applicatif.

---

## Frontière serveur et îlots interactifs

La plupart des primitives peuvent être rendues depuis un composant serveur.
Au moment de cette édition, six implémentations Pixie déclarent directement
`"use client"` :

- `PixieSearchField` ;
- `PixieAscii` ;
- `PixieSelect` ;
- `PixieSwitch` ;
- `PixieTextarea` ;
- `PixieToast`.

Cette frontière vient de comportements internes comme le popover, la mesure,
l’auto-agrandissement, l’effacement, la temporisation ou le glissement.

Une page serveur peut les rendre avec des propriétés sérialisables. En
revanche, dès qu’elle leur transmet un callback — `onAction`, `onOpenChange`,
`onCheckedChange`, `onSubmit` — la portion qui porte cet état doit devenir un
îlot client.

```text
Page serveur
├── contenu documentaire
├── composants Pixie statiques
└── petit composant client
    └── état + callbacks + Pixie interactif
```

Ne convertis pas un dossier entier ou une page documentaire en composant
client pour ajouter un seul gestionnaire d’événement.

---

## Recettes de composition

Les recettes suivantes montrent des alliances, pas des templates obligatoires.

### Une collection éditoriale

```tsx
<PixieSection width="72" gutter="lg" spacing="lg" gap="lg">
    <header>
        <p className="font-eyebrow">Explorer</p>
        <h2>Les œuvres prennent place dans le registre</h2>
    </header>

    <PixieGrid as="ul" minItemWidth="md" maxColumns={3} gap="md">
        {oeuvres.map((oeuvre) => (
            <li key={oeuvre.slug}>
                <PixieCard as="article" padding="lg" effect="lift">
                    <PixieStack gap="sm">
                        <PixieBadge size="sm">{oeuvre.collection}</PixieBadge>
                        <h3>{oeuvre.titre}</h3>
                        <p>{oeuvre.accroche}</p>
                        <PixieLink
                            href={`/oeuvres/${oeuvre.slug}`}
                            variant="action"
                            indicator="arrow"
                        >
                            Ouvrir la fiche
                        </PixieLink>
                    </PixieStack>
                </PixieCard>
            </li>
        ))}
    </PixieGrid>
</PixieSection>
```

Répartition des responsabilités :

- `Section` porte le cadre éditorial ;
- `Grid` distribue la collection ;
- `Card` matérialise chaque unité ;
- `Stack` règle son rythme interne ;
- `Badge` qualifie ;
- `Link` conduit.

### Une régie latérale

```tsx
<PixieSidebar
    side="end"
    sideWidth="sm"
    contentMinWidth="two-thirds"
    gap="lg"
    sidebar={<PixieStickyRegion offset="lg">{regie}</PixieStickyRegion>}
>
    {projection}
</PixieSidebar>
```

`PixieSidebar` décide de la relation spatiale. `PixieStickyRegion` ne fait que
maintenir la régie visible lorsque l’espace et le défilement le permettent.

Toujours vérifier le comportement lorsque la colonne latérale repasse sous le
contenu ou lorsque le viewport est plus bas que la région sticky.

### Une recherche complète

```tsx
<PixieSearchField
    action="/recherche"
    method="get"
    name="q"
    label="Rechercher dans le Codex"
    placeholder="Une œuvre, un personnage, un créateur…"
    composition="joined"
    layout="responsive"
    clearable
    submitLabel="Rechercher"
/>
```

N’assemble pas manuellement `Input`, `Button`, label, effacement et feedback
si le scénario correspond déjà au contrat de `PixieSearchField`.

### Une attente qui préserve le cadre

```tsx
<section id="resultats" aria-busy="true">
    <PixieStack gap="md">
        <PixieLoader
            variant="sparkle"
            label="Les archives rejoignent la projection"
            motion="gentle"
            ariaControls="resultats"
        />
        <PixieSkeleton
            variant="text"
            lines={3}
            lastLineWidth="60%"
            decorative
        />
    </PixieStack>
</section>
```

Le Loader annonce l’opération. Le Skeleton réserve la forme. Évite que les
deux composants annoncent le même message aux technologies d’assistance.

---

## Concevoir une nouvelle esquisse

### 1. Décrire le problème sans nommer le composant

Mauvais départ :

> Nous avons besoin de `PixieDustCarousel`.

Meilleur départ :

> Une collection prioritaire doit rester parcourable horizontalement sans
> réduire ses cartes sous leur largeur de lecture.

Le second énoncé permet encore de découvrir que `PixieRail` couvre déjà le
besoin.

### 2. Auditer les primitives voisines

Pour chaque candidate, demande :

- quel rôle partage-t-elle avec le besoin ?
- où son contrat s’arrête-t-il ?
- une composition de deux primitives suffit-elle ?
- la nouvelle prop enrichirait-elle utilement l’existante ?
- le besoin est-il métier et devrait-il appartenir à `Codex…` plutôt qu’à
  `Pixie…` ?

### 3. Écrire le brief avant l’API

Le brief doit fixer :

- le verbe et la mission ;
- les usages ;
- les non-usages ;
- les scénarios témoins ;
- les états ;
- les variantes réellement distinctes ;
- le comportement responsive ;
- le clavier et les annonces ;
- le mouvement réduit ;
- les décisions à prendre avant promotion.

### 4. Proposer une API de choix, pas un pupitre infini

Une prop mérite d’exister lorsqu’elle :

- décrit un axe indépendant ;
- répond à plusieurs scénarios réels ;
- garde un ensemble de valeurs compréhensible ;
- peut être vérifiée dans l’Atelier ;
- ne permet pas de contourner la responsabilité du composant.

Évite les props comme `magic`, `pretty`, `fancy`, `compactButNotTooMuch` ou un
objet `styles` qui expose chaque détail interne.

### 5. Éprouver de la vraie matière

Une esquisse doit rencontrer :

- un contenu minimal ;
- un contenu long ;
- plusieurs éléments répétés ;
- un état désactivé, vide, invalide ou en attente selon son rôle ;
- les deux Lumières ;
- une largeur mobile ;
- le zoom à 200 % ;
- le clavier ;
- le mouvement réduit lorsqu’elle anime quelque chose.

Une belle vignette isolée ne valide pas un système.

---

## Étendre un composant stable

Une version `1.0.0` n’interdit pas l’évolution. Elle exige de distinguer
l’enrichissement de la rupture.

### Enrichissement compatible

Exemples :

- nouvelle valeur optionnelle avec un défaut inchangé ;
- état supplémentaire sans modifier les usages existants ;
- amélioration de rendu ou d’accessibilité ;
- nouvelle capacité additive qui respecte le rôle initial.

### Rupture de contrat

Exemples :

- suppression ou renommage d’une prop ;
- changement du défaut qui transforme toutes les projections ;
- modification de la structure sémantique attendue ;
- nouvelle contrainte sur les enfants ;
- comportement clavier différent.

Une rupture demande une stratégie de migration. Ne la dissimule pas dans un
raccord visuel.

### Le test des trois scènes

Avant d’ajouter une prop à un composant stable, trouve au moins trois scénarios
cohérents qui en ont besoin.

Si un seul écran la demande, commence par vérifier si ce réglage appartient au
composant métier ou à la composition locale.

---

## Accessibilité : la magie qui reste quand on ferme les yeux

### Sémantique

- un bouton reste un `button` ;
- un déplacement reste un lien ;
- une liste utilise une structure de liste ;
- un champ possède un label ;
- une surface décorative ne reçoit pas un rôle interactif ;
- `as` et `asChild` ne doivent pas dégrader le document.

### Clavier

- le focus suit l’ordre de lecture ;
- `Enter`, `Espace`, `Échap` et les flèches suivent les conventions du contrôle
  concerné ;
- aucun effet de hover ne cache une action au clavier ;
- un popover rendu dans un portail garde une navigation et un retour de focus
  cohérents ;
- une région sticky ne recouvre pas l’élément focalisé.

### Annonces

- une erreur est reliée au contrôle, pas seulement affichée à proximité ;
- un Toast choisit une priorité adaptée à son importance ;
- un Loader nomme l’attente lorsqu’elle doit être perçue ;
- un Skeleton décoratif reste silencieux ;
- une icône informative reçoit un nom ; une icône redondante reste décorative.

### Mouvement

La poussière, le halo, le projecteur, le lift ou le travelling doivent se
calmer sous `prefers-reduced-motion` sans retirer l’état, le message ou la
possibilité d’agir.

### Couleur

Une couleur éditoriale renforce une famille ou une intention. Elle ne porte
jamais seule :

- succès ou erreur ;
- sélection ;
- état actif ;
- niveau d’attention ;
- disponibilité d’une action.

---

## Définition d’une esquisse prête à être promue

### Rôle

- [ ] La mission tient en un verbe et une phrase.
- [ ] Les usages et les limites sont documentés.
- [ ] Le besoin n’est pas déjà couvert par une composition existante.
- [ ] La primitive ne contient aucune donnée métier du Codex.

### API

- [ ] Les axes de variation sont indépendants et nommés sémantiquement.
- [ ] Les défauts produisent le scénario le plus courant et le plus sobre.
- [ ] Les attributs natifs utiles sont transmis.
- [ ] Les types spécifiques vivent dans le dossier du composant.
- [ ] Le barrel expose uniquement l’API publique.

### Rendu

- [ ] Les deux Lumières sont éprouvées.
- [ ] Le contenu court, long, vide et dense reste stable.
- [ ] Mobile et zoom à 200 % ne provoquent ni collision ni perte d’action.
- [ ] Les effets ne remplacent pas la hiérarchie.
- [ ] Les tokens du système remplacent les valeurs de couleur improvisées.

### Interaction et accessibilité

- [ ] Le clavier couvre tout le parcours.
- [ ] Le focus est visible et non masqué.
- [ ] Les noms, descriptions, erreurs et états sont reliés.
- [ ] Le mouvement réduit conserve tout le sens.
- [ ] Les couleurs forcées gardent une structure utilisable.

### Documentation

- [ ] Le dossier suit le montage canonique de l’Atelier.
- [ ] Le playground synchronise contrôles, aperçu et code.
- [ ] Le générique technique reflète exactement les types.
- [ ] Les décisions ouvertes du journal ont reçu un verdict.
- [ ] Le nom, la version et l’état sont prêts à être raccordés partout.

---

## Anti-patterns à renvoyer aux oubliettes

### Le faux Pixie

Créer un composant préfixé `Pixie` directement en `1.0.0` sans esquisse, dossier
ni validation.

### La poussière en production

Importer un `PixieDust…` dans une page publique « juste pour cette fois ».

### Le composant métier déguisé

Ajouter dans `PixieCard` une prop `snowWhiteAwards` ou une connaissance des
catalogues du Codex.

### La prop valise

Introduire `options`, `config`, `appearance` ou `magic` pour éviter de nommer
les décisions de l’API.

### La div universelle

Utiliser `as="div"` partout, même lorsque le composant est une section, une
liste, une navigation ou un article.

### Le composant qui décide à la place du contenu

Transformer automatiquement une chaîne, déduire une relation ou inventer un
libellé métier depuis sa seule position visuelle.

### L’empilement de prestige

Ajouter `Backdrop`, `Panel`, `Card`, `Inset`, ombre, halo et grain pour donner
de l’importance à une information qui n’en a pas dans le récit.

### Le responsive réparé au dernier moment

Concevoir une scène large, puis cacher, tronquer ou faire défiler ce qui ne
tient plus sur mobile.

### La copie locale

Reproduire le CSS ou le JSX d’un Pixie dans un composant métier au lieu de
composer ou d’étendre la primitive officielle.

### Le barrel contourné

Importer le fichier d’implémentation interne et créer une dépendance sur son
organisation privée.

---

## Checklist de projection

Avant d’utiliser un composant Pixie dans une nouvelle scène :

### Disponibilité

- [ ] Son état est `Prêt à projeter` dans l’inventaire.
- [ ] Son nom ne commence plus par `PixieDust`.
- [ ] Son dossier contient les quatre fichiers canoniques.
- [ ] L’import passe par le barrel.

### Choix

- [ ] Sa mission correspond exactement au besoin.
- [ ] Une primitive plus simple ne suffirait pas.
- [ ] La sémantique HTML choisie correspond au document.
- [ ] Les valeurs par défaut ont été essayées avant d’ajouter des réglages.

### Composition

- [ ] Le Montage porte les espacements et la disposition.
- [ ] Chaque Décor représente un niveau réel.
- [ ] Les couleurs ont un rôle éditorial identifiable.
- [ ] Les effets restent secondaires.

### Expérience

- [ ] Le contenu réel remplace le lorem ipsum.
- [ ] Les états de chargement, d’erreur et de désactivation sont prévus.
- [ ] Le clavier, le focus et les annonces sont cohérents.
- [ ] Mobile, zoom à 200 %, mouvement réduit et deux Lumières sont vérifiés.

---

## Fichiers à ouvrir en premier

| Besoin                                             | Point d’entrée recommandé                                                                                |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Connaître l’état et la version d’un composant      | [`src/app/atelier/page.tsx`](../../src/app/atelier/page.tsx)                                             |
| Lire les règles impératives du cycle Pixie         | [`AGENTS.md`](../../AGENTS.md)                                                                           |
| Parcourir les primitives publiques                 | [`src/components/ui`](../../src/components/ui/)                                                          |
| Lire l’API d’un composant                          | son fichier `<NomComposant>.types.ts`                                                                    |
| Comprendre son rendu                               | son fichier `.tsx`, puis son module CSS                                                                  |
| Voir ses variantes et limites                      | [`src/app/atelier/_components`](../../src/app/atelier/_components/)                                      |
| Comprendre les couleurs disponibles                | [Chapitre 03](./03-direction-artistique-et-ui.md) et [`src/registry/colors`](../../src/registry/colors/) |
| Comprendre les symboles employés par `PixieSymbol` | [`src/registry/symbols`](../../src/registry/symbols/) et le chapitre suivant                             |

---

## Dernière transmission

Pixie n’est pas la fée. Pixie est le langage commun qui permet à sa poussière
de traverser le Codex sans perdre sa lumière en chemin.

`PixieDust` garde le droit d’essayer, de rater, de recommencer et de se
transformer. `Pixie` accepte une autre responsabilité : celle de tenir sa
promesse devant chaque Archive, chaque écran et chaque manière de regarder.

**Commence par le besoin. Donne-lui une forme. Éprouve-la dans l’Atelier. Puis,
seulement quand elle sait voler seule, ouvre-lui les portes du Codex.**

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                  ATELIER DE POUSSIÈRE PIXIE                 ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  MISSION      Transformer l’étincelle en contrat projetable  ║
║  ACCÈS        ESQUISSES · API · COMPOSANTS · PLAYGROUNDS     ║
║  PROTOCOLE    UN VERBE · UNE LIMITE · UNE PROMESSE TENUE     ║
║  STATUT       ✨ POUSSIÈRE D’ÉTOILE REÇUE                    ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Gardien des contrats Pixie · Poussière certifiée par Clochette_<br>
[Carte de studio réutilisable](../studio/snippets/carte-de-studio-guru-editions.md)
