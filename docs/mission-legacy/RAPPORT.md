# Compte-rendu de mission — Dev Legacy (maintenance & modernisation)

> Projet : **Ludora Mobile** (React Native / Expo) — dépôt `ludora-app/ludora-mobile`
> Branche de la mission : `chore/dev-legacy-maintenance`
> Date : 02/06/2026

---

## 0. Page de garde

| | |
|---|---|
| **Projet** | Ludora Mobile (frontend React Native / Expo SDK 55) |
| **Dépôt** | https://github.com/ludora-app/ludora-mobile |
| **Branche mission** | `chore/dev-legacy-maintenance` |
| **PR** | _(à ouvrir — voir §7)_ |
| **Équipe / rôles** | _(à compléter : qui a fait C1 / C2 / C3)_ |

---

## 1. Reprise en main

- **Stack** : Expo SDK 55, React Native 0.83, React 19, gestionnaire de paquets **Bun**, TanStack Query v5, Zod, Zustand, client HTTP **ky**, API typée générée via Orval.
- **Temps pour faire tourner le projet** : `bun install` (~2 s, dépendances déjà résolues). Le `bun start` réel nécessite Vault (`bun inject:env`) pour injecter les secrets — non requis pour la mission de maintenance (audit, tests, type-check, lint tournent sans secrets).
- **Frictions constatées au retour** :
  - **Aucun test automatisé n'existait** (aucun runner installé). Impossible de "figer le comportement" sans d'abord poser une infrastructure de test → première tâche de la mission.
  - **21 vulnérabilités** remontées par `bun audit` (dont 1 critique), accumulées via les dépendances transitives.
  - Plusieurs dépendances en retard de version majeure (`ky 1→2`, `eslint 8 EOL`, `async-storage 2→3`, etc.).
  - `tsconfig.json` contient quelques entrées `include` douteuses (fautes de frappe : `.tsw`, `.txs`, `geolocalisation.hookts`) — bruit hérité, non bloquant.

> Preuve : le projet démarre / installe — `docs/mission-legacy/before/build-lint.txt`.

---

## 2. Tableau de bord — AVANT

| Indicateur | Avant |
|---|---|
| **Vulnérabilités (`bun audit`)** | **21** — 1 critique, 10 high, 10 moderate |
| **Dépendances obsolètes (`bun outdated`)** | ~85 paquets en retard (dont majeures : `ky 1→2`, `eslint 8→10` EOL, `async-storage 2→3`, `gesture-handler 2→3`, `@legendapp/list 2→3`, `typescript 5→6`, `expo 55→56`) |
| **Build (`tsc --noEmit`)** | ✅ OK |
| **Lint (`eslint .`)** | ✅ OK |
| **Tests / couverture** | ❌ **Aucun test, aucun runner installé** |

> Preuves : `docs/mission-legacy/before/audit.txt`, `docs/mission-legacy/before/outdated.txt`, `docs/mission-legacy/before/build-lint.txt`.

**Vulnérabilité critique** : `protobufjs` (Arbitrary code execution — GHSA-xq3m-2v4x-88gg), tirée par `@react-native-firebase` → `firebase` → `@grpc/proto-loader`.

---

## 3. Fiche de cadrage

| Chantier | Détail | « Fait » = quand… |
|---|---|---|
| **C1 — Mise à jour** | **`ky` 1.14.3 → 2.0.2** (majeure, breaking changes) sur la couche réseau (`src/api/api.instance.ts`, `src/api/orval.instance.ts`). + sécurisation : overrides des transitives vulnérables (`protobufjs`, `xmldom`, `ws`, `postcss`, `fast-uri`, `ip-address`). **Rollback** documenté (§4). | Filet de tests vert avant ET après ; `bun audit` réduit ; lint + type-check verts. ✅ **FAIT** |
| **C2 — Correctif** | _(à définir — bug à reproduire → cause racine → fix → test de non-régression)_ | _En attente_ |
| **C3 — Évolutif** | _(à définir — petite fonctionnalité testée)_ | _En attente_ |

---

## 4. C1 — Mise à jour & adaptation

### 4.1 Cible & justification

