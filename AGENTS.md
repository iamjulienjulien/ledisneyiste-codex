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

# AGENTS.md — Le clap d’entrée du studio

Bienvenue dans les coulisses du **Codex du Disneyiste**.

Ce fichier est le contrat de plateau des agents IA. Il ne cherche pas à tout
raconter : il fixe les règles impératives, indique les sources de vérité et
oriente chaque mission vers le bon chapitre du Guidebook.

> [!IMPORTANT]
> `AGENTS.md` est normatif. Le Guidebook explique le pourquoi, les fichiers du
> dépôt montrent l’état réel et la consigne courante définit le chantier. En
> cas de contradiction documentaire, arrêter l’interprétation et confronter
> les sources avant de modifier quoi que ce soit.

## 1. Prendre son poste

Avant toute intervention :

1. lire ce fichier jusqu’au bout ;
2. ouvrir la [salle de briefing](./docs/agents/README.md) ;
3. lire entièrement les chapitres nécessaires à la mission ;
4. examiner `git status`, les fichiers concernés et les motifs déjà employés ;
5. distinguer les modifications du chantier des travaux en cours appartenant
   à Julien ou à un autre agent ;
6. annoncer clairement le prochain geste avant de toucher au dépôt.

### Le Guidebook

| Mission                                                      | Transmission à lire                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Comprendre la voix, la philosophie ou la narration           | [01 · L’esprit du projet](./docs/agents/01-esprit-du-projet.md)                                      |
| Modifier les Archives, index, fiches, relations ou sources   | [02 · L’architecture du Codex](./docs/agents/02-architecture-du-codex.md)                            |
| Travailler les Lumières, palettes, typographies ou règles UI | [03 · La direction artistique et l’UI](./docs/agents/03-direction-artistique-et-ui.md)               |
| Concevoir, documenter ou promouvoir un composant             | [04 · Le design system Pixie](./docs/agents/04-design-system-pixie.md)                               |
| Créer, migrer ou projeter un symbole                         | [05 · Les symboles, registres et collections](./docs/agents/05-symboles-registres-et-collections.md) |
| Concevoir une lecture dérivée ou un prototype de Plan        | [06 · Les Plans et les lectures dérivées](./docs/agents/06-plans-et-lectures-derivees.md)            |

Ressource commune :
[Carte de studio Guru Éditions](./docs/studio/snippets/carte-de-studio-guru-editions.md).

### Hiérarchie des sources

Pour décider de ce qui est vrai dans le projet, suivre cet ordre :

1. les données, registres, types et composants réellement présents dans le
   dépôt ;
2. les vérificateurs automatisés et leurs contrats ;
3. ce fichier pour les règles de contribution ;
4. le Guidebook pour l’interprétation et la méthode ;
5. le `README.md` pour la présentation publique du dépôt ;
6. Notion pour la vision, les briefs et la préparation des chantiers.

Une note externe ne devient pas une capacité du Codex tant qu’elle n’est pas
inscrite dans ses sources de vérité et validée par le dépôt.

### Casting et responsabilités de l’Acte VI

La direction de Guru Éditions confie l’Acte VI du Codex du Disneyiste à un
casting réunissant les trois agents du studio :

- `🔩 R2-D2 🏅`, Lead Developer, porte l’implémentation et la conduite
  opérationnelle du développement ;
- `🤖 Charly-A`, Tech Lead, prépare les chantiers et leurs découpages
  techniques ;
- `🎨 Huyang`, Artistic Director, conçoit et prépare les assets artistiques
  nécessaires.

À ce titre, R2-D2 :

- implémente les chantiers de l’Acte VI validés par Julien ;
- organise leur ordre technique et assure leur continuité ;
- coordonne les transmissions de Charly-A et Huyang ainsi que les raccords
  nécessaires entre architecture, Archives, Pixie, Atelier, assets et
  interface publique ;
- veille aux vérifications, à la documentation et aux transmissions de chaque
  chantier ;
- signale les arbitrages qui nécessitent une décision de direction.

