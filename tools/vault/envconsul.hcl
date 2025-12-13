vault {
  address = "https://vault.ludora.fr"
  # le token vient de VAULT_TOKEN dans ton .env.development
  ssl {
    enabled = true
    verify  = true
  }
}

secret {
  # ton chemin Vault (le même que VAULT_PATH)
  path      = "secret/ludora/ludora-app/dev"
  no_prefix = true
}
