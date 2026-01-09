import { useTranslate } from '@tolgee/react';
import { Box, BoxCenter, BoxRow, Button, Icon } from '@ludo/ui';

import COLORS from '@/constants/COLORS';

export default function CreatedSessionFooterButtonsCreatedSession() {
  const { t } = useTranslate();

  return (
    <Box className="w-full gap-4">
      <BoxRow className="items-center gap-3">
        <Box className="flex-1">
          <Button title="Inviter tes amis" redirect="/invite-people" />
        </Box>
        <BoxCenter className="rounded-full border border-primary p-3">
          <Icon name="share-regular" color={COLORS.primary} />
        </BoxCenter>
      </BoxRow>
      <Button title="Retourner à l'accueil" variant="outlined" />
    </Box>
  );
}
