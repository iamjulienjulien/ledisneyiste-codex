# Acte VI · Phase 2 · Règle de publication des données financières

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce document transforme `DEC-008` en règle testable. Il ne corrige encore
aucune Archive et ne remplace pas une expertise comptable ou économique : il
définit les conditions minimales permettant au Codex de publier un coût, une
recette ou une fréquentation sans fabriquer une comparaison trompeuse.

Le principe directeur est simple : **conserver la déclaration originale,
nommer sa mesure et montrer ses limites avant de calculer quoi que ce soit**.

## Décision proposée en une image

Une donnée économique n’est publiable que si le Codex peut répondre à ces
questions :

1. que mesure-t-elle exactement ?
2. quelle valeur ou fourchette la source donne-t-elle ?
3. dans quelle unité et, le cas échéant, quelle devise ?
4. à quelle date monétaire, période et territoire s’applique-t-elle ?
5. s’agit-il d’un montant brut, net, fiscalisé, loué ou encaissé ?
6. quelle source l’affirme et par quelle méthode ?
7. est-ce un fait documenté, une estimation ou une valeur contestée ?
8. avec quoi peut-elle honnêtement être comparée ?
9. pourquoi sa publication éclaire-t-elle le récit ?

Une valeur isolée ne franchit pas la règle. L’ancienneté ou la précision
apparente d’un chiffre ne constituent pas une méthode.

## Les mesures à ne jamais confondre

| Mesure                      | Ce qu’elle décrit                                                            | Confusion interdite                                              |
| --------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Coût de production          | Dépense de fabrication selon le périmètre annoncé par la source.             | Budget annoncé, coût final et dépassement ne sont pas synonymes. |
| Recette brute au guichet    | Valeur des billets vendus, taxes et prélèvements selon la convention locale. | Elle n’est ni le revenu net du studio ni son bénéfice.           |
| Location distributeur       | Part remontée au distributeur selon les contrats et usages du territoire.    | Elle ne doit pas être renommée « box-office ».                   |
| Revenu ou recette du studio | Montant encaissé selon un périmètre comptable donné.                         | Il ne vaut pas automatiquement profit.                           |
| Bénéfice ou perte           | Résultat après charges définies par la méthode.                              | Il ne se déduit pas d’une simple soustraction artisanale.        |
| Entrées                     | Nombre de billets ou spectateurs comptabilisés.                              | Une entrée n’est ni une devise ni une recette.                   |
| Classement                  | Position dans un échantillon, une période ou un territoire.                  | Il ne mesure pas seul le succès financier.                       |

