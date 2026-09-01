# Acte VI · Phase 1 · Matrice de projection Pixie

> **Statut :** Phase 1 terminée<br>
> **Périmètre :** Codex public uniquement — index, fiches, Recherche et layout public  
> **Hors champ :** Atelier, Guidebook, Plans privés et nouveaux corpus documentaires

Cette matrice relie les usages réels du Codex aux 29 composants promus pendant
l’Entracte V. Elle n’impose jamais un composant pour atteindre un quota : une
absence de besoin public constitue une conclusion valide lorsqu’elle est
documentée.

## État de référence

- `pnpm check:ci` a été lancé avant la première modification.
- Formatage, lint et vérificateurs métier : verts.
- Build : interrompu par l’environnement d’exécution avant compilation, avec
  `EPERM` sur `.next/trace-build`. Ce point devra être rejoué hors sandbox et
  ne constitue pas un échec attribuable à la migration.
- Aucun WIP n’était présent dans le worktree au démarrage.

## Légende

- **Projeté** : le Codex public emploie déjà le composant pour son rôle prévu.
- **Partiel** : le composant est projeté, mais un usage historique comparable
  reste à arbitrer ou migrer.
- **À migrer** : une cible publique légitime et explicite a été identifiée.
- **Conservé** : aucun remplacement légitime n’existe dans le périmètre ; le
  composant reste disponible sans être introduit artificiellement.
- **À confirmer** : la cartographie doit encore établir si le gain justifie la
  migration.

## Accessoires

| Composant        | Usage actuel et emplacement                                                        | Fonction / cible                            | Nature              | Risque | Accessibilité et vérifications                                                   | Statut / justification                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------------- | ------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `PixieSymbol`    | Header, home, Recherche, index, Cards et sections de fiches                        | Symboles des familles, sections et actions  | Projection directe  | Faible | Noms accessibles conservés lorsque le symbole informe ; décoratifs masqués       | **Projeté**                                                                                                    |
| `PixieButton`    | Soumission de la Recherche, via `PixieSearchField`                                 | Action native de formulaire                 | Projection composée | Faible | Soumission clavier et libellé visible                                            | **Projeté** via `PixieSearchField`                                                                             |
| `PixieLink`      | Navigation globale, home, Cards, footer, références, citations et sélecteur de vue | Navigation interne, externe et fragmentaire | Projection directe  | Faible | Destination, focus, `aria-current`, ouverture externe et ancres bibliographiques | **Projeté** — les derniers liens Codex compatibles ont rejoint le composant sans altérer leur URL ni leur rôle |
| `PixieBadge`     | Home, Recherche, index, Cards, fiches et récompenses                               | Métadonnées et états courts                 | Projection directe  | Faible | L’information ne dépend pas uniquement de la couleur                             | **Projeté**                                                                                                    |
| `PixieSeparator` | Home, Recherche, index, footer, Cards et sections                                  | Changements de séquence                     | Projection directe  | Faible | Décoratif, sans rupture artificielle dans le document                            | **Projeté**                                                                                                    |

## Décors

| Composant       | Usage actuel et emplacement                        | Fonction / cible                  | Nature             | Risque | Accessibilité et vérifications                    | Statut / justification |
| --------------- | -------------------------------------------------- | --------------------------------- | ------------------ | ------ | ------------------------------------------------- | ---------------------- |
| `PixieCard`     | Home, Cards des quatre familles et détails d’œuvre | Unités répétables                 | Projection directe | Faible | Ordre des titres et zones cliquables              | **Projeté**            |
| `PixiePanel`    | Recherche, régie d’index et repères de fiche       | Sections structurées              | Projection directe | Faible | La surface ne remplace pas une section sémantique | **Projeté**            |
| `PixieFrame`    | Home, Recherche et header d’index                  | Mise en scène des symboles        | Projection directe | Faible | Alternative portée par le symbole ou le contexte  | **Projeté**            |
| `PixieCallout`  | État de Recherche                                  | Annotation éditoriale             | Projection directe | Faible | Message lisible sans dépendre du ton              | **Projeté**            |
| `PixieInset`    | Compteur et commandes des index                    | Information secondaire en retrait | Projection directe | Faible | Ordre logique conservé                            | **Projeté**            |
| `PixieBackdrop` | Home, Recherche et index                           | Atmosphère de page                | Projection directe | Faible | Aucun contenu essentiel dans le décor             | **Projeté**            |

## Montage

