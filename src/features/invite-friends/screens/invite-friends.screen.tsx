import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { useResetStoreOnUnmount } from '@/utils/navigation.utils';
import { IS_ANDROID, IS_IOS } from '@/constants/platform.constants';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

import { useInviteFriendsStore } from '../stores/invite-friends.store';
import InviteFriendsFooter from '../components/invite-friends-footer.component';
import { useInviteFriendsFilterStore } from '../stores/invite-friends-filter.store';
import InviteFriendsList from '../components/invite-friends-list/invite-friends-list.component';

export default function InviteFriendsScreen() {
  const { t } = useTranslate();
  const resetFilterStore = useInviteFriendsFilterStore(state => state.reset);
  const resetInviteFriendsStore = useInviteFriendsStore(state => state.reset);

  const handleResetStore = () => {
    resetFilterStore();
    resetInviteFriendsStore();
  };

  useResetStoreOnUnmount(handleResetStore);
  return (
    <>
      <HeaderGoBack
        title={t('invite-friends.title')}
        iconName="ludora-sunglass"
        hasTopSafeArea={IS_ANDROID}
        className={cn(IS_IOS && 'mt-3')}
      />
      <InviteFriendsList />
      <InviteFriendsFooter />
    </>
  );
}
