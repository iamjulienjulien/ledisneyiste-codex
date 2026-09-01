# Acte VI · Phase 3 · Train 3C

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3C permet de retrouver une Archive depuis chacune de ses identités
documentées sans lui créer une seconde présence dans les résultats. La
recherche reste une projection serveur : elle joint le catalogue à la fiche,
mais retourne toujours l’entrée canonique qui porte la route publique.

## Une seule normalisation

Le moteur réutilise `normaliserIdentiteCodex`, déjà propriétaire des règles de
comparaison du contrat d’identité. La recherche conserve donc son comportement
historique pour :

- les majuscules et minuscules ;
- les signes diacritiques ;
- la ponctuation ;
- les ligatures `œ` et `æ` ;
- les requêtes composées dont tous les termes doivent appartenir à la même
  Archive.

La fonction pure `src/lib/recherche/filtrer-index.ts` compose les textes de
recherche, filtre leurs termes et déduplique les résultats par slug à
l’intérieur d’une famille. Elle peut être éprouvée sans charger les Archives
ni franchir la frontière serveur.

## Index identitaire

`src/lib/recherche.ts` devient explicitement `server-only`. Pour chacune des
quatre familles, il réunit :

- le nom ou titre principal du catalogue ;
- le sous-titre et les métadonnées légères déjà recherchables ;
- les seuls libellés des identités documentées résolues depuis la fiche.

Nature, langue, territoire et sources restent attachés au contrat documentaire
mais ne deviennent pas des mots-clés. Aucun paragraphe éditorial, relation ou
contenu bibliographique ne rejoint l’index.

## Canonicalité des résultats

Une identité alternative n’est jamais transformée en entrée de résultat. Elle
enrichit le texte d’une entrée de catalogue existante ; le résultat conserve
donc :

- sa famille publiée ;
- son slug canonique ;
- son nom ou titre principal ;
- l’unique URL déjà construite par la page de recherche.

Deux Archives distinctes peuvent légitimement répondre aux mêmes termes. La
déduplication ne masque pas cette ambiguïté réelle : elle retire uniquement les
répétitions d’une même Archive dans une même famille.

## Bobines éprouvées

`pnpm check:identites` couvre désormais :

- `Sneezy` → Atchoum ;
- `Snow White` → Blanche-Neige ;
- `The Evil Queen` → La Reine ;
- `Humbert` → Le Chasseur ;
- `Blanche-Neige et les Sept Nains` → _Snow White and the Seven Dwarfs_ ;
- les variantes sans accents et avec ponctuation ;
- la déduplication volontaire d’une même entrée ;
- l’exclusion d’une phrase éditoriale et d’un identifiant de source ;
- la présence de la frontière `server-only` et de la projection commune.

Le refus des collisions normalisées demeure porté par le résolveur du Train
3B, avant toute construction de l’index.

## Frontière tenue

Le Train 3C n’a :

- modifié aucune route ni aucun slug ;
- créé aucun alias de navigation ;
- ajouté aucun libellé de recherche exceptionnel ;
- indexé aucun récit, relation ou source ;
- modifié aucune surface publique ;
- commencé aucune rétroapplication en série.

## Passage au Train 3D

La recherche sait désormais reconnaître les noms qui voyagent tout en
renvoyant vers un seul chemin. Le Train 3D peut formaliser séparément les rares
alias de navigation historiques, sans jamais les déduire des identités
documentaires.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le public peut appeler l’Archive par tous ses noms. Le Codex sait encore où
elle habite._