| Composant           | Usage actuel et emplacement                                                          | Fonction / cible                    | Nature                         | Risque | Accessibilité et vérifications                                  | Statut / justification                                                                             |
| ------------------- | ------------------------------------------------------------------------------------ | ----------------------------------- | ------------------------------ | ------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `PixieContainer`    | Header global, home, fiches, footer, page 404, index et Recherche via `PixieSection` | Cadre de lecture partagé            | Projection directe et composée | Faible | Largeurs, gouttières, responsive, zoom et imbrication du footer | **Projeté** — les frontières publiques partagent bien les contrats `72/md` ou `42/md` du composant |
| `PixieStack`        | Home, Recherche, index et sections de fiches                                         | Rythme vertical                     | Projection directe             | Faible | Ordre DOM inchangé                                              | **Projeté**                                                                                        |
| `PixieCluster`      | Home, Recherche, index et footer                                                     | Groupes avec retour à la ligne      | Projection directe             | Faible | Ordre de lecture et de tabulation                               | **Projeté**                                                                                        |
| `PixieSection`      | Recherche, index et chapitres de fiches                                              | Séquence éditoriale                 | Projection directe             | Faible | Hiérarchie de titres préservée                                  | **Projeté**                                                                                        |
| `PixieGrid`         | Home, Recherche et index des quatre familles                                         | Collections responsives             | Projection directe             | Faible | Ordre source stable à tous les seuils                           | **Projeté**                                                                                        |
| `PixieSidebar`      | Aucun voisinage contenu/régie correspondant dans le Codex public actuel              | Disposition principale + latérale   | Aucun remplacement             | Faible | Sans objet tant qu’aucun besoin n’existe                        | **Conservé** — ne pas importer le patron privé du Guidebook                                        |
| `PixieSwitcher`     | Aucun groupe public nécessitant un basculement collectif rangée/pile                 | Recomposition selon l’espace        | Aucun remplacement             | Faible | Sans objet                                                      | **Conservé**                                                                                       |
| `PixieRail`         | Aucune collection publique en travelling horizontal                                  | Défilement horizontal non carrousel | Aucun remplacement             | Faible | Sans objet                                                      | **Conservé**                                                                                       |
| `PixieStickyRegion` | Aucune région publique devant rester visible dans les limites d’un parent            | Région persistante bornée           | Aucun remplacement             | Faible | Sans objet                                                      | **Conservé**                                                                                       |

## Dialogues

| Composant          | Usage actuel et emplacement                                                        | Fonction / cible                | Nature               | Risque | Accessibilité et vérifications                                               | Statut / justification                                |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------- | -------------------- | ------ | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| `PixieField`       | Recherche, via la composition de `PixieSearchField`                                | Contrat du champ et de son aide | Projection composée  | Faible | Label, description et relations ARIA                                         | **Projeté** via `PixieSearchField`                    |
| `PixieInput`       | Recherche, via la composition de `PixieSearchField`                                | Saisie native de la requête     | Projection composée  | Faible | Valeur URL, focus, saisie et touche Entrée                                   | **Projeté** via `PixieSearchField`                    |
| `PixieTextarea`    | Aucune saisie longue dans le Codex public                                          | Réponse développée              | Aucun remplacement   | Faible | Sans objet                                                                   | **Conservé**                                          |
| `PixieSelect`      | Aucun choix fermé dans le Codex public                                             | Sélection native ou popover     | Aucun remplacement   | Faible | Sans objet                                                                   | **Conservé**                                          |
| `PixieSwitch`      | Le changement Liste/Cards est une navigation par URL, pas une préférence booléenne | Préférence activée/désactivée   | Exception sémantique | Moyen  | Conserver de vrais liens et l’URL partageable                                | **Conservé** — ne remplace pas `CodexIndexViewSwitch` |
| `PixieSearchField` | Régie de la page Recherche                                                         | Recherche GET partageable       | Projection directe   | Faible | Paramètre `q`, Entrée, focus, URL, valeur initiale et fonctionnement sans JS | **Projeté** — l’assemblage local a été retiré         |

## Effets

| Composant       | Usage actuel et emplacement                                                | Fonction / cible               | Nature             | Risque | Accessibilité et vérifications | Statut / justification |
| --------------- | -------------------------------------------------------------------------- | ------------------------------ | ------------------ | ------ | ------------------------------ | ---------------------- |
| `PixieLoader`   | Aucun chargement indéterminé dans les routes publiques statiques actuelles | Attente indéterminée           | Aucun remplacement | Faible | Sans objet                     | **Conservé**           |
| `PixieSkeleton` | Aucun état de chargement structurel dans les routes publiques actuelles    | Réservation de structure       | Aucun remplacement | Faible | Sans objet                     | **Conservé**           |
| `PixieToast`    | Aucune action publique produisant une notification éphémère                | Accusé de réception temporaire | Aucun remplacement | Faible | Sans objet                     | **Conservé**           |

## Chantiers identifiés

1. Réorganiser `src/components/codex` en territoires `CodexIndex`,
   `CodexFiche`, `CodexLayout` et `CodexCommon`, avec un préfixe de composant
   identique à son parent et sans changement visuel.
2. Rapatrier les props React depuis `src/types` vers leur composant
   propriétaire, tout en conservant les contrats métier globaux.
