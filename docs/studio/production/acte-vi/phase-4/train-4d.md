# Acte VI · Phase 4 · Train 4D

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4D installe le contrat privé des Chansons, borne le domaine frère
Musiques et rend exécutable la politique `metadata-first`. Il prouve qu’une
fiche Chanson complète tient sans audio ni paroles, puis coupe les dossiers de
droits de leur projection publique.

## Livrables

- `src/types/chanson.ts` distingue fiche, version, occurrence,
  interprétation, enregistrement, réception et récompense ;
- `src/types/musique.ts` borne un registre musical autonome et la projection
  de repli des crédits existants ;
- `src/types/projection-media.ts` sépare dossier privé et matière publique ;
- `src/lib/chansons` construit le registre, résout une fiche privée et
  projette un verdict média sûr ;
- `src/lib/musiques` construit le registre frère et conserve les crédits
  musicaux actuels ;
- `scripts/fixtures/chansons.json` éprouve les bobines 04, 05 et 08 ;
- `scripts/verifier-chansons.mjs` contrôle modèle, sources, confidentialité et
  absence de publication ;
- [`contrat-chansons-musiques.md`](./contrat-chansons-musiques.md) transmet
  les arbitrages du domaine.

## Décisions du train

1. Une Chanson est une Archive documentaire, jamais un fichier sonore.
2. La traduction et l’adaptation lyrique appartiennent à la version.
3. La reprise appartient à l’interprétation.
4. Le réemploi appartient à l’occurrence.
5. L’enregistrement est une fixation de l’interprétation, distincte de
   l’occurrence filmique.
6. Une Chanson peut référencer une Œuvre publique ou une bobine privée sans
   créer de route.
7. Musiques conserve son propre registre et son propre vocabulaire ; les
   crédits libres restent le repli public jusqu’à leur migration.
8. Un dossier média incomplet retombe toujours sur une projection bloquée.
9. La sortie publique ne connaît ni titulaire, ni pièce, ni note interne, ni
   identifiant confidentiel.
10. Les fixtures privées ne rejoignent aucun catalogue de production.

## Contrôles exécutables

Le nouveau vérificateur contrôle :

- deux Chansons neutres, l’une liée à _Pinocchio_, l’autre à une Œuvre déjà
  publiée ;
- une identité française documentée sans antidater son édition ;
- les rôles fermés des auteurs, adaptateurs et interprètes ;
- les références exactes entre versions, occurrences, interprétations et
  enregistrements ;
- une réception, une récompense et leurs sources ;
- un registre Musiques distinct ;
- les quatre crédits musicaux actuels de _Blanche-Neige_ comme repli ;
- quatre verdicts média, dont un audio bloqué et une licence incomplète ;
- l’absence de clés privées dans la sérialisation publique ;
- l’absence de `CodexFamily`, catalogue ou route Chansons.

Les vérificateurs Œuvres, Sources, Plans, ESLint, TypeScript et le build
éprouvent en parallèle les 79 fiches et consommateurs historiques.

## Critères de clôture

- [x] Une Chanson possède une fiche complète sans lecteur ni paroles.
- [x] L’occurrence filmique ne peut pas être prise pour un enregistrement.
- [x] Traduction, adaptation lyrique, reprise et réemploi ont quatre places
      distinctes.
- [x] La version française conserve langue, territoire, responsables et
      sources.
- [x] Une chanson rétrospective ne dépend d’aucun champ propre à
      _Pinocchio_.
- [x] Chansons et Musiques ne partagent ni fiche, ni registre, ni identifiant.
- [x] Les crédits musicaux existants restent lisibles sans migration.
- [x] Un statut bloqué ou un dossier incomplet ne transmet aucune matière.
- [x] Les preuves et notes privées restent hors de la projection.
- [x] Aucun domaine public, route ou média n’est ajouté.
- [x] Les WIP du Guidebook et du dossier d’équipe restent hors du train.

## Passage au Train 4E

Le Train 4E peut maintenant enrichir les données financières. Il devra porter
mesure, valeur ou fourchette, année monétaire, périmètre, méthode,
comparabilité et conflit, puis réutiliser la même frontière privée pour que
les verdicts d’enquête ne rejoignent jamais le navigateur.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_La chanson est entrée sans lecteur : sa composition, ses voix et ses passages
restent désormais distincts jusque dans la dernière preuve._
