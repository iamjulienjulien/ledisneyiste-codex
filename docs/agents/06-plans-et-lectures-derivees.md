# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> Chapitre 06 — Les Plans, ou l’art de regarder les Archives autrement<br>
> Écrit pour l’IA par 🔩 R2-D2, Lead Dev chez Guru Éditions

---

> _Les Archives conservent la matière. Un Plan choisit où poser la caméra,
> combien de temps regarder et ce qu’il faut laisser hors champ. Il ne change
> jamais ce qui se trouvait devant l’objectif._

Ce chapitre documente le septième plateau de l’Atelier : **Les Plans**.

Un Plan est une lecture métier dérivée des Archives. Il reçoit un Sujet
publié, choisit un Angle et un Objectif, limite son Cadre, transforme une
Matière en modèle inspectable, puis rend la même lecture disponible dans un
contrechamp textuel.

Les cinq prototypes actuels sont des **esquisses privées en version `v0.1.0`**.
Ils partagent une grammaire commune, des dérivations pures, des Bobines témoins
et des garde-fous documentaires. Ils ne constituent pas encore des
fonctionnalités publiques du Codex.

Ce chapitre complète :

- [le chapitre consacré à l’esprit du projet](./01-esprit-du-projet.md), qui
  place les Archives avant le spectacle ;
- [le chapitre consacré à l’architecture](./02-architecture-du-codex.md), qui
  situe les Plans dans le trajet général des données ;
- [le chapitre consacré à la direction artistique](./03-direction-artistique-et-ui.md),
  qui définit la salle dans laquelle ils sont projetés ;
- [le chapitre consacré au design system Pixie](./04-design-system-pixie.md),
  dont les composants validés composent leurs interfaces ;
- [le chapitre consacré aux symboles](./05-symboles-registres-et-collections.md),
  qui leur fournit des signes originaux et typés.

Ici, nous répondons à la question suivante :

> **Comment proposer un nouveau regard sur les Archives sans créer de nouveau
> fait, dissimuler une incertitude ou confondre une expérience avec la vérité
> documentaire ?**

---

## Transmission prioritaire

Si le tournage commence dans cinq minutes, retiens ceci :

1. Un Plan **observe** les Archives ; il ne les modifie jamais.
2. Son contrat commun est `Sujet · Angle · Objectif · Cadre · Matière`.
3. Le Sujet appartient obligatoirement à l’un des quatre catalogues publiés :
   Personnages, Créateurs, Œuvres ou Époques.
4. L’Angle détermine le point de vue documentaire ; l’Objectif nomme l’action
   de lecture réellement proposée au public.
5. Le Cadre limite la projection. Une limite appliquée doit rester visible et
   ne transforme jamais un extrait en totalité implicite.
6. La Matière est soit `archives`, soit `bobine-temoin`. Ces deux origines ne
   sont jamais fusionnées silencieusement.
7. Toute relation, date, contribution ou preuve dérivée conserve une
   provenance explicite.
8. Une référence absente reste non résolue. Une contradiction reste une
   contradiction. Une source non classée reste non classée.
9. Le prototype visuel possède toujours un contrechamp textuel équivalent.
10. Le registre des Plans reste neutre : hypothèses, observations et verdicts
    vivent dans le Journal d’essai.
11. Les modèles sont calculés côté serveur ; la Régie cliente sélectionne et
    présente des projections déjà établies.
12. Les Bobines témoins éprouvent la forme. Elles ne rejoignent jamais les
    Archives ni les pages publiques.
13. Un Plan n’est ni un composant `Pixie`, ni une esquisse `PixieDust`. Il
    possède son propre dossier, son propre vocabulaire et son propre cycle.
14. Aucun Plan ne quitte l’Atelier sans décision éditoriale, validation de sa
    valeur documentaire et chantier de promotion explicite.

Et surtout :

> **La composition peut révéler une relation. Elle n’a pas le droit de
> l’inventer.**

---

## Ce qu’est un Plan

Un Plan est une fonction de lecture.

Il prend une matière déjà connue, applique des règles explicites et produit un
modèle adapté à une question documentaire.

```text
SUJET PUBLIÉ
        +
ANGLE · OBJECTIF · CADRE
        +
MATIÈRE IDENTIFIÉE
        │
        ▼
DÉRIVATION PURE
nœuds · liens · événements · crédits · preuves
        │
        ▼
MODÈLE DU PLAN
sélection · état · notices · provenance
        │
        ├──▶ PROJECTION VISUELLE
        │
        └──▶ CONTRECHAMP TEXTUEL ÉQUIVALENT
```

Un Plan peut :

- ordonner des jalons ;
- regrouper des voisins documentaires ;
- comparer plusieurs temporalités ;
- organiser un générique par métiers ;
- rapprocher des affirmations et leurs preuves ;
- signaler une limite, une absence, un cycle ou une contradiction ;
- offrir plusieurs réglages sur une même matière.

### Ce qu’un Plan n’est pas

Un Plan n’est pas :

- une nouvelle base de données ;
- un emplacement où corriger discrètement une Archive ;
- une visualisation libre de fabriquer ses propres relations ;
- un score de vérité ou d’importance ;
- une hiérarchie automatique entre personnes, œuvres ou sources ;
- une route publique déjà validée ;
- un composant UI générique ;
- une Bobine témoin déguisée en contenu réel.

