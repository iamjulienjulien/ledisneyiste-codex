# Acte VI · Phase 7 · Train 7A · Installer le contrat du récit et des preuves

> **Document interne de production**<br>
> Conduit par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Avant d’écrire les huit chapitres, le Train 7A construit leur raccord le plus
important : une idée documentaire doit pouvoir conserver son texte, ses
preuves et sa réserve sans devenir une seconde base de données.

## Livrables

- [`etat-reference.md`](./etat-reference.md) photographie le terrain ;
- [`recit-et-preuves.md`](./recit-et-preuves.md) fixe le contrat ;
- `src/types/fiche.ts` rend les paragraphes historiques et structurés
  compatibles ;
- `src/lib/fiche-editoriale.ts` agrège les sources et dérive la carte ;
- `CodexFicheBlocsEditoriaux` projette questions, preuves et réserves ;
- `src/lib/plans/evidence.ts` conserve les sources du nouveau niveau ;
- `scripts/verifier-phase-7.mjs` protège la structure dès son ouverture ;
- une fixture démontre les deux formes sans écrire prématurément Pinocchio.

## Décisions gravées

1. La migration est rétrocompatible : 210 blocs et 549 paragraphes restent
   inchangés.
2. Le paragraphe est la plus petite unité de preuve éditoriale.
3. La carte des preuves est dérivée du récit, jamais maintenue à côté.
4. Les sources du chapitre restent possibles pour le patrimoine et les faits
   généraux.
5. Une citation déjà projetée sous un paragraphe n’est pas répétée sous le
   chapitre.
6. La réserve documentaire possède un texte et une sémantique propres ; elle
   n’est pas un état d’erreur.
7. Aucun composant client, aucune famille et aucune source de vérité nouvelle
   ne sont nécessaires.

## Preuve verticale

La fixture `blocs-editoriaux-phase-7.json` contient :

- un bloc historique avec paragraphe chaîne et sources de chapitre ;
- un bloc structuré avec identifiant, question, citations proches et réserve.

Le vérificateur fait passer les deux par le même contrat. Le build éprouve le
rendu serveur et la compilation du dérivateur commun.

## Hors champ

Le Train ne rédige aucune Archive. Les huit chapitres, la chanson pilote, la
carte visible et leurs choix de montage restent aux Trains 7B à 7G.

## Prochaine bobine

Le Train 7B pourra ouvrir :

1. **Après Blanche-Neige, ne pas simplement recommencer** ;
2. **De Collodi à Disney**.

Leur écriture devra utiliser exclusivement la forme structurée et les réserves
transmises par la Phase 6.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le rail est posé entre le récit et ses preuves. La première phrase peut
maintenant avancer sans perdre sa provenance._
