# Journal de bord — Dev Legacy (02/06/2026)

Log horodaté de la démarche réelle, impasses comprises.

| Heure | Action |
|---|---|
| **10:20** | Reprise en main. État des lieux : `bun audit` → **21 vulnérabilités (1 critique, 10 high, 10 moderate)** ; `bun outdated` → ~85 paquets en retard. Constat clé : **projet très moderne (Expo 55 / RN 0.83) mais ZÉRO test installé**. |
| **10:24** | Création de la branche dédiée `chore/dev-legacy-maintenance`. Sauvegarde du tableau de bord « avant » (`docs/mission-legacy/before/`). Build (`tsc`) et lint OK. |
| **10:28** | Choix C1 : montée majeure de **`ky` 1.14.3 → 2.0.2** (client HTTP central, périmètre maîtrisé) plutôt qu'Expo 56 (trop risqué, code natif). Lecture du **guide de migration ky v2** : `prefixUrl→prefix`, hooks à objet d'état unique, `error.data` au lieu de `error.response.json()`, `.json()` throw sur corps vide/204, merge `searchParams`. |
| **10:35** | Installation du **filet** : `jest-expo` (SDK 55) + config Jest. Particularité : `ky` est ESM → ajout dans `transformIgnorePatterns` pour qu'il soit transpilé. Setup des globals Fetch pour l'env RN. |
| **10:45** | Écriture de `api.instance.test.ts` (4 tests figeant : header Bearer, refresh+rejeu sur 401, logout sans refresh token). **Verts sur ky v1.** Lint auto-fix (perfectionist) puis commit atomique `b95c726`. |
| **10:52** | `bun add ky@^2` → `ky@2.0.2`. **Lancement du filet → 4 échecs**, message explicite : `The prefixUrl option has been renamed prefix in v2`. Impasse attendue = preuve que le filet capte le breaking change. |
| **10:58** | Adaptation selon le changelog : `api.instance.ts` (`prefixUrl→prefix`, hooks `({request})`/`({request, response})`) + `orval.instance.ts` (`error.response.json()` → `error.data`). |
| **11:03** | `tsc` casse : `statusCode` requis sur `api_error` alors que `error.data` peut l'omettre (avant, `.json()` renvoyait `any`). Correctif de type : `statusCode?` optionnel (consommé uniquement via `?.` et `=== 404`). **Filet de nouveau vert (4/4)**, lint OK. Commit atomique `1c6b73b`. |
| **11:10** | Vérif risque runtime ky v2 : 0 dépendance, ESM pur, aucun built-in Node → compatible Hermes (le `engines node>=22` n'est qu'une contrainte de publication). À valider sur device au prochain build. |
| **11:14** | Sécurisation : ajout d'`overrides` Bun (`xmldom`, `ws`, `postcss`, `fast-uri`, `ip-address`, `brace-expansion@5`). `bun install` → `bun audit` **21 → 11**. |
| **11:18** | **IMPASSE** : `bun lint` plante → `TypeError: ... import/no-extraneous-dependencies: expand is not a function`. Cause racine : `brace-expansion@5` change son export → casse le `minimatch` legacy de `eslint-plugin-import`. → **Retrait de l'override `brace-expansion`** (la moderate sera réglée en mettant à jour l'outillage, pas en forçant). |
| **11:22** | Découverte que `protobufjs` **7.5.6–7.5.9 existent** et entrent dans le range `^7.2.5` de `@grpc/proto-loader` → ajout sûr de l'override `protobufjs ^7.5.9` (corrige la **critique** + highs sans toucher Firebase). |
| **11:25** | `bun install` → `bun audit` **= 1 vulnérabilité (1 moderate)**. Lint OK, `tsc` OK, filet 4/4 vert. Reste `uuid` (build-time Xcode, moderate) **volontairement non touché**. Commit atomique `ef5d6a7`. Sauvegarde tableau « après ». |
| **11:30** | Rédaction du compte-rendu (`RAPPORT.md`) : dashboard avant/après, breaking changes cités, plan de rollback, bilan. C1 terminé ; C2/C3 à cadrer. |
| **11:45** | **C2** — chasse au bug dans la couche `utils`. Repérage de `convertMToKm = Math.round(m/1000)` utilisé tel quel dans `field-card` → un terrain à 400 m s'affiche « 0 km ». |
| **11:50** | Reproduction par test unitaire (`distance.utils.test.ts`) : `convertMToKm(400)` attendu `0.4`, reçu `0` → **rouge**. Cause racine = arrondi au km entier. |
| **11:54** | Correctif contenu : `Math.round(m / 100) / 10` (1 décimale). Test **vert** (3/3), suite complète 7/7. Commit atomique `0140e24`. |
| **12:05** | **C3** — évolution de l'affichage de distance. Découverte que `locales/*.json` sont **générés (Tolgee) et gitignorés** → impossible d'y committer une clé. Choix : `t('common.m', 'm')` (valeur par défaut Tolgee) pour rester committable. |
| **12:12** | Ajout du helper pur `formatDistance` (m sous 1 km / km au-delà) + 3 tests (dont cas limite 999 m → 1 km). Tests verts. |
| **12:18** | Intégration dans `field-card` via `useMemo`. Lint + `tsc` OK, suite complète **10/10**. Commit atomique `b4c819c`. |
