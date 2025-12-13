const operationsCache = require('./tools/generate-api/orval.operations.json');

const generateOperations = () => {
  if (Object.keys(operationsCache).length === 0) {
    throw new Error('You must pre-generate the operations before running Orval. Run: bun run generate:orval-config');
  }
  return operationsCache;
};

// orval.config.js
module.exports = {
  backend: {
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
    input: {
      target: './tools/generate-api/swagger.json',
    },
    output: {
      client: 'react-query',
      fileExtension: '.api.ts',
      mode: 'tags-split',
      override: {
        mutationOptions: {
          options: {
            onSuccess: {
              invalidate: ['entity'],
              notification: 'success',
            },
          },
        },
        mutator: {
          name: 'customInstance',
          path: './src/api/orval.instance.ts',
        },
        operations: generateOperations(),
      },
      schemas: 'src/api/generated/model',
      target: 'src/api/generated/api',
    },
  },
  // 2. Config pour Zod (seulement les schémas, pas les hooks)
  // backendZod: {
  //   input: {
  //     target: process.env.EXPO_PUBLIC_SWAGGER_URL,
  //   },
  //   output: {
  //     mode: 'tags-split',
  //     target: 'src/api/generated/api',
  //     client: 'zod',
  //     fileExtension: '.zod.ts',
  //   },
  // },
};