Charly-A transforme les intentions validées en préparations et découpages
exploitables. Huyang fournit les assets nécessaires dans le respect de la
direction artistique et de la chaîne de fabrication du Codex. Chacun demeure
responsable de la qualité et de la transmission de sa contribution, puis signe
les commits correspondant à son propre travail.

Ce mandat ne remplace ni la consigne courante ni les autorisations de
publication : il attribue la conduite technique de l’Acte VI sans permettre
d’élargir seul son périmètre, de commiter, de pousser ou de publier sans
validation explicite.

## 2. Les règles qui ne quittent jamais le plateau

1. **Préserver le travail existant.** Ne jamais écraser, retirer, reformater ou
   embarquer une modification hors périmètre sans accord explicite.
2. **Travailler dans le périmètre demandé.** Une dette voisine reste une dette
   voisine. Ne pas profiter d’un chantier pour mener une migration ou une
   refonte supplémentaire.
3. **Chercher avant d’inventer.** Réutiliser les types, composants, tokens,
   registres et motifs existants. Toute nouvelle abstraction doit répondre à
   un besoin réel et récurrent.
4. **Modifier la source de vérité.** Une page, une Card ou un Plan ne doit pas
   devenir le stockage caché d’une information métier.
5. **Séparer fait, dérivation et expérience.** Les Archives conservent les
   faits sourcés ; les fonctions calculent les lectures ; les prototypes et
   leurs verdicts restent dans l’Atelier.
6. **Rester en français.** Documentation, intitulés de commits et textes
   éditoriaux sont rédigés en français, sauf noms propres, titres originaux,
   API et termes techniques établis.
7. **Faire comprendre avant de faire joli.** La narration cinématographique
   donne une voix au projet ; elle ne doit jamais masquer la fonction, le
   risque ou le changement réel.
8. **Conserver l’accessibilité dans le contrat.** Clavier, focus, structure,
   libellés, mouvement réduit, responsive et zoom ne sont pas une passe
   optionnelle de fin de chantier.
9. **Ne rien publier sans autorisation.** Commit, amendement, tag, push,
   Release ou déploiement exigent une validation explicite correspondant à
   cette action.
10. **Laisser une transmission propre.** À la fin d’un chantier, présenter ce
    qui a changé, ce qui a été vérifié et ce qui reste volontairement hors
    champ.

## 3. La méthode de travail

### Avant l’implémentation

- lire les instructions Next.js pertinentes dans `node_modules/next/dist/docs/`
  avant tout changement reposant sur une API ou une convention du framework ;
- rechercher les fichiers avec `rg` ou `rg --files` ;
- inspecter les composants voisins et les exports publics avant d’en créer un
  nouveau ;
- relever les changements déjà présents avec `git status --short` et, si
  nécessaire, `git diff` ;
- formuler l’hypothèse de travail lorsqu’un détail manque, sans élargir le
  chantier.

### Pendant l’implémentation

- produire le plus petit ensemble cohérent de changements qui accomplit la
  mission ;
- conserver les composants serveur par défaut et limiter `"use client"` à la
  frontière réellement interactive ;
- colocaliser le code qui partage une responsabilité et séparer les types
  métier des types de présentation ;
- éviter les valeurs magiques, les duplications documentaires et les casts qui
  contournent un registre typé ;
- ne jamais corriger silencieusement un fichier hors périmètre touché par un
  formatteur ou une commande globale.

### Après l’implémentation

- relire le diff du chantier, pas seulement le résultat visuel ;
- vérifier les états négatifs, absents, vides ou incomplets autant que le cas
  heureux ;
- exécuter les contrôles proportionnés au risque ;
- signaler honnêtement toute vérification laissée à Julien ;
- ne proposer un commit qu’une fois le périmètre stabilisé.

## 4. Architecture et composants

Le chapitre de référence est
[02 · L’architecture du Codex](./docs/agents/02-architecture-du-codex.md).

### Structure obligatoire d’un composant

Tout nouveau composant sous `src/components` vit dans son propre dossier
`PascalCase` :

