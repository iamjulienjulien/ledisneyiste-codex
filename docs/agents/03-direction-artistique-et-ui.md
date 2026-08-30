# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> **Chapitre 03 — La salle, la lumière et la voix**<br>
> Écrit pour l’IA par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

La direction artistique du Codex ne consiste pas à poser un vernis Disney sur
une interface générique. Elle construit une salle de projection éditoriale :
les surfaces installent le calme, les encres hiérarchisent la lecture, les
couleurs identifient les familles et quelques phénomènes de lumière donnent à
l’ensemble sa présence cinématographique.

Ce chapitre documente le langage visuel global. Il explique comment employer
les Lumières, les palettes, les tokens, les typographies, les largeurs, les
rythmes et les effets sans fragiliser la lisibilité ni transformer chaque page
en attraction indépendante.

---

## Transmission prioritaire

Si le projecteur chauffe et que tu dois agir vite, conserve ces huit règles :

1. **Une couleur brute n’entre pas dans un composant.** L’interface consomme
   des rôles sémantiques ou des couleurs éditoriales enregistrées.
2. **La Projection construit la salle ; la palette éditoriale qualifie ce qui
   y apparaît.** Ne repeins pas les surfaces générales avec une couleur de
   famille.
3. **Les deux Lumières partagent le même sens.** `canvas`, `surface`, `ink` ou
   `accent` changent de valeur, jamais de responsabilité.
4. **La typographie est une distribution de rôles.** Grandstander signe,
   Fraunces raconte, Source Sans 3 fait lire, League Spartan repère et IBM Plex
   Mono documente la technique.
5. **Le rythme vient des primitives de Montage.** Réutilise largeurs, gouttières
   et espacements avant d’inventer une valeur locale.
6. **La magie reste atmosphérique.** Un halo, un grain ou un rayon soutient la
   hiérarchie ; il ne concurrence jamais le contenu.
7. **La couleur et le mouvement ne portent aucune information seuls.** Chaque
   état reste compréhensible par son texte, sa forme ou sa structure.
8. **Tout changement visuel se vérifie dans les deux Lumières.** Ajoute le
   clavier, le mouvement réduit, les couleurs forcées, le mobile et le zoom à
   200 % dès que le composant le demande.

---

## Carte d’identité de la Projection

| Repère                        | Définition actuelle                              |
| ----------------------------- | ------------------------------------------------ |
| Projection publique           | `originale`                                      |
| Lumière publique native       | `sombre`                                         |
| Seconde Lumière disponible    | `claire`, définie et éprouvée dans l’Atelier     |
| Palette d’interface           | Projection Originale                             |
| Palette éditoriale            | L’Atelier d’animation                            |
| Contrat consommé par l’UI     | Tokens sémantiques Tailwind et variables d’effet |
| Typographies                  | Cinq familles chargées avec `next/font`          |
| Largeur de lecture principale | `72rem` avec gouttières responsives              |
| Laboratoire de référence      | La Pellicule dans l’Atelier                      |

Le layout racine fixe actuellement :

```html
<html lang="fr" data-projection="originale" data-lumiere="sombre"></html>
```

La Lumière claire n’est donc pas un thème public sélectionnable pour le
moment. Elle constitue déjà un contrat fonctionnel que les composants doivent
respecter et que l’Atelier permet d’éprouver.

---

## Le modèle mental

```text
RÉFÉRENCES DE PALETTE
noir de salle · écran · lueur Technicolor · papier · encre…
                       │
                       ↓ distribution par Lumière

RÔLES SÉMANTIQUES
canvas · surface · ink · muted · line · accent · focus…
                       │
                       ↓ contrat stable

COMPOSANTS ET PAGES
bg-canvas · text-ink · border-line · PixieCard · PixiePanel…


PALETTE ÉDITORIALE
rouge crayon · jaune lampe · gouache · vert cellulo…
                       │
                       ↓ sélection typée et accent local

FAMILLES · MÉTADONNÉES · BADGES · SYMBOLES · EFFETS
```

