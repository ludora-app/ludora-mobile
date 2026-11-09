import { memo } from 'react';
import { Pellet } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Icon, String, Box, BoxColumnCenter } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { useMessagesUnread } from '@/queries/get-has-messages-unreads.query';

import { TabButtonProps } from './tab-bar-item.component';

const TabBarItemMessagesComponent = ({ iconName, iconNameActive, isFocused, text, ...props }: TabButtonProps) => {
  const { data: getHasUnreadMessages } = useMessagesUnread();

  const { hasUnreadMessages } = getHasUnreadMessages || {};
  const { t } = useTranslate();

  return (
    <Pressable {...props}>
      <BoxColumnCenter className="grow gap-0.5 pt-6">
        <Box className="relative">
          {hasUnreadMessages && <Pellet className="absolute right-0 top-0 z-50" />}
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
};

export const TabBarItemMessages = memo(
  TabBarItemMessagesComponent,
  (prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused,
);
