# Acte VI · Phase 6 · État de référence du noyau Pinocchio

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.<br>
> Persona de production : **Geppetto**, pour la durée de la Phase 6.

## Fonction du document

Ce relevé ouvre le Train 6A avant toute écriture produit. Il fixe la matière
réellement présente dans le dépôt, ferme la liste des Archives à produire et
installe le contrôle qui accompagnera chaque pièce jusqu’à sa publication.

La Phase 6 ne prolonge pas la rétroapplication : elle fabrique le premier
noyau documentaire entièrement conçu pour les contrats des Phases 3 et 4.
[`production.json`](./production.json) est sa feuille de débit. Chaque entrée
y conserve son domaine, sa profondeur, ses sources, ses relations, ses
fichiers, ses contrôles et ses réserves.

## Verdict d’ouverture

L’établi est prêt. La Phase 5 livre cinq familles publiques, 83 Archives et
83 routes canoniques, tout en protégeant 45 routes historiques. Le registre
central contient 208 sources. Le registre privé de Phase 2 contient 32
candidates consacrées à _Pinocchio_ ; seules deux d’entre elles ont déjà été
promues pour les Chansons rétrospectives.

La cible est fermée à **26 nouvelles Archives publiques** : une Œuvre, onze
Personnages, neuf Créateurs et cinq Chansons. Elle conduit le Codex à **109
Archives et 109 routes**, sans ouvrir de famille ni d’Époque supplémentaire.

## État chiffré au 2 septembre 2026

| Repère                                       | Référence | Cible |
| -------------------------------------------- | --------: | ----: |
| Familles publiques                           |         5 |     5 |
| Archives et routes canoniques                |        83 |   109 |
| Œuvres                                       |        23 |    24 |
| Personnages                                  |        22 |    33 |
| Créateurs                                    |        32 |    41 |
| Chansons                                     |         4 |     9 |
| Époques                                      |         2 |     2 |
| Récompenses transversales                    |        14 |    16 |
| Routes historiques protégées                 |        45 |    45 |
| Sources du registre central                  |       208 |     — |
| Sources candidates de Phase 2                |        32 |     — |
| Sources candidates déjà centrales            |         2 |     — |
| Sources candidates encore privées au maximum |        30 |     — |

## Bobine publique fermée

| Train | Domaine     | Complètes | Légères |  Total |
| ----- | ----------- | --------: | ------: | -----: |
| 6B    | Œuvres      |         1 |       0 |      1 |
| 6C    | Personnages |         6 |       5 |     11 |
| 6D    | Créateurs   |         6 |       3 |      9 |
| 6F    | Chansons    |         1 |       4 |      5 |
|       | **Total**   |    **14** |  **12** | **26** |

Le livre de Collodi demeure une Œuvre source interne. Cléo reste une relation,
Evelyn Venable un crédit et les deux Oscars des unités transversales. Aucun de
ces cinq objets ne reçoit une route publique.

## Reprises de la Phase 5

Le Train reprend exactement dix-neuf raccords : dix-huit Créateurs et
`temps-des-chefs-d-oeuvre`. David Hand demeure hors de cette bobine : son rôle
reste comparatif et aucun crédit _Pinocchio_ ne doit être inventé.

Les reprises ne sont pas des mutations automatiques. Frank Thomas, Eric Larson
et Ollie Johnston resteront sans relation tant qu’une source exploitable ne
qualifiera pas leur contribution exacte.

## Sources sous contrôle

Le fichier privé [`../phase-2/sources.json`](../phase-2/sources.json) reste une
matrice de recherche, jamais une dépendance cliente. Une notice rejoint
`src/data/sources/sources.json` uniquement au moment où une Archive la cite.

Le vérificateur protège :

- l’empreinte du registre privé de Phase 2 ;
- ses 32 identifiants et les deux recouvrements déjà centraux ;
- l’absence de promotion en bloc des 30 autres notices ;
- la séparation entre sources requises et sources effectivement promues.

## Inventaire des Symboles

Les cinq collections d’index possèdent chacune leurs neuf Symboles projetables :

| Collection          | PNG | Symbole principal | Verdict |
| ------------------- | --: | ----------------- | ------- |
| `index/oeuvres`     |   9 | `principal`       | Prête   |
| `index/personnages` |   9 | `principal`       | Prête   |
| `index/createurs`   |   9 | `principal`       | Prête   |
| `index/chansons`    |   9 | `principal`       | Prête   |
| `index/epoques`     |   9 | `principal`       | Prête   |

La doctrine des Symboles décrit des fonctions documentaires, pas des effigies
de personnages ou des emblèmes propres à une seule fiche. Aucun manque
artistique ne bloque donc le noyau. Huyang reste disponible si une future
surface démontre un besoin qui ne peut pas être servi par les collections
existantes ; aucune commande n’est ouverte au Train 6A.

## Garde-fous installés

`pnpm check:phase-6` vérifie dès l’ouverture :

- la photographie des 83 Archives et des cinq familles ;
- la cible exacte de 26 créations et sa répartition 1 / 11 / 9 / 5 ;
- les cinq unités internes sans route ;
- les dix-neuf reprises issues de la Phase 5 ;
- les 32 sources candidates et leur recouvrement central ;
- les cinq collections de neuf Symboles ;
- l’absence prématurée des nouvelles Archives dans le produit ;
- la présence du contrôle dans `check` et `check:ci`.

## Passage au Train 6B

Le prochain Train pourra ouvrir verticalement l’Archive centrale : promouvoir
les premières sources à l’usage, publier _Pinocchio_, résoudre _Le avventure
di Pinocchio_, créer Carlo Collodi et raccorder le film au Temps des
chefs-d’œuvre. Il n’aura plus à redécider la taille du corpus ni la frontière
de ses routes.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le bois est choisi, les gabarits sont tracés. Geppetto peut maintenant donner
vie à la première Archive sans scier au-delà du dessin._
