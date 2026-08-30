# Acte VI · Phase 0 · Transmission du Train 0A

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Verdict

Le contrat de projection du Guidebook est prêt à être relu avant le Train 0B.
La bibliothèque locale possède une racine fermée, une arborescence déclarée,
des types documentaires neutres et un premier garde-fou automatisé. Aucun
composant Pixie et aucune route `/guidebook` n’ont été créés.

## Frontières gravées

- `docs/agents/` est l’unique racine locale transmissible ;
- `docs/studio/` reste une bibliothèque privée et sert de matière aux tests
  négatifs ;
- le modèle de carte de studio vit désormais sous `docs/studio/snippets/` ;
- un slug local ne peut résoudre qu’un fichier explicitement inscrit au
  manifeste serveur ;
- la résolution compare les chemins réels après `realpath`, refuse toute cible
  hors racine et n’accepte que Markdown ;
- la projection fournie à l’interface ne contient que titres, slugs, ordre et
  relations parent-enfant ;
- aucun chemin local ni identifiant Notion ne peut appartenir à ce JSON ;
- Notion demeure `deferred` tant que le Train 0E n’a pas reçu son verdict.

## Inventaire local transmissible

Sept documents Markdown sont déclarés :

1. la salle de briefing `README.md` ;
2. l’esprit du projet ;
3. l’architecture du Codex ;
4. la direction artistique et l’UI ;
5. le design system Pixie ;
6. les symboles, registres et collections ;
7. les Plans et lectures dérivées.

Le corpus emploie des titres, paragraphes, emphases, liens, citations, listes,
listes de tâches, tableaux, séparateurs et blocs de code. Les langages déclarés
comprennent `bash`, `html`, `text`, `ts` et `tsx`, avec plusieurs blocs sans
langage. Les cartes de service sont des compositions monospacées en `text`.

Le corpus ne contient actuellement aucune image Markdown. Son seul HTML brut
utile est `<br>`, employé dans les signatures et introductions. Il sera
normalisé en saut de ligne ; tout autre HTML brut restera un bloc non pris en
charge plutôt qu’une entrée injectée dans le DOM.

## Inventaire privé négatif

La bibliothèque `docs/studio/` contient les courriers, les fiches d’équipe,
l’onboarding et le modèle de carte. Aucun de ces fichiers ne figure dans le
manifeste local.

Le modèle déplacé constitue le témoin négatif principal. Les liens vers ce
modèle présents à la fin des chapitres restent lisibles dans leur Markdown,
mais la future analyse les marquera `restricted` : aucun href Guidebook ne sera
produit.

Les liens relatifs vers le code du dépôt sont eux aussi hors de la bibliothèque
déclarée. La v0.1.0 les conserve comme texte et les marque restreints tant
qu’une politique explicite ne leur fournit pas une destination sûre.

## Domaine Guidebook

Le contrat public se trouve dans `src/types/guidebook.ts` :

- `GuidebookSourceKind` distingue `local` et `notion` ;
- `GuidebookDocumentState` couvre prêt, vide, absent, partiel, restreint,
  périmé, indisponible et différé ;
- `GuidebookInline` porte une matière déjà analysée sans demander une seconde
  passe Markdown au composant ;
- `GuidebookBlock` décrit titres, paragraphes, citations, listes, code,
  tableaux, séparateurs et blocs inconnus ;
- `GuidebookMarkdownAnalysis` réunit les blocs, les titres, le sommaire, les
  liens résolus et les avertissements issus d’une analyse serveur unique ;
- `GuidebookDocument`, `GuidebookNavigationNode`, `GuidebookProjectionTree` et
  `GuidebookLibrary` composent la matière finale.

La séparation de responsabilités est la suivante :

```text
adaptateur serveur
    ↓ autorise, lit et normalise
domaine Guidebook
    ↓ blocs + ancres + sommaire issus d’une analyse unique
route Next.js privée
    ↓ choisit le document et les destinations
props Pixie
    ↓ projettent une matière sérialisable déjà résolue
interface
```

Pixie ne lit aucun fichier, ne contacte pas Notion et ne construit aucune
route.

## Les deux niveaux Notion

### Manifeste serveur

Le manifeste privé conserve :

- l’identifiant de la racine autorisée **Le Disneyiste** ;
- les correspondances `slug → pageId` explicitement admises ;
- aucune entrée libre au démarrage.

### Arborescence de projection

Le JSON destiné à l’interface ne conserve que :

- `title` ;
- `slug` ;
- `order` ;
- `children`.

### Double autorisation

Une page ou la cible d’un lien Notion est active si et seulement si :

