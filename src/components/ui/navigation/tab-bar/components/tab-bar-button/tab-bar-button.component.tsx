import { Icon } from '@ludo/ui';
import { Pressable, StyleSheet } from 'react-native';
import { TabTriggerSlotProps } from 'expo-router/ui';

import { TabRoutes } from '@/constants/TABS_ROUTES';

import { TAB_BAR_CONSTANTS } from '../../constants';

type TabBarButtonProps = TabTriggerSlotProps & Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'>;

const styles = StyleSheet.create({
  fabShadow: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

const FAB_CENTER_Y = (TAB_BAR_CONSTANTS.NOTCH_EDGE_Y + 30) / 2;
const fabTop = FAB_CENTER_Y - TAB_BAR_CONSTANTS.BUTTON_SIZE / 2 + 2;

export default function TabBarButton(props: TabBarButtonProps) {
  const { iconName, iconNameActive, isFocused } = props;

  return (
    <Pressable
      {...props}
      className="absolute left-1/2 items-center justify-center rounded-full bg-primary"
      style={[
        {
          height: TAB_BAR_CONSTANTS.BUTTON_SIZE,
          top: fabTop,
          transform: [{ translateX: -TAB_BAR_CONSTANTS.BUTTON_SIZE / 2 }],
          width: TAB_BAR_CONSTANTS.BUTTON_SIZE,
        },
        { ...(isFocused && styles.fabShadow) },
      ]}
    >
      <Icon name={isFocused ? iconNameActive : iconName} color="#FFF" size="lg" />
    </Pressable>
  );
}
