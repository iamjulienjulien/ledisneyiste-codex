# Acte VI · Phase 3 · Train 3B

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3B joint les deux moitiés déjà publiées de chaque Archive : l’entrée
de catalogue qui annonce son identité légère et la fiche qui documente ses
formes alternatives. Il produit une projection commune sans déplacer ni
recopier leur matière.

## Deux étages de résolution

`src/lib/identites/projeter-identite.ts` reste une fonction pure. Elle reçoit
une entrée, une fiche et les éventuels repères déjà établis, puis :

- vérifie que les slugs concordent ;
- convertit noms et titres alternatifs vers une forme commune ;
- conserve nature, langue, territoire et sources ;
- isole l’identité originale lorsqu’elle existe ;
- refuse les collisions normalisées et les originales concurrentes ;
- retourne `null` lorsque l’une des deux moitiés manque.

`src/lib/identites/server/resoudre-identites.ts` possède la jointure réelle.
Sa frontière `server-only` réunit les quatre catalogues et les quatre
collections de fiches. Elle expose une résolution par famille et slug, ainsi
qu’une liste complète destinée aux futures projections de recherche.

## Absences assumées

Les Archives actuelles n’ont pas encore reçu d’identifiant permanent distinct
du slug, ni de langue explicite pour leur identité principale. Le résolveur
retourne donc `null` pour ces deux valeurs au lieu de :

- transformer le slug en faux identifiant permanent ;
- déduire une langue depuis l’apparence du libellé ;
- confondre langue du texte et langue française de l’interface.

Les fixtures du Train 3A conservent des identifiants et langues explicites afin
d’éprouver le contrat cible. La rétroapplication réelle reste propriétaire de
la Phase 5.

## Bobines éprouvées

Le vérificateur exécute désormais la fonction pure sur :

- les trois projections témoins du Train 3A ;
- les 79 jointures catalogue–fiche réellement publiées ;
- Atchoum / Sneezy ;
- Blanche-Neige / Snow White ;
- La Reine / The Evil Queen ;
- Le Chasseur / Humbert, sans langue inventée ;
- _Snow White and the Seven Dwarfs_ / _Blanche-Neige et les Sept Nains_ ;
- une fiche absente ;
- la collision normalisée `La Reine` / `La-Reine`.

La frontière serveur fait elle aussi partie du contrôle spécialisé.

## Frontière tenue

Le Train 3B n’a :

- modifié aucune route ni aucun slug ;
- enrichi aucun résultat de recherche ;
- modifié aucune Card, liste ou fiche publique ;
- créé aucun alias de navigation réel ;
- attribué aucun identifiant ou langue par supposition ;
- commencé aucune rétroapplication en série.

## Passage au Train 3C

La recherche peut maintenant consommer `listerIdentitesCodex` côté serveur,
joindre les formes documentées aux champs déjà indexés et dédupliquer chaque
résultat sur sa famille et son slug canoniques.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le catalogue annonce. La fiche documente. Le résolveur les remet dans le même
cadre._
