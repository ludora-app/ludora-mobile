import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import { ShareButton } from '@/components/ui/share-button';
import { RootStackParamList } from '@/types/routes-params.types';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

export default function CreatedSessionFooterButtonsCreatedSession() {
  const router = useRouter();
  const { t } = useTranslate();
  const createdSessionUid = useCreateSessionStore(state => state.session.additionalData.createdSessionUid);

  const handleInvitePeople = () => {
    const params: RootStackParamList[typeof ROUTES.INVITE_PEOPLE.INDEX] = { sessionUid: createdSessionUid };

    router.push({
      params,
      pathname: ROUTES.INVITE_PEOPLE.INDEX,
    });
  };

  return (
    <Box className="w-full gap-4">
      <BoxRow className="items-center gap-3">
        <Box className="flex-1">
          <Button title="Inviter tes amis" onPress={handleInvitePeople} />
        </Box>
        <ShareButton />
      </BoxRow>
      <Button title="Retourner à l'accueil" variant="outlined" onPress={router.back} />
    </Box>
  );
}