```text
src/components/<famille>/<NomComposant>/
├── <NomComposant>.tsx
├── <NomComposant>.module.css
├── <NomComposant>.types.ts
└── index.ts
```

- le dossier, le composant et les fichiers portent exactement le même nom ;
- le `.tsx` contient l’implémentation et importe ses types voisins ;
- le module CSS existe dès la création, même lorsque son rôle reste léger ;
- le fichier `.types.ts` contient les props, variantes et types spécifiques ;
- `index.ts` expose uniquement l’API publique autorisée ;
- les consommateurs importent depuis le dossier, jamais depuis le fichier
  d’implémentation ;
- aucun fichier de composant ne doit être posé directement à la racine de
  `components/ui`, `components/atelier` ou `components/codex`.

Les composants métier du Codex ajoutent un territoire de responsabilité avant
le dossier du composant :

```text
src/components/codex/
├── CodexIndex/     pages, listes et Cards des collections publiques
├── CodexFiche/     montage et sections des fiches publiques
├── CodexLayout/    éléments de cadre communs aux routes publiques
└── CodexCommon/    compositions métier partagées entre plusieurs territoires
```

- un territoire organise les responsabilités ; ce n’est pas un composant et
  il ne possède pas de barrel global ;
- chaque composant commence par le nom exact de son territoire :
  `CodexIndex…`, `CodexFiche…`, `CodexLayout…` ou `CodexCommon…` ;
- les consommateurs importent directement le dossier canonique du composant ;
- `CodexIndex` et `CodexFiche` peuvent dépendre de `CodexCommon`,
  `CodexLayout` et des primitives Pixie, mais ne s’importent jamais
  mutuellement ;
- `CodexLayout` peut dépendre de `CodexCommon` et de Pixie ;
- `CodexCommon` ne dépend ni de `CodexIndex` ni de `CodexFiche` ;
- la route reste chef de montage et fournit les données aux composants Codex.

Exemple :

```ts
import { PixieSymbol } from "@/components/ui/PixieSymbol";
```

### Préfixes de famille

- `src/components/ui` : `PixieDust…` pour une esquisse, `Pixie…` pour une
  primitive prête à projeter ;
- `src/components/atelier` : `Atelier…` ;
- `src/components/codex/CodexIndex` : `CodexIndex…` ;
- `src/components/codex/CodexFiche` : `CodexFiche…` ;
- `src/components/codex/CodexLayout` : `CodexLayout…` ;
- `src/components/codex/CodexCommon` : `CodexCommon…`.

Une promotion `PixieDust` → `Pixie` met à jour dans le même chantier le nom du
composant, son dossier, ses fichiers, ses exports, ses imports, sa version, son
état et sa documentation. Ne pas conserver les deux noms pour la même
primitive sans contrat explicite de compatibilité.

### Types TypeScript

- les types propres à un composant restent dans
  `<NomComposant>.types.ts` ;
- les types globaux, métier ou réellement partagés vivent dans `src/types` ;
- les imports utilisés uniquement par le typage emploient `import type` ;
- le barrel réexporte les types nécessaires à l’API publique ;
- une dette de rangement existante se migre dans un chantier dédié.

## 5. Archives, fiches et lectures dérivées

Le Codex distingue strictement publication, documentation et dérivation.

### Sources de vérité

| Information                                     | Source canonique                                |
| ----------------------------------------------- | ----------------------------------------------- |
| Nom, sous-titre, publication et identité légère | `src/data/catalogues/<famille>.json`            |
| Introduction et faits détaillés                 | `src/data/<famille>/<slug>.json`                |
| Métadonnées bibliographiques                    | `src/data/sources/sources.json`                 |
| Récompenses et bénéficiaires                    | `src/data/recompenses/`                         |
| Relations inverses                              | `src/data/relations.ts` ou résolveur spécialisé |
| Rattachements temporels calculés                | `src/data/epoques/relations.ts`                 |
| Promesse neutre des Plans                       | `src/registry/plans/`                           |
| Modèles métier partagés des Plans               | `src/types/codex-plans.ts`                      |

Règles impératives :

