import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { ShareButton } from '@/components/ui/share-button';
import { RootStackParamList } from '@/types/routes-params.types';

import { CreateSessionStep5ScreenParams } from '../../types/create-session-step-5.types';

export default function CreatedSessionFooterButtonsCreatedSession() {
  const { sessionUid } = useLocalSearchParams<CreateSessionStep5ScreenParams>();
  const router = useRouter();
  const { t } = useTranslate();

  const handleInvitePeople = () => {
    const params: RootStackParamList[typeof ROUTES.INVITE_PEOPLE.INDEX] = { sessionUid };

    router.push({
      params,
      pathname: ROUTES.INVITE_PEOPLE.INDEX,
    });
  };

  return (
    <Box className="w-full gap-4">
      <BoxRow className="items-center gap-3">
        <Box className="flex-1">
          <Button title={t('create-session.step-5.button_title_invite_people')} onPress={handleInvitePeople} />
        </Box>
        <ShareButton />
      </BoxRow>
      <Button title={t('create-session.step-5.button_title_back_to_home')} variant="outlined" onPress={router.back} />
    </Box>
  );
}
