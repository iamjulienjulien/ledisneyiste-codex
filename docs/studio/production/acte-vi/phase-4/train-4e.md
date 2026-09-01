# Acte VI · Phase 4 · Train 4E

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4E applique `DEC-008` aux mesures économiques et rassemble les
bobines privées de la Phase 4. Il distingue la déclaration originale de toute
dérivation, conserve les conflits sans calcul réparateur et rend la frontière
entre enquête et projection exécutable.

## Livrables

- `src/types/donnee-economique.ts` porte mesures, valeurs, temps, territoires,
  méthodes, comparabilité, conflits, dérivations et verdicts privés ;
- `src/lib/donnees-economiques` lit l’ancien contrat, projette le nouveau et
  neutralise tout dossier incomplet ;
- `src/types/oeuvre.ts` expose une union de transition bornée vers la Phase 5 ;
- la fiche Œuvre, la preuve des Plans et la Table lumineuse lisent les deux
  formes sans perdre la matière historique ;
- `scripts/fixtures/donnees-economiques.json` éprouve _Pinocchio_,
  _Blanche-Neige_, les conflits et une dérivation hypothétique ;
- `scripts/verifier-donnees-economiques.mjs` contrôle contrat, compatibilité,
  confidentialité et raccord des bobines ;
- [`contrat-donnees-economiques.md`](./contrat-donnees-economiques.md)
  transmet les décisions et la condition de retrait du repli historique.

## Décisions du train

1. Neuf mesures économiques possèdent un vocabulaire fermé.
2. Une valeur et une fourchette sont deux formes explicites ; deux sources ne
   fabriquent jamais les bornes d’une fourchette.
3. Une mesure monétaire exige devise et année monétaire pour être projetable.
4. Une fréquentation exige une période et une portée territoriale honnêtes.
5. Date, période et cumul sont trois temporalités distinctes.
6. La base, la méthode, la comparabilité et la finalité éditoriale appartiennent
   au chiffre public.
7. Une conversion ou actualisation devient une donnée dérivée distincte et
   reproductible.
8. L’enquête privée peut rester incomplète ; la projection publique, jamais.
9. Un verdict humain ne contourne pas le test de complétude.
10. Le repli historique de _Blanche-Neige_ reste temporaire et appartient à
    la migration de Phase 5.

## Contrôles exécutables

Le nouveau vérificateur contrôle :

- les vocabulaires et la provenance des déclarations ;
- le cumul CNC français de 1946 à 2010 ;
- les deux coûts divergents de _Blanche-Neige_ ;
- l’absence de moyenne et de fausse fourchette ;
- une fréquentation au territoire non précisé ;
- un verdict `publishable` volontairement incomplet ;
- l’absence de clés privées dans la sérialisation publique ;
- les quatre valeurs historiques et leur lecture par les consommateurs ;
- une actualisation hypothétique sans effet sur la valeur nominale ;
- le raccord identitaire entre circulation, Œuvre source, Chanson et économie ;
- les 79 fiches et l’absence de catalogue économique public.

## Critères de clôture

- [x] Une entrée n’est jamais comparée à une recette.
- [x] Une conversion ne remplace jamais la valeur nominale.
- [x] Une contradiction reste attribuée à chacune de ses sources.
- [x] Une dimension critique absente bloque la publication mais pas l’enquête
      privée.
- [x] Chaque fixture déclare ce qui est factuel, hypothétique ou incomplet.
- [x] Le cumul CNC conserve sa période réelle et sa réserve.
- [x] Les deux coûts de _Blanche-Neige_ restent deux déclarations.
- [x] Les quatre données historiques restent lisibles dans la fiche et les
      Plans.
- [x] Les verdicts et notes d’enquête restent hors de la projection.
- [x] Les bobines _Pinocchio_, _Blanche-Neige_, Œuvre source et Chanson se
      raccordent sans fusionner leurs contrats.
- [x] Aucun catalogue, route ou Archive de Phase 6 n’est ajouté.
- [x] Les WIP du Guidebook et du dossier d’équipe restent hors du train.

## Passage au Train 4F

Les contrats de la Phase 4 sont désormais tous installés. Le Train 4F peut
lancer la répétition générale, mesurer le corpus sans compter les fixtures,
documenter les recettes de migration et transmettre les sorties vers les
Phases 5, 6, 7 et 9.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le chiffre a trouvé sa place : complet dans la lumière, incomplet mais intact
dans le dossier d’enquête._
