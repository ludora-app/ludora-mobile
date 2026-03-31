import { Linking } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { GlassView } from 'expo-glass-effect';
import { useLocalSearchParams } from 'expo-router';
import { Button, Icon, Separator, String, BoxRow, Box } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { RootStackParamList } from '@/types/routes-params.types';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';
import { useAppNavigation, useDisableBack } from '@/hooks/navigation.hooks';

type AppCheckScreenParams = RootStackParamList[typeof ROUTES.APP_CHECK.INDEX];

export default function AppCheckModal() {
  const { t } = useTranslate();
  const { goBack } = useAppNavigation();
  const { content, hasLaterButton, storeUrl, title } = useLocalSearchParams<AppCheckScreenParams>();

  const hasLaterButtonValue = hasLaterButton === 'true';

  useDisableBack();

  const handleLater = () => {
    mmkvStorage.setItem(MMKV_STORAGE_KEY.UPDATE_REFUSAL_TIMESTAMP, dayjs().valueOf());
    goBack();
  };

  const handleUpdate = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return (
    <Box className="mx-auto w-[92%] overflow-hidden rounded-2xl">
      <GlassView className="w-full bg-white">
        <Box className="items-center justify-center py-2">
          <String font="primaryBold" colorVariant="primary" truncate variant="body-2">
            {t(title)}
          </String>
        </Box>
        <Separator />
        <Box className="items-center gap-2 p-4">
          <Icon name="ludo-idea-2" className="size-20" />
          <String font="primarySemiBold">{t(content)}</String>
        </Box>
        <Separator />
        <BoxRow className="gap-2 px-4 py-3">
          {hasLaterButtonValue && (
            <Button title={t('common.later')} variant="outlined" className="flex-1" size="sm" onPress={handleLater} />
          )}
          <Button
            variant="contained"
            className="flex-1"
            size="sm"
            title={t('check-app.dialog.confirmButtonTitle')}
            onPress={handleUpdate}
          />
        </BoxRow>
      </GlassView>
    </Box>
  );
}
