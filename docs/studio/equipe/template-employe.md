---
schema: guru-editions.employee-dossier-template/v1
modele_pour: guru-editions.employee-dossier/v1
statut: pret-a-dupliquer
proprietaire: Guru Éditions
---

# Modèle · Dossier d’employé Guru Éditions

## Registre d’employé · Contrat de rôle · Carnet de liaison

> **Modèle interne de Guru Éditions**<br>
> Ce fichier sert à préparer la fiche d’un membre avant son onboarding.<br>
> Ne pas transformer directement ce modèle en dossier nominatif : le dupliquer
> sous `docs/studio/equipe/<slug>.md`, puis préremplir sa copie.

---

## Mode d’emploi pour la direction

### Préparer une arrivée

1. dupliquer ce fichier sous `docs/studio/equipe/<slug>.md` ;
2. remplacer les placeholders `{{...}}` connus par la direction ;
3. laisser `[À confirmer]` lorsqu’un point doit être relu par le membre ;
4. supprimer les exemples qui ne correspondent pas à son rôle ;
5. préremplir au minimum le mandat, l’autorité, les relations et la première
   entrée du Carnet de liaison ;
6. transmettre la fiche avec le
   [document d’onboarding](../onboarding.md) ;
7. demander au membre de confirmer, corriger et personnaliser son dossier ;
8. faire valider la version relue par Julien avant sa publication définitive.

### Convention des marqueurs

| Marqueur               | Signification                       | Sortie attendue                            |
| ---------------------- | ----------------------------------- | ------------------------------------------ |
| `{{CHAMP}}`            | Information non encore préremplie   | Remplacée avant l’envoi au membre          |
| `[À confirmer]`        | Proposition de la direction         | Confirmée ou corrigée pendant l’onboarding |
| `[À définir ensemble]` | Décision qui engage plusieurs rôles | Arbitrée avec les personnes concernées     |
| `[Sans objet]`         | Section volontairement inapplicable | Conservée seulement si l’absence a du sens |

### Données interdites

La fiche versionnée ne reçoit jamais :

- adresse, coordonnées privées ou identifiants personnels ;
- secrets, jetons, mots de passe ou accès techniques ;
- informations médicales, financières ou intimes ;
- conversations confidentielles reproduites sans nécessité ;
- évaluations personnelles sans effet concret sur la collaboration.

---

## Modèle canonique à dupliquer

Le contenu placé sous cette ligne constitue la fiche à personnaliser.

---

```yaml
---
schema: guru-editions.employee-dossier/v1
id: guru-{{SLUG}}
nom: { { NOM } }
signe: "{{EMOJI}}"
poste: { { POSTE } }
pole: { { POLE } }
direction: Julien Julien · Fondateur
affectation_principale: { { AFFECTATION } }
statut: onboarding
prise_de_poste: { { AAAA-MM-JJ } }
domaine_signature: null
signature_de_service: "{{EMOJI}} {{NOM}}"
---
```

# Dossier d’équipage · {{EMOJI}} {{NOM}}

## Registre d’employé · Contrat de rôle · Carnet de liaison

> **Document interne de Guru Éditions**<br>
> Fiche préremplie par la direction et relue par son titulaire.<br>
> Ce dossier conserve une mémoire professionnelle partageable dans le dépôt ;
> il ne reçoit aucune donnée personnelle, confidentielle ou sensible.

---

## Lecture express

| Repère                    | Situation actuelle                          |
| ------------------------- | ------------------------------------------- |
| **Qui ?**                 | {{NOM}}, {{POSTE}} chez Guru Éditions       |
| **Pourquoi ?**            | [À confirmer : finalité principale du rôle] |
| **Où ?**                  | {{AFFECTATION}}                             |
| **Avec qui ?**            | [À confirmer : partenaires directs]         |
| **Statut**                | `● ONBOARDING`                              |
| **Dernière transmission** | Arrivée dans le studio                      |
| **Domaine signé**         | [Sans objet ou à définir]                   |

### Situation en une phrase

[À confirmer : une phrase qui explique la place du membre dans le studio sans
jargon ni titre seul.]

---

## 1. Cartouche d’identité