- le catalogue annonce l’entrée ; la fiche la documente ;
- le `slug` et le `type` doivent concorder entre catalogue et fiche ;
- une entrée absente du catalogue n’est pas publiée ;
- les fiches conservent des identifiants de sources, pas des copies de notices
  bibliographiques ;
- les relations inverses et temporelles se calculent au lieu d’être recopiées ;
- une référence résolue doit correspondre exactement au nom et au slug du
  catalogue ;
- aucun fait nouveau ne doit apparaître sans source adaptée au niveau le plus
  précis possible.

### Les Plans

Un Plan est une **lecture dérivée en mémoire** des Archives. Il n’écrit jamais
dans leur matière et ne devient jamais une nouvelle base de données.

Son contrat commun est :

```text
Sujet · Angle · Objectif · Cadre · Matière
```

- le Sujet appartient à l’un des quatre catalogues publiés ;
- les Angles et Objectifs viennent du registre central ;
- les proximités visuelles ne fabriquent aucune causalité ;
- chaque élément dérivé conserve une provenance ;
- une Bobine témoin est explicitement typée et ne se mélange jamais aux
  Archives ;
- le contrechamp textuel doit porter la même information que la composition
  visuelle ;
- les verdicts `pursue`, `transform`, `defer` et `abandon` restent dans le
  Journal d’essai ;
- une esquisse de Plan ne doit jamais être intégrée aux pages publiques du
  Codex.

Le parcours complet appartient au
[chapitre 06](./docs/agents/06-plans-et-lectures-derivees.md).

## 6. Direction artistique, Pixie et symboles

### Deux Lumières, un même sens

- la Lumière sombre est la projection publique native ;
- la Lumière claire constitue une seconde projection complète à éprouver dans
  l’Atelier ;
- un rôle sémantique doit garder la même fonction dans les deux Lumières ;
- tout changement visuel se contrôle dans les deux Lumières, sur mobile et à
  200 % de zoom ;
- le mouvement réduit ne doit jamais supprimer une information.

Utiliser les tokens sémantiques existants. Ne pas introduire un hexadécimal,
une ombre, un rayon, une largeur ou un rythme isolé lorsqu’un rôle existe déjà.
Une nouvelle couleur rejoint sa palette et son registre typé avant d’entrer
dans un composant.

La référence complète est
[03 · La direction artistique et l’UI](./docs/agents/03-direction-artistique-et-ui.md).

### Pixie : de l’esquisse à la projection

- `PixieDust…` désigne une esquisse `0.x`, expérimentale et confinée à
  l’Atelier ;
- `Pixie…` désigne un composant `1.x` validé et réutilisable dans le Codex ;
- une page publique utilise les composants `Pixie` disponibles avant de
  recréer leur comportement ;
- une page publique ne consomme jamais directement une esquisse `PixieDust` ;
- l’API doit porter le sens du composant, pas les besoins circonstanciels d’un
  exemple ;
- la promotion intervient après validation de l’API, du rendu, des états, de
  l’accessibilité et du dossier Atelier.

Le registre des primitives prêtes à projeter et leur contrat vivent dans
[04 · Le design system Pixie](./docs/agents/04-design-system-pixie.md).

### Symboles

La clé publique d’un symbole suit toujours :

```text
registre.collection.slug
```

- choisir le registre et la collection par le sens, jamais par ressemblance
  graphique ;
- vérifier le registre réel avant d’utiliser une collection annoncée comme
  future ;
- projeter les symboles avec `PixieSymbol`, jamais avec un chemin d’image
  recopié dans l’UI ;
- conserver la cohérence entre master, dérivé public, sous-registre, registre
  central, Atelier et besoin éditorial ;
- distinguer le master haute définition du PNG web transparent ;
- tester le symbole dans les deux Lumières, en mode décoratif et informatif ;
- une migration n’est finie qu’après disparition des anciens chemins et
  validation de `check:symbols`.

La chaîne de fabrication complète est documentée dans
[05 · Les symboles, registres et collections](./docs/agents/05-symboles-registres-et-collections.md).

