import { Box, String } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { SetStateAction, Dispatch } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

type CreateSessionHeaderProps = {
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeStep: number;
};

export default function CreateSessionHeader(props: CreateSessionHeaderProps) {
  const { top } = useSafeArea();
  const { activeStep, setActiveStep } = props;
  const { t } = useTranslate();
  const router = useRouter();

  const handleGoBack = () => {
    if (activeStep === 1 || activeStep === 5) {
      router.back();
      return;
    }
    setActiveStep(prev => Math.max(1, prev - 1));
  };

  return (
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
  );
}