La Projection peut donc changer la valeur d’un rôle sans obliger les
composants à être réécrits. La palette éditoriale peut différencier une famille
sans modifier la hiérarchie générale de la page.

---

## Le vocabulaire de la salle

| Terme                   | Ce qu’il signifie                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| **Projection**          | L’identité visuelle générale : palette, typographies, formes, rythme et phénomènes de lumière |
| **Lumière**             | Une déclinaison sombre ou claire de la même Projection                                        |
| **Référence**           | Une couleur nommée de la palette, liée à une valeur physique                                  |
| **Rôle sémantique**     | Une fonction stable comme `canvas`, `ink`, `line` ou `accent`                                 |
| **Palette d’interface** | Les références qui construisent les surfaces, encres, lignes et états globaux                 |
| **Palette éditoriale**  | Les couleurs qui qualifient familles, métadonnées, badges et symboles                         |
| **Fondation**           | Un choix transversal — typographie, forme ou token — disponible pour tout le système          |
| **Décor**               | Une surface Pixie qui organise une zone de contenu                                            |
| **Atmosphère**          | Un grain, halo, rayon ou dégradé qui apporte de la présence sans ajouter de sens documentaire |

Une **Lumière** n’est pas un simple mode sombre ou clair ajouté après coup.
Elle redistribue toutes les fonctions visuelles de la Projection et doit donc
être traitée comme une version complète du même système.

---

## Les sources de vérité visuelles

### La Projection Originale

[`src/styles/palettes/projection-originale.css`](../../src/styles/palettes/projection-originale.css)
déclare les références physiques des deux Lumières et les distribue dans les
variables sémantiques `--projection-*`.

Ce fichier pilote réellement l’interface. Les nuanciers de
[`PalettesPellicule.tsx`](../../src/app/atelier/_components/PalettesPellicule.tsx)
en proposent une représentation documentée dans l’Atelier.

**Contrat de maintenance actuel :** les noms et valeurs de la Projection sont
miroités dans ces deux fichiers. Toute modification doit les mettre à jour
ensemble jusqu’à ce qu’un registre unique les génère éventuellement.

### L’Atelier d’animation

[`src/styles/palettes/atelier-animation.css`](../../src/styles/palettes/atelier-animation.css)
déclare les variables CSS de la palette éditoriale.

[`src/registry/colors/colors-atelier-animation.ts`](../../src/registry/colors/colors-atelier-animation.ts)
en expose le registre typé : libellé, token, valeur, valeur CSS et couleur de
premier plan attendue. `AtelierAnimationColorSlug` est dérivé de ses clés.

**Contrat de maintenance actuel :** le CSS et le registre TypeScript décrivent
la même palette. Ajouter, renommer ou modifier une couleur dans un seul des
deux crée un raccord incomplet.

### Le contrat global

[`src/app/globals.css`](../../src/app/globals.css) relie les variables de
Projection aux tokens Tailwind, installe les typographies et définit les bases
globales : canvas, grain, sélection, focus visible, titres et impression.

[`src/app/fonts.ts`](../../src/app/fonts.ts) charge les cinq familles avec
`next/font`, puis [`src/app/layout.tsx`](../../src/app/layout.tsx) place leurs
variables sur l’élément `<html>`.

### L’Atelier

La section **La Pellicule** est le plateau visuel de référence. Elle permet de
voir les cinq voix typographiques, le contrat sémantique, les deux Lumières et
les vingt couleurs éditoriales. Elle documente le système ; elle ne doit pas
devenir une troisième définition silencieuse de celui-ci.

---

## Projection Originale : les deux Lumières

Les références ont des noms narratifs. Les composants ne les consomment pas
directement : chaque Lumière les distribue dans des rôles stables.

