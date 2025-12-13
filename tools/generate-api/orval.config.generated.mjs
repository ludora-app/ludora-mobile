import ky from 'ky';

export default async function getOrvalOperations() {
  const SWAGGER_URL = `${process.env.EXPO_PUBLIC_DEV_API_URL}/swagger-json`;

  const PAGINATION_KEYWORDS = ['/collection'];

  const basicAuth = Buffer.from(`${process.env.SWAGGER_USER}:${process.env.SWAGGER_PASSWORD}`).toString('base64');

  const res = await ky.get(SWAGGER_URL, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
  });
  const swagger = await res.json();

  const operations = {};

  for (const path in swagger.paths) {
    for (const method in swagger.paths[path]) {
      const operation = swagger.paths[path][method];
      const operationId = operation.operationId;

      if (operationId) {
        console.log(`📍 Found operation: "${operationId}" at path "${path}"`);
        if (PAGINATION_KEYWORDS.some(keyword => path.includes(keyword))) {
          console.log(`🔁 Route "${operationId}" marked as infinite query`);
          operations[operationId] = {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'cursor',
            },
          };
        }
      }
    }
  }

  return operations;
}
