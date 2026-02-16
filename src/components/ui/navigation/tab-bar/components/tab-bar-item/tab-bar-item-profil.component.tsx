import { memo } from 'react';
import { Pellet } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { Icon, String, Box, BoxColumnCenter } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { TabRoutes } from '@/constants/TABS_ROUTES';
import { useNotificationsUnreadCount } from '@/queries/get-notifications_unread_count.query';

export type TabButtonProps = TabTriggerSlotProps & Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'>;

function TabBarItemProfil({ iconName, iconNameActive, isFocused, text, ...props }: TabButtonProps) {
  const { data: unreadCount } = useNotificationsUnreadCount()

  const hasNotification = unreadCount?.unreadCount > 0;
  const { t } = useTranslate();

  return (
    <Pressable {...props}>
      <BoxColumnCenter className="grow gap-0.5 pt-6">
        <Box className='relative'>
          {hasNotification && <Pellet className="absolute right-0 top-0 z-50" />}
          <Icon name={isFocused ? iconNameActive : iconName} color={isFocused ? COLORS.primary : '#9DB2CE'} />
        </Box>
        <String
          size="xs"
          font={isFocused ? 'primaryBold' : 'primarySemiBold'}
          color={isFocused ? COLORS.primary : '#9DB2CE'}
        >
          {t(text)}
        </String>
      </BoxColumnCenter>
    </Pressable>
  );
}

export default memo(TabBarItemProfil, (prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused);