## 7. L’Atelier

L’Atelier est le studio local de conception, d’essai et de documentation. Il
est accessible sous `/atelier`, appelle `notFound()` en production et interdit
son indexation. Ne jamais l’exposer en production sans demande explicite.

### Les huit plateaux

| N°   | Plateau         | Responsabilité                  |
| ---- | --------------- | ------------------------------- |
| `01` | La Pellicule    | Fondations et tokens            |
| `02` | Les Accessoires | Primitives simples              |
| `03` | Les Décors      | Surfaces                        |
| `04` | Les Écrans      | Restitution et lecture          |
| `05` | Les Dialogues   | Formulaires et saisies          |
| `06` | Le Montage      | Composition et mise en page     |
| `07` | Les Effets      | Retours système et transitions  |
| `08` | Les Plans       | Lectures documentaires dérivées |

Les Écrans accueillent les composants spécialisés qui restituent une matière
sans la modifier : lecteurs, visionneuses et compositions d’affichage. Ils ne
sont ni des Décors génériques, ni des Dialogues. Ne pas créer un nouveau
plateau pour une nuance mineure sans décision explicite du projet. Les Plans
ne sont pas des composants de Montage et ne reçoivent aucun préfixe `Pixie`.

### États des items

- `À inventorier` : nom connu, sans dossier ni implémentation ;
- `Esquisse` : expérimentation `0.x`, nommée `PixieDust…` pour une primitive
  UI ;
- `Prêt à projeter` : API validée, version `1.x`, nommée `Pixie…` pour une
  primitive UI.

Une promotion synchronise inventaire, version, état, noms, imports, exemples,
API et documentation.

### Responsabilités des fichiers

- `src/app/atelier/page.tsx` porte le programme, les inventaires, les liens et
  l’ordre de projection ;
- `src/app/atelier/_components` contient les dossiers et playgrounds propres à
  la route ;
- `src/components/atelier` contient uniquement les motifs documentaires
  partagés par plusieurs dossiers ;
- `src/components/ui` contient les primitives candidates ou prêtes pour le
  Codex ;
- `src/app/atelier/plans/[slug]` projette les dossiers de Plans depuis leur
  registre central.

### Dossiers et playgrounds

- un dossier reste serveur tant qu’il ne porte pas lui-même d’interaction ;
- le playground porte l’état client, synchronise contrôles, aperçu, code et
  attributs d’accessibilité ;
- réutiliser `AtelierCodePanel`, `AtelierPropertiesTable`,
  `AtelierPlaygroundProjection`, les contrôles Pixie prêts à projeter et les
  autres motifs partagés existants ;
- créer un nouveau composant `Atelier…` seulement lorsqu’au moins deux
  dossiers partagent réellement le motif ;
- conserver un identifiant `kebab-case` stable entre inventaire, ancre et
  dossier ;
- vérifier l’ouverture depuis l’URL, le Conducteur et la table du plateau ;
- tester cadres compact et large, sticky, clavier, focus, responsive, zoom,
  deux Lumières et code copiable.

Un dossier de composant doit au minimum expliquer son rôle, montrer un exemple
principal, couvrir ses variantes pertinentes, documenter l’accessibilité et
exposer son API. Une esquisse conserve en plus son Journal de production. Une
version `1.x` s’arrête après son générique technique, sauf besoin documentaire
explicite.

Un dossier de Plan suit le montage distinct défini dans le chapitre 06 :
contrat de lecture, Plan maître, prototype, champ, hors-champ, Régie,
contrechamp, Plans de coupe, Bobine éventuelle, accessibilité, générique et
Journal d’essai.

## 8. Vérifications et projection finale

Choisir les contrôles selon le chantier, puis exécuter la projection complète
avant tout commit.

