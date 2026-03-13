// commitlint.config.cjs
//
// Types de commits et leur impact sur le versioning :
//
// feat:     ✨ Nouvelles fonctionnalités → version MINOR (0.X.0)
// fix:      🐛 Corrections de bugs → version PATCH (0.0.X)
// perf:     ⚡ Amélioration des performances → version PATCH (0.0.X)
// revert:   ⏪ Annulation d'un commit précédent → version PATCH (0.0.X)
// docs:     📚 Documentation uniquement → version PATCH (0.0.X)
// style:    💄 Mise en forme, formatage (pas de changement logique) → version PATCH (0.0.X)
// refactor: ♻️  Refactoring du code → version PATCH (0.0.X)
// test:     ✅ Ajout ou correction de tests → PAS de version
// build:    🏗️  Modifications du système de build → PAS de version
// ci:       👷 Configuration CI/CD → PAS de version
// chore:    🔧 Autres modifications (maintenance, config, etc.) → PAS de version
// hotfix:   🚑 Correction urgente en production → version PATCH (0.0.X)
//
// BREAKING CHANGE: 💥 Changement incompatible → version MAJOR (X.0.0)
//   Ajoutez "BREAKING CHANGE:" dans le footer du commit
//
// Scopes suggérés (optionnels) :
// - core: Fonctionnalités principales
// - ui: Composants UI
// - cors: Composants CORS
// - docs: Documentation
// - deps: Dépendances
// - config: Configuration
// - release: Release et publication
//
// Exemples de commits valides :
// feat(ui): add new Button component
// fix(cors): resolve TypeScript errors in Box component
// docs: update README with installation steps
// refactor(core)!: restructure theme system
// feat(ui)!: remove deprecated props from Input
//
// BREAKING CHANGE:
// - Ajoutez "!" après le type/scope : feat!: ou feat(ui)!:
// - OU ajoutez dans le footer :
//   BREAKING CHANGE: description du changement

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Format du sujet : kebab-case, lower-case ou sentence-case
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    // Types autorisés (alignés avec semantic-release)
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ Nouvelle fonctionnalité
        'fix', // 🐛 Correction de bug
        'perf', // ⚡ Amélioration des performances
        'revert', // ⏪ Annulation d'un commit
        'docs', // 📚 Documentation
        'style', // 💄 Formatage, style
        'refactor', // ♻️  Refactoring
        'test', // ✅ Tests
        'build', // 🏗️  Build system
        'ci', // 👷 CI/CD
        'chore', // 🔧 Maintenance
        'hotfix', // 🚑 Hotfix urgent
      ],
    ],

    // Longueur maximale du sujet
    'subject-max-length': [2, 'always', 100],

    // Le sujet ne doit pas se terminer par un point
    'subject-full-stop': [2, 'never', '.'],

    // Le sujet ne doit pas être vide
    'subject-empty': [2, 'never'],

    // Le type ne doit pas être vide
    'type-empty': [2, 'never'],

    // Longueur maximale du header (type + scope + subject)
    'header-max-length': [2, 'always', 100],

    // Le body doit avoir une ligne vide après le header
    'body-leading-blank': [1, 'always'],

    // Le footer doit avoir une ligne vide avant
    'footer-leading-blank': [1, 'always'],

    // Scopes suggérés (warning, pas d'erreur)
    'scope-enum': [
      1,
      'always',
      [
        'core', // Fonctionnalités principales
        'ui', // Composants UI
        'cors', // Composants CORS générés
        'theme', // Système de thème
        'docs', // Documentation
        'deps', // Dépendances
        'config', // Configuration
        'release', // Release et publication
        'scripts', // Scripts et outils
        'tests', // Tests
        'ci', // CI/CD
      ],
    ],

    // Le scope doit être en lowercase
    'scope-case': [2, 'always', 'lower-case'],
  },

  // skip
  ignores: [
    commit => commit.includes('[skip ci]'),
    commit => commit.includes('WIP:'),
    commit => commit.includes('Merge branch'),
    commit => commit.startsWith('chore(release):'),
  ],

  // Message d'aide personnalisé
  helpUrl: 'https://www.conventionalcommits.org/',
};