`ky` est le **client HTTP central** de l'app : toutes les requêtes vers l'API backend passent par `kyApi` (`src/api/api.instance.ts`), consommé par l'instance Orval (`src/api/orval.instance.ts`). C'est une dépendance **directe**, au **périmètre maîtrisé** et **testable** — candidate idéale pour une montée de version majeure « bien digérée » plutôt qu'un upgrade risqué de tout le SDK Expo (qui toucherait au code natif).

`ky 1.14.3 → 2.0.2` est une **version majeure avec breaking changes**.

### 4.2 Le filet AVANT de toucher (non-régression)

Avant tout changement, mise en place de l'infrastructure de test (`jest-expo`) + un fichier de test qui **fige le comportement observable** de `kyApi` :

- injection du header `Authorization: Bearer <token>` depuis `SecureStore` ;
- sur **401**, refresh transparent du token puis **rejeu** de la requête ;
- sur **401 sans refresh token**, **déconnexion** de l'utilisateur.

Fichier : `src/api/api.instance.test.ts` (4 tests). **Verts sur ky v1** (commit `b95c726`).

### 4.3 Breaking changes rencontrés (guide de migration officiel)

Source : [ky v2.0.0 release notes & migration guide](https://github.com/sindresorhus/ky/releases/tag/v2.0.0).

Au lancement des tests sur ky v2, échec immédiat et explicite :

```
The `prefixUrl` option has been renamed `prefix` in v2 ...
```

Trois breaking changes touchaient réellement notre code :

| Breaking change (changelog) | Impact dans le code | Adaptation |
|---|---|---|
| **`prefixUrl` renommé `prefix`** | `api.instance.ts` configurait `prefixUrl: getApiUrl()` | → `prefix: getApiUrl()` |
| **Signatures de hooks unifiées** : tous les hooks reçoivent désormais un seul objet d'état `{ request, options, response, ... }` | `beforeRequest: [async request => …]` et `afterResponse: [async (request, _options, response) => …]` | → `async ({ request }) => …` et `async ({ request, response }) => …` |
| **Corps d'erreur auto-consommé** : `error.response.json()` ne fonctionne plus ; le corps pré-parsé est exposé sur `error.data` | `orval.instance.ts` faisait `await error.response.json()` dans le `catch` HTTPError | → `error.data` (+ ajustement de type : `statusCode` rendu optionnel) |

Points vérifiés **sans impact** : aucun usage de `searchParams` (les query strings sont construites à la main), les appels vers des API externes (Google Places, Twenty CRM) utilisent des URLs absolues (non concernées par `prefix`), `204` déjà géré explicitement avant `.json()`.

> Diff : commit `1c6b73b` — `src/api/api.instance.ts` (+ `orval.instance.ts`).

### 4.4 Compatibilité runtime (Hermes)

`ky` v2 déclare `engines.node >= 22`, mais il s'agit d'une contrainte de **publication** : le paquet a **0 dépendance**, est 100 % ESM, et n'utilise **aucun built-in Node** — uniquement les primitives Fetch (`fetch`/`Request`/`Response`/`Headers`/`AbortController`) que React Native/Hermes polyfillent. Risque runtime faible.
**À valider sur device/simulateur** lors du prochain build (hors périmètre de cette session, qui nécessite Vault + simulateur).

### 4.5 Gain sécurité (overrides ciblés)

Profitant du chantier, sécurisation des transitives via `overrides` Bun — **en restant dans les ranges compatibles** avec les consommateurs (règle « ne pas aggraver ») :

| Paquet | Override | Corrige |
|---|---|---|
| `protobufjs` | `^7.5.9` | **la critique RCE** + plusieurs high (reste dans `^7` exigé par `@grpc/proto-loader` → Firebase intact) |
| `@xmldom/xmldom` | `^0.8.13` | 4 high (DoS / XML injection) |
| `ws` | `^8.21.0` | moderate |
| `postcss` | `^8.5.15` | moderate (XSS) |
| `fast-uri` | `^3.1.2` | 2 high |
| `ip-address` | `^10.2.0` | moderate |

**Volontairement NON overridés** (jugement « blast radius ») :
- `uuid` → utilisé seulement par l'outillage prebuild Xcode (build-time), forcer `uuid@11` casserait l'API legacy de `xcode` pour une moderate.
- `brace-expansion@5` → testé puis **retiré** : casse le `minimatch` legacy de `eslint-plugin-import` (`expand is not a function`). Cf. journal.

### 4.6 Plan de rollback (C1)

L'upgrade est **entièrement réversible** car isolé dans des commits atomiques :

- **Rollback complet (option A — recommandée en prod)** : `git revert ef5d6a7 1c6b73b` (annule overrides + upgrade ky, garde le filet de tests), puis `bun install`. Le `bun.lock` est versionné → réinstallation déterministe de `ky@1.14.3`.
- **Rollback ciblé ky uniquement** : `git revert 1c6b73b` (les overrides sécurité restent en place).
- **Rollback ultra-rapide sans Git** : repasser `ky` à `1.14.3` dans `package.json`, restaurer `prefixUrl`/anciennes signatures de hooks/`error.response.json()` (3 fichiers), `bun install`.
- **Filet de sécurité** : les 4 tests de `api.instance.test.ts` détectent immédiatement toute régression de comportement, dans les deux sens.

> Preuve tests au vert après upgrade : `docs/mission-legacy/after/build-lint.txt`.

---

## 5. C2 — Correctif

_À compléter : symptôme → reproduction → cause racine → correction → test de non-régression._

---

## 6. C3 — Évolutif

_À compléter : besoin → implémentation → test._

---

## 7. Tableau de bord — APRÈS + hygiène Git

| Indicateur | Avant | Après |
|---|---|---|
| **Vulnérabilités (`bun audit`)** | 21 (1 critical, 10 high, 10 moderate) | **1 (1 moderate)** — critique & tous les high éliminés |
| **Dépendances obsolètes** | ~85 | ~84 (`ky` à jour ; le reste hors périmètre maîtrisé) |
| **Build (`tsc`)** | ✅ OK | ✅ OK |
| **Lint** | ✅ OK | ✅ OK |
| **Tests** | ❌ 0 (aucun runner) | ✅ **4/4 verts** (jest-expo installé) |

> Preuves : `docs/mission-legacy/after/audit.txt`, `docs/mission-legacy/after/outdated.txt`, `docs/mission-legacy/after/build-lint.txt`.

**Réduction sécurité : -95 % de vulnérabilités (21 → 1), 0 critique, 0 high.**

### Hygiène Git — historique de la branche

```
ef5d6a7 chore(security): pin vulnerable transitive deps via overrides
1c6b73b chore(deps): upgrade ky 1.14.3 -> 2.0.2 and adapt to breaking changes
b95c726 test: add jest-expo harness and kyApi behavioural safety net
```

- Branche dédiée `chore/dev-legacy-maintenance`.
- Commits **atomiques** : 1 commit = 1 intention (filet / upgrade / sécurité), périmètres non mélangés.
- Messages en **Conventional Commits** (validés par commitlint), hooks Husky (lint + type-check) passés à chaque commit.

---

## 8. Bilan & rétro legacy

**Ce que la dette a coûté :**
- L'absence de tests rendait toute modification « à l'aveugle » : il a fallu **construire le filet avant de pouvoir prouver** quoi que ce soit. Sur un client HTTP central (auth, refresh token), c'est un risque majeur.
- Les vulnérabilités s'étaient accumulées **silencieusement via les transitives** (Firebase, outillage Expo) — invisibles sans `bun audit` régulier.
- Un override « évident » (`brace-expansion@5`) a **cassé le lint** : preuve qu'on ne force pas une version sans vérifier le blast radius.

**Ce qu'on changerait (futur-soi) :**
- **CI** : ajouter `bun audit` (seuil high/critical) + `bun test` au pipeline pour ne plus accumuler.
- **Tests** : étendre le filet (au-delà du client HTTP) ; viser une couverture sur la logique métier sensible.
- **Mises à jour régulières** : Dependabot/renovate par petits lots, plutôt qu'un grand rattrapage.
- **Doc** : documenter le besoin de Vault pour le `start`, nettoyer les `include` erronés du `tsconfig`.

---

## Annexe — Journal de bord

Voir `docs/mission-legacy/JOURNAL.md`.
