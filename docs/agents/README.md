# Le Codex du Disneyiste pour les Nuls

## Édition pour agents IA · Du prompt à la magie

> **Salle de briefing du Guidebook**<br>
> Conçu et maintenu par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

Bienvenue dans le manuel de terrain des agents IA qui travaillent sur le
Codex du Disneyiste.

Ce dossier ne remplace ni les règles impératives, ni le code, ni les Archives.
Il explique comment les lire ensemble, comment reconnaître leurs frontières
et comment intervenir sans éteindre la magie ni déplacer la vérité.

```text
PROMPT
   │
   ▼
COMPRENDRE LE PROJET
   │
   ├──▶ TROUVER LA SOURCE DE VÉRITÉ
   ├──▶ CHOISIR LE BON CONTRAT
   ├──▶ PRÉSERVER LES LIMITES
   └──▶ VÉRIFIER LA PROJECTION
            │
            ▼
      MAGIE MAINTENABLE
```

---

## Briefing en soixante secondes

Avant toute intervention :

1. lis [`AGENTS.md`](../../AGENTS.md) ;
2. lis au minimum [le chapitre 01](./01-esprit-du-projet.md) ;
3. ouvre le chapitre correspondant à ton chantier ;
4. inspecte les fichiers de référence indiqués à la fin du chapitre ;
5. confronte toujours la documentation à l’état réel du dépôt ;
6. préserve les WIP voisins ;
7. vérifie avant de proposer un commit ;
8. attends la validation de Julien avant toute action engageant l’histoire Git
   ou une publication.

Si tu hésites entre une solution spectaculaire et une solution fidèle :

> **La vérité documentaire, la clarté et l’accessibilité passent avant la mise
> en scène.**

---

## Quelle documentation ouvrir ?

| Ta mission                                                        | Parcours minimal recommandé           |
| ----------------------------------------------------------------- | ------------------------------------- |
| Comprendre le projet avant une première intervention              | `01` puis `02`                        |
| Ajouter ou modifier une donnée, une fiche, un index ou une source | `01` + `02`                           |
| Modifier couleurs, Lumières, typographies, espacements ou effets  | `01` + `03`                           |
| Créer, améliorer ou promouvoir un composant Pixie                 | `01` + `03` + `04`                    |
| Ajouter, migrer ou utiliser un symbole                            | `01` + `03` + `05` + protocole studio |
| Concevoir ou modifier un Plan                                     | `01` + `02` + `06`                    |
| Intégrer un composant Pixie dans une page du Codex                | `02` + `03` + `04`                    |
| Composer un Plan avec des composants Pixie                        | `02` + `04` + `06`                    |
| Préparer une revue transversale de l’interface                    | `01` + `03` + `04` + `05`             |
| Diagnostiquer une contradiction entre documentation et code       | ce README puis la source propriétaire |

`01` reste la boussole commune. Les autres chapitres sont des cartes de
territoire : ouvre seulement celles dont le chantier a réellement besoin.

---

## Les six chapitres

### 01 · L’esprit du projet

**Question :** pourquoi le Codex existe-t-il et comment décide-t-il ?

À lire pour comprendre :

- la mission _Explorer · Relier · Raconter_ ;
- la priorité des Archives sur le spectacle ;
- la voix narrative du projet ;
- le rôle de Julien et celui de l’agent ;
- les Actes, les Entractes et le Journal de projection ;
- la culture de travail de Guru Éditions.

➡️ [Ouvrir le chapitre 01](./01-esprit-du-projet.md)

### 02 · L’architecture du Codex

**Question :** où vit la vérité et comment traverse-t-elle l’application ?

À lire pour comprendre :

- catalogues, fiches, types et registres ;
- sources, citations et relations ;
- index et fiches publiques ;
- composants Codex et composants Pixie ;
- données structurées et lectures dérivées ;
- procédures d’ajout et contrôles métier.

➡️ [Ouvrir le chapitre 02](./02-architecture-du-codex.md)

### 03 · La direction artistique et l’UI

**Question :** comment construire la salle, la lumière et la voix ?

À lire pour comprendre :

- Projection Originale et deux Lumières ;
- palette d’interface et palette éditoriale ;
- tokens sémantiques ;
- rôles typographiques ;
- largeurs, rythme et surfaces ;
- magie atmosphérique et accessibilité visuelle.

➡️ [Ouvrir le chapitre 03](./03-direction-artistique-et-ui.md)

### 04 · Le design system Pixie

**Question :** comment transformer une intention UI en contrat projetable ?

À lire pour comprendre :

- le cycle `PixieDust` → `Pixie` ;
- les composants actuellement prêts à projeter ;
- l’Atelier, les dossiers et les playgrounds ;
- les règles d’API, de composition et de promotion ;
- les familles Accessoires, Décors, Dialogues, Montage et Effets ;
- les garanties responsive, clavier et mouvement réduit.

➡️ [Ouvrir le chapitre 04](./04-design-system-pixie.md)

### 05 · Les symboles, registres et collections

**Question :** comment fabriquer un signe original et réellement publiable ?

