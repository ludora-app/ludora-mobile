import { Box, Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function CreateSessionFooter() {
  const { t } = useTranslate();
  return (
    <Box>
      <Button
        title={t('common.button_next')}
        iconProps={{
          name: 'chill-ui-checked-circle-solid',
          position: 'left',
        }}
        colorVariant="info"
      />
      <Button title={t('common.button_back')} />
    </Box>
  );
}