---

## Le vocabulaire du plateau

| Terme                   | Définition                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| **Plan**                | Grammaire documentaire qui transforme une matière en lecture                                      |
| **Sujet**               | Entrée publiée autour de laquelle la lecture est construite                                       |
| **Angle**               | Point de vue documentaire appliqué au Sujet                                                       |
| **Objectif**            | Action de lecture proposée : suivre, comprendre, découvrir, situer, comparer, retrouver, vérifier |
| **Cadre**               | Limites visibles : profondeur, quantité, période, territoire ou regroupement                      |
| **Matière**             | Origine des données : Archives publiées ou Bobine témoin                                          |
| **Plan maître**         | Question centrale qui reste stable pendant les réglages                                           |
| **Régie**               | Contrôles qui permettent d’éprouver des configurations prévues                                    |
| **Contrechamp textuel** | Alternative structurée qui conserve le sens sans dépendre de la composition visuelle              |
| **Plan de coupe**       | État de disponibilité ou de densité de la matière                                                 |
| **Bobine témoin**       | Fixture synthétique, explicitement marquée et séparée des Archives                                |
| **Notice**              | Signal documentaire produit pendant la dérivation                                                 |
| **Journal d’essai**     | Lieu des hypothèses, observations, limites et verdicts expérimentaux                              |
| **Projection**          | Modèle dérivé pour une configuration précise, remis au prototype                                  |

Ces termes sont narratifs, mais chacun possède une traduction technique
concrète. Si une nouvelle expression ne peut pas être reliée à un type, une
règle ou une responsabilité, elle ne doit pas entrer dans le contrat commun.

---

## Les sources de vérité

| Source                                                                           | Responsabilité                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`src/registry/plans`](../../src/registry/plans/)                                | définit les cinq Plans, les 24 Angles et les 7 Objectifs                  |
| [`src/types/codex-plans.ts`](../../src/types/codex-plans.ts)                     | décrit la grammaire, la matière commune et les modèles spécialisés        |
| [`src/lib/plans/archives.ts`](../../src/lib/plans/archives.ts)                   | assemble la vue de travail des Archives                                   |
| [`src/lib/plans`](../../src/lib/plans/)                                          | dérive les matières communes et les cinq modèles                          |
| [`src/fixtures/plans`](../../src/fixtures/plans/)                                | fournit les huit Bobines témoins                                          |
| [`src/app/atelier/plans/[slug]`](../../src/app/atelier/plans/[slug]/)            | calcule les projections serveur et ouvre les cinq routes privées          |
| [`AtelierPlanDossier`](../../src/components/atelier/AtelierPlanDossier/)         | impose la structure documentaire commune des dossiers                     |
| composants `Atelier…Prototype`                                                   | assurent Régie, rendu interactif et contrechamp de chaque prototype       |
| [`scripts/verifier-plans.mjs`](../../scripts/verifier-plans.mjs)                 | valide le registre, les vocabulaires et l’absence de verdict expérimental |
| [`scripts/verifier-matiere-plans.mjs`](../../scripts/verifier-matiere-plans.mjs) | éprouve dérivations, provenance, Bobines et modèles spécialisés           |

### La règle d’arbitrage

- Le registre dit **ce qu’un Plan promet**.
- Les types disent **quelle forme cette promesse peut prendre**.
- Les Archives disent **quelle matière réelle est disponible**.
- Les dérivateurs disent **comment cette matière est transformée**.
- Le dossier d’Atelier dit **comment la promesse est expliquée et éprouvée**.
- Le prototype dit **comment une configuration devient perceptible**.
- Le Journal d’essai dit **ce que l’expérience nous apprend**.

Aucune de ces couches ne doit parler à la place d’une autre.

---

## Le contrat commun de configuration

Tous les Plans partent du même contrat :

```ts
export type CodexPlanConfiguration = Readonly<{
    plan: CodexPlanSlug;
    subject: CodexPlanSubject;
    angle: CodexPlanAngleSlug;
    objective: CodexPlanObjectiveSlug;
    frame: CodexPlanFrame;
    matter: CodexPlanMatter;
}>;
```

### `plan`

Le slug choisit la grammaire :

```ts
type CodexPlanSlug =
    | "travelling-documentaire"
    | "plan-d-ensemble"
    | "montage-du-temps"
    | "generique-vivant"
    | "table-lumineuse";
```

### `subject`

Le Sujet est une entrée publiée :

```ts
type CodexPlanSubject = Readonly<{
    family: CodexFamily;
    slug: string;
}>;
```

Les quatre familles actuellement admises sont :

- `personnages` ;
- `createurs` ;
- `oeuvres` ;
- `epoques`.

Une source, une récompense, une mention extérieure ou une référence non
résolue peut apparaître dans la matière d’un Plan. Elle ne devient pas pour
autant un Sujet publié.

### `angle`

L’Angle répond à la question : **sous quel point de vue lisons-nous ce
Sujet ?**

Le registre contient actuellement 24 Angles. Chaque Plan n’en autorise qu’un
sous-ensemble cohérent avec sa promesse.

### `objective`

L’Objectif répond à la question : **que permet concrètement cette lecture ?**