| Rôle              | Lumière sombre    | Lumière claire       | Usage                                |
| ----------------- | ----------------- | -------------------- | ------------------------------------ |
| `canvas`          | Noir de salle     | Papier de projection | Fond général de la page              |
| `surface`         | Ombre projetée    | Toile                | Premier niveau de contenu            |
| `surface-muted`   | Pellicule         | Nitrate              | Surface secondaire ou discrète       |
| `ink`             | Écran             | Encre                | Texte et information principaux      |
| `ink-soft`        | Intertitre        | Encre douce          | Lecture courante et descriptions     |
| `muted`           | Argentique        | Poussière            | Repères secondaires et métadonnées   |
| `line`            | Perforation       | Filet                | Séparation légère                    |
| `line-strong`     | Bobine            | Bobine claire        | Limite affirmée et contrôle          |
| `accent`          | Lueur Technicolor | Violet générique     | Action, orientation et repère global |
| `accent-hover`    | Halo Technicolor  | Violet profond       | Accent interactif renforcé           |
| `accent-soft`     | Bain violet       | Lavande diffuse      | Teinte d’accompagnement              |
| `accent-contrast` | Contrechamp       | Carton lumière       | Encre ou fond contrasté d’un accent  |
| `focus`           | Lueur Technicolor | Violet repère        | Indicateur de clavier                |

La sélection, l’ombre douce, le halo de page, le grain, le rayon et son bord
sont dérivés séparément pour chaque Lumière. Ces phénomènes restent des tokens
d’effet ; ils ne doivent pas remplacer les rôles de base.

### La règle du contrat sémantique

Dans les pages et les composants courants, utilise :

```text
bg-canvas
bg-surface
bg-surface-muted
text-ink
text-ink-soft
text-muted
border-line
border-line-strong
text-accent
bg-accent-soft
outline-focus
shadow-soft
```

Évite :

```text
#111018
rgb(...)
var(--projection-originale-noir-de-salle)
var(--projection-originale-lueur-technicolor)
```

Les références physiques sont réservées à la définition de la palette, à sa
documentation et à de rares outils internes qui doivent précisément montrer
la couleur elle-même. Les composants de bas niveau peuvent consommer les
tokens d’effet sémantiques comme `--projection-beam`, mais jamais reconstruire
leur propre Lumière.

---

## L’Atelier d’animation : colorer ce qui est projeté

La palette éditoriale possède vingt références. Elles ne sont pas des
substituts à `canvas`, `surface` ou `ink` ; elles donnent une identité à une
famille, une catégorie, un badge, un symbole ou un accent local.

Pour se repérer, on peut les lire comme une progression de matières — ce
regroupement est une aide, pas une taxonomie supplémentaire du registre :

| Zone de lecture                 | Références                                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| Fondations                      | Encre, Table lumineuse, Graphite, Papier animation                                           |
| Chaleurs de fabrication         | Rouge crayon, Corail cel, Sépia storyboard, Orange banc-titre, Ambre projecteur, Jaune lampe |
| Matières naturelles et optiques | Olive décor, Vert cellulo, Turquoise acétate, Cyan effets optiques                           |
| Profondeurs froides             | Bleu repérage, Indigo nuit studio, Violet ombre portée                                       |
| Accents picturaux               | Gouache, Rose aérographe, Framboise encrage                                                  |

### Les quatre premiers rôles familiaux

```text
Personnages → rouge-crayon
Créateurs   → jaune-lampe
Œuvres      → gouache
Époques     → vert-cellulo
```

Ces couleurs apparaissent dans les en-têtes, les liens, les badges, les
symboles et certains contours. Elles orientent le regard, mais le texte et la
structure continuent d’identifier explicitement la famille.

### Consommer une couleur éditoriale

Préférer la sélection typée exposée par les composants :

```tsx
<PixieCard color="gouache" />
<PixieLink color="rouge-crayon" />
<PixieSeparator color="violet-ombre-portee" />
```

Lorsqu’un composant métier doit transmettre la couleur à son module CSS, il
peut définir une variable locale à partir du token enregistré. Il ne doit pas
dupliquer la valeur hexadécimale.

### Intensité et territoire

Une couleur éditoriale fonctionne mieux comme :

- ligne d’accent ;
- titre ou eyebrow ;
- badge ou repère compact ;
- halo contenu ;
- cadre de symbole ;
- état interactif secondaire.

