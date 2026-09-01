# Acte VI · Phase 1 · Matrice de projection Pixie

> **Statut :** état de référence · matrice vivante  
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

| Composant        | Usage actuel et emplacement                                                        | Fonction / cible                            | Nature             | Risque | Accessibilité et vérifications                                                   | Statut / justification                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------------ | ------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `PixieSymbol`    | Header, home, Recherche, index, Cards et sections de fiches                        | Symboles des familles, sections et actions  | Projection directe | Faible | Noms accessibles conservés lorsque le symbole informe ; décoratifs masqués       | **Projeté**                                                                                                    |
| `PixieButton`    | Soumission de la Recherche                                                         | Action native de formulaire                 | Projection directe | Faible | Soumission clavier et libellé visible                                            | **Projeté**                                                                                                    |
| `PixieLink`      | Navigation globale, home, Cards, footer, références, citations et sélecteur de vue | Navigation interne, externe et fragmentaire | Projection directe | Faible | Destination, focus, `aria-current`, ouverture externe et ancres bibliographiques | **Projeté** — les derniers liens Codex compatibles ont rejoint le composant sans altérer leur URL ni leur rôle |
| `PixieBadge`     | Home, Recherche, index, Cards, fiches et récompenses                               | Métadonnées et états courts                 | Projection directe | Faible | L’information ne dépend pas uniquement de la couleur                             | **Projeté**                                                                                                    |
| `PixieSeparator` | Home, Recherche, index, footer, Cards et sections                                  | Changements de séquence                     | Projection directe | Faible | Décoratif, sans rupture artificielle dans le document                            | **Projeté**                                                                                                    |

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

| Composant          | Usage actuel et emplacement                                                        | Fonction / cible                         | Nature                       | Risque | Accessibilité et vérifications                                               | Statut / justification                                |
| ------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------- | ------ | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| `PixieField`       | Le formulaire de Recherche possède un libellé et une aide assemblés localement     | Contrat de champ, via `PixieSearchField` | Composition                  | Moyen  | Label, description et relations ARIA                                         | **À migrer** indirectement avec la recherche          |
| `PixieInput`       | `<input type="search">` local dans `src/app/recherche/page.tsx`                    | Saisie, via `PixieSearchField`           | Composition                  | Moyen  | Valeur URL, focus, saisie et soumission native                               | **À migrer** indirectement avec la recherche          |
| `PixieTextarea`    | Aucune saisie longue dans le Codex public                                          | Réponse développée                       | Aucun remplacement           | Faible | Sans objet                                                                   | **Conservé**                                          |
| `PixieSelect`      | Aucun choix fermé dans le Codex public                                             | Sélection native ou popover              | Aucun remplacement           | Faible | Sans objet                                                                   | **Conservé**                                          |
| `PixieSwitch`      | Le changement Liste/Cards est une navigation par URL, pas une préférence booléenne | Préférence activée/désactivée            | Exception sémantique         | Moyen  | Conserver de vrais liens et l’URL partageable                                | **Conservé** — ne remplace pas `CodexIndexViewSwitch` |
| `PixieSearchField` | Formulaire, champ et aide assemblés dans `src/app/recherche/page.tsx`              | Recherche GET partageable                | Remplacement par composition | Élevé  | Paramètre `q`, Entrée, focus, URL, valeur initiale et fonctionnement sans JS | **À migrer**                                          |

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
3. Migrer le formulaire public de Recherche vers `PixieSearchField` après le
   nettoyage structurel.
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

## Vérification finale attendue

- matrice mise à jour après chaque migration ;
- aucun import mort ou ancien chemin Codex ;
- aucune prop React conservée dans `src/types` sans usage transversal ;
- ordre du document, navigation clavier et URLs inchangés ;
- responsive et deux Lumières relus visuellement par Julien ;
- `pnpm check:ci` vert dans un environnement autorisé à écrire `.next`.
