# 🧼 Ludora – Application Mobile (Frontend) ⚡

Bienvenue sur le dépôt du frontend de **Ludora**, une application mobile moderne construite avec **React Native** et **Expo**. Ce projet est optimisé pour la performance, la maintenabilité et une automatisation complète du cycle de release.

---

## 🛠 Tech Stack

- **Framework** : [Expo SDK 54+](https://expo.dev) & [React Native](https://reactnative.dev)
- **Gestionnaire de paquets** : [Bun](https://bun.sh) (Ultra-rapide)
- **Navigation** : [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Style** : [NativeWind v4 / Tailwind CSS](https://www.nativewind.dev/) & Uniwind
- **Data Fetching** : [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Validation / Types** : [Zod](https://zod.dev) & TypeScript
- **State Management** : [Zustand](https://github.com/pmndrs/zustand)
- **Génération API** : [Orval](https://orval.dev/) (Client API typé généré depuis Swagger)
- **Secrets & Env** : [HashiCorp Vault](https://www.vaultproject.io/) avec `envconsul`

---

## ⚙️ Prérequis

- **Bun** : Installé sur votre machine.
- **Expo CLI** : `bun add -g expo-cli`.
- **Vault CLI & envconsul** : Pour la gestion des secrets en local.
- **EAS CLI** : Pour lancer des builds sur l'infrastructure Expo.

---

## 🚀 Installation & Lancement

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/ludora-app/ludora-mobile.git
   cd ludora-mobile
   ```

2. **Installer les dépendances** :

   ```bash
   bun install
   ```

3. **Lancement du serveur de développement** :
   Le script de lancement injecte automatiquement les variables d'environnement depuis Vault.
   ```bash
   bun start
   ```

---

## 📡 Génération de l'API

L'API est générée automatiquement à partir de la documentation Swagger du backend.

- **En local** : `bun run generate:api` (Utilise Vault pour l'auth).
- **Dans la CI** : `bun run generate:api:ci` (Utilisé par GitHub Actions).

Les fichiers générés se trouvent dans `src/api/generated/`. **Ne modifiez jamais ces fichiers manuellement.**

---

## 📝 Standards de Développement (Conventional Commits)

Ce projet utilise [commitlint](https://commitlint.js.org/) pour imposer des messages de commit standardisés.

**Format** : `type(scope): description`

- `feat` : Nouvelle fonctionnalité (ex: `feat(ui): add CustomButton`)
- `fix` : Correction de bug (ex: `fix(api): handle 404 on profile`)
- `docs` : Documentation uniquement
- `style` : Changements esthétiques (pas de logique)
- `refactor` : Modification du code sans changement de comportement
- `chore` : Maintenance, mise à jour de dépendances

**Hooks Git** : [Husky](https://typicode.github.io/husky/) vérifie automatiquement votre code (`lint` + `type check`) et votre message de commit avant chaque validation.

---

## 🚀 CI/CD & Releases Automatisées

Le projet utilise **Semantic Release** pour automatiser la gestion des versions et les builds.

### Pipeline GitHub Actions :

À chaque push sur `main`, `staging` ou `develop` :

1. **Génération API** : Les hooks React Query sont régénérés avec Vault.
2. **Validation** : Linting et vérification TypeScript (`bun run check:all`).
3. **Release** : Semantic Release calcule la nouvelle version, crée un Tag Git, un Changelog et met à jour `app.json`.
4. **Build Expo (EAS)** :
   - Sur **`main`** : Build Android Production (`build:android:prod`) envoyé sur Expo.
   - Sur **`staging`** : Build Android Preview (`build:android:preview`) envoyé sur Expo.

### Synchronisation des branches :

Après une release sur `main`, les branches `staging` et `develop` sont automatiquement synchronisées par la CI (force push) pour garantir une base de code identique partout.

---

## 🏗 Structure du Projet

```text
├── assets/             # Images, polices et ressources statiques
├── src/                # Cœur de l'application
│   ├── api/            # Clients API générés et config Orval
│   ├── app/            # Pages et Routing (Expo Router)
│   ├── components/     # Composants UI réutilisables
│   ├── hooks/          # Custom Hooks
│   ├── stores/         # Gestion d'état (Zustand)
│   ├── tools/          # Utilitaires et scripts d'injection Vault
│   └── types/          # Types TypeScript globaux
├── .github/workflows/  # Pipelines CI/CD
├── app.json            # Configuration Expo
└── package.json        # Dépendances et scripts
```

---

## 🧞‍♂️ Auteur

Développé avec ❤️ par l'équipe **Ludora**.

---

## 📄 Licence

MIT — Libre d'utilisation et de modification.
