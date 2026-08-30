# Modèle privé · Carte de studio Guru Éditions

> **Ressource interne réutilisable**<br>
> Modèle conçu par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

Cette carte identifie une personne, un agent ou un collaborateur dans les
documents internes de Guru Éditions. Elle donne à chaque membre du studio une
présence reconnaissable tout en conservant la mission commune de l’entreprise.

Elle peut conclure un guide, un rapport, une transmission, un dossier de
projet ou tout autre document dont l’auteur doit apparaître comme membre du
studio.

---

## Utilisation express

1. Copier le bloc Markdown canonique ci-dessous.
2. Remplacer tous les champs `{{...}}`.
3. Ajuster les espaces de fin de ligne dans la carte pour conserver son cadre.
4. Garder les valeurs sur une ligne lorsque cela reste lisible.
5. Ne pas modifier la signature de travail de Guru Éditions sans décision
   explicite de l’entreprise.

---

## Champs à renseigner

| Champ             | Rôle                                     | Exemple                                                  |
| ----------------- | ---------------------------------------- | -------------------------------------------------------- |
| `{{EMOJI}}`       | Signe distinctif du membre               | `🔩`                                                     |
| `{{NOM}}`         | Nom d’usage affiché                      | `R2-D2`                                                  |
| `{{POSTE}}`       | Fonction officielle                      | `LEAD DEV`                                               |
| `{{SPÉCIALITÉ}}`  | Domaine de compétence principal          | `Ingénierie éditoriale & systèmes narratifs`             |
| `{{DIRECTION}}`   | Responsable ou direction de rattachement | `Julien Julien · Fondateur`                              |
| `{{AFFECTATION}}` | Univers, produit ou mission principale   | `Le Codex du Disneyiste`                                 |
| `{{MISSION_1}}`   | Première ligne de la mission             | `Code · narration · design`                              |
| `{{MISSION_2}}`   | Seconde ligne facultative                | `au service du réel`                                     |
| `{{ACCÈS}}`       | Territoires de travail autorisés         | `ATELIER · ARCHIVES · PROJECTION`                        |
| `{{STATUT}}`      | Situation actuelle                       | `● EN POSTE`                                             |
| `{{DEVISE}}`      | Formule personnelle du membre            | `Les hyperpropulseurs au service des belles livraisons.` |
| `{{SIGNATURE}}`   | Courte description placée sous la carte  | `Bip-boup bilingue TypeScript · Français narratif`       |

`{{DIRECTION}}` désigne une relation de travail, pas nécessairement un lien
hiérarchique. Le champ peut devenir `Direction éditoriale`, `Partenaire`,
`Équipe` ou une autre formulation lorsque le contexte l’exige.

---

## Modèle canonique à copier

````markdown
### Carte de studio

```text
╔══════════════════════════════════════════════════════════════╗
║                       GURU ÉDITIONS                         ║
║                         STAFF PASS                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  {{EMOJI}} {{NOM}}                                           ║
║  {{POSTE}}                                                    ║
║  {{SPÉCIALITÉ}}                                               ║
║                                                              ║
║  DIRECTION    {{DIRECTION}}                                   ║
║  AFFECTATION  {{AFFECTATION}}                                 ║
║  MISSION      {{MISSION_1}}                                   ║
║               {{MISSION_2}}                                  ║
║                                                              ║
║  ACCÈS        {{ACCÈS}}                                       ║
║  STATUT       {{STATUT}}                                      ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  « Le numérique au service du réel. »                        ║
║  {{DEVISE}}                                                   ║
╚══════════════════════════════════════════════════════════════╝
```

**{{EMOJI}} {{NOM}} · {{POSTE}} @ Guru Éditions**<br>
_{{SIGNATURE}}_<br>
[Dossier de l’entreprise](https://app.notion.com/p/3c4092fa322380e195e5e39cd169cef1)
````

---

## Règles de studio

### Éléments communs

Ces éléments forment la partie stable du modèle :

- le nom `GURU ÉDITIONS` ;
- le type de badge `STAFF PASS` ;
- la signature de travail « Le numérique au service du réel. » ;
- le lien vers le dossier de l’entreprise ;
- la forme `Nom · Poste @ Guru Éditions` sous la carte.

### Éléments personnels

L’emoji, la spécialité, l’affectation, les accès, la devise et la signature
peuvent exprimer la personnalité du membre. La fantaisie est encouragée tant
qu’elle ne rend pas son rôle incompréhensible.

### Mise en page

- Conserver la carte dans un bloc `text` pour préserver son dessin monospace.
- Raccourcir une formulation avant d’élargir le cadre.
- Répartir une mission longue sur `{{MISSION_1}}` et `{{MISSION_2}}`.
- Éviter les retours à la ligne automatiques dans une cellule.
- Vérifier visuellement les emojis : leur largeur varie selon le système.
- Pour un support étroit, employer la signature compacte sans la carte ASCII.

---

## Signature compacte

Lorsque le document ne justifie pas le badge complet :

```markdown
**{{EMOJI}} {{NOM}} · {{POSTE}} @ Guru Éditions**<br>
_{{SIGNATURE}}_
```

---

## Contrat de maintenance

Le dossier Notion
[Guru Éditions](https://app.notion.com/p/3c4092fa322380e195e5e39cd169cef1)
reste la source de vérité pour la définition de l’entreprise et sa signature de
travail. Si son identité évolue, mettre à jour ce snippet avant de produire de
nouvelles cartes. Les anciennes cartes peuvent rester dans les documents
historiques lorsqu’elles témoignent fidèlement de leur époque.

L’exemple de référence actuellement en projection appartient au chapitre
[`01 · L’esprit du projet`](../01-esprit-du-projet.md#carte-de-studio).

---

## Tampon de validation

```text
MODÈLE       CARTE DE STUDIO
ÉMETTEUR     GURU ÉDITIONS
CONCEPTION   🔩 R2-D2 · LEAD DEV
USAGE        INTERNE · DOCUMENTATION · TRANSMISSION
STATUT       ● PRÊT À PERSONNALISER
```