Les sept verbes disponibles sont :

- `follow` · Suivre ;
- `understand` · Comprendre ;
- `discover` · Découvrir ;
- `situate` · Situer ;
- `compare` · Comparer ;
- `find` · Retrouver ;
- `verify` · Vérifier.

Un Objectif n’est pas une formule promotionnelle. Le prototype doit réellement
permettre l’action annoncée.

### `frame`

Le Cadre porte un libellé, une description et, lorsque le Plan en a besoin,
une profondeur ou une limite :

```ts
type CodexPlanFrame = Readonly<{
    label: string;
    description: string;
    depth?: number;
    limit?: number;
}>;
```

Le Cadre ne supprime pas la matière. Il délimite ce que la projection choisit
de montrer. Toute troncature doit être conservée dans `selection` et signalée
par une notice.

### `matter`

La Matière est une union discriminée :

```ts
type CodexPlanMatter =
    | Readonly<{ kind: "archives" }>
    | Readonly<{
          kind: "bobine-temoin";
          fixture: CodexPlanBobineTemoinSlug;
      }>;
```

Cette distinction doit traverser la configuration, le modèle, l’interface et
le contrechamp. Elle ne peut jamais être réduite à un badge décoratif ajouté
après le calcul.

---

## Le Plan maître : une question qui ne bouge pas

Chaque définition possède :

- un nom ;
- une description ;
- une question ;
- une action ;
- le nom de son alternative textuelle ;
- une liste d’Angles ;
- une liste d’Objectifs ;
- la description de son Cadre ;
- la description de sa Matière.

La question reste stable lorsque la Régie change un filtre, une limite ou une
Lumière. Si un réglage transforme la question elle-même, il ne s’agit
probablement plus de la même configuration — voire plus du même Plan.

### Le test de la promesse

Avant de concevoir un Plan, complète cette phrase :

```text
Pour le Sujet <…>, le Plan aide à <Objectif>
en regardant <Angle>, dans les limites <Cadre>,
à partir de <Matière>, et restitue la même lecture sous forme <Contrechamp>.
```

Si une case reste décorative ou interchangeable, la grammaire n’est pas assez
précise.

---

## La vue de travail des Archives

[`codexPlanArchives`](../../src/lib/plans/archives.ts) rassemble :

- les quatre catalogues ;
- les fiches détaillées correspondantes ;
- le registre des récompenses ;
- le registre des sources.

```text
catalogues ─┐
fiches ─────┤
récompenses ├──▶ codexPlanArchives
sources ────┘
```

Cette vue n’est pas une nouvelle source de vérité. Elle offre aux fonctions
pures un point d’entrée cohérent vers les sources existantes.

Ne lui ajoute pas une donnée calculée uniquement pour simplifier un prototype.
Les calculs appartiennent aux dérivateurs ; les faits appartiennent aux
Archives qui les possèdent déjà.

---

## Les cinq matières communes

Avant de composer les cinq Plans, la couche pure dérive cinq familles de
matière réutilisables.

### Nœuds

Un `CodexPlanNode` représente une entité avec :

- un identifiant stable ;
- une nature ;
- un label ;
- un éventuel slug ;
- un état résolu ou non résolu ;
- le statut de Sujet publié ;
- des métadonnées ;
- une provenance.

Les natures couvrent personnages, contributeurs, œuvres, époques,
récompenses, sources, œuvres extérieures et références non résolues.

### Liens

Un `CodexPlanLink` représente une relation dirigée et nommée. Sa forme ne
dépend pas de la manière dont le prototype la dessinera.

La proximité à l’écran ne crée jamais un lien. Seul un raccord dérivé d’une
relation ou d’une règle explicite entre dans cette matière.

### Événements

Un `CodexPlanEvent` conserve :

- la nature de l’événement ;
- le Sujet concerné ;
- une date et sa précision réelle ;
- une éventuelle fin ;
- le caractère exclusif de cette fin ;
- le territoire ou le lieu lorsqu’ils existent ;
- la provenance.

Une année ne devient pas artificiellement un jour. Une contradiction de dates
ne doit pas être résolue par le tri de l’interface.

### Crédits

Un `CodexPlanCredit` relie une œuvre à une personne, à un ou plusieurs rôles et
éventuellement à un domaine. Une co-présence ne prouve ni collaboration
directe, ni hiérarchie, ni importance relative.

### Preuves

Un `CodexPlanEvidence` relie une affirmation ou un champ à ses sources, à son
état documentaire, à la position de ces sources et à leur classification.

Il distingue notamment :

- documenté, partiellement résolu ou non documenté ;
- soutient, nuance, contredit, reste non concluant ou non classé ;
- source primaire, secondaire, base de données, interprétation éditoriale ou
  non classée.

Le modèle conserve l’absence de classification. Il ne la remplit pas par
défaut pour rendre le tableau plus propre.

---

## La provenance et les notices

### Provenance

Chaque matière dérivée porte une ou plusieurs provenances :

| Nature                | Signification                                                 |
| --------------------- | ------------------------------------------------------------- |
| `sourced-fact`        | fait rattaché à des sources identifiées                       |
| `editorial-relation`  | relation éditoriale explicitement déclarée                    |
| `derived-aggregation` | regroupement ou calcul produit à partir de données existantes |
| `uncertainty`         | limite, absence ou ambiguïté conservée                        |
| `bobine-temoin`       | matière synthétique réservée aux essais                       |

