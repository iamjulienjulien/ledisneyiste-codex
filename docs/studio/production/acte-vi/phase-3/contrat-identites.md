# Acte VI · Contrat des identités voyageuses

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Statut du contrat

Ce document fixe le contrat technique livré par la Phase 3 — **Donner aux
Archives des identités qui voyagent**. Il décrit le chemin d’une identité
depuis les Archives jusqu’à la recherche, la navigation et l’interface.

Il ne constitue pas un inventaire éditorial à compléter mécaniquement. Les
formes documentées restent des faits sourcés ; le manifeste privé de
rétroapplication de 69 entrées demeure le programme de la Phase 5.

## Une Archive, quatre responsabilités

| Responsabilité              | Source de vérité                                             |
| --------------------------- | ------------------------------------------------------------ |
| Publication et nom courant  | `src/data/catalogues/<famille>.json`                         |
| Formes documentées          | `src/data/<famille>/<slug>.json`                             |
| Langues et territoires      | `src/registry/identites`                                     |
| Alias de routes historiques | registre serveur explicite conforme à `AliasNavigationCodex` |

Le catalogue reste léger et publiable. La fiche possède la nuance
documentaire, la nature de chaque forme et ses sources. Une forme éditoriale
ne devient jamais une URL par déduction.

## Projection commune

`projeterIdentiteCodex` joint une entrée et sa fiche sur leur `slug`, refuse
les collisions normalisées puis produit une `ProjectionIdentiteCodex` :

- `identifiant` : identifiant permanent lorsqu’un domaine en possède un ;
- `famille` : famille canonique du Codex ;
- `slugCanonique` : segment stable de navigation ;
- `principale` : forme choisie pour l’interface et sa langue lorsqu’elle est
  connue ;
- `originale` : unique forme de nature `original`, ou `null` ;
- `documentees` : autres formes sourcées avec nature, langue et territoire ;
- `aliasesNavigation` : anciennes routes prouvées, jamais des synonymes.

Le résolveur serveur `resoudreIdentiteCodex` et son pendant de collection
`listerIdentitesCodex` connaissent les catalogues et les fiches. Les
composants n’y accèdent pas.

```text
catalogue + fiche + registres
             │
             └── résolution serveur
                        │
                        ├── recherche identitaire
                        ├── route canonique
                        └── CodexCommonIdentite
```

## Invariants documentaires

Une identité documentée :

1. possède une valeur non vide ;
2. utilise une nature fermée ;
3. référence une langue ou un territoire uniquement lorsque cette information
   est connue ;
4. possède au moins une source existante ;
5. ne duplique ni la forme principale ni une autre forme après normalisation ;
6. n’introduit pas une seconde forme originale sans arbitrage ;
7. ne mélange pas noms et titres alternatifs dans une même fiche.

La normalisation neutralise casse, diacritiques, ponctuation, `œ` et `æ` pour
détecter les équivalences. Elle ne réécrit pas la valeur conservée dans les
Archives.

## Registres de langue et de territoire

Langue et territoire sont deux dimensions indépendantes. Les codes fermés
vivent dans `src/registry/identites` et fournissent des libellés accessibles.

Un drapeau ne peut remplacer ni le code métier, ni le nom annoncé, ni le
libellé visible. Une langue absente demeure `null` ou omise : le résolveur ne
l’infère pas depuis un territoire, une source ou une graphie.

## Recherche

La recherche joint les catalogues et les fiches côté serveur. Son index léger
réunit :

- la forme principale ;
- toutes les formes documentées ;
- le sous-titre et les métadonnées légères déjà admises par famille.

Une recherche par `Sneezy`, `The Evil Queen`, `Humbert` ou
`Blanche-Neige et les Sept Nains` retrouve l’unique Archive canonique
correspondante. Les résultats sont dédupliqués par famille et `slug`.

Les paragraphes éditoriaux, relations, citations et notices bibliographiques
ne font pas partie de ce moteur. Les intégrer relèverait d’un chantier de
recherche plein texte distinct.

## Navigation

Les quatre segments publics demeurent :

```text
/personnages/[slug]
/contributeurs/[slug]
/oeuvres/[slug]
/epoques/[slug]
```

Les 79 routes actuelles sont l’inventaire canonique de référence. Une forme
originale, française, italienne ou territoriale ne produit aucune route.

Un alias de navigation n’est accepté que si :

- l’ancienne route a réellement existé et sa provenance est consignée ;
- sa cible appartient à l’inventaire canonique ;
- il ne collisionne avec aucune route ni aucun autre alias ;
- il produit une redirection permanente vers la cible unique.

Aucun alias réel n’est nécessaire au terme de la Phase 3. La redirection
présente dans les fixtures éprouve le contrat sans publier de faux historique.

## Projection visuelle

`CodexCommonIdentite` reçoit une projection résolue et compose trois
présences : `hero`, `card` et `list`.

La forme principale reste le titre sémantique de la surface. La forme
originale, lorsqu’elle existe, apparaît avec sa nature, sa langue et son
éventuel territoire en toutes lettres. L’attribut HTML `lang` accompagne les
formes dont la langue est connue.

Les routes décident du niveau de titre et préparent les données. Cards, listes
et en-têtes ne lisent aucune Archive et ne fabriquent aucun fallback métier.

## Garde-fou de répétition

`pnpm check:identites` vérifie notamment :

- les registres et toutes les formes actuellement documentées ;
- les jointures catalogue–fiche des 79 Archives ;
- les collisions et projections témoins ;
- les requêtes par identité alternative et leur déduplication ;
- les 79 routes et le contrat des alias ;
- les surfaces et montages publics ;
- la présence de cette étape dans `pnpm check` et `pnpm check:ci`.

Les compteurs sont des mesures de répétition, pas des plafonds éditoriaux. Une
future forme sourcée peut augmenter l’inventaire sans modifier le contrat.

## Recette d’adoption

Pour ajouter ou migrer une identité :

1. conserver la forme courante et le `slug` dans le catalogue ;
2. ajouter la forme documentée dans la fiche avec nature et sources ;
3. ouvrir d’abord le registre si une langue ou un territoire manque ;
4. ne déclarer un alias que pour une ancienne URL prouvée ;
5. ajouter une bobine témoin si la forme révèle un cas de contrat inédit ;
6. lancer `pnpm check:identites`, puis la répétition générale ;
7. vérifier visuellement hiérarchie, langue, retours de ligne et contraste.

Une migration de masse suit en plus le manifeste, les niveaux R2/R3 et les
45 routes historiques consignés par la Phase 2.

## Frontière de phase

La Phase 3 installe le moteur et éprouve les Archives déjà publiées. Elle ne :

- complète pas les 69 entrées du manifeste de rétroapplication ;
- crée pas les domaines Chansons ou Œuvres sources ;
- ajoute pas le corpus de _Pinocchio_ ;
- transforme pas le Codex en produit multilingue ;
- invente pas d’alias pour démontrer le mécanisme.

Ces limites rendent le contrat réutilisable par les Phases 4, 5, 6 et 9 sans
absorber leur travail documentaire.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Un nom peut voyager. Sa route, sa preuve et sa voix restent à leur place._