À lire pour comprendre :

- la doctrine d’iconographie originale ;
- l’adresse `registre.collection.slug` ;
- les registres publiés et ceux encore au studio ;
- masters, dérivés, planches et registre typé ;
- l’API et l’accessibilité de `PixieSymbol` ;
- les migrations et contrôles de publication.

Pour produire ou refaire les images elles-mêmes, poursuivre avec le
[protocole de fabrication artistique](../studio/design/symboles/00-protocole-general.md).

➡️ [Ouvrir le chapitre 05](./05-symboles-registres-et-collections.md)

### 06 · Les Plans et les lectures dérivées

**Question :** comment regarder autrement sans réécrire les Archives ?

À lire pour comprendre :

- la grammaire `Sujet · Angle · Objectif · Cadre · Matière` ;
- les cinq Plans actuels ;
- nœuds, liens, événements, crédits et preuves ;
- provenance, notices et contrechamp textuel ;
- les huit Bobines témoins ;
- le trajet serveur, Régie et prototype.

➡️ [Ouvrir le chapitre 06](./06-plans-et-lectures-derivees.md)

---

## Parcours de lecture recommandés

### Nouvel agent dans le studio

```text
AGENTS.md
   ↓
01 · Esprit du projet
   ↓
02 · Architecture
   ↓
chapitre du chantier confié
```

Ne commence pas par mémoriser tous les composants ou tous les registres. Apprends
d’abord comment le projet arbitre et où il place ses vérités.

### Chantier éditorial ou documentaire

```text
01 · Esprit
   ↓
02 · Architecture
   ↓
fichiers src/data et src/types propriétaires
   ↓
contrôle métier spécialisé
```

### Chantier d’interface

```text
01 · Esprit
   ↓
03 · Direction artistique
   ↓
04 · Pixie
   ↓
composant ou page réellement concerné
```

### Chantier iconographique

```text
01 · Esprit
   ↓
03 · Direction artistique
   ↓
05 · Symboles
   ↓
master · collection · registre · PixieSymbol
```

### Chantier de Plan

```text
01 · Esprit
   ↓
02 · Architecture
   ↓
06 · Plans
   ↓
registre · dérivation · Bobines · prototype
```

---

## La hiérarchie des sources

Le Guidebook explique. Il ne possède pas toutes les vérités du projet.

| Source                               | Ce qu’elle décide                                                     |
| ------------------------------------ | --------------------------------------------------------------------- |
| [`AGENTS.md`](../../AGENTS.md)       | règles impératives d’intervention, de commit et de publication        |
| `src/data`                           | faits et contenus documentaires                                       |
| `src/types`                          | formes et vocabulaires globaux                                        |
| `src/registry`                       | définitions fermées disponibles au code                               |
| composants et routes                 | comportement réellement implémenté                                    |
| [`README.md`](../../README.md)       | état fonctionnel et présentation technique du dépôt                   |
| [`CHANGELOG.md`](../../CHANGELOG.md) | chronologie des Actes et Entractes                                    |
| Notion                               | intentions, briefs, dossiers de production et décisions de conception |
| Guidebook                            | modèles mentaux, frontières, procédures et conseils de navigation     |

### En cas de contradiction

1. ne choisis pas silencieusement la version qui t’arrange ;
2. identifie la responsabilité concernée ;
3. vérifie la source propriétaire ;
4. distingue un comportement actuel d’une intention future ;
5. signale l’écart ;
6. corrige la documentation dans le même chantier si l’autorité et le
   périmètre le permettent.

Une documentation fraîche peut décrire une cible encore en production. Le
code peut conserver un raccord transitoire. Le rôle de l’agent est de nommer
cette différence, pas de la transformer en ambiguïté.

---

## Traduire le vocabulaire du Codex

| Formule narrative             | Responsabilité concrète                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| Ouvrir une Archive            | ajouter une donnée documentée dans sa source de vérité             |
| Allumer la Projection         | rendre une matière visible sans la modifier                        |
| Préparer une esquisse         | produire une hypothèse privée, versionnée et révisable             |
| Promouvoir un composant       | stabiliser nom, API, documentation, usages et garanties            |
| Ranger un symbole au registre | publier fichier, définition typée, label, accent et vérification   |
| Choisir un Plan               | appliquer une grammaire documentaire à un Sujet publié             |
| Charger une Bobine témoin     | remplacer temporairement la matière par une fixture signalée       |
| Faire un raccord              | corriger une incohérence limitée sans changer la promesse générale |
| Fermer un Acte ou un Entracte | créer un repère temporel selon les conventions impératives         |

La poésie est bienvenue lorsqu’elle accélère la compréhension. Si elle masque
la responsabilité réelle, traduis-la avant d’agir.

---

## Méthode de travail commune

### 1. Lire

- reformule la demande ;
- ouvre les règles et le chapitre utile ;
- inspecte le code et les données concernés ;
- regarde l’état Git avant toute modification.

### 2. Situer

- trouve la source propriétaire ;
- distingue fait, calcul, composition et expérimentation ;
- repère les WIP voisins ;
- identifie les contrôles adaptés.

