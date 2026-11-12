import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

type HomeSessionListItemBadgeProps = {
  type: 'for-you' | 'joined';
};

/** Height of the badge and the gap under it, added to the card height in the list. */
export const HOME_SESSION_LIST_ITEM_BADGE_HEIGHT = 34;

/** "Pour toi" (pink, star) or "Tu es inscrit" (green, check) on top of a session card. */
export const HomeSessionListItemBadge = (props: HomeSessionListItemBadgeProps) => {
  const { type } = props;
  const { t } = useTranslate();
  const isJoined = type === 'joined';

  return (
    <BoxRow
      className={cn(
        'h-6 items-center gap-1.5 self-start rounded-full px-2.5',
        isJoined ? 'bg-successSoft' : 'bg-secondarySoft',
      )}
    >
      <Icon
        name={isJoined ? 'checked-circle-solid' : 'star-solid'}
        color={isJoined ? COLORS.success : COLORS.secondary}
        size="xs"
      />
      <String variant="body-xs" font="primaryExtraBold" className={isJoined ? 'text-success' : 'text-secondary'}>
        {t(isJoined ? 'home.sessions.badge_joined' : 'home.sessions.badge_for_you')}
      </String>
    </BoxRow>
  );
};
