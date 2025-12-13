// update-ip.js
const fs = require('fs');
const os = require('os');
// Fonction pour récupérer la première adresse IP non "interne"
function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const addr of networkInterfaces[interfaceName]) {
      // On ne s’intéresse qu’aux IPv4 non internes (127.0.0.1 est une IP interne par exemple)
      if (addr.family === 'IPv4' && !addr.internal) {
        return addr.address;
      }
    }
  }
  return null;
}

function updateEnvFile(ip) {
  const ENV_FILE = '.env.development';
  let envContent = '';

  // On lit l’éventuel contenu existant de .env
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf8');
  }

  // Si la variable IP_ADDRESS existe déjà, on la remplace
  const ipRegex = /^EXPO_PUBLIC_IP_ADDRESS=.*$/gm;
  if (ipRegex.test(envContent)) {
    envContent = envContent.replace(ipRegex, `EXPO_PUBLIC_IP_ADDRESS=${ip}`);
  } else {
    // Sinon, on l’ajoute à la fin
    envContent += `\nEXPO_PUBLIC_IP_ADDRESS=${ip}\n`;
  }

  // On réécrit le fichier .env avec la nouvelle variable
  fs.writeFileSync(ENV_FILE, envContent.trim() + '\n', 'utf8');
}

const localIp = getLocalIpAddress();

if (!localIp) {
  console.error('Impossible de trouver une IP locale non interne.');
  process.exit(1);
}

updateEnvFile(localIp);

console.log(`IP_ADDRESS mise à jour dans .env : ${localIp}`);
