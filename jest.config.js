const expoPreset = require('jest-expo/jest-preset');

/**
 * Jest configuration for the Ludora mobile app.
 *
 * We start from the official `jest-expo` preset (which wires up the React Native
 * transform, the module path aliases from tsconfig, and the RN test environment)
 * and only tweak `transformIgnorePatterns` so that `ky` (shipped as ESM) is
 * transpiled by Babel instead of being treated as a CommonJS module.
 */
module.exports = {
  ...expoPreset,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|ky))',
    '/node_modules/react-native-reanimated/plugin/',
  ],
};
