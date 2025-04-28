import { Icon } from '@chillUI';
import { Tabs } from 'expo-router';
import COLORS from '@/constants/COLORS';
import { TIcons } from '@/constants/ICONS';
import Header from '@/components/ui/Header/Header';
import { TAB_ROUTES } from '@/constants/TABS_ROUTES';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarIcon({
  focused,
  iconName,
  iconNameActive,
}: {
  focused: boolean;
  iconName: keyof TIcons;
  iconNameActive: keyof TIcons;
}) {
  return <Icon variant={focused ? iconNameActive : iconName} color={focused ? COLORS.primary : '#7C7C7C'} />;
}

function RenderTabIcon(route: (typeof TAB_ROUTES)[number]) {
  const TabIcon = function TabIconComponent({ focused }: { focused: boolean }) {
    return (
      <TabBarIcon
        focused={focused}
        iconName={route.iconName as keyof TIcons}
        iconNameActive={route.iconNameActive as keyof TIcons}
      />
    );
  };
  TabIcon.displayName = `TabIcon-${route.name}`;
  return TabIcon;
}

const header = () => <Header />;

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        header,
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#7C7C7C',
        tabBarStyle: {
          height: 60,
          marginBottom: bottom,
          paddingBottom: 10,
        },
      }}
    >
      {TAB_ROUTES.map(route => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarIcon: RenderTabIcon(route),
            title: route.text,
          }}
        />
      ))}
    </Tabs>
  );
}