La provenance n’est pas une note interne facultative. Elle permet au Plan de
dire pourquoi un élément apparaît.

### Notices

La dérivation peut émettre :

- `limit-applied` ;
- `unresolved-reference` ;
- `unresolved-source` ;
- `missing-sources` ;
- `source-classification-unavailable` ;
- `cycle-detected` ;
- `orphan-node` ;
- `date-conflict` ;
- `bobine-temoin-active`.

Une notice ne doit pas être masquée parce qu’elle dérange la composition. Elle
fait partie de la lecture documentaire.

### Sélection

Les modèles qui limitent une collection conservent :

```ts
type CodexPlanDerivationSelection = Readonly<{
    total: number;
    returned: number;
    limit?: number;
    truncated: boolean;
}>;
```

Ainsi, « 12 éléments affichés » ne peut jamais être confondu avec « 12
éléments existent ».

---

## Les huit Plans de coupe

Les états runtime décrivent la disponibilité ou la densité de la matière. Ils
ne jugent jamais la valeur du Sujet.

| État         | Lecture                                           |
| ------------ | ------------------------------------------------- |
| `idle`       | en attente d’un Sujet                             |
| `loading`    | la matière rejoint le plateau                     |
| `ready`      | le Plan peut être parcouru                        |
| `empty`      | aucune matière ne répond au Cadre                 |
| `sparse`     | matière trop légère pour la composition complète  |
| `dense`      | matière abondante à hiérarchiser                  |
| `incomplete` | Archives, références ou preuves encore partielles |
| `error`      | projection impossible à établir                   |

`empty` ne signifie pas « le Sujet n’a aucune histoire ». `sparse` ne signifie
pas « le Sujet est peu important ». `incomplete` ne constitue pas une
condamnation éditoriale.

Le texte visible doit toujours employer une formulation qui décrit le corpus
et le Cadre, jamais la valeur culturelle du Sujet.

---

## Les cinq Plans actuels

### Vue d’ensemble

| Plan                    | Question maîtresse                                     | Action   | Contrechamp                          |
| ----------------------- | ------------------------------------------------------ | -------- | ------------------------------------ |
| Travelling documentaire | Par quel chemin le Sujet se prolonge-t-il ?            | Suivre   | Parcours ordonné et justifié         |
| Plan d’ensemble         | Quel voisinage documentaire entoure le Sujet ?         | Situer   | Liste relationnelle groupée          |
| Montage du temps        | Comment plusieurs temporalités se répondent-elles ?    | Comparer | Chronologie structurée par pistes    |
| Générique vivant        | Comment une production s’organise-t-elle humainement ? | Explorer | Crédits groupés par métiers          |
| Table lumineuse         | Sur quelles preuves le récit repose-t-il ?             | Vérifier | Registre des affirmations et sources |

Tous les prototypes utilisent actuellement _Snow White and the Seven Dwarfs_
comme Sujet réel commun. Ce choix permet de comparer les grammaires sur une
matière riche sans prétendre que cette œuvre définit tous les cas futurs.

---

## 01 · Travelling documentaire

Le Travelling transforme des nœuds et relations en séquence de jalons.

Sa promesse est de **suivre** un prolongement documentaire : filiation,
adaptation, influence, réception ou transmission.

### Ce qu’il produit

- des étapes ordonnées ;
- des zones d’origine, de laboratoire et de destination ;
- des raccords nommés ;
- les preuves disponibles ;
- une sélection et ses limites ;
- les cycles et nœuds orphelins conservés comme signaux.

### Ce qu’il refuse

- transformer un ordre de lecture en causalité historique ;
- relier deux étapes par leur seule proximité ;
- cacher un embranchement pour fabriquer un récit plus fluide ;
- rendre cliquable une référence qui ne possède pas de fiche publiée.

### Question de revue

> Le parcours raconte-t-il ce que les relations établissent, ou ce que la
> mise en scène aimerait qu’elles établissent ?

---

## 02 · Plan d’ensemble

Le Plan d’ensemble maintient le Sujet au centre et distribue son voisinage en
constellations documentaires.

Ses Angles couvrent personnes, œuvres, personnages, récompenses, sources et
relations.

### Ce qu’il produit

- un Sujet et un focus ;
- des groupes de voisinage ;
- des relations entrantes ou sortantes ;
- une profondeur explicite ;
- une limite visible ;
- les preuves disponibles ;
- les cycles et orphelins détectés.

### Ce qu’il refuse

- faire de la position centrale un classement d’importance ;
- présenter la densité comme une popularité ;
- déduire une hiérarchie d’un nombre de raccords ;
- masquer qu’une constellation est tronquée.

### Réglages structurants

La direction `all`, `incoming` ou `outgoing`, la profondeur et la limite
modifient réellement le Cadre. Elles ne doivent jamais réécrire les relations
sources.

---

## 03 · Montage du temps

Le Montage du temps aligne plusieurs temporalités sur une règle commune sans
aplatir leur précision.

Il distingue fabrication, diffusion, réception, postérité et transformation.

### Ce qu’il produit