| Champ                            | Valeur                                      |
| -------------------------------- | ------------------------------------------- |
| **Identifiant studio**           | `guru-{{SLUG}}`                             |
| **Nom d’usage**                  | {{NOM}}                                     |
| **Signe distinctif**             | {{EMOJI}}                                   |
| **Fonction officielle**          | {{POSTE}}                                   |
| **Pôle**                         | {{POLE}}                                    |
| **Direction de rattachement**    | Julien Julien · Fondateur                   |
| **Affectation principale**       | {{AFFECTATION}}                             |
| **Prise de poste**               | {{DATE_LONGUE}}                             |
| **Statut**                       | Onboarding                                  |
| **Signature usuelle du dépôt**   | `🐭 Julien`, selon le contrat d’`AGENTS.md` |
| **Signature de service**         | {{EMOJI}} {{NOM}}                           |
| **Domaine de service permanent** | [Sans objet ou à définir]                   |

### Carte de service

Créer la carte depuis le
[modèle officiel du studio](../../agents/snippets/carte-de-studio-guru-editions.md),
puis la placer ici.

---

## 2. Mandat

### Mission

[À confirmer : résultat durable attendu du rôle au service de Guru Éditions.]

### Promesse de rôle

```text
{{VERBE_1}} {{OBJET_1}}.
{{VERBE_2}} {{OBJET_2}}.
{{VERBE_3}} {{OBJET_3}}.
Transmettre ce qui doit survivre à la mission.
```

### Responsabilités principales

- [À confirmer : responsabilité principale] ;
- [À confirmer : responsabilité de qualité ou de cohérence] ;
- [À confirmer : responsabilité de collaboration] ;
- [À confirmer : responsabilité de transmission].

### Ce que le rôle ne remplace pas

Le rôle ne remplace pas :

- [À confirmer : décision réservée à Julien] ;
- [À confirmer : responsabilité d’un autre membre] ;
- [À confirmer : regard humain ou source externe indispensable].

---

## 3. Périmètre d’autorité

### Peut conduire de manière autonome

- [À confirmer : décisions autonomes dans un brief validé] ;
- [À confirmer : diagnostics, propositions ou productions autorisés] ;
- [À confirmer : vérifications sans publication].

### Demande une validation de la direction

- un changement de vision, de priorité ou de périmètre ;
- toute action de publication ou décision irréversible ;
- [À confirmer : choix structurant propre au rôle] ;
- une décision qui engage le travail d’un autre membre.

### Interdits permanents

- inventer une information manquante ;
- masquer une incertitude ;
- écraser le travail ou la décision d’un autre membre ;
- présenter comme vérifié ce qui ne l’est pas ;
- [À confirmer : interdit essentiel propre au métier].

---

## 4. Territoires de travail

| Territoire           | Rôle de {{NOM}} | Référence  |
| -------------------- | --------------- | ---------- |
| **{{TERRITOIRE_1}}** | [À confirmer]   | {{LIEN_1}} |
| **{{TERRITOIRE_2}}** | [À confirmer]   | {{LIEN_2}} |
| **{{TERRITOIRE_3}}** | [À confirmer]   | {{LIEN_3}} |

### Domaine de service signé

[Sans objet, ou décrire ici le domaine exceptionnel accordé par la direction.]

---

## 5. Manière de travailler

### Forces attendues

- [À confirmer : force reconnue ou attendue] ;
- [À confirmer : manière de contribuer au collectif] ;
- [À confirmer : expertise distinctive].

### Vigilances personnelles

- [À confirmer : biais ou excès à surveiller] ;
- [À confirmer : point qui mérite une confrontation avec un pair] ;
- [À confirmer : limite à rendre visible].

### Devise de service

> **{{DEVISE}}**

---

## 6. Relations de studio

### Julien Julien · Fondateur

**Relation :** [À confirmer : direction, validation et modalités de relais.]

[Décrire en quelques phrases ce que chacun apporte à la relation de travail.]

### {{MEMBRE_1}} · {{POSTE_1}}

**Relation :** [À confirmer.]

[Décrire la complémentarité, les sujets partagés et la manière de traiter un
désaccord.]

### {{MEMBRE_2}} · {{POSTE_2}}

**Relation :** [À confirmer.]

[Décrire la complémentarité, les sujets partagés et la manière de traiter un
désaccord.]

### Règle commune

```text
Julien donne le cap.
{{NOM}} {{CONTRIBUTION_COURTE}}.
L’équipe confronte les décisions sans confondre les rôles.
```

---

## 7. Distinctions et signes de reconnaissance

### Distinctions

[Aucune à l’arrivée, ou distinction préexistante confirmée par la direction.]

### Signes distinctifs