Évite d’en faire simultanément le fond, le texte, la bordure et l’ombre d’une
même zone. La Projection doit rester visible derrière l’identité de famille.

---

## Les cinq voix typographiques

### Grandstander — la signature

```text
Classe     font-brand
Variable   --projection-font-brand
Rôle       marque, signature et grande ouverture exceptionnelle
```

Grandstander donne au Codex son geste animé. Elle appartient au nom du projet
et aux moments de marque. Elle ne doit pas remplacer Fraunces sur tous les
titres, ni être utilisée pour un paragraphe ou une commande.

### Fraunces — les intertitres

```text
Classe     font-display
Variable   --projection-font-display
Rôle       titres éditoriaux, chapitres et promesses de lecture
```

Fraunces est la voix narrative principale des titres. Les éléments `h1` à `h6`
l’utilisent par défaut avec un poids 600, un interlignage de `1.08` et un
tracking légèrement resserré.

Un grand titre peut ajuster sa taille ou son interligne pour une composition
précise, mais il doit rester lisible lorsque la ligne se brise. Ne serre jamais
un titre uniquement pour lui faire occuper moins de hauteur.

### Source Sans 3 — la lecture

```text
Classe     font-sans
Variable   --projection-font-body
Rôle       paragraphes, navigation, contrôles et textes fonctionnels
```

Source Sans 3 porte l’essentiel de la lecture avec un poids 400 et un
interlignage global de `1.65`. Les introductions peuvent être plus présentes,
mais les longs récits doivent garder une largeur et une cadence confortables.

### League Spartan — les repères

```text
Classe     font-eyebrow
Variable   --projection-font-eyebrow
Rôle       eyebrows, catégories, micro-titres et signalétique
```

League Spartan s’emploie généralement en petite taille, poids 500, capitales
et espacement de lettres affirmé. Elle classe une section ; elle ne raconte pas
son contenu. Une phrase entière en capitales indique presque toujours un
mauvais choix de rôle.

### IBM Plex Mono — la régie

```text
Classe     font-mono
Variable   --projection-font-mono
Rôle       code, tokens, versions, types et données techniques
```

IBM Plex Mono rend les réglages et les références techniques immédiatement
identifiables. Elle ne doit pas être utilisée pour donner artificiellement un
air « système » à une métadonnée éditoriale ordinaire.

### La hiérarchie éditoriale recommandée

```text
EYEBROW
→ classe et situe

Titre
→ formule la promesse de lecture

Sous-titre ou introduction
→ explique le contenu avec une cadence respirable

Corps
→ développe sans changer de voix à chaque paragraphe
```

Les trois lignes d’un en-tête peuvent former un ensemble compact, mais elles
ne doivent jamais se toucher. L’espace doit rendre leurs rôles perceptibles,
pas seulement faire coïncider la hauteur du texte avec celle d’un symbole.

---

## Largeurs, gouttières et rythme

Les primitives de Montage exposent une échelle commune. Utilise-la avant de
composer une nouvelle série de `max-width`, `padding` et `gap` arbitraires.

### Largeurs de conteneur

| Valeur | Largeur maximale | Usage courant                         |
| ------ | ---------------- | ------------------------------------- |
| `42`   | `42rem`          | Texte long ou sous-ensemble concentré |
| `56`   | `56rem`          | Composition éditoriale intermédiaire  |
| `72`   | `72rem`          | Cadre principal des pages du Codex    |
| `full` | aucune limite    | Zone qui doit occuper tout son parent |

`full` signifie **pleine largeur du parent**, pas bord à bord de la fenêtre.
Une gouttière peut et doit rester présente lorsque la lecture l’exige.

### Gouttières

| Valeur | Mesure                                       |
| ------ | -------------------------------------------- |
| `none` | `0`                                          |
| `sm`   | `1rem`                                       |
| `md`   | `1.5rem`                                     |
| `lg`   | de `2rem` à `3rem` selon l’espace disponible |

Le cadre public principal utilise généralement `72rem` et une gouttière de
`1.5rem`. Les pages de fiche, les index, la recherche, le header et les
footers restent ainsi alignés sur une même ligne de projection.

