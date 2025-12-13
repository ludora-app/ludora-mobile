#!/usr/bin/env bash
set -euo pipefail

# 1. Charger .env.development (VAULT_ADDR, VAULT_TOKEN, VAULT_PATH…)
if [ -f .env.development ]; then
  set -a
  . ./.env.development
  set +a
else
  echo "❌ .env.development introuvable."
  exit 1
fi

# 2. Récupérer un env complet via envconsul (mais sans lancer la commande)
VAULT_ENV="$(envconsul -config=./tools/vault/envconsul.hcl -once -- env)"

# 3. Exporter ces variables dans le shell actuel
while IFS='=' read -r name value; do
  [ -z "$name" ] && continue
  export "$name=$value"
done <<< "$VAULT_ENV"

# 4. Vérifier qu’on a bien une commande à exécuter
if [ $# -eq 0 ]; then
  echo "⚠️ Aucune commande passée à inject-dev."
  echo "   Exemple : bash ./inject-dev.sh expo start --port 8086"
  exit 1
fi

# 5. Exécuter la commande demandée (Expo, Node, etc.)
exec "$@"
