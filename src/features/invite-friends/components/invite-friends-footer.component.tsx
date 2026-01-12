import { Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/ROUTES';
import API_ERRORS from '@/api/utils/api.errors';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { useInvalidateQuery } from '@/hooks/invalidate-query.hook';
import FooterWrapper from '@/components/ui/footer-wrapper/footer-wrapper.component';
import { getFriendsFindAllMyFriendsQueryKey } from '@/api/generated/api/friends/friends.api';

import { useInviteFriend } from '../queries/invite-friend-query';
import { useInviteFriendsStore } from '../stores/invite-friends.store';

const API_ERROR_USER_ALREADY_INVITED = API_ERRORS.INVITE_FRIENDS_TO_SESSION.USER_ALREADY_INVITED;

export default function InviteFriendsFooter() {
  const { sessionUid } = useLocalSearchParams<RootStackParamList[typeof ROUTES.INVITE_PEOPLE.INDEX]>();

  const { t } = useTranslate();
  const { friends, numberOfFriends } = useInviteFriendsStore(
    useShallow(state => ({
      friends: state.friends,
      numberOfFriends: state.numberOfFriends,
    })),
  );

  const { isPending: isInvitingFriends, mutateAsync: inviteFriend } = useInviteFriend();
  const userFriendsQueryKey = getFriendsFindAllMyFriendsQueryKey();
  const invalidateQueryUserFriends = useInvalidateQuery(userFriendsQueryKey);

  const { toast } = useToast();
  const router = useRouter();
  const { trackError } = useAnalytics();

  const handleSubmit = async () => {
    if (!sessionUid || !friends.length) {
      return;
    }
    try {
      const results = await Promise.allSettled(
        friends.map(friend => inviteFriend({ receiverUid: friend.friendUid, sessionUid: sessionUid.toString() })),
      );

      const succeeded = results.filter(r => r.status === 'fulfilled').length;

      const alreadyInvitedCount = results.filter(
        r =>
          r.status === 'rejected' && (r.reason as ErrorResponse)?.api_error_detail === API_ERROR_USER_ALREADY_INVITED,
      ).length;

      const technicalErrors = results.filter(
        r =>
          r.status === 'rejected' && (r.reason as ErrorResponse)?.api_error_detail !== API_ERROR_USER_ALREADY_INVITED,
      ).length;

      if (numberOfFriends === 1) {
        if (succeeded === 1) {
          toast({
            message: t('invite-friends.toast_invitations_sent', { count: succeeded, value: succeeded }),
            variant: 'success',
          });
          invalidateQueryUserFriends();
          router.back();
        } else if (alreadyInvitedCount === 1) {
          toast({
            message: t('invite-friends.toast_already_invited'),
            variant: 'info',
          });
        } else {
          trackError({ error: (results[0] as PromiseRejectedResult).reason });
        }
        return;
      }

      if (succeeded > 0) {
        let msg = t('invite-friends.toast_invitations_sent', { count: succeeded, value: succeeded });

        if (alreadyInvitedCount > 0) {
          msg = t('invite-friends.toast_invitation_sent_already_sended_to_users', { count: alreadyInvitedCount });
        }

        toast({
          message: msg,
          variant: 'success',
        });
        invalidateQueryUserFriends();
        router.back();
      } else if (alreadyInvitedCount > 0 && technicalErrors === 0) {
        toast({
          message: t('invite-friends.toast_invitation_already_sended_to_friends'),
          variant: 'info',
        });
      } else {
        toast({
          message: t('common.error_generic'),
          variant: 'error',
        });
      }

      results.forEach(r => {
        if (
          r?.status === 'rejected' &&
          (r?.reason as ErrorResponse)?.api_error_detail !== API_ERROR_USER_ALREADY_INVITED
        ) {
          trackError({ error: r?.reason, showToast: false });
        }
      });
    } catch (error) {
      trackError({ error });
    }
  };

  return (
    <FooterWrapper>
      <Button
        title={t('invite-friends.button_invite_title', { count: numberOfFriends })}
        onPress={handleSubmit}
        isDisabled={numberOfFriends === 0}
        isLoading={isInvitingFriends}
      />
    </FooterWrapper>
  );
}