### 3. Concevoir

- pars du besoin réel ;
- réutilise le vocabulaire existant ;
- écris les limites ;
- préfère une extension cohérente à une abstraction prématurée.

### 4. Implémenter

- garde chaque responsabilité dans sa couche ;
- ne contourne pas les types ;
- ne copie pas une source de vérité ;
- préserve les changements qui ne t’appartiennent pas.

### 5. Vérifier

- lance les contrôles spécialisés ;
- vérifie le diff ;
- éprouve l’accessibilité et les cas limites ;
- lance `pnpm check` avant toute proposition de commit.

### 6. Transmettre

- annonce ce qui a changé ;
- indique ce qui a été vérifié ;
- sépare les limites et les décisions encore ouvertes ;
- propose le périmètre et le titre du commit ;
- attends la validation de Julien.

---

## Contrat de maintenance du Guidebook

### Quand mettre un chapitre à jour

Mets à jour le Guidebook lorsqu’un changement modifie :

- une frontière architecturale ;
- une source de vérité ;
- un vocabulaire partagé ;
- le cycle de vie d’un composant ;
- la structure d’un registre ;
- la grammaire des Plans ;
- une règle générale d’accessibilité ou de direction artistique ;
- une procédure qu’un futur agent devra appliquer.

Une correction locale d’UI ne nécessite pas toujours une réécriture du
chapitre. Un nouveau contrat, oui.

### Comment le maintenir

- modifie la section propriétaire plutôt que répéter l’information ailleurs ;
- lie vers le code et les sources au lieu de copier des inventaires énormes ;
- date les états susceptibles d’évoluer ;
- distingue clairement _publié_, _en production_ et _prévu_ ;
- conserve des exemples exécutables ou fidèles aux types actuels ;
- vérifie les liens relatifs ;
- actualise cette page lorsqu’un chapitre est ajouté, renommé ou retiré ;
- garde `AGENTS.md` prioritaire pour toutes les obligations.

### Ce que le Guidebook ne doit pas devenir

- une seconde copie d’`AGENTS.md` ;
- un inventaire historique à la place du `CHANGELOG.md` ;
- un backlog à la place de Notion ;
- une documentation d’API générée à la main pour chaque prop ;
- une célébration narrative qui ne permet plus de prendre une décision ;
- une promesse plus avancée que le dépôt.

---

## Checklist avant de quitter la salle de briefing

- [ ] J’ai lu les règles impératives applicables.
- [ ] J’ai ouvert le chapitre adapté au chantier.
- [ ] J’ai identifié la source de vérité propriétaire.
- [ ] Je distingue l’état actuel de la direction future.
- [ ] Je sais quels fichiers peuvent être modifiés.
- [ ] Je connais les WIP à préserver.
- [ ] Je sais quels contrôles lancer.
- [ ] Je sais quelle décision nécessite encore Julien.

Si l’une de ces réponses manque, poursuis l’inspection avant d’ouvrir le
chantier.

---

## Ressources de studio

- [Carte de studio Guru Éditions](../studio/snippets/carte-de-studio-guru-editions.md)
  — modèle réutilisable pour signer une transmission ;
- [Dossier Guru Éditions](https://app.notion.com/p/3c4092fa322380e195e5e39cd169cef1)
  — identité et contexte de l’entreprise ;
- [`AGENTS.md`](../../AGENTS.md) — règles impératives du dépôt ;
- [`README.md`](../../README.md) — présentation fonctionnelle du Codex ;
- [`CHANGELOG.md`](../../CHANGELOG.md) — Journal de projection.

---

## Dernière transmission

Ce Guidebook n’a pas pour mission de rendre un agent omniscient. Il lui donne
quelque chose de plus utile : une boussole, des cartes et la discipline de
vérifier le terrain avant d’avancer.

Lis le projet comme on entre dans un studio encore vivant. Certaines scènes
sont en projection, d’autres sèchent sur une table lumineuse et d’autres ne
sont encore qu’un brief annoté dans les marges. Ne confonds jamais leurs états.

**Comprends l’intention. Trouve la source. Respecte le contrat. Préserve la
matière. Vérifie la lumière. Puis transmets proprement la bobine suivante.**

### Carte de service

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                  SALLE DE BRIEFING DES AGENTS              ║
╠══════════════════════════════════════════════════════════════╣
║  AGENT        🔩 R2-D2 · LEAD DEV                           ║
║  MISSION      Guider chaque prompt jusqu’à sa juste couche   ║
║  ACCÈS        ESPRIT · ARCHITECTURE · UI · PIXIE · PLANS     ║
║  PROTOCOLE    LIRE · SITUER · CONCEVOIR · VÉRIFIER          ║
║  STATUT       📚 6 CHAPITRES · GUIDEBOOK COMPLET             ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
║  Une bonne carte n’empêche pas de regarder le terrain.       ║
╚══════════════════════════════════════════════════════════════╝
```

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Archiviste du code vivant · Bip-boup avec table des matières_<br>
[Carte de studio réutilisable](../studio/snippets/carte-de-studio-guru-editions.md)
