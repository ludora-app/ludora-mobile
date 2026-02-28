vault {
  address = "http://51.91.78.100:8200"
  # le token vient de VAULT_TOKEN dans ton .env.development
  ssl {
    enabled = true
    verify  = true
  }
}

secret {
  # ton chemin Vault (le même que VAULT_PATH)
  path      = "secret/ludora/ludora-app/localhost"
  no_prefix = true
}
