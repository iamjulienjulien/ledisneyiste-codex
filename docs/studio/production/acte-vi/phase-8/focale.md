# Acte VI · Phase 8 · Focale · Première grammaire de visualisation

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Statut

**Focale v0.1.0 · grammaire expérimentale privée**

Ce premier contrat naît au Train 8B pour répondre aux besoins démontrés du
Générique vivant. Il ne déclare ni un design system mature, ni une API stable,
ni une destination publique. Sa valeur sera jugée séparément de celle du Plan.

## Problème

Pixie sait construire une salle, une surface, un contrôle et un retour
d’interface. Il ne doit pas porter la traduction perceptive des données. Le
Générique vivant a besoin d’un vocabulaire capable de représenter une
contribution, d’expliquer un encodage, d’annoter une réserve, de contenir une
dense composition et de restituer exactement la même matière sous forme de
table.

Focale occupe uniquement cet espace.

```text
Archives → modèle dérivé du Plan
                    ├─ Pixie : surfaces, contrôles, navigation, états
                    └─ Focale : échelles, marques, légendes, annotations,
                                viewport et contrechamp tabulaire
```

## Audit des candidates

| Candidate          | Verdict du Train 8B | Justification                                                                      |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| `FocaleScale`      | conservée           | une catégorie doit devenir une valeur perceptive selon une règle déterministe      |
| `FocaleMark`       | conservée           | le Plan doit dessiner une contribution ou un groupe sans encoder son métier        |
| `FocaleLegend`     | conservée           | toute couleur ou forme doit être nommée et expliquée                               |
| `FocaleAnnotation` | conservée           | provenance, réserve et incertitude ont besoin d’une place visible                  |
| `FocaleViewport`   | conservée           | une composition dense doit rester contenue et parcourable                          |
| `FocaleTable`      | conservée           | toute visualisation doit posséder un contrechamp exhaustif                         |
| `FocaleTooltip`    | différée            | aucun détail complémentaire non exclusif ne justifie encore une interaction dédiée |

Le tooltip ne doit pas apparaître par réflexe de datavisualisation. Un survol
ne sera introduit que lorsqu’une information secondaire réelle, également
accessible au clavier et ailleurs dans le document, le rendra nécessaire.

## Emplacement et frontières

Le noyau vit dans `src/components/focale/`. Il ne rejoint pas
`src/components/ui`, réservé à Pixie, et ne dépend d’aucun type métier du
Disneyiste.

Les composants Focale :

- reçoivent des chaînes, nombres, nœuds React et collections neutres ;
- ne connaissent ni Œuvre, ni contributeur, ni domaine de crédit ;
- ne lisent aucun catalogue, registre ou route ;
- ne chargent et ne filtrent aucune Archive ;
- n’importent aucun composant Pixie ;
- utilisent uniquement les rôles sémantiques déjà disponibles dans la page.

Le Plan adapte son modèle métier à ces contrats. Focale ne remonte jamais vers
la source pour compléter une donnée absente.

## Le noyau minimal

### FocaleScale

`createFocaleOrdinalScale` associe un domaine de chaînes unique à une plage de
valeurs neutres. La plage peut être plus courte que le domaine : elle boucle de
manière déterministe. Un domaine vide, dupliqué ou une plage vide échoue
immédiatement.

L’échelle ne choisit pas la signification de ses valeurs. Le Plan déclare
explicitement si une valeur représente une couleur, une forme ou un autre
canal perceptif.

### FocaleMark

Une marque possède une forme (`dot`, `bar` ou `line`), une couleur et une
valeur normalisée comprise entre 0 et 1. Elle est soit informative avec un
libellé obligatoire, soit décorative et retirée de l’arbre d’accessibilité.

Une marque ne porte aucun événement, tooltip ou navigation. L’interaction
appartient à la composition et à Pixie.

### FocaleLegend

La légende est une liste sémantique. Chaque entrée associe un libellé à une
marque et peut fournir une courte description. Elle explique un encodage ; elle
ne sert jamais de filtre implicite.

### FocaleAnnotation

L’annotation projette une note `info`, `uncertainty` ou `warning`. Son ton ne
remplace jamais son titre et son texte. Une provenance facultative peut être
affichée dans une zone distincte.

### FocaleViewport

Le viewport contient une composition dont les dimensions dépassent le cadre.
En mode défilable, il reçoit un nom accessible et devient parcourable au
clavier. Ses bornes sont des variables de composition, pas des dimensions
métier.

### FocaleTable

La table reçoit des colonnes et des lignes génériques. Elle conserve un vrai
`caption`, des entêtes `scope="col"`, des identifiants de ligne stables et un
état vide explicite. Elle n’ajoute ni tri, ni pagination, ni sélection.

Cette sobriété est essentielle : la première responsabilité de
`FocaleTable` est l’équivalence documentaire, pas l’administration des données.

## Tokens et présence visuelle

Focale ne crée aucune palette dans ce Train. Les primitives consomment des
valeurs CSS déjà résolues par leur composition et retombent sur :

- `--color-accent` pour la marque active ;
- `--color-surface` et `--color-surface-muted` pour les fonds ;
- `--color-ink` et `--color-ink-soft` pour la lecture ;
- `--color-muted` pour les repères secondaires ;
- `--color-line` et `--color-line-strong` pour les séparations ;
- `--radius-small` et `--radius-medium` pour contenir sans recréer un Décor.

Une future palette Focale exigera une direction de Huyang et plusieurs
encodages convergents. Aucun hexadécimal local n’entre dans ce noyau.

## Accessibilité

- une information n’est jamais portée par la couleur seule ;
- une marque informative possède un nom accessible ;
- une marque décorative reste silencieuse ;
- la légende conserve une liste lisible sans CSS ;
- les annotations emploient `role="note"` et nomment leur ton dans le texte ;
- le viewport défilable peut recevoir le focus et expose un contour visible ;
- la table reste complète, même lorsque la représentation choisit une vue
  partielle ;
- le mode contraste forcé conserve bordures et marques ;
- aucune primitive ne dépend du mouvement ou du survol.

## Fixture indépendante

`src/fixtures/focale/equipe-temoin.ts` décrit une équipe synthétique de cinq
contributions réparties dans trois groupes. Elle contient une mention non
résolue et des libellés longs, mais aucun nom, type ou domaine du Disneyiste.

Cette fixture prouve que la grammaire ne connaît pas Pinocchio. Le Train 8C
pourra adapter le modèle réel du Plan sans ajouter une prop propre à l’Œuvre.

## Contrôle

`pnpm check:focale` protège :

- le territoire et les six primitives autorisées ;
- l’absence de dépendance à Pixie et aux types métier ;
- la forme exacte de chaque dossier ;
- l’absence de valeurs colorimétriques isolées ;
- le comportement déterministe et les erreurs de l’échelle ;
- la neutralité et les états limites de la fixture ;
- les garanties sémantiques du markup ;
- le report explicite de `FocaleTooltip`.

## Passage au Train 8C

Le Train 8C pourra maintenant remplacer Blanche-Neige par Pinocchio dans le
prototype et composer les 31 contributions avec ce noyau. Il devra adapter les
données au bord du Plan, maintenir la table exhaustive et refuser toute prop
Focale nommée d’après une Archive du Disneyiste.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Focale ne raconte pas encore le générique. Elle lui donne juste assez de
grammaire pour que chaque geste visible puisse expliquer ce qu’il traduit._
