import ky from 'ky';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getApiUrl } from './api-url.mjs';

const SWAGGER_URL = `${getApiUrl()}/swagger-json`;
const env = process.env.EXPO_PUBLIC_API_ENV || 'production';

(async () => {
  try {
    let swagger;
    let localFile = process.env.SWAGGER_FILE;

    // Si on n'est pas en localhost et qu'on n'a pas de fichier local déjà fourni (via CI par exemple)
    // on essaye de télécharger l'artefact GitHub correspondant à l'env
    if (env !== 'localhost' && !localFile) {
      console.log(`🌐 Env is "${env}", trying to fetch artifact from GitHub...`);

      let branchName = 'main';
      // preview tape sur l'API dev (cf. api-url.mjs)
      if (env === 'development' || env === 'staging' || env === 'preview') branchName = 'dev';

      try {
        const tempDir = path.resolve(process.cwd(), '.artifacts');
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        fs.mkdirSync(tempDir);

        console.log(`📥 Using GH CLI to find latest run on branch "${branchName}"...`);

        const repo = 'ludora-app/ludora-back';
        const ghEnv = { ...process.env, GH_TOKEN: process.env.GH_TOKEN || process.env.GITHUB_TOKEN };

        const artifactName = `swagger-${branchName}`;

        // 1. Récupérer le run du dernier artefact swagger-<branche> non expiré
        // (le dernier run de la branche peut être un pull_request, qui ne génère pas de swagger)
        const runId = execSync(
          `gh api "repos/${repo}/actions/artifacts?name=${artifactName}&per_page=1" --jq ".artifacts[0] | select(.expired == false) | .workflow_run.id"`,
          { env: ghEnv },
        )
          .toString()
          .trim();

        if (!runId) {
          throw new Error(`No ${artifactName} artifact found`);
        }

        console.log(`📡 Downloading ${artifactName} from run ID: ${runId}`);

        // 2. Télécharger l'artefact du run trouvé
        execSync(`gh run download ${runId} --repo ${repo} --name "${artifactName}" --dir "${tempDir}"`, {
          stdio: 'inherit',
          env: ghEnv,
        });

        const files = fs.readdirSync(tempDir, { recursive: true });
        // swagger-public.json = swagger de l'app (swagger-admin.json = dashboard admin)
        const swaggerPath = files.find(f => f.endsWith('swagger-public.json'));

        if (swaggerPath) {
          localFile = path.resolve(tempDir, swaggerPath);
          console.log('✅ Found artifact at:', localFile);
        }
      } catch (err) {
        console.warn('⚠️ Could not fetch from GitHub (gh cli missing or error). Falling back to HTTP download.');
      }
    }

    if (localFile && fs.existsSync(localFile)) {
      console.log('📄 Using local Swagger file:', localFile);
      const fileContent = fs.readFileSync(localFile, 'utf8');
      swagger = JSON.parse(fileContent);
    } else {
      console.log('📥 Downloading Swagger from:', SWAGGER_URL);
      const res = await ky.get(SWAGGER_URL);
      swagger = await res.json();
    }

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
