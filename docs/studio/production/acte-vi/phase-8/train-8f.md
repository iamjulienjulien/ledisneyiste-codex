# Acte VI · Phase 8 · Train 8F · Éprouver séparément le Plan et Focale

> **Document interne de production**<br>
> Conduit par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Le Train 8F ne cherche plus à embellir le prototype. Il confronte le
_Générique vivant_ v0.2.0 au générique public simple de _Pinocchio_, puis juge
séparément ce que le Plan apporte à la lecture et ce que Focale apporte au
Plan.

L’épreuve conserve trois mesures distinctes : **comprendre**, **retrouver** et
**restituer sans perte**. Une préférence de mise en scène ne compte jamais
comme un gain documentaire.

## Photographie contrôlée

| Mesure                          | Générique public |        Plan v0.2.0 |
| ------------------------------- | ---------------: | -----------------: |
| Contributions restituées        |               31 |                 31 |
| Domaines documentaires          |                8 |                  8 |
| Références résolues             |               30 |                 30 |
| Mentions non publiées           |                1 |                  1 |
| Recherche dédiée                |                0 |                  1 |
| Angles de lecture               |                1 |                  5 |
| Contrôles de régie produit      |                0 |                  6 |
| Contrôles du banc d’essai privé |                0 |                  2 |
| Contrechamp exhaustif           |     Liste simple | Table de 31 lignes |

La régie produit compte la recherche, l’Angle, le Domaine, la Présence,
l’Ordre et le Gros plan. La Matière et la Lumière appartiennent uniquement au
banc d’essai ; elles ne constituent pas une proposition publique.

## Matrice avant / après

| Tâche                                     | Générique public simple                                         | Générique vivant v0.2.0                                                                                           | Verdict                                                      |
| ----------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Retrouver une personne                    | Parcours des huit groupes ou recherche du navigateur.           | Recherche par nom, rôle, domaine et œuvre, avec compteur vivant.                                                  | **Gain net de repérage.**                                    |
| Comprendre les huit domaines              | Huit cartes nommées, exhaustives et immédiatement lisibles.     | Légende, groupes, effectifs et proportions sur 31 contributions.                                                  | **Gain de compréhension relative**, sans remplacer la liste. |
| Identifier les rôles d’une personne       | Le rôle est déjà placé sous son nom.                            | Carte, recherche et Gros plan réunissent rôles, présence, œuvres, sources et provenance.                          | **Gain de contexte**, pas d’exhaustivité.                    |
| Observer une récurrence entre œuvres      | Impossible depuis le générique d’une seule Œuvre.               | L’angle Récurrences dérive les présences depuis l’ensemble des Archives.                                          | **Gain documentaire propre au Plan.**                        |
| Repérer une référence non publiée         | Evelyn Venable reste visible et non cliquable dans son domaine. | Badge, filtre Présence, annotation et contrechamp la rendent directement repérable.                               | **Gain de vitesse**, vérité inchangée.                       |
| Lire les 31 contributions sans JavaScript | Lecture native, courte et complète.                             | Le rendu statique contient les huit groupes, les 31 contributions, Evelyn Venable et le contrechamp.              | **Exhaustivité égale**, mais lecture plus longue.            |
| Revenir à une lecture simple              | C’est la forme par défaut.                                      | Le contrechamp tabulaire conserve les mêmes faits, mais demande un défilement horizontal dans les cadres étroits. | **Repli obligatoire à préserver.**                           |

## Utilité du Plan

### Acquis démontrés

1. **Retrouver.** Une personne ou un rôle précis cesse de dépendre d’un long
   parcours visuel.
2. **Comparer.** Les effectifs rendent visible l’écart entre les dix
   contributions d’Animation et les domaines qui n’en portent qu’une, sans
   qualifier leur importance.
3. **Relier.** L’angle Récurrences répond à une question que le générique
   public isolé ne peut pas traiter.
4. **Inspecter.** Le Gros plan réunit rôle, présence, œuvres, sources et
   provenance sans créer de nouvelle fiche.
5. **Nommer les limites.** L’absence de responsabilités multiples devient un
   état vide honnête ; Evelyn Venable demeure une mention non publiée.

### Frictions conservées

- la régie ajoute six commandes avant la matière documentaire ;
- les cinq angles demandent un apprentissage que la liste simple n’impose pas ;
- la scène et son style représentent **1 392 lignes**, contre une projection
  publique volontairement beaucoup plus directe ;
- la table exhaustive à six colonnes protège le sens, mais elle est dense et
  défilable sur petit écran ;
- le grand générique de 240 crédits valide la résistance du modèle, pas la
  pertinence d’une interface aussi dense dans le produit public.

Le Plan complète donc la liste. Il ne justifie jamais sa disparition.

## Valeur et coût de Focale

Le noyau expérimental contient six responsabilités et **850 lignes** de types,
composants et styles : Scale, Mark, Legend, Annotation, Viewport et Table.

