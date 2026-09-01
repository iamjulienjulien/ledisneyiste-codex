# Acte VI · Clôture de la Phase 0

> **Document interne de transmission**<br>
> Établi par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Verdict

La Phase 0 — **Mettre le Guidebook en projection** — est terminée.

Le Codex possède désormais une salle documentaire privée capable de parcourir
les sept chapitres locaux transmis aux agents et une arborescence Notion
explicitement déclarée. Les trois Écrans nécessaires à cette lecture sont
promus en version `1.0.0` : `PixieAscii`, `PixieMarkdown` et `PixieDocs`.

Cette projection reste une coulisse. Elle est absente de la navigation publique,
introuvable en production et n’accorde au navigateur aucun accès au système de
fichiers, aux identifiants Notion ou aux secrets du studio.

## Ce que la Phase 0 livre

### Un domaine documentaire neutre

- les types `Guidebook*` décrivent documents, blocs, sommaires, liens, états et
  bibliothèques sans dépendre de Pixie ;
- le Markdown est analysé une seule fois côté serveur ;
- les blocs, ancres, titres, liens et entrées de sommaire proviennent de cette
  même analyse ;
- les adaptateurs locaux et Notion produisent une matière sérialisable déjà
  autorisée ;
- Next.js conserve la responsabilité des routes, des pages introuvables, des
  métadonnées et de la frontière de production.

### Deux bibliothèques sous contrôle

- `docs/agents/` est l’unique racine locale transmissible ;
- `docs/studio/` demeure entièrement hors projection ;
- la bibliothèque locale expose sept documents déclarés ;
- la bibliothèque Notion expose onze pages appartenant à la racine autorisée
  **Le Disneyiste** et à l’arborescence de projection ;
- une cible absente du manifeste ou de l’arborescence reste du texte sans route
  active ;
- les erreurs distantes deviennent des états documentaires et ne rendent jamais
  la bibliothèque locale indisponible.

### Trois Écrans prêts à projeter

- `PixieAscii` préserve les compositions monospacées, leurs alternatives et leur
  copie sans interpréter leur contenu ;
- `PixieMarkdown` restitue la matière sémantique déjà analysée sans injecter de
  HTML arbitraire ;
- `PixieDocs` compose bibliothèque, filtre, sommaire, lecture et raccords sans
  devenir un routeur ;
- les cartes de service Guru Éditions sont reconnues pendant l’analyse et
  reçoivent une présence de studio sans altération de leur chaîne ;
- le lecteur du Guidebook permet de choisir une bibliothèque intégrée ou
  flottante et mémorise cette préférence entre les chapitres.

### Une salle privée

- `/guidebook` et ses routes locales ou Notion sont ouvertes uniquement hors
  production ;
- la salle porte des métadonnées `noindex` et `nofollow` ;
- aucun accès n’apparaît dans la navigation publique du Codex ;
- l’Atelier et le Guidebook disposent d’un raccord interne réciproque ;
- les slugs dynamiques sont fermés et une destination non déclarée produit une
  page introuvable.

## État de la répétition finale

La répétition générale valide :

- les **7 documents locaux** ;
- les **11 pages Notion déclarées** ;
- les **2 832 blocs locaux** et **17 blocs Notion** analysés ;
- les **475 titres**, **230 liens** et **19 compositions ASCII** ;
- les **7 cartes de service** reconnues sans faux positif ;
- les modes de bibliothèque intégrée, sticky et flottante ;
- la confidentialité des chemins, identifiants et secrets ;
- le lint, les vérificateurs documentaires et la compilation Next.js complète.

La relecture visuelle finale du Guidebook a été validée par Julien.

## Raccords différés

La Phase 0 n’emporte volontairement :

- ni édition de Markdown ou de page Notion ;
- ni synchronisation ou cache persistant de Notion ;
- ni recherche plein texte dans les documents ;
- ni médias Notion complexes ;
- ni ouverture publique ou référencement du Guidebook ;
- ni généralisation du contrôle de bibliothèque dans l’API de `PixieDocs`.

Ces absences ne bloquent pas la projection actuelle. Elles devront devenir une
mission explicite avant toute extension afin de préserver les frontières
validées pendant cette phase.

## Passage à la Phase 1

La Phase 1 — **Projeter les composants promus de l’Atelier** — peut commencer.
Elle reçoit :

1. un Guidebook à jour pour comprendre les contrats du dépôt ;
2. trois Écrans documentaires stables et vérifiés ;
3. un garde-fou `check:guidebook` intégré aux répétitions générales ;
4. une règle simple : les composants Pixie projettent une matière autorisée,
   mais ne gagnent jamais les privilèges de leurs adaptateurs serveur.

Le Guidebook devient désormais un outil de transmission vivant. Toute évolution
qui modifie ses composants, ses frontières ou ses sources devra mettre à jour
le chapitre concerné dans le même raccord.

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Phase 0 terminée · Le Guidebook est en projection, la suite peut entrer en scène_