L’[UNESCO Institute for Statistics](https://databrowser.uis.unesco.org/glossary)
définit notamment le _gross box office_ comme les recettes de billetterie
incluant taxes et prélèvements. Le Codex conserve la terminologie exacte de la
source lorsqu’un autre régime comptable est utilisé.

## Identité minimale d’une donnée

Le futur contrat devra pouvoir exprimer les dimensions suivantes. Cette liste
documente un besoin de Phase 4 ; elle ne modifie pas encore
`DonneeEconomiqueOeuvre`.

| Dimension          | Obligation de publication                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| `metric`           | Coût, budget, recette brute, location, revenu, bénéfice, perte ou entrées.   |
| `value` ou `range` | Valeur originale ou fourchette, sans moyenne fabriquée.                      |
| `unit`             | Devise, entrées, indice ou autre unité explicitement nommée.                 |
| `currency`         | Code de devise lorsqu’une valeur est monétaire.                              |
| `currencyYear`     | Année ou date à laquelle la valeur nominale appartient.                      |
| `territory`        | Pays, zone, monde ou territoire réellement couvert.                          |
| `period`           | Date, intervalle ou caractère cumulatif de la mesure.                        |
| `basis`            | Brut/net, taxes incluses, locations, première exploitation, ressorties, etc. |
| `method`           | Méthode rapportée ou absence de méthode déclarée.                            |
| `certainty`        | Documenté, estimation, contesté ou calcul dérivé.                            |
| `source`           | Source précise portant cette déclaration.                                    |
| `comparability`    | Dimensions avec lesquelles une comparaison est admise ou refusée.            |
| `editorialPurpose` | Question documentaire éclairée par la donnée.                                |
| `notes`            | Réserves, conflit, lacunes et convention d’arrondi.                          |

Une donnée monétaire sans date monétaire, une fréquentation sans période ou
un montant sans nature exacte reste une **piste d’enquête**, pas un chiffre
prêt à projeter.

## Niveaux de publication

| Verdict                    | Conditions                                                                                                  | Projection publique                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `publishable`              | Identité complète, source solide, méthode et périmètre clairs, aucune contradiction irrésolue.              | Valeur et qualification visibles.                      |
| `publishable-with-reserve` | Identité complète, mais estimation, fourchette ou conflit utile au récit ; chaque version reste attribuée.  | Valeurs côte à côte avec réserve explicite.            |
| `investigation-only`       | Dimension critique absente, méthode opaque, source unique insuffisante ou contradiction non contextualisée. | Absente de la fiche ; conservée dans le dossier privé. |
| `excluded`                 | Valeur invérifiable, promotionnelle, calcul opaque, métriques confondues ou sans intérêt documentaire.      | Écartée et motif consigné.                             |

Le niveau de preuve de la source ne remplace pas l’identité de la mesure. Une
institution peut publier un cumul parfaitement fiable mais impropre à la
question « combien d’entrées en 1946 ? ».

## Algorithme de décision

Pour chaque déclaration financière :

1. **Conserver la formulation source.** Relever mesure, valeur, unité,
   territoire, période et qualificatifs avant toute normalisation.
2. **Identifier le périmètre.** Distinguer première exploitation, ressorties,
   cumul, brut, net, location et résultat.
3. **Qualifier la source.** Noter sa nature, son accès, sa date et sa méthode.
4. **Chercher les contradictions.** Enregistrer chaque déclaration séparément ;
   ne jamais fusionner par moyenne.
5. **Tester la complétude.** Une dimension critique absente conduit à
   `investigation-only`.
6. **Tester la pertinence.** Le chiffre doit répondre à une question du récit,
   pas seulement décorer la fiche.
7. **Attribuer le verdict.** Publier la valeur originale, publier avec réserve,
   reporter l’enquête ou exclure.
8. **Tester l’affichage.** L’interface doit rendre visibles unité, période,
   territoire, certitude et source sans dépendre d’une note cachée.

## Valeurs divergentes

Deux chiffres différents ne sont pas automatiquement incompatibles. Ils
peuvent mesurer des périmètres, périodes, territoires ou étapes comptables
distincts.

Le Codex doit :

- conserver chaque déclaration et sa source ;
- expliquer la différence connue sans choisir arbitrairement un « bon » chiffre ;
- afficher une fourchette seulement si une source ou une méthode la justifie ;
- refuser la moyenne de valeurs contradictoires ;
- reporter la publication lorsque les périmètres restent inconnus ;
- présenter côte à côte les estimations lorsque leur divergence éclaire le récit.

La précision typographique n’est pas une certitude documentaire : `1 488 423`
peut être moins comparable que `environ 1,5 million` si les méthodes diffèrent.

## Devises, inflation et conversions

La valeur nominale originale reste toujours la première donnée conservée et
publiée. Une conversion ne la remplace jamais.

Une valeur convertie ou actualisée devient une **donnée dérivée** distincte et
doit conserver :

- la valeur et la devise sources ;
- le taux de change ou l’indice utilisé ;
- la date ou période de ce taux ;
- l’année de base de l’indice ;
- la formule ;
- la convention d’arrondi ;
- la source méthodologique ;
- la date du calcul.

Le [Bureau of Labor Statistics](https://www.bls.gov/cpi/factsheets/cpi-math-calculations.pdf)
illustre les conversions d’inflation par rapport d’indices. Pour une conversion
de devise, le FMI recommande le taux de la transaction ou, s’il est
indisponible, une moyenne portant sur la période la plus courte possible dans
son [manuel de balance des paiements](https://www.imf.org/-/media/Files/Data/Statistics/BMP7/final-chapters/draft-bpm7-chapter-3-v11-flows-stocks-and-accounting-rules.ashx).

Les économies à taux multiples, contrôles de change et marchés parallèles
interdisent souvent une conversion mécanique. L’absence d’une méthode
historiquement défendable conduit au maintien de la seule valeur nominale.

## Épreuve sur les cas du corpus

| Cas                                                     | Verdict préparatoire              | Motif                                                                                                   |
| ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| _Pinocchio_ · 7,84 millions de spectateurs, CNC         | `publishable-with-reserve`        | Cumul documenté de 1946 à 2010 ; ne doit jamais devenir « entrées de 1946 ».                            |
| _Pinocchio_ · coûts et résultats initiaux rapportés AFI | `investigation-only` à ce stade   | Les versions divergentes doivent être extraites avec leur périmètre et leur attribution exacts.         |
| _Snow White_ · 20 millions d’entrées                    | `investigation-only` à réexaminer | Le territoire actuel est « non précisé par la source », dimension critique pour une fréquentation.      |
| _Snow White_ · coûts de 1,4 M$ et 1 488 423 $           | `investigation-only` à réexaminer | Deux estimations ne deviennent publiables côte à côte qu’après comparaison de leur méthode et portée.   |
| Conversion moderne d’un coût de 1940                    | `excluded` par défaut             | Aucune actualisation n’est utile sans question éditoriale, indice, année de base et formule explicites. |

Le palmarès du [CNC](https://www.cnc.fr/a-propos-du-cnc/palmares_136958)
constitue donc une bonne source pour établir une fréquentation cumulative et
un classement, mais pas pour isoler les seules entrées de la première année.

Ces verdicts portent sur la **publication du chiffre**, pas sur la qualité
générale de la source. Ils seront repris individuellement pendant les Phases
4, 6 et 7.

## Écart avec le contrat actuel

`DonneeEconomiqueOeuvre` sait déjà porter :

- coût de production, revenus ou entrées ;
- valeur, unité et devise ;
- territoire et période ;
- certitude ;
- sources.

Il ne distingue pas encore suffisamment :

- budget annoncé, coût final, recette brute, location et résultat ;
- valeur ponctuelle et fourchette ;
- année monétaire ;
- brut, net, taxes et ressorties ;
- méthode de calcul ;
- déclaration originale et donnée dérivée ;
- conflit entre plusieurs sources ;
- comparabilité et justification éditoriale ;
- verdict privé de publication.

La Phase 4 devra proposer l’évolution minimale du contrat après inventaire des
cas réels. Le verdict privé peut rester dans le dossier de production ; les
champs indispensables à la compréhension du chiffre doivent, eux, accompagner
la donnée publique.

## Règle testable pour l’Acte VI

Une projection économique est conforme lorsque :

- [ ] la mesure n’est pas un générique « revenus » lorsque la source dit box-office, location ou entrées ;
- [ ] valeur ou fourchette, unité, territoire et période sont présents ;
- [ ] une valeur monétaire conserve devise et année monétaire ;
- [ ] brut/net, taxes et périmètre d’exploitation sont connus ou signalés ;
- [ ] la certitude et la méthode sont visibles ;
- [ ] chaque déclaration possède sa propre source ;
- [ ] les contradictions ne sont ni moyennées ni effacées ;
- [ ] la valeur nominale originale précède toute conversion ;
- [ ] chaque donnée dérivée expose formule, indice ou taux, base, source et arrondi ;
- [ ] entrées et recettes ne sont jamais comparées comme une même métrique ;
- [ ] une dimension critique absente empêche la publication ;
- [ ] la donnée répond à une question documentaire identifiée.

## Transmission aux phases suivantes

- **Phase 4** : éprouver le contrat futur sur les déclarations réelles de
  _Pinocchio_ et _Snow White_, sans généraliser avant cet essai.
- **Phase 5** : réexaminer les données existantes de _Snow White_ selon la
  nouvelle règle ; ne pas les convertir automatiquement.
- **Phase 6** : publier le cumul CNC avec sa période complète seulement si le
  récit français l’emploie réellement.
- **Phase 7** : présenter les divergences américaines comme divergences
  attribuées, ou les maintenir dans l’enquête si leur méthode reste opaque.
- **Phase 9** : vérifier que les Cards, tableaux et métadonnées exposent les
  qualifications indispensables à la lecture.

## Décision `DEC-008`

**Valider une publication fondée sur l’identité complète de la mesure :
valeur originale d’abord, contradictions attribuées sans moyenne, conversions
seulement comme données dérivées reproductibles, et report de toute valeur
privée d’une dimension critique.**

Julien valide cette règle le 1er septembre 2026. Elle devient le filtre de
publication des données financières de l’Acte VI et le contrat d’entrée pour
leur modélisation pendant la Phase 4.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Un chiffre n’entre en scène qu’avec son unité, son temps et sa méthode_
