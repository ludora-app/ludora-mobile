# 🧼 Ludora – React Native + Expo ⚡

// explication

---

## 🚀 Fonctionnalités incluses

✅ [Bun](https://bun.sh) — gestionnaire de paquets ultra-rapide  
✅ [Expo](https://expo.dev) — framework mobile cross-platform  
✅ [TypeScript](https://www.typescriptlang.org) — typage fort pour plus de robustesse  
✅ [Expo Router](https://expo.github.io/router/) — navigation type "Next.js" dans Expo  
✅ [Tailwind CSS via NativeWind](https://www.nativewind.dev/) — style rapide et réactif  
✅ [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) — pour des animations fluides  
✅ Structure de projet claire (dossier `src/`)  
✅ Gestion d'état avec [Zustand](https://zustand-demo.pmnd.rs/) (léger et efficace)  
✅ ESLint + Prettier préconfigurés

---

## ⚙️ Prérequis

### 1. Installer Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

> 🔁 Redémarre ton terminal si la commande `bun` n’est pas reconnue.

### 2. Installer Expo CLI

```bash
bun add -g expo-cli
```

---

# 📦 Installation du starter

## 🥪 Cloner le projet

```bash
git clone https://github.com/amir-398/react-native-starter-pack.git
```

```bash
cd react-native-starter-pack
```

## 🥪 Installation des nodes modules

```bash
bun install
```

## 🥪 Lancer sur Android

```bash
bun android
```

> 📱 Assure-toi que ton émulateur ou ton device est connecté via `adb`.

---

## 🥪 Lancer sur Ios

```bash
bun ios
```

> 📱 Assure-toi que ton émulateur ou ton device est connecté via `adb`.

## 🧱 Structure du projet

```
my-app/
├── .expo/                     ← fichiers liés à Expo
├── android/                   ← projet Android natif
├── assets/                    ← images, polices, etc.
├── node_modules/              ← dépendances
├── src/                       ← cœur de l'application
│   ├── api/                   ← requêtes API
│   ├── app/                   ← pages (Expo Router)
│   ├── components/            ← composants UI réutilisables
│   ├── configs/               ← fichiers de config globaux
│   ├── constants/             ← constantes globales
│   ├── features/              ← features modulaire (domain-driven)
│   ├── hooks/                 ← custom hooks
│   ├── providers/             ← context providers globaux
│   ├── services/              ← logique métier / intégration externe
│   ├── stores/                ← state management (Zustand)
│   ├── styles/                ← styles globaux / thématiques
│   ├── types/                 ← types TypeScript partagés
│   └── tools/                 ← helpers, outils, lib externes
├── .env.sample                ← exemple de fichier d'environnement
├── .gitignore                 ← fichiers ignorés par Git
├── app.json                   ← config Expo
├── babel.config.js            ← config Babel (avec Reanimated)
├── bun.lock                   ← lockfile Bun
├── index.tsx                  ← point d'entrée de l'app
├── metro.config.js            ← config Metro bundler
├── nativewind-env.d.ts        ← types pour NativeWind
├── package.json               ← dépendances et scripts
├── tailwind.config.js         ← config Tailwind CSS / NativeWind
└── tsconfig.json              ← config TypeScript
```

---

## 🎨 Tailwind CSS via NativeWind

Déjà préconfiguré avec `nativewind`.  
Tu peux directement utiliser les classes tailwind dans tes composants React Native :

```tsx
<Text className="text-xl font-bold text-blue-500">Hello world</Text>
```

---

## 🔀 Navigation avec Expo Router

Ce projet utilise [Expo Router](https://expo.github.io/router/) pour une navigation **type Next.js** :

- `app/index.tsx` → `/`
- `app/about.tsx` → `/about`
- `app/(auth)/login.tsx` → `/login` (layouts dynamiques)

---

## 🦄 Scripts utiles

| Commande             | Description             |
| -------------------- | ----------------------- |
| `bun start`          | Démarre le serveur Expo |
| `bun android`        | Lance l'app sur Android |
| `bun ios`            | Lance l'app sur ios     |
| `bun generate-icons` | Générer les icones      |
| `bun doctor`         | Vérifier les packages   |
| `bun install:check`  | Corriger les packages   |

---

## 🔐 EAS Build – Fichiers exclus du git

`google-services.json` et `GoogleService-Info.plist` sont dans `.gitignore`. Pour que EAS Build les ait, crée des **secrets de type fichier** sur le projet (une fois par machine ou par compte) :

```bash
# À la racine du projet, avec les fichiers présents localement
eas secret:create --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
eas secret:create --name GOOGLE_SERVICES_PLIST --type file --value ./GoogleService-Info.plist
```

`app.config.js` utilise ces variables : en local tu gardes tes fichiers, sur EAS les chemins injectés sont utilisés.

---

## 🤝 Contribuer

Tu veux améliorer le starter, proposer des features ou corriger un bug ?  
Les PRs sont les bienvenues ! Fork → branche → PR 💙

---

## 🧞‍♂️ Auteur

**Chill Starter** développé par [@hmeberbeche](https://github.com/hmeberbeche)  
Pensé pour aller vite. Codé avec amour 💙

---

## 📄 Licence

MIT — libre à utiliser, modifier, partager 🚀
