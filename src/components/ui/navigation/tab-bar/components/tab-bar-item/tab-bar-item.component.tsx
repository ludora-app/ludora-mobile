import { memo } from 'react';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { Icon, String, BoxColumnCenter } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TabRoutes } from '@/constants/tabs-routes.constants';

export type TabButtonProps = TabTriggerSlotProps & Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'>;

function TabBarItem({ iconName, iconNameActive, isFocused, text, ...props }: TabButtonProps) {
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

export default memo(TabBarItem, (prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused);
