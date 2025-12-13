import { execSync } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const API_KEY = process.env.TOLGEE_API_KEY;
const API_URL = process.env.TOLGEE_API_URL;
if (!API_KEY || !API_URL) {
  console.error('Error: TOLGEE_API_KEY or TOLGEE_API_URL is not set');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '../../locales');
const ZIP_FILE = path.join(OUTPUT_DIR, 'translations.zip');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
  console.log('Downloading translations from Tolgee...');
  execSync(
    `curl "${API_URL}/v2/projects/export?format=JSON&structureDelimiter=&supportArrays=false" \
     -H "X-API-Key: ${API_KEY}" \
     --output ${ZIP_FILE}`,
    { stdio: 'inherit' },
  );

  console.log('\nExtracting files...');
  execSync(`unzip -o ${ZIP_FILE} -d ${OUTPUT_DIR}`, { stdio: 'inherit' });

  fs.unlinkSync(ZIP_FILE);
  console.log('\nTranslations updated successfully in:', OUTPUT_DIR);
} catch (error) {
  console.error('\nError:', error.message);
  process.exit(1);
}