- des pistes temporelles ;
- des événements classés ;
- des bornes calculées ;
- des territoires et lieux lorsque disponibles ;
- un état documentaire par événement ;
- des groupes de contradictions.

### Ce qu’il refuse

- convertir une année en date exacte ;
- imposer un ordre faux à deux dates contradictoires ;
- confondre sortie, diffusion et reconnaissance ;
- supprimer un événement parce qu’il ne rentre pas dans une précision
  graphique uniforme.

### Règle de montage

L’axe visuel peut adapter son échelle. La valeur documentaire de la date,
elle, reste inchangée.

---

## 04 · Générique vivant

Le Générique vivant rend une production lisible à hauteur humaine.

Il regroupe les contributions selon métiers, départements, responsabilités,
collaborations ou récurrences.

### Ce qu’il produit

- des contributions reliées à une personne et une œuvre ;
- des rôles documentés ;
- des domaines dérivés ;
- des groupes inspectables ;
- une clé de recherche ;
- des statistiques de résolution et de densité.

### Ce qu’il refuse

- transformer l’ordre du générique en hiérarchie de mérite ;
- conclure qu’une co-présence prouve une collaboration directe ;
- inventer un département absent des règles de regroupement ;
- supprimer les personnes non résolues pour rendre la liste plus propre.

### Règle humaine

Retrouver une personne ne signifie pas mesurer son importance. Comparer deux
groupes ne signifie pas les mettre en concurrence.

---

## 05 · Table lumineuse

La Table lumineuse relie les affirmations aux preuves qui les soutiennent, les
nuancent, les contredisent ou ne permettent pas encore de conclure.

### Ce qu’elle produit

- des affirmations ou champs documentaires ;
- leurs sources résolues et non résolues ;
- un état de documentation ;
- une position de preuve ;
- une classification de source ;
- les faits structurés concernés ;
- des statistiques de couverture et d’incertitude.

### Ce qu’elle refuse

- calculer un score de vérité ;
- décider qu’une source primaire a automatiquement raison ;
- classer une source dont la nature n’est pas documentée ;
- résoudre une contradiction par majorité ;
- assimiler absence de source et fausseté.

### Règle de lumière

La Table rend les preuves inspectables. Elle ne prononce pas de verdict à la
place du travail éditorial.

---

## Les Bobines témoins

Une Bobine témoin est une fixture synthétique et versionnée. Sa provenance est
toujours `bobine-temoin`, ses nœuds ne sont jamais des Sujets publiés et son
activation produit une notice visible.

### Les huit Bobines actuelles

| Bobine                                | Ce qu’elle éprouve principalement                          |
| ------------------------------------- | ---------------------------------------------------------- |
| `corpus-vide`                         | absence de résultat, clavier et petit écran                |
| `corpus-reduit`                       | résultat unique ou presque, sans surjouer la densité       |
| `corpus-dense`                        | hiérarchie, filtres, performance et voisinage encombré     |
| `cycles-et-orphelins`                 | cycles relationnels et nœuds isolés                        |
| `dates-partielles-et-contradictoires` | précisions temporelles et désaccords                       |
| `grand-generique`                     | 240 crédits, recherche, regroupements et libellés extrêmes |
| `preuves-contrastees`                 | convergence, nuance, contradiction et absence              |
| `accessibilite-sous-contrainte`       | ordre long, clavier, mouvement réduit et petit écran       |

### Contrat d’isolation

Une Bobine témoin :

- vit sous `src/fixtures/plans` ;
- annonce les Plans qu’elle peut éprouver ;
- annonce les stress cases qu’elle couvre ;
- possède des identifiants uniques ;
- n’utilise que de la provenance synthétique ;
- ne marque aucun nœud comme Sujet publié ;
- ne rejoint jamais `src/data` ;
- reste visiblement nommée « Bobine » dans la Régie.

Le sujet publié et les Archives peuvent rester disponibles à la dérivation
pour établir le contexte. La matière synthétique remplace la matière observée
pour l’essai ; elle ne fusionne pas avec elle.

---

## Le trajet serveur → Régie → projection

La route dynamique privée :

```text
/atelier/plans/[slug]
```

est statiquement limitée aux cinq slugs connus. Ses métadonnées demandent aux
robots de ne ni indexer ni suivre ces pages.

### Côté serveur

La route :

1. valide le slug ;
2. lit la définition du registre ;
3. construit les configurations admises ;
4. sélectionne Archives ou Bobine ;
5. appelle le dérivateur pur ;
6. remet une collection de modèles déjà calculés au prototype.

### Côté client

Le prototype :

- choisit parmi les projections reçues ;
- règle la Lumière et les contrôles visuels ;
- filtre ou présente les structures prévues par son modèle ;
- maintient le contrechamp textuel ;
- annonce les changements d’état utiles.

Il ne doit pas reconstruire silencieusement les Archives dans un composant
client, ni recalculer une relation métier à partir du DOM.

### Pourquoi cette frontière compte

- la matière reste testable sans navigateur ;
- les modèles sont déterministes ;
- le bundle client ne transporte pas inutilement tous les registres ;
- la Régie reste une interface d’exploration, pas une seconde couche métier ;
- le même modèle peut alimenter visualisation et contrechamp.

---

## L’anatomie d’un dossier de Plan