| Primitive          | Preuve fournie par le prototype                                           | Verdict 8F                                     |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------- |
| `FocaleScale`      | Associe chaque domaine à une couleur stable sans recevoir de type métier. | Utile et neutre.                               |
| `FocaleMark`       | Exprime une part du générique avec une alternative textuelle.             | Utile si la mesure reste explicitée.           |
| `FocaleLegend`     | Associe domaine, couleur et effectif.                                     | Utile et réutilisable.                         |
| `FocaleAnnotation` | Porte la réserve sur Evelyn Venable et la nature de la Matière.           | Utile au-delà du seul Plan.                    |
| `FocaleViewport`   | Contient densité et débordement au clavier.                               | Utile, proche d’un montage Pixie à surveiller. |
| `FocaleTable`      | Restitue les 31 lignes et toute information exprimée visuellement.        | Indispensable comme contrechamp.               |

Les primitives sont neutres et disposent d’une fixture indépendante, mais un
seul usage métier réel ne suffit pas encore à proclamer Focale design system
actif. La frontière avec Pixie devra notamment être rééprouvée pour
`FocaleViewport` et `FocaleAnnotation` sur un second Plan.

## Audit d’accessibilité et de continuité

| Contrôle                    | Résultat                     | Preuve ou réserve                                                                                                           |
| --------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Sémantique                  | **Conforme**                 | Régions nommées, titres ordonnés, listes, boutons natifs, `details` et table avec caption.                                  |
| Clavier                     | **Conforme techniquement**   | Recherche, sélecteurs, cartes, fermeture du Gros plan et viewports utilisent des contrôles focalisables avec focus visible. |
| Annonces dynamiques         | **Conforme**                 | Le nombre de résultats est placé dans une région `aria-live="polite"`.                                                      |
| Information sans couleur    | **Conforme**                 | Domaines, effectifs, statuts, relations et réserves sont tous nommés.                                                       |
| Sans JavaScript             | **Conforme**                 | La sortie statique de production contient Pinocchio, Evelyn Venable, les 31 contributions et le contrechamp.                |
| Mouvement réduit            | **Conforme**                 | Transitions et animations sont neutralisées sans retirer de contenu.                                                        |
| Contraste renforcé          | **Conforme techniquement**   | Mark, Annotation, Table et Viewport possèdent un traitement `forced-colors`.                                                |
| Petit écran                 | **Conforme par structure**   | Réglages empilés sous 30 rem, cartes fluides, inspecteur replacé dans le flux et table défilable.                           |
| Grand écran                 | **Conforme après raccord**   | Inspecteur sticky borné, variante flottante refermable et régie aérée.                                                      |
| Zoom 200 % et deux Lumières | **Visa humain final requis** | Aucun contenu n’est supprimé par les règles responsive ; la validation sensible reste à Julien avant le verdict 8G.         |

## Contrôles exécutés

- `check:phase-8` ;
- `check:focale` ;
- `check:plans` ;
- `check:plan-matter` ;
- `check:oeuvres` ;
- TypeScript sans émission ;
- ESLint ;
- build de production : **146 pages générées** ;
- inspection de l’arbre accessible du prototype et de sa sortie statique.

Tous les contrôles techniques passent. Les 109 routes publiques restent
inchangées et aucune surface publique n’a été modifiée.

## Recommandation de R2-D2

### Générique vivant

**Recommander au Train 8G une expérimentation publique réversible, limitée à
Pinocchio et subordonnée au visa de Julien.**

Le Plan démontre une valeur documentaire distincte pour la recherche, la
lecture relative des domaines et les récurrences entre œuvres. Cette valeur ne
justifie toutefois ni le remplacement du générique simple, ni une application
générale. Toute expérimentation devra :

- conserver la liste simple comme repli immédiat ;
- nommer explicitement le Générique vivant comme un Plan ;
- rester désactivable sans migration de données ;
- ne rien modifier dans les 31 contributions ni dans leur provenance.

### Focale

**Conserver Focale comme grammaire expérimentale locale et différer son statut
de design system actif jusqu’à un second usage réel.**

Le noyau est techniquement sain, neutre et utile au Générique vivant. Sa
réutilisabilité n’est pas encore démontrée hors de ce premier cas. Le prochain
Plan qui mobilisera réellement Scale, Mark, Legend, Annotation, Viewport ou
Table devra confirmer les frontières avant toute stabilisation.

## Passage au point d’arrêt 8G

Le Train 8F remet à Julien trois décisions séparées :

1. autoriser ou refuser l’expérimentation publique réversible du Plan sur
   _Pinocchio_ ;
2. confirmer que le générique simple demeure le repli de référence ;
3. conserver Focale en expérimentation locale ou demander un autre statut.

Aucune de ces recommandations ne produit de route, de composant public ou de
version stable avant la décision.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le Plan a gagné le droit d’être jugé sur son utilité ; Focale, celui de devoir
encore faire ses preuves._
