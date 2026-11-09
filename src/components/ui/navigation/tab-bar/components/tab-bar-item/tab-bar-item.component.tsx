import { memo, Ref } from 'react';
import { useTranslate } from '@tolgee/react';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, ViewInstance } from 'react-native';
import { Icon, String, BoxColumnCenter } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TabRoutes } from '@/constants/tabs-routes.constants';

// expo-router still types the slot ref as `RefAttributes<View>`, which the RN 0.87+ Strict API no longer accepts
export type TabButtonProps = Omit<TabTriggerSlotProps, 'ref'> &
  Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'> & { ref?: Ref<ViewInstance> };

const TabBarItemComponent = ({ iconName, iconNameActive, isFocused, text, ...props }: TabButtonProps) => {
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
};

export const TabBarItem = memo(TabBarItemComponent, (prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused);
