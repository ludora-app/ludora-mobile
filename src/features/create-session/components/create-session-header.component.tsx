import { useRouter } from 'expo-router';
import { Box, Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function CreateSessionHeader() {
  const { t } = useTranslate();
  const router = useRouter();
  return (
    <Box className="flex-row items-center justify-center py-6">
      <String font="primaryExtraBold" colorVariant="primary" variant="body-2">
        {t('create-session.header.title')}
      </String>
      <Box className="absolute right-4">
        <Icon name="xmark-solid" color="#000" pressEffectSize="sm" onPress={() => router.back()} />
      </Box>
    </Box>
  );
}
