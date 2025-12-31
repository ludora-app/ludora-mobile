import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { SetStateAction, Dispatch } from 'react';
import { Box, Icon, IconButton, String } from '@ludo/ui';

type CreateSessionHeaderProps = {
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionHeader(props: CreateSessionHeaderProps) {
  const { setActiveStep } = props;
  const { t } = useTranslate();
  const router = useRouter();

  return (
    <Box>
      <Box className="mx-auto mt-2 h-1 w-12 rounded-full bg-zinc-400" />
      <Box className="flex-row items-center justify-center py-6">
        <Box className="absolute left-4">
          <IconButton
            iconName="arrow-left-regular"
            className="rounded-xl border-[1px] border-[#D8DADC] bg-white"
            iconColor="#000"
            as="scale-pressable"
            onPress={() => setActiveStep(prev => Math.max(1, prev - 1))}
          />
        </Box>
        <String font="primaryExtraBold" colorVariant="primary" variant="body-2">
          {t('create-session.header.title')}
        </String>
        <Box className="absolute right-4">
          <Icon name="xmark-solid" color="#000" pressEffectSize="sm" onPress={() => router.back()} />
        </Box>
      </Box>
    </Box>
  );
}
