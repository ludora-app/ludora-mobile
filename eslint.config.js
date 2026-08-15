// https://docs.expo.dev/guides/using-eslint/
const { FlatCompat } = require('@eslint/eslintrc');
const prettier = require('eslint-plugin-prettier');
const expoConfig = require('eslint-config-expo/flat');
const perfectionist = require('eslint-plugin-perfectionist');
const prettierConfig = require('eslint-config-prettier/flat');
const unusedImports = require('eslint-plugin-unused-imports');
const { defineConfig, globalIgnores } = require('eslint/config');

const compat = new FlatCompat({ baseDirectory: __dirname });

// eslint-config-expo already registers these, and ESLint rejects a second definition.
const PLUGINS_OWNED_BY_EXPO = ['@typescript-eslint', 'import', 'react', 'react-hooks'];

const airbnbConfig = compat.extends('airbnb').map(config => ({
  ...config,
  plugins: Object.fromEntries(
    Object.entries(config.plugins ?? {}).filter(([name]) => !PLUGINS_OWNED_BY_EXPO.includes(name)),
  ),
}));

module.exports = defineConfig([
  globalIgnores(['dist/*', 'node_modules/*', 'src/api/generated/*', 'android/*', 'ios/*', 'tools/*']),
  // Same order as the legacy `extends: ['airbnb', 'expo', 'prettier']`: the Expo
  // TypeScript overrides must win over airbnb's core rules.
  ...airbnbConfig,
  expoConfig,
  prettierConfig,
  {
    plugins: {
      perfectionist,
      prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          json: 'always',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/prefer-default-export': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              message: 'Import dayjs from @/lib/dayjs instead to ensure all plugins are loaded.',
              name: 'dayjs',
            },
          ],
        },
      ],
      'perfectionist/sort-imports': ['error'],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
        },
      ],
      // 'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',

      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [
        'error',
        {
          functions: 'ignore',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      perfectionist: {
        partitionByComment: true,
        type: 'line-length',
      },
    },
  },
  {
    files: ['src/lib/dayjs.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
]);