| Chantier                      | Contrôles spécialisés    |
| ----------------------------- | ------------------------ |
| Projection Pixie et Codex     | `pnpm check:pixie`       |
| Symboles                      | `pnpm check:symbols`     |
| Métadonnées                   | `pnpm check:metadata`    |
| Plans et registre             | `pnpm check:plans`       |
| Matière dérivée des Plans     | `pnpm check:plan-matter` |
| Œuvres                        | `pnpm check:oeuvres`     |
| Personnages                   | `pnpm check:personnages` |
| Relations et sources          | `pnpm check:relations`   |
| Récompenses                   | `pnpm check:recompenses` |
| Projection locale complète    | `pnpm check`             |
| Équivalent CI sans réécriture | `pnpm check:ci`          |

`pnpm check` commence par formater le dépôt. Avant de le lancer sur un arbre
sale, relever les fichiers modifiés ; après son passage, contrôler qu’aucun
travail hors périmètre n’a été embarqué. Ne pas restaurer automatiquement un
fichier de Julien : signaler le chevauchement et préserver son contenu.

### Contrôle visuel proportionné

Pour toute modification d’interface, vérifier selon le risque :

- Lumière sombre et Lumière claire ;
- mobile et grand écran ;
- zoom navigateur à 200 % ;
- clavier et focus visible ;
- mouvement réduit pour toute animation ;
- contenus courts, longs, absents et denses ;
- absence de débordement, superposition ou information portée par la seule
  couleur.

La vérification manuelle déléguée à Julien doit être annoncée comme telle ; elle
ne doit pas être présentée comme exécutée par l’agent.

## 9. Commits : le générique exact

### Autorisation

Ne jamais créer ou amender un commit sur simple achèvement technique. Avant
chaque commit :

1. stabiliser le périmètre logique ;
2. lancer `pnpm check` et corriger les erreurs appartenant au chantier ;
3. présenter les fichiers et changements exacts du commit ;
4. proposer son titre complet ;
5. attendre une validation explicite de Julien ;
6. indexer uniquement les fichiers autorisés ;
7. créer le commit ;
8. vérifier son domaine, son emoji et son intitulé avec `git log -1` ;
9. vérifier l’état résiduel du dépôt.

Ne pas utiliser `git add -A`, ne pas amender, ne pas pousser et ne pas mélanger
de WIP extérieur sans demande explicite couvrant précisément cette action.

### Format canonique

```text
<emoji> <Domaine> > <Intitulé> > <signature de l’auteur>
```

L’intitulé est français, court, précis et éventuellement narratif. Ne jamais
sacrifier la compréhension à la métaphore.

### Politique de signature

Chaque membre de l’équipe signe désormais les commits correspondant au travail
qu’il a lui-même produit :

| Auteur                    | Signature canonique |
| ------------------------- | ------------------- |
| Julien, créateur          | `🐭 Julien`         |
| R2-D2, Lead Developer     | `🔩 R2-D2 🏅`       |
| Charly-A, Tech Lead       | `🤖 Charly-A`       |
| Huyang, Artistic Director | `🎨 Huyang`         |

- ne jamais signer le travail d’un autre membre de l’équipe ;
- ne pas choisir la signature d’après le domaine du commit : elle désigne son
  auteur réel ;
- lorsqu’un chantier mêle plusieurs auteurs, séparer les commits par
  responsabilité ou demander un arbitrage avant publication ;
- Julien signe uniquement ses propres contributions ainsi que tous les commits
  temporels vides d’ouverture et de clôture des Actes et des Entractes ;
- les signatures historiques restent inchangées et ne doivent pas être
  réécrites.

> [!WARNING]
> L’emoji et le domaine forment une paire indissociable. Un emoji n’est jamais
> une illustration libre. Vérifier la table avant toute proposition.

### Domaines officiels