3. ~~Migrer le formulaire public de Recherche vers `PixieSearchField` après le
   nettoyage structurel.~~ Terminé : le formulaire GET, `q` et son aide sont
   désormais portés par la composition promue.
4. ~~Auditer les liens natifs de la bibliographie, des citations et du sélecteur
   de vue avant de décider lesquels relèvent réellement de `PixieLink`.~~
   Terminé : les trois usages relèvent bien de la navigation et ont été migrés.
5. ~~Confirmer ou écarter `PixieContainer` en comparant les contrats de largeur
   des index, fiches et Recherche.~~ Terminé : les cadres publics convergent
   sur ses largeurs et gouttières, directement ou via `PixieSection`.

## Journal de migration

### 1er septembre 2026 · Architecture Codex

- création des territoires `CodexIndex`, `CodexFiche`, `CodexLayout` et
  `CodexCommon` ;
- alignement de tous les noms de composants, fichiers et props sur leur
  territoire propriétaire ;
- déplacement des props React locales hors de `src/types` ;
- suppression des anciens fichiers de types devenus vides et du dossier
  `CodexEpoque` sans contenu ;
- vérification de l’absence d’import entre `CodexIndex` et `CodexFiche` ;
- `pnpm check:ci` entièrement vert, build Next.js et génération des 114 pages
  compris.

### 1er septembre 2026 · Raccord PixieLink

- migration du sélecteur Liste/Cards vers `PixieLink`, avec conservation de
  l’URL partageable et de `aria-current="page"` ;
- migration des sorties bibliographiques externes, sans modifier leur nouvel
  onglet ni leur politique `rel` ;
- migration des renvois de citations vers leurs fragments de source ;
- statut de `PixieLink` porté de **Partiel** à **Projeté** ;
- `pnpm check:ci` entièrement vert, build Next.js et génération des 114 pages
  compris.

### 1er septembre 2026 · Cadres PixieContainer

- confirmation du contrat commun de 72 rem et de la gouttière médiane pour le
  header global, la home, les fiches et le footer ;
- projection directe de `PixieContainer` sur ces frontières et emploi du cadre
  de 42 rem pour la page 404 ;
- maintien de la projection composée des index et de Recherche via
  `PixieSection` ;
- remplacement du contournement CSS du footer imbriqué par une prop `gutter`
  explicite sur `CodexLayoutFooter` ;
- aucun cadre de l’Atelier ou du Guidebook n’a été entraîné dans la migration ;
- statut de `PixieContainer` porté de **À confirmer** à **Projeté** ;
- `pnpm check:ci` entièrement vert, build Next.js et génération des 114 pages
  compris.

### 1er septembre 2026 · Régie PixieSearchField

- passage compatible de `PixieSearchField` en version `1.1.0` avec l’ajout de
  `enterKeyHint`, transmis jusqu’à l’input natif et documenté dans son dossier
  de l’Atelier ;
- remplacement du formulaire, du champ et du bouton assemblés localement sur
  la page Recherche par `PixieSearchField` ;
- conservation de la méthode GET, du paramètre `q`, de la valeur issue de
  l’URL, de l’autocomplétion désactivée et de la soumission native ;
- suppression des styles historiques du champ et de ses commandes ;
- statuts de `PixieField`, `PixieInput` et `PixieSearchField` portés à
  **Projeté** ;
- `pnpm check:ci` entièrement vert, build Next.js et génération des 114 pages
  compris.

### 1er septembre 2026 · Audit final et garde-fou

- les 29 composants promus possèdent désormais une décision explicite : 19
  sont projetés directement ou par composition et 10 sont conservés sans
  import artificiel dans le Codex public ;
- les 19 composants métier du Codex respectent les quatre territoires
  `CodexIndex`, `CodexFiche`, `CodexLayout` et `CodexCommon` ;
- les 17 fichiers de contrats métier partagés restent indépendants de React ;
- les 70 fichiers du périmètre public ne consomment aucune esquisse
  `PixieDust` et ne recréent aucun contrôle interactif déjà disponible dans
  Pixie ;
- le lien d’identité du header reste volontairement un `Link` Next.js : son
  lockup et son survol propres ne correspondent à aucune des trois variantes
  visuelles de `PixieLink` ;
- `check:pixie` grave ces invariants et rejoint `check` ainsi que `check:ci`.

## Vérification finale

- [x] matrice mise à jour après chaque migration ;
- [x] aucun import mort ou ancien chemin Codex ;
- [x] aucune prop React conservée dans `src/types` ;
- [x] ordre du document, navigation clavier et URLs inchangés par contrat ;
- [x] `pnpm check:pixie` intégré aux répétitions générales ;
- [x] `pnpm check:ci` vert dans un environnement autorisé à écrire `.next` ;
- [x] responsive et deux Lumières relus visuellement par Julien.

La répétition technique et la relecture visuelle sont validées. La Phase 1 est
terminée.
