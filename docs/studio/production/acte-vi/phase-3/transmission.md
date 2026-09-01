# Acte VI · Phase 3 · Transmission des identités

> **Document interne de transmission**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Ce que la production reçoit

La Phase 3 remet aux chantiers suivants un contrat commun pour documenter,
retrouver, afficher et faire naviguer plusieurs formes d’une même identité.

Le moteur est prêt. Le corpus reste volontairement mesuré : 15 formes
documentées éprouvent le contrat actuel, tandis que la rétroapplication des
69 entrées appartient toujours à la Phase 5.

## Phase 4 · Ouvrir les nouveaux domaines

Les domaines Chansons et Œuvres sources doivent adopter les mêmes séparations
dès leur conception :

- entrée légère et route canonique dans leur catalogue ;
- formes documentées et sources dans leur fiche ;
- résolution serveur avant recherche ou projection ;
- aucun slug dérivé automatiquement d’une traduction ;
- extension explicite de `CodexFamily` et des segments de routes seulement
  lorsque le domaine devient réellement publié.

Le contrat générique peut être étendu. Il ne faut pas copier le résolveur dans
chaque nouveau domaine.

## Phase 5 · Rétroappliquer sans casser

La Phase 5 possède le manifeste privé de 69 entrées et l’inventaire de 45
routes historiques à préserver. Son ordre de travail recommandé est :

1. migrer l’échantillon R3 de Blanche-Neige ;
2. éprouver un personnage, une œuvre, un créateur et une époque ;
3. enrichir les fixtures avec les cas réellement rencontrés ;
4. avancer par lots bornés et mesurer les totaux après chaque lot ;
5. conserver les routes avant d’enrichir les formes ;
6. arrêter une entrée au niveau R2 lorsque ses preuves ne justifient pas R3.

Le succès se mesure aux références résolues, sources valides, collisions
absentes et routes conservées — pas au nombre maximal de variantes ajoutées.

## Phase 6 · Faire entrer Pinocchio

Les fiches de _Pinocchio_, de Collodi, des Personnages et des Créateurs
pourront distinguer :

- forme courante française ;
- forme originale anglaise ou italienne ;
- forme de sortie territoriale ;
- alias de personnage documenté ;
- ancienne appellation, lorsqu’une source en établit l’usage.

Une identité italienne décrit la matière. Elle n’ouvre pas une interface
italienne ni une route localisée. Les noms de doublage restent liés à leur
territoire, leur version et leurs sources.

## Phase 9 · Achever les projections publiques

La répétition finale de l’Acte devra reprendre :

- les recherches par formes françaises, anglaises et italiennes ;
- la déduplication vers une seule Archive ;
- les attributs de langue et les qualifications visibles ;
- les titres longs dans les Cards, listes et fiches ;
- l’inventaire canonique et les redirections réellement justifiées ;
- l’absence d’alias fabriqué à partir d’un simple titre.

Les médias éventuels d’une Chanson ne changent pas son identité canonique.
Leur disponibilité reste un enrichissement, jamais la condition d’une route
ou d’un résultat de recherche.

## Risques transmis

| Risque                                           | Garde-fou                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| Confondre traduction et identité territoriale    | Nature, langue, territoire et sources obligatoires selon le cas. |
| Déduire une langue depuis un pays ou une graphie | Valeur absente conservée comme telle.                            |
| Transformer chaque forme en URL                  | Slug canonique séparé des identités documentées.                 |
| Dupliquer un résultat de recherche               | Déduplication par famille et slug.                               |
| Migrer 69 entrées sans profondeur documentaire   | Manifeste R2/R3 et lots bornés de la Phase 5.                    |
| Réimplémenter la jointure dans les composants    | Résolution serveur et `ProjectionIdentiteCodex` en props.        |

## Point de reprise

Les chantiers suivants commencent par
[`contrat-identites.md`](./contrat-identites.md), puis consultent les bobines
des Trains 3A à 3E selon leur besoin. Le vérificateur automatisé est le filet
commun ; il ne remplace ni l’arbitrage documentaire ni la relecture visuelle.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le moteur est transmis. Les prochaines Archives choisiront leurs formes sans perdre leur chemin._
