// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['airbnb', 'expo', 'prettier'],
  ignorePatterns: ['/dist/*', '/node_modules/*', '/src/api/generated/*', '/android/*', '/ios/*', 'tools/*'],
  overrides: [
    {
      files: ['src/lib/dayjs.ts'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
  plugins: ['prettier', 'perfectionist', 'unused-imports'],
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
};