[`AtelierPlanDossier`](../../src/components/atelier/AtelierPlanDossier/)
impose une structure commune :

1. **Ouverture** — identité, statut, programme, version et slug ;
2. **Contrat de lecture** — question, action et contrechamp ;
3. **Plan maître** — promesse documentaire stable ;
4. **Prototype** — Régie et projection interactive lorsqu’elles existent ;
5. **Champ** — ce que le Plan montre ;
6. **Hors-champ** — ce qu’il refuse d’inventer ;
7. **Régie** — familles de Sujet, Angles et Objectifs admis ;
8. **Contrechamp textuel** — lecture équivalente ;
9. **Plans de coupe** — états runtime ;
10. **Bobine témoin** — contrat de démonstration ;
11. **Accessibilité et continuité** ;
12. **Générique technique** — configuration commune ;
13. **Journal d’essai** ;
14. **Dernière image**.

Cette structure est le modèle de fiche propre aux Plans. Ne la remplace pas
par une fiche Pixie : un Plan documente une promesse métier, pas une API de
composant générique.

---

## Le contrechamp textuel

Le contrechamp n’est ni une légende courte ni un résumé de secours. Il porte
la **même lecture** que la composition principale.

Il doit conserver :

- l’ordre ;
- les groupes ;
- les noms de relations ;
- les limites de sélection ;
- les références résolues ou non résolues ;
- les preuves ;
- les contradictions ;
- la provenance et les notices significatives.

### Test d’équivalence

Cache entièrement la visualisation et lis uniquement le contrechamp.

Le public doit encore pouvoir répondre à la question maîtresse du Plan. Si la
réponse dépend d’une position, d’une couleur, d’un trait ou d’une animation,
le contrechamp est incomplet.

---

## Accessibilité et continuité

### Structure

- l’ordre du document reste compréhensible sans CSS ;
- chaque groupe possède un titre ;
- les relations sont écrites ;
- les compteurs précisent ce qu’ils mesurent ;
- les notices sont associées à la projection concernée.

### Clavier

- tous les contrôles sont atteignables ;
- l’ordre de focus suit l’ordre de lecture ;
- aucun parcours n’exige un glisser-déposer ;
- les liens résolus sont identifiables ;
- une référence non résolue n’imite pas un lien.

### Mouvement

- aucune animation n’est nécessaire pour comprendre la structure ;
- `prefers-reduced-motion` conserve tous les jalons et états ;
- un travelling réduit reste un parcours, pas une image vidée de ses raccords.

### Responsive et zoom

- les pistes temporelles possèdent une alternative lisible ;
- les constellations deviennent des groupes sans perdre leurs relations ;
- les longs libellés ne sont pas tronqués sans accès au texte complet ;
- la Régie se réorganise sans séparer un contrôle de son libellé ;
- le zoom à 200 % ne crée pas de défilement horizontal obligatoire pour lire
  le contrechamp.

### États dynamiques

Lorsque la Régie change de projection, l’état utile doit être annoncé sans
faire relire toute la page. La visualisation et le contrechamp doivent pointer
vers le même modèle actif.

---

## Le Journal d’essai et les verdicts

Le type `CodexPlanVerdict` prévoit quatre issues expérimentales :

- `pursue` ;
- `transform` ;
- `defer` ;
- `abandon`.

Mais le vérificateur interdit un champ `verdict` dans le registre neutre des
Plans.

Cette séparation est volontaire :

```text
REGISTRE
décrit la promesse stable du Plan

JOURNAL D’ESSAI
consigne hypothèse · observation · limite · décision
```

Un prototype peut être transformé ou abandonné sans que l’histoire soit
réécrite. Le registre ne doit pas se comporter comme un tableau de gestion de
projet.

---

## Concevoir un nouveau Plan

### 1. Partir d’une question documentaire

La question doit révéler une lecture que les fiches et index actuels ne
permettent pas déjà suffisamment.

Mauvais départ :

> « Nous pourrions faire un beau diagramme radial. »

Bon départ :

> « Comment rendre visible la circulation documentée d’un motif entre
> plusieurs œuvres sans en déduire une influence ? »

### 2. Rédiger le contrat avant le prototype

Définis :

- le nom et le slug ;
- la question maîtresse ;
- l’action ;
- le contrechamp ;
- les Sujets admis ;
- les Angles ;
- les Objectifs ;
- le Cadre ;
- la Matière nécessaire ;
- le Hors-champ ;
- les états runtime ;
- les risques documentaires ;
- les Bobines prioritaires.

Le brief détaillé vit dans le dossier de conception du studio avant que le
registre ne promette quoi que ce soit.

### 3. Éprouver la grammaire commune

N’ajoute un nouveau champ commun que s’il est nécessaire à plusieurs Plans.
Une option propre au prototype reste dans son type spécialisé.

### 4. Étendre les types

Ajoute :

- le slug du Plan ;
- ses éventuels Angles ou Objectifs nouveaux ;
- son modèle spécialisé ;
- sa source de matière discriminée ;
- ses options propres.

Ne transforme pas `CodexPlanConfiguration` en sac de réglages universel.

### 5. Enregistrer la promesse

Ajoute la définition à `src/registry/plans/plans.ts`, sans verdict ni état de
gestion.