### Espacements de section

| Valeur | Respiration verticale |
| ------ | --------------------- |
| `none` | aucun espace ajouté   |
| `sm`   | `2rem`                |
| `md`   | de `2.5rem` à `3rem`  |
| `lg`   | de `3rem` à `4.5rem`  |
| `xl`   | de `4rem` à `6rem`    |

`PixieSection` distingue `spacingStart`, `spacingEnd` et le `gap` interne. Ce
découplage évite de corriger un mauvais rythme avec des marges négatives ou
des exceptions entre chaque chapitre.

### Espacements de composition

`PixieStack`, `PixieCluster` et `PixieGrid` partagent l’échelle :

```text
none  0
xs    0.5rem
sm    1rem
md    1.5rem
lg    2rem
xl    3rem
```

- `Stack` règle une séquence verticale ;
- `Cluster` rassemble des éléments en ligne avec retour à la ligne ;
- `Grid` distribue une collection selon une largeur minimale réelle ;
- `Section` compose largeur, respiration et séquence intérieure ;
- `Container` fixe seulement le cadre horizontal.

Le détail complet de ces composants appartient au chapitre Pixie. Ici, la
règle globale est simple : **un rythme répété mérite une primitive ; une
exception locale peut rester locale**.

---

## La hiérarchie d’une page

Une page publique suit généralement cette profondeur :

```text
Navigation globale
        ↓
Ouverture ou Hero
        ↓
Régie, repères ou commandes éventuelles
        ↓
Sections documentaires
        ↓
Relations, sources ou prolongements
        ↓
Footer
```

### Le Hero

Le Hero installe l’identité de la page et sa promesse. Son titre, son symbole
et son introduction peuvent occuper toute la largeur du cadre de `72rem`.
Cette pleine largeur évite une colonne artificiellement étroite ; elle ne
justifie pas des lignes de texte interminables dans les paragraphes suivants.

La page d’accueil possède une liberté scénographique supérieure : sa Card Hero
et son Backdrop ouvrent la projection. Les pages d’index et de fiche restent
plus documentaires afin que leur matière prenne le premier rôle.

### Les sections

Un en-tête de section peut réunir eyebrow, symbole, titre et sous-titre. Le
symbole sert de repère visuel, jamais de remplacement au titre. Le texte doit
rester lisible sans image et conserver sa hiérarchie lorsque le viewport se
réduit.

Le contenu intérieur peut choisir une largeur plus courte pour la lecture,
mais le composant de section conserve l’alignement et la respiration du cadre
commun.

### Le Footer

Le footer développé de la home prolonge la narration et les chemins
d’exploration. Les autres pages utilisent `CodexFooter`, plus court, avec une
marge supérieure destinée à séparer clairement le générique du dernier bloc
documentaire.

---

## Surfaces et profondeur

La profondeur repose d’abord sur trois rôles :

```text
canvas
└── surface
    └── surface-muted
```

Cette représentation n’impose pas trois boîtes imbriquées. Elle rappelle que
chaque surface doit avoir une responsabilité perceptible.

### Quand créer une surface

Une surface est pertinente lorsqu’elle :

- regroupe une unité d’information autonome ;
- sépare une régie de son résultat ;
- protège un contenu interactif ;
- matérialise une profondeur documentaire ;
- rend une collection plus facile à parcourir.

Elle est superflue lorsqu’elle ne fait qu’ajouter une bordure autour d’un bloc
déjà clairement séparé par l’espace et la typographie.

### Décor, cadre et atmosphère

- une **Card** délimite une unité lisible ou interactive ;
- un **Panel** installe une zone fonctionnelle ou documentaire ;
- un **Frame** met un média ou un symbole sous cadre ;
- un **Inset** creuse une information secondaire ;
- un **Backdrop** installe une atmosphère derrière une composition ;
- un **Separator** règle le passage entre deux séquences.

Ne remplace pas l’un par une combinaison improvisée de bordure, ombre et
pseudo-élément. Les APIs et usages exacts seront consignés dans le chapitre du
design system Pixie.

