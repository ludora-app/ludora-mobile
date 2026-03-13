import fs from 'node:fs';
import path from 'node:path';
import { emitKeypressEvents } from 'node:readline';
import { execSync } from 'node:child_process';

const ENVIRONMENTS = [
  { id: 'localhost', label: 'localhost' },
  { id: 'development', label: 'development' },
  { id: 'preview', label: 'preview' },
  { id: 'production', label: 'production' },
];

const ENV_FILE_PATH = path.join(process.cwd(), '.env.development');

// Colors for terminal
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

function clearLines(count) {
  for (let i = 0; i < count; i++) {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
  }
}

async function main() {
  // 1. Read current env
  let currentEnv = 'unknown';
  if (fs.existsSync(ENV_FILE_PATH)) {
    const content = fs.readFileSync(ENV_FILE_PATH, 'utf8');
    const match = content.match(/EXPO_PUBLIC_API_ENV=(.*)/);
    if (match) currentEnv = match[1].trim();
  }

  let selectedIndex = ENVIRONMENTS.findIndex(e => e.id === currentEnv);
  if (selectedIndex === -1) selectedIndex = 0;

  const header = `\n${COLORS.bright}${COLORS.magenta}🚀 LUDORA API ENV SWITCHER${COLORS.reset}\n`;
  const subheader = `${COLORS.cyan}Current environment:${COLORS.reset} ${COLORS.bright}${currentEnv}${COLORS.reset}\n\n${COLORS.yellow}Use arrow keys to navigate, Enter to select, Esc to cancel:${COLORS.reset}\n`;

  function render() {
    let output = '';
    ENVIRONMENTS.forEach((env, index) => {
      const isSelected = index === selectedIndex;
      const isCurrent = env.id === currentEnv;

      if (isSelected) {
        output += `${COLORS.green}${COLORS.bright}  ❯ ${env.label}${isCurrent ? ' (current)' : ''}${COLORS.reset}\n`;
      } else {
        output += `${COLORS.dim}    ${env.label}${isCurrent ? ' (current)' : ''}${COLORS.reset}\n`;
      }
    });
    return output;
  }

  process.stdout.write(header + subheader + render());

  emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  return new Promise(resolve => {
    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }

      if (key.name === 'up') {
        selectedIndex = (selectedIndex - 1 + ENVIRONMENTS.length) % ENVIRONMENTS.length;
        clearLines(ENVIRONMENTS.length);
        process.stdout.write(render());
      } else if (key.name === 'down') {
        selectedIndex = (selectedIndex + 1) % ENVIRONMENTS.length;
        clearLines(ENVIRONMENTS.length);
        process.stdout.write(render());
      } else if (key.name === 'return') {
        process.stdin.setRawMode(false);
        const selectedEnv = ENVIRONMENTS[selectedIndex];
        handleSelection(selectedEnv).then(resolve);
      } else if (key.name === 'escape') {
        process.stdin.setRawMode(false);
        console.log(`\n${COLORS.cyan}Cancelled.${COLORS.reset}`);
        process.exit();
      }
    });
  });
}

async function handleSelection(selectedEnv) {
  console.log(`\nUpdating to ${COLORS.bright}${selectedEnv.label}${COLORS.reset}...`);

  if (!fs.existsSync(ENV_FILE_PATH)) {
    fs.writeFileSync(ENV_FILE_PATH, `EXPO_PUBLIC_API_ENV=${selectedEnv.id}\n`, 'utf8');
  } else {
    const content = fs.readFileSync(ENV_FILE_PATH, 'utf8');
    const lines = content.split('\n');
    let found = false;
    const updatedLines = lines.map(line => {
      if (line.trim().startsWith('EXPO_PUBLIC_API_ENV=')) {
        found = true;
        return `EXPO_PUBLIC_API_ENV=${selectedEnv.id}`;
      }
      return line;
    });

    if (!found) {
      updatedLines.push(`EXPO_PUBLIC_API_ENV=${selectedEnv.id}`);
    }

    fs.writeFileSync(ENV_FILE_PATH, updatedLines.join('\n'), 'utf8');
  }

  console.log(`${COLORS.green}✅ .env.development updated successfully!${COLORS.reset}\n`);

  // Simple question for regeneration
  process.stdout.write(`${COLORS.yellow}Regenerate API (bun generate:api)? (y/n): ${COLORS.reset}`);

  return new Promise(resolve => {
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.once('data', data => {
      const answer = data.toString().trim().toLowerCase();
      if (answer === 'y') {
        console.log(`\n${COLORS.cyan}🚀 Regenerating API...${COLORS.reset}`);
        try {
          execSync('pnpm run generate:api', { stdio: 'inherit' });
          console.log(`\n${COLORS.green}✅ API regenerated!${COLORS.reset}`);
        } catch (error) {
          console.error(`\n${COLORS.yellow}❌ Error during API regeneration.${COLORS.reset}`);
        }
      }
      console.log(
        `\n${COLORS.bright}${COLORS.green}All set! Don't forget to restart your Expo server.${COLORS.reset}\n`,
      );
      process.exit();
    });
  });
}

main().catch(console.error);
