# Acte VI · Phase 7 · Train 7G · Fermer le récit et projeter la carte des preuves

> **Document interne de production**<br>
> Conduit par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Le Train 7G donne sa dernière image au récit de _Pinocchio_, assemble les huit
chapitres dans l’ordre du programme et rend leur état de preuve consultable
sans dépendre de la mise en scène.

La fermeture ne stabilise pas artificiellement le studio. Elle ouvre un seuil
vers _Fantasia_ tout en conservant trois frontières :

- aucune fiche de _Fantasia_ n’est anticipée ;
- aucun index des Musiques n’est déclaré ouvert ;
- aucune carte indépendante ne duplique les données du récit.

## Chapitre 8 · Le prochain vertige : Fantasia

**Question :** pourquoi le studio ne se stabilise-t-il toujours pas ?

Le chapitre suit trois mouvements.

### La musique change de place

_Pinocchio_ associe chansons, partition, personnages et récit. _Fantasia_,
présenté à New York le 13 novembre 1940, organise huit séquences autour
d’œuvres symphoniques. La musique devient le principe de succession des
images, et non plus seulement l’une des matières qui les accompagne.

### Voir la musique, entendre les images

Le déplacement concerne simultanément la composition visuelle et la salle.
Les séquences répondent à des œuvres déjà existantes tandis que Fantasound
étend leur projection sonore. Le Codex nomme ce changement de problème sans
prétendre documenter toute la fabrication ou l’exploitation du film.

### Un seuil, pas une nouvelle archive

La dernière unité désigne le futur travail nécessaire pour suivre les œuvres
musicales, leurs interprétations et leurs usages. Cette direction ne crée ni
route, ni catalogue, ni fiche de _Fantasia_. Elle reste un raccord vers le
futur index des Musiques.

## Sources promues

Deux sources des Walt Disney Archives rejoignent le registre central :

| Source                  | Apport documentaire                                                        |
| ----------------------- | -------------------------------------------------------------------------- |
| `us-d23-fantasia-film`  | Première, huit séquences, Fantasound et organisation générale du film      |
| `us-d23-fantasia-at-80` | Renversement du rapport habituel entre musique de film et images composées |

`wdfm-fantasia-pastoral`, déjà enregistré, complète le seuil par une lecture
de la composition d’une séquence. Ces trois sources permettent une dernière
image précise ; elles ne suffisent volontairement pas à constituer une fiche.

## Navigation du récit

La fiche de _Pinocchio_ reçoit un sommaire sémantique avant les chapitres. Il
affiche pour chacun :

- son numéro stable dans le programme ;
- son titre ;
- sa question documentaire ;
- un lien d’ancre vers sa section.

Cette navigation reste une liste ordonnée dans le document. Elle ne demande
ni JavaScript, ni widget ARIA complexe, ni nouvelle route.

## Carte des preuves

`CodexFicheRecit` consomme exclusivement
`deriveCartePreuvesEditoriale(blocs)`. La table projetée après le récit rend
visibles :

- le chapitre et son nombre d’unités de preuve ;
- la question à laquelle il répond ;
- toutes les sources dédupliquées avec leur titre et leur ancre ;
- chaque réserve dans son texte complet et un retour vers son paragraphe.

La table constitue l’alternative synthétique complète. Son ordre HTML reste
compréhensible sans CSS ; son viewport horizontal n’altère ni les cellules ni
leurs liens ; aucune interaction client ne conditionne son contenu.

## Périmètre de projection

L’option `withEvidenceMap` est activée explicitement et uniquement lorsque la
fiche Œuvre est _Pinocchio_. Les autres récits éditoriaux conservent leur
projection historique sans recevoir une carte qui ne leur appartient pas.

Le récit pilote de _Quand on prie la bonne étoile / When You Wish Upon a Star_
est également raccordé à sa fiche Chanson. Ses trois chapitres deviennent
visibles avec les mêmes citations proches et les mêmes réserves, mais sans le
sommaire des huit chapitres ni la carte propre à _Pinocchio_.

## Contrôles

`check:phase-7` protège désormais :

- les huit identifiants, titres et questions dans l’ordre du programme ;
- les trois mouvements et les trois sources du raccord vers _Fantasia_ ;
- la date, le nombre de séquences et Fantasound ;
- l’absence de fiche _Fantasia_ ;
- la dérivation unique de la carte des preuves ;
- la présence d’une navigation, d’une table, des réserves complètes et des
  ancres de sources ;
- l’absence de dépendance à un composant client ;
- le périmètre explicite de la carte et la projection du récit Chanson.

## Relais

Le récit de _Pinocchio_ est désormais complet, ordonné et vérifiable. Le Train
7H pourra relire la Phase dans son ensemble, éprouver les contrôles, mettre à
jour la transmission et fermer la mission sans ajouter un neuvième chapitre.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_La dernière image ne ferme pas le monde : elle montre simplement où le regard
devra apprendre à écouter._
