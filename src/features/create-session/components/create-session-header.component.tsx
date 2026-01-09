import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { SetStateAction, Dispatch } from 'react';
import { Box, IconButton, String } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

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
    if (activeStep === 1) {
      router.back();
      return;
    }
    setActiveStep(prev => Math.max(1, prev - 1));
  };

  return (
    <Box style={{ paddingTop: top }}>
      <Box className="flex-row items-center justify-center py-6">
        <Box className="absolute left-4">
          <IconButton
            iconName="arrow-left-regular"
            className="rounded-xl border-[1px] border-[#D8DADC] bg-white"
            iconColor="#000"
            as="scale-pressable"
            onPress={handleGoBack}
          />
        </Box>
        <String font="primaryExtraBold" colorVariant="primary" variant="body-2">
          {t('create-session.header.title')}
        </String>
      </Box>
    </Box>
  );
}
