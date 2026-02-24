import { Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { useLocalSearchParams, useRouter } from 'expo-router';

import API_ERRORS from '@/api/utils/api.errors';
import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import FooterWrapper from '@/components/ui/footer-wrapper/footer-wrapper.component';

import { useInviteFriends } from '../queries/invite-friends-query';
import { useInviteFriendsStore } from '../stores/invite-friends.store';

const API_ERROR_USER_ALREADY_INVITED = API_ERRORS.INVITE_FRIENDS_TO_SESSION.USER_ALREADY_INVITED;

export default function InviteFriendsFooter() {
  const { sessionId } = useLocalSearchParams<RootStackParamList[typeof ROUTES.INVITE_FRIENDS.INDEX]>();

  const { t } = useTranslate();
  const { friends, numberOfFriends } = useInviteFriendsStore(
    useShallow(state => ({
      friends: state.friends,
      numberOfFriends: state.numberOfFriends,
    })),
  );


  const { isPending: isInvitingFriends, mutateAsync: inviteFriends } = useInviteFriends(sessionId);


  const { toast } = useToast();
  const router = useRouter();
  const { trackError } = useAnalytics();

  const handleSubmit = async () => {
    if (!sessionId || !friends.length) {
      return;
    }
    try {
      await inviteFriends({
        receiverUids: friends.map(f => f.friendUid)
      })
      toast({
        message: t('invite-friends.toast_invitations_sent', { count: numberOfFriends, value: numberOfFriends }),
        variant: 'success',
      })
      router.back()
    } catch (error) {
      const err = error as ErrorResponse
      if (err?.api_error_detail === API_ERROR_USER_ALREADY_INVITED) {
        toast({
          message: t('invite-friends.toast_invitation_already_sended_to_friends'),
          variant: 'info',
        })
      } else {
        trackError({ error })
      }
    }
  }

  return (
    <FooterWrapper hasBottomSafeArea>
      <Button
        title={t('invite-friends.button_invite_title', { count: numberOfFriends })}
        onPress={handleSubmit}
        isDisabled={numberOfFriends === 0}
        isLoading={isInvitingFriends}
      />
    </FooterWrapper>
  );
}