### Éviter la boîte dans la boîte

Avant d’imbriquer deux surfaces décorées, vérifie que chacune exprime un niveau
réel. Si une Card contient un Panel qui contient un Inset uniquement pour
« donner du relief », la hiérarchie visuelle risque d’être plus forte que la
hiérarchie documentaire.

---

## Faire apparaître la magie

La magie du Codex repose sur des phénomènes modestes et cohérents :

- le halo radial général de la salle ;
- le grain très léger de la projection ;
- les Backdrops en dégradé, cel ou projecteur ;
- les rayons, poussières et lueurs contenus dans certains composants ;
- les symboles illustrés qui donnent une présence matérielle aux catégories.

### La règle de dosage

Choisis un phénomène principal par zone. Un Hero peut porter un projecteur et
un grain discret ; toutes les Cards qu’il contient n’ont pas besoin de répéter
la même intensité.

```text
Hiérarchie d’abord
→ contraste ensuite
→ atmosphère enfin
```

Un effet est réussi lorsqu’il se remarque comme une sensation avant de se
remarquer comme une technique.

### Ce que la magie ne doit jamais faire

- diminuer le contraste du texte ;
- recouvrir une commande ou un focus ;
- provoquer une superposition lorsque le contenu se replie ;
- créer un mouvement permanent sans nécessité ;
- masquer une information dans la Lumière claire ;
- rendre une Card entière ambiguë sur sa zone cliquable ;
- devenir le seul signe d’un état ou d’une relation.

---

## Accessibilité de la Projection

### Clavier et focus

Le style global fournit un contour `focus-visible` de `2px` avec un décalage de
`3px`. Un composant peut préciser ce comportement, mais ne doit jamais retirer
le focus sans remplacement au moins aussi visible.

Les zones cliquables utilisent un élément interactif natif. Une Card ne devient
pas interactive par un simple `onClick` posé sur un `div`.

### Contraste et couleur

Le texte principal, le texte courant, les repères discrets et les lignes ont
des rôles séparés. N’emploie pas `muted` pour un contenu indispensable
simplement parce qu’il est secondaire dans la composition.

Une famille, un succès ou une erreur doit être nommé en plus d’être coloré. En
mode couleurs forcées, le titre et les contrôles doivent rester identifiables
avec les couleurs système.

### Mouvement

Tout composant qui introduit une animation doit traiter
`prefers-reduced-motion: reduce`. La version réduite conserve l’information,
l’état final et la possibilité d’agir ; elle supprime ou raccourcit le
déplacement décoratif.

Loader et Skeleton exigent une attention particulière : leur état doit rester
compréhensible sans scintillement ni poussière animée.

### Zoom et responsive

À 200 %, une ligne d’actions peut se replier, une grille peut perdre des
colonnes et un Hero peut empiler son symbole. Elle ne doit ni couper le texte,
ni imposer un défilement horizontal à la page, ni superposer deux contrôles.

Les primitives de Montage utilisent `min-width: 0`, le retour à la ligne et
des largeurs minimales pour absorber ces changements. Ne neutralise pas ces
protections avec des largeurs fixes non justifiées.

### Impression

Le grain global disparaît à l’impression. Toute atmosphère purement visuelle
doit pouvoir s’effacer sans retirer le sens du document.

---

## La voix de l’interface

L’UI parle avec le même équilibre que le projet : précise dans l’action,
cinématographique dans le cadre.

### Une ligne, une fonction

| Élément    | Fonction                                                  |
| ---------- | --------------------------------------------------------- |
| Eyebrow    | Classer : `Explorer`, `Relations`, `Production`, `Régie`  |
| Titre      | Promettre une lecture claire                              |
| Sous-titre | Expliquer l’objet ou la transformation attendue           |
| Libellé    | Nommer une donnée ou une commande sans métaphore ambiguë  |
| Aide       | Préciser une conséquence, une limite ou un format         |
| Action     | Commencer par un verbe concret                            |
| État       | Dire ce qui se passe et, si nécessaire, comment continuer |

