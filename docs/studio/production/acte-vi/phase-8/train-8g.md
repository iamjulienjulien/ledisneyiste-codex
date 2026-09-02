# Acte VI · Phase 8 · Train 8G · Arbitrer et appliquer le Générique vivant

> **Document interne de production**<br>
> Verdicts rendus par **🐭 Julien** et appliqués par **🔩 R2-D2**, Lead
> Developer chez **Guru Éditions**.

## Point d’arrêt

Le Train 8G transforme l’audit du Train 8F en décisions exécutables. Il ne
généralise ni la maturité du Générique vivant aux quatre autres Plans, ni le
cycle de promotion de Pixie aux lectures documentaires.

## Verdicts de direction

| Question               | Verdict                                                   | Application                                                                      |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Destination du Plan    | Expérimentation publique réversible limitée à _Pinocchio_ | Une seule fiche publique reçoit le modèle dérivé.                                |
| Position dans la fiche | Après le montage documentaire du générique                | Le Plan occupe la section Générique de _Pinocchio_.                              |
| Lecture initiale       | Plan par défaut                                           | Une action permet de retrouver immédiatement le générique simple.                |
| Contrôles publics      | Aucune Régie                                              | Recherche, filtres, ordre, matière, Lumière et Gros plan restent dans l’Atelier. |
| Statut de Focale       | Noyau réutilisable reconnu                                | Le noyau reste strictement limité à ses six primitives présentes.                |
| Nom et version         | `PlanGeneriqueVivant` v1.0.0                              | Le composant vit dans `src/components/plans`, jamais dans Pixie.                 |
| Workflow des Plans     | Différé                                                   | Le deuxième Plan appliqué devra fournir la matière d’un arbitrage commun.        |
| Visa artistique        | Direction actuelle validée                                | Aucun visa supplémentaire de Huyang n’est requis pour ce passage.                |
| Visa humain            | Accordé par Julien                                        | La relecture humaine du prototype clôt la réserve visuelle du Train 8F.          |
| Portée du Train        | Application comprise                                      | Le point d’arrêt livre aussi le composant et son raccord public.                 |

## Application technique

- la route Œuvre dérive le modèle depuis `codexPlanArchives` côté serveur ;
- le composant client reçoit uniquement ce modèle sérialisable et le
  générique simple déjà rendu ;
- la fiche de _Pinocchio_ affiche le Plan par défaut ;
- les autres Œuvres conservent leur projection antérieure ;
- les 31 contributions, 8 domaines, 30 fiches publiées, la mention non publiée
  d’Evelyn Venable et leurs provenances restent inchangés ;
- le contrechamp tabulaire et le générique simple empêchent toute dépendance à
  la seule visualisation ;
- aucune Bobine témoin n’entre dans une route publique.

## Frontières conservées

`PlanGeneriqueVivant` n’est ni `PixieGeneriqueVivant`, ni une primitive Focale.
Pixie construit ses surfaces et actions ; Focale traduit ses mesures ; le Plan
porte la question et adapte le modèle métier.

La version 1.0.0 atteste uniquement cette application. Elle ne permet pas de
déclarer les autres Plans stables, de leur attribuer une version publique ou
d’ajouter une primitive Focale sans nouvelle preuve.

## Passage au Train 8H

Le dernier Train devra vérifier le raccord public, synchroniser la
documentation de la Phase 8 et transmettre les réserves restantes. La
vérification visuelle de la fiche publique après intégration demeure un
contrôle distinct du visa déjà donné au prototype.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Un seul Plan sort de l’Atelier. Il emporte son contrechamp, pas les clés de
toute la salle._