Le vérificateur exige notamment :

- tous les champs textuels ;
- au moins un Angle ;
- au moins un Objectif ;
- des références connues et non dupliquées ;
- l’utilisation effective de chaque terme du vocabulaire.

### 6. Dériver la matière

Réutilise nœuds, liens, événements, crédits et preuves avant de créer un
nouveau format commun. La fonction spécialisée transforme cette matière en
modèle de lecture, sans mutation et avec un ordre déterministe.

### 7. Préparer les Bobines

Choisis les stress cases réellement dangereux. Étends une Bobine existante si
elle exprime déjà le problème ; crée-en une nouvelle seulement lorsque le
corpus synthétique possède une responsabilité distincte.

### 8. Créer le dossier et le prototype

- la route reste privée ;
- `AtelierPlanDossier` porte les sections communes ;
- le composant spécialisé porte la Régie et la projection ;
- seuls des composants `Pixie…` validés sont considérés comme stables ;
- le contrechamp consomme le même modèle ;
- les notices restent visibles.

### 9. Étendre les contrôles

Ajoute le Plan aux listes attendues et vérifie :

- grammaire ;
- déterminisme ;
- identifiants ;
- provenance ;
- limites ;
- états ;
- Bobines compatibles ;
- modèle Archives ;
- modèles synthétiques prioritaires.

### 10. Décider après observation

Consigne ce qui fonctionne, ce qui déforme la lecture et ce qui reste
inconnu. Le prototype n’est pas promu par inertie parce qu’il existe.

---

## Modifier un Plan existant

### Changement de présentation

Si le modèle possède déjà l’information :

- modifie le prototype ;
- conserve le dérivateur ;
- vérifie visualisation et contrechamp ;
- éprouve les deux Lumières et les Bobines concernées.

### Changement de lecture

Si l’Angle, le Cadre ou la règle de sélection change :

- modifie le contrat ou les options spécialisées ;
- adapte le dérivateur pur ;
- ajoute un cas au vérificateur ;
- vérifie que les anciennes configurations gardent leur sens.

### Nouveau fait nécessaire

Si le Plan révèle une absence dans les Archives :

1. consigne la limite ;
2. ouvre un chantier éditorial distinct ;
3. trouve et enregistre les sources ;
4. modifie la source de vérité propriétaire ;
5. laisse ensuite le Plan redériver le résultat.

Ne corrige jamais l’Archive depuis le prototype ou sa fixture.

---

## Les garde-fous automatisés

### Grammaire

```bash
pnpm check:plans
```

Le contrôle valide actuellement :

- 5 Plans ;
- 24 Angles ;
- 7 Objectifs ;
- les champs obligatoires ;
- l’absence de doublons ;
- l’absence de vocabulaire inutilisé ;
- l’interdiction des verdicts dans le registre.

### Matière

```bash
pnpm check:plan-matter
```

Au moment de cette transmission, le contrôle éprouve :

- 274 nœuds ;
- 375 liens ;
- 185 événements ;
- 108 crédits ;
- 299 preuves ;
- 8 Bobines témoins ;
- les cinq dérivateurs spécialisés et leurs projections de référence.

Il vérifie notamment :

- les identifiants uniques ;
- la provenance de chaque item ;
- la précision des dates ;
- le déterminisme de l’ordre ;
- les limites et troncatures ;
- les cycles et orphelins ;
- l’isolation des Bobines ;
- les états et statistiques propres aux modèles.

### Projection complète

Avant toute proposition de commit :

```bash
pnpm check
```

Le contrôle automatique ne remplace pas :

- la revue de la vérité documentaire ;
- le test du contrechamp sans CSS ;
- le parcours clavier ;
- les deux Lumières ;
- le mouvement réduit ;
- le mobile et le zoom à 200 % ;
- la vérification que le prototype répond vraiment à sa question.

---

## Anti-patterns à laisser au montage

### Le Plan qui écrit dans les Archives

Une dérivation calcule un résultat puis l’enregistre comme nouveau fait. La
lecture devient alors sa propre source.

### Le diagramme avant la question

La forme est choisie avant le besoin documentaire. Le Plan finit par inventer
des règles pour justifier son apparence.

### La causalité par la flèche

Deux jalons sont reliés visuellement sans relation documentée. Une flèche est
une affirmation, pas une décoration.

### Le score de vérité

La Table lumineuse réduit des sources hétérogènes à une note. Elle efface les
positions, classifications, contradictions et limites qui font précisément
la valeur de la lecture.

### La Bobine infiltrée

Une fixture synthétique rejoint `src/data`, une page publique ou un modèle
Archives. La matière d’essai perd son isolation.

### Le client archéologue

Un composant interactif importe tous les catalogues et reconstitue ses
relations dans un `useMemo`. La logique métier devient difficile à vérifier et
le bundle absorbe une matière inutile.

### Le contrechamp résumé

L’alternative textuelle dit seulement « une chronologie est affichée ». Elle
ne restitue ni les événements, ni leurs pistes, ni leurs contradictions.

### L’état comme jugement

`empty`, `sparse` ou `incomplete` deviennent « sans intérêt », « mineur » ou
« peu fiable ». Le Plan juge le Sujet au lieu de décrire son corpus.

### Le registre gestionnaire

