# Acte VI · Phase 4 · Train 4C

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4C autonomise les Œuvres sources et leurs relations. Il transforme
une mention extérieure embarquée en domaine interne identifiable, résoluble
et projetable, sans publier Collodi, modifier `CodexFamily` ou ouvrir une
route supplémentaire.

## Livrables

- `src/types/oeuvre-source.ts` définit entrée, fiche, auteurs, vocabulaires et
  registre interne ;
- `src/lib/oeuvres-sources` construit le registre et résout ses références ;
- `ReferenceOeuvreLiee` accueille une cible privée stable tout en conservant
  les deux formes historiques ;
- les Plans reçoivent les nœuds privés et leurs dates sans créer de lien ;
- `scripts/fixtures/oeuvres-sources.json` porte Collodi, `Schneewittchen` et
  une adaptation privée de _Pinocchio_ ;
- `scripts/verifier-oeuvres-sources.mjs` contrôle domaine, résolution,
  projection, confidentialité et compatibilité ;
- [`contrat-oeuvres-sources.md`](./contrat-oeuvres-sources.md) transmet les
  arbitrages du modèle.

## Décisions du train

1. Une Œuvre source ne partage pas `FicheOeuvreDisney` : son contrat reste
   spécialisé et plus léger.
2. `id` porte l’identité documentaire ; `slug` prépare une route future sans
   l’activer.
3. Le registre est injecté dans la vue des Plans seulement lorsque la matière
   privée est explicitement fournie.
4. Une résolution privée ne vaut pas publication : `publishedSubject` reste
   faux et aucun `href` n’est produit.
5. Les identités réutilisent le contrat commun original, localisé,
   international et territorial.
6. `oeuvre-exterieure` demeure lisible afin de ne pas migrer
   _Blanche-Neige_ au milieu du train.
7. `inspiration` et `influence` entrent dans le vocabulaire fermé des
   relations, sans déduire l’une ou l’autre d’une proximité.
8. Les fixtures restent sous `scripts/fixtures` et ne rejoignent aucune
   Archive publique.

## Contrôles exécutables

Le nouveau vérificateur contrôle :

- deux fiches privées complètes et leurs identités documentées ;
- l’unicité des identifiants et slugs ;
- les vocabulaires de nature, support, auteur, langue et territoire ;
- la résolution exacte de Collodi et le refus d’un slug discordant ;
- la provenance de la relation d’adaptation ;
- un nœud privé résolu mais non publiable ;
- l’absence de `href` dans le Travelling et le Plan d’ensemble ;
- la date de 1883 dans le contrechamp du Travelling ;
- l’identité inchangée de `Schneewittchen` dans les Plans publics.

Les contrôles Œuvres, Plans, ESLint et TypeScript éprouvent en parallèle la
compatibilité des consommateurs existants.

## Critères de clôture

- [x] _Le avventure di Pinocchio_ possède une entrée et une fiche privées.
- [x] L’Œuvre source reste distincte de l’Œuvre Disney qui l’adapte.
- [x] Chaque identité, auteur et relation conserve ses propres sources.
- [x] Une référence déclarée se résout sans devenir une route.
- [x] Une référence absente ne crée aucun lien actif.
- [x] Les Plans savent projeter une Œuvre source résolue.
- [x] `CodexFamily`, les catalogues et les routes publiques restent inchangés.
- [x] _Blanche-Neige_ conserve sa relation et son identifiant historiques.
- [x] Les WIP du Guidebook et du dossier d’équipe restent hors du train.

## Passage au Train 4D

Le Train 4D peut maintenant installer le domaine privé des Chansons et de la
musique. Il devra distinguer œuvre, occurrence, version et interprétation,
éprouver _When You Wish Upon a Star_ sans audio ni paroles, puis vérifier que
les statuts de droits ne transmettent aucune pièce confidentielle au client.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Collodi demeure hors de l’affiche, mais sa place dans le récit est désormais
identifiée, sourcée et vérifiable._