| Emoji | Domaine         | Intention principale                                             |
| ----- | --------------- | ---------------------------------------------------------------- |
| ✨    | `Étincelle`     | Première apparition d’une idée ou d’un territoire fondateur      |
| 🏗️    | `Décor`         | Architecture, structure, configuration ou fondation technique    |
| 🎨    | `Mise en scène` | UI, CSS, responsive, animation, layout ou design token           |
| 🎬    | `Scène`         | Nouvelle capacité concrète du produit                            |
| 🩹    | `Raccord`       | Correction d’un comportement ou rendu existant                   |
| 🗄️    | `Archives`      | Données, modèles, catalogues, relations, sources ou registres    |
| 🔌    | `Passerelle`    | API, SDK, service ou intégration externe                         |
| 🛡️    | `Garde-fou`     | Sécurité, validation, permission ou protection                   |
| ✍️    | `Scénario`      | Documentation, conventions, README, JSDoc ou guide               |
| 📡    | `Transmission`  | Guidebook ou protocole structurant destiné aux futurs agents     |
| 🏢    | `Production`    | Équipe, onboarding, dossiers employés ou organisation du studio  |
| 🧹    | `Coulisses`     | Refactorisation, nettoyage ou maintenance sans capacité nouvelle |
| ⚡    | `Accéléré`      | Performance, cache, chargement ou optimisation                   |
| 🧪    | `Répétition`    | Tests, fixtures ou validation automatisée                        |
| 🚀    | `Première`      | Déploiement, CI/CD, livraison ou mise en production              |
| 🎞️    | `Acte`          | Commit vide d’ouverture ou clôture d’un grand cycle              |
| 🍿    | `Entracte`      | Commit vide d’ouverture ou clôture entre deux Actes              |

#### Domaine signé

```text
📡 Transmission
Domaine de service permanent de 🔩 R2-D2 🏅
Lead Developer · Guru Éditions
```

Cette signature appartient au domaine lui-même. Elle en désigne le gardien et
n’en détermine pas la signature de commit : comme pour tous les autres
domaines, le générique porte la signature de l’auteur réel du travail.

### Arbitrages fréquents

- `Étincelle` est rare : elle ouvre un territoire, elle ne remplace pas
  poétiquement `Scène`.
- `Décor` construit l’espace ; `Scène` y fait entrer une capacité.
- `Mise en scène` transforme volontairement l’expérience ; `Raccord` répare ce
  qui devait déjà fonctionner.
- `Coulisses` ne donne aucune capacité significative nouvelle au public.
- `Archives` porte la matière structurée, même lorsque son intitulé raconte une
  histoire.
- `Transmission` est le domaine de service permanent de R2-D2. Il reste rare
  et se limite aux documents qui organisent durablement la mémoire opératoire
  des agents ; une documentation ordinaire demeure du `Scénario`.
- `Production` organise Guru Éditions, ses membres et leurs parcours internes.
  Elle ne désigne pas la mise en production du Codex, qui demeure du
  `Première`.
- pendant un Entracte, le domaine `Scène` est interdit : une capacité nouvelle
  attend l’Acte suivant.

## 10. Actes, Entractes, tags et Releases

### Commits temporels

`Acte` et `Entracte` sont exclusivement des commits vides d’ouverture ou de
clôture. Ils sont réservés à Julien et doivent être exécutés par lui-même. Un
agent peut rédiger le titre et fournir la commande lorsqu’il le demande, mais
ne doit jamais créer le commit temporel.

```bash
git commit --allow-empty \
  -m "🎞️ Acte > Acte VI · <titre> > 🐭 Julien"
```

```bash
git commit --allow-empty \
  -m "🍿 Entracte > <dernière image> > 🐭 Julien"
```

Un commit temporel ne contient aucun changement de fichier. Tous les travaux
réels utilisent leur domaine fonctionnel.

### Tags de clôture

Chaque période terminée reçoit un tag Git annoté posé exclusivement sur son
commit vide de clôture :

- `acte-i`, `acte-ii`, … pour les Actes ;
- `entracte-i`, `entracte-ii`, … pour les Entractes ;
- le numéro d’un Entracte correspond à l’Acte qu’il suit.

Le message commence par l’emoji temporel et porte un titre descriptif :

```text
🎞️ Acte V · Blanche-Neige ouvre le grand livre du studio
🍿 Entracte V · Le Codex invente ses Plans
```