Le registre reçoit priorité, avancement, verdict ou notes d’essai. La promesse
documentaire se mélange au suivi du chantier.

### La primitive métier universelle

Un composant Pixie reçoit les types complets d’un Plan pour éviter un
composant Atelier spécialisé. Le design system devient dépendant du métier.

---

## Définition d’une esquisse de Plan solide

### Contrat

- [ ] La question maîtresse est documentaire et stable.
- [ ] L’action annoncée correspond à une possibilité réelle.
- [ ] Les Angles et Objectifs appartiennent au vocabulaire.
- [ ] Le Cadre et le Hors-champ sont explicites.
- [ ] Le contrechamp est nommé avant la visualisation.

### Matière

- [ ] Le Sujet est publié.
- [ ] Les dérivations sont pures et déterministes.
- [ ] Chaque item possède une provenance.
- [ ] Les limites, références absentes et contradictions sont conservées.
- [ ] Archives et Bobines restent discriminées.

### Projection

- [ ] Le modèle est calculé côté serveur.
- [ ] La Régie ne réinvente pas la logique documentaire.
- [ ] Les notices sont visibles.
- [ ] Le contrechamp utilise le même modèle actif.
- [ ] Aucun effet ne porte seul une relation.

### Expérience

- [ ] Tous les contrôles fonctionnent au clavier.
- [ ] L’ordre reste compréhensible sans CSS.
- [ ] Le mouvement réduit conserve le sens.
- [ ] Mobile, zoom à 200 % et longs libellés sont éprouvés.
- [ ] Les deux Lumières restent lisibles.

### Vérification

- [ ] Les Bobines prioritaires couvrent les risques du Plan.
- [ ] `pnpm check:plans` réussit.
- [ ] `pnpm check:plan-matter` réussit.
- [ ] `pnpm check` réussit avant le commit.
- [ ] Le Journal d’essai distingue faits, observations et décisions.

---

## Fichiers à ouvrir en premier

| Besoin                                      | Point d’entrée recommandé                                                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comprendre la doctrine du chantier          | [Entracte V · Le Codex invente ses Plans](https://app.notion.com/p/Entracte-V-Le-Codex-invente-ses-Plans-3ca092fa3223819ba8eddcd72b93d95b)                 |
| Lire la grammaire de conception             | [Les cinq Plans · Cosmotype et grammaire commune](https://app.notion.com/p/Les-cinq-Plans-Cosmotype-et-grammaire-commune-3ca092fa322381bb9a42e5274f0f3874) |
| Lire les cinq définitions                   | [`src/registry/plans/plans.ts`](../../src/registry/plans/plans.ts)                                                                                         |
| Comprendre les types communs et spécialisés | [`src/types/codex-plans.ts`](../../src/types/codex-plans.ts)                                                                                               |
| Comprendre la vue des Archives              | [`src/lib/plans/archives.ts`](../../src/lib/plans/archives.ts)                                                                                             |
| Lire les dérivations                        | [`src/lib/plans`](../../src/lib/plans/)                                                                                                                    |
| Parcourir les Bobines                       | [`src/fixtures/plans/bobines-temoins.ts`](../../src/fixtures/plans/bobines-temoins.ts)                                                                     |
| Comprendre l’orchestration serveur          | [`src/app/atelier/plans/[slug]/page.tsx`](../../src/app/atelier/plans/[slug]/page.tsx)                                                                     |
| Comprendre le dossier commun                | [`AtelierPlanDossier`](../../src/components/atelier/AtelierPlanDossier/)                                                                                   |
| Contrôler la grammaire                      | [`scripts/verifier-plans.mjs`](../../scripts/verifier-plans.mjs)                                                                                           |
| Contrôler la matière                        | [`scripts/verifier-matiere-plans.mjs`](../../scripts/verifier-matiere-plans.mjs)                                                                           |

---

## Dernière transmission

Un Plan est une caméra honnête.

Il choisit un point de vue, accepte les limites de son cadre et montre aussi
ce qui résiste au montage. Il sait qu’un raccord peut éclairer un lien sans le
créer, qu’une piste peut comparer des dates sans les uniformiser et qu’une
table peut exposer des preuves sans prononcer un verdict.

Les Archives n’ont pas besoin d’être réécrites pour devenir plus lisibles.
Elles ont besoin de Plans assez précis pour révéler leur structure et assez
humbles pour laisser leurs incertitudes à l’écran.

**Choisis le Sujet. Annonce la question. Cadre la Matière. Conserve la
provenance. Puis laisse le public regarder — avec l’image ou depuis le
contrechamp.**

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                     RÉGIE DES CINQ PLANS                   ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  MISSION      Composer des lectures sans falsifier la matière║
║  ACCÈS        SUJETS · ANGLES · CADRES · BOBINES · PREUVES   ║
║  PROTOCOLE    DÉRIVER · SIGNALER · CONTRECHAMPER · VÉRIFIER  ║
║  STATUT       🎥 5 PLANS · 8 BOBINES · PROVENANCE CONSERVÉE  ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
║  La caméra choisit le regard. Les Archives gardent les faits.║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Opérateur des lectures dérivées · Aucun faux raccord admis_<br>
[Carte de studio réutilisable](../studio/snippets/carte-de-studio-guru-editions.md)