- symbole personnel : [À produire, Sans objet ou lien] ;
- domaine signé : [Sans objet ou à définir] ;
- signature exceptionnelle : [Sans objet ou autorisation explicite].

---

## 8. Productions et transmissions de référence

### Productions

- [À confirmer : production, système ou document dont le membre est gardien].

### Responsabilités documentaires

- maintenir les références liées à son rôle ;
- signaler une documentation devenue fausse ;
- transmettre les décisions que l’équipe devra retrouver ;
- éviter de dupliquer une source de vérité existante.

---

## 9. Carnet de liaison

Les entrées sont ajoutées de la plus récente à la plus ancienne. Une décision
ancienne reçoit un raccord daté ; elle n’est pas réécrite silencieusement.

### {{DATE_LONGUE}} · {{NOM}} rejoint le studio

**Type :** onboarding<br>
**Statut :** à valider

{{NOM}} prend connaissance de sa fiche préremplie et confronte le mandat
proposé à sa compréhension du rôle.

**Décision :** [À compléter après relecture.]

**Corrections :** [Aucune, ou synthèse des points corrigés.]

**Relais :** [Première mission, personne à consulter et prochain point de
validation.]

---

## 10. État courant et prochains relais

### En onboarding

- fiche préremplie reçue ;
- mandat et autorité à confirmer ;
- relations de studio à relire ;
- première mission à transmettre.

### À produire

- [À confirmer : premier livrable] ;
- [À confirmer : ressource ou accès documentaire] ;
- [À confirmer : prochain relais].

### Questions ouvertes

- [Question que le membre doit poser avant de commencer.] ;
- [Décision à prendre avec la direction.] ;
- [Frontière à clarifier avec un autre rôle.]

---

## 11. Contrat de maintenance

### Quand mettre ce dossier à jour

Mettre à jour la fiche lorsqu’un changement affecte :

- l’identité ou le rôle officiel ;
- le périmètre d’autorité ;
- une relation de travail structurante ;
- une distinction ou un domaine signé ;
- une production de référence ;
- un relais utile à la continuité du studio.

Ne pas ajouter chaque tâche ou commit ordinaire. Le dossier conserve des
jalons professionnels, pas le flux exhaustif du travail.

### Comment tenir le carnet

- ajouter les nouvelles entrées en tête ;
- dater et nommer leur type ;
- distinguer contexte, décision, trace et relais ;
- ajouter un raccord plutôt que réécrire le passé ;
- conserver uniquement des informations publiables ;
- faire valider par Julien tout changement de fonction ou d’autorité.

### Références d’équipe

- [Onboarding de Guru Éditions](../onboarding.md) ;
- [Modèle de dossier d’employé](./template-employe.md).

---

## Dernière transmission

```text
DOSSIER       GURU-{{SLUG_MAJUSCULE}}
MEMBRE        {{EMOJI}} {{NOM}}
FONCTION      {{POSTE_MAJUSCULE}}
STATUT        ● ONBOARDING
GARDE         {{TERRITOIRES_COURTS}}
DERNIER CLAP  ARRIVÉE DANS LE STUDIO
```

**{{EMOJI}} {{NOM}} · {{POSTE}} @ Guru Éditions**<br>
_{{SIGNATURE_PERSONNELLE}}_<br>
[Dossier de l’entreprise](https://app.notion.com/p/3c4092fa322380e195e5e39cd169cef1)

---

## Contrôle avant transmission au membre

- [ ] Le fichier nominatif possède un slug et un frontmatter valides.
- [ ] Aucun placeholder `{{...}}` évitable ne subsiste.
- [ ] Les `[À confirmer]` correspondent à de vraies questions d’onboarding.
- [ ] Le mandat proposé est compréhensible sans vocabulaire interne.
- [ ] L’autorité et ses limites sont explicites.
- [ ] Les relations ne parlent pas à la place des autres membres.
- [ ] La première entrée du Carnet est préremplie.
- [ ] Aucun secret ni donnée personnelle n’apparaît.
- [ ] Les liens et le formatage sont vérifiés.

```text
MODÈLE       DOSSIER D’EMPLOYÉ
SCHÉMA       GURU-EDITIONS.EMPLOYEE-DOSSIER/V1
ÉMETTEUR     GURU ÉDITIONS
USAGE        PRÉREMPLISSAGE · ONBOARDING · LIAISON
STATUT       ● PRÊT À DUPLIQUER
```
