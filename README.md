# 🐭 Le Codex du Disneyiste

> Explorer, relier et raconter les imaginaires Disney.

**Le Codex du Disneyiste** est l’espace numérique du projet éditorial
**Le Disneyiste**.

Il documente Disney à travers ses personnages, ses créateurs, ses œuvres et les
relations qui les relient, avec l’ambition de construire progressivement un
atlas éditorial de cet imaginaire culturel.

Le projet est personnel, indépendant et non officiel.

---

## État du projet

🚧 **En construction**

Le Codex est développé progressivement à partir d’objets réels plutôt qu’à
partir d’une architecture encyclopédique définie à l’avance.

Les premières entrées sont :

### Personnages

- Mickey Mouse
- Minnie Mouse

### Créateurs

- Walt Disney
- Ub Iwerks

### Œuvres

- _Steamboat Willie_

Ces premières fiches servent également de terrain d’expérimentation pour faire
émerger les modèles, relations et composants du Codex.

---

## Principes

### Le terrain corrige le plan

L’architecture du Codex évolue à partir des besoins rencontrés dans les fiches
réelles.

Une abstraction n’est introduite que lorsqu’un besoin concret la justifie.

### Une seule source de vérité, plusieurs chemins de lecture

Les relations sont enregistrées là où elles possèdent un sens documentaire.

Le Codex peut ensuite calculer certains chemins inverses sans recopier les mêmes
relations dans plusieurs fichiers.

Par exemple :

```text
Mickey Mouse
└── créé par → Walt Disney
```

permet au Codex de faire apparaître automatiquement :

```text
Walt Disney
└── personnages → Mickey Mouse
```

### Documenter avant d’orner

Le système distingue plusieurs couches :

```text
Catalogue
→ indique qu’une entrée existe

Fiche
→ porte ses données documentaires

Sources
→ indiquent les documents utilisés

Relations
→ relient les entrées entre elles

Interface
→ donne à voir l’ensemble
```

---

## Architecture actuelle

```text
src/
├── app/
│   ├── contributeurs/
│   ├── oeuvres/
│   ├── personnages/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   └── codex/
│       ├── CodexFicheHeader.tsx
│       ├── CodexFicheSection.tsx
│       ├── ReferenceCodexLink.tsx
│       ├── RelationsCodex.tsx
│       └── SourcesCodex.tsx
│
├── data/
│   ├── catalogues/
│   ├── contributeurs/
│   ├── oeuvres/
│   ├── personnages/
│   ├── sources/
│   └── relations.ts
│
├── lib/
│   └── date.ts
│
└── types/
    ├── codex.ts
    ├── contributeur.ts
    ├── date.ts
    ├── fiche.ts
    ├── oeuvre.ts
    ├── personnage.ts
    ├── reference.ts
    └── source.ts
```

---

## Données

Le contenu du Codex repose actuellement sur des fichiers JSON versionnés dans
le dépôt.

### Catalogues

Les catalogues décrivent les entrées disponibles :

```text
src/data/catalogues/
├── contributeurs.json
├── oeuvres.json
└── personnages.json
```

Ils contiennent uniquement les informations nécessaires à l’indexation et à
l’identification d’une entrée.

### Fiches

Les données détaillées sont séparées des catalogues :

```text
src/data/contributeurs/
src/data/oeuvres/
src/data/personnages/
```

Chaque famille possède son propre modèle métier.

### Sources

Les sources sont centralisées dans :

```text
src/data/sources/
```

Les fiches référencent les sources par identifiant plutôt que de recopier leurs
métadonnées.

Une source institutionnelle, historique ou éditoriale est considérée comme un
matériau documentaire, jamais comme une vérité absolue du Codex.

---

## Relations

Les entrées peuvent se référencer à l’aide de `ReferenceCodex`.

Une référence peut pointer vers :

```text
personnage
contributeur
oeuvre
```

Certaines relations plus riches possèdent leur propre structure métier.

Par exemple, une contribution à une œuvre contient à la fois :

```text
contributeur
+
rôle(s)
```

Le Codex calcule également certaines relations inverses à partir des données
existantes.

---

## Projection Originale

L’interface utilise un système appelé **Projection**.

Une Projection définit la manière dont le même contenu est donné à voir sans
modifier les données du Codex.

La première est :

```text
Projection Originale
```

Elle possède actuellement deux Lumières :

```text
sombre
claire
```

La lumière sombre est utilisée par défaut.

Les composants utilisent exclusivement des tokens sémantiques tels que :

```text
canvas
surface
ink
muted
line
accent
```

et ne dépendent pas directement des couleurs d’une Projection.

Cette architecture permettra plus tard de créer d’autres Projections sans
réécrire les composants.

---

## Développement

### Prérequis

- Node.js 22+
- pnpm 11+

### Installation

```bash
pnpm install
```

### Développement local

```bash
pnpm dev
```

L’application est disponible sur :

```text
http://localhost:3000
```

---

## Vérifications

### Contrôle local complet

```bash
pnpm check
```

Cette commande exécute :

```text
format
→ format:check
→ lint
→ build
```

### Contrôle non destructif

```bash
pnpm check:ci
```

Destiné notamment aux environnements automatisés.

Les commandes individuelles restent disponibles :

```bash
pnpm format
pnpm format:check
pnpm lint
pnpm build
```

---

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Prettier
- pnpm 11

---

## Conventions de développement

Les règles de contribution et la convention narrative des commits sont
documentées dans :

[`AGENTS.md`](./AGENTS.md)

Le développement est notamment rythmé par des **Actes** et des **Entractes**.

```text
🎞️ Acte
→ cycle de construction et d’expérimentation

🍿 Entracte
→ période de relecture, correction et finition
```

Les véritables changements utilisent toujours leur domaine propre :

```text
✨ Étincelle
🏗️ Décor
🎨 Mise en scène
🎬 Scène
🩹 Raccord
🗄️ Archives
🔌 Passerelle
🛡️ Garde-fou
✍️ Scénario
🧹 Coulisses
⚡ Accéléré
🧪 Répétition
🚀 Première
```

---

## Indépendance

Le Disneyiste est un projet éditorial personnel, indépendant et non officiel,
créé par **Julien Julien**.

Il n’est ni affilié, ni approuvé, ni sponsorisé par The Walt Disney Company ou
ses filiales.

Les marques, personnages, œuvres et noms cités appartiennent à leurs titulaires
respectifs.

---

## 👋 À propos du développeur

**Julien Julien**<br />
_Développeur web & créateur de projets narratifs._

Je conçois des applications et des outils numériques durables, où le code, la
structure et le récit avancent ensemble.<br />
J'aime les projets clairs, évolutifs, pensés pour le temps long plutôt que pour
l'instantané.

📍 Angers, France 🇫🇷<br />
🌍 <https://julienjulien.fr>
