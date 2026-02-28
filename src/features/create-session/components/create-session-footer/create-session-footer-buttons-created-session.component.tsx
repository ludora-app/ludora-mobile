import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { ShareButton } from '@/components/ui/share-button';

import { useCreateSessionStore } from '../../store/create-session.store';

export default function CreatedSessionFooterButtonsCreatedSession() {
  const createdSessionUid = useCreateSessionStore(state => state.createdSessionUid);

  const router = useRouter();
  const { t } = useTranslate();

  const handleInvitePeople = () => {
    router.push(ROUTES.INVITE_FRIENDS.INDEX_UID(createdSessionUid));
  };

  const shareUrl = `https://www.ludora.fr${ROUTES.SESSION.INDEX_UID(createdSessionUid)}`;

  return (
    <Box className="w-full gap-4">
      <BoxRow className="items-center gap-3">
        <Box className="flex-1">
          <Button title={t('create-session.step-5.button_title_invite_people')} onPress={handleInvitePeople} />
        </Box>
        <ShareButton message={t('session.share_message', { url: shareUrl })} title={t('session.share_title')} url={shareUrl} />
      </BoxRow>
      <Button title={t('create-session.step-5.button_title_back_to_home')} variant="outlined" onPress={router.back} />
    </Box>
  );
}
