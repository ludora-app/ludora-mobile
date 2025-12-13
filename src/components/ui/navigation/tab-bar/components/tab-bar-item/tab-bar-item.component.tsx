import { Icon, String } from '@ludo/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxColumnCenter } from '@chillui/ui';
import { TabTriggerSlotProps } from 'expo-router/ui';

import COLORS from '@/constants/COLORS';
import { TabRoutes } from '@/constants/TABS_ROUTES';

export type TabButtonProps = TabTriggerSlotProps & Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'>;

export function TabBarItem({ iconName, iconNameActive, isFocused, text, ...props }: TabButtonProps) {
  const { t } = useTranslate();

  return (
    <Pressable {...props}>
      <BoxColumnCenter className="grow gap-0.5 pt-6">
        <Icon name={isFocused ? iconNameActive : iconName} color={isFocused ? COLORS.primary : '#9DB2CE'} />
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
