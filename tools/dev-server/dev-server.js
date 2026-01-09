const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3040;

// Middleware pour autoriser le CORS et lire le JSON
app.use(cors());
app.use(express.json());

const PROJECT_ROOT = path.join(__dirname, '../../');
/**
 * ROUTE 1 : Écrire dans le .env.development
 * Attend un JSON : { "content": "LA_STRING_A_ECRIRE" }
 */
app.post('/write-env', (req, res) => {
  const { content } = req.body; // Exemple attendu : "API_KEY=ma_valeur"
  const filePath = path.join(__dirname, '../../.env.development');

  if (!content) {
    return res.status(400).send('Erreur : Aucun contenu fourni.');
  }

  // 1. Lire le fichier actuel
  fs.readFile(filePath, 'utf8', (err, data) => {
    let finalContent = '';

    if (err && err.code !== 'ENOENT') {
      return res.status(500).send('Erreur de lecture du fichier.');
    }

    // Si le fichier n'existe pas encore (err.code === 'ENOENT'), on commence avec du vide
    const currentLines = err ? [] : data.split('\n');

    // On sépare la clé et la valeur envoyées (ex: "API_URL=test" -> ["API_URL", "test"])
    const [newKey, ...newValueParts] = content.split('=');
    const newValue = newValueParts.join('=');

    let keyFound = false;

    // 2. Parcourir les lignes pour mettre à jour la clé si elle existe
    const updatedLines = currentLines.map(line => {
      if (line.trim().startsWith(`${newKey}=`)) {
        keyFound = true;
        return `${newKey}=${newValue}`;
      }
      return line;
    });

    // 3. Si la clé n'existait pas, on l'ajoute à la fin
    if (!keyFound) {
      updatedLines.push(`${newKey}=${newValue}`);
    }

    finalContent = updatedLines.join('\n');

    // 4. Écrire le nouveau contenu (sans tout écraser par erreur)
    fs.writeFile(filePath, finalContent, 'utf8', err => {
      if (err) return res.status(500).send("Erreur d'écriture.");
      console.log(`✅ Variable ${newKey} mise à jour dans .env.development`);
      res.send(`Variable ${newKey} enregistrée !`);
    });
  });
});

/**
 * ROUTE 2 : Lancer N'IMPORTE QUELLE commande terminal
 * Attend un JSON : { "command": "bun generate:api" }
 */
app.post('/run-command', (req, res) => {
  const { command } = req.body;

  let message;
  let successMessage;
  if (!command) {
    return res.status(400).send('Erreur : Aucune commande fournie.');
  }
  if (command === 'bun generate:api') {
    message = 'Génération des hooks react query...';
    successMessage = 'Génération des hooks react query terminée !';
  }
  if (command === 'bun generate:translations:local') {
    message = 'Génération des traductions...';
    successMessage = 'Génération des traductions terminée !';
  }
  if (command === 'bun generate:icons') {
    message = 'Génération des icônes...';
    successMessage = 'Génération des icônes terminée !';
  }

  console.log(`🚀 ${message}`);

  // On utilise 'cwd' pour forcer l'exécution à la racine du projet
  exec(command, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur d'exécution : ${error.message}`);
      return res.status(500).json({ error: error.message, stderr });
    }

    console.log(`✅ Succès : ${successMessage || command}`);
    // On renvoie la sortie du terminal pour pouvoir l'afficher dans l'app
    res.json({ stdout, stderr });
  });
});

app.listen(port, () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Serveur DevTool actif sur le port ${port}`);
  console.log(`-----------------------------------------`);
});
