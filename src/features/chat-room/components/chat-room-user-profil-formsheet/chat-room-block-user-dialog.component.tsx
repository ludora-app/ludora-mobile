import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import { ErrorResponse } from '@/api/orval.instance';
import { useToast } from '@/components/chill-ui-library';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useBlockUser } from '@/features/profil/queries/block-user.query';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import QuickActionCard from '@/components/ui/quick-action-card.component';

const BLOCK_USER_EVENT = ANALYTICS_EVENTS.CHAT_ROOM.CHAT_ROOM_USER_PROFILE_BLOCK_USER;

const USER_ALREADY_BLOCKED_ERROR = 'User already blocked';

export type ChatRoomBlockUserDialogProps = {
  dialogSource: string;
  firstname?: string;
  lastname?: string;
  userId: string;
};

export default function ChatRoomBlockUserDialog({
  dialogSource,
  firstname,
  lastname,
  userId,
}: ChatRoomBlockUserDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslate();
  const { isPending: isLoadingBlockUser, mutateAsync: blockUser } = useBlockUser(userId);
  const { trackError, trackEvent } = useAnalytics();

  const displayName = [firstname, lastname].filter(Boolean).join(' ');

  const handleBlockUser = async () => {
    try {
      await blockUser();
      trackEvent({ eventName: BLOCK_USER_EVENT });
      router.dismissAll();
      toast({
        message: t('profil.block_user_success_message', { name: displayName }),
        variant: 'success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.api_error_detail === USER_ALREADY_BLOCKED_ERROR) {
        toast({
          message: t('profil.block_user_already_blocked_message', { name: displayName }),
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
      content={t('profil.block_user_content', { name: displayName })}
      source={dialogSource}
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
