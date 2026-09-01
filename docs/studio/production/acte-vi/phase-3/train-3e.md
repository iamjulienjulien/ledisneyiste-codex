# Acte VI · Phase 3 · Train 3E

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3E fait entrer l’identité résolue dans les surfaces publiques du
Codex. Les Cards, les listes et les en-têtes de fiche reçoivent désormais une
projection déjà arbitrée ; ils ne lisent ni les catalogues ni les fiches pour
reconstituer eux-mêmes un nom.

## Une composition commune

`CodexCommonIdentite` porte la hiérarchie visuelle des quatre familles :

1. la forme principale demeure le véritable titre de la surface ;
2. la forme originale apparaît ensuite lorsqu’elle est documentée et distincte ;
3. sa nature, sa langue et son éventuel territoire restent lisibles en toutes
   lettres.

Le composant adapte uniquement son échelle aux présences `hero`, `card` et
`list`. Le niveau de titre reste décidé par la surface qui l’accueille : `h1`
sur une fiche, `h2` dans une collection.

## Langue et territoire sans raccourci

Le préparateur pur `preparerAffichageIdentiteCodex` transforme la projection
métier en une matière prête à afficher. Il produit par exemple :

- `Atchoum`, puis _Sneezy_ — **Nom original · Anglais** ;
- `Blanche-Neige et les Sept Nains`, puis _Snow White and the Seven Dwarfs_ —
  **Titre original · Anglais · États-Unis**.

Les libellés s’appuient sur les registres de langue et de territoire du Train
3A. Aucun drapeau ni code opaque ne remplace le texte. L’attribut HTML `lang`
est transmis à chaque forme lorsqu’il est connu ; une langue principale encore
indéterminée n’est pas inventée.

## Montage serveur

La résolution reste à la frontière des routes Next.js :

- les quatre index résolvent l’identité avant de monter Cards ou listes ;
- les quatre fiches exigent la jointure catalogue–fiche avant leur projection ;
- la recherche remet la même projection aux Cards qu’elle réutilise ;
- les composants reçoivent `ProjectionIdentiteCodex<Famille>` en prop.

La séparation est volontaire. Une surface ne connaît ni chemin de données, ni
règle de jointure, ni fallback documentaire. Les routes conservent ainsi leur
responsabilité de montage et les composants restent des outils de projection.

## Continuité visuelle

La forme principale garde la typographie d’affiche et les accents familiaux
déjà portés par les liens. La forme originale adopte une présence secondaire,
mais son qualificatif demeure visible dans les deux Lumières.

Les titres longs disposent d’un retour à la ligne explicite et d’une largeur
réductible dans les compositions flex. Les contrastes forcés neutralisent les
différences de couleur sans retirer l’information. Les formes principale et
originale restent du texte sélectionnable, annoncé dans l’ordre du document.

## Périmètre éprouvé

Le Train couvre les surfaces structurantes déjà partagées :

- `CodexFicheHeader` ;
- les quatre Cards d’index ;
- `CodexIndexListItem` ;
- les Cards réutilisées par la recherche.

La bobine privée vérifie une identité de personnage et une identité d’œuvre
avec langue et territoire. Les Archives existantes fournissent en complément
plusieurs personnages dont la forme originale est déjà documentée.

## Frontière tenue

Le Train 3E n’a :

- modifié aucun slug ni aucune route ;
- réécrit aucun nom principal dans les catalogues ;
- transformé aucun titre territorial en titre original ;
- ajouté aucune langue principale non documentée ;
- lancé aucune migration massive des Archives ;
- commencé la rétroapplication éditoriale de la Phase 5.

## Passage au Train 3F

Les surfaces savent désormais montrer un nom principal et son origine sans
confondre identité, route et donnée éditoriale. Le Train 3F peut fermer la
phase par une répétition transversale : intégrité du schéma, recherche,
navigation, accessibilité et continuité des montages.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Un nom entre en scène. Son histoire peut rester juste derrière lui._
