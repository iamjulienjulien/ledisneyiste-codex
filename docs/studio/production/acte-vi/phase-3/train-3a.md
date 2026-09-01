# Acte VI · Phase 3 · Train 3A

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3A installe la grammaire commune des identités avant toute
projection, redirection ou migration en série. Il sépare le libellé d’une
Archive, sa provenance linguistique et territoriale, son identifiant permanent
et son chemin canonique.

## Contrat installé

`src/types/identite.ts` réunit désormais :

- les codes de langue et de territoire dérivés de leurs registres ;
- la nature commune des identités documentées ;
- les contrats spécialisés des noms et titres alternatifs ;
- l’identité principale d’une projection ;
- l’alias de navigation explicitement historique ;
- la projection neutre qui rassemble identifiant, famille, slug canonique,
  identités documentées et aliases.

Les Personnages et les Œuvres conservent leurs champs JSON existants. Leurs
types historiques deviennent des alias du contrat commun au lieu de décrire
deux structures parallèles. Les Créateurs peuvent désormais recevoir des noms
alternatifs si une matière future le justifie, sans rendre ce champ
obligatoire ni migrer leurs fiches.

## Langues et territoires

Le premier registre est volontairement borné au périmètre validé de l’Acte VI :

- langues `fr`, `en` et `it` ;
- territoires `FR`, `US` et `IT`.

Chaque valeur possède un libellé accessible. Le code de langue décrit la forme
du texte ; le code de territoire décrit son contexte de publication ou
d’usage. Aucun drapeau n’entre dans le modèle.

Le titre français de _Snow White and the Seven Dwarfs_ devient le premier cas
réel à employer le code territorial `FR`. Les événements de sortie et données
économiques conservent leurs territoires descriptifs : leur migration relève
d’un contrat documentaire différent et reste hors champ.

## Bobines témoins

`scripts/fixtures/identites-codex.json` éprouve :

- Atchoum et son nom original Sneezy ;
- La Reine, sa forme originale et son alias éditorial ;
- _Blanche-Neige et les Sept Nains_ et son titre original documenté ;
- un ancien chemin strictement confiné au préfixe `/fixture/` ;
- une collision volontaire entre `La Reine` et `La-Reine`.

Ces fixtures décrivent le contrat futur sans publier une nouvelle Archive ni
créer une redirection réelle.

## Garde-fou

`pnpm check:identites` vérifie :

- les définitions et libellés des langues et territoires ;
- les codes utilisés par les identités existantes ;
- la validité et l’unicité des sources ;
- l’absence de doublon normalisé dans une même fiche ;
- les identifiants et slugs des projections témoins ;
- la séparation entre identité documentaire et alias de navigation ;
- la reproductibilité de la collision témoin.

Le contrôle rejoint `pnpm check` et `pnpm check:ci`. Il sera élargi pendant les
Trains 3B à 3F à mesure que résolveur, recherche et routes entreront en scène.

## Frontière tenue

Le Train 3A n’a :

- modifié aucun slug canonique ;
- ajouté aucun préfixe `/fr` ou `/en` ;
- créé aucune route ou redirection ;
- déplacé aucune identité dans un catalogue ;
- commencé aucune des 69 lignes de rétroapplication ;
- créé ni Chanson, ni Œuvre source, ni donnée de _Pinocchio_.

## Passage au Train 3B

Le contrat peut maintenant recevoir un résolveur serveur qui joindra catalogue
et fiche sans déplacer leurs responsabilités. Ce résolveur devra produire la
projection minimale attendue par les surfaces et la recherche, tout en restant
absent du JavaScript client.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Les noms peuvent voyager. Le contrat sait désormais ce qui ne doit pas
bouger._
