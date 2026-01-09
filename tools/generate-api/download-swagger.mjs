import ky from 'ky';
import fs from 'fs';
import path from 'path';
import { getApiUrl } from './api-url.js';

const SWAGGER_URL = `${getApiUrl()}/swagger-json`;
const basicAuth = Buffer.from(`${process.env.SWAGGER_USER}:${process.env.SWAGGER_PASSWORD}`).toString('base64');

(async () => {
  try {
    console.log('📥 Downloading Swagger from:', SWAGGER_URL);

    const res = await ky.get(SWAGGER_URL, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    });

    const swagger = await res.json();

    // Collecter tous les tags utilisés dans les opérations
    const usedTags = new Set();
    for (const path in swagger.paths) {
      for (const method in swagger.paths[path]) {
        const operation = swagger.paths[path][method];
        if (operation.tags && Array.isArray(operation.tags)) {
          operation.tags.forEach(tag => usedTags.add(tag));
        }
      }
    }

    // S'assurer que tous les tags utilisés sont définis dans la section tags
    if (!swagger.tags) {
      swagger.tags = [];
    }
    const existingTagNames = new Set(swagger.tags.map(t => t.name));
    for (const tagName of usedTags) {
      if (!existingTagNames.has(tagName)) {
        swagger.tags.push({
          name: tagName,
          description: `${tagName} operations`,
        });
      }
    }

    // Sauvegarder le Swagger modifié
    const rootPath = process.cwd();
    const swaggerFile = path.resolve(rootPath, 'tools/generate-api/swagger.json');
    fs.writeFileSync(swaggerFile, JSON.stringify(swagger, null, 2));

    console.log('✅ Swagger downloaded and fixed!');
    console.log(`📁 Saved to: ${swaggerFile}`);
    console.log(`📊 Total tags: ${swagger.tags.length}`);
  } catch (error) {
    console.error('❌ Error downloading Swagger:', error.message);
    process.exit(1);
  }
})();