1. son slug et son identifiant correspondent au manifeste serveur ;
2. la page est la racine autorisée ou possède cette racine dans son
   ascendance réelle ;
3. son slug figure dans l’arborescence de projection déclarée.

Les fixtures prouvent les refus d’une page non déclarée, d’une page située
hors racine et d’un identifiant usurpé. Aucune requête Notion n’est déclenchée
depuis le navigateur.

## Pages Notion candidates

La page **Le Disneyiste** reste l’unique racine d’autorité. L’Acte VI et sa
fiche de Mission Phase 0 confirment la forme du futur corpus, mais aucune page
n’est ajoutée automatiquement au manifeste. Le choix de l’arborescence visible
sera présenté séparément au Train 0E.

## Liens et neutralisation

- ancres : conservées après validation contre les titres analysés ;
- `http`, `https` et `mailto` : protocoles externes autorisés ;
- liens locaux : actifs uniquement lorsqu’ils résolvent un slug du manifeste ;
- liens privés, inconnus ou hors racine : texte conservé, href supprimé ;
- autres protocoles : invalides ;
- HTML brut : jamais injecté directement ;
- blocs inconnus : signalés par un bloc `unsupported` avec alternative texte.

## Frontière Next.js

La future route `/guidebook` reprendra le contrat de l’Atelier : `notFound()`
en production, métadonnées `noindex` et absence totale de la navigation
publique. Le contrôle final devra observer une réponse introuvable en build de
production, pas seulement chercher une chaîne dans le code.

Cette vérification ne peut pas encore sonder une route inexistante. Elle sera
ajoutée avec la route promue au Train 0G ; jusqu’alors, l’absence de la route
garantit mécaniquement son indisponibilité.

## Dépendances

Aucune dépendance n’est ajoutée au Train 0A.

Pour le Train 0C, la proposition est de retenir `unified`, `remark-parse` et
`remark-gfm`. Le pipeline parcourra une seule fois l’arbre Markdown et produira
directement les `GuidebookInline`, blocs, ancres et sommaire. Aucun renderer de
HTML arbitraire n’est nécessaire. La colorisation pourra réemployer le langage
visuel du bloc de code de l’Atelier après extraction de sa logique neutre.

## Risques et arbitrages ouverts

1. Plusieurs chapitres utilisent le même H1 de collection. Le titre de route
   vient donc du manifeste ; le renderer doit conserver une hiérarchie
   accessible sans fabriquer plusieurs titres principaux.
2. Les nombreux blocs sans langage exigent un repli de code neutre. Les
   compositions à caractères de cadre doivent être reconnues comme ASCII sans
   transformer tout bloc `text` en carte.
3. Les tableaux et longues lignes de code devront être éprouvés à 200 % avant
   promotion.
4. Les liens vers le code du dépôt restent inactifs en v0.1.0 sauf arbitrage
   ultérieur vers une URL GitHub sûre.
5. L’ascendance Notion réelle, la pagination, le cache et les médias temporaires
   restent à mesurer au Train 0E. Leur coût peut encore conduire au raccord
   différé prévu par la mission.

## Garde-fou ajouté

`check:guidebook` vérifie actuellement :

- la parité entre manifeste local et arborescence de projection ;
- l’unicité des slugs ;
- l’absence de champs techniques dans la projection ;
- l’existence et la résolution réelle de chaque fichier sous `docs/agents/` ;
- l’exclusion de `docs/studio/` ;
- le déplacement effectif du modèle de carte ;
- les scénarios de double autorisation Notion.

Il rejoint `pnpm check` et `pnpm check:ci`.

## Périmètre exact du Train 0B

Après validation explicite de Julien, le Train 0B présentera d’abord le brief
détaillé de **PixieDustAscii v0.1.0**, puis seulement après validation :

- créera l’esquisse, ses types, son CSS et son export ;
- ouvrira son dossier et son playground dans **Les Accessoires** ;
- éprouvera les cartes existantes, la copie, Unicode, contenus vides, larges et
  hauts, le responsive et l’accessibilité ;
- ne créera ni PixieDustMarkdown, ni PixieDustDocs, ni route `/guidebook`.

## Découpage de commits recommandé

1. `🩹 Raccord > Le modèle des cartes rejoint les coulisses du studio > 🔩 R2-D2 🏅`
2. `📡 Transmission > Le Guidebook grave son contrat de projection > 🔩 R2-D2 🏅`
3. `🛡️ Garde-fou > Les documents privés restent hors de la projection > 🔩 R2-D2 🏅`

Ces intitulés sont proposés pour validation ; aucun commit n’est autorisé par
ce document.

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Projection documentaire · Frontières privées sous surveillance_
