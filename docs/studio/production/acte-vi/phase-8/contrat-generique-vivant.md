# Acte VI · Phase 8 · Contrat du Générique vivant

> **Document interne de production**<br>
> Conduit par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Le Générique vivant est un **Plan documentaire** : il répond à la question
« Comment une production s’organise-t-elle humainement ? » en donnant à lire
les personnes, leurs rôles, leurs domaines et les relations qui peuvent être
dérivées de ces crédits.

Il n’est ni un composant Pixie, ni une visualisation Focale isolée. Il compose
ces deux langages autour d’une matière documentaire qui leur préexiste.

## Les quatre responsabilités

| Couche   | Question                                  | Responsabilité                                                 | Interdit principal                             |
| -------- | ----------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| Archives | Qu’est-ce qui est documenté ?             | conserver contributions, identités, rôles, domaines et sources | inventer ou déduire un crédit                  |
| Plan     | Que voulons-nous comprendre ?             | choisir Sujet, Angle, Objectif, Cadre et contrechamp           | devenir une primitive réutilisable d’interface |
| Pixie    | Comment agit-on sur la projection ?       | fournir surfaces, contrôles, navigation, états et retours      | encoder le sens ou la géométrie des données    |
| Focale   | Comment la matière devient-elle visible ? | définir marques, échelles, légendes, annotations et viewport   | router, charger ou modifier les Archives       |

Cette séparation est une frontière d’architecture. Un même Plan peut faire
évoluer sa composition sans renommer ses données ; une même primitive Focale
peut servir plusieurs Plans sans connaître Pinocchio ; un contrôle Pixie peut
changer l’Angle sans calculer lui-même la visualisation.

## Contrat documentaire du Plan

Le modèle dérivé doit conserver pour chaque contribution :

- un identifiant stable dans la projection ;
- une personne, résolue ou explicitement non résolue ;
- l’Œuvre concernée ;
- au moins un rôle non vide ;
- un domaine qualifié ou un groupe « non classé » explicite ;
- une provenance non vide ;
- une clé de recherche dérivée, jamais une nouvelle donnée d’Archive.

Les groupes sont dérivés des contributions. Leur ordre peut suivre le registre
des domaines de crédits, mais cet ordre ne constitue ni une hiérarchie humaine,
ni un jugement de valeur. Une récurrence ou une collaboration ne peut être
montrée que si elle est calculable depuis les crédits disponibles.

## Contrat du contrechamp public

La fiche Œuvre conserve une lecture linéaire groupée par domaine. Cette liste :

- demeure accessible sans interaction ni visualisation ;
- affiche les noms non résolus comme du texte, sans faux lien ;
- conserve tous les rôles publiés ;
- ne dépend ni du JavaScript du prototype, ni d’une géométrie Focale ;
- reste la référence de comparaison pour l’exhaustivité du Plan.

Une future projection plus riche peut compléter ce contrechamp. Elle ne peut
pas le rendre incomplet, le masquer aux technologies d’assistance ou remplacer
ses libellés par la seule couleur, la taille ou la position.

## Contrat Pixie

Pixie reste le design system de l’interface. Dans le Générique vivant, il peut
notamment porter :

- le panneau et les contrôles de Régie ;
- la recherche, les filtres et les choix d’Angle ;
- les badges de quantité ou d’état ;
- les surfaces, séparateurs, régions sticky et actions ;
- les messages d’attente, de vide, d’incomplétude ou d’erreur.

Pixie ne reçoit aucun composant `PixieGeneriqueVivant` ou
`PixieDustGeneriqueVivant`. Le Plan ne suit pas le workflow de promotion des
composants de l’Atelier.

## Contrat Focale

Focale est la grammaire parallèle dédiée à la visualisation de données. Son
premier noyau sera installé au Train 8B. Il devra pouvoir exprimer au minimum :

- des **marques** pour les personnes, rôles et groupes ;
- des **échelles** qui traduisent une mesure explicite ;
- des **légendes** qui nomment les encodages ;
- des **annotations** pour les absences, réserves et provenances ;
- un **viewport** qui contient la densité sans perdre le clavier ;
- une **table** ou une lecture équivalente pour le contrechamp.

Une marque Focale n’est jamais une preuve en elle-même. La taille, la couleur,
la proximité ou l’ordre visuel doivent être expliqués par une règle déclarée.
Aucune position ne peut fabriquer une collaboration ou une importance absente
des Archives.

## Contrat des états

| État         | Sens documentaire                                 | Réponse attendue                                  |
| ------------ | ------------------------------------------------- | ------------------------------------------------- |
| `empty`      | aucune contribution dans le Cadre                 | expliquer l’absence sans inventer une équipe      |
| `sparse`     | matière trop réduite pour la composition complète | simplifier la projection sans surjouer la donnée  |
| `ready`      | matière suffisante et résolue                     | permettre l’exploration normale                   |
| `dense`      | matière abondante                                 | hiérarchiser la lecture, jamais les personnes     |
| `incomplete` | une ou plusieurs références restent ouvertes      | conserver les contributions et signaler la limite |
| `error`      | la dérivation ne peut être établie                | préserver une explication et un retour sûr        |

L’état qualifie la disponibilité de la matière, jamais la qualité d’une Œuvre
ou la valeur d’un contributeur.

## Contrat de vérification

`check:phase-8` doit échouer si :

1. les 31 contributions de Pinocchio ou leurs rôles dérivent ;
2. la distribution sur huit domaines change sans nouvelle décision ;
3. les 30 références résolues ou Evelyn Venable non résolue sont perdues ;
4. une contribution dérivée n’a plus de provenance ;
5. le corpus vide invente une contribution ;
6. le grand générique ne conserve plus ses 240 crédits et neuf groupes ;
7. le prototype de référence quitte silencieusement la v0.1.0 ;
8. un faux composant Pixie de Générique vivant apparaît.

## Verdicts différés

Le Train 8A ne prononce aucun verdict de promotion. La Phase devra évaluer
séparément :

- la maturité du **Plan Générique vivant** ;
- la maturité de la **grammaire Focale** ;
- l’usage approprié des composants **Pixie** déjà promus.

Ces verdicts pourront diverger. Une visualisation Focale prometteuse ne rend
pas automatiquement le Plan publiable ; un Plan concluant ne transforme pas
automatiquement ses primitives en design system stable.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Pixie règle la salle. Focale règle le regard. Le Plan choisit ce qui mérite
d’être compris. Les Archives, elles, gardent toujours le dernier mot._
