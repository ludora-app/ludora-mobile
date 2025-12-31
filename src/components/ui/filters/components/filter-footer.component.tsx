import { Box, Button } from '@ludo/ui';

export default function FilterFooter() {
  return (
    <Box className="gap-2">
      <Button title="Annuler" variant="outlined" />
      <Button title="Appliquer" />
    </Box>
  );
}
