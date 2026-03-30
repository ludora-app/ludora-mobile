import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useToast } from '@/components/chill-ui-library';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useBlockUser } from '@/features/profil/queries/block-user.query';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import QuickActionCard from '@/components/ui/quick-action-card.component';

const BLOCK_USER_EVENT = ANALYTICS_EVENTS.CHAT_ROOM.CHAT_ROOM_USER_PROFILE_BLOCK_USER;

const USER_ALREADY_BLOCKED_ERROR = 'User already blocked';

export default function ChatRoomUserProfileBlockUser() {
  const { toast } = useToast();
  const router = useRouter();
  const { firstname, lastname, userId } =
    useLocalSearchParams<RootStackParamList[typeof ROUTES.CHAT_ROOM.USER_PROFILE]>();
  const { t } = useTranslate();
  const { isPending: isLoadingBlockUser, mutateAsync: blockUser } = useBlockUser(userId as string);
  const { trackError, trackEvent } = useAnalytics();

  const handleBlockUser = async () => {
    try {
      await blockUser();
      trackEvent({ eventName: BLOCK_USER_EVENT });
      router.dismissAll();
      toast({
        message: t('profil.block_user_success_message', { name: `${firstname} ${lastname}` }),
        variant: 'success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.api_error_detail === USER_ALREADY_BLOCKED_ERROR) {
        toast({
          message: t('profil.block_user_already_blocked_message', { name: `${firstname} ${lastname}` }),
          variant: 'info',
        });
        return;
      }
      trackError({ error });
    }
  };

  return (
    <DialogConfirm
      title={t('profil.block_user_title', { name: firstname })}
      content={t('profil.block_user_content', { name: `${firstname} ${lastname}` })}
      source="chat_room_user_profile_block_user"
      confirmButtonTitleKey="common.block"
      onConfirmPromise={handleBlockUser}
      isLoading={isLoadingBlockUser}
      priority="confirm"
    >
      <QuickActionCard
        iconName="fordbidden-contact-solid"
        label={t('profil.block_user_button_label')}
        variant="horizontal"
        hasShadow
      />
    </DialogConfirm>
  );
}
