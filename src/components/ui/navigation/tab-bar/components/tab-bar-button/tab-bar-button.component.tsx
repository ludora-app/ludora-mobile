import { Icon } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { TabTriggerSlotProps } from 'expo-router/ui';

import ROUTES from '@/constants/routes.constants';
import { TabRoutes } from '@/constants/tabs-routes.constants';
import { Box, ScalePressable } from '@/components/chill-ui-library';

import { TAB_BAR_CONSTANTS } from '../../constants';

type TabBarButtonProps = TabTriggerSlotProps & Pick<TabRoutes, 'iconName' | 'iconNameActive' | 'text'>;

const styles = StyleSheet.create({
  fabShadow: {
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
  },
});

const FAB_CENTER_Y = (TAB_BAR_CONSTANTS.NOTCH_EDGE_Y + 30) / 2;
const fabTop = FAB_CENTER_Y - TAB_BAR_CONSTANTS.BUTTON_SIZE / 2 + 2;

export default function TabBarButton(props: TabBarButtonProps) {
  const router = useRouter();
  const { iconName, iconNameActive } = props;

  const pathname = usePathname();

  const isFocused = pathname === ROUTES.CREATE_SESSION.INDEX;

  return (
    <Box
      style={[
        {
          height: TAB_BAR_CONSTANTS.BUTTON_SIZE,
          top: fabTop,
          transform: [{ translateX: -TAB_BAR_CONSTANTS.BUTTON_SIZE / 2 }],
          width: TAB_BAR_CONSTANTS.BUTTON_SIZE,
        },
        styles.fabShadow,
      ]}
      className="absolute left-1/2 items-center justify-center rounded-full border-none bg-transparent"
    >
      <ScalePressable onPress={() => router.navigate(ROUTES.CREATE_SESSION.STEP_1)}>
        <Box
          className="bg-primary items-center justify-center rounded-full"
          style={{
            height: TAB_BAR_CONSTANTS.BUTTON_SIZE,
            width: TAB_BAR_CONSTANTS.BUTTON_SIZE,
          }}
        >
          <Icon name={isFocused ? iconNameActive : iconName} color="#FFF" size="lg" />
        </Box>
      </ScalePressable>
    </Box>
  );
}