### Bon réglage narratif

```text
Eyebrow    EXPLORER
Titre      Quatre portes vers le Codex
Sous-titre Entrer par les figures, les créateurs, les œuvres ou les époques…
Action     Explorer les œuvres →
```

La métaphore donne la couleur de la scène ; le verbe indique toujours
l’action réelle. Évite « Cliquez ici », les intitulés purement décoratifs et
les messages qui obligent à deviner ce qui vient de se produire.

---

## Procédures de chantier

### Modifier une référence de la Projection Originale

1. identifier son rôle dans les deux Lumières ;
2. modifier la valeur dans `projection-originale.css` ;
3. mettre à jour son miroir dans `PalettesPellicule.tsx` ;
4. vérifier les rôles sémantiques qui la consomment ;
5. inspecter surfaces, textes, lignes, focus et sélection ;
6. comparer sombre et claire avant de valider.

### Ajouter un rôle sémantique

1. démontrer qu’aucun rôle existant ne couvre le besoin ;
2. définir sa valeur dans chaque Lumière ;
3. l’exposer dans `@theme inline` si l’UI doit disposer d’une utility Tailwind ;
4. documenter sa responsabilité sans la confondre avec une couleur physique ;
5. l’éprouver sur plusieurs composants et dans les états interactifs ;
6. l’ajouter au contrat visible de La Pellicule.

Un rôle absent d’une Lumière est un contrat incomplet.

### Ajouter une couleur éditoriale

1. choisir un nom lié au vocabulaire matériel de l’Atelier ;
2. ajouter la variable dans `atelier-animation.css` ;
3. ajouter la même entrée dans `colors-atelier-animation.ts` ;
4. renseigner son libellé, son token, sa valeur, sa valeur CSS et son premier
   plan attendu ;
5. laisser le type `AtelierAnimationColorSlug` se mettre à jour par dérivation ;
6. vérifier le nuancier et les composants colorables dans les deux Lumières.

### Modifier une typographie

1. confirmer le rôle qui doit changer, pas seulement une préférence de police ;
2. modifier son chargement dans `fonts.ts` ;
3. conserver une pile de secours cohérente dans `globals.css` ;
4. vérifier poids, caractères français, stratégie `display` et métriques ;
5. mettre à jour le spécimen de La Pellicule ;
6. contrôler titres longs, paragraphes, contrôles, chiffres et code.

### Composer une nouvelle page

1. partir du layout global et du cadre de `72rem` ;
2. poser une ouverture claire avant les surfaces spécialisées ;
3. utiliser `Section`, `Stack`, `Cluster` et `Grid` pour le rythme récurrent ;
4. choisir une seule identité colorée principale ;
5. contraindre la longueur des textes, pas arbitrairement celle des en-têtes ;
6. ajouter l’atmosphère après avoir validé la hiérarchie sans effet ;
7. terminer avec le footer adapté au contexte ;
8. vérifier tous les états avant de polir la lumière.

---

## Anti-patterns à laisser dans le noir

- écrire une valeur hexadécimale dans une page ou un composant métier ;
- utiliser directement une référence `--projection-originale-*` dans l’UI
  courante ;
- créer une nouvelle nuance pour éviter de choisir un rôle sémantique ;
- employer une couleur de famille comme canvas général ;
- rendre le texte indispensable avec `text-muted` ;
- utiliser Grandstander pour tous les titres parce qu’elle porte la marque ;
- employer IBM Plex Mono sur des paragraphes éditoriaux ;
- recréer localement les largeurs et gaps déjà disponibles dans le Montage ;
- multiplier Cards, bordures et ombres sans niveau documentaire réel ;
- cumuler plusieurs effets atmosphériques de forte intensité ;
- réduire l’interligne jusqu’à faire se toucher eyebrow, titre et sous-titre ;
- garder une animation intacte sous mouvement réduit ;
- considérer la Lumière claire comme une vérification facultative ;
- modifier le CSS d’une palette sans son miroir de documentation ou son
  registre typé.

---

