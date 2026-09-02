# Acte VI · Phase 8 · État de référence du Générique vivant

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce relevé ouvre le Train 8A avant toute nouvelle mise en scène. Il mesure la
matière réellement transmise par la Phase 7, le prototype privé v0.1.0 et son
contrechamp public. Ces trois états ne sont pas encore un verdict : ils
constituent la bobine de référence à laquelle la Phase 8 devra pouvoir revenir.

## Verdict d’ouverture

Le Générique vivant possède déjà une grammaire documentaire exploitable. Son
dérivateur sait lire les crédits publiés, préserver leurs rôles et leur
provenance, regrouper les contributions par domaine et signaler les références
non résolues. Son prototype privé reste toutefois consacré à
_Blanche-Neige et les Sept Nains_ en **v0.1.0**. La fiche publique de l’Œuvre
projette de son côté un générique volontairement simple, groupé par familles de
métiers dans `CodexFicheOeuvreDetails`.

Le Train 8A ne remplace aucune de ces surfaces. Il les rend mesurables avant
d’introduire Pinocchio, Focale ou une nouvelle composition.

## État chiffré au 2 septembre 2026

| Repère                                        | État de référence |
| --------------------------------------------- | ----------------: |
| Archives et routes canoniques                 |               109 |
| Contributions publiées pour Pinocchio         |                31 |
| Domaines de crédits représentés               |                 8 |
| Références de contributeurs résolues          |                30 |
| Références de contributeurs non résolues      |                 1 |
| Contributions portant plusieurs rôles         |                 0 |
| Prototype privé du Générique vivant           |            v0.1.0 |
| Sujet du prototype privé                      |     Blanche-Neige |
| Crédits de la Bobine « Très grand générique » |               240 |
| Domaines synthétiques de cette Bobine         |                 9 |

La seule référence non résolue de Pinocchio est **Evelyn Venable**, créditée
comme voix originale de la Fée Bleue. Son absence de route n’efface ni son nom,
ni son rôle, ni sa place dans le domaine de l’interprétation vocale.

## Distribution du générique de Pinocchio

| Domaine                            | Contributions |
| ---------------------------------- | ------------: |
| Production et direction            |             7 |
| Histoire et adaptation             |             1 |
| Direction artistique et conception |             3 |
| Animation et personnages           |            10 |
| Décors, effets et photographie     |             1 |
| Musique et chansons                |             3 |
| Interprétation vocale              |             3 |
| Référence filmée                   |             3 |

Ces 31 lignes proviennent exclusivement de
`src/data/oeuvres/pinocchio.json#contributions`. Le chapitre éditorial consacré
à la fabrication sélectionne certains artistes pour raconter des décisions ;
il ne constitue pas le générique et ne doit jamais devenir sa source de vérité.

## Trois surfaces actuellement distinctes

| Surface      | État observé                       | Responsabilité actuelle                                               |
| ------------ | ---------------------------------- | --------------------------------------------------------------------- |
| Archives     | 31 contributions qualifiées        | conserver personnes, rôles, domaines et sources de la fiche           |
| Atelier      | prototype v0.1.0 sur Blanche-Neige | éprouver regroupements, recherche, densité et références non résolues |
| Codex public | liste de cartes par domaine        | offrir le contrechamp textuel stable de la fiche Œuvre                |

La future visualisation n’a pas l’autorisation de réécrire ces données. Le
contrechamp public n’est pas un ancien rendu à supprimer : il est la lecture
linéaire minimale que tout Plan enrichi devra continuer de préserver.

## Bobines rouges du Train 8A

| Bobine               | Mesure protégée                                            | État attendu |
| -------------------- | ---------------------------------------------------------- | ------------ |
| Pinocchio            | 31 contributions, 8 domaines, 30 résolues et 1 non résolue | `incomplete` |
| Corpus vide          | aucune contribution ni groupe inventé                      | `empty`      |
| Blanche-Neige        | 33 contributions, 6 domaines et 8 références non résolues  | `incomplete` |
| Très grand générique | 240 crédits, 9 domaines et 18 rôles synthétiques distincts | `dense`      |

Ces bobines sont « rouges » parce qu’elles rendent visible une limite ou une
contrainte avant la refonte. Elles doivent toutes rester vertes dans le
vérificateur : une dérive de quantité, de rôle, de résolution ou de provenance
doit rompre le contrôle automatique.

## Surfaces de référence

- `src/data/oeuvres/pinocchio.json` porte le générique publié ;
- `src/lib/plans/credits.ts` dérive les crédits sans muter les Archives ;
- `src/lib/plans/generique-vivant.ts` construit le modèle du Plan ;
- `src/fixtures/plans/bobines-temoins.ts` fournit les états extrêmes privés ;
- `src/components/atelier/AtelierGeneriqueVivantPrototype/` projette la
  v0.1.0 dans l’Atelier ;
- `src/components/codex/CodexFiche/CodexFicheOeuvreDetails/` conserve le
  contrechamp public ;
- `scripts/verifier-phase-8.mjs` protège cette photographie.

## Frontières fermées

- aucune modification du prototype v0.1.0 au Train 8A ;
- aucun composant Focale créé avant le Train 8B ;
- aucune promotion Pixie appliquée au Plan ;
- aucune route ni famille publique ajoutée ;
- aucune résolution artificielle d’Evelyn Venable ;
- aucun crédit dérivé du récit éditorial.

## Passage au Train 8B

Le prochain Train pourra installer la grammaire minimale de Focale en partant
de quatre contraintes déjà mesurées : préserver l’exhaustivité, rendre la
dense équipe navigable, garder une lecture équivalente sans image et laisser
Pixie prendre en charge les contrôles sans devenir le langage des données.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le générique n’a pas encore changé de cadre. Chaque nom, chaque rôle et chaque
absence savent déjà comment prouver qu’ils sont toujours là._