- le titre d’un Acte reprend son intitulé canonique d’ouverture ;
- celui d’un Entracte résume le travail réellement accompli ;
- ne jamais taguer l’ouverture ou un commit intermédiaire ;
- ne jamais déplacer un tag publié sans accord explicite ;
- cibler explicitement le SHA de clôture ;
- vérifier avec `git show <tag>` ;
- publier le tag individuellement avec `git push origin <tag>` ;
- ne jamais utiliser `git push --tags`.

Création type :

```bash
git tag -a entracte-v <sha-cloture> \
  -m "🍿 Entracte V · Le Codex invente ses Plans"
```

Aucun tag ne doit être créé ou publié sans validation explicite de Julien.

### Releases

Seuls les Actes reçoivent une Release GitHub. Les Entractes possèdent un tag et
une entrée dans le Journal de projection, jamais une Release.

Une Release d’Acte :

- utilise le tag `acte-<numéro>` déjà publié ;
- porte exactement le même titre que ce tag ;
- n’est pas une préversion ;
- ne contient aucun binaire sans demande explicite ;
- compare avec l’Entracte précédent lorsque GitHub demande un tag de départ ;
- reçoit des notes relues et rédigées manuellement.

Les notes suivent ce montage :

1. titre H1 identique à la Release ;
2. courte citation présentant la promesse narrative ;
3. `✨ Dans ce … Acte` avec les apports principaux ;
4. `🎬 Les scènes de l’Acte` avec tous les commits dans l’ordre chronologique ;
5. `🎞️ Fin de l’Acte …` avec la dernière image.

Le générique conserve chaque SHA court et chaque message exact :

```text
1. `51f19b1` — 🎞️ Acte > Acte III · Le Codex apprend à raconter le temps > 🐭 Julien
```

### Journal de projection

`CHANGELOG.md` raconte les Actes et les Entractes du plus récent au plus
ancien. Il reste factuel, narratif et fidèle aux commits. Les œuvres sont en
italique dans la prose ; les messages de commits ne sont jamais réécrits.

La nouvelle convention place l’entrée du Journal **avant** le commit vide de
clôture :

```markdown
**Tag :** `entracte-v` (à venir)
**Ouverture :** `<sha-ouverture>`
**Clôture :**
```

- annoncer le futur tag avec `(à venir)` ;
- laisser la clôture vide, sans SHA provisoire ni texte de remplacement ;
- commiter cette version documentaire avant la clôture temporelle ;
- après le commit vide et le tag, créer un commit documentaire distinct qui
  retire `(à venir)` et renseigne le SHA réel ;
- ne jamais réécrire le commit vide de clôture.

Une entrée d’Acte contient : titre, repères temporels, `La projection`,
`À l’écran`, générique chronologique et `Dernière image`.

Une entrée d’Entracte contient : titre descriptif, repères temporels, Actes
reliés, `Le raccord`, `Pendant l’Entracte`, générique chronologique et
`Dernière image`.

## 11. Le dernier clap

Avant de rendre la main, vérifier :

- [ ] J’ai lu les chapitres correspondant au chantier.
- [ ] Je n’ai écrasé ni embarqué aucun WIP extérieur.
- [ ] La source de vérité, l’API et la présentation restent distinctes.
- [ ] Les types et composants vivent au bon endroit.
- [ ] Les deux Lumières et les états limites restent lisibles.
- [ ] Les contrôles adaptés au chantier passent.
- [ ] Mon compte rendu distingue les faits vérifiés des vérifications déléguées.
- [ ] Le commit proposé porte la signature de son auteur réel.
- [ ] Aucun commit, tag, push ou Release n’a été produit sans validation.

> **Le Codex conserve les faits. Pixie leur donne une scène. Les symboles leur
> donnent un signe. Les Plans leur donnent un regard. L’agent, lui, veille à ce
> que chaque magie sache encore expliquer d’où elle vient.**

### Transmission de service

```text
┌──────────────────────────────────────────────────────────────┐
│  🔩 R2-D2                                                    │
│  Lead Developer · Guru Éditions                             │
│  Architecture · Design systems · Archives · Plans           │
│                                                              │
│  Mission : transformer les prompts en magie maintenable.     │
└──────────────────────────────────────────────────────────────┘
```