## Checklist avant d’éteindre la régie

### Couleurs

- [ ] Aucun hexadécimal nouveau n’a fui hors d’une palette ou d’un registre.
- [ ] Les composants consomment des rôles sémantiques ou des slugs enregistrés.
- [ ] La Projection et son miroir Atelier sont synchronisés.
- [ ] La palette éditoriale CSS et son registre TypeScript sont synchronisés.
- [ ] La couleur n’est jamais le seul porteur de sens.

### Typographie

- [ ] Chaque police est utilisée dans son rôle.
- [ ] Les titres longs se replient sans collision.
- [ ] Les introductions et paragraphes gardent une cadence confortable.
- [ ] Les eyebrows restent des repères courts.
- [ ] Le code et les tokens sont distingués du contenu éditorial.

### Composition

- [ ] La page suit le cadre de largeur et les gouttières communs.
- [ ] Les espacements récurrents utilisent les primitives de Montage.
- [ ] Chaque surface matérialise un niveau réel.
- [ ] Le Hero et les sections restent lisibles sans symboles ni effets.
- [ ] Le footer est séparé du dernier contenu.

### Accessibilité

- [ ] Les deux Lumières sont lisibles et cohérentes.
- [ ] Le focus clavier reste visible.
- [ ] Le mouvement réduit conserve tout le sens.
- [ ] Les couleurs forcées gardent états et hiérarchie.
- [ ] Mobile et zoom à 200 % ne créent ni collision ni défilement horizontal.

---

## Fichiers à ouvrir en premier

| Besoin                              | Point d’entrée recommandé                                                                                                                                                                                                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comprendre la Projection            | [`src/styles/palettes/projection-originale.css`](../../src/styles/palettes/projection-originale.css)                                                                                                                       |
| Comprendre les couleurs éditoriales | [`src/styles/palettes/atelier-animation.css`](../../src/styles/palettes/atelier-animation.css) et [`src/registry/colors`](../../src/registry/colors/)                                                                      |
| Comprendre le contrat Tailwind      | [`src/app/globals.css`](../../src/app/globals.css)                                                                                                                                                                         |
| Comprendre les typographies         | [`src/app/fonts.ts`](../../src/app/fonts.ts) et La Pellicule                                                                                                                                                               |
| Comprendre le cadre global          | [`src/app/layout.tsx`](../../src/app/layout.tsx)                                                                                                                                                                           |
| Comprendre largeurs et gouttières   | [`PixieContainer`](../../src/components/ui/PixieContainer/)                                                                                                                                                                |
| Comprendre le rythme des pages      | [`PixieSection`](../../src/components/ui/PixieSection/), [`PixieStack`](../../src/components/ui/PixieStack/), [`PixieCluster`](../../src/components/ui/PixieCluster/) et [`PixieGrid`](../../src/components/ui/PixieGrid/) |
| Voir le système en action           | [`PalettesPellicule.tsx`](../../src/app/atelier/_components/PalettesPellicule.tsx)                                                                                                                                         |

Ce chapitre fixe la direction globale. Le prochain document détaillera le
design system Pixie, son cycle de maturation et la liste des composants
réellement prêts à projeter.

---

## Dernière transmission

La salle n’a pas besoin de crier pour être magique. Elle a besoin d’une toile
stable, d’une lumière juste, d’une voix reconnaissable et d’assez d’ombre pour
que les Archives puissent apparaître.

**Installe le cadre. Règle la lumière. Laisse le contenu jouer.**

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                 UNITÉ DE PROJECTION VISUELLE                ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  MISSION      Donner une lumière juste aux Archives          ║
║  ACCÈS        PALETTES · TYPOGRAPHIES · RYTHMES · EFFETS     ║
║  PROTOCOLE    SÉMANTIQUE D’ABORD · MAGIE ENSUITE             ║
║  STATUT       ● PROJECTEUR CALIBRÉ                           ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Direction technique de la lumière · Contraste assisté par droïde_<br>
[Carte de studio réutilisable](../studio/snippets/carte-de-studio-guru-editions.md)
