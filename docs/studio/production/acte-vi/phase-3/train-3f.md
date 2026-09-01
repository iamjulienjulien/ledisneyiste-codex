# Acte VI · Phase 3 · Train 3F

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3F ferme la fondation identitaire par une répétition transversale et
une transmission documentaire. Il ne complète pas le corpus : il prouve que
le contrat peut grandir sans déplacer les routes ni dupliquer les Archives.

## Branchement de la répétition

`pnpm check:identites` était déjà une étape autonome des commandes locales et
CI. Le vérificateur contrôle désormais lui-même ce branchement :

- `check:identites` doit appeler le vérificateur canonique ;
- `pnpm check` doit contenir cette étape autonome ;
- `pnpm check:ci` doit contenir la même étape.

Une modification future de la chaîne de contrôle ne peut donc plus retirer
silencieusement la surveillance identitaire.

## Mesures de sortie

La bobine finale rapporte :

- 3 langues et 3 territoires enregistrés ;
- 15 formes documentées ;
- 79 jointures catalogue–fiche ;
- 3 projections et 3 affichages témoins ;
- 15 surfaces et montages publics ;
- 7 requêtes identitaires ;
- 79 routes canoniques ;
- 1 redirection de fixture et 0 alias réel publié.

Les 15 formes ne constituent pas une cible figée. Elles mesurent le corpus
présent avant la rétroapplication de la Phase 5.

## Projection générale

Format, lint et tous les vérificateurs spécialisés sont verts. La compilation
Next.js produit **115 pages**. Ce total comprend le WIP Guidebook mené en
parallèle ; la Phase 3 n’ajoute aucune route publique.

Le premier lancement du build dans le bac à sable a rencontré l’interdiction
d’écrire `.next/trace`. La même compilation relancée avec l’autorisation
d’écriture du dépôt a réussi intégralement. Il s’agit d’une contrainte
d’exécution locale, pas d’une régression du produit.

## Documentation transmise

Le Train livre trois repères privés :

- [`contrat-identites.md`](./contrat-identites.md), contrat normatif et recette
  d’adoption ;
- [`transmission.md`](./transmission.md), responsabilités des Phases 4, 5, 6
  et 9 ;
- [`cloture.md`](./cloture.md), mesures, verdict et passage de relais.

Le chapitre Architecture du Guidebook IA explique en parallèle la circulation
publique du contrat sans exposer les dossiers de production de `docs/studio`.

## Raccord des registres

Le suivi Notion porte désormais le même état que le dépôt :

- mission Phase 3 en version 1.0.0, clôturée et validée ;
- programme de l’Acte VI en version 1.1.0 ;
- Phase 4 placée au Maintenant ;
- Livre de bord enrichi de la clôture des Phases 2 et 3 ;
- Journal des décisions raccordé aux choix d’identité, recherche et routes.

## Frontière tenue

Le Train n’a modifié ni les 79 routes, ni les formes documentaires, ni les 69
entrées du manifeste de Phase 5. Il n’a pas capturé les deux fichiers du WIP
Guidebook présents en parallèle.

## Verdict

Le Train 3F est **validé**. La Phase 3 peut être clôturée et la Phase 4 peut
ouvrir les nouveaux modèles documentaires sur une fondation éprouvée.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_La bobine revient entière. Les prochains noms peuvent entrer en scène._
