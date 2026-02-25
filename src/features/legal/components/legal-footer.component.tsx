import { Box, String } from '@ludo/ui'

export default function LegalFooter() {
  return (
    <Box className="items-center gap-1 border-t border-ring pt-4 mt-4">
      <String variant="body-xs" className="text-muted">Dernière mise à jour : 25 février 2026</String>
      <String variant="body-xs" className="text-muted">Ludora © Tous droits réservés.</String>
    </Box>
  )
}
