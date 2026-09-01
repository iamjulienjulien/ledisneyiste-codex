# Acte VI · Phase 4 · Contrat de circulation et de réception

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Ce contrat donne une forme distincte aux quatre temporalités de la vie
publique d’une Œuvre : sa sortie, sa version, son exploitation et sa
réception. Il ne publie aucune nouvelle Archive et n’étend pas
`CodexFamily`.

## Les quatre matières

### Événement de sortie

Un événement de sortie est un point daté : première mondiale,
avant-première, sortie nationale, ressortie, présentation en festival ou mise
à disposition. Il peut désigner la version et l’exploitation auxquelles il
appartient.

Les anciennes sorties au territoire libre restent valides. Les nouvelles
sorties reçoivent un identifiant et une portée territoriale structurée.

### Version d’Œuvre

Une version possède sa propre identité documentée. Elle peut préciser une
langue, un territoire, une date et un distributeur sans devenir une nouvelle
Œuvre. Une version italienne n’est donc jamais interprétée comme une langue
de l’interface.

### Exploitation

Une exploitation décrit une période et un mode de circulation : première
exploitation, exploitation nationale, ressortie, festival, restauration,
édition vidéo, diffusion télévisuelle ou numérique. Elle conserve sa portée,
ses versions, son support et ses sources.

Une ressortie reste reliée à l’Œuvre existante. Elle ne crée ni nouvelle
fiche, ni nouveau slug, ni nouvelle route.

### Réception

Une réception nomme un témoin, une temporalité, une portée, un résumé et une
qualification éventuelle. Elle peut être contemporaine, professionnelle,
publique, institutionnelle ou rétrospective.

Une réévaluation de 1985 demeure datée de 1985, même lorsqu’elle porte sur une
Œuvre sortie en 1940. Le résumé, la qualification et les réserves rejoignent
le contrechamp textuel des Plans.

## Portées territoriales

La portée commune distingue quatre cas :

- un territoire fermé du registre (`FR`, `US`, `IT`) ;
- le monde, qui n’est pas un faux code pays ;
- une zone nommée par la documentation ;
- une portée non précisée, éventuellement conservée dans les mots de la
  source.

## Provenance et réserve

Chaque unité structurée possède ses propres sources. Une note de réserve peut
accompagner la déclaration lorsque son périmètre, sa datation ou son
interprétation reste incomplet. L’incertitude est conservée ; elle n’est ni
effacée, ni transformée en certitude par la projection.

## Compatibilité

- Les 23 fiches Œuvres publiques restent valides sans migration.
- Les trois événements enrichis de _Blanche-Neige_ conservent leurs anciens
  identifiants dérivés dans les Plans.
- La fiche Œuvre sait afficher les anciennes chaînes territoriales et les
  nouvelles portées structurées.
- Les Plans reçoivent les exploitations et réceptions comme événements, puis
  les versions, exploitations et réceptions comme preuves.
- Le Montage du temps sépare diffusion et reconnaissance.
- La Table lumineuse conserve les qualifications, territoires et réserves
  dans ses faits textuels.

## Bobine privée de décision

`scripts/fixtures/oeuvre-circulation.json` éprouve trois époques d’une même
Œuvre fictive : première exploitation américaine en 1940, version française
en 1946, puis restauration et réévaluation en 1985. Elle ne rejoint ni les
catalogues, ni les routes, ni les Archives publiques.

## Invariants vérifiés

- une ressortie n’est pas une nouvelle Œuvre ;
- une version territoriale n’est pas une locale UI ;
- une réception rétrospective garde sa date propre ;
- les références entre sorties, versions, exploitations et réceptions sont
  résolues ;
- les portées « Monde » et « zone » restent documentaires ;
- les Plans conservent la qualification visible dans leur contrechamp ;
- aucune lecture ne modifie les Archives qu’elle projette.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Une Œuvre ne sort pas une seule fois : le contrat sait désormais distinguer
chaque retour de lumière._
