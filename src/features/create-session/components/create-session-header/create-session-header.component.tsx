import { Box, String } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

import CreateSessionHeaderProgressStepper from './create-session-header-progress-stepper.component';

export default function CreateSessionHeader() {
  const { top } = useSafeArea();
  const router = useRouter();
  const { t } = useTranslate();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Box style={{ paddingTop: top }} className="bg-background relative z-50">
        <Box className="flex-row items-center justify-center py-3">
          <Box className="absolute left-4">
            <GoBackButton onPress={handleGoBack} />
          </Box>
          <String font="primaryExtraBold" colorVariant="primary" variant="body-2">
            {t('create-session.header.title')}
          </String>
        </Box>
      </Box>
      <CreateSessionHeaderProgressStepper />
    </>
  );
}
