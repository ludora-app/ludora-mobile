// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['airbnb', 'expo', 'prettier'],
  ignorePatterns: ['/dist/*', '/node_modules/*', '/src/api/generated/*', '/android/*', '/ios/*', 'tools/*'],
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
